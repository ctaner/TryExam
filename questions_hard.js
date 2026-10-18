// TryExam - zor sorular: çok adımlı senaryolar, çoklu doğru seçenekli çeldiriciler,
// uzun topolojiler ve sorun giderme (troubleshooting) simülasyonları.
// Tümü özgün olarak yazılmıştır.

QUESTIONS.push(
  // =====================================================================
  // ÇOK ADIMLI SENARYOLAR (tek doğru cevap)
  // =====================================================================
  {
    domain: 3,
    q: "Aşağıdaki çıktılara göre R1 ile R2 arasındaki OSPF komşuluğu neden tam kurulamıyor?\n\n" +
      "R1# show ip ospf interface Gi0/0 → Hello 10, Dead 40, Area 0, MTU 1500\n" +
      "R2# show ip ospf interface Gi0/0 → Hello 10, Dead 40, Area 0, MTU 1400\n\n" +
      "Komşuluk ExStart durumunda takılı kalıyor.",
    options: [
      "Hello timer değerleri farklı",
      "Area ID'ler eşleşmiyor",
      "MTU değerleri farklı",
      "Dead timer değerleri farklı"
    ],
    answer: 2,
    explain: "Hello, dead ve area değerleri eşleşiyor. ExStart ve Exchange aşamalarında MTU uyuşmazlığı komşuluğun kurulmasını engeller. Arayüzlerdeki MTU değerleri eşitlenmelidir."
  },
  {
    domain: 2,
    q: "SW2'de 'show spanning-tree vlan 10' çıktısının ilgili bölümü şöyledir:\n\n" +
      "Gi0/1   Root   FWD   4\n" +
      "Gi0/2   Altn   BLK   19\n\n" +
      "SW2'nin Gi0/2 portu neden bloke (BLK) durumda?",
    options: [
      "Gi0/2 üzerinden kök köprüye giden yol maliyeti Gi0/1'den yüksek; bu nedenle alternatif (alternate) port olarak bloke edildi",
      "Gi0/2 portunda BPDU Guard tetiklendi",
      "Gi0/2 portu VLAN 10'da izinli değil",
      "Gi0/2 üzerinde port security ihlali yaşandı"
    ],
    answer: 0,
    explain: "RSTP'de her segment için kök portu en düşük yol maliyetiyle seçilir. Diğer alternatif yollar Alternate (Altn) rolünde ve BLK (Discarding) durumunda kalır. Bu bir döngü önleme mekanizmasıdır."
  },
  {
    domain: 1,
    q: "PC-A'ya 192.168.10.100/26 IP adresi ve varsayılan ağ geçidi olarak 192.168.10.1 atanmıştır. PC-A ağ geçidine ulaşamıyor. Bunun nedeni nedir?",
    options: [
      "Ağ geçidi adresi yayın (broadcast) adresidir",
      "PC-A'nın adresi (192.168.10.64/26 bloğunda) ile ağ geçidi (192.168.10.0/26 bloğunda) farklı alt ağlardadır",
      "Maske /24 olmalıydı; /26 her zaman yanlıştır",
      "DHCP etkin olmadığı için ağ geçidi çözümlenemez"
    ],
    answer: 1,
    explain: "/26 bloğunun büyüklüğü 64'tür: 0-63, 64-127, 128-191, 192-255. .100 adresi 64-127 bloğunda, .1 adresi ise 0-63 bloğundadır. Aynı alt ağda olmadıkları için ağ geçidine doğrudan ulaşılamaz."
  },
  {
    domain: 4,
    q: "Gereksinim: 192.168.10.0/24 ağı 10.0.0.0/24 ağına erişemesin, diğer tüm trafik serbest olsun. Yalnızca standart ACL kullanılacaktır. 10.0.0.0/24 ağı R2'nin Gi0/0 arayüzüne bağlıdır. ACL'i nereye uygulamalısınız?",
    options: [
      "R1 Gi0/1 arayüzünde out yönünde",
      "R2 Gi0/0 arayüzünde out yönünde",
      "R2 Gi0/0 arayüzünde in yönünde",
      "R1 Gi0/0 arayüzünde in yönünde"
    ],
    answer: 1,
    explain: "Standart ACL yalnızca kaynak adresine bakar. Bu nedenle hedefe yakın bir yerde, trafiğin hedef ağa çıktığı arayüzde (R2 Gi0/0, out) uygulanmalıdır. Kaynağa yakın uygulanırsa diğer hedeflere giden trafik de yanlışlıkla engellenebilir."
  },
  {
    domain: 2,
    q: "SW1 ve SW2 arasındaki Gi0/24 trunk üzerinden VLAN 20 trafiği geçmiyor, VLAN 10 çalışıyor.\n\n" +
      "SW1# show interfaces trunk → Gi0/24 Allowed VLANs: 10\n" +
      "SW2# show interfaces trunk → Gi0/24 Allowed VLANs: 10,20\n\n" +
      "Sorunun kaynağı nedir?",
    options: [
      "SW2'de VLAN 20 silinmiş",
      "SW1 trunk izin listesinde VLAN 20 yok; trunk yalnızca izinli VLAN'ları taşır",
      "Native VLAN'lar farklı olduğu için VLAN 20 düşüyor",
      "Port security ihlali nedeniyle VLAN 20 kapanmış"
    ],
    answer: 1,
    explain: "Trunk yalnızca izin listesindeki VLAN'ları taşır. SW1'de VLAN 20 izinli değilse, iki uçta da VLAN tanımlı olsa bile trafik geçmez. Native VLAN uyuşmazlığı olsaydı CDP uyarısı ve etiketsiz trafik sorunu görülürdü."
  },
  {
    domain: 3,
    q: "PC1 (192.168.1.10) PC2'ye (192.168.2.10) ping atamıyor. R1'de 192.168.2.0/24 için statik yol vardır (sonraki atlama 10.0.12.2). R2'de 192.168.1.0/24 için bir yol yoktur. R1'den 192.168.2.10 adresine ping başarılıdır. Sorunun kaynağı nedir?",
    options: [
      "R1'de varsayılan yol eksik",
      "R2'de dönüş yolu (192.168.1.0/24) eksik; yanıt paketleri PC1'e dönemiyor",
      "PC2'nin varsayılan ağ geçidi yanlış",
      "Adres çevirisi (NAT) zorunlu"
    ],
    answer: 1,
    explain: "İleri yol var ama dönüş yolu yok. R1'den yapılan ping R1'in kendi kaynak adresini kullandığı için başarılı görünür. PC1'den gelen trafiğin yanıtı R2'de 192.168.1.0/24 yolu olmadığı için geri gönderilemez."
  },
  {
    domain: 4,
    q: "Gi0/5 portunda port security etkindir: maksimum 1 MAC adresi ve ihlal modu shutdown. Logda '%PORT_SECURITY-2-PSECURE_VIOLATION' mesajı görülmüş ve port err-disabled durumuna geçmiştir. Portu yeniden etkinleştirmek için doğru sıra nedir?",
    options: [
      "Portu trunk moduna alıp yeniden başlatmak",
      "Yetkisiz cihazı çıkarmak, ardından arayüzde shutdown ve no shutdown yapmak",
      "Maksimum MAC sayısını 10'a çıkarmak; port otomatik açılır",
      "PortFast'ı etkinleştirmek; port kendiliğinden açılır"
    ],
    answer: 1,
    explain: "Err-disabled port, ihlal eden cihaz kaldırılmadan açılırsa tekrar kapanır. Önce yetkisiz cihaz çıkarılır, sonra arayüz shutdown/no shutdown ile yeniden başlatılır."
  },
  {
    domain: 1,
    q: "Bir istemci 169.254.20.5 adresi almıştır. Kullanıcı DHCP sunucusunun 192.168.10.5 adresinde olduğunu bildiriyor. Bu durumun en olası nedeni nedir?",
    options: [
      "İstemci statik IP kullanıyor ve bu adres DHCP'den gelmez",
      "DHCP isteği sunucuya ulaşamadı; istemcinin VLAN'ında ip helper-address (relay) yok veya yol engelli",
      "NAT tablosunda çakışma var",
      "Alt ağ maskesi çok büyük olduğu için adres atanamadı"
    ],
    answer: 1,
    explain: "169.254.0.0/16 APIPA adresidir: istemci DHCP yanıtı alamadığında kendi adresini üretir. DHCP sunucusu başka bir alt ağdaysa, o VLAN'da ip helper-address ile relay yapılandırılmadığı sürece Discover paketleri sunucuya ulaşmaz."
  },

  // =====================================================================
  // ÇOKLU DOĞRU SEÇENEKLİ, ÇELDİRİCİLİ SORULAR
  // =====================================================================
  {
    type: "multi", domain: 2,
    q: "STP ile ilgili DOĞRU olan İKİ ifadeyi seçin.",
    options: [
      "Kök portu, segmentin kök köprüye en düşük maliyetli yolunu temsil eder",
      "Discarding durumundaki bir port MAC adreslerini öğrenir",
      "Designated port, segmentte Forwarding durumuna geçer",
      "Alternate port Forwarding durumunda çalışır"
    ],
    answer: [0, 2],
    explain: "Discarding durumunda MAC öğrenilmez. Alternate port bloke (Discarding) durumdadır ve yalnızca yedek olarak bekler."
  },
  {
    type: "multi", domain: 3,
    q: "Statik yollar ve yönlendirme tablosu hakkında DOĞRU olan İKİ ifadeyi seçin.",
    options: [
      "show ip route çıktısında statik yol [1/0] biçiminde gösterilir; metrik değeri 0'dır",
      "Aynı önek için yönlendirici önce AD'ye bakar; düşük AD'li yolu seçer",
      "OSPF yolu (AD 110) statik yoldan (AD 1) her zaman daha düşük AD'ye sahiptir",
      "Aynı önek için daha yüksek AD değeri daha çok tercih edilir"
    ],
    answer: [0, 1],
    explain: "Statik yollar varsayılan AD 1 ile tanımlanır ve metrik değeri 0 olarak gösterilir. AD değeri küçük olan daha güvenilir kabul edilir, bu nedenle daha yüksek AD tercih edilmez. OSPF'nin AD'si (110) statikten yüksektir."
  },
  {
    type: "multi", domain: 3,
    q: "Yönlendirme tablosunda yol seçimi hakkında DOĞRU olan İKİ ifadeyi seçin.",
    options: [
      "En uzun önek eşleşmesi, AD ve metrikten önce gelir",
      "Aynı önek ve eşit AD'de düşük metrikli yol seçilir",
      "Yüksek AD değeri daha güvenilir kabul edilir",
      "Metrik, AD'den önce karşılaştırılır"
    ],
    answer: [0, 1],
    explain: "Yönlendirici önce hedef adrese en uzun önekle eşleşen girdiye bakar. Aynı önek için düşük AD kazanır; AD eşitse metrik karşılaştırılır. Düşük AD daha güvenilirdir."
  },
  {
    type: "multi", domain: 1,
    q: "Kablo ve arayüz sorunları hakkında DOĞRU olan İKİ ifadeyi seçin.",
    options: [
      "Artan CRC hataları çoğunlukla kablo veya konnektör gibi fiziksel katman sorunlarına işaret eder",
      "Tam dupleks bağlantıda geç çarpışma sayacı normalde artar",
      "Yarı dupleks tarafta görülen geç çarpışmalar, karşı tarafın tam dupleks çalıştığını gösterebilir",
      "Hız uyuşmazlığı yalnızca VLAN yapılandırma hatasıdır"
    ],
    answer: [0, 2],
    explain: "Tam dupleks bağlantıda çarpışma olmaz. Geç çarpışmalar, bir tarafın yarı dupleks diğerinin tam dupleks çalıştığını gösteren tipik belirtidir. Hız uyuşmazlığı fiziksel katmanda bir sorundur, VLAN ile ilgisi yoktur."
  },
  {
    type: "multi", domain: 4,
    q: "Port security modları ve sticky öğrenme hakkında DOĞRU olan İKİ ifadeyi seçin.",
    options: [
      "Sticky öğrenme, öğrenilen MAC adreslerini running-config'e ekler",
      "Protect modu ihlalde log üretir ve portu kapatır",
      "Restrict modu ihlalde sayaç artırır ve log üretir; port açık kalır",
      "Shutdown modu yalnızca VLAN 1 üzerinde çalışır"
    ],
    answer: [0, 2],
    explain: "Protect modu ihlal eden çerçeveleri sessizce düşürür; log üretmez ve portu kapatmaz. Restrict modu ihlalde sayaç artırır ve log üretir ama portu kapatmaz. Shutdown modu port'u err-disabled yapar."
  },
  {
    type: "multi", domain: 2,
    q: "EtherChannel (port-channel) hakkında DOĞRU olan İKİ ifadeyi seçin.",
    options: [
      "PAgP ile LACP birlikte çalışmaz; her iki uçta aynı protokol kullanılmalıdır",
      "LACP ve PAgP aynı port-channel içinde karıştırılabilir",
      "Üye portların hız ve dupleks ayarları aynı olmalıdır",
      "Layer 3 port-channel'da IP adresi fiziksel üye portlara atanır"
    ],
    answer: [0, 2],
    explain: "LACP ve PAgP farklı protokollerdir ve birbiriyle konuşamaz. Üye portların hız ve dupleks değerleri eşleşmelidir. Layer 3 port-channel'da IP mantıksal port-channel arayüzüne atanır."
  },

  // =====================================================================
  // UZUN TOPOLOJİ SİMÜLASYONLARI (birden fazla cihaz)
  // =====================================================================
  {
    type: "lab", domain: 2,
    q: "Üç anahtarlı bir ağda VLAN 10 ve VLAN 20 uçtan uca taşınacaktır. SW2 VLAN 10 için birincil kök köprü olacaktır. Tüm anahtarlarda gerekli VLAN'lar ve trunk bağlantıları yapılandırılacaktır.",
    topology: {
      devices: [
        { name: "PC-A", type: "pc", x: 80, y: 150 },
        { name: "SW1", type: "switch", x: 230, y: 150 },
        { name: "SW2", type: "switch", x: 390, y: 150 },
        { name: "SW3", type: "switch", x: 550, y: 150 },
        { name: "PC-B", type: "pc", x: 550, y: 250 }
      ],
      links: [
        { a: "PC-A", ai: "", b: "SW1", bi: "Gi0/1", label: "VLAN 10" },
        { a: "SW1", ai: "Gi0/24", b: "SW2", bi: "Gi0/24", label: "Trunk" },
        { a: "SW2", ai: "Gi0/23", b: "SW3", bi: "Gi0/23", label: "Trunk" },
        { a: "SW3", ai: "Gi0/1", b: "PC-B", bi: "", label: "VLAN 20" }
      ]
    },
    devices: ["SW1", "SW2", "SW3"],
    init: {},
    tasks: [
      { text: "SW1, SW2 ve SW3 üzerinde VLAN 10 (SALES) ve VLAN 20 (ENG) oluşturun.",
        check: (lab) => ["SW1", "SW2", "SW3"].every((n) => {
          const v = LAB_DEV(lab, n).vlans;
          return v[10] && v[10].name.toUpperCase() === "SALES" && v[20] && v[20].name.toUpperCase() === "ENG";
        }) },
      { text: "SW1 Gi0/1 portunu VLAN 10'a, SW3 Gi0/1 portunu VLAN 20'ye erişim portu olarak atayın.",
        check: (lab) => {
          const a = LAB_IF(lab, "SW1", "Gi0/1"), b = LAB_IF(lab, "SW3", "Gi0/1");
          return !!a && !!b && a.mode === "access" && a.access === 10 && b.mode === "access" && b.access === 20;
        } },
      { text: "SW1-SW2 (Gi0/24) ve SW2-SW3 (Gi0/23) bağlantılarını her iki uçta trunk yapın; yalnızca VLAN 10 ve 20 izinli olsun.",
        check: (lab) => {
          const ids = [["SW1", "Gi0/24"], ["SW2", "Gi0/24"], ["SW2", "Gi0/23"], ["SW3", "Gi0/23"]];
          return ids.every((p) => {
            const f = LAB_IF(lab, p[0], p[1]);
            return !!f && f.mode === "trunk" && LAB_SAME(f.allowed, [10, 20]);
          });
        } },
      { text: "SW2 üzerinde VLAN 10 için birincil kök köprü (root primary) ayarlayın.",
        check: (lab) => LAB_DEV(lab, "SW2").stp[10] === 24576 }
    ],
    explain: "Uçtan uca VLAN için her anahtarda VLAN tanımlanmalı ve bağlantı noktaları trunk olmalıdır. Trunk izin listesi iki uçta da aynı olmalıdır. Kök köprü, köprü önceliğinin düşük olmasıyla seçilir."
  },
  {
    type: "lab", domain: 1,
    q: "SW2 erişim katmanındadır, SW1 ise VLAN'lar arası yönlendirmeyi yapan çok katmanlı anahtardır. Her iki anahtarda VLAN'lar, trunk ve SVI'lar yapılandırılacaktır.",
    topology: {
      devices: [
        { name: "SW1", type: "switch", x: 250, y: 150 },
        { name: "SW2", type: "switch", x: 430, y: 150 },
        { name: "PC-A", type: "pc", x: 590, y: 70 },
        { name: "PC-B", type: "pc", x: 590, y: 230 }
      ],
      links: [
        { a: "SW1", ai: "Gi0/24", b: "SW2", bi: "Gi0/24", label: "Trunk" },
        { a: "SW2", ai: "Gi0/1", b: "PC-A", bi: "", label: "VLAN 10" },
        { a: "SW2", ai: "Gi0/2", b: "PC-B", bi: "", label: "VLAN 20" }
      ]
    },
    devices: ["SW1", "SW2"],
    init: {},
    tasks: [
      { text: "SW1 ve SW2 üzerinde VLAN 10 ve VLAN 20'yi oluşturun.",
        check: (lab) => ["SW1", "SW2"].every((n) => LAB_DEV(lab, n).vlans[10] && LAB_DEV(lab, n).vlans[20]) },
      { text: "SW2 Gi0/1 portunu VLAN 10'a, Gi0/2 portunu VLAN 20'ye erişim portu yapın.",
        check: (lab) => {
          const a = LAB_IF(lab, "SW2", "Gi0/1"), b = LAB_IF(lab, "SW2", "Gi0/2");
          return !!a && !!b && a.mode === "access" && a.access === 10 && b.mode === "access" && b.access === 20;
        } },
      { text: "SW1 ve SW2 arasındaki Gi0/24 bağlantısını her iki uçta trunk yapın; yalnızca VLAN 10 ve 20 izinli olsun.",
        check: (lab) => ["SW1", "SW2"].every((n) => {
          const f = LAB_IF(lab, n, "Gi0/24");
          return !!f && f.mode === "trunk" && LAB_SAME(f.allowed, [10, 20]);
        }) },
      { text: "SW1 üzerinde IP yönlendirmeyi etkinleştirin ve VLAN 10 (192.168.10.1/24) ile VLAN 20 (192.168.20.1/24) için SVI'ları yapılandırın.",
        check: (lab) => {
          const d = LAB_DEV(lab, "SW1");
          const a = LAB_IF(lab, "SW1", "Vlan10"), b = LAB_IF(lab, "SW1", "Vlan20");
          return d.routing === true && !!a && !!b && a.ip === "192.168.10.1" && a.mask === "255.255.255.0" &&
            b.ip === "192.168.20.1" && b.mask === "255.255.255.0";
        } },
      { text: "SW1'den 192.168.20.1 adresine ping testi yapın ve başarılı olduğunu doğrulayın.",
        check: (lab) => lab.pings.some((p) => p.dev === "SW1" && p.ip === "192.168.20.1" && p.ok) }
    ],
    explain: "Katman 3 anahtar, VLAN'lar arası yönlendirme için 'ip routing' ve SVI'lar gerektirir. Erişim anahtarındaki portlar VLAN'a atanır, anahtarlar arası bağlantı trunk olur ve izinli VLAN listesi VLAN 10 ile 20'yi içerir."
  },
  {
    type: "lab", domain: 3,
    q: "Dört cihazlı bir ağda R1 ve R2, 10.0.12.0/30 ağı üzerinden OSPF ile bağlanacaktır. Her iki yönlendiricinin LAN arayüzleri OSPF'ye dahil edilecek ve router ID'ler ayarlanacaktır.",
    topology: {
      devices: [
        { name: "PC1", type: "pc", x: 80, y: 150 },
        { name: "R1", type: "router", x: 250, y: 150 },
        { name: "R2", type: "router", x: 430, y: 150 },
        { name: "PC2", type: "pc", x: 590, y: 150 }
      ],
      links: [
        { a: "PC1", ai: "", b: "R1", bi: "Gi0/1", label: "192.168.1.0/24" },
        { a: "R1", ai: "Gi0/0", b: "R2", bi: "Gi0/0", label: "10.0.12.0/30" },
        { a: "R2", ai: "Gi0/1", b: "PC2", bi: "", label: "192.168.2.0/24" }
      ]
    },
    devices: ["R1", "R2"],
    init: {},
    tasks: [
      { text: "R1 Gi0/0 (10.0.12.1/30) ve Gi0/1 (192.168.1.1/24) arayüzlerine IP atayın ve etkinleştirin.",
        check: (lab) => {
          const a = LAB_IF(lab, "R1", "Gi0/0"), b = LAB_IF(lab, "R1", "Gi0/1");
          return !!a && !!b && a.ip === "10.0.12.1" && a.mask === "255.255.255.252" && !a.shut &&
            b.ip === "192.168.1.1" && b.mask === "255.255.255.0" && !b.shut;
        } },
      { text: "R2 Gi0/0 (10.0.12.2/30) ve Gi0/1 (192.168.2.1/24) arayüzlerine IP atayın ve etkinleştirin.",
        check: (lab) => {
          const a = LAB_IF(lab, "R2", "Gi0/0"), b = LAB_IF(lab, "R2", "Gi0/1");
          return !!a && !!b && a.ip === "10.0.12.2" && a.mask === "255.255.255.252" && !a.shut &&
            b.ip === "192.168.2.1" && b.mask === "255.255.255.0" && !b.shut;
        } },
      { text: "R1'de OSPF 1 süreci altında 10.0.12.0/30 ve 192.168.1.0/24 ağlarını area 0'a dahil edin.",
        check: (lab) => {
          const o = LAB_DEV(lab, "R1").ospf;
          return !!o && o.pid === 1 && o.nets.some((n) => n.net === "10.0.12.0" && n.wild === "0.0.0.3" && n.area === "0") &&
            o.nets.some((n) => n.net === "192.168.1.0" && n.wild === "0.0.0.255" && n.area === "0");
        } },
      { text: "R2'de OSPF 1 süreci altında 10.0.12.0/30 ve 192.168.2.0/24 ağlarını area 0'a dahil edin; router ID'yi 2.2.2.2 yapın.",
        check: (lab) => {
          const o = LAB_DEV(lab, "R2").ospf;
          return !!o && o.pid === 1 && o.rid === "2.2.2.2" &&
            o.nets.some((n) => n.net === "10.0.12.0" && n.wild === "0.0.0.3" && n.area === "0") &&
            o.nets.some((n) => n.net === "192.168.2.0" && n.wild === "0.0.0.255" && n.area === "0");
        } },
      { text: "R1'den 10.0.12.2 adresine ping testi yapın ve başarılı olduğunu doğrulayın.",
        check: (lab) => lab.pings.some((p) => p.dev === "R1" && p.ip === "10.0.12.2" && p.ok) }
    ],
    explain: "OSPF komşuluğu için iki uçtaki arayüzler aynı alt ağda ve aynı area'da olmalıdır. Her iki yönlendiricide ağlar 'network' komutuyla area 0'a dahil edilir. Router ID, OSPF'de yönlendiricinin benzersiz kimliğidir."
  },

  // =====================================================================
  // SORUN GİDERME (TROUBLESHOOTING) SİMÜLASYONLARI
  // Başlangıç yapılandırmasında hatalar vardır; görevler bu hataları düzeltmeyi ister.
  // =====================================================================
  {
    type: "lab", domain: 2,
    q: "SW1'in mevcut yapılandırmasında iki hata var: PC-A'nın bağlı olduğu Gi0/1 portu yanlış VLAN'da (100) ve SW1-SW2 trunk'ı yalnızca VLAN 10'a izin veriyor. Hataları düzeltin ve eksik VLAN'ı ekleyin.",
    topology: {
      devices: [
        { name: "PC-A", type: "pc", x: 110, y: 100 },
        { name: "SW1", type: "switch", x: 320, y: 150 },
        { name: "SW2", type: "switch", x: 540, y: 150 }
      ],
      links: [
        { a: "PC-A", ai: "", b: "SW1", bi: "Gi0/1", label: "VLAN 10" },
        { a: "SW1", ai: "Gi0/24", b: "SW2", bi: "Gi0/24", label: "Trunk" }
      ]
    },
    devices: ["SW1"],
    init: {
      "SW1": [
        "vlan 10", "name SALES", "exit",
        "interface GigabitEthernet0/1", "switchport mode access", "switchport access vlan 100", "exit",
        "interface GigabitEthernet0/24", "switchport mode trunk", "switchport trunk allowed vlan 10", "exit"
      ]
    },
    tasks: [
      { text: "VLAN 20'yi oluşturun ve adını 'ENG' yapın.",
        check: (lab) => LAB_DEV(lab, "SW1").vlans[20] && LAB_DEV(lab, "SW1").vlans[20].name.toUpperCase() === "ENG" },
      { text: "Gi0/1 portunun VLAN'ını düzeltin: PC-A VLAN 10'da olmalı.",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Gi0/1"); return !!f && f.mode === "access" && f.access === 10; } },
      { text: "Gi0/24 trunk'ının izin listesine VLAN 20'yi ekleyin (yalnızca 10 ve 20 izinli olsun).",
        check: (lab) => { const f = LAB_IF(lab, "SW1", "Gi0/24"); return !!f && f.mode === "trunk" && LAB_SAME(f.allowed, [10, 20]); } }
    ],
    explain: "Erişim portunun VLAN'ı yanlış atanmıştı. Trunk izin listesi VLAN 20'yi içermediği için o VLAN'a ait trafik karşı anahtara geçemezdi. Hem VLAN oluşturulmalı hem de trunk'ta izinli olmalıdır."
  },
  {
    type: "lab", domain: 3,
    q: "R1'de 192.168.2.0/24 ağına giden statik yol yanlış sonraki atlama adresine (10.0.21.2) yapılandırılmış ve Gi0/0 arayüzü kapalı. Hataları düzeltin.",
    topology: {
      devices: [
        { name: "PC1", type: "pc", x: 110, y: 150 },
        { name: "R1", type: "router", x: 320, y: 150 },
        { name: "R2", type: "router", x: 540, y: 150 }
      ],
      links: [
        { a: "PC1", ai: "", b: "R1", bi: "Gi0/1", label: "192.168.1.0/24" },
        { a: "R1", ai: "Gi0/0", b: "R2", bi: "Gi0/0", label: "10.0.12.0/30" }
      ]
    },
    devices: ["R1"],
    init: {
      "R1": [
        "interface GigabitEthernet0/0", "ip address 10.0.12.1 255.255.255.252", "exit",
        "ip route 192.168.2.0 255.255.255.0 10.0.21.2"
      ]
    },
    tasks: [
      { text: "R1 Gi0/0 arayüzünü etkinleştirin (administratively down durumundan çıkarın).",
        check: (lab) => { const f = LAB_IF(lab, "R1", "Gi0/0"); return !!f && !f.shut; } },
      { text: "Yanlış sonraki atlamalı (10.0.21.2) statik yolu kaldırın.",
        check: (lab) => !LAB_DEV(lab, "R1").routes.some((r) => r.nh === "10.0.21.2") },
      { text: "192.168.2.0/24 için doğru sonraki atlama (10.0.12.2) ile statik yol ekleyin.",
        check: (lab) => LAB_DEV(lab, "R1").routes.some((r) => r.net === "192.168.2.0" && r.mask === "255.255.255.0" && r.nh === "10.0.12.2") },
      { text: "R1'den 10.0.12.2 adresine ping testi yapın ve başarılı olduğunu doğrulayın.",
        check: (lab) => lab.pings.some((p) => p.dev === "R1" && p.ip === "10.0.12.2" && p.ok) }
    ],
    explain: "Yönlendiricinin arayüzleri varsayılan olarak kapalıdır; 'no shutdown' ile açılmalıdır. Statik yolun sonraki atlaması, o yolu doğrudan bağlı bir komşu adresi olmalıdır. Yanlış adres kaldırılıp doğrusu eklenmelidir."
  },
  {
    type: "lab", domain: 3,
    q: "R1'de OSPF yapılandırılmıştır ancak 10.0.12.0/30 ağı yanlış area'ya (1) dahil edilmiştir. Hatayı düzeltin ve router ID'yi ayarlayın.",
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
        "interface GigabitEthernet0/1", "ip address 192.168.1.1 255.255.255.0", "no shutdown", "exit",
        "router ospf 1", "network 10.0.12.0 0.0.0.3 area 1", "network 192.168.1.0 0.0.0.255 area 0", "exit"
      ]
    },
    tasks: [
      { text: "10.0.12.0/30 ağının yanlış area 1 kaydını kaldırın.",
        check: (lab) => !LAB_DEV(lab, "R1").ospf.nets.some((n) => n.net === "10.0.12.0" && n.area === "1") },
      { text: "10.0.12.0/30 ağını doğru şekilde area 0'a dahil edin.",
        check: (lab) => LAB_DEV(lab, "R1").ospf.nets.some((n) => n.net === "10.0.12.0" && n.wild === "0.0.0.3" && n.area === "0") },
      { text: "OSPF router ID'yi 1.1.1.1 olarak ayarlayın.",
        check: (lab) => LAB_DEV(lab, "R1").ospf.rid === "1.1.1.1" }
    ],
    explain: "OSPF'de komşu iki yönlendirici aynı area'da olmalıdır. Yanlış area kaydı 'no network' ile kaldırılır ve doğru area ile yeniden eklenir."
  },
  {
    type: "lab", domain: 4,
    q: "R1'de NAT ve ACL yapılandırması hatalıdır: iç ve dış arayüz işaretleri ters yapılmış, ACL 10 yanlış yönde (out) uygulanmış. Hataları düzeltin.",
    topology: {
      devices: [
        { name: "PC1", type: "pc", x: 110, y: 150 },
        { name: "R1", type: "router", x: 320, y: 150 },
        { name: "ISP", type: "router", x: 540, y: 150 }
      ],
      links: [
        { a: "PC1", ai: "", b: "R1", bi: "Gi0/1", label: "İç ağ" },
        { a: "R1", ai: "Gi0/0", b: "ISP", bi: "", label: "WAN" }
      ]
    },
    devices: ["R1"],
    init: {
      "R1": [
        "interface GigabitEthernet0/0", "ip address 10.0.12.1 255.255.255.252", "no shutdown", "ip nat inside", "exit",
        "interface GigabitEthernet0/1", "ip address 192.168.1.1 255.255.255.0", "no shutdown", "ip nat outside", "ip access-group 10 out", "exit",
        "access-list 10 permit 192.168.1.0 0.0.0.255"
      ]
    },
    tasks: [
      { text: "Gi0/1 arayüzünü NAT iç (inside), Gi0/0 arayüzünü NAT dış (outside) olarak düzeltin.",
        check: (lab) => { const a = LAB_IF(lab, "R1", "Gi0/1"), b = LAB_IF(lab, "R1", "Gi0/0"); return !!a && !!b && a.nat === "inside" && b.nat === "outside"; } },
      { text: "ACL 10'un Gi0/1 üzerindeki yanlış 'out' uygulamasını kaldırın.",
        check: (lab) => { const f = LAB_IF(lab, "R1", "Gi0/1"); return !!f && f.aclOut === null; } },
      { text: "ACL 10'u Gi0/1 arayüzüne gelen (in) yönde uygulayın.",
        check: (lab) => { const f = LAB_IF(lab, "R1", "Gi0/1"); return !!f && f.aclIn === "10"; } }
    ],
    explain: "NAT iç arayüzü yerel ağa bakan, dış arayüzü İnternet'e bakan arayüzdür. ACL, filtrelenecek trafik arayüze gelirken 'in' yönünde uygulanmalıdır; 'out' yanlış yönü filtreler."
  },
  {
    type: "lab", domain: 2,
    q: "Mevcut yapılandırmada SW2 VLAN 10 için birincil kök köprü olarak ayarlanmış. Gereksinim: kök köprü SW1 olmalı, SW2 yedek kök köprü olmalıdır. Hatayı düzeltin.",
    topology: {
      devices: [
        { name: "SW1", type: "switch", x: 320, y: 100 },
        { name: "SW2", type: "switch", x: 320, y: 220 }
      ],
      links: [
        { a: "SW1", ai: "Gi0/24", b: "SW2", bi: "Gi0/24", label: "Trunk" }
      ]
    },
    devices: ["SW1", "SW2"],
    init: {
      "SW2": ["spanning-tree vlan 10 root primary"]
    },
    tasks: [
      { text: "SW1'de VLAN 10 için birincil kök köprü (root primary) ayarlayın.",
        check: (lab) => LAB_DEV(lab, "SW1").stp[10] === 24576 },
      { text: "SW2'de VLAN 10 için yedek kök köprü (root secondary) ayarlayın.",
        check: (lab) => LAB_DEV(lab, "SW2").stp[10] === 28672 }
    ],
    explain: "Kök köprü seçimi en düşük köprü önceliğine göre yapılır. SW2'ye birincil ayarı verilmiş olduğu için kök SW2 olur. Doğru tasarımda SW1 birincil, SW2 yedek olmalıdır."
  },
  {
    type: "lab", domain: 5,
    q: "R1'deki syslog yapılandırmasında yanlış bir sunucu adresi (10.0.0.5) tanımlanmış. Yanlış kaydı kaldırıp doğru sunucuyu (10.0.0.50) ekleyin.",
    topology: {
      devices: [
        { name: "R1", type: "router", x: 320, y: 150 },
        { name: "SYSLOG", type: "pc", x: 320, y: 40 }
      ],
      links: []
    },
    devices: ["R1"],
    init: {
      "R1": ["logging host 10.0.0.5"]
    },
    tasks: [
      { text: "Yanlış syslog kaydı olan 10.0.0.5 adresini kaldırın.",
        check: (lab) => LAB_DEV(lab, "R1").logHosts.indexOf("10.0.0.5") === -1 },
      { text: "Syslog sunucusu olarak 10.0.0.50 adresini ekleyin.",
        check: (lab) => LAB_DEV(lab, "R1").logHosts.indexOf("10.0.0.50") !== -1 }
    ],
    explain: "Yanlış syslog hedefi 'no logging host <ip>' ile kaldırılır, doğru hedef 'logging host <ip>' ile eklenir. Yanlış hedefe giden mesajlar doğru sunucuda görünmez."
  }
);
