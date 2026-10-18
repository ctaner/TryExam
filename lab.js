/* TryExam - IOS benzeri ağ laboratuvarı simülatörü
 * Topoloji + görev tabanlı (simülasyon) sorular için:
 *   - komut ayrıştırma (kısaltmalar dahil), kullanıcı/ayrıcalıklı/yapılandırma modları
 *   - cihaz durumu (arayüzler, VLAN'lar, trunk, STP, statik yollar, OSPF, ACL, NAT)
 *   - show komutları, ping (basitleştirilmiş), running-config
 *   - görevlerin durum üzerinden denetlenmesi
 * Cisco IOS'un tamamı değildir; sınav müfredatındaki yaygın komutların bir alt kümesini destekler.
 */
(function () {
  "use strict";

  const INVALID = "% Invalid input detected at '^' marker.";
  const DEFAULT_PRIO = 32768;
  const MODE_SUFFIX = {
    user: ">", priv: "#", config: "(config)#", if: "(config-if)#",
    vlan: "(config-vlan)#", router: "(config-router)#"
  };

  // ---------- yardımcılar ----------
  // Kısaltma kontrolü: tok, full'un başı olmalı ve en az min karakter olmalı
  const is = (tok, full, min) => !!tok && tok.length >= (min || 2) && full.indexOf(tok.toLowerCase()) === 0;
  const isIp = (s) => /^(\d{1,3}\.){3}\d{1,3}$/.test(String(s || "")) &&
    String(s).split(".").every((o) => +o <= 255);
  const octets = (s) => String(s).split(".").map(Number);

  function canonIf(s) {
    const m = String(s || "").trim().match(/^([a-zA-Z\-]+?)\s*(\d+(?:[\/.]\d+)*)$/);
    if (!m) return null;
    const p = m[1].toLowerCase(), n = m[2];
    if (p === "gi" || p === "g" || p === "gigabitethernet") return "GigabitEthernet" + n;
    if (p === "fa" || p === "f" || p === "fastethernet") return "FastEthernet" + n;
    if (p === "vlan" || p === "v") return "Vlan" + n;
    if (p === "lo" || p === "loopback") return "Loopback" + n;
    return null;
  }

  function prefixOfMask(mask) {
    return octets(mask).reduce((a, o) => a + (o.toString(2).split("1").length - 1), 0);
  }

  function inNet(ip, net, prefix) {
    const i = octets(ip), n = octets(net);
    for (let k = 0; k < 4; k++) {
      const bits = Math.max(0, Math.min(8, prefix - 8 * k));
      const m = bits === 0 ? 0 : 256 - Math.pow(2, 8 - bits);
      if ((i[k] & m) !== (n[k] & m)) return false;
    }
    return true;
  }

  function netOf(ip, mask) {
    const i = octets(ip), m = octets(mask);
    return i.map((o, k) => o & m[k]).join(".");
  }

  function parseVlanList(v) {
    const out = [];
    String(v).split(",").forEach((p) => {
      const r = p.split("-").map((x) => parseInt(x, 10));
      if (r.length === 2 && !isNaN(r[0]) && !isNaN(r[1])) {
        for (let i = r[0]; i <= r[1]; i++) out.push(i);
      } else if (!isNaN(r[0])) {
        out.push(r[0]);
      }
    });
    return out.sort((a, b) => a - b);
  }

  // ---------- cihaz modeli ----------
  function newDevice(name, kind) {
    return {
      name: name, kind: kind, hostname: name, routing: false,
      ifaces: {}, vlans: { 1: { name: "default" } }, routes: [],
      ospf: null, stp: {}, acl: {}, logHosts: [], defaultGateway: null
    };
  }

  function ensureIf(d, name) {
    if (!d.ifaces[name]) {
      const svi = name.indexOf("Vlan") === 0;
      d.ifaces[name] = {
        ip: null, mask: null,
        shut: svi ? false : d.kind === "router",   // router arayüzleri varsayılan kapalı, switch portları açık
        desc: "", mode: null, access: 1, allowed: null, native: 1,
        portfast: false, bpduguard: false, aclIn: null, aclOut: null, nat: null
      };
    }
    return d.ifaces[name];
  }

  // ---------- laboratuvar oluşturma ----------
  function createLab(q) {
    const lab = { devices: {}, sessions: {}, pings: [], topo: q.topology };
    const kindOf = {};
    (q.topology.devices || []).forEach((x) => { kindOf[x.name] = x.type; });

    (q.devices || []).forEach((name) => {
      lab.devices[name] = newDevice(name, kindOf[name] || "router");
      lab.sessions[name] = { mode: "priv", ifName: null, vlanId: null };
    });

    // Topolojideki bağlantılara göre fiziksel arayüzleri oluştur
    (q.topology.links || []).forEach((l) => {
      [[l.a, l.ai], [l.b, l.bi]].forEach((pair) => {
        const dn = pair[0], cn = canonIf(pair[1]);
        if (lab.devices[dn] && cn) ensureIf(lab.devices[dn], cn);
      });
    });

    // Başlangıç yapılandırması (varsa)
    Object.keys(q.init || {}).forEach((dn) => {
      if (!lab.devices[dn]) return;
      ["configure terminal"].concat(q.init[dn], ["end"]).forEach((cmd) => run(lab, dn, cmd));
    });
    return lab;
  }

  function replay(q, log) {
    const lab = createLab(q);
    (log || []).forEach((e) => run(lab, e.dev, e.cmd));
    return lab;
  }

  function prompt(lab, dev) {
    const d = lab.devices[dev], s = lab.sessions[dev];
    if (!d || !s) return "";
    return d.hostname + MODE_SUFFIX[s.mode];
  }

  // ---------- komut çalıştırma ----------
  function run(lab, dev, raw) {
    const d = lab.devices[dev], s = lab.sessions[dev];
    const line = String(raw || "").trim();
    if (!d || !s || !line) return "";
    const t = line.split(/\s+/);
    const c = t[0].toLowerCase(), rest = t.slice(1), restStr = rest.join(" ");
    const first = (rest[0] || "").toLowerCase();

    if (c === "end") { if (s.mode !== "user") s.mode = "priv"; return ""; }
    if (c === "exit") {
      const up = { if: "config", vlan: "config", router: "config", config: "priv", priv: "user", user: "user" };
      s.mode = up[s.mode];
      return "";
    }
    if (c === "do" && (s.mode === "config" || s.mode === "if" || s.mode === "vlan" || s.mode === "router")) {
      return execPriv(lab, dev, restStr, false);
    }

    if (s.mode === "user") {
      if (is(c, "enable", 2)) { s.mode = "priv"; return ""; }
      return execPriv(lab, dev, line, true);
    }
    if (s.mode === "priv") {
      if (c.indexOf("conf") === 0 && first.indexOf("t") === 0) {
        s.mode = "config";
        return "Enter configuration commands, one per line.  End with CNTL/Z.";
      }
      if (is(c, "disable", 3)) { s.mode = "user"; return ""; }
      return execPriv(lab, dev, line, false);
    }
    if (s.mode === "config") return execConfig(lab, dev, c, rest, restStr, first);
    if (s.mode === "if") return execIf(lab, dev, c, rest, restStr);
    if (s.mode === "vlan") {
      if (c === "name") { d.vlans[s.vlanId].name = restStr; return ""; }
      return INVALID;
    }
    if (s.mode === "router") return execRouter(lab, dev, c, rest, restStr);
    return INVALID;
  }

  function execPriv(lab, dev, line, userMode) {
    const t = String(line).trim().split(/\s+/);
    const c = t[0].toLowerCase(), rest = t.slice(1);
    if (is(c, "show", 2)) return showCmd(lab, dev, rest);
    if (is(c, "ping", 2)) return pingCmd(lab, dev, rest[0]);
    if (userMode) return INVALID;
    if (is(c, "write", 2)) return "Building configuration...\n[OK]";
    if (c === "copy" && rest.join(" ").indexOf("running-config startup-config") !== -1) {
      return "Destination filename [startup-config]?\nBuilding configuration...\n[OK]";
    }
    return INVALID;
  }

  function execConfig(lab, dev, c, rest, restStr, first) {
    const d = lab.devices[dev], s = lab.sessions[dev];
    if (c === "no") {
      const sub = (rest[0] || "").toLowerCase(), sub2 = (rest[1] || "").toLowerCase();
      if (sub === "ip" && sub2 === "routing") { d.routing = false; return ""; }
      if (sub === "ip" && sub2 === "route") {
        d.routes = d.routes.filter((r) => !(r.net === rest[2] && r.mask === rest[3]));
        return "";
      }
      return INVALID;
    }
    if (is(c, "hostname", 2)) {
      if (!rest[0]) return INVALID;
      d.hostname = rest[0];
      return "";
    }
    if (is(c, "interface", 3)) {
      const cn = canonIf(restStr);
      if (!cn) return INVALID;
      ensureIf(d, cn);
      s.mode = "if"; s.ifName = cn;
      return "";
    }
    if (is(c, "vlan", 2)) {
      const id = parseInt(rest[0], 10);
      if (isNaN(id)) return INVALID;
      d.vlans[id] = d.vlans[id] || { name: "VLAN" + ("000" + id).slice(-4) };
      s.mode = "vlan"; s.vlanId = id;
      return "";
    }
    if (is(c, "ip", 2)) {
      const sub = (rest[0] || "").toLowerCase();
      if (sub === "routing") { d.routing = true; return ""; }
      if (sub === "default-gateway") {
        if (!isIp(rest[1])) return INVALID;
        d.defaultGateway = rest[1]; return "";
      }
      if (is(sub, "route", 3)) {
        const net = rest[1], mask = rest[2], nh = rest[3], ad = rest[4];
        if (!isIp(net) || !isIp(mask) || !isIp(nh)) return INVALID;
        d.routes = d.routes.filter((r) => !(r.net === net && r.mask === mask));
        d.routes.push({ net: net, mask: mask, nh: nh, ad: ad ? parseInt(ad, 10) : 1 });
        return "";
      }
      return INVALID;
    }
    if (is(c, "router", 3) && first === "ospf") {
      d.ospf = d.ospf || { pid: null, rid: null, nets: [] };
      d.ospf.pid = parseInt(rest[1], 10);
      s.mode = "router";
      return "";
    }
    if (is(c, "spanning-tree", 4) && first === "vlan") {
      const id = parseInt(rest[1], 10);
      const kw = (rest[2] || "").toLowerCase();
      let p = null;
      if (kw.indexOf("root") === 0) {
        const sub = (rest[3] || "").toLowerCase();
        if (sub.indexOf("primary") === 0) p = 24576;
        else if (sub.indexOf("secondary") === 0) p = 28672;
        else return INVALID;
      } else if (kw.indexOf("priority") === 0) {
        p = parseInt(rest[3], 10);
        if (isNaN(p)) return INVALID;
      } else {
        return INVALID;
      }
      d.stp[id] = p;
      return "";
    }
    if (is(c, "logging", 3) && is(first, "host", 2)) {
      if (!isIp(rest[1])) return INVALID;
      d.logHosts.push(rest[1]);
      return "";
    }
    if (c === "access-list") {
      const n = rest[0], action = (rest[1] || "").toLowerCase();
      if (!n || (action !== "permit" && action !== "deny")) return INVALID;
      d.acl[n] = d.acl[n] || [];
      d.acl[n].push({ action: action, net: rest[2], wild: rest[3] });
      return "";
    }
    return INVALID;
  }

  function execIf(lab, dev, c, rest, restStr) {
    const d = lab.devices[dev], s = lab.sessions[dev];
    const f = d.ifaces[s.ifName];
    if (c === "no") {
      const sub = (rest[0] || "").toLowerCase(), sub2 = (rest[1] || "").toLowerCase();
      if (is(sub, "shutdown", 4)) { f.shut = false; return ""; }
      if (sub === "ip" && sub2 === "address") { f.ip = null; f.mask = null; return ""; }
      if (sub === "description") { f.desc = ""; return ""; }
      return INVALID;
    }
    if (is(c, "shutdown", 4)) { f.shut = true; return ""; }
    if (is(c, "description", 4)) { f.desc = restStr; return ""; }
    if (c === "ip") {
      const sub = (rest[0] || "").toLowerCase();
      if (sub === "address") {
        if (!isIp(rest[1]) || !isIp(rest[2])) return INVALID;
        f.ip = rest[1]; f.mask = rest[2];
        return "";
      }
      if (sub === "access-group") {
        const dir = (rest[2] || "").toLowerCase();
        if (dir === "in") f.aclIn = rest[1];
        else if (dir === "out") f.aclOut = rest[1];
        else return INVALID;
        return "";
      }
      if (sub === "nat") {
        const dir = (rest[1] || "").toLowerCase();
        if (dir === "inside" || dir === "outside") { f.nat = dir; return ""; }
        return INVALID;
      }
      return INVALID;
    }
    if (is(c, "switchport", 2)) {
      const sub = (rest[0] || "").toLowerCase();
      if (sub === "mode") {
        const m = (rest[1] || "").toLowerCase();
        if (m === "access" || m === "trunk") { f.mode = m; return ""; }
        return INVALID;
      }
      if (sub === "access") {
        if ((rest[1] || "").toLowerCase() !== "vlan" || isNaN(parseInt(rest[2], 10))) return INVALID;
        f.access = parseInt(rest[2], 10);
        f.mode = f.mode || "access";
        return "";
      }
      if (sub === "trunk") {
        const w = (rest[1] || "").toLowerCase(), w2 = (rest[2] || "").toLowerCase();
        if (w === "allowed" && w2 === "vlan") {
          const v = rest.slice(3).join("");
          f.allowed = v.toLowerCase() === "all" ? null : parseVlanList(v);
          return "";
        }
        if (w === "native" && w2 === "vlan") { f.native = parseInt(rest[3], 10); return ""; }
        return INVALID;
      }
      return INVALID;
    }
    if (is(c, "spanning-tree", 4)) {
      const j = rest.join(" ").toLowerCase();
      if (j === "portfast") { f.portfast = true; return ""; }
      if (j.indexOf("bpduguard") === 0) { f.bpduguard = true; return ""; }
      return INVALID;
    }
    return INVALID;
  }

  function execRouter(lab, dev, c, rest, restStr) {
    const d = lab.devices[dev];
    if (is(c, "network", 3)) {
      const net = rest[0], wild = rest[1], kw = (rest[2] || "").toLowerCase(), area = rest[3];
      if (!isIp(net) || !isIp(wild) || kw !== "area" || area === undefined) return INVALID;
      d.ospf.nets.push({ net: net, wild: wild, area: String(area) });
      return "";
    }
    if (is(c, "router-id", 4)) {
      if (!isIp(rest[0])) return INVALID;
      d.ospf.rid = rest[0];
      return "";
    }
    return INVALID;
  }

  // ---------- show / ping ----------
  function connected(d) {
    const out = [];
    Object.keys(d.ifaces).forEach((n) => {
      const f = d.ifaces[n];
      if (f.ip && !f.shut) out.push({ net: netOf(f.ip, f.mask), prefix: prefixOfMask(f.mask), ifName: n });
    });
    return out;
  }

  function reachable(d, ip) {
    const conn = connected(d);
    if (conn.some((c) => inNet(ip, c.net, c.prefix))) return true;
    return d.routes.some((r) => inNet(ip, r.net, prefixOfMask(r.mask)) &&
      conn.some((c) => inNet(r.nh, c.net, c.prefix)));
  }

  function pingCmd(lab, dev, ip) {
    if (!isIp(ip)) return INVALID;
    const ok = reachable(lab.devices[dev], ip);
    lab.pings.push({ dev: dev, ip: ip, ok: ok });
    return "Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to " + ip + ", timeout is 2 seconds:\n" +
      (ok ? "!!!!!" : ".....") + "\nSuccess rate is " + (ok ? "100" : "0") + " percent (" + (ok ? 5 : 0) + "/5)";
  }

  function showCmd(lab, dev, rest) {
    const d = lab.devices[dev];
    const a = (rest[0] || "").toLowerCase(), b = (rest[1] || "").toLowerCase();
    if (is(a, "running-config", 3)) return runningConfig(d);
    if (a === "ip" && is(b, "interface", 3)) return showIpBrief(d);
    if (a === "ip" && is(b, "route", 2)) return showRoute(d);
    if (is(a, "vlan", 2)) return showVlan(d);
    if (is(a, "spanning-tree", 4)) return showStp(lab, dev, rest);
    return INVALID;
  }

  function showIpBrief(d) {
    const L = ["Interface              IP-Address      OK? Method Status                Protocol"];
    Object.keys(d.ifaces).forEach((n) => {
      const f = d.ifaces[n];
      const ip = f.ip || "unassigned";
      const status = f.shut ? "administratively down" : "up";
      const proto = f.shut ? "down" : "up";
      L.push(n.padEnd(23) + ip.padEnd(16) + "YES manual " + status.padEnd(24) + proto);
    });
    return L.join("\n");
  }

  function showRoute(d) {
    const L = ["Codes: C - connected, S - static", ""];
    connected(d).forEach((c) => {
      L.push("C    " + c.net + "/" + c.prefix + " is directly connected, " + c.ifName);
    });
    d.routes.forEach((r) => {
      L.push("S    " + r.net + "/" + prefixOfMask(r.mask) + " [" + r.ad + "/0] via " + r.nh);
    });
    return L.join("\n");
  }

  function showVlan(d) {
    const L = ["VLAN Name                             Status    Ports",
      "---- -------------------------------- --------- -------------------------------"];
    Object.keys(d.vlans).forEach((id) => {
      const ports = Object.keys(d.ifaces).filter((n) => d.ifaces[n].mode === "access" &&
        d.ifaces[n].access === parseInt(id, 10));
      L.push(String(id).padEnd(5) + d.vlans[id].name.padEnd(33) + "active    " + ports.join(", "));
    });
    return L.join("\n");
  }

  function showStp(lab, dev, rest) {
    const id = parseInt(rest[2], 10) || 1;
    const sw = Object.values(lab.devices).filter((x) => x.kind === "switch");
    const prio = (x) => (x.stp[id] !== undefined ? x.stp[id] : DEFAULT_PRIO);
    sw.sort((x, y) => prio(x) - prio(y) || (x.name < y.name ? -1 : 1));
    const root = sw[0] || lab.devices[dev];
    const me = lab.devices[dev];
    const L = ["VLAN" + ("000" + id).slice(-4),
      "  Root ID    Priority    " + prio(root) + "  (" + root.hostname + ")",
      "  Bridge ID  Priority    " + prio(me) + "  (" + me.hostname + ")"];
    if (root === me) L.push("  This bridge is the root");
    return L.join("\n");
  }

  function runningConfig(d) {
    const L = ["hostname " + d.hostname, "!"];
    Object.keys(d.vlans).forEach((id) => {
      if (id === "1") return;
      L.push("vlan " + id, " name " + d.vlans[id].name, "!");
    });
    if (d.routing) L.push("ip routing");
    if (d.defaultGateway) L.push("ip default-gateway " + d.defaultGateway);
    Object.keys(d.stp).forEach((id) => L.push("spanning-tree vlan " + id + " priority " + d.stp[id]));
    Object.keys(d.ifaces).forEach((n) => {
      const f = d.ifaces[n];
      L.push("interface " + n);
      if (f.desc) L.push(" description " + f.desc);
      if (f.ip) L.push(" ip address " + f.ip + " " + f.mask);
      if (f.mode) L.push(" switchport mode " + f.mode);
      if (f.mode === "access") L.push(" switchport access vlan " + f.access);
      if (f.mode === "trunk") {
        if (f.allowed) L.push(" switchport trunk allowed vlan " + f.allowed.join(","));
        if (f.native !== 1) L.push(" switchport trunk native vlan " + f.native);
      }
      if (f.portfast) L.push(" spanning-tree portfast");
      if (f.bpduguard) L.push(" spanning-tree bpduguard enable");
      if (f.nat) L.push(" ip nat " + f.nat);
      if (f.aclIn) L.push(" ip access-group " + f.aclIn + " in");
      if (f.aclOut) L.push(" ip access-group " + f.aclOut + " out");
      if (f.shut) L.push(" shutdown");
      else if (d.kind === "router") L.push(" no shutdown");
      L.push("!");
    });
    if (d.ospf) {
      L.push("router ospf " + d.ospf.pid);
      if (d.ospf.rid) L.push(" router-id " + d.ospf.rid);
      d.ospf.nets.forEach((n) => L.push(" network " + n.net + " " + n.wild + " area " + n.area));
    }
    d.routes.forEach((r) => L.push("ip route " + r.net + " " + r.mask + " " + r.nh + (r.ad !== 1 ? " " + r.ad : "")));
    Object.keys(d.acl).forEach((n) => d.acl[n].forEach((e) =>
      L.push("access-list " + n + " " + e.action + " " + e.net + " " + e.wild)));
    d.logHosts.forEach((h) => L.push("logging host " + h));
    L.push("end");
    return L.join("\n");
  }

  // ---------- görev denetimi ----------
  function taskResults(q, lab) {
    return (q.tasks || []).map((t) => {
      try { return !!t.check(lab); } catch (e) { return false; }
    });
  }

  // ---------- topoloji çizimi ----------
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function renderTopology(topo) {
    const W = 640, H = 300;
    const pos = {};
    topo.devices.forEach((d) => { pos[d.name] = d; });
    let s = '<svg viewBox="0 0 ' + W + " " + H + '" xmlns="http://www.w3.org/2000/svg" class="topo" role="img">';
    (topo.links || []).forEach((l) => {
      const a = pos[l.a], b = pos[l.b];
      if (!a || !b) return;
      s += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" class="lnk"/>';
      const ax = a.x + (b.x - a.x) * 0.2, ay = a.y + (b.y - a.y) * 0.2;
      const bx = a.x + (b.x - a.x) * 0.8, by = a.y + (b.y - a.y) * 0.8;
      if (l.ai) s += '<text x="' + ax + '" y="' + (ay - 6) + '" class="ifl">' + esc(l.ai) + "</text>";
      if (l.bi) s += '<text x="' + bx + '" y="' + (by - 6) + '" class="ifl">' + esc(l.bi) + "</text>";
      if (l.label) {
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        s += '<text x="' + mx + '" y="' + (my + 14) + '" class="lbl">' + esc(l.label) + "</text>";
      }
    });
    topo.devices.forEach((d) => {
      s += '<rect x="' + (d.x - 58) + '" y="' + (d.y - 22) + '" width="116" height="44" rx="8" class="dev dev-' + d.type + '"/>';
      s += '<text x="' + d.x + '" y="' + (d.y + 2) + '" class="dn">' + esc(d.name) + "</text>";
      const sub = d.type === "pc" ? "PC" : d.type === "switch" ? "Switch" : "Router";
      s += '<text x="' + d.x + '" y="' + (d.y + 16) + '" class="dt">' + sub + "</text>";
    });
    return s + "</svg>";
  }

  window.IOSLab = {
    canonIf: canonIf,
    createLab: createLab,
    run: run,
    prompt: prompt,
    replay: replay,
    taskResults: taskResults,
    renderTopology: renderTopology
  };
})();
