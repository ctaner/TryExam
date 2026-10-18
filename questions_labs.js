// TryExam - topoloji + görev tabanlı simülasyon soruları (IOS benzeri konsol)
// Her soru: topology (çizim + bağlantılar), devices (konsol sekmeleri), init (başlangıç yapılandırması),
// tasks (görev metni + cihaz durumu üzerinden denetim). Tüm görevler tamamlanmalıdır.
// Özgün senaryolar: Cisco sınav içeriği kullanılmamıştır.

// Yardımcılar: durumdan arayüz/cihaz almak için
const LAB_IF = (lab, dev, name) => {
  const d = lab.devices[dev];
  return d ? d.ifaces[IOSLab.canonIf(name)] : undefined;
};
const LAB_DEV = (lab, dev) => lab.devices[dev];
const LAB_SAME = (a, b) => JSON.stringify(a) === JSON.stringify(b);

QUESTIONS.push(
  // ---------- 2.0 Switching: VLAN ve trunk ----------
  {
    type: "lab", domain: 2,
    q: "Şekildeki topolojide SW1 anahtarında VLAN'ları ve port yapılandırmasını tamamlayın. SW2 tarafı bu görevin kapsamında değildir.",
    topology: {
      devices: [
        { name: "PC-A", type: "pc", x: 110, y: 70 },
        { name: "PC-B", type: "pc", x: 110, y: 230 },
        { name: "SW1", type: "switch", x: 320, y: 150 },
        { name: "SW2", type: "switch", x: 540, y: 150 }
      ],
      links: [
        { a: "PC-A", ai: "", b: "SW1", bi: "Gi0/1", label: "VLAN 10" },
        { a: "PC-B", ai: "", b: "SW1", bi: "Gi0/2", label: "VLAN 20" },
        { a: "SW1", ai: "Gi0/24", b: "SW2", bi: "Gi0/24", label: "Trunk" }
      ]
    },
    devices: ["SW1"],
    init: {},
    tasks: [
      { text: "SW1 üzerinde VLAN 10'u 'SALES', VLAN 20'yi 'ENG' adıyla oluşturun.",
        check: (lab) => LAB_DEV(lab, "SW1").vlans[10] && LAB_DEV(lab, "SW1").vlans[10].name.toUpperCase() === "SALES" &&
          LAB_DEV(lab, "SW1").vlans[20] && LAB_DEV(lab, "SW1").vlans[20].name.toUpperCase() === "ENG" },
      { text: "Gi0/1 portunu erişim (access) portu yapın ve VLAN 10'a atayın.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Gi0/1"); return !!f && f.mode === "access" && f.access === 10; } },
      { text: "Gi0/2 portunu erişim (access) portu yapın ve VLAN 20'ye atayın.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Gi0/2"); return !!f && f.mode === "access" && f.access === 20; } },
      { text: "Gi0/24 portunu trunk yapın ve trunk üzerinden yalnızca VLAN 10 ve 20'nin geçmesine izin verin.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Gi0/24"); return !!f && f.mode === "trunk" && LAB_SAME(f.allowed, [10, 20]); } }
    ],
    explain: "VLAN'lar 'vlan <no>' ile oluşturulur ve 'name' ile adlandırılır. Erişim portları 'switchport mode access' ve 'switchport access vlan' ile, trunk 'switchport mode trunk' ve 'switchport trunk allowed vlan' ile yapılandırılır."
  },

  // ---------- 2.0 Switching: STP ----------
  {
    type: "lab", domain: 2,
    q: "VLAN 10 için SW1 birincil kök köprü, SW2 yedek kök köprü olacaktır. SW1'in PC-A'ya bağlı portu hızlı geçiş ve BPDU koruması ile yapılandırılacaktır.",
    topology: {
      devices: [
        { name: "PC-A", type: "pc", x: 110, y: 100 },
        { name: "SW1", type: "switch", x: 320, y: 100 },
        { name: "SW2", type: "switch", x: 320, y: 220 }
      ],
      links: [
        { a: "PC-A", ai: "", b: "SW1", bi: "Gi0/1", label: "Erişim" },
        { a: "SW1", ai: "Gi0/24", b: "SW2", bi: "Gi0/24", label: "Trunk" }
      ]
    },
    devices: ["SW1", "SW2"],
    init: {},
    tasks: [
      { text: "SW1'de VLAN 10 için birincil kök köprü (root primary) ayarlayın.",
        check: (lab) => LAB_DEV(lab, "SW1").stp[10] === 24576 },
      { text: "SW2'de VLAN 10 için yedek kök köprü (root secondary) ayarlayın.",
        check: (lab) => LAB_DEV(lab, "SW2").stp[10] === 28672 },
      { text: "SW1 Gi0/1 portunda PortFast ve BPDU Guard'ı etkinleştirin.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Gi0/1"); return !!f && f.portfast && f.bpduguard; } }
    ],
    explain: "'spanning-tree vlan 10 root primary' köprü önceliğini 24576 yapar; secondary 28672'dir. Erişim portlarında 'spanning-tree portfast' ve 'spanning-tree bpduguard enable' birlikte kullanılır."
  },

  // ---------- 1.0 Network Infrastructure: SVI ve Katman 3 anahtar ----------
  {
    type: "lab", domain: 1,
    q: "SW1 çok katmanlı bir anahtardır ve VLAN 10 ile VLAN 20 arasında yönlendirme yapacaktır. Her iki VLAN için SVI'ları yapılandırın ve doğrulayın.",
    topology: {
      devices: [
        { name: "PC-A", type: "pc", x: 110, y: 70 },
        { name: "PC-B", type: "pc", x: 110, y: 230 },
        { name: "SW1", type: "switch", x: 320, y: 150 }
      ],
      links: [
        { a: "PC-A", ai: "", b: "SW1", bi: "Gi0/1", label: "VLAN 10 (SALES)" },
        { a: "PC-B", ai: "", b: "SW1", bi: "Gi0/2", label: "VLAN 20 (ENG)" }
      ]
    },
    devices: ["SW1"],
    init: {
      "SW1": [
        "vlan 10", "name SALES", "exit",
        "vlan 20", "name ENG", "exit",
        "interface GigabitEthernet0/1", "switchport mode access", "switchport access vlan 10", "exit"
      ]
    },
    tasks: [
      { text: "SW1 üzerinde IP yönlendirmeyi etkinleştirin.",
        check: (lab) => LAB_DEV(lab, "SW1").routing === true },
      { text: "VLAN 10 SVI'sına 192.168.10.1/24 adresini atayın ve arayüzü etkinleştirin.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Vlan10"); return !!f && f.ip === "192.168.10.1" && f.mask === "255.255.255.0" && !f.shut; } },
      { text: "VLAN 20 SVI'sına 192.168.20.1/24 adresini atayın ve arayüzü etkinleştirin.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Vlan20"); return !!f && f.ip === "192.168.20.1" && f.mask === "255.255.255.0" && !f.shut; } },
      { text: "SW1'den 192.168.20.1 adresine ping testi yapın ve başarılı olduğunu doğrulayın.",
        check: (lab) => lab.pings.some((p) => p.dev === "SW1" && p.ip === "192.168.20.1" && p.ok) }
    ],
    explain: "Katman 3 anahtarda 'ip routing' açılır ve her VLAN için 'interface vlan <no>' ile SVI oluşturulup IP atanır. SVI'nın up olması için VLAN'ın aktif ve bir portunun up olması gerekir."
  },

  // ---------- 3.0 IP Routing: statik yollar ----------
  {
    type: "lab", domain: 3,
    q: "R1, R2 ile 10.0.12.0/30 ağı üzerinden bağlıdır. R1'de 192.168.2.0/24 ağına statik yol ve yedek bir varsayılan yol yapılandırılacaktır.",
    topology: {
      devices: [
        { name: "PC1", type: "pc", x: 110, y: 150 },
        { name: "R1", type: "router", x: 320, y: 150 },
        { name: "R2", type: "router", x: 540, y: 150 },
        { name: "PC2", type: "pc", x: 540, y: 260 }
      ],
      links: [
        { a: "PC1", ai: "", b: "R1", bi: "Gi0/1", label: "192.168.1.0/24" },
        { a: "R1", ai: "Gi0/0", b: "R2", bi: "Gi0/0", label: "10.0.12.0/30" },
        { a: "R2", ai: "Gi0/1", b: "PC2", bi: "", label: "192.168.2.0/24" }
      ]
    },
    devices: ["R1"],
    init: {},
    tasks: [
      { text: "R1 Gi0/0 arayüzüne 10.0.12.1/30 adresini atayın ve arayüzü etkinleştirin.",
        check: (lab) => { const f = LAB_IF(lab, "R1", "Gi0/0"); return !!f && f.ip === "10.0.12.1" && f.mask === "255.255.255.252" && !f.shut; } },
      { text: "R1 Gi0/1 arayüzüne 192.168.1.1/24 adresini atayın ve arayüzü etkinleştirin.",
        check: (lab) => { const f = LAB_IF(lab, "R1", "Gi0/1"); return !!f && f.ip === "192.168.1.1" && f.mask === "255.255.255.0" && !f.shut; } },
      { text: "R1'de 192.168.2.0/24 ağına, sonraki atlama 10.0.12.2 olacak şekilde statik yol ekleyin.",
        check: (lab) => LAB_DEV(lab, "R1").routes.some((r) => r.net === "192.168.2.0" && r.mask === "255.255.255.0" && r.nh === "10.0.12.2" && r.ad === 1) },
      { text: "R1'de yedek (floating) varsayılan yol ekleyin: 0.0.0.0/0, sonraki atlama 10.0.12.2, AD 200.",
        check: (lab) => LAB_DEV(lab, "R1").routes.some((r) => r.net === "0.0.0.0" && r.mask === "0.0.0.0" && r.nh === "10.0.12.2" && r.ad === 200) },
      { text: "R1'den 10.0.12.2 adresine ping testi yapın ve başarılı olduğunu doğrulayın.",
        check: (lab) => lab.pings.some((p) => p.dev === "R1" && p.ip === "10.0.12.2" && p.ok) }
    ],
    explain: "Statik yol 'ip route <ağ> <maske> <sonraki-atlama>' ile eklenir. Yedek yol için AD değeri dinamik yollardan yüksek (ör. 200) verilir. Ping doğrulaması için hedef, bağlı bir alt ağda olmalıdır."
  },

  // ---------- 3.0 IP Routing: OSPF ----------
  {
    type: "lab", domain: 3,
    q: "R1 yönlendiricisinde OSPFv2 yapılandırılacaktır. Bağlı iki ağ area 0 içine alınacak ve router ID ayarlanacaktır.",
    topology: {
      devices: [
        { name: "R1", type: "router", x: 320, y: 150 },
        { name: "R2", type: "router", x: 540, y: 150 },
        { name: "PC1", type: "pc", x: 110, y: 150 }
      ],
      links: [
        { a: "R1", ai: "Gi0/0", b: "R2", bi: "Gi0/0", label: "10.0.12.0/30" },
        { a: "PC1", ai: "", b: "R1", bi: "Gi0/1", label: "192.168.1.0/24" }
      ]
    },
    devices: ["R1"],
    init: {
      "R1": [
        "interface GigabitEthernet0/0", "ip address 10.0.12.1 255.255.255.252", "no shutdown", "exit",
        "interface GigabitEthernet0/1", "ip address 192.168.1.1 255.255.255.0", "no shutdown", "exit"
      ]
    },
    tasks: [
      { text: "R1'de OSPF sürecini 1 numarasıyla oluşturun.",
        check: (lab) => !!LAB_DEV(lab, "R1").ospf && LAB_DEV(lab, "R1").ospf.pid === 1 },
      { text: "10.0.12.0/30 ağını area 0'a dahil edin.",
        check: (lab) => !!LAB_DEV(lab, "R1").ospf && LAB_DEV(lab, "R1").ospf.nets.some((n) => n.net === "10.0.12.0" && n.wild === "0.0.0.3" && n.area === "0") },
      { text: "192.168.1.0/24 ağını area 0'a dahil edin.",
        check: (lab) => !!LAB_DEV(lab, "R1").ospf && LAB_DEV(lab, "R1").ospf.nets.some((n) => n.net === "192.168.1.0" && n.wild === "0.0.0.255" && n.area === "0") },
      { text: "OSPF Router ID'yi 1.1.1.1 olarak ayarlayın.",
        check: (lab) => !!LAB_DEV(lab, "R1").ospf && LAB_DEV(lab, "R1").ospf.rid === "1.1.1.1" }
    ],
    explain: "OSPF 'router ospf <pid>' ile başlatılır. 'network <ağ> <wildcard> area <no>' komutu arayüzleri area'ya dahil eder. Wildcard maske, /30 için 0.0.0.3, /24 için 0.0.0.255'tir."
  },

  // ---------- 4.0 Network Services: ACL ve NAT ----------
  {
    type: "lab", domain: 4,
    q: "R1 yönlendiricisinde iç ağ (192.168.1.0/24) ile dış ağ (WAN) arasında NAT ve trafik filtreleme yapılandırılacaktır.",
    topology: {
      devices: [
        { name: "PC1", type: "pc", x: 110, y: 150 },
        { name: "R1", type: "router", x: 320, y: 150 },
        { name: "ISP", type: "router", x: 540, y: 150 }
      ],
      links: [
        { a: "PC1", ai: "", b: "R1", bi: "Gi0/1", label: "İç ağ (inside)" },
        { a: "R1", ai: "Gi0/0", b: "ISP", bi: "", label: "WAN (outside)" }
      ]
    },
    devices: ["R1"],
    init: {
      "R1": [
        "interface GigabitEthernet0/0", "ip address 10.0.12.1 255.255.255.252", "no shutdown", "exit",
        "interface GigabitEthernet0/1", "ip address 192.168.1.1 255.255.255.0", "no shutdown", "exit"
      ]
    },
    tasks: [
      { text: "Gi0/1 arayüzünü NAT iç (inside), Gi0/0 arayüzünü NAT dış (outside) olarak işaretleyin.",
        check: (lab) => { const a = LAB_IF(lab, "R1", "Gi0/1"), b = LAB_IF(lab, "R1", "Gi0/0"); return !!a && !!b && a.nat === "inside" && b.nat === "outside"; } },
      { text: "192.168.1.0/24 ağına izin veren standart ACL 10'u oluşturun.",
        check: (lab) => { const acl = LAB_DEV(lab, "R1").acl["10"]; return !!acl && acl.some((e) => e.action === "permit" && e.net === "192.168.1.0" && e.wild === "0.0.0.255"); } },
      { text: "ACL 10'u Gi0/1 arayüzüne gelen (in) yönde uygulayın.",
        check: (lab) => { const f = LAB_IF(lab, "R1", "Gi0/1"); return !!f && f.aclIn === "10"; } }
    ],
    explain: "NAT'ta iç arayüz 'ip nat inside', dış arayüz 'ip nat outside' ile işaretlenir. ACL 'access-list <no> permit <ağ> <wildcard>' ile oluşturulur ve arayüzde 'ip access-group <no> in' ile uygulanır."
  },

  // ---------- 5.0 Network Operations: yönetim ----------
  {
    type: "lab", domain: 5,
    q: "R1 yönlendiricisi için temel yönetim ayarları yapılandırılacaktır: cihaz adı, syslog sunucusu ve arayüz açıklaması.",
    topology: {
      devices: [
        { name: "R1", type: "router", x: 320, y: 150 },
        { name: "R2", type: "router", x: 540, y: 150 },
        { name: "SYSLOG", type: "pc", x: 320, y: 40 }
      ],
      links: [
        { a: "R1", ai: "Gi0/0", b: "R2", bi: "Gi0/0", label: "WAN" }
      ]
    },
    devices: ["R1"],
    init: {},
    tasks: [
      { text: "Cihaz adını (hostname) 'EDGE-R1' olarak değiştirin.",
        check: (lab) => LAB_DEV(lab, "R1").hostname === "EDGE-R1" },
      { text: "Syslog mesajlarının gönderileceği sunucuyu 10.0.0.50 olarak tanımlayın.",
        check: (lab) => LAB_DEV(lab, "R1").logHosts.indexOf("10.0.0.50") !== -1 },
      { text: "Gi0/0 arayüzünün açıklamasını (description) 'WAN to R2' olarak ayarlayın.",
        check: (lab) => { const f = LAB_IF(lab, "R1", "Gi0/0"); return !!f && f.desc === "WAN to R2"; } }
    ],
    explain: "Cihaz adı 'hostname' ile değişir ve komut satırı istemi (prompt) bu adı yansıtır. Syslog için 'logging host <ip>' kullanılır. Arayüz açıklaması 'description <metin>' ile yazılır."
  }
);
