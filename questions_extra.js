// TryExam - ek sorular (100 soruluk sınav için konu ağırlıklarına göre tamamlama)
// questions.js dosyasından sonra yüklenir ve QUESTIONS dizisine eklenir.
// Özgün sorular: Cisco sınav içeriği kullanılmamıştır.

QUESTIONS.push(
  // ---------- Domain 1 (ek) ----------
  {
    domain: 1,
    q: "Uzun mesafeli (birkaç km'ye varan) fiber bağlantı için hangi fiber türü tercih edilir?",
    options: ["Çok modlu (multimode) fiber", "Tek modlu (single-mode) fiber", "Plastik optik fiber", "Koaksiyel kablo"],
    answer: 1,
    explain: "Tek modlu fiber sinyali daha az dağılımla taşır ve uzun mesafelerde kullanılır. Çok modlu fiber kısa mesafeler için uygundur."
  },
  {
    domain: 1,
    q: "Bakır Ethernet (1000BASE-T) için tipik maksimum kablo uzunluğu nedir?",
    options: ["50 m", "100 m", "300 m", "2 km"],
    answer: 1,
    explain: "Bakır Ethernet kablolarında segment uzunluğu standart olarak 100 metredir."
  },
  {
    domain: 1,
    q: "Bir arayüzde artan CRC hataları en olası neyi gösterir?",
    options: [
      "DHCP kiralama süresinin dolduğunu",
      "Fiziksel katmanda sorun (bozuk kablo, girişim veya kötü konnektör)",
      "VLAN yapılandırmasının eksik olduğunu",
      "Yönlendirme tablosunda bir hata olduğunu"
    ],
    answer: 1,
    explain: "CRC hataları genellikle bozuk kablo, konnektör sorunu veya elektromanyetik girişimden kaynaklanan fiziksel katman problemlerinin işaretidir."
  },
  {
    domain: 1,
    q: "Bilgisayarı doğrudan başka bir bilgisayara bağlamak için (modern otomatik MDI-X olmayan eski cihazlarda) hangi kablo türü kullanılır?",
    options: ["Düz (straight-through) kablo", "Çapraz (crossover) kablo", "Konsol kablosu", "Rollover kablo"],
    answer: 1,
    explain: "Aynı tür cihazları (ör. iki PC) birbirine bağlamak için çapraz kablo kullanılır; modern cihazlar bunu otomatik algılar."
  },
  {
    domain: 1,
    q: "Aşağıdaki adreslerden hangisi RFC 6598 ile ayrılmış paylaşımlı (CGNAT) adres alanındadır?",
    options: ["10.10.10.10", "172.31.1.1", "100.64.0.1", "192.168.50.1"],
    answer: 2,
    explain: "100.64.0.0/10 CGNAT için ayrılmıştır; özel (RFC 1918) değildir ama İnternet'e doğrudan yönlendirilmez."
  },
  {
    domain: 1,
    q: "10.0.5.200/27 adresinin yayın (broadcast) adresi nedir?",
    options: ["10.0.5.207", "10.0.5.223", "10.0.5.255", "10.0.5.199"],
    answer: 1,
    explain: "/27 blok büyüklüğü 32'dir. 200, 192-223 aralığında olduğundan yayın adresi 10.0.5.223'tür."
  },
  {
    domain: 1,
    q: "Bir /28 alt ağında kaç kullanılabilir host adresi vardır?",
    options: ["16", "14", "30", "6"],
    answer: 1,
    explain: "/28 için 2^4 = 16 adres vardır. Ağ ve yayın adresleri çıkarılınca 14 kullanılabilir host kalır."
  },
  {
    domain: 1,
    q: "Bağlantı-yerel (link-local) IPv6 adresleri hangi ön eke sahiptir?",
    options: ["2001::/16", "FC00::/7", "FE80::/10", "FF00::/8"],
    answer: 2,
    explain: "Link-local IPv6 adresleri FE80::/10 aralığındadır ve yalnızca aynı bağlantı üzerinde geçerlidir."
  },
  {
    domain: 1,
    q: "Kurumsal kablosuz ağlarda WPA2-Enterprise hangi kimlik doğrulama yapısını kullanır?",
    options: ["Yalnızca ortak parola (PSK)", "802.1X ile RADIUS sunucusu", "WEP anahtarı", "MAC adresi filtreleme"],
    answer: 1,
    explain: "WPA2-Enterprise, kullanıcı başına kimlik doğrulama için 802.1X ve RADIUS kullanır."
  },
  {
    domain: 1,
    q: "5 GHz bandının 2.4 GHz bandına göre tipik avantajı ve dezavantajı nedir?",
    options: [
      "Daha uzun menzil ama daha az kanal",
      "Daha fazla çakışmayan kanal ama menzil genellikle daha kısa",
      "Daha düşük hız ve daha az kanal",
      "Mikrodalga girişiminden tamamen etkilenmez; ayrıca her zaman daha uzun menzil sağlar"
    ],
    answer: 1,
    explain: "5 GHz'de çok daha fazla çakışmayan kanal vardır, ancak sinyal yüksek frekans nedeniyle daha kısa mesafeye ulaşır."
  },
  {
    domain: 1,
    q: "Windows bir istemcide IP yapılandırmasını, DNS sunucularını ve DHCP bilgilerini ayrıntılı olarak görüntülemek için hangi komut kullanılır?",
    options: ["ipconfig /all", "ping -a", "netstat -r", "arp -d"],
    answer: 0,
    explain: "'ipconfig /all' ayrıntılı ağ yapılandırmasını (DNS, DHCP, MAC adresi vb.) gösterir."
  },
  {
    domain: 1,
    q: "Linux bir istemcide IP adresini görüntülemek için tipik olarak hangi komut kullanılır?",
    options: ["ip addr", "ipconfig", "show ip interface", "route print"],
    answer: 0,
    explain: "Modern Linux dağıtımlarında 'ip addr' (veya 'ip a') arayüz adreslerini gösterir."
  },
  {
    domain: 1,
    q: "Bir IOS DHCP sunucusunda belirli adreslerin dağıtılmamasını sağlayan komut hangisidir?",
    options: [
      "ip dhcp reserved-address",
      "ip dhcp excluded-address",
      "ip dhcp blocked-address",
      "ip dhcp pool-exclude"
    ],
    answer: 1,
    explain: "'ip dhcp excluded-address' belirtilen aralığın DHCP havuzundan çıkarılmasını sağlar."
  },
  {
    domain: 1,
    q: "DHCP istemci-sunucu iletişiminde mesajların doğru sırası hangisidir?",
    options: [
      "Discover, Offer, Request, Acknowledge",
      "Offer, Discover, Acknowledge, Request",
      "Request, Discover, Offer, Acknowledge",
      "Discover, Request, Offer, Acknowledge"
    ],
    answer: 0,
    explain: "DORA süreci: istemci Discover gönderir, sunucu Offer ile yanıt verir, istemci Request ile kabul eder, sunucu Acknowledge ile onaylar."
  },
  {
    domain: 1,
    q: "Bir hedefin IPv4 adresinin ortak (public) mi yoksa özel mi olduğunu belirlemek için hangi bilgi en çok kullanılır?",
    options: ["MAC adresi", "RFC 1918 özel aralıkları", "VLAN numarası", "Port numarası"],
    answer: 1,
    explain: "10.0.0.0/8, 172.16.0.0/12 ve 192.168.0.0/16 RFC 1918 özel aralıklarıdır."
  },

  // ---------- Domain 2 (ek) ----------
  {
    domain: 2,
    q: "Bir switch'te spanning-tree durumunu (kök köprü, port rolleri) görüntülemek için hangi komut kullanılır?",
    options: ["show spanning-tree", "show vlan brief", "show cdp traffic", "show mac address-table"],
    answer: 0,
    explain: "'show spanning-tree' kök köprü kimliğini ve her portun rolünü/durumunu gösterir."
  },
  {
    domain: 2,
    q: "Trunk'ın iki ucunda native VLAN eşleşmezse en olası sonuç nedir?",
    options: [
      "Hiçbir trafik geçmez",
      "VLAN'lar arası yönlendirme çalışmaz, native VLAN trafiği yanlış VLAN'a düşebilir",
      "DHCP çalışmaz",
      "Port hızı otomatik düşer"
    ],
    answer: 1,
    explain: "Native VLAN uyuşmazlığı etiketsiz trafiğin yanlış VLAN'a gitmesine ve CDP uyarılarına yol açar."
  },
  {
    domain: 2,
    q: "Bir erişim (access) portunu VLAN 20'ye atamak için hangi komut dizisi kullanılır?",
    options: [
      "switchport mode trunk / switchport trunk allowed vlan 20",
      "switchport mode access / switchport access vlan 20",
      "vlan 20 / trunk native 20",
      "interface vlan 20 / no shutdown"
    ],
    answer: 1,
    explain: "Erişim portu 'switchport mode access' ile tanımlanır ve 'switchport access vlan' ile VLAN'a atanır."
  },
  {
    domain: 2,
    q: "Bir IP telefonun ses trafiğini veriden ayırmak için hangi komut kullanılır?",
    options: ["switchport voice vlan", "switchport trunk native", "spanning-tree portfast", "channel-protocol lacp"],
    answer: 0,
    explain: "'switchport voice vlan' ses trafiğini ayrı bir VLAN'a yönlendirir ve QoS için kullanılır."
  },
  {
    domain: 2,
    q: "Kontrolcü tabanlı (controller-based) kablosuz AP'ler ile WLC arasında kullanılan standart tünel protokolü hangisidir?",
    options: ["CAPWAP", "OSPF", "STP", "LLDP"],
    answer: 0,
    explain: "CAPWAP (Control and Provisioning of Wireless Access Points), hafif AP'lerin WLC ile iletişim protokolüdür."
  },
  {
    domain: 2,
    q: "Bir LACP port-channel'da aynı anda en fazla kaç fiziksel link aktif olabilir?",
    options: ["2", "4", "8", "16"],
    answer: 2,
    explain: "LACP'de en fazla 8 aktif üye link bulunabilir; 16'ya kadar link ise yedek (standby) olarak eklenebilir."
  },
  {
    domain: 2,
    q: "Bir çok katmanlı (multilayer) switch'te VLAN'lar arası yönlendirmeyi etkinleştiren global komut nedir?",
    options: ["ip routing", "ip forward", "routing enable", "ip gateway"],
    answer: 0,
    explain: "Çok katmanlı switch'lerde 'ip routing' global komutu SVI'lar arasında Layer 3 yönlendirmeyi açar."
  },
  {
    domain: 2,
    q: "Bir trunk portunda hangi VLAN'ların taşınacağını sınırlandırmak için hangi komut kullanılır?",
    options: [
      "switchport trunk allowed vlan",
      "switchport access vlan",
      "switchport voice vlan",
      "spanning-tree vlan"
    ],
    answer: 0,
    explain: "'switchport trunk allowed vlan' trunk üzerinden geçecek VLAN listesini belirler."
  },
  {
    domain: 2,
    q: "Rapid PVST+ (RSTP) içindeki port durumları hangileridir?",
    options: [
      "Blocking, Listening, Learning, Forwarding",
      "Discarding, Learning, Forwarding",
      "Active, Standby, Init",
      "Up, Down, Err-disable"
    ],
    answer: 1,
    explain: "Rapid PVST+'da port durumları Discarding, Learning ve Forwarding'dir; eski STP'deki Blocking ve Listening, Discarding'e dönüşür."
  },
  {
    domain: 2,
    q: "Bir segmentte her zaman tek bir port hangi role sahip olur ve segmentteki trafiği köke iletir?",
    options: ["Root port", "Designated port", "Alternate port", "Backup port"],
    answer: 1,
    explain: "Her segmentte köke en iyi yolu sunan designated port bulunur; segmentin tüm trafiği bu port üzerinden iletilir."
  },
  {
    domain: 2,
    q: "Tüm portların hız ve dupleks durumlarını tek bir tabloda görmek için hangi komut kullanılır?",
    options: ["show interfaces status", "show ip route", "show cdp", "show version"],
    answer: 0,
    explain: "'show interfaces status' port durumlarını, hızı, dupleksi ve VLAN bilgisini tek tabloda gösterir."
  },
  {
    domain: 2,
    q: "LLDP'yi global olarak etkinleştiren IOS komutu nedir?",
    options: ["lldp enable", "lldp run", "cdp run", "lldp start"],
    answer: 1,
    explain: "Global konfigürasyonda 'lldp run' LLDP'yi etkinleştirir; arayüz bazında ayrıca 'lldp transmit/receive' ayarlanabilir."
  },
  {
    domain: 2,
    q: "Loop guard'ın temel amacı nedir?",
    options: [
      "Tek yönlü bağlantı (unidirectional link) nedeniyle oluşabilecek döngüleri önlemek",
      "Port güvenliğini sağlamak",
      "DHCP istemcilerini filtrelemek",
      "VLAN etiketlerini şifrelemek"
    ],
    answer: 0,
    explain: "Loop guard, BPDU alınmayan bir arayüzün yanlışlıkla forwarding durumuna geçmesini engeller."
  },
  {
    domain: 2,
    q: "Bir trace route çıktısı neyi gösterir?",
    options: [
      "Hedefe giden yol üzerindeki her atlamayı (hop) ve yanıt sürelerini",
      "Port güvenlik ihlallerini",
      "Yönlendiricinin RAM kullanımını",
      "DHCP kiralama tablosunu"
    ],
    answer: 0,
    explain: "Trace route, paketin hedefe giderken geçtiği her ağ atlamasını ve gecikmesini listeler."
  },
  {
    domain: 2,
    q: "Kablosuz ağda bir AP'nin kanal ve güç ayarlarını merkezi olarak yönetmek için hangi mimari kullanılır?",
    options: ["Bağımsız (standalone) AP", "Kontrolcü tabanlı (controller-based) AP mimarisi", "Yalnızca mesh", "Yalnızca bridge modu"],
    answer: 1,
    explain: "Kontrolcü tabanlı mimaride WLC, AP'lerin RF ayarlarını ve politikalarını merkezi olarak yönetir."
  },
  {
    domain: 2,
    q: "Kullanılmayan bir switch portunu güvenli hale getirmek için en uygun yaklaşım nedir?",
    options: [
      "Portu VLAN 1'e atamak ve açık bırakmak",
      "Portu kapatmak (shutdown) ve kullanılmayan bir VLAN'a atamak",
      "Portu trunk yapmak",
      "PortFast'ı etkinleştirmek"
    ],
    answer: 1,
    explain: "Kullanılmayan portların kapatılması ve boş bir VLAN'a atanması yetkisiz erişim riskini azaltır."
  },

  // ---------- Domain 3 (ek) ----------
  {
    domain: 3,
    q: "Bir hedef için yönlendirme tablosunda birden fazla eşleşme varsa yönlendirici hangi kurala göre karar verir?",
    options: [
      "En uzun önek (longest prefix match)",
      "En yüksek metrik",
      "En son eklenen yol",
      "En düşük sonraki atlama IP'si"
    ],
    answer: 0,
    explain: "Yönlendirici önce en uzun ön ek eşleşmesine bakar; AD ve metrik ancak aynı önek için yollar arasında ayrım yapar."
  },
  {
    domain: 3,
    q: "Varsayılan yol (default route) hangi ağ ve maske ile gösterilir?",
    options: ["0.0.0.0 0.0.0.0", "255.255.255.255", "127.0.0.1", "10.0.0.0 255.0.0.0"],
    answer: 0,
    explain: "0.0.0.0/0 tüm adresleri kapsar ve diğer eşleşmeler yoksa kullanılan varsayılan yoldur."
  },
  {
    domain: 3,
    q: "Yalnızca tek bir hedef IP adresine yönelik yol hangi maske uzunluğuna sahiptir?",
    options: ["/0", "/24", "/30", "/32"],
    answer: 3,
    explain: "Host yolu /32 maskesine sahiptir ve yalnızca tek bir IPv4 adresini kapsar."
  },
  {
    domain: 3,
    q: "OSPF'de varsayılan referans bant genişliği ile 1 Gbps bir arayüzün maliyeti (cost) kaçtır?",
    options: ["1", "10", "100", "1000"],
    answer: 0,
    explain: "Varsayılan referans bant genişliği 100 Mbps'tir. Maliyet = 100 / bant genişliği (Mbps) olduğundan 1 Gbps için 0.1, tam sayıya yuvarlanarak 1 olur."
  },
  {
    domain: 3,
    q: "OSPFv3 (IPv6) hangi çok yayın (multicast) adresini tüm OSPF yönlendiricileri için kullanır?",
    options: ["224.0.0.5", "FF02::5", "FF02::6", "224.0.0.18"],
    answer: 1,
    explain: "OSPFv3 tüm OSPF yönlendiricileri için FF02::5 kullanır; FF02::6 DR/BDR için kullanılır. 224.0.0.5 OSPFv2 içindir."
  },
  {
    domain: 3,
    q: "OSPF router ID'sini manuel olarak belirlemek için hangi komut kullanılır?",
    options: ["router-id <ip>", "ospf id <ip>", "ospf router-id <ip>", "set router <ip>"],
    answer: 0,
    explain: "OSPF yönlendirme sürecinde 'router-id <ip>' komutu ID'yi sabitler; böylece otomatik seçim yerine öngörülebilir bir kimlik olur."
  },
  {
    domain: 3,
    q: "Broadcast bir OSPF segmentinde DROTHER olarak adlandırılan yönlendiriciler arasındaki komşu ilişkisi hangi durumda kalır?",
    options: ["Full", "2-Way", "Init", "Down"],
    answer: 1,
    explain: "DROTHER'lar birbirleriyle yalnızca 2-Way durumuna geçer; tam adjacency (Full) yalnızca DR/BDR ile kurulur."
  },
  {
    domain: 3,
    q: "Point-to-point bir OSPF arayüzünün varsayılan ağ türü ile DR seçimi ilişkisi nedir?",
    options: [
      "Point-to-point ağda DR seçilir",
      "Point-to-point ağda DR/BDR seçimi yapılmaz",
      "Point-to-point ağda DR seçimi yalnızca öncelik 0'da yapılır",
      "Point-to-point ağda DR seçimi IPv6'da yapılır"
    ],
    answer: 1,
    explain: "Point-to-point ağ türünde OSPF DR/BDR seçmez; komşular doğrudan Full adjacency kurar."
  },
  {
    domain: 3,
    q: "HSRP version 1 için sanal MAC adresi hangi önek ile başlar?",
    options: ["0000.0C07.ACxx", "0050.56xx.xxxx", "0100.5E00.00xx", "0000.5E00.01xx"],
    answer: 0,
    explain: "HSRP v1 sanal MAC adresi 0000.0C07.ACxx biçimindedir; xx grup numarasıdır."
  },
  {
    domain: 3,
    q: "VRRP hangi çok yayın adresini kullanarak master ve backup yönlendiriciler arasında iletişim kurar?",
    options: ["224.0.0.18", "224.0.0.5", "FF02::5", "224.0.0.9"],
    answer: 0,
    explain: "VRRP, durum mesajlarını 224.0.0.18 çok yayın adresine gönderir."
  },
  {
    domain: 3,
    q: "IPv6 statik varsayılan yol eklemek için hangi komut kullanılır?",
    options: [
      "ip route 0.0.0.0 0.0.0.0 <sonraki-atlama>",
      "ipv6 route ::/0 <sonraki-atlama>",
      "ipv6 default-route <ip>",
      "route ipv6 ::/0 <ip>"
    ],
    answer: 1,
    explain: "IPv6 varsayılan yolu '::/0' ile tanımlanır: ipv6 route ::/0 <sonraki-atlama>."
  },
  {
    domain: 3,
    q: "EIGRP'nin dahili (internal) yolları için varsayılan administrative distance değeri nedir?",
    options: ["90", "110", "120", "170"],
    answer: 0,
    explain: "EIGRP dahili yolları AD 90, harici yolları AD 170 ile yönetilir."
  },

  // ---------- Domain 4 (ek) ----------
  {
    domain: 4,
    q: "NAT'ta İnternet'teki bir sunucunun gördüğü adres hangisidir?",
    options: ["Inside local", "Inside global", "Outside local", "Outside global"],
    answer: 1,
    explain: "Inside global, iç bir host'un dış dünyaya görünen (NAT sonrası) adresidir."
  },
  {
    domain: 4,
    q: "Bir iç adresi sabit bir public adresle eşlemek için hangi NAT komutu kullanılır?",
    options: [
      "ip nat inside source static <iç> <dış>",
      "ip nat pool <ad> <ip>",
      "ip route nat <iç> <dış>",
      "nat static <iç> <dış>"
    ],
    answer: 0,
    explain: "Statik NAT 'ip nat inside source static <iç-ip> <dış-ip>' ile tanımlanır."
  },
  {
    domain: 4,
    q: "Standart bir ACL genellikle nereye yerleştirilmelidir?",
    options: [
      "Hedefe mümkün olduğunca yakın",
      "Kaynağa mümkün olduğunca yakın",
      "Yönlendiricinin en merkezi arayüzüne",
      "Her zaman yalnızca dış arayüzde"
    ],
    answer: 0,
    explain: "Standart ACL yalnızca kaynak adresi değerlendirdiği için trafik hedefe yakın bir yerde engellenmelidir; aksi halde gereksiz yere uzağa kadar iletilir."
  },
  {
    domain: 4,
    q: "Genişletilmiş (extended) bir ACL genellikle nereye yerleştirilmelidir?",
    options: [
      "Kaynağa mümkün olduğunca yakın",
      "Hedefe mümkün olduğunca yakın",
      "Yalnızca NAT arayüzünde",
      "Yalnızca dış arayüzde"
    ],
    answer: 0,
    explain: "Genişletilmiş ACL kaynak ve hedefi değerlendirebildiği için kaynağa yakın konumlandırılarak gereksiz trafik ağda erken engellenir."
  },
  {
    domain: 4,
    q: "ACL'lerin sonunda örtük (implicit) olarak bulunan kural nedir?",
    options: ["permit any", "deny any", "log all", "reset"],
    answer: 1,
    explain: "Her ACL'nin sonunda 'deny any' örtük olarak bulunur; eşleşmeyen trafik engellenir."
  },
  {
    domain: 4,
    q: "İsimlendirilmiş genişletilmiş bir ACL oluşturmak için hangi komut kullanılır?",
    options: [
      "ip access-list extended <ad>",
      "access-list standard <ad>",
      "ip acl name <ad>",
      "ipv4 filter <ad>"
    ],
    answer: 0,
    explain: "'ip access-list extended <ad>' isimlendirilmiş genişletilmiş ACL'yi başlatır."
  },
  {
    domain: 4,
    q: "Bir IP adresinden alan adını bulmak için kullanılan DNS kaydı hangisidir?",
    options: ["A", "CNAME", "PTR", "NS"],
    answer: 2,
    explain: "PTR kaydı ters çözümleme (reverse lookup) için kullanılır; IP'den isme dönüşüm yapar."
  },
  {
    domain: 4,
    q: "Bir alan adının başka bir alan adına takma ad (alias) olmasını sağlayan DNS kaydı hangisidir?",
    options: ["A", "CNAME", "MX", "PTR"],
    answer: 1,
    explain: "CNAME kaydı bir ismi başka bir ismin takma adı olarak tanımlar."
  },
  {
    domain: 4,
    q: "Bir alan adının yetkili ad sunucularını belirten DNS kaydı hangisidir?",
    options: ["NS", "MX", "AAAA", "TXT"],
    answer: 0,
    explain: "NS kaydı alan adının hangi ad sunucuları tarafından yönetildiğini belirtir."
  },
  {
    domain: 4,
    q: "Dynamic ARP Inspection (DAI) hangi bilgi tabanını kullanarak sahte ARP paketlerini filtreler?",
    options: [
      "CAM tablosunu",
      "DHCP snooping binding tablosunu",
      "STP köprü tablosunu",
      "VLAN veritabanını"
    ],
    answer: 1,
    explain: "DAI, DHCP snooping'in oluşturduğu IP-MAC bağlama tablosunu kullanarak geçersiz ARP yanıtlarını engeller."
  },
  {
    domain: 4,
    q: "RA guard IPv6'da ne işe yarar?",
    options: [
      "Yetkisiz Router Advertisement mesajlarını filtreler",
      "DHCPv6 sunucusunu sınırlar",
      "NAT'ı devre dışı bırakır",
      "IPsec anahtarlarını yönetir"
    ],
    answer: 0,
    explain: "RA guard, erişim portlarından gelen sahte Router Advertisement mesajlarını engelleyerek sahte varsayılan ağ geçidi saldırılarını önler."
  },
  {
    domain: 4,
    q: "IPsec'te IKE Faz 1 ne oluşturur?",
    options: [
      "Güvenli veri trafiği için IPsec SA'ları",
      "ISAKMP (IKE) SA; eş doğrulaması ve güvenli kanal",
      "Yalnızca NAT eşlemeleri",
      "VLAN etiketleri"
    ],
    answer: 1,
    explain: "IKE Faz 1 ISAKMP SA oluşturur; eşleri doğrular ve Faz 2 için güvenli bir kanal sağlar."
  },
  {
    domain: 4,
    q: "SCP ve SFTP hangi standart bağlantı üzerinden çalışır?",
    options: ["Telnet (23)", "SSH (22)", "FTP (21)", "HTTP (80)"],
    answer: 1,
    explain: "SCP ve SFTP, güvenli kabuk (SSH) bağlantısı üzerinden, varsayılan olarak TCP 22 portunda çalışır."
  },

  // ---------- Domain 5 (ek) ----------
  {
    domain: 5,
    q: "SNMP'nin hangi sürümü kimlik doğrulama ve şifreleme sağlar?",
    options: ["SNMPv1", "SNMPv2c", "SNMPv3", "Hiçbiri"],
    answer: 2,
    explain: "SNMPv3 kimlik doğrulama (authentication) ve gizlilik (privacy/şifreleme) özelliklerini destekler; v1 ve v2c düz metin topluluk dizgisi kullanır."
  },
  {
    domain: 5,
    q: "SNMP'de yönetilen nesnelerin hiyerarşik olarak tanımlandığı yapı nedir?",
    options: ["MIB", "ACL", "CAM", "LSA"],
    answer: 0,
    explain: "MIB (Management Information Base), SNMP ile yönetilen nesnelerin hiyerarşik yapısını tanımlar; her nesne bir OID ile adreslenir."
  },
  {
    domain: 5,
    q: "Syslog mesajları varsayılan olarak hangi taşıma protokolü ve portu üzerinden gönderilir?",
    options: ["TCP 514", "UDP 514", "UDP 162", "TCP 49"],
    answer: 1,
    explain: "Geleneksel syslog UDP 514 üzerinden çalışır. SNMP trap'leri UDP 162, TACACS+ TCP 49 kullanır."
  },
  {
    domain: 5,
    q: "Ansible playbook'ları hangi veri biçiminde yazılır?",
    options: ["YAML", "XML", "Binary", "CSV"],
    answer: 0,
    explain: "Ansible playbook'ları YAML biçiminde yazılır ve görevleri (task) tanımlar."
  },
  {
    domain: 5,
    q: "Aynı yapılandırmanın tekrar uygulanmasının sonucunu değiştirmemesi özelliğine ne ad verilir?",
    options: ["Idempotency (yinelenebilirlik)", "Redundancy", "Latency", "Multiplexing"],
    answer: 0,
    explain: "İdempotent işlemler birden fazla kez uygulandığında aynı sonucu verir; otomasyon araçlarında önemli bir özelliktir."
  },
  {
    domain: 5,
    q: "Yönetim düzlemi politikalarının merkezi bir kontrolcüden dağıtıldığı yönetim yaklaşımı hangisidir?",
    options: ["Cihaz tabanlı (device-based)", "Kontrolcü tabanlı (controller-based)", "Elle (manual) yönetim", "Yalnızca bulut tabanlı"],
    answer: 1,
    explain: "Kontrolcü tabanlı yaklaşımda merkezi bir controller politikaları cihazlara dağıtır ve ağı tek noktadan yönetir."
  }
);
