// TryExam - çoklu seçim, eşleştirme (sürükle-bırak) ve yapılandırma soruları
// Tür alanı:
//   (yok) / "single" : tek doğru cevaplı çoktan seçmeli  -> answer: indeks
//   "multi"          : birden fazla doğru seçenek        -> answer: indeks dizisi (tümü doğru olmalı)
//   "match"          : eşleştirme                        -> answer[i] = right dizisindeki doğru indeks
//   "config"         : komut/yapılandırma yazma          -> answerSets: kabul edilen satır kümeleri
// Özgün sorular: Cisco sınav içeriği kullanılmamıştır.

QUESTIONS.push(
  // ---------- ÇOKLU SEÇİM (multi) ----------
  {
    type: "multi", domain: 1,
    q: "Aşağıdaki ifadelerden DOĞRU olan İKİ tanesini seçin.",
    options: [
      "Tip 1 hipervizör doğrudan donanım üzerinde çalışır",
      "Tip 2 hipervizör doğrudan donanım üzerinde çalışır",
      "Konteynerler her biri kendi çekirdeğini çalıştırır",
      "Tip 2 hipervizör bir ana işletim sistemi üzerinde çalışır"
    ],
    answer: [0, 3],
    explain: "Tip 1 donanım üzerinde doğrudan çalışır; Tip 2 bir ana işletim sistemi üzerinde çalışır. Konteynerler çekirdeği paylaşır."
  },
  {
    type: "multi", domain: 1,
    q: "Geçerli bir IPv6 tek yayın (unicast) adresi olan İKİ adresi seçin.",
    options: ["2001:db8::1", "ff02::1", "fe80::1", "239.1.1.1"],
    answer: [0, 2],
    explain: "2001:db8::1 global tek yayın adresidir; fe80::1 bağlantı-yerel tek yayın adresidir. ff02::1 çok yayın, 239.1.1.1 ise IPv4 adresidir."
  },
  {
    type: "multi", domain: 1,
    q: "Bir arayüzde hata ve çarpışma sayaçlarının artmasına yol açabilecek İKİ neden seçin.",
    options: ["Dupleks uyuşmazlığı", "Bozuk veya hasarlı kablo", "Doğru yapılandırılmış VLAN", "Doğru ayarlanmış MTU"],
    answer: [0, 1],
    explain: "Dupleks uyuşmazlığı ve bozuk kablo fiziksel katman hatalarına yol açar. Doğru VLAN ve MTU ayarları hata sayaçlarını artırmaz."
  },
  {
    type: "multi", domain: 1,
    q: "2.4 GHz kablosuz ağda girişimi azaltmak için yapılması gereken İKİ işlemi seçin.",
    options: [
      "Komşu AP'lerde 1, 6 ve 11 kanallarını kullanmak",
      "Tüm AP'lerde aynı kanalı kullanmak",
      "Kanal 2, 3 ve 4'ü kullanmak",
      "AP'leri mikrodalga gibi girişim kaynaklarından uzak yerleştirmek"
    ],
    answer: [0, 3],
    explain: "Çakışmayan 1, 6, 11 kanalları ve girişim kaynaklarından uzak konumlandırma girişimi azaltır. Aynı kanal ve çakışan kanallar performansı düşürür."
  },
  {
    type: "multi", domain: 2,
    q: "LACP ile bir EtherChannel'ın oluşabilmesi için gereken İKİ koşulu seçin.",
    options: [
      "Her iki uçta LACP modları uyumlu olmalı (active ile active veya passive)",
      "Üye portların hızları ve dupleksleri aynı olmalı",
      "Üye portlar farklı VLAN'larda olmalı",
      "Üye portlar farklı switch'lerde fiziksel olarak bulunmalı"
    ],
    answer: [0, 1],
    explain: "Kanalın kurulması için modlar uyumlu ve üye portların hız/dupleks değerleri aynı olmalıdır. Üye portların VLAN'ları veya cihazları farklı olmamalıdır."
  },
  {
    type: "multi", domain: 2,
    q: "PortFast ile ilgili DOĞRU olan ÜÇ ifadeyi seçin.",
    options: [
      "Yalnızca erişim (access) portlarında kullanılmalıdır",
      "Port doğrudan forwarding durumuna geçer (listening ve learning atlanır)",
      "Döngüleri tamamen engeller",
      "BPDU Guard ile birlikte kullanılması önerilir",
      "Varsayılan olarak tüm trunk portlarda etkindir"
    ],
    answer: [0, 1, 3],
    explain: "PortFast erişim portlarında kullanılır ve listening/learning aşamalarını atlar. Döngüleri engellemez, varsayılan olarak etkin değildir; BPDU Guard ile birlikte kullanımı önerilir."
  },
  {
    type: "multi", domain: 2,
    q: "Rapid PVST+ içindeki geçerli port rollerini seçin (ÜÇ seçenek).",
    options: ["Root", "Designated", "Alternate", "Active"],
    answer: [0, 1, 2],
    explain: "RSTP port rolleri Root, Designated, Alternate ve Backup'tır. 'Active' bir HSRP terimidir."
  },
  {
    type: "multi", domain: 2,
    q: "Yetkisiz DHCP sunucularına karşı korunmak için yapılabilecek İKİ işlemi seçin.",
    options: [
      "DHCP snooping'i etkinleştirmek",
      "Port security'yi tek başına açmak",
      "Yalnızca gerçek DHCP sunucusuna giden uplink portunu trusted işaretlemek",
      "Tüm portları PortFast yapmak"
    ],
    answer: [0, 2],
    explain: "DHCP snooping sahte DHCP yanıtlarını engeller ve yalnızca güvenilir portlardan DHCP sunucu yanıtlarına izin verir."
  },
  {
    type: "multi", domain: 3,
    q: "Statik yollar hakkında DOĞRU olan ÜÇ ifadeyi seçin.",
    options: [
      "Varsayılan administrative distance değeri 1'dir",
      "Varsayılan olarak OSPF'ten daha düşük AD'ye sahiptir",
      "Her zaman RIP'ten düşük metriğe sahiptir",
      "Floating static için AD, dinamik protokollerden yüksek ayarlanır"
    ],
    answer: [0, 1, 3],
    explain: "Statik yolların varsayılan AD'si 1'dir (OSPF 110). Floating static yedek yol olarak daha yüksek AD ile tanımlanır. Metrik kavramı AD'den farklıdır; statik yolda metrik yoktur."
  },
  {
    type: "multi", domain: 3,
    q: "Aynı broadcast segmentindeki iki OSPF komşusunun Full adjacency kurabilmesi için gerekli İKİ koşulu seçin.",
    options: [
      "Hello ve dead timer değerleri eşleşmeli",
      "Area ID eşleşmeli",
      "Router ID'ler aynı olmalı",
      "Ağ maskeleri farklı olabilir"
    ],
    answer: [0, 1],
    explain: "Hello/dead timer ve area ID eşleşmelidir. Router ID'ler benzersiz olmalıdır (aynı olamazlar); broadcast ağlarda maskeler eşleşmelidir."
  },
  {
    type: "multi", domain: 3,
    q: "HSRP hakkında DOĞRU olan İKİ ifadeyi seçin.",
    options: [
      "Sanal IP ağ geçidi olarak istemcilere ortak bir adres sağlar",
      "Active yönlendirici en yüksek önceliğe sahip olandır",
      "Standby yönlendirici gerçek trafiği iletir",
      "Varsayılan öncelik değeri 0'dır"
    ],
    answer: [0, 1],
    explain: "HSRP sanal IP sağlar; en yüksek öncelikli yönlendirici active olur. Standby yönlendirici active arızalanana kadar trafik iletmez, varsayılan öncelik 100'dür."
  },
  {
    type: "multi", domain: 4,
    q: "TACACS+ kullanmanın avantajı olan İKİ özelliği seçin.",
    options: [
      "Komut bazında yetkilendirme sağlar",
      "Paketin tamamını şifreler",
      "UDP tabanlı çalışır",
      "Yalnızca ağ erişimi için kullanılır"
    ],
    answer: [0, 1],
    explain: "TACACS+ komut bazlı yetkilendirme yapar ve TCP üzerinden tüm gövdeyi şifreler. UDP kullanan RADIUS'tur; TACACS+ yönetim erişimi için kullanılır."
  },
  {
    type: "multi", domain: 4,
    q: "DHCP snooping'in sağladığı İKİ özelliği seçin.",
    options: [
      "Sahte DHCP sunucusu yanıtlarını engeller",
      "DHCP binding tablosu oluşturur",
      "Yalnızca IPv6'da çalışır",
      "Her portu varsayılan olarak trusted yapar"
    ],
    answer: [0, 1],
    explain: "DHCP snooping güvenilmeyen portlardan gelen DHCP sunucu yanıtlarını düşürür ve IP-MAC binding tablosu oluşturur. Varsayılan olarak tüm portlar untrusted'dır."
  },
  {
    type: "multi", domain: 4,
    q: "Port security ile yapılabilecek ÜÇ ayarı seçin.",
    options: [
      "Port başına izin verilen MAC adresi sayısını sınırlamak",
      "Sticky MAC öğrenme",
      "İhlal modunu protect, restrict veya shutdown olarak ayarlamak",
      "Trunk portlarda varsayılan olarak etkin olmak",
      "Yalnızca statik IP adresleriyle çalışmak"
    ],
    answer: [0, 1, 2],
    explain: "Port security maksimum MAC sayısı, sticky öğrenme ve ihlal modu ayarlarını içerir. Trunk portlarda varsayılan değildir ve IP'ye bağlı değildir."
  },
  {
    type: "multi", domain: 4,
    q: "IPv4 NAT türlerinden ÜÇ tanesini seçin.",
    options: ["Static NAT", "Dynamic NAT", "PAT (overload)", "Yalnızca ARP yayını"],
    answer: [0, 1, 2],
    explain: "Static NAT, dynamic NAT ve PAT (overload) IPv4 NAT türleridir. ARP yayını bir NAT türü değildir."
  },
  {
    type: "multi", domain: 5,
    q: "Altyapı kodu (IaC) kullanmanın İKİ avantajını seçin.",
    options: [
      "Tekrarlanabilir dağıtımlar sağlar",
      "Sürüm kontrolü ile değişiklik takibini kolaylaştırır",
      "Her değişikliğin elle yapılmasını gerektirir",
      "Dokümantasyon ihtiyacını tamamen ortadan kaldırır"
    ],
    answer: [0, 1],
    explain: "IaC tekrarlanabilirlik ve sürüm kontrolü sağlar. Elle yapılandırmayı gerektirmez ve dokümantasyonu ortadan kaldırmaz."
  },
  {
    type: "multi", domain: 5,
    q: "SNMP ile ilgili DOĞRU olan İKİ ifadeyi seçin.",
    options: [
      "TRAP ile yönetilen cihaz olayları kendiliğinden bildirebilir",
      "GET komutu ile yönetici bir nesnenin değerini okur",
      "SNMPv1 şifreleme sağlar",
      "SNMP yalnızca TCP üzerinden çalışır"
    ],
    answer: [0, 1],
    explain: "TRAP ajanın başlattığı bildirimdir, GET ise yöneticinin değer sorgusudur. SNMPv1 şifreleme sağlamaz; SNMP geleneksel olarak UDP kullanır."
  },
  {
    type: "multi", domain: 5,
    q: "Üretken yapay zekâ ile ağ operasyonları için prompt hazırlarken güvenli olan İKİ uygulamayı seçin.",
    options: [
      "Hassas verileri göndermeden önce anonimleştirmek",
      "Üretilen çıktıyı uzman tarafından doğrulamak",
      "Gerçek parolaları prompt'a eklemek",
      "Gizli anahtarları her prompt'a dahil etmek"
    ],
    answer: [0, 1],
    explain: "Hassas veriler maskelenmeli ve AI çıktıları uzman tarafından doğrulanmalıdır. Parola veya anahtar paylaşımı kesinlikle önerilmez."
  },

  // ---------- EŞLEŞTİRME (match, sürükle-bırak) ----------
  {
    type: "match", domain: 1,
    q: "Hipervizör ve sanallaştırma kavramlarını doğru açıklamalarıyla eşleştirin.",
    left: ["Tip 1 hipervizör", "Tip 2 hipervizör", "Konteyner", "Sanal makine"],
    right: [
      "Ana makinenin çekirdeğini paylaşır",
      "Donanım üzerinde doğrudan çalışır",
      "Bir işletim sistemi üzerinde çalışır",
      "Her biri kendi misafir işletim sistemine sahiptir"
    ],
    answer: [1, 2, 0, 3],
    explain: "Tip 1 donanım üzerinde doğrudan çalışır; Tip 2 bir işletim sistemi üzerinde çalışır. Konteynerler çekirdeği paylaşır; sanal makineler kendi misafir OS'lerini çalıştırır."
  },
  {
    type: "match", domain: 1,
    q: "IPv6 adres türlerini ön eklerle eşleştirin.",
    left: ["FE80::/10", "FC00::/7", "FF00::/8", "2000::/3"],
    right: ["Çok yayın (multicast)", "Bağlantı-yerel (link-local)", "Benzersiz yerel (ULA)", "Global tek yayın (unicast)"],
    answer: [1, 2, 0, 3],
    explain: "FE80::/10 bağlantı-yerel, FC00::/7 benzersiz yerel (ULA), FF00::/8 çok yayın ve 2000::/3 global tek yayın adreslerini kapsar."
  },
  {
    type: "match", domain: 2,
    q: "Rapid PVST+ port durumlarını açıklamalarıyla eşleştirin.",
    left: ["Discarding", "Learning", "Forwarding"],
    right: [
      "Trafik iletir ve MAC öğrenir",
      "Yalnızca BPDU işler, MAC öğrenmez, trafik iletmez",
      "MAC öğrenir ama trafik iletmez"
    ],
    answer: [1, 2, 0],
    explain: "Discarding yalnızca BPDU işler; Learning MAC öğrenir ama trafik iletmez; Forwarding trafik iletir ve MAC öğrenir."
  },
  {
    type: "match", domain: 2,
    q: "LACP ve PAgP modlarını davranışlarıyla eşleştirin.",
    left: ["LACP active", "LACP passive", "PAgP desirable", "PAgP auto"],
    right: [
      "PAgP ile kanal başlatır",
      "LACP ile kanal başlatır",
      "PAgP ile yalnızca yanıt verir",
      "LACP ile yalnızca yanıt verir"
    ],
    answer: [1, 3, 0, 2],
    explain: "LACP active kanal başlatır, LACP passive yalnızca yanıt verir. PAgP desirable kanal başlatır, PAgP auto yalnızca yanıt verir."
  },
  {
    type: "match", domain: 3,
    q: "Yönlendirme protokollerini varsayılan administrative distance değerleriyle eşleştirin.",
    left: ["Bağlı (connected) yol", "Statik yol", "EIGRP (dahili)", "OSPF"],
    right: ["90", "0", "110", "1"],
    answer: [1, 3, 0, 2],
    explain: "Connected 0, statik 1, dahili EIGRP 90 ve OSPF 110'dur."
  },
  {
    type: "match", domain: 4,
    q: "DNS kayıt türlerini işlevleriyle eşleştirin.",
    left: ["A", "AAAA", "MX", "PTR"],
    right: ["Posta sunucusunu tanımlar", "IP adresinden alan adına çözümleme yapar", "IPv6 adresi tanımlar", "IPv4 adresi tanımlar"],
    answer: [3, 2, 0, 1],
    explain: "A kaydı IPv4, AAAA kaydı IPv6 adresi tanımlar; MX posta sunucusunu, PTR ise ters çözümlemeyi sağlar."
  },
  {
    type: "match", domain: 4,
    q: "Katman 2 güvenlik özelliklerini işlevleriyle eşleştirin.",
    left: ["DHCP snooping", "Dynamic ARP Inspection", "Port security", "Storm control"],
    right: [
      "Port başına izin verilen MAC sayısını sınırlar",
      "Sahte ARP yanıtlarını engeller",
      "Yetkisiz DHCP sunucularını engeller",
      "Broadcast/multicast seli engeller"
    ],
    answer: [2, 1, 0, 3],
    explain: "DHCP snooping yetkisiz DHCP sunucularını, DAI sahte ARP yanıtlarını engeller. Port security MAC sınırı uygular, storm control trafik seli denetler."
  },
  {
    type: "match", domain: 5,
    q: "Ağ yönetimi ve izleme kavramlarını işlevleriyle eşleştirin.",
    left: ["SNMP TRAP", "SNMP GET", "Syslog seviye 0", "Ansible"],
    right: [
      "Acil durum (Emergency) seviyesi",
      "Ajansız (agentless) yapılandırma yönetimi",
      "Yönetilen cihazdan kendiliğinden bildirim",
      "Yöneticinin değer sorgulaması"
    ],
    answer: [2, 3, 0, 1],
    explain: "TRAP cihazdan kendiliğinden bildirimdir, GET yönetici sorgusudur. Syslog 0 Emergency seviyesidir; Ansible genellikle ajansız çalışır."
  },

  // ---------- YAPILANDIRMA (config, komut yazma) ----------
  {
    type: "config", domain: 1,
    q: "Bir Router'ın GigabitEthernet0/0 arayüzüne 192.168.10.1/24 IP adresini atamak için arayüz yapılandırma modunda girilecek komutu yazın.",
    answerSets: [["ip address 192.168.10.1 255.255.255.0"]],
    explain: "IOS'ta arayüze IP atamak için 'ip address <ip> <alt-ağ-maskesi>' kullanılır. Alt ağ maskesi /24 için 255.255.255.0'dır."
  },
  {
    type: "config", domain: 1,
    q: "IOS DHCP sunucusunda 192.168.1.1 - 192.168.1.10 aralığının dağıtımdan çıkarılması için global konfigürasyon modunda girilecek komutu yazın.",
    answerSets: [["ip dhcp excluded-address 192.168.1.1 192.168.1.10"]],
    explain: "'ip dhcp excluded-address <başlangıç> <bitiş>' belirtilen aralığın havuzdan çıkarılmasını sağlar."
  },
  {
    type: "config", domain: 2,
    q: "SW1'de GigabitEthernet0/1 portunu VLAN 20 için erişim (access) portu yapmak üzere arayüz modunda girilecek iki komutu yazın (her komut ayrı satırda).",
    answerSets: [["switchport mode access", "switchport access vlan 20"]],
    explain: "Erişim portu için önce 'switchport mode access', ardından 'switchport access vlan 20' girilir. Sıralama önemli değildir."
  },
  {
    type: "config", domain: 2,
    q: "Rapid PVST+ ile VLAN 10 için SW1'i kök köprü (primary root) yapmak üzere global konfigürasyon modunda girilecek komutu yazın.",
    answerSets: [["spanning-tree vlan 10 root primary"]],
    explain: "'spanning-tree vlan 10 root primary' ilgili VLAN için köprü önceliğini düşürerek switch'i kök köprü yapar."
  },
  {
    type: "config", domain: 2,
    q: "GigabitEthernet0/2 portunda PortFast ve BPDU Guard'ı etkinleştirmek için arayüz modunda girilecek iki komutu yazın (her komut ayrı satırda).",
    answerSets: [["spanning-tree portfast", "spanning-tree bpduguard enable"]],
    explain: "'spanning-tree portfast' ve 'spanning-tree bpduguard enable' birlikte kullanılarak erişim portunun güvenliği sağlanır."
  },
  {
    type: "config", domain: 3,
    q: "R1'de 172.16.0.0/16 ağına, sonraki atlama 10.0.0.2 olacak şekilde statik yol eklemek için global konfigürasyon komutunu yazın.",
    answerSets: [["ip route 172.16.0.0 255.255.0.0 10.0.0.2"]],
    explain: "'ip route <ağ> <maske> <sonraki-atlama>' komutu statik yol tanımlar. /16 için maske 255.255.0.0'dır."
  },
  {
    type: "config", domain: 3,
    q: "R1'de 0.0.0.0/0 için yedek (floating) statik varsayılan yol eklemek üzere; sonraki atlama 10.0.0.2 ve AD değeri 200 olacak şekilde global komutu yazın.",
    answerSets: [["ip route 0.0.0.0 0.0.0.0 10.0.0.2 200"]],
    explain: "AD değeri 200 verilerek yol, dinamik protokol yolları yokken devreye girecek şekilde yedek yapılır."
  },
  {
    type: "config", domain: 4,
    q: "Gi0/0 arayüzünü NAT iç (inside) arayüzü olarak işaretlemek için arayüz modunda girilecek komutu yazın.",
    answerSets: [["ip nat inside"]],
    explain: "'ip nat inside' arayüzü NAT'ın iç tarafı olarak tanımlar; dış taraf için 'ip nat outside' kullanılır."
  },
  {
    type: "config", domain: 4,
    q: "Numaralı standart ACL 10 içinde 192.168.5.0/24 ağına izin vermek için global konfigürasyon komutunu yazın.",
    answerSets: [["access-list 10 permit 192.168.5.0 0.0.0.255"]],
    explain: "Standart numaralı ACL'de kaynak ağ wildcard maskesi ile belirtilir: /24 için 0.0.0.255."
  },
  {
    type: "config", domain: 5,
    q: "Yönetilen bir switch'in syslog mesajlarını 10.0.0.50 adresindeki syslog sunucusuna göndermesi için global konfigürasyonda girilecek komutu yazın.",
    answerSets: [["logging host 10.0.0.50"]],
    explain: "'logging host <ip>' syslog mesajlarının uzak bir sunucuya gönderilmesini sağlar."
  }
);
