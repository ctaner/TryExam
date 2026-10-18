// TryExam - ek zor sorular (2. paket): cihaz çıktılı senaryolar, dikkat gerektiren çoklu seçimler,
// 3-4 cihazlı uzun topolojiler ve sorun giderme simülasyonları.
// Konular Cisco'nun herkese açık konu başlıklarına göre özgün olarak yazılmıştır.

QUESTIONS.push(
  // =====================================================================
  // CİHAZ ÇIKTILI SENARYOLAR (tek doğru cevap)
  // =====================================================================
  {
    domain: 3,
    q: "R1 yönlendirme tablosunda aşağıdaki iki giriş bulunmaktadır:\n\n" +
      "O    10.1.0.0/16 [110/20] via 192.168.1.2\n" +
      "R    10.1.4.0/24 [120/1] via 192.168.2.2\n\n" +
      "10.1.4.10 adresine giden bir paket hangi rotayı kullanır?",
    options: [
      "OSPF rotası; AD değeri (110) RIP'ten (120) düşük olduğu için",
      "RIP rotası; daha uzun (daha spesifik) prefix olduğu için",
      "Her iki rota eşit maliyetli olduğu için yük paylaşımı yapılır",
      "Paket düşürülür; iki rota çakıştığı için yönlendirme tablosu hatalıdır"
    ],
    answer: 1,
    explain: "Yönlendirme kararında önce en uzun prefix (en spesifik eşleşme) kullanılır. 10.1.4.10 adresi hem /16 hem /24 bloğuna girer; /24 daha spesifik olduğu için RIP rotası seçilir. AD değeri yalnızca aynı prefix için farklı kaynakları karşılaştırmada devreye girer."
  },
  {
    domain: 2,
    q: "İki anahtar arası trunk bağlantıda CDP şu uyarıyı üretiyor:\n\n" +
      "%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on Gi0/24 (1), with SW2 Gi0/24 (99).\n\n" +
      "Bu durumun en olası sonucu nedir?",
    options: [
      "Etiketsiz (untagged) trafik iki uçta farklı VLAN'a ait sayılır ve VLAN'lar arası sızıntı veya trafik yanlış yere gidebilir",
      "Port otomatik olarak err-disable durumuna geçer ve trafik tamamen durur",
      "Trunk otomatik olarak access moduna döner",
      "Her iki anahtarda VLAN 99 kendiliğinden oluşur ve ağ düzelir"
    ],
    answer: 0,
    explain: "Native VLAN uyuşmazlığında port açık kalır, ancak etiketsiz çerçeveler iki uçta farklı VLAN'a eşlenir. Bu hem bağlantıyı bozabilir hem de güvenlik riski yaratabilir. Çözüm, iki uçta aynı native VLAN'ı tanımlamaktır."
  },
  {
    domain: 3,
    q: "Bir yönlendiricide 'show ip interface brief' çıktısının ilgili satırı şöyledir:\n\n" +
      "GigabitEthernet0/1   192.168.5.1   YES manual administratively down down\n\n" +
      "192.168.5.0/24 ağındaki bir cihaz bu yönlendiriciye ulaşamıyor. En olası neden nedir?",
    options: [
      "Gi0/1 arayüzünde 'shutdown' komutu uygulanmış (yönetimsel olarak kapalı)",
      "Gi0/1 arayüzünde ACL 'in' yönünde uygulanmış",
      "Yönlendirici 'ip routing' komutunu almamış",
      "Gi0/1 bir trunk porttur ve VLAN etiketleri eksiktir"
    ],
    answer: 0,
    explain: "'administratively down' çıktısı arayüzün yapılandırmada kapatıldığını (shutdown) gösterir. Protokol durumu da down olduğu için arayüz üzerinden trafik geçmez. ACL veya trunk ayarları bu durumu üretmez."
  },
  {
    domain: 4,
    q: "Bir ofis ağında istemciler 169.254.x.x adresi alıyor. DHCP sunucusu farklı bir alt ağda bulunuyor ve yalnızca yönlendirici üzerinden erişilebiliyor. Bu sorunu doğrudan çözen yapılandırma hangisidir?",
    options: [
      "İstemci LAN arayüzünde yönlendiricide DHCP relay (ip helper-address) yapılandırılması",
      "İstemcilere statik IP adresi verilmesi",
      "DHCP sunucusunda 'ip dhcp snooping trust' komutunun kaldırılması",
      "İstemci portunda port security özelliğinin kapatılması"
    ],
    answer: 0,
    explain: "169.254.x.x adresi (APIPA) istemcinin DHCP yanıtı alamadığını gösterir. DHCP istekleri yayın (broadcast) olarak gönderildiği için yönlendirici bunları ileten (relay) ayarla sunucuya taşımalıdır. Bu, ip helper-address komutuyla yapılır."
  },
  {
    domain: 1,
    q: "172.16.45.200/20 adresinin ait olduğu alt ağın ağ adresi (network address) hangisidir?",
    options: [
      "172.16.32.0",
      "172.16.40.0",
      "172.16.45.0",
      "172.16.0.0"
    ],
    answer: 0,
    explain: "/20 maskesinde üçüncü oktetin blok büyüklüğü 16'dır: 0-15, 16-31, 32-47 ... 45 değeri 32-47 bloğuna düşer. Ağ adresi 172.16.32.0, yayın adresi 172.16.47.255'tir."
  },
  {
    domain: 2,
    q: "Bir erişim portunda 'switchport port-security maximum 1' ve 'switchport port-security violation restrict' komutları yapılandırılmıştır. Port üzerinde izin verilen sınırı aşan yeni bir MAC adresi göründüğünde ne olur?",
    options: [
      "Port err-disabled durumuna geçer ve yalnızca manuel 'shutdown' / 'no shutdown' ile açılır",
      "Port açık kalır, yetkisiz çerçeveler düşürülür, ihlal sayacı artar ve uyarı üretilir",
      "Port kapanır ancak hiçbir syslog mesajı üretilmez",
      "Port otomatik olarak trunk moduna geçer"
    ],
    answer: 1,
    explain: "restrict modunda port açık kalır; yetkisiz kaynaklı çerçeveler düşürülür, ihlal sayacı artar ve syslog uyarısı üretilir. err-disable yalnızca 'shutdown' modunda oluşur."
  },
  {
    domain: 2,
    q: "Bir anahtarda 'show ip interface brief' çıktısında Vlan10 arayüzü 'up/down' durumunda görünüyor. Yönetimsel olarak kapalı değildir. Aşağıdakilerden hangisi en olası nedendir?",
    options: [
      "VLAN 10 anahtarda tanımlı değil veya VLAN 10'a atanmış aktif (up) bir port bulunmuyor",
      "Vlan10 arayüzünde 'shutdown' komutu uygulanmıştır",
      "Anahtar 'ip routing' komutuna sahip değildir",
      "Vlan10 arayüzünün MTU değeri çok büyüktür"
    ],
    answer: 0,
    explain: "'up/down' durumunda arayüz yönetimsel olarak açıktır (up), ancak satır protokolü (line protocol) down'dır. SVI'nin ayakta kalması için VLAN'ın var olması ve o VLAN'da en az bir aktif portun bulunması gerekir."
  },
  {
    domain: 5,
    q: "Bir ağ yöneticisi uzaktan yönetim erişimini en güvenli hale getirmek istiyor. Aşağıdakilerden hangisi en iyi uygulamadır?",
    options: [
      "'transport input telnet' ile 'login' ve 'enable secret' kullanmak",
      "SSH sürüm 2'yi etkinleştirmek, yerel kullanıcı tanımlamak ve vty hatlarında 'login local' ile 'transport input ssh' kullanmak",
      "Yalnızca 'enable password' tanımlayıp HTTP yönetimini açmak",
      "SNMPv2c community string 'public' ile yönetim yapmak"
    ],
    answer: 1,
    explain: "Telnet şifrelemez. SSH trafiği şifreler, yerel kullanıcı kimlik doğrulaması ise vty hatlarında 'login local' ile yapılır. Bu üçlü (SSH, yerel kullanıcı, yalnızca SSH girişi) en iyi uygulama olarak kabul edilir."
  },

  // =====================================================================
  // DİKKAT GEREKTİREN ÇOKLU SEÇİMLER (tam olarak 2 doğru seçenek)
  // =====================================================================
  {
    type: "multi", domain: 2,
    q: "Trunk port hakkında DOĞRU İKİ ifadeyi seçin.",
    options: [
      "Modern Cisco anahtarlarında varsayılan etiketleme protokolü 802.1Q'dur",
      "Native VLAN etiketsiz (untagged) çerçeveleri taşır",
      "Bir trunk yalnızca tek bir VLAN taşıyabilir",
      "ISL, varsayılan ve tercih edilen kapsüllemedir"
    ],
    answer: [0, 1],
    explain: "Modern Catalyst anahtarlar 802.1Q kullanır; ISL eskidir ve desteklenmez. Trunk birden fazla VLAN'ı taşır; native VLAN ise etiketsiz çerçeveleri taşıyan VLAN'dır."
  },
  {
    type: "multi", domain: 3,
    q: "Yönlendirme tablosu ve statik rotalar hakkında DOĞRU İKİ ifadeyi seçin.",
    options: [
      "Floating static route, birincil rota kaybolduğunda devreye girmesi için daha yüksek AD değeriyle tanımlanır",
      "0.0.0.0/0 varsayılan rota, eşleşen daha spesifik bir rota yoksa kullanılır",
      "Statik rotanın varsayılan AD değeri 110'dur",
      "Varsayılan rota her zaman en yüksek AD değerine sahiptir"
    ],
    answer: [0, 1],
    explain: "Floating static route, birincil (daha düşük AD'li) rota yok olduğunda devreye girer. Statik rotanın varsayılan AD değeri 1'dir (110, OSPF'in AD değeridir). Varsayılan rota yalnızca diğer eşleşmeler yoksa kullanılır."
  },
  {
    type: "multi", domain: 4,
    q: "Standart ACL hakkında DOĞRU İKİ ifadeyi seçin.",
    options: [
      "Yalnızca kaynak IP adresine göre filtreleme yapar",
      "Hedefe mümkün olduğunca yakın bir yere uygulanması önerilir",
      "Port numarasına göre filtreleme yapar",
      "100-199 arası numaralandırma kullanır"
    ],
    answer: [0, 1],
    explain: "Standart ACL yalnızca kaynak adrese bakar; bu nedenle genellikle hedefe yakın uygulanır ki yanlışlıkla diğer trafiği engellemesin. Port filtreleme genişletilmiş ACL'ye özgüdür; 100-199 genişletilmiş ACL aralığıdır."
  },
  {
    type: "multi", domain: 5,
    q: "SNMPv3 hakkında DOĞRU İKİ ifadeyi seçin.",
    options: [
      "authPriv güvenlik seviyesi hem kimlik doğrulama hem de şifreleme sağlar",
      "Kullanıcı tabanlı kimlik doğrulama ve gizlilik (şifreleme) destekler",
      "Yalnızca community string ile yetkilendirme yapar",
      "SNMPv2c'den daha az güvenlidir"
    ],
    answer: [0, 1],
    explain: "SNMPv3 kullanıcı tabanlı kimlik doğrulama (MD5/SHA) ve gizlilik (DES/AES) sunar. Community string yalnızca SNMPv1/v2c'de kullanılır ve güvenlik açısından zayıftır."
  },
  {
    type: "multi", domain: 1,
    q: "Ethernet ağındaki çarpışma (collision) ve alan kavramları hakkında DOĞRU İKİ ifadeyi seçin.",
    options: [
      "Tam dupleks (full-duplex) bağlantıda çarpışma alanı (collision domain) oluşmaz",
      "Bir anahtarın her portu ayrı bir çarpışma alanıdır",
      "Bir hub'ın her portu ayrı bir çarpışma alanıdır",
      "Anahtarlar yayın (broadcast) alanlarını birbirinden ayırır"
    ],
    answer: [0, 1],
    explain: "Tam dupleks bağlantıda CSMA/CD gerekmez, dolayısıyla çarpışma alanı yoktur. Anahtar her portu ayrı çarpışma alanı yapar. Hub tüm portları tek çarpışma alanında tutar. Anahtar yayın alanlarını ayırmaz; bunu VLAN'lar ve yönlendiriciler yapar."
  },
  {
    type: "multi", domain: 3,
    q: "OSPF'de DR (Designated Router) seçimi hakkında DOĞRU İKİ ifadeyi seçin.",
    options: [
      "Öncelik (priority) değeri en yüksek olan arayüz DR seçilir",
      "Aynı çok erişimli (multiaccess) ağda yalnızca bir DR ve bir BDR bulunur",
      "Router ID her zaman en düşük IP adresine göre seçilir",
      "Hello ve Dead aralıkları komşular arasında farklı olabilir"
    ],
    answer: [0, 1],
    explain: "DR seçiminde önce öncelik değeri, eşitse Router ID karşılaştırılır. Her çok erişimli segmentte bir DR ve bir BDR vardır. Router ID genellikle en yüksek IP'ye göre seçilir. Hello ve Dead aralıkları komşular arasında eşleşmelidir."
  },

  // =====================================================================
  // UZUN TOPOLOJİLER (3-4 cihaz)
  // =====================================================================
  {
    type: "lab", domain: 3,
    q: "Üç yönlendirici arasında iki LAN'ı birbirine bağlayan bir yönlendirme yapılandırılacaktır. R1 ve R3 üzerindeki LAN'lar birbirine statik rotalarla ulaşmalıdır. R2 yalnızca transit yönlendiricidir ve bu görevde ek rota gerektirmez.",
    topology: {
      devices: [
        { name: "PC-1", type: "pc", x: 60, y: 150 },
        { name: "R1", type: "router", x: 200, y: 150 },
        { name: "R2", type: "router", x: 380, y: 150 },
        { name: "R3", type: "router", x: 560, y: 150 },
        { name: "PC-2", type: "pc", x: 700, y: 150 }
      ],
      links: [
        { a: "PC-1", ai: "", b: "R1", bi: "Gi0/1", label: "192.168.1.0/24" },
        { a: "R1", ai: "Gi0/0", b: "R2", bi: "Gi0/0", label: "10.0.12.0/30" },
        { a: "R2", ai: "Gi0/1", b: "R3", bi: "Gi0/0", label: "10.0.23.0/30" },
        { a: "R3", ai: "Gi0/1", b: "PC-2", bi: "", label: "192.168.3.0/24" }
      ]
    },
    devices: ["R1", "R2", "R3"],
    init: {},
    tasks: [
      { text: "R1 üzerinde Gi0/0 (10.0.12.1/30) ve Gi0/1 (192.168.1.1/24) arayüzlerini yapılandırıp etkinleştirin.",
        check: (lab) => { const a = LAB_IF(lab, "R1", "Gi0/0"), b = LAB_IF(lab, "R1", "Gi0/1");
          return !!a && !!b && a.ip === "10.0.12.1" && a.mask === "255.255.255.252" && !a.shut &&
            b.ip === "192.168.1.1" && b.mask === "255.255.255.0" && !b.shut; } },
      { text: "R2 üzerinde Gi0/0 (10.0.12.2/30) ve Gi0/1 (10.0.23.1/30) arayüzlerini yapılandırıp etkinleştirin.",
        check: (lab) => { const a = LAB_IF(lab, "R2", "Gi0/0"), b = LAB_IF(lab, "R2", "Gi0/1");
          return !!a && !!b && a.ip === "10.0.12.2" && a.mask === "255.255.255.252" && !a.shut &&
            b.ip === "10.0.23.1" && b.mask === "255.255.255.252" && !b.shut; } },
      { text: "R3 üzerinde Gi0/0 (10.0.23.2/30) ve Gi0/1 (192.168.3.1/24) arayüzlerini yapılandırıp etkinleştirin.",
        check: (lab) => { const a = LAB_IF(lab, "R3", "Gi0/0"), b = LAB_IF(lab, "R3", "Gi0/1");
          return !!a && !!b && a.ip === "10.0.23.2" && a.mask === "255.255.255.252" && !a.shut &&
            b.ip === "192.168.3.1" && b.mask === "255.255.255.0" && !b.shut; } },
      { text: "R1'de 192.168.3.0/24 ağına statik rota ekleyin (ileti noktası 10.0.12.2).",
        check: (lab) => LAB_DEV(lab, "R1").routes.some((r) => r.net === "192.168.3.0" && r.mask === "255.255.255.0" && r.nh === "10.0.12.2") },
      { text: "R3'te 192.168.1.0/24 ağına statik rota ekleyin (ileti noktası 10.0.23.1).",
        check: (lab) => LAB_DEV(lab, "R3").routes.some((r) => r.net === "192.168.1.0" && r.mask === "255.255.255.0" && r.nh === "10.0.23.1") }
    ],
    explain: "Her yönlendiricinin bağlı olduğu alt ağlarda doğru IP ve maskeler olmalıdır. Uzak LAN'lara ulaşmak için her iki uçta da karşı LAN'ı işaret eden statik rota gerekir. Transit yönlendirici R2 bağlı rotalarıyla yönlendirmeyi kendisi yapar."
  },
  {
    type: "lab", domain: 2,
    q: "Dört anahtardan oluşan halka (ring) topolojide VLAN 10 uçtan uca taşınacaktır. Tüm bağlantılar trunk olmalı ve yalnızca VLAN 10 izinli olmalıdır. SW1 VLAN 10 için birincil kök köprü, SW4 ise yedek kök köprü olacaktır.",
    topology: {
      devices: [
        { name: "SW1", type: "switch", x: 250, y: 90 },
        { name: "SW2", type: "switch", x: 450, y: 90 },
        { name: "SW3", type: "switch", x: 250, y: 230 },
        { name: "SW4", type: "switch", x: 450, y: 230 }
      ],
      links: [
        { a: "SW1", ai: "Gi0/1", b: "SW2", bi: "Gi0/1", label: "Trunk" },
        { a: "SW2", ai: "Gi0/2", b: "SW4", bi: "Gi0/1", label: "Trunk" },
        { a: "SW4", ai: "Gi0/2", b: "SW3", bi: "Gi0/2", label: "Trunk" },
        { a: "SW3", ai: "Gi0/1", b: "SW1", bi: "Gi0/2", label: "Trunk" }
      ]
    },
    devices: ["SW1", "SW2", "SW3", "SW4"],
    init: {},
    tasks: [
      { text: "Dört anahtarda da VLAN 10 (SALES) oluşturun.",
        check: (lab) => ["SW1", "SW2", "SW3", "SW4"].every((n) => LAB_DEV(lab, n).vlans[10] && LAB_DEV(lab, n).vlans[10].name.toUpperCase() === "SALES") },
      { text: "Her anahtarın Gi0/1 ve Gi0/2 portlarını trunk yapın; izinli VLAN listesi yalnızca 10 olsun.",
        check: (lab) => ["SW1", "SW2", "SW3", "SW4"].every((n) => ["Gi0/1", "Gi0/2"].every((p) => {
          const f = LAB_IF(lab, n, p);
          return !!f && f.mode === "trunk" && LAB_SAME(f.allowed, [10]);
        })) },
      { text: "SW1 üzerinde VLAN 10 için birincil kök köprü (root primary) ayarlayın.",
        check: (lab) => LAB_DEV(lab, "SW1").stp[10] === 24576 },
      { text: "SW4 üzerinde VLAN 10 için yedek kök köprü (root secondary) ayarlayın.",
        check: (lab) => LAB_DEV(lab, "SW4").stp[10] === 28672 }
    ],
    explain: "Halka topolojide STP bir bağlantıyı bloke eder. Kök köprü seçimi düşük köprü önceliğine göre yapılır; root primary 24576, root secondary 28672 değerini ayarlar. Trunk izin listesi her bağlantının iki ucunda aynı olmalıdır."
  },
  {
    type: "lab", domain: 5,
    q: "Bir ağda bir yönlendirici ve iki anahtar bulunmaktadır. Ağ yönetimi için hostname, syslog ve açıklama yapılandırmaları tamamlanacaktır.",
    topology: {
      devices: [
        { name: "R1", type: "router", x: 130, y: 150 },
        { name: "SW1", type: "switch", x: 330, y: 150 },
        { name: "SW2", type: "switch", x: 530, y: 150 },
        { name: "SYSLOG", type: "pc", x: 330, y: 270 }
      ],
      links: [
        { a: "R1", ai: "Gi0/0", b: "SW1", bi: "Gi0/24", label: "Uplink" },
        { a: "SW1", ai: "Gi0/24", b: "SW2", bi: "Gi0/24", label: "Trunk" },
        { a: "SW1", ai: "Gi0/1", b: "SYSLOG", bi: "", label: "10.0.0.50" }
      ]
    },
    devices: ["R1", "SW1", "SW2"],
    init: {},
    tasks: [
      { text: "SW1 anahtarının hostname'ini 'SW-CORE' olarak değiştirin.",
        check: (lab) => LAB_DEV(lab, "SW1").hostname === "SW-CORE" },
      { text: "R1, SW1 ve SW2 üzerinde syslog sunucusu olarak 10.0.0.50 tanımlayın.",
        check: (lab) => ["R1", "SW1", "SW2"].every((n) => LAB_DEV(lab, n).logHosts.indexOf("10.0.0.50") !== -1) },
      { text: "SW2 üzerindeki Gi0/24 arayüzüne açıklama olarak 'Uplink-SW1' yazın.",
        check: (lab) => { const f = LAB_IF(lab, "SW2", "Gi0/24"); return !!f && f.desc === "Uplink-SW1"; } },
      { text: "R1 üzerindeki Gi0/0 arayüzüne 10.0.0.1/24 adresini verin ve arayüzü etkinleştirin.",
        check: (lab) => { const f = LAB_IF(lab, "R1", "Gi0/0"); return !!f && f.ip === "10.0.0.1" && f.mask === "255.255.255.0" && !f.shut; } }
    ],
    explain: "Yönetim görevleri birden çok cihazda tekrar edilir. Syslog hedefi her cihazda ayrı tanımlanmalıdır. Açıklama (description) ve hostname değişiklikleri çalışan yapılandırmada ayrı ayrı yapılır."
  },
  {
    type: "lab", domain: 3,
    q: "Üç yönlendirici üzerinde OSPF yapılandırılacaktır. R1 yalnızca Area 0'da, R3 yalnızca Area 1'de çalışacaktır. R2 iki alan arasında sınır yönlendiricisidir (ABR) ve her iki alanda da ağları ilan edecektir.",
    topology: {
      devices: [
        { name: "R1", type: "router", x: 150, y: 150 },
        { name: "R2", type: "router", x: 350, y: 150 },
        { name: "R3", type: "router", x: 550, y: 150 },
        { name: "PC-3", type: "pc", x: 680, y: 150 }
      ],
      links: [
        { a: "R1", ai: "Gi0/0", b: "R2", bi: "Gi0/0", label: "10.0.12.0/30 (Area 0)" },
        { a: "R2", ai: "Gi0/1", b: "R3", bi: "Gi0/0", label: "10.0.23.0/30 (Area 1)" },
        { a: "R3", ai: "Gi0/1", b: "PC-3", bi: "", label: "192.168.3.0/24 (Area 1)" }
      ]
    },
    devices: ["R1", "R2", "R3"],
    init: {},
    tasks: [
      { text: "R1, R2 ve R3 üzerinde OSPF süreci 1'i başlatın; Router ID değerleri sırasıyla 1.1.1.1, 2.2.2.2 ve 3.3.3.3 olsun.",
        check: (lab) => LAB_DEV(lab, "R1").ospf && LAB_DEV(lab, "R1").ospf.pid === 1 && LAB_DEV(lab, "R1").ospf.rid === "1.1.1.1" &&
          LAB_DEV(lab, "R2").ospf && LAB_DEV(lab, "R2").ospf.pid === 1 && LAB_DEV(lab, "R2").ospf.rid === "2.2.2.2" &&
          LAB_DEV(lab, "R3").ospf && LAB_DEV(lab, "R3").ospf.pid === 1 && LAB_DEV(lab, "R3").ospf.rid === "3.3.3.3" },
      { text: "R1 üzerinde 10.0.12.0/30 ağını Area 0'a ekleyin.",
        check: (lab) => LAB_DEV(lab, "R1").ospf && LAB_DEV(lab, "R1").ospf.nets.some((n) => n.net === "10.0.12.0" && n.wild === "0.0.0.3" && n.area === "0") },
      { text: "R2 üzerinde 10.0.12.0/30 ağını Area 0'a, 10.0.23.0/30 ağını Area 1'e ekleyin.",
        check: (lab) => { const o = LAB_DEV(lab, "R2").ospf; return !!o &&
          o.nets.some((n) => n.net === "10.0.12.0" && n.wild === "0.0.0.3" && n.area === "0") &&
          o.nets.some((n) => n.net === "10.0.23.0" && n.wild === "0.0.0.3" && n.area === "1"); } },
      { text: "R3 üzerinde 10.0.23.0/30 ve 192.168.3.0/24 ağlarını Area 1'e ekleyin.",
        check: (lab) => { const o = LAB_DEV(lab, "R3").ospf; return !!o &&
          o.nets.some((n) => n.net === "10.0.23.0" && n.wild === "0.0.0.3" && n.area === "1") &&
          o.nets.some((n) => n.net === "192.168.3.0" && n.wild === "0.0.0.255" && n.area === "1"); } }
    ],
    explain: "OSPF çok alanlı tasarımda her yönlendirici ağları ait oldukları alanda ilan eder. ABR, iki alana da katılan yönlendiricidir. Router ID ve süreç numarası her yönlendiricide ayrı belirlenir."
  },

  // =====================================================================
  // SORUN GİDERME (mevcut yapılandırmadaki hataları düzeltme)
  // =====================================================================
  {
    type: "lab", domain: 2,
    q: "Mevcut yapılandırmada SW1 ile SW2 arasındaki trunk bağlantısında native VLAN uyuşmazlığı ve gereksiz bir VLAN var. PC-A VLAN 10'da olmalıdır. Hataları düzeltin.",
    topology: {
      devices: [
        { name: "PC-A", type: "pc", x: 80, y: 150 },
        { name: "SW1", type: "switch", x: 250, y: 150 },
        { name: "SW2", type: "switch", x: 430, y: 150 }
      ],
      links: [
        { a: "PC-A", ai: "", b: "SW2", bi: "Gi0/1", label: "VLAN 10" },
        { a: "SW1", ai: "Gi0/24", b: "SW2", bi: "Gi0/24", label: "Trunk" }
      ]
    },
    devices: ["SW2"],
    init: {
      "SW2": [
        "vlan 10", "vlan 20", "exit",
        "interface GigabitEthernet0/24", "switchport mode trunk", "switchport trunk allowed vlan 10,20,30", "exit",
        "interface GigabitEthernet0/1", "switchport mode access", "switchport access vlan 20", "exit"
      ]
    },
    tasks: [
      { text: "SW2 Gi0/24 arayüzünün native VLAN'ını 99 yapın.",
        check: (lab) => { const f = LAB_IF(lab, "SW2", "Gi0/24"); return !!f && f.native === 99; } },
      { text: "SW2 Gi0/24 arayüzünün izinli VLAN listesini yalnızca 10,20 olacak şekilde düzeltin.",
        check: (lab) => { const f = LAB_IF(lab, "SW2", "Gi0/24"); return !!f && LAB_SAME(f.allowed, [10, 20]); } },
      { text: "SW2 Gi0/1 portunu VLAN 10'a erişim portu olarak atayın.",
        check: (lab) => { const f = LAB_IF(lab, "SW2", "Gi0/1"); return !!f && f.mode === "access" && f.access === 10; } }
    ],
    explain: "Trunk üzerinde native VLAN iki uçta aynı olmalıdır; aksi halde etiketsiz trafik yanlış VLAN'a düşer. İzinli VLAN listesi yalnızca gereken VLAN'ları içermelidir. Erişim portunun VLAN'ı, bağlı cihazın VLAN'ı ile eşleşmelidir."
  },
  {
    type: "lab", domain: 3,
    q: "R2 ile R3 arasındaki bağlantı çalışmıyor. R2 Gi0/1 arayüzünde IP maskesi yanlış ve arayüz kapalıdır. Hataları düzeltin.",
    topology: {
      devices: [
        { name: "R2", type: "router", x: 250, y: 150 },
        { name: "R3", type: "router", x: 450, y: 150 }
      ],
      links: [
        { a: "R2", ai: "Gi0/1", b: "R3", bi: "Gi0/0", label: "10.0.23.0/30" }
      ]
    },
    devices: ["R2"],
    init: {
      "R2": [
        "interface GigabitEthernet0/1", "ip address 10.0.23.1 255.255.255.0", "shutdown", "exit"
      ]
    },
    tasks: [
      { text: "R2 Gi0/1 arayüzündeki maskeyi 255.255.255.252 (/30) olarak düzeltin.",
        check: (lab) => { const f = LAB_IF(lab, "R2", "Gi0/1"); return !!f && f.ip === "10.0.23.1" && f.mask === "255.255.255.252"; } },
      { text: "R2 Gi0/1 arayüzünü etkinleştirin.",
        check: (lab) => { const f = LAB_IF(lab, "R2", "Gi0/1"); return !!f && !f.shut; } },
      { text: "R2 Gi0/1 arayüzüne açıklama olarak 'To-R3' yazın.",
        check: (lab) => { const f = LAB_IF(lab, "R2", "Gi0/1"); return !!f && f.desc === "To-R3"; } }
    ],
    explain: "Bağlantının iki ucu aynı alt ağda olmalıdır: 10.0.23.1 ve 10.0.23.2 için /30 maskesi gerekir. Maske /24 olduğunda alt ağ yanlış hesaplanır. Yönetimsel olarak kapalı arayüz etkinleştirilmelidir."
  },
  {
    type: "lab", domain: 1,
    q: "SW1 hem anahtarlama hem de VLAN'lar arası yönlendirme yapacaktır. VLAN 20 için SVI yapılandırması eksik ve yönlendirme etkin değildir. Ayrıca PC-B, VLAN 20'de olmasına rağmen yanlış portta yapılandırılmıştır. Hataları düzeltin.",
    topology: {
      devices: [
        { name: "PC-A", type: "pc", x: 80, y: 100 },
        { name: "PC-B", type: "pc", x: 80, y: 220 },
        { name: "SW1", type: "switch", x: 300, y: 160 }
      ],
      links: [
        { a: "PC-A", ai: "", b: "SW1", bi: "Gi0/1", label: "VLAN 10" },
        { a: "PC-B", ai: "", b: "SW1", bi: "Gi0/2", label: "VLAN 20" }
      ]
    },
    devices: ["SW1"],
    init: {
      "SW1": [
        "vlan 10", "vlan 20", "exit",
        "interface GigabitEthernet0/1", "switchport mode access", "switchport access vlan 10", "exit",
        "interface GigabitEthernet0/2", "switchport mode access", "switchport access vlan 10", "exit",
        "interface Vlan20", "ip address 192.168.20.254 255.255.255.0", "shutdown", "exit"
      ]
    },
    tasks: [
      { text: "SW1 üzerinde IP yönlendirmeyi (ip routing) etkinleştirin.",
        check: (lab) => LAB_DEV(lab, "SW1").routing === true },
      { text: "Vlan20 SVI'sine 192.168.20.1/24 adresini verin ve arayüzü etkinleştirin.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Vlan20"); return !!f && f.ip === "192.168.20.1" && f.mask === "255.255.255.0" && !f.shut; } },
      { text: "Gi0/2 portunu VLAN 20'nin erişim portu olarak düzeltin.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Gi0/2"); return !!f && f.mode === "access" && f.access === 20; } }
    ],
    explain: "VLAN'lar arası yönlendirme için SVI'lerin IP almış ve etkin olması, anahtarda ip routing etkin olması gerekir. Erişim portları, bağlı cihazın VLAN'ına atanmalıdır; yanlış VLAN'a atanan port o VLAN'ın dışında kalır."
  },
  {
    type: "lab", domain: 3,
    q: "R1 üzerindeki OSPF yapılandırmasında 10.0.12.0 ağı yanlış wildcard maskesiyle ilan edilmiştir. Bu nedenle ağ OSPF'e dahil olmuyor. Hatayı düzeltin.",
    topology: {
      devices: [
        { name: "R1", type: "router", x: 200, y: 150 },
        { name: "R2", type: "router", x: 420, y: 150 }
      ],
      links: [
        { a: "R1", ai: "Gi0/0", b: "R2", bi: "Gi0/0", label: "10.0.12.0/30" }
      ]
    },
    devices: ["R1"],
    init: {
      "R1": [
        "router ospf 1", "network 10.0.12.0 0.0.0.0 area 0", "exit"
      ]
    },
    tasks: [
      { text: "R1 üzerindeki hatalı ağ ifadesini (10.0.12.0 0.0.0.0 area 0) kaldırın.",
        check: (lab) => !LAB_DEV(lab, "R1").ospf.nets.some((n) => n.net === "10.0.12.0" && n.wild === "0.0.0.0") },
      { text: "10.0.12.0 ağını doğru wildcard (0.0.0.3) ile Area 0'a ekleyin.",
        check: (lab) => LAB_DEV(lab, "R1").ospf.nets.some((n) => n.net === "10.0.12.0" && n.wild === "0.0.0.3" && n.area === "0") }
    ],
    explain: "Wildcard maskesi, /30 için 0.0.0.3 olmalıdır. 0.0.0.0 wildcard yalnızca tek bir IP adresini eşleştirir; arayüzün ağı OSPF'e girmez. Yanlış ifade kaldırılıp doğrusu eklenmelidir."
  }
);
