import { IMAGES } from './images'

export const companyInfo = {
  name: 'Wixtory İnşaat',
  nameEn: 'Wixtory Construction',
  founder: 'Hacı Celal Aygar',
  email: 'wixtorysoft@gmail.com',
  phone: '+905448358401',
  phoneDisplay: '+90 544 835 84 01',
  address: 'Levent Mah. Büyükdere Cad. No:123 Beşiktaş/İstanbul',
  workingHours: {
    tr: 'Pzt-Cum: 08:00-18:00',
    en: 'Mon-Fri: 08:00-18:00',
  },
  founded: 1999,
  social: {
    instagram: 'https://instagram.com/wixtoryinsaat',
    linkedin: 'https://linkedin.com/company/wixtoryinsaat',
    twitter: 'https://twitter.com/wixtoryinsaat',
  },
}

export const stats = [
  { value: 350, suffix: '+', key: 'completedProjects' },
  { value: 2500, suffix: '+', key: 'happyClients' },
  { value: 25, suffix: '+', key: 'yearsExperience' },
  { value: 12, suffix: '', key: 'cities' },
]

export type ProjectCategory = 'residential' | 'commercial' | 'infrastructure'

export interface Project {
  id: number
  title: string
  titleEn: string
  location: string
  locationEn: string
  year: string
  category: ProjectCategory
  image: string
  description: string
  descriptionEn: string
  area: string
  status: 'completed' | 'ongoing' | 'planned'
  // Detailed page fields
  fullDescription?: string
  fullDescriptionEn?: string
  features?: string[]
  featuresEn?: string[]
  client?: string
  clientEn?: string
  duration?: string
  slug: string
  progress?: number
  gallery?: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Skyline Residence',
    titleEn: 'Skyline Residence',
    location: 'İstanbul, Kadıköy',
    locationEn: 'Istanbul, Kadikoy',
    year: '2024',
    category: 'residential',
    image: IMAGES.projectResidential,
    description: '42 katlı lüks rezidans projesi, 280 daire, panoramik boğaz manzarası.',
    descriptionEn: '42-story luxury residence project, 280 apartments, panoramic Bosphorus view.',
    area: '45.000 m²',
    status: 'ongoing',
    fullDescription: 'Skyline Residence, İstanbul\'un Kadıköy ilçesinde yükselen 42 katlı lüks rezidans projesidir. 280 ayrı daireden oluşan proje, panoramik Boğaz manzarasıyla dikkat çekmektedir. Akıllı ev sistemleri, kapalı otopark, yüzme havuzu ve fitness merkezi gibi donatılarla modern yaşam konforu sunmaktadır.',
    fullDescriptionEn: 'Skyline Residence is a 42-story luxury residence project rising in Istanbul\'s Kadikoy district. Consisting of 280 separate apartments, the project stands out with its panoramic Bosphorus view. It offers modern living comfort with amenities such as smart home systems, indoor parking, swimming pool, and fitness center.',
    features: ['42 kat, 280 daire', 'Panoramik Boğaz manzarası', 'Akıllı ev sistemleri', 'Kapalı otopark (400 araç)', 'Yüzme havuzu ve spa', 'Fitness merkezi'],
    featuresEn: ['42 floors, 280 apartments', 'Panoramic Bosphorus view', 'Smart home systems', 'Indoor parking (400 vehicles)', 'Swimming pool and spa', 'Fitness center'],
    client: 'Skyline Gayrimenkul',
    clientEn: 'Skyline Real Estate',
    duration: '2022 - 2024',
    slug: 'skyline-residence',
    progress: 78,
    gallery: [IMAGES.projectResidential, IMAGES.projectInterior],
  },
  {
    id: 2,
    title: 'Marina Tower',
    titleEn: 'Marina Tower',
    location: 'İstanbul, Ataşehir',
    locationEn: 'Istanbul, Atasehir',
    year: '2023',
    category: 'commercial',
    image: IMAGES.projectCommercial,
    description: 'A+ sınıfı ofis kulesi, akıllı bina teknolojileri ile donatılmış modern iş merkezi.',
    descriptionEn: 'A+ class office tower, modern business center equipped with smart building technologies.',
    area: '62.000 m²',
    status: 'completed',
    fullDescription: 'Marina Tower, Ataşehir finans bölgesinin kalbinde yükselen A+ sınıf ofis kulesidir. Akıllı bina yönetim sistemi, enerji verimli HVAC sistemi ve yüksek hızlı asansörlerle donatılmış olan bina, uluslararası standartlarda iş ortamı sunmaktadır.',
    fullDescriptionEn: 'Marina Tower is an A+ class office tower rising in the heart of Atasehir financial district. Equipped with smart building management system, energy-efficient HVAC system, and high-speed elevators, the building offers an international standard business environment.',
    features: ['A+ sınıf ofis alanları', 'Akıllı bina yönetimi', 'Enerji verimli HVAC', '12 yüksek hızlı asansör', 'Konferans salonları', 'Yemek katı ve kafeterya'],
    featuresEn: ['A+ class office spaces', 'Smart building management', 'Energy-efficient HVAC', '12 high-speed elevators', 'Conference halls', 'Dining floor and cafeteria'],
    client: 'Marina Yatırım Holding',
    clientEn: 'Marina Investment Holding',
    duration: '2020 - 2023',
    slug: 'marina-tower',
    gallery: [IMAGES.projectCommercial],
  },
  {
    id: 3,
    title: 'Green Valley Villas',
    titleEn: 'Green Valley Villas',
    location: 'Antalya, Konyaaltı',
    locationEn: 'Antalya, Konyaalti',
    year: '2024',
    category: 'residential',
    image: IMAGES.projectInterior,
    description: 'Doğayla iç içe 48 villa, özel havuz ve peyzaj düzenlemesi.',
    descriptionEn: '48 villas surrounded by nature, private pools and landscaping.',
    area: '28.000 m²',
    status: 'ongoing',
    fullDescription: 'Green Valley Villas, Antalya Konyaaltı\'nda doğayla iç içe bir yaşam sunan 48 villalık lüks konut projesidir. Her villa özel havuz, geniş bahçe ve akıllı ev otomasyonu ile donatılmıştır. Sürdürülebilir malzeme kullanımı ve güneş enerjisi sistemiyle çevre dostu bir proje olma özelliği taşımaktadır.',
    fullDescriptionEn: 'Green Valley Villas is a luxury housing project of 48 villas offering a life intertwined with nature in Antalya Konyaalti. Each villa is equipped with a private pool, spacious garden, and smart home automation. It features eco-friendly design with sustainable material use and solar energy systems.',
    features: ['48 lüks villa', 'Özel havuz ve bahçe', 'Akıllı ev otomasyonu', 'Güneş enerjisi sistemi', '7/24 güvenlik', 'Ortak sosyal tesisler'],
    featuresEn: ['48 luxury villas', 'Private pool and garden', 'Smart home automation', 'Solar energy system', '24/7 security', 'Shared social facilities'],
    client: 'Green Valley Development',
    clientEn: 'Green Valley Development',
    duration: '2023 - 2024',
    slug: 'green-valley-villas',
    progress: 92,
    gallery: [IMAGES.projectInterior, IMAGES.projectResidential],
  },
  {
    id: 4,
    title: 'Northern Highway Bridge',
    titleEn: 'Northern Highway Bridge',
    location: 'Ankara, Kızılcahamam',
    locationEn: 'Ankara, Kizilcahamam',
    year: '2022',
    category: 'infrastructure',
    image: IMAGES.projectInfrastructure,
    description: '480 metre uzunluğunda viyadük, deprem bölgesi özel tasarım.',
    descriptionEn: '480-meter viaduct, special design for earthquake zone.',
    area: '480 m',
    status: 'completed',
    fullDescription: 'Northern Highway Bridge, Ankara-Kızılcahamam otoyol güzergahında yer alan 480 metre uzunluğunda viyadüktür. Deprem bölgesinde yer aldığı için özel sismik tasarım kriterlerine göre inşa edilmiştir. Yüksek dayanımlı beton ve özel çelik donatı kullanılarak uzun ömürlü ve güvenli bir yapı oluşturulmuştur.',
    fullDescriptionEn: 'Northern Highway Bridge is a 480-meter viaduct located on the Ankara-Kizilcahamam highway route. It was built according to special seismic design criteria as it is located in an earthquake zone. A long-lasting and safe structure was created using high-strength concrete and special steel reinforcement.',
    features: ['480 metre uzunluk', 'Sismik izolasyon sistemi', 'Yüksek dayanımlı beton', 'Çelik kompozit taşıyıcı', 'Deprem sensörleri', 'Otomatik yapısal izleme'],
    featuresEn: ['480 meters length', 'Seismic isolation system', 'High-strength concrete', 'Steel composite carrier', 'Earthquake sensors', 'Automated structural monitoring'],
    client: 'Karayolları Genel Müdürlüğü',
    clientEn: 'General Directorate of Highways',
    duration: '2019 - 2022',
    slug: 'northern-highway-bridge',
    gallery: [IMAGES.projectInfrastructure],
  },
  {
    id: 5,
    title: 'TechPark Campus',
    titleEn: 'TechPark Campus',
    location: 'İzmir, Bornova',
    locationEn: 'Izmir, Bornova',
    year: '2023',
    category: 'commercial',
    image: IMAGES.projectCommercial,
    description: 'Teknoloji geliştirme bölgesi, 5 bina, ortak kullanım alanları.',
    descriptionEn: 'Technology development zone, 5 buildings, shared spaces.',
    area: '75.000 m²',
    status: 'completed',
    fullDescription: 'TechPark Campus, İzmir Bornova\'da faaliyet gösteren teknoloji geliştirme bölgesidir. 5 ayrı binadan oluşan kampüs, startup\'lar ve teknoloji şirketleri için özel tasarlanmış çalışma alanları, laboratuvarlar ve ortak kullanım alanları sunmaktadır.',
    fullDescriptionEn: 'TechPark Campus is a technology development zone operating in Izmir Bornova. The campus consists of 5 separate buildings and offers specially designed workspaces, laboratories, and shared spaces for startups and technology companies.',
    features: ['5 teknoloji binası', 'Ortak çalışma alanları', 'Araştırma laboratuvarları', 'Veri merkezi', 'Konferans ve etkinlik alanları', 'Kafeterya ve dinlenme alanları'],
    featuresEn: ['5 technology buildings', 'Co-working spaces', 'Research laboratories', 'Data center', 'Conference and event spaces', 'Cafeteria and rest areas'],
    client: 'İzmir Teknoloji Geliştirme A.Ş.',
    clientEn: 'Izmir Technology Development Inc.',
    duration: '2020 - 2023',
    slug: 'techpark-campus',
    gallery: [IMAGES.projectCommercial],
  },
  {
    id: 6,
    title: 'Bosphorus Heights',
    titleEn: 'Bosphorus Heights',
    location: 'İstanbul, Beşiktaş',
    locationEn: 'Istanbul, Besiktas',
    year: '2024',
    category: 'residential',
    image: IMAGES.projectResidential,
    description: 'Prestijli konumda lüks yaşam projesi, özel tasarım daireler.',
    descriptionEn: 'Luxury living project in a prestigious location, custom-designed apartments.',
    area: '35.000 m²',
    status: 'planned',
    fullDescription: 'Bosphorus Heights, İstanbul Beşiktaş\'ın en prestijli lokasyonlarında yükselmesi planlanan lüks konut projesidir. Özel tasarımlı daireler, panoramik manzara ve dünya standartlarında yaşam konforu sunacaktır.',
    fullDescriptionEn: 'Bosphorus Heights is a luxury housing project planned to rise in Istanbul Besiktas\'s most prestigious locations. It will offer custom-designed apartments, panoramic views, and world-class living comfort.',
    features: ['Özel tasarım daireler', 'Panoramik Boğaz manzarası', 'Lobi ve resepsiyon hizmeti', 'Kapıcı daireleri', 'Otopark', 'Peyzaj düzenlemesi'],
    featuresEn: ['Custom-designed apartments', 'Panoramic Bosphorus view', 'Lobby and reception service', 'Concierge apartments', 'Parking', 'Landscaping'],
    client: 'Planlanan Proje',
    clientEn: 'Planned Project',
    duration: '2024 - 2026',
    slug: 'bosphorus-heights',
    gallery: [IMAGES.projectResidential],
  },
  // ===== DEVAM EDEN PROJELER =====
  {
    id: 7,
    title: 'Azure Panorama',
    titleEn: 'Azure Panorama',
    location: 'İstanbul, Bakırköy',
    locationEn: 'Istanbul, Bakirkoy',
    year: '2025',
    category: 'residential',
    image: IMAGES.projectResidential,
    description: 'Deniz manzaralı 36 katlı rezidans, 220 daire, akıllı ev otomasyonu.',
    descriptionEn: '36-story sea-view residence, 220 apartments, smart home automation.',
    area: '52.000 m²',
    status: 'ongoing',
    fullDescription: 'Azure Panorama, İstanbul Bakırköy sahil şeridinde yükselen 36 katlı lüks rezidans projesidir. 220 daireden oluşan proje, Marmara Denizi manzarası, akıllı ev otomasyonu ve sürdürülebilir enerji sistemleriyle donatılmıştır. İki kule şeklinde tasarlanan proje, geniş peyzaj alanları ve sosyal donatılarıyla dikkat çekmektedir.',
    fullDescriptionEn: 'Azure Panorama is a 36-story luxury residence project rising on the Bakirkoy coastline of Istanbul. Consisting of 220 apartments, the project is equipped with Marmara Sea views, smart home automation, and sustainable energy systems. Designed as two towers, the project stands out with its spacious landscaping and social amenities.',
    features: ['36 kat, 220 daire', 'Marmara Denizi manzarası', 'Akıllı ev otomasyonu', 'Kapalı otopark (350 araç)', 'Yüzme havuzu ve spor salonu', 'Çocuk oyun alanları'],
    featuresEn: ['36 floors, 220 apartments', 'Marmara Sea view', 'Smart home automation', 'Indoor parking (350 vehicles)', 'Swimming pool and gym', "Children's playgrounds"],
    client: 'Azure Gayrimenkul',
    clientEn: 'Azure Real Estate',
    duration: '2024 - 2025',
    slug: 'azure-panorama',
    progress: 45,
    gallery: [IMAGES.projectResidential, IMAGES.projectInterior],
  },
  {
    id: 8,
    title: 'Metro Business Hub',
    titleEn: 'Metro Business Hub',
    location: 'Ankara, Çankaya',
    locationEn: 'Ankara, Cankaya',
    year: '2025',
    category: 'commercial',
    image: IMAGES.projectCommercial,
    description: 'Metro ulaşımına entegre karma kullanım merkezi, ofisler ve ticari alanlar.',
    descriptionEn: 'Metro-integrated mixed-use center, offices and commercial spaces.',
    area: '85.000 m²',
    status: 'ongoing',
    fullDescription: "Metro Business Hub, Ankara Çankaya'da metro hattına doğrudan entegre olan karma kullanım projesidir. 3 ofis kulesi ve bir ticari podesterden oluşan proje, yeşil bina sertifikası hedefiyle tasarlanmaktadır. Helikopter pisti, konferans merkezi ve yeraltı otoparkı ile başkentin en kapsamlı iş merkezi olacaktır.",
    fullDescriptionEn: "Metro Business Hub is a mixed-use project directly integrated with the metro line in Ankara Cankaya. Consisting of 3 office towers and a commercial podium, the project is designed with a green building certification target. With a helipad, conference center, and underground parking, it will be the capital's most comprehensive business center.",
    features: ['3 ofis kulesi', 'Metro entegrasyonu', 'Yeşil bina sertifikası', 'Helikopter pisti', 'Konferans merkezi', '2.000 araçlık otopark'],
    featuresEn: ['3 office towers', 'Metro integration', 'Green building certification', 'Helipad', 'Conference center', '2,000-vehicle parking'],
    client: 'Ankara Büyükşehir Belediyesi',
    clientEn: 'Ankara Metropolitan Municipality',
    duration: '2023 - 2025',
    slug: 'metro-business-hub',
    progress: 62,
    gallery: [IMAGES.projectCommercial],
  },
  {
    id: 9,
    title: 'Sakarya Köprüsü',
    titleEn: 'Sakarya Bridge',
    location: 'Sakarya, Adapazarı',
    locationEn: 'Sakarya, Adapazari',
    year: '2025',
    category: 'infrastructure',
    image: IMAGES.projectInfrastructure,
    description: '680 metre uzunluğunda otoyol köprüsü, deprem izolasyonlu taşıyıcı sistem.',
    descriptionEn: '680-meter highway bridge, earthquake-isolated structural system.',
    area: '680 m',
    status: 'ongoing',
    fullDescription: "Sakarya Köprüsü, Kuzey Marmara Otoyolu güzergahında inşa edilen 680 metre uzunluğunda otoyol köprüsüdür. 1. derece deprem bölgesinde yer aldığı için gelişmiş sismik izolasyon sistemi ile donatılmıştır. Köprünün taşıyıcı sistemi, olası 9 şiddetindeki depreme dayanıklı olarak tasarlanmıştır.",
    fullDescriptionEn: "Sakarya Bridge is a 680-meter highway bridge under construction on the Northern Marmara Highway route. Since it is located in a first-degree earthquake zone, it is equipped with an advanced seismic isolation system. The bridge's structural system is designed to withstand a possible magnitude 9 earthquake.",
    features: ['680 metre uzunluk', 'Gelişmiş sismik izolasyon', '9 şiddetinde depreme dayanıklı', 'Çelik kompozit yapı', 'Akıllı yapısal izleme', 'Otomatik aydınlatma sistemi'],
    featuresEn: ['680 meters length', 'Advanced seismic isolation', 'Magnitude 9 earthquake resistant', 'Steel composite structure', 'Smart structural monitoring', 'Automated lighting system'],
    client: 'Karayolları Genel Müdürlüğü',
    clientEn: 'General Directorate of Highways',
    duration: '2023 - 2025',
    slug: 'sakarya-koprusu',
    progress: 35,
    gallery: [IMAGES.projectInfrastructure],
  },
  {
    id: 10,
    title: 'Ege Sunset Resort',
    titleEn: 'Ege Sunset Resort',
    location: 'Muğla, Bodrum',
    locationEn: 'Mugla, Bodrum',
    year: '2026',
    category: 'residential',
    image: IMAGES.projectInterior,
    description: "Bodrum'da butik tatil köyü, 120 villa, özel plaj ve marinaya erişim.",
    descriptionEn: 'Boutique holiday resort in Bodrum, 120 villas, private beach and marina access.',
    area: '95.000 m²',
    status: 'ongoing',
    fullDescription: "Ege Sunset Resort, Muğla Bodrum'da inşa edilen butik tatil köyü projesidir. 120 müstakil villadan oluşan proje, özel plaj erişimi, yat marinası ve 5 yıldızlı otel hizmetleri sunmaktadır. Doğal taş ve ahşap malzemelerin yoğun kullanıldığı proje, Ege mimarisinin modern bir yorumudur.",
    fullDescriptionEn: 'Ege Sunset Resort is a boutique holiday resort project under construction in Mugla Bodrum. Consisting of 120 detached villas, the project offers private beach access, yacht marina, and 5-star hotel services. The project, which makes extensive use of natural stone and wood materials, is a modern interpretation of Aegean architecture.',
    features: ['120 butik villa', 'Özel plaj erişimi', 'Yat marinası', '5 yıldızlı otel hizmeti', 'Doğal taş ve ahşap tasarım', 'Spa ve wellness merkezi'],
    featuresEn: ['120 boutique villas', 'Private beach access', 'Yacht marina', '5-star hotel service', 'Natural stone and wood design', 'Spa and wellness center'],
    client: 'Ege Turizm A.Ş.',
    clientEn: 'Ege Tourism Inc.',
    duration: '2025 - 2026',
    slug: 'ege-sunset-resort',
    progress: 18,
    gallery: [IMAGES.projectInterior, IMAGES.projectResidential],
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    role: 'Yatırımcı',
    roleEn: 'Investor',
    company: 'Yılmaz Holding',
    content: 'Wixtory İnşaat ile çalışmak gerçekten harika bir deneyimdi. Projemizi zamanında ve bütçemizle tamamladılar. Kalite ve profesyonellikleri takdire şayan.',
    contentEn: 'Working with Wixtory İnşaat was truly a great experience. They completed our project on time and within budget. Their quality and professionalism are commendable.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Elif Demir',
    role: 'Proje Yöneticisi',
    roleEn: 'Project Manager',
    company: 'Demir Gayrimenkul',
    content: 'Skyline Residence projemizde Wixtory İnşaat\'nın mühendislik uzmanlığı ve sorun çözme kabiliyeti etkileyiciydi. Her aşamada şeffaf iletişim kurdular.',
    contentEn: 'Wixtory İnşaat\'s engineering expertise and problem-solving ability in our Skyline Residence project was impressive. They maintained transparent communication at every stage.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    role: 'Genel Müdür',
    roleEn: 'General Manager',
    company: 'Kaya İnşaat',
    content: 'Ortak projemizde Wixtory İnşaat ekibinin disiplini ve teknik kapasitesi sayesinde zorlu engelleri kolayca aştık. Kesinlikle tavsiye ediyorum.',
    contentEn: 'Thanks to the discipline and technical capacity of the Wixtory İnşaat team in our joint project, we easily overcame difficult obstacles. I definitely recommend them.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Selin Özkan',
    role: 'Mimar',
    roleEn: 'Architect',
    company: 'Özkan Mimarlık',
    content: 'Wixtory İnşaat, mimari vizyonumuzu mükemmel bir şekilde hayata geçirdi. Detaylara gösterdikleri özen ve kalite anlayışları beni çok etkiledi.',
    contentEn: 'Wixtory İnşaat perfectly brought our architectural vision to life. I was very impressed by their attention to detail and quality approach.',
    rating: 5,
  },
]

export const partnerCompanies = [
  'Yılmaz Holding',
  'Demir Grup',
  'Kaya İnşaat',
  'Özkan Mimarlık',
  'Atlas Gayrimenkul',
]

export const faqItems = [
  {
    question: 'Proje süreci nasıl işliyor?',
    questionEn: 'How does the project process work?',
    answer: 'Proje sürecimiz; ihtiyaç analizi, fizibilite çalışması, mimari tasarım, inşaat ve teslim aşamalarından oluşmaktadır. Her aşamada müşterilerimizle şeffaf iletişim kurarak, projenin istenen kalitede ve sürede tamamlanmasını sağlıyoruz.',
    answerEn: 'Our project process consists of needs analysis, feasibility study, architectural design, construction, and delivery phases. We maintain transparent communication with our clients at every stage, ensuring the project is completed with the desired quality and on time.',
  },
  {
    question: 'Inşaat süresi ne kadar sürer?',
    questionEn: 'How long does construction take?',
    answer: 'İnşaat süresi projenin büyüklüğüne ve türüne göre değişiklik gösterir. Bir konut projesi genellikle 12-24 ay, ticari projeler ise 18-36 ay arasında tamamlanır. Detaylı süre planlamasını proje başlangıcında paylaşıyoruz.',
    answerEn: 'Construction time varies depending on the size and type of the project. A residential project is typically completed in 12-24 months, while commercial projects take 18-36 months. We share detailed scheduling at the project start.',
  },
  {
    question: 'Fiyatlandırma nasıl yapılıyor?',
    questionEn: 'How is pricing determined?',
    answer: 'Fiyatlandırma, projenin kapsamına, kullanılacak malzemelere, lokasyona ve süre boyutuna göre belirlenmektedir. Ücretsiz keşif ve danışmanlık hizmetimizle projeniz için detaylı bir maliyet analizi sunuyoruz.',
    answerEn: 'Pricing is determined based on the project scope, materials to be used, location, and duration. With our free survey and consultation service, we provide a detailed cost analysis for your project.',
  },
  {
    question: 'Garanti kapsamı nedir?',
    questionEn: 'What does the warranty cover?',
    answer: 'Tüm projelerimizde yapısal garanti sunuyoruz. Yapısal elemanlar için 10 yıl, tesisat ve donanımlar için 2 yıl, boyalı yüzeyler için 1 yıl garanti sağlıyoruz. Garanti koşullarını projeye özel olarak detaylandırıyoruz.',
    answerEn: 'We offer structural warranty on all our projects. We provide 10 years for structural elements, 2 years for plumbing and fixtures, and 1 year for painted surfaces. We detail warranty conditions specifically for each project.',
  },
  {
    question: 'Depreme dayanıklı yapılar inşa ediyor musunuz?',
    questionEn: 'Do you build earthquake-resistant structures?',
    answer: 'Evet, tüm yapılarımız Türkiye Deprem Yönetmeliği\'ne uygun olarak tasarlanmakta ve inşa edilmektedir. Deprem bölgelerinde özel sismik tasarım kriterleri uyguluyoruz ve yapısal sağlığı izleme sistemleri kullanıyoruz.',
    answerEn: 'Yes, all our structures are designed and built in accordance with the Turkish Earthquake Code. We apply special seismic design criteria in earthquake zones and use structural health monitoring systems.',
  },
  {
    question: 'Çevre dostu inşaat yöntemleri kullanıyor musunuz?',
    questionEn: 'Do you use eco-friendly construction methods?',
    answer: 'Evet, sürdürülebilir inşaat uygulamalarına büyük önem veriyoruz. Geri dönüştürülebilir malzemeler, enerji verimli sistemler, güneş enerjisi entegrasyonu ve yeşil çatı uygulamaları gibi çevre dostu yöntemleri projelerimizde kullanıyoruz.',
    answerEn: 'Yes, we attach great importance to sustainable construction practices. We use eco-friendly methods such as recyclable materials, energy-efficient systems, solar energy integration, and green roof applications in our projects.',
  },
  {
    question: 'Proje sürecinde nasıl bilgilendirileceğim?',
    questionEn: 'How will I be informed during the project?',
    answer: 'Her projeye özel bir proje yöneticisi atanmaktadır. Haftalık ilerleme raporları, düzenli toplantılar ve dijital proje takip platformumuz üzerinden süreci şeffaf bir şekilde paylaşarak bilgilendirme yapıyoruz.',
    answerEn: 'A dedicated project manager is assigned to each project. We provide information by sharing the process transparently through weekly progress reports, regular meetings, and our digital project tracking platform.',
  },
  {
    question: 'Tadilat ve restorasyon projeleri yapıyor musunuz?',
    questionEn: 'Do you do renovation and restoration projects?',
    answer: 'Evet, tarihi yapıların restorasyonu ve mevcut yapıların modern tadilatını gerçekleştiriyoruz. Kültürel mirasa saygılı restorasyon çalışmaları, yapı güçlendirme ve modern dönüşüm projeleri uzmanlık alanlarımız arasındadır.',
    answerEn: 'Yes, we carry out careful restoration of historical buildings and modern renovation of existing structures. Culturally respectful restoration work, structural strengthening, and modern transformation projects are among our areas of expertise.',
  },
]

export function getCompletedProjects(): Project[] {
  return projects.filter(p => p.status === 'completed')
}

export function getOngoingProjects(): Project[] {
  return projects.filter(p => p.status === 'ongoing')
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export type NewsCategory = 'corporate' | 'project' | 'sector'

export interface NewsItem {
  id: number
  title: string
  titleEn: string
  summary: string
  summaryEn: string
  content: string
  contentEn: string
  date: string
  category: NewsCategory
  image: string
  slug: string
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Azure Panorama Projesinde Çelik Konstrüksiyon Aşaması Tamamlandı',
    titleEn: 'Steel Construction Phase Completed in Azure Panorama Project',
    summary: 'Bakırköy\'de inşaatı devam eden Azure Panorama projesinde çelik konstrüksiyon aşaması başarıyla tamamlandı.',
    summaryEn: 'The steel construction phase has been successfully completed in the Azure Panorama project under construction in Bakirkoy.',
    content: 'Wixtory İnşaat\'ın İstanbul Bakırköy\'de inşa ettiği Azure Panorama projesinde önemli bir milesta daha geride kaldı. 36 katlı lüks rezidans projesinin çelik konstrüksiyon aşaması planlanan sürede ve bütçede tamamlandı. Proje genel ilerlemesi %45\'e ulaştı.\n\nProje kapsamında 220 daire, kapalı otopark, yüzme havuzu ve spor salonu bulunacak. Bir sonraki aşamada cephe kaplama ve mekanik tesisat işlerine başlanması planlanıyor.',
    contentEn: 'An important milestone has been reached in the Azure Panorama project being built by Wixtory İnşaat in Istanbul Bakirkoy. The steel construction phase of the 36-story luxury residence project was completed on schedule and within budget. The overall project progress has reached 45%.\n\nThe project will include 220 apartments, indoor parking, swimming pool, and gym. The next phase will begin with facade cladding and mechanical installation work.',
    date: '2025-02-15',
    category: 'project',
    image: IMAGES.projectResidential,
    slug: 'azure-panorama-celik-konstruksiyon-tamamlandi',
  },
  {
    id: 2,
    title: 'Wixtory İnşaat, ISO 45001 Sertifikasını Aldı',
    titleEn: 'Wixtory İnşaat Receives ISO 45001 Certification',
    summary: 'İş sağlığı ve güvenliği yönetim sistemimizi belgelendirdik. Tüm şantiyelerimizde ISG standartlarını yükseltiyoruz.',
    summaryEn: 'We have certified our occupational health and safety management system. We are raising OHS standards across all our construction sites.',
    content: 'Wixtory İnşaat, iş sağlığı ve güvenliği alanındaki taahhüdünü bir adım ileriye taşıyarak ISO 45001:2018 sertifikasını almaya hak kazandı. Bu sertifika, tüm şantiyelerimizde iş sağlığı ve güvenliği standartlarını en üst düzeyde tuttuğumuzun uluslararası bir onayıdır.\n\nSertifikasyon sürecinde tüm departmanlarımız aktif rol aldı ve 2 yıllık bir hazırlık döneminin ardından denetimler başarıyla tamamlandı. Çalışanlarımızın güvenliği her zaman önceliğimizdir.',
    contentEn: 'Wixtory İnşaat has earned the ISO 45001:2018 certification, taking its commitment to occupational health and safety one step further. This certification is an international endorsement that we maintain the highest OHS standards across all our construction sites.\n\nAll our departments played an active role in the certification process, and audits were successfully completed after a 2-year preparation period. The safety of our employees is always our priority.',
    date: '2025-01-20',
    category: 'corporate',
    image: IMAGES.projectCommercial,
    slug: 'wixtory-iso-45001-sertifikasi-aldi',
  },
  {
    id: 3,
    title: 'Türkiye İnşaat Sektörü 2025\'te Büyüme Bekleniyor',
    titleEn: 'Turkish Construction Sector Expected to Grow in 2025',
    summary: 'Sektör raporlarına göre 2025 yılında inşaat sektörü %8-10 büyüme kaydetmesi öngörülüyor.',
    summaryEn: 'According to industry reports, the construction sector is forecast to grow 8-10% in 2025.',
    content: 'Türkiye İnşaat Sanayicileri Derneği\'nin son raporuna göre, 2025 yılında inşaat sektöründe kayda değer bir büyüme bekleniyor. Altyapı yatırımları ve konut talebindeki artış, sektörü canlandıran ana faktörler arasında yer alıyor.\n\nWixtory İnşaat olarak, sektördeki bu olumlu gelişmeleri değerlendirerek yeni projeler planlıyor ve yatırımlarımıza devam ediyoruz. Sürdürülebilir inşaat uygulamalarına olan ilginin artması, yeşil bina sertifikalı projelerimizin sayısını artırmamıza vesile oluyor.',
    contentEn: 'According to the latest report from the Turkish Construction Industry Association, significant growth is expected in the construction sector in 2025. Infrastructure investments and increasing housing demand are among the main factors driving the sector.\n\nAs Wixtory İnşaat, we are evaluating these positive developments in the sector, planning new projects and continuing our investments. The growing interest in sustainable construction practices is leading us to increase the number of our green building certified projects.',
    date: '2025-02-01',
    category: 'sector',
    image: IMAGES.projectInfrastructure,
    slug: 'turkiye-insaat-sektoru-2025-buyume-beklentisi',
  },
  {
    id: 4,
    title: 'Metro Business Hub Projesi %62 Tamamlandı',
    titleEn: 'Metro Business Hub Project Reaches 62% Completion',
    summary: 'Ankara\'nın en büyük karma kullanım projesinde kaba inşaat aşaması tamamlandı.',
    summaryEn: 'Rough construction phase completed in Ankara\'s largest mixed-use project.',
    content: 'Ankara Çankaya\'da inşaatı devam eden Metro Business Hub projesi %62 tamamlandı. 3 ofis kulesi ve bir ticari podesterden oluşan projede kaba inşaat aşaması başarıyla tamamlandı.\n\nProje, metro hattına doğrudan entegrasyonuyla dikkat çekiyor. Yeşil bina sertifikası hedefiyle tasarlanan Metro Business Hub, tamamlandığında başkentin en kapsamlı iş merkezi olacak. 2025 sonunda teslim edilmesi planlanıyor.',
    contentEn: 'The Metro Business Hub project under construction in Ankara Cankaya has reached 62% completion. The rough construction phase has been successfully completed in the project consisting of 3 office towers and a commercial podium.\n\nThe project stands out with its direct integration with the metro line. Designed with a green building certification target, Metro Business Hub will be the capital\'s most comprehensive business center when completed. Delivery is planned for the end of 2025.',
    date: '2025-02-10',
    category: 'project',
    image: IMAGES.projectCommercial,
    slug: 'metro-business-hub-yuzde-62-tamamlandi',
  },
  {
    id: 5,
    title: 'Wixtory İnşaat Yılın En İyi İşveren Ödülü\'ne Aday',
    titleEn: 'Wixtory İnşaat Nominated for Employer of the Year Award',
    summary: 'İnsan kaynakları uygulamalarımız ve çalışan memnuniyeti politikalarımızla ödüle aday gösterildik.',
    summaryEn: 'We have been nominated for the award with our HR practices and employee satisfaction policies.',
    content: 'Wixtory İnşaat, insan kaynakları uygulamaları ve çalışan memnuniyeti politikalarıyla "Yılın En İyi İşveren" ödülüne aday gösterildi. Adaylık sürecinde çalışan memnuniyeti anketleri, iş sağlığı ve güvenliği uygulamaları ve kariyer geliştirme programlarımız değerlendirildi.\n\n10.000\'i aşkın çalışanımızla büyümeye devam ederken, insan odaklı yaklaşımımızı korumak en büyük gurur kaynağımızdır.',
    contentEn: 'Wixtory İnşaat has been nominated for the "Employer of the Year" award for its human resources practices and employee satisfaction policies. During the nomination process, our employee satisfaction surveys, occupational health and safety practices, and career development programs were evaluated.\n\nContinuing to grow with over 10,000 employees, maintaining our people-focused approach is our greatest source of pride.',
    date: '2025-01-28',
    category: 'corporate',
    image: IMAGES.aboutTeam,
    slug: 'wixtory-yilin-en-iyi-isveren-odulune-aday',
  },
]

export function getNewsByCategory(category: NewsCategory | 'all'): NewsItem[] {
  if (category === 'all') return newsItems
  return newsItems.filter(n => n.category === category)
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsItems.find(n => n.slug === slug)
}

export type AnnouncementCategory = 'general' | 'tender' | 'event' | 'career'

export interface AnnouncementItem {
  id: number; title: string; titleEn: string; summary: string; summaryEn: string;
  content: string; contentEn: string; date: string; category: AnnouncementCategory; image: string; slug: string;
}

export const announcementItems: AnnouncementItem[] = [
  { id: 1, title: '2025 Yılı İhale Takvimi Açıklandı', titleEn: '2025 Procurement Calendar Announced', summary: 'Wixtory İnşaat 2025 yılı ihale takvimini yayımladı. Tüm tedarikçilerimize duyurulur.', summaryEn: 'Wixtory İnşaat has published its 2025 procurement calendar. All suppliers are hereby notified.', content: 'Wixtory İnşaat, 2025 yılı boyunca gerçekleştireceği ihalelerin takvimini resmi olarak yayımlamıştır. Takvim; malzeme tedariki, alt yüklenıcı hizmetleri ve danışmanlık ihalelerini kapsamaktadır.\n\nİhalelere katılım şartları ve detaylı bilgi için ihaleler@wixtory.com adresine başvurabilirsiniz.', contentEn: 'Wixtory İnşaat has officially published the calendar for its 2025 procurements. The calendar covers material supply, subcontractor services, and consultancy tenders.\n\nFor participation conditions and detailed information, you can apply to ihaleler@wixtory.com.', date: '2025-03-01', category: 'tender', image: IMAGES.projectCommercial, slug: '2025-ihale-takvimi-aciklandi' },
  { id: 2, title: 'Wixtory İnşaat Kariyer Günleri Başlıyor', titleEn: 'Wixtory İnşaat Career Days Are Starting', summary: 'Üniversite mezunu mühendis ve mimar adayları için kariyer günleri düzenlenecektir.', summaryEn: 'Career days will be organized for university graduate engineer and architect candidates.', content: 'Wixtory İnşaat, üniversitelerle iş birliği içinde genç mühendis ve mimar adaylarına yönelik kariyer günleri düzenlemektedir. İstanbul, Ankara ve İzmir\'de gerçekleşecek etkinliklerde, şirketimizde staj ve iş imkânları hakkında bilgi verilecektir.\n\nBaşvurular kariyer@wixtory.com adresinden yapılabilmektedir.', contentEn: 'Wixtory İnşaat organizes career days in collaboration with universities for young engineer and architect candidates. At the events to be held in Istanbul, Ankara, and Izmir, information about internship and job opportunities will be provided.\n\nApplications can be made via kariyer@wixtory.com.', date: '2025-02-20', category: 'career', image: IMAGES.aboutTeam, slug: 'wixtory-kariyer-gunleri-basliyor' },
  { id: 3, title: 'Yeni Ofis Açılış Töreni — 15 Mart 2025', titleEn: 'New Office Opening Ceremony — March 15, 2025', summary: 'Ankara Çankaya\'daki yeni bölge müdürlüğümüzün açılış törenine davetlisiniz.', summaryEn: 'You are invited to the opening ceremony of our new regional office in Ankara Cankaya.', content: 'Wixtory İnşaat, Ankara Çankaya\'da hizmete girecek yeni bölge müdürlüğünün açılış törenini 15 Mart 2025 Cumartesi günü gerçekleştirecektir.\n\nTörene tüm iş ortaklarımız, tedarikçilerimiz ve değerli konuklarımız davetlidir.', contentEn: 'Wixtory İnşaat will hold the opening ceremony of its new regional office in Ankara Cankaya on Saturday, March 15, 2025.\n\nAll our business partners, suppliers, and valued guests are invited to the ceremony.', date: '2025-03-15', category: 'event', image: IMAGES.projectCommercial, slug: 'yeni-ofis-acilis-toreni-15-mart' },
  { id: 4, title: 'İş Sağlığı ve Güvenliği Haftası Etkinlikleri', titleEn: 'Occupational Health and Safety Week Events', summary: '4-10 Mayıs İSG Haftası kapsamında tüm şantiyelerimizde bilinçlendirme etkinlikleri düzenlenecektir.', summaryEn: 'Awareness events will be organized at all our construction sites during OHS Week, May 4-10.', content: 'Wixtory İnşaat, 4-10 Mayıs İş Sağlığı ve Güvenliği Haftası kapsamında tüm şantiyelerinde bilinçlendirme etkinlikleri, eğitim seminerleri ve ilk yardım uygulamaları düzenlemektedir.\n\nİSG konusundaki taahhüdümüz, ISO 45001 sertifikamızla belgelenmiştir.', contentEn: 'Wixtory İnşaat organizes awareness events, training seminars, and first aid practices at all its construction sites during OHS Week, May 4-10.\n\nOur commitment to OHS is documented with our ISO 45001 certification.', date: '2025-05-04', category: 'event', image: IMAGES.projectInfrastructure, slug: 'isg-haftasi-etkinlikleri' },
  { id: 5, title: 'Kıdemli Proje Yöneticisi Aranıyor', titleEn: 'Senior Project Manager Wanted', summary: 'En az 10 yıl deneyimli kıdemli proje yöneticisi pozisyonumuz için başvurular başlamıştır.', summaryEn: 'Applications have started for our senior project manager position.', content: 'Wixtory İnşaat, büyük ölçekli inşaat projelerinde görev alacak kıdemli proje yöneticisi aramaktadır. En az 10 yıl deneyim, PMP sertifikası ve MS Project/Primavera bilgisi gereklidir.\n\nAdaylar kariyer@wixtory.com adresine başvurabilir.', contentEn: 'Wixtory İnşaat is seeking a senior project manager. At least 10 years of experience, PMP certification, and MS Project/Primavera knowledge are required.\n\nCandidates can apply to kariyer@wixtory.com.', date: '2025-02-10', category: 'career', image: IMAGES.aboutTeam, slug: 'kidemli-proje-yoneticisi-araniyor' },
  { id: 6, title: 'Yeşil Bina Sertifikasyon Süreci Hakkında Bilgilendirme', titleEn: 'Green Building Certification Process Information', summary: 'LEED ve BREEAM sertifikasyon süreçlerimiz hakkında güncel bilgilendirme.', summaryEn: 'Current information about our LEED and BREEAM certification processes.', content: 'Wixtory İnşaat, sürdürülebilirlik hedefleri doğrultusunda tüm yeni projelerinde LEED ve BREEAM sertifikasyon süreçlerini yürütmektedir. 2025 yılı itibarıyla 3 projemiz LEED Gold, 2 projemiz BREEAM Very Good seviyesinde sertifikalandırılmıştır.', contentEn: 'Wixtory İnşaat carries out LEED and BREEAM certification processes in all its new projects. As of 2025, 3 projects have been LEED Gold certified and 2 projects BREEAM Very Good certified.', date: '2025-01-15', category: 'general', image: IMAGES.projectInterior, slug: 'yesil-bina-sertifikasyonu-bilgilendirme' },
]

export function getAnnouncementsByCategory(category: AnnouncementCategory | 'all'): AnnouncementItem[] {
  return category === 'all' ? announcementItems : announcementItems.filter(a => a.category === category)
}
export function getAnnouncementBySlug(slug: string): AnnouncementItem | undefined {
  return announcementItems.find(a => a.slug === slug)
}

export type JobType = 'fulltime' | 'parttime' | 'contract'
export type JobDepartment = 'engineering' | 'architecture' | 'management' | 'safety' | 'finance' | 'it'

export interface JobListing {
  id: number; title: string; titleEn: string; department: JobDepartment; departmentLabel: string; departmentLabelEn: string;
  location: string; locationEn: string; type: JobType; typeLabel: string; typeLabelEn: string;
  experience: string; experienceEn: string; salary: string; salaryEn: string;
  description: string; descriptionEn: string; requirements: string[]; requirementsEn: string[];
  benefits: string[]; benefitsEn: string[]; date: string; slug: string; isActive: boolean;
}

export const jobListings: JobListing[] = [
  {
    id: 1, title: 'Kıdemli Proje Yöneticisi', titleEn: 'Senior Project Manager',
    department: 'management', departmentLabel: 'Proje Yönetimi', departmentLabelEn: 'Project Management',
    location: 'İstanbul, Levent', locationEn: 'Istanbul, Levent',
    type: 'fulltime', typeLabel: 'Tam Zamanlı', typeLabelEn: 'Full-time',
    experience: '10+ yıl', experienceEn: '10+ years', salary: '80.000 - 120.000 TL', salaryEn: '80,000 - 120,000 TRY',
    description: 'Büyük ölçekli inşaat projelerinin planlanması, koordinasyonu ve takibinden sorumlu olacaksınız. En az 10 yıl deneyim, PMP sertifikası ve MS Project/Primavera bilgisi gereklidir. Metro Business Hub ve Azure Panorama gibi projelerimizde görev alacaksınız.',
    descriptionEn: 'You will be responsible for planning, coordination, and tracking of large-scale construction projects. At least 10 years of experience, PMP certification, and MS Project/Primavera knowledge are required. You will work on projects such as Metro Business Hub and Azure Panorama.',
    requirements: ['İnşaat mühendisliği veya ilgili bölüm lisans mezunu', 'En az 10 yıl proje yönetimi deneyimi', 'PMP sertifikası', 'MS Project ve Primavera bilgisi', 'İleri düzey İngilizce', 'B sınıfı iş güvenliği belgesi'],
    requirementsEn: ['Bachelor\'s degree in Civil Engineering or related field', 'At least 10 years of project management experience', 'PMP certification', 'MS Project and Primavera knowledge', 'Advanced English', 'Class B OHS certificate'],
    benefits: ['Özel sağlık sigortası', 'Yemek kartı', 'Servis', 'Performans bonusu', 'Eğitim desteği', 'Yıl sonu ikramiyesi'],
    benefitsEn: ['Private health insurance', 'Meal card', 'Company shuttle', 'Performance bonus', 'Training support', 'Year-end bonus'],
    date: '2025-02-10', slug: 'kidemli-proje-yoneticisi', isActive: true,
  },
  {
    id: 2, title: 'İnşaat Mühendisi', titleEn: 'Civil Engineer',
    department: 'engineering', departmentLabel: 'Mühendislik', departmentLabelEn: 'Engineering',
    location: 'Ankara, Çankaya', locationEn: 'Ankara, Cankaya',
    type: 'fulltime', typeLabel: 'Tam Zamanlı', typeLabelEn: 'Full-time',
    experience: '5+ yıl', experienceEn: '5+ years', salary: '55.000 - 80.000 TL', salaryEn: '55,000 - 80,000 TRY',
    description: 'Şantiye şefliği pozisyonunda çalışacak, inşaat sahasındaki tüm üretim faaliyetlerinden sorumlu olacak inşaat mühendisi aranmaktadır. Metro Business Hub projesinde görev alacaksınız.',
    descriptionEn: 'We are looking for a civil engineer to work as a site supervisor, responsible for all production activities on the construction site. You will work on the Metro Business Hub project.',
    requirements: ['İnşaat mühendisliği lisans mezunu', 'En az 5 yıl şantiye deneyimi', 'AutoCAD ve BIM bilgisi', 'İSG sertifikası', 'Orta düzey İngilizce', 'Ehliyet (B sınıfı)'],
    requirementsEn: ['Bachelor\'s degree in Civil Engineering', 'At least 5 years of site experience', 'AutoCAD and BIM knowledge', 'OHS certificate', 'Intermediate English', 'Driver\'s license (Class B)'],
    benefits: ['Özel sağlık sigortası', 'Yemek kartı', 'Servis', 'Eğitim desteği'],
    benefitsEn: ['Private health insurance', 'Meal card', 'Company shuttle', 'Training support'],
    date: '2025-02-15', slug: 'insaat-muhendisi', isActive: true,
  },
  {
    id: 3, title: 'Mimar', titleEn: 'Architect',
    department: 'architecture', departmentLabel: 'Mimarlık', departmentLabelEn: 'Architecture',
    location: 'İstanbul, Kadıköy', locationEn: 'Istanbul, Kadikoy',
    type: 'fulltime', typeLabel: 'Tam Zamanlı', typeLabelEn: 'Full-time',
    experience: '3+ yıl', experienceEn: '3+ years', salary: '50.000 - 70.000 TL', salaryEn: '50,000 - 70,000 TRY',
    description: 'Tasarım ve uygulama süreçlerinde görev alacak mimar aranmaktadır. Revit, AutoCAD ve SketchUp programlarına hakim, modern mimari trendleri takip eden adaylar tercih edilecektir.',
    descriptionEn: 'We are looking for an architect to take part in design and implementation processes. Candidates proficient in Revit, AutoCAD, and SketchUp who follow modern architectural trends will be preferred.',
    requirements: ['Mimarlık lisans mezunu', 'En az 3 yıl deneyim', 'Revit ve AutoCAD bilgisi', 'SketchUp ve Lumion bilgisi', 'Portfolyo sunumu', 'İleri düzey İngilizce'],
    requirementsEn: ['Bachelor\'s degree in Architecture', 'At least 3 years of experience', 'Revit and AutoCAD knowledge', 'SketchUp and Lumion knowledge', 'Portfolio presentation', 'Advanced English'],
    benefits: ['Özel sağlık sigortası', 'Yemek kartı', 'Esnek çalışma saatleri', 'Eğitim desteği'],
    benefitsEn: ['Private health insurance', 'Meal card', 'Flexible working hours', 'Training support'],
    date: '2025-02-20', slug: 'mimar', isActive: true,
  },
  {
    id: 4, title: 'İş Güvenliği Uzmanı', titleEn: 'Occupational Safety Specialist',
    department: 'safety', departmentLabel: 'İSG', departmentLabelEn: 'OHS',
    location: 'İstanbul, Bakırköy', locationEn: 'Istanbul, Bakirkoy',
    type: 'fulltime', typeLabel: 'Tam Zamanlı', typeLabelEn: 'Full-time',
    experience: '5+ yıl', experienceEn: '5+ years', salary: '50.000 - 70.000 TL', salaryEn: '50,000 - 70,000 TRY',
    description: 'Tüm şantiyelerimizde iş sağlığı ve güvenliği süreçlerini yönetecek, denetimler yapacak ve İSG eğitimlerini düzenleyecek uzman aranmaktadır. ISO 45001 sistemine hakim olmalıdır.',
    descriptionEn: 'We are looking for a specialist to manage OHS processes, conduct audits, and organize OHS training at all our construction sites. Must be proficient in ISO 45001 system.',
    requirements: ['İSG uzmanlığı sertifikası (A sınıfı)', 'En az 5 yıl şantiye İSG deneyimi', 'ISO 45001 bilgisi', 'Risk analizi yapabilme', 'İleri düzey İngilizce', 'Ehliyet (B sınıfı)'],
    requirementsEn: ['OHS specialist certificate (Class A)', 'At least 5 years of site OHS experience', 'ISO 45001 knowledge', 'Risk analysis capability', 'Advanced English', 'Driver\'s license (Class B)'],
    benefits: ['Özel sağlık sigortası', 'Yemek kartı', 'Servis', 'Performans bonusu'],
    benefitsEn: ['Private health insurance', 'Meal card', 'Company shuttle', 'Performance bonus'],
    date: '2025-01-25', slug: 'is-guvenligi-uzmani', isActive: true,
  },
  {
    id: 5, title: 'Muhasebe Uzmanı', titleEn: 'Accounting Specialist',
    department: 'finance', departmentLabel: 'Finans', departmentLabelEn: 'Finance',
    location: 'İstanbul, Levent', locationEn: 'Istanbul, Levent',
    type: 'fulltime', typeLabel: 'Tam Zamanlı', typeLabelEn: 'Full-time',
    experience: '3+ yıl', experienceEn: '3+ years', salary: '45.000 - 65.000 TL', salaryEn: '45,000 - 65,000 TRY',
    description: 'Şirket muhasebe süreçlerinin yürütülmesi, mali tabloların hazırlanması, vergi bildirimlerinin yapılması ve bütçe takibinden sorumlu muhasebe uzmanı aranmaktadır.',
    descriptionEn: 'We are looking for an accounting specialist responsible for managing company accounting processes, preparing financial statements, filing tax returns, and budget tracking.',
    requirements: ['İlgili bölüm lisans mezunu', 'En az 3 yıl muhasebe deneyimi', 'SAP veya ERP bilgisi', 'MS Excel ileri düzey', 'Vergi mevzuatı bilgisi', 'İngilizce tercih sebebidir'],
    requirementsEn: ['Bachelor\'s degree in related field', 'At least 3 years of accounting experience', 'SAP or ERP knowledge', 'Advanced MS Excel', 'Tax legislation knowledge', 'English is preferred'],
    benefits: ['Özel sağlık sigortası', 'Yemek kartı', 'Esnek çalışma saatleri'],
    benefitsEn: ['Private health insurance', 'Meal card', 'Flexible working hours'],
    date: '2025-02-05', slug: 'muhasebe-uzmani', isActive: true,
  },
  {
    id: 6, title: 'BIM Mühendisi', titleEn: 'BIM Engineer',
    department: 'it', departmentLabel: 'Bilişim', departmentLabelEn: 'IT',
    location: 'İstanbul, Levent', locationEn: 'Istanbul, Levent',
    type: 'contract', typeLabel: 'Sözleşmeli', typeLabelEn: 'Contract',
    experience: '2+ yıl', experienceEn: '2+ years', salary: '55.000 - 75.000 TL', salaryEn: '55,000 - 75,000 TRY',
    description: 'BIM modelleme süreçlerinin yönetilmesi, 3D model oluşturulması, çakışma tespiti ve koordinasyon toplantılarının yürütülmesinden sorumlu BIM mühendisi aranmaktadır.',
    descriptionEn: 'We are looking for a BIM engineer responsible for managing BIM modeling processes, creating 3D models, clash detection, and conducting coordination meetings.',
    requirements: ['İnşaat mühendisliği veya mimarlık mezunu', 'En az 2 yıl BIM deneyimi', 'Revit ve Navisworks bilgisi', 'IFC formatı bilgisi', 'Orta düzey İngilizce'],
    requirementsEn: ['Bachelor\'s in Civil Engineering or Architecture', 'At least 2 years of BIM experience', 'Revit and Navisworks knowledge', 'IFC format knowledge', 'Intermediate English'],
    benefits: ['Özel sağlık sigortası', 'Yemek kartı', 'Eğitim desteği'],
    benefitsEn: ['Private health insurance', 'Meal card', 'Training support'],
    date: '2025-02-18', slug: 'bim-muhendisi', isActive: true,
  },
]

export function getActiveJobs(): JobListing[] {
  return jobListings.filter(j => j.isActive)
}
export function getJobBySlug(slug: string): JobListing | undefined {
  return jobListings.find(j => j.slug === slug)
}
