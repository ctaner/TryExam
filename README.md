# TryExam — CCNA 200-301 v2.0 Sınav Simülatörü

Web tabanlı, tamamen istemci tarafında çalışan CCNA 200-301 v2.0 sınav simülatörü.
Sorular Cisco'nun yayımladığı konu başlıklarına göre (5 alan, %25/%25/%20/%20/%10 ağırlık) özgün olarak hazırlanmıştır.

## Özellikler
- 120 dakikalık zamanlı sınav, 100 soru (konu ağırlıklarına göre: 25/25/20/20/10), işaretleme ve soru listesi
- Soru türleri: tek seçim, birden fazla doğru seçenek, sürükle-bırak eşleştirme ve topoloji tabanlı simülasyon (IOS benzeri konsolda görevler)
- Konu ağırlıklarına göre soru seçimi ve her soruda seçenek karıştırma
- Yarım kalan sınavı sürdürme (tarayıcıda saklanır)
- Alan bazlı performans raporu ve cevap incelemesi
- %80 ve üzeri başarıda sertifika (1000 üzerinden ölçek)
- PDF sertifika indirme (Türkçe karakter destekli) ve LinkedIn "Lisanslar ve sertifikalar" bölümüne ekleme bağlantısı
- Sertifikada `www.cemaltaner.com.tr` adresi

## Dosyalar
- `index.html` — arayüz ve stiller
- `questions.js`, `questions_extra.js`, `questions_types.js`, `questions_labs.js`, `questions_hard.js` — soru bankası (`DOMAINS`, `QUESTIONS`)
- `lab.js` — IOS benzeri konsol simülatörü (komut ayrıştırma, show/ping, görev denetimi)
- `app.js` — sınav mantığı, zamanlayıcı, sonuç ve sertifika
- `README.md` — bu dosya

## GitHub Pages'e yayınlama
```bash
cd TryExam
git init -b main
git add .
git commit -m "TryExam: CCNA 200-301 sınav simülatörü"
gh repo create TryExam --public --source=. --push
gh api -X POST repos/{owner}/TryExam/pages -f "source[branch]=main" -f "source[path]=/"
```
Yayın adresi `https://<kullanıcı-adı>.github.io/TryExam/` olur. Farklı bir adres kullanırsanız
`app.js` içindeki `CONFIG.SITE_URL` değerini güncelleyin (LinkedIn bağlantısındaki `certUrl` buradan üretilir).

## Önemli notlar
- Bu uygulama bir **hazırlık aracıdır**. Cisco Systems tarafından onaylanmış resmi bir sınav veya sertifika değildir.
- Sertifika bir **TryExam tamamlama belgesidir**; resmi CCNA sertifikası değildir.
- GitHub Pages statik bir sitedir; sertifika numarası doğrulaması için sunucu tarafı bir kayıt bulunmaz.
  Sertifika numarası belgenin tutarlılığını göstermek içindir. İleride doğrulama gerekirse küçük bir API eklenebilir.
- Soru bankası 159 sorudan oluşur (111 tek seçim, 24 çoklu seçim, 8 eşleştirme, 16 simülasyon). Simülasyonlar arasında sorun giderme görevleri de vardır.
- Simülatör gerçek IOS'un tamamı değildir; yaygın sınav komutlarının bir alt kümesini destekler (ör. interface, vlan, switchport, ip address, ip route, router ospf, spanning-tree, access-list, ip nat, show ip interface brief, show vlan brief, show ip route, show running-config, ping). Desteklenmeyen komutlar 'Invalid input' hatası verir. Sınav her alandan ağırlığa göre soru seçer; soru bankası büyüdükçe farklı sınavlar üretilir.
- Cisco, CCNA ve ilgili markalar Cisco Systems, Inc.'in ticari markalarıdır.
