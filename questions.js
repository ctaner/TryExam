// TryExam - CCNA 200-301 v2.0 soru bankası
// Her soru: domain (1-5), soru metni, seçenekler, doğru cevabın indeksi, açıklama.
// Özgün sorular: Cisco sınav içeriği kullanılmamıştır.

const DOMAINS = [
  { id: 1, name: "Network Infrastructure and Connectivity", weight: 25 },
  { id: 2, name: "Switching and Network Access", weight: 25 },
  { id: 3, name: "IP Routing", weight: 20 },
  { id: 4, name: "Network Services and Security", weight: 20 },
  { id: 5, name: "AI, and Network Operations and Management", weight: 10 }
];

const QUESTIONS = [
  // ---------- Domain 1 ----------
  {
    domain: 1,
    q: "Bir arayüzde hız veya dupleks uyuşmazlığının tipik belirtisi hangisidir?",
    options: [
      "Yalnızca DNS sorgularında gecikme",
      "Geç çarpışma (late collision) ve hata sayaçlarında artış",
      "DHCP kiralama süresinin dolması",
      "VLAN etiketlerinin kaybolması"
    ],
    answer: 1,
    explain: "Yarı dupleks ile tam dupleks uçlar eşleşmediğinde geç çarpışmalar ve CRC/hata sayaçları artar."
  },
  {
    domain: 1,
    q: "Tip 1 hipervizör nasıl çalışır?",
    options: [
      "Ana işletim sistemi üzerinde bir uygulama olarak çalışır",
      "Doğrudan donanım üzerinde çalışır",
      "Yalnızca konteynerler için kullanılır",
      "Bir ağ anahtarının yazılımıdır"
    ],
    answer: 1,
    explain: "Tip 1 (bare-metal) hipervizör donanım üzerinde doğrudan çalışır. Tip 2 ise bir işletim sistemi üzerinde çalışır."
  },
  {
    domain: 1,
    q: "Konteynerlerin sanal makinelerden temel farkı nedir?",
    options: [
      "Konteynerler her biri kendi çekirdeğini çalıştırır",
      "Konteynerler ana makinenin çekirdeğini paylaşır",
      "Konteynerler yalnızca Windows üzerinde çalışır",
      "Konteynerlerin ağ arayüzü yoktur"
    ],
    answer: 1,
    explain: "Konteynerler işletim sistemi çekirdeğini paylaşır; her sanal makine ise kendi misafir işletim sistemini çalıştırır."
  },
  {
    domain: 1,
    q: "Aşağıdakilerden hangisi özel (private) IPv4 adres aralığındadır?",
    options: ["8.8.8.8", "172.20.5.10", "198.51.100.7", "203.0.113.25"],
    answer: 1,
    explain: "172.16.0.0/12 özel aralığındadır. 8.8.8.8, 198.51.100.0/24 ve 203.0.113.0/24 public adreslerdir."
  },
  {
    domain: 1,
    q: "192.168.10.130/26 adresinin ağ (network) adresi nedir?",
    options: ["192.168.10.128", "192.168.10.129", "192.168.10.160", "192.168.10.0"],
    answer: 0,
    explain: "/26 blok büyüklüğü 64'tür. 130, 128-191 aralığında olduğundan ağ adresi 192.168.10.128'dir."
  },
  {
    domain: 1,
    q: "MAC adresi 00:1A:2B:3C:4D:5E olan bir arayüz için modified EUI-64 arayüz kimliği nedir?",
    options: [
      "001A:2B3C:4D5E:0000",
      "021A:2BFF:FE3C:4D5E",
      "021A:2B3C:4D5E:FFFE",
      "FE80:001A:2BFF:3C4D"
    ],
    answer: 1,
    explain: "İlk oktetin 7. biti (U/L biti) çevrilir (00 -> 02), ortaya FF:FE eklenir."
  },
  {
    domain: 1,
    q: "2.4 GHz bandında birbiriyle çakışmayan (non-overlapping) üç kanal hangisidir?",
    options: ["1, 2, 3", "1, 6, 11", "3, 6, 9", "4, 8, 12"],
    answer: 1,
    explain: "2.4 GHz bandında 1, 6 ve 11 kanalları birbiriyle çakışmaz."
  },
  {
    domain: 1,
    q: "2.4 GHz bandında kablosuz ağ performansını düşüren en yaygın harici kaynak hangisidir?",
    options: [
      "Ethernet kablosunun uzunluğu",
      "Mikrodalga fırın",
      "Switch'in MAC tablosu",
      "DHCP sunucusu"
    ],
    answer: 1,
    explain: "Mikrodalga fırınlar 2.4 GHz bandında girişim üretir."
  },
  {
    domain: 1,
    q: "Bir IOS yönlendiricisinde DHCP isteklerini farklı bir alt ağdaki DHCP sunucusuna iletmek için hangi komut kullanılır?",
    options: ["ip dhcp relay", "ip helper-address", "dhcp forward", "ip dhcp server-relay"],
    answer: 1,
    explain: "Arayüz üzerinde 'ip helper-address <sunucu-ip>' DHCP yayın isteklerini unicast olarak iletir."
  },
  {
    domain: 1,
    q: "Bir istemcide 169.254.x.x adresi görülmesi neyi gösterir?",
    options: [
      "Statik IP atanmış olduğunu",
      "DHCP sunucusuna ulaşılamadığını ve APIPA adresi aldığını",
      "NAT'ın etkin olduğunu",
      "IPv6'nın devre dışı olduğunu"
    ],
    answer: 1,
    explain: "169.254.0.0/16 APIPA aralığıdır; istemci DHCP yanıtı alamadığında kendi adresini üretir."
  },

  // ---------- Domain 2 ----------
  {
    domain: 2,
    q: "Bir switch portunu 802.1Q trunk olarak yapılandırmak için hangi komut kullanılır?",
    options: [
      "switchport mode access",
      "switchport mode trunk",
      "switchport trunk native",
      "channel-group 1 mode on"
    ],
    answer: 1,
    explain: "'switchport mode trunk' portu trunk moduna alır; birden fazla VLAN'ı etiketli taşır."
  },
  {
    domain: 2,
    q: "Bir SVI (interface vlan 10) ne zaman 'up/up' durumuna geçer?",
    options: [
      "Yalnızca VLAN 10 üzerinde IP adresi tanımlandığında",
      "VLAN 10 aktif olduğunda ve bu VLAN'da en az bir port up durumda olduğunda",
      "Her zaman, VLAN'ın varlığı yeterlidir",
      "Yalnızca trunk port üzerinden"
    ],
    answer: 1,
    explain: "SVI'nin up olması için VLAN'ın aktif olması ve o VLAN'a ait en az bir fiziksel portun up olması gerekir."
  },
  {
    domain: 2,
    q: "LACP ile bir EtherChannel oluşturmak için her iki tarafta da hangi mod uygundur (en az bir taraf aktif olmalı)?",
    options: [
      "on - on",
      "active - passive",
      "desirable - auto (PAgP)",
      "passive - passive"
    ],
    answer: 1,
    explain: "LACP'de active ile passive eşleşir; passive - passive ise kanal oluşturmaz."
  },
  {
    domain: 2,
    q: "Bir erişim portunda PortFast ile birlikte BPDU Guard'ı etkinleştiren komut hangisidir?",
    options: [
      "spanning-tree guard root",
      "spanning-tree bpduguard enable",
      "spanning-tree loopguard default",
      "spanning-tree portfast trunk"
    ],
    answer: 1,
    explain: "BPDU Guard, PortFast olan portta bir BPDU alındığında portu err-disable durumuna alır."
  },
  {
    domain: 2,
    q: "Rapid PVST+ içinde bir köprüye (bridge) en iyi yolla bağlanan port hangi rolü alır?",
    options: ["Designated port", "Root port", "Alternate port", "Backup port"],
    answer: 1,
    explain: "Her non-root switch'te köke en düşük maliyetli yolu sağlayan port root port olur."
  },
  {
    domain: 2,
    q: "Root Guard hangi amaçla kullanılır?",
    options: [
      "Port security ihlallerini engellemek",
      "Bir porttan üstün BPDU geldiğinde kök köprünün değişmesini engellemek",
      "Kanal oluşturmayı zorlamak",
      "Trunk üzerinden VLAN'ları filtrelemek"
    ],
    answer: 1,
    explain: "Root Guard, tasarım dışı bir köprünün kök seçimini ele geçirmesini engeller; port root-inconsistent durumuna geçer."
  },
  {
    domain: 2,
    q: "Bir porttaki port security ihlali için varsayılan davranış nedir?",
    options: ["Protect", "Restrict", "Shutdown", "Warn"],
    answer: 2,
    explain: "Varsayılan violation modu shutdown'dır; ihlal eden port err-disable olur."
  },
  {
    domain: 2,
    q: "Komşu cihazların topolojisini doğrulamak için satıcıdan bağımsız hangi protokol kullanılır?",
    options: ["CDP", "LLDP", "STP", "VTP"],
    answer: 1,
    explain: "LLDP IEEE 802.1AB standardıdır ve satıcılar arası çalışır. CDP ise Cisco'ya özgüdür."
  },

  {
    domain: 2,
    q: "Layer 3 bir port-channel (EtherChannel) için IP adresi hangi arayüzde tanımlanır?",
    options: [
      "Her fiziksel üye arayüzde ayrı ayrı",
      "Port-channel (Port-channel) mantıksal arayüzünde",
      "Yalnızca VLAN 1 üzerinde",
      "Kanal oluşturulmadan önce switch'in genel yapılandırmasında"
    ],
    answer: 1,
    explain: "Layer 3 EtherChannel'da IP adresi mantıksal port-channel arayüzüne 'no switchport' ile atanır; fiziksel üyelere atanmaz."
  },

  // ---------- Domain 3 ----------
  {
    domain: 3,
    q: "Bir yönlendiricide 10.1.1.0/24 ağı için yol ekleyen komut hangisidir?",
    options: [
      "ip route 10.1.1.0 255.255.255.0 192.168.1.1",
      "ip route 10.1.1.0 0.0.0.255 192.168.1.1",
      "route add 10.1.1.0 /24 192.168.1.1",
      "ip network 10.1.1.0 255.255.255.0 192.168.1.1"
    ],
    answer: 0,
    explain: "Standart IOS statik yol sözdizimi: ip route <ağ> <alt-ağ-maskesi> <sonraki-atlama>. Wildcard maske ACL'lerde kullanılır."
  },
  {
    domain: 3,
    q: "Bir hedef için birden fazla yol bilindiğinde yönlendirici hangi kritere önce bakar?",
    options: [
      "En yüksek metrik",
      "En düşük administrative distance (AD)",
      "En küçük IP adresi",
      "En son öğrenilen yol"
    ],
    answer: 1,
    explain: "Önce AD'ye bakılır; aynı AD'de daha düşük metrik seçilir."
  },
  {
    domain: 3,
    q: "Varsayılan administrative distance değerlerine göre hangisi en düşük AD'ye sahiptir?",
    options: ["OSPF (110)", "RIP (120)", "Statik yol (1)", "Bağlı (connected) yol (0)"],
    answer: 3,
    explain: "Bağlı yollar AD 0, statik yollar AD 1'dir. Connected en güvenilir kaynaktır."
  },
  {
    domain: 3,
    q: "Yedek (floating) statik bir varsayılan yol oluşturmak için AD'yi nasıl ayarlarsınız?",
    options: [
      "AD değerini dinamik protokollerden düşük yaparsınız",
      "AD değerini dinamik protokollerden yüksek yaparsınız",
      "AD'yi 0 olarak bırakırsınız",
      "Metriği 0 yaparsınız ama AD'ye dokunmazsınız"
    ],
    answer: 1,
    explain: "Örneğin 'ip route 0.0.0.0 0.0.0.0 <ip> 200' gibi yüksek AD, birincil dinamik yol yokken devreye girer."
  },
  {
    domain: 3,
    q: "Broadcast bir OSPF segmentinde DR (Designated Router) seçimi neye göre yapılır?",
    options: [
      "En düşük router ID",
      "En yüksek OSPF önceliği, eşitse en yüksek router ID",
      "En düşük hız",
      "İlk açılan yönlendirici"
    ],
    answer: 1,
    explain: "Öncelik 0 olan yönlendirici DR olamaz. Eşit öncelikte en yüksek router ID kazanır."
  },
  {
    domain: 3,
    q: "Point-to-point bir OSPF bağlantısında DR seçimi yapılır mı?",
    options: [
      "Evet, her zaman",
      "Hayır, point-to-point ağlarda DR/BDR seçimi yapılmaz",
      "Yalnızca OSPFv3'te",
      "Yalnızca öncelik sıfırdan büyükse"
    ],
    answer: 1,
    explain: "Point-to-point ağlarda komşu iki cihaz doğrudan adjacency kurar; DR/BDR gerekmez."
  },
  {
    domain: 3,
    q: "Varsayılan ayarlarda broadcast ağdaki bir OSPF arayüzünde hello ve dead aralıkları nedir?",
    options: [
      "Hello 5 sn, dead 20 sn",
      "Hello 10 sn, dead 40 sn",
      "Hello 30 sn, dead 120 sn",
      "Hello 1 sn, dead 4 sn"
    ],
    answer: 1,
    explain: "Broadcast ve point-to-point ağlarda varsayılan hello 10 sn, dead 40 sn'dir."
  },
  {
    domain: 3,
    q: "HSRP'de varsayılan öncelik değeri nedir ve aktif yönlendirici nasıl seçilir?",
    options: [
      "50; en düşük öncelik aktif olur",
      "100; en yüksek öncelik aktif olur",
      "255; en düşük IP adresi aktif olur",
      "0; en yüksek IP adresi aktif olur"
    ],
    answer: 1,
    explain: "HSRP varsayılan önceliği 100'dür; en yüksek öncelikli yönlendirici aktif olur."
  },

  // ---------- Domain 4 ----------
  {
    domain: 4,
    q: "Birçok iç adresi tek bir public IP üzerinden çıkışa taşımak için hangi yapılandırma kullanılır?",
    options: [
      "Static NAT",
      "Dynamic NAT (pool)",
      "PAT (NAT overload)",
      "Policy routing"
    ],
    answer: 2,
    explain: "PAT (overload) port numaralarını kullanarak çok sayıda iç adresi tek public adrese eşler."
  },
  {
    domain: 4,
    q: "Standart bir IPv4 ACL neye göre filtreleme yapar?",
    options: [
      "Yalnızca kaynak IP adresine",
      "Kaynak ve hedef IP ile port numarasına",
      "Yalnızca protokol türüne",
      "MAC adreslerine"
    ],
    answer: 0,
    explain: "Standart ACL'ler yalnızca kaynak adresi değerlendirir. Genişletilmiş ACL'ler hedef ve port da kontrol eder."
  },
  {
    domain: 4,
    q: "Numaralı genişletilmiş (extended) IPv4 ACL numara aralığı hangisidir?",
    options: ["1-99", "100-199", "200-299", "1300-1999"],
    answer: 1,
    explain: "Standart numaralı ACL 1-99 (ve 1300-1999 genişletilmiş standart), genişletilmiş numaralı ACL 100-199'dur."
  },
  {
    domain: 4,
    q: "Bir alan adının IPv6 adresine çözümlenmesi için hangi DNS kaydı kullanılır?",
    options: ["A", "AAAA", "MX", "PTR"],
    answer: 1,
    explain: "AAAA kaydı IPv6 adresini, A kaydı IPv4 adresini tutar. MX posta sunucusunu, PTR ters çözümlemeyi tanımlar."
  },
  {
    domain: 4,
    q: "DHCP snooping'de hangi port 'trusted' olarak işaretlenmelidir?",
    options: [
      "Son kullanıcı istemci portları",
      "DHCP sunucusuna doğru giden uplink portları",
      "Yazıcı portları",
      "Kullanılmayan portlar"
    ],
    answer: 1,
    explain: "DHCP sunucusuna giden port güvenilir olmalıdır; diğer portlardan gelen sahte DHCP sunucusu yanıtları düşürülür."
  },
  {
    domain: 4,
    q: "Storm control neyi sınırlamak için kullanılır?",
    options: [
      "Port başına MAC adresi sayısını",
      "Broadcast, multicast veya unicast trafiğin yüzdesini",
      "VLAN sayısını",
      "Kanal genişliğini"
    ],
    answer: 1,
    explain: "Storm control, belirli trafik türlerinin eşik değerini aştığında bu trafiği sınırlar."
  },
  {
    domain: 4,
    q: "TACACS+ ile RADIUS arasındaki temel fark hangisidir?",
    options: [
      "TACACS+ yalnızca kablosuz ağlarda çalışır",
      "TACACS+ tüm paketi şifreler; RADIUS yalnızca parolayı şifreler",
      "RADIUS yalnızca yönlendiricilerde çalışır",
      "TACACS+ UDP kullanır, RADIUS TCP kullanır"
    ],
    answer: 1,
    explain: "TACACS+ TCP 49 kullanır ve tüm gövdeyi şifreler; RADIUS UDP kullanır ve yalnızca parolayı şifreler."
  },
  {
    domain: 4,
    q: "IPsec tünel modunda orijinal IP paketine ne olur?",
    options: [
      "Yalnızca yükü (payload) şifrelenir, başlık açık kalır",
      "Tüm orijinal IP paketi şifrelenir ve yeni bir IP başlığı eklenir",
      "Paket şifrelenmez, yalnızca doğrulanır",
      "Başlık silinir"
    ],
    answer: 1,
    explain: "Tünel modu tüm orijinal paketi kapsüller ve site-to-site VPN'lerde kullanılır. Taşıma modu yalnızca yükü şifreler."
  },

  // ---------- Domain 5 ----------
  {
    domain: 5,
    q: "Syslog'da en yüksek önem seviyesi hangisidir?",
    options: ["0 - Emergency", "7 - Debugging", "1 - Alert", "5 - Notice"],
    answer: 0,
    explain: "Syslog seviyeleri 0 (Emergency) ile 7 (Debugging) arasındadır; düşük numara daha yüksek önem demektir."
  },
  {
    domain: 5,
    q: "SNMP'de yönetilen cihazın yönetim istasyonuna kendiliğinden bildirim göndermesini sağlayan işlem hangisidir?",
    options: ["GET", "GET-NEXT", "SET", "TRAP"],
    answer: 3,
    explain: "TRAP (veya INFORM) ajan tarafından başlatılır ve bir olayı yöneticiye bildirir."
  },
  {
    domain: 5,
    q: "Altyapı kodu (Infrastructure as Code) yaklaşımında 'deklaratif' model ne anlama gelir?",
    options: [
      "Her adımın sırasıyla yazılması",
      "İstenen son durumun tanımlanması, sistemin buna ulaşmak için gerekli adımları belirlemesi",
      "Yalnızca elle yapılan yapılandırma",
      "Cihazların yalnızca web arayüzüyle yönetilmesi"
    ],
    answer: 1,
    explain: "Deklaratif araçlar (ör. Terraform) istenen durumu tanımlar; imperatif araçlar ise adım adım komutları yazar."
  },
  {
    domain: 5,
    q: "Ansible'ın yönetilen cihazlara bağlanmak için tipik olarak kullandığı yöntem nedir?",
    options: [
      "Her cihazda kurulu bir ajan (agent) yazılımı",
      "Agentless çalışma; genellikle SSH veya API üzerinden",
      "Yalnızca SNMP traps",
      "Yalnızca USB bağlantısı"
    ],
    answer: 1,
    explain: "Ansible çoğu durumda hedef cihazda ajan gerektirmez; SSH veya ilgili API üzerinden çalışır."
  },
  {
    domain: 5,
    q: "Bir ağ operasyonu için üretken yapay zekâya prompt hazırlarken veri sınıflandırması hassas bilgi içeriyorsa en doğru yaklaşım nedir?",
    options: [
      "Verinin tamamını olduğu gibi göndermek",
      "Hassas bilgileri göndermeden önce anonimleştirmek veya çıkarmak",
      "Prompt'a gerçek parolaları eklemek",
      "Hassasiyeti yalnızca çıktı formatına yazmak"
    ],
    answer: 1,
    explain: "Hassas veriler, yetkisiz veri sızıntısını önlemek için gönderilmeden önce temizlenmeli veya maskelenmelidir."
  },
  {
    domain: 5,
    q: "Bir ağ cihazının syslog mesajları için 'facility' alanı neyi belirtir?",
    options: [
      "Mesajı üreten alt sistemin/kategorinin kaynağını",
      "Mesajın önem derecesini",
      "Cihazın IP adresini",
      "Mesajın zaman damgasını"
    ],
    answer: 0,
    explain: "Facility (ör. local0-local7, daemon, kern) mesajın kaynak kategorisini belirtir; severity ise önem derecesidir."
  }
];
