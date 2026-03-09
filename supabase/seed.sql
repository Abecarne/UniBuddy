-- ============================================
-- UniBuddy PoC - Seed Data
-- Run this AFTER schema.sql and rls.sql
-- ============================================

-- ============================================
-- ANNOUNCEMENTS (English)
-- ============================================

insert into content_items (type, status, title, slug, summary, body, category, audience, campus_code, language_code, translation_group_id, event_date, is_featured) values

('announcement', 'published',
 'Campus Festival This Week',
 'campus-festival-this-week',
 'Join us for the annual Keimyung campus festival with music, food, and cultural performances.',
 'The annual Keimyung University campus festival takes place this week from Monday to Friday.

Schedule:
- Monday: Opening ceremony and club booths
- Tuesday: International food fair
- Wednesday: K-pop dance competition
- Thursday: Cultural exchange night
- Friday: Closing concert

All students are welcome. The festival area is located at the central plaza near the library.

Wear comfortable shoes and bring your student ID for free food vouchers!',
 'clubs', 'all', 'keimyung', 'en', 'a1000000-0000-0000-0000-000000000001', now() + interval '2 days', true),

('announcement', 'published',
 'Club Fair Registration Open',
 'club-fair-registration',
 'Register your club or sign up to explore student organizations at the spring club fair.',
 'The Spring Club Fair is now open for registration!

If you are a club leader:
- Register your booth at the Student Affairs office (Building 5, Room 201)
- Deadline: this Friday
- Each club gets one table and two chairs

If you are a student looking to join a club:
- Visit the central plaza on March 20
- Over 50 clubs will be present
- Sports, arts, volunteering, languages, tech, and more!

Joining a club is one of the best ways to make friends and improve your Korean.',
 'clubs', 'all', 'keimyung', 'en', 'a1000000-0000-0000-0000-000000000002', now() + interval '5 days', true),

('announcement', 'published',
 'Library Opening Hours Changed',
 'library-hours-changed',
 'The main library has updated its opening hours for the spring semester.',
 'Starting this week, the Dongsan Library will operate on the following schedule:

Monday to Friday: 8:00 AM - 10:00 PM
Saturday: 9:00 AM - 6:00 PM
Sunday: Closed

The 24-hour reading room on the 3rd floor remains open every day.

Please note:
- Student ID required for entry after 6 PM
- Group study rooms can be booked online via the library website
- Printing services are available on the 1st floor',
 'campus', 'all', 'keimyung', 'en', 'a1000000-0000-0000-0000-000000000003', null, false),

('announcement', 'published',
 'Dormitory Quiet Hours Reminder',
 'dormitory-quiet-hours',
 'A reminder about dormitory quiet hours and community rules.',
 'Dear dormitory residents,

This is a friendly reminder about quiet hours:

Quiet hours: 10:00 PM - 7:00 AM (weekdays), 11:00 PM - 8:00 AM (weekends)

During quiet hours:
- Keep music and TV volume low
- Avoid loud conversations in hallways
- Use headphones for video calls

Repeated violations may result in a warning from the dormitory office.

If you have concerns about noise, contact the RA on your floor first. For persistent issues, visit the Dormitory Office (Building D1, Ground Floor).

Thank you for being considerate neighbors!',
 'campus', 'all', 'keimyung', 'en', 'a1000000-0000-0000-0000-000000000004', null, false);

-- ============================================
-- ANNOUNCEMENTS (French)
-- ============================================

insert into content_items (type, status, title, slug, summary, body, category, audience, campus_code, language_code, translation_group_id, event_date, is_featured) values

('announcement', 'published',
 'Festival du campus cette semaine',
 'campus-festival-cette-semaine',
 'Rejoignez-nous pour le festival annuel du campus de Keimyung avec musique, cuisine et spectacles culturels.',
 'Le festival annuel de l''Universite Keimyung a lieu cette semaine du lundi au vendredi.

Programme :
- Lundi : Ceremonie d''ouverture et stands des clubs
- Mardi : Foire alimentaire internationale
- Mercredi : Concours de danse K-pop
- Jeudi : Soiree d''echange culturel
- Vendredi : Concert de cloture

Tous les etudiants sont les bienvenus. Le festival se deroule sur la place centrale pres de la bibliotheque.

Portez des chaussures confortables et apportez votre carte etudiante pour des bons de nourriture gratuits !',
 'clubs', 'all', 'keimyung', 'fr', 'a1000000-0000-0000-0000-000000000001', now() + interval '2 days', true),

('announcement', 'published',
 'Inscription au salon des clubs ouverte',
 'inscription-salon-clubs',
 'Inscrivez votre club ou venez decouvrir les organisations etudiantes lors du salon de printemps.',
 'Le salon des clubs de printemps est ouvert aux inscriptions !

Si vous etes responsable d''un club :
- Inscrivez votre stand au bureau des affaires etudiantes (Batiment 5, Salle 201)
- Date limite : ce vendredi
- Chaque club recoit une table et deux chaises

Si vous cherchez a rejoindre un club :
- Rendez-vous sur la place centrale le 20 mars
- Plus de 50 clubs seront presents
- Sports, arts, benevolat, langues, technologie et plus !

Rejoindre un club est l''un des meilleurs moyens de se faire des amis et d''ameliorer votre coreen.',
 'clubs', 'all', 'keimyung', 'fr', 'a1000000-0000-0000-0000-000000000002', now() + interval '5 days', true);

-- ============================================
-- ANNOUNCEMENTS (Korean)
-- ============================================

insert into content_items (type, status, title, slug, summary, body, category, audience, campus_code, language_code, translation_group_id, event_date, is_featured) values

('announcement', 'published',
 '이번 주 캠퍼스 축제',
 'campus-festival-korean',
 '음악, 음식, 문화 공연이 함께하는 계명대학교 연례 캠퍼스 축제에 참여하세요.',
 '계명대학교 연례 캠퍼스 축제가 이번 주 월요일부터 금요일까지 진행됩니다.

일정:
- 월요일: 개막식 및 동아리 부스
- 화요일: 세계 음식 박람회
- 수요일: K-pop 댄스 대회
- 목요일: 문화 교류의 밤
- 금요일: 폐막 콘서트

모든 학생을 환영합니다. 축제 장소는 도서관 근처 중앙 광장입니다.

편한 신발을 신고 무료 음식 쿠폰을 받으려면 학생증을 가져오세요!',
 'clubs', 'all', 'keimyung', 'ko', 'a1000000-0000-0000-0000-000000000001', now() + interval '2 days', true);

-- ============================================
-- GUIDES (English)
-- ============================================

insert into content_items (type, status, title, slug, summary, body, category, subcategory, audience, campus_code, language_code, translation_group_id, is_featured) values

('guide', 'published',
 'How to Open a Bank Account in Korea',
 'open-bank-account-korea',
 'Step-by-step guide to opening your first Korean bank account as an international student.',
 'Opening a bank account is one of the first things you should do when arriving in Korea.

Step 1: Choose a bank
The most foreigner-friendly banks near campus are:
- KEB Hana Bank (recommended, has English services)
- Woori Bank
- KB Kookmin Bank

Step 2: Documents you need
- Passport
- Alien Registration Card (ARC) - you can open a basic account without it but will have limitations
- Phone number (Korean)
- Proof of enrollment from university

Step 3: Visit the bank
- Go to a branch near campus (ask at the international office for the nearest one)
- Tell the staff you want to open a student account
- Some branches have English-speaking staff

Step 4: Set up mobile banking
- Download the bank app
- The staff will help you register
- You can use it for transfers, payments, and checking your balance

Tips:
- Bring a Korean-speaking friend if possible
- KEB Hana Bank app has English language support
- You will receive a debit card (check card) on the spot
- You need your ARC for full account features',
 'banking', 'opening', 'new', 'keimyung', 'en', 'b1000000-0000-0000-0000-000000000001', true),

('guide', 'published',
 'How to Get to the International Office',
 'international-office-directions',
 'Find the International Office at Keimyung University and learn about the services they offer.',
 'The International Office is your main contact for administrative support.

Location: Building 5 (Administration Building), 2nd Floor, Room 204

How to get there:
1. Enter campus through the main gate
2. Walk straight past the central plaza
3. The Administration Building is the large grey building on your left
4. Take the elevator or stairs to the 2nd floor
5. Turn right, Room 204 is at the end of the hallway

Office hours:
Monday to Friday: 9:00 AM - 5:00 PM
Lunch break: 12:00 PM - 1:00 PM

Services they provide:
- Visa extension support
- Enrollment verification letters
- ARC application assistance
- Housing information
- General questions about campus life

Contact: international@kmu.ac.kr

Tip: Arrive early as wait times can be long during the start of semester.',
 'campus', 'offices', 'all', 'keimyung', 'en', 'b1000000-0000-0000-0000-000000000002', false),

('guide', 'published',
 'How to Connect to Campus Wi-Fi',
 'campus-wifi-setup',
 'Connect your phone and laptop to Keimyung University Wi-Fi in a few easy steps.',
 'Step 1: Find the network
Look for the Wi-Fi network called "KMU-WiFi" or "KMU-Student"

Step 2: Open the login page
- A login page should appear automatically
- If not, open your browser and go to any website

Step 3: Enter your credentials
- Username: Your student ID number
- Password: Your portal password (same as the one you use for the student portal)

Step 4: Accept the terms
- Check the agreement box
- Click Connect

Troubleshooting:
- If the login page does not appear, try going to http://portal.kmu.ac.kr
- If your password does not work, reset it at the IT Help Desk (Library, 1st Floor)
- Eduroam is also available if your home university supports it

Tips:
- The Wi-Fi works best in the library and main buildings
- Signal can be weak in older buildings and outdoor areas
- For heavy downloads, use the computer labs',
 'campus', 'technology', 'all', 'keimyung', 'en', 'b1000000-0000-0000-0000-000000000003', false),

('guide', 'published',
 'How to Join a Student Club',
 'join-student-club',
 'Learn how to find and join student clubs at Keimyung University.',
 'Student clubs are a great way to make friends and experience Korean culture.

How to find clubs:
1. Attend the Club Fair at the start of each semester
2. Check the bulletin boards in the Student Center
3. Ask at the Student Affairs office (Building 5, Room 201)
4. Look for posters around campus

Popular club categories:
- Sports: soccer, basketball, badminton, hiking
- Arts: photography, music, dance, art
- Culture: K-pop dance, Korean cooking, language exchange
- Academic: debate, coding, business
- Volunteer: community service, tutoring

How to join:
1. Find a club you are interested in
2. Contact the club leader (usually via KakaoTalk)
3. Attend a trial session
4. Pay the semester membership fee (usually 10,000-30,000 won)

Tips:
- Most clubs welcome international students
- Language exchange clubs are especially popular
- Some clubs practice in English
- Club activities usually happen on weekday evenings or weekends',
 'clubs', null, 'all', 'keimyung', 'en', 'b1000000-0000-0000-0000-000000000004', false),

('guide', 'published',
 'How to Sort Trash in Korea',
 'trash-sorting-korea',
 'Learn Korea''s waste sorting system to avoid fines and be a good neighbor.',
 'Korea has strict waste sorting rules. Here is how to do it correctly.

Categories:
1. General waste (일반쓰레기) - Use designated paid garbage bags (종량제 봉투)
   - Buy them at convenience stores or supermarkets
   - Available in different sizes (5L, 10L, 20L)

2. Recyclables (재활용) - Sort into separate bags
   - Paper: newspapers, boxes (flatten them)
   - Plastic: bottles, containers (rinse and remove labels)
   - Cans: aluminum and steel cans (rinse)
   - Glass: bottles (rinse, remove caps)
   - Styrofoam: clean only

3. Food waste (음식물쓰레기) - Use special food waste bags or bins
   - NOT included: bones, shells, seeds, tea bags
   - Drain excess liquid before disposal

4. Large items (대형폐기물) - Furniture, electronics
   - Must request pickup through your district office
   - There is a fee based on item size

When to take out trash:
- Check your building or neighborhood schedule
- Usually: evenings before collection day
- Do NOT leave trash outside on wrong days

Fines:
- Incorrect sorting can result in fines of 100,000 won or more
- Your dormitory RA can help if you are unsure',
 'waste', null, 'all', 'keimyung', 'en', 'b1000000-0000-0000-0000-000000000005', true),

('guide', 'published',
 'Best Apps to Use in Korea',
 'best-apps-korea',
 'Essential Korean apps every international student should download.',
 'These apps will make your daily life in Korea much easier.

Communication:
- KakaoTalk: THE messaging app in Korea. Everyone uses it. Download it first!
- Papago: Translation app by Naver. Better than Google Translate for Korean.

Transportation:
- KakaoMap or Naver Map: Navigation and public transit directions (Google Maps is limited in Korea)
- Kakao T: Taxi hailing app
- T-money: Transit card balance check

Food & Delivery:
- Baedal Minjok (배달의민족): Food delivery
- Coupang Eats: Food delivery (often has English interface)
- MangoPlate: Restaurant reviews and discovery

Shopping:
- Coupang: Online shopping (fast delivery, often next-day)
- Daangn Market (당근마켓): Second-hand marketplace (great for furniture)

Banking:
- Your bank''s app (KEB Hana, Woori, etc.)
- Toss: Easy money transfers and financial services

Daily Life:
- Papago: Translation
- Seoul Subway: Subway navigation
- Air Korea: Air quality index

Tips:
- Most apps require a Korean phone number
- Set your phone language to Korean to practice reading
- KakaoTalk is essential - many university groups use it for communication',
 'apps', null, 'all', 'keimyung', 'en', 'b1000000-0000-0000-0000-000000000006', true),

('guide', 'published',
 'How to Use the Cafeteria',
 'how-to-use-cafeteria',
 'Navigate the campus cafeteria system, menus, and meal cards.',
 'Keimyung has several cafeterias across campus.

Main cafeterias:
1. Student Cafeteria (학생식당) - Building 3, Ground Floor
   - Cheapest option (3,500-5,000 won per meal)
   - Korean set meals, noodles, rice dishes

2. Faculty Cafeteria - Building 5, 1st Floor
   - Slightly more expensive (5,000-7,000 won)
   - Better variety

3. Dormitory Cafeteria - Dormitory D1, Ground Floor
   - Breakfast, lunch, and dinner available
   - Meal plan students eat here

How it works:
1. Check the daily menu (posted at the entrance or on the university app)
2. Pay at the counter or use your meal card
3. Get your tray and choose your meal
4. Return your tray to the designated area when done

Payment options:
- Cash
- T-money card
- Campus meal card (buy one at the Student Affairs office)
- Some cafeterias accept credit/debit cards

Menu tips:
- Menus change daily
- Rice, soup, and side dishes (banchan) are usually included
- Vegetarian options are limited - ask at the counter
- Halal food is not commonly available in campus cafeterias

Meal times:
- Breakfast: 7:30 AM - 9:00 AM
- Lunch: 11:30 AM - 1:30 PM (busiest time)
- Dinner: 5:00 PM - 7:00 PM

Tip: Go at 11:30 or after 1:00 PM to avoid the lunch rush.',
 'cafeteria', null, 'all', 'keimyung', 'en', 'b1000000-0000-0000-0000-000000000007', false),

('guide', 'published',
 'How to Find Your Classroom',
 'find-your-classroom',
 'Understand the building and room numbering system at Keimyung University.',
 'Finding your classroom can be confusing at first. Here is how the system works.

Room numbering:
Room numbers follow the pattern: Building Number + Floor + Room
Example: Room 3-201 = Building 3, 2nd Floor, Room 01

Main academic buildings:
- Building 1 (인문관): Humanities
- Building 2 (사회과학관): Social Sciences
- Building 3 (자연과학관): Natural Sciences
- Building 7 (공과대학): Engineering
- Building 10 (예술대학): Arts

How to find your room:
1. Check your class schedule on the student portal
2. Note the building number and room number
3. Find the building on the campus map (available at the main gate)
4. Enter the building and look for floor directories near the elevator

Tips:
- Buildings are numbered, not named (look for the number on the building entrance)
- Each floor has a directory board near the stairs/elevator
- If lost, ask any student or staff member
- Take photos of your schedule and the campus map on your first day
- Allow 10-15 minutes to walk between buildings

First week tip:
Do a campus walkthrough before classes start. Find all your classrooms in advance so you are not stressed on the first day.',
 'campus', 'navigation', 'new', 'keimyung', 'en', 'b1000000-0000-0000-0000-000000000008', false);

-- ============================================
-- GUIDES (French - selected translations)
-- ============================================

insert into content_items (type, status, title, slug, summary, body, category, subcategory, audience, campus_code, language_code, translation_group_id, is_featured) values

('guide', 'published',
 'Comment ouvrir un compte bancaire en Coree',
 'ouvrir-compte-bancaire-coree',
 'Guide etape par etape pour ouvrir votre premier compte bancaire coreen en tant qu''etudiant international.',
 'Ouvrir un compte bancaire est l''une des premieres choses a faire en arrivant en Coree.

Etape 1 : Choisir une banque
Les banques les plus accessibles aux etrangers pres du campus :
- KEB Hana Bank (recommandee, services en anglais)
- Woori Bank
- KB Kookmin Bank

Etape 2 : Documents necessaires
- Passeport
- Carte de resident etranger (ARC) - possible d''ouvrir un compte basique sans
- Numero de telephone coreen
- Certificat d''inscription de l''universite

Etape 3 : Se rendre a la banque
- Allez dans une agence pres du campus
- Dites au personnel que vous souhaitez ouvrir un compte etudiant
- Certaines agences ont du personnel anglophone

Etape 4 : Configurer la banque mobile
- Telechargez l''application de la banque
- Le personnel vous aidera a vous inscrire

Conseils :
- Amenez un ami coreophone si possible
- L''application KEB Hana Bank est disponible en anglais
- Vous recevrez une carte de debit sur place',
 'banking', 'opening', 'new', 'keimyung', 'fr', 'b1000000-0000-0000-0000-000000000001', true),

('guide', 'published',
 'Comment trier ses dechets en Coree',
 'trier-dechets-coree',
 'Apprenez le systeme de tri des dechets coreen pour eviter les amendes.',
 'La Coree a des regles strictes de tri des dechets. Voici comment faire.

Categories :
1. Dechets generaux (일반쓰레기) - Utilisez les sacs poubelle payants (종량제 봉투)
   - Achetez-les dans les superettes ou supermarches
   - Disponibles en differentes tailles (5L, 10L, 20L)

2. Recyclables (재활용) - Triez dans des sacs separes
   - Papier : journaux, cartons (aplatissez-les)
   - Plastique : bouteilles, conteneurs (rincez et retirez les etiquettes)
   - Canettes : aluminium et acier (rincez)
   - Verre : bouteilles (rincez, retirez les bouchons)

3. Dechets alimentaires (음식물쓰레기) - Sacs ou bacs speciaux
   - NON inclus : os, coquillages, graines, sachets de the

4. Objets volumineux (대형폐기물) - Meubles, electronique
   - Demandez un enlevement aupres de votre mairie de quartier

Amendes :
- Un mauvais tri peut entrainer des amendes de 100 000 wons ou plus',
 'waste', null, 'all', 'keimyung', 'fr', 'b1000000-0000-0000-0000-000000000005', true);

-- ============================================
-- GUIDES (Korean - selected translations)
-- ============================================

insert into content_items (type, status, title, slug, summary, body, category, subcategory, audience, campus_code, language_code, translation_group_id, is_featured) values

('guide', 'published',
 '한국에서 은행 계좌 개설하는 방법',
 'open-bank-account-korea-ko',
 '유학생을 위한 한국 은행 계좌 개설 단계별 가이드.',
 '한국에 도착하면 가장 먼저 해야 할 일 중 하나가 은행 계좌 개설입니다.

1단계: 은행 선택
캠퍼스 근처에서 외국인에게 친절한 은행:
- KEB 하나은행 (추천, 영어 서비스 가능)
- 우리은행
- KB 국민은행

2단계: 필요 서류
- 여권
- 외국인등록증 (ARC) - 없어도 기본 계좌 개설 가능하나 제한 있음
- 한국 전화번호
- 대학교 재학증명서

3단계: 은행 방문
- 캠퍼스 근처 지점 방문
- 학생 계좌 개설 요청
- 일부 지점에는 영어 가능 직원이 있음

4단계: 모바일 뱅킹 설정
- 은행 앱 다운로드
- 직원이 등록을 도와줌

팁:
- 가능하면 한국어를 할 수 있는 친구와 함께 가세요
- KEB 하나은행 앱은 영어를 지원합니다
- 체크카드는 즉시 발급됩니다',
 'banking', 'opening', 'new', 'keimyung', 'ko', 'b1000000-0000-0000-0000-000000000001', true);

-- ============================================
-- MAP LOCATIONS
-- ============================================

-- map_x = longitude, map_y = latitude (real GPS coordinates, Keimyung Seongseo Campus)

insert into map_locations (campus_code, name, category, description, building_code, map_x, map_y) values

('keimyung', 'Main Library (Dongsan Library)', 'library',
 'The main university library. Open Monday-Saturday. 24-hour reading room on 3rd floor. Printing services on 1st floor.',
 'LIB', 128.48870, 35.85580),

('keimyung', 'Student Cafeteria', 'cafeteria',
 'Main student dining hall. Korean set meals from 3,500 won. Breakfast, lunch, and dinner service.',
 'B3-GF', 128.48780, 35.85490),

('keimyung', 'International Office', 'international',
 'Support for international students: visa, enrollment, ARC, housing. Building 5, 2nd Floor, Room 204.',
 'B5-204', 128.48950, 35.85620),

('keimyung', 'Administration Building', 'admin',
 'Main administration offices including registrar, student affairs, and finance.',
 'B5', 128.48940, 35.85650),

('keimyung', 'Humanities Building', 'classroom',
 'Humanities department classrooms and faculty offices.',
 'B1', 128.48720, 35.85550),

('keimyung', 'Social Sciences Building', 'classroom',
 'Social sciences department classrooms and seminar rooms.',
 'B2', 128.48760, 35.85530),

('keimyung', 'Natural Sciences Building', 'classroom',
 'Natural sciences labs and lecture halls.',
 'B3', 128.48800, 35.85470),

('keimyung', 'Engineering Building', 'classroom',
 'Engineering department with computer labs and workshops.',
 'B7', 128.49020, 35.85480),

('keimyung', 'Arts Building', 'classroom',
 'Arts department with studios, practice rooms, and gallery.',
 'B10', 128.48650, 35.85430),

('keimyung', 'Main Dormitory (D1)', 'dormitory',
 'Main international student dormitory. Includes cafeteria on ground floor and laundry room in basement.',
 'D1', 128.49100, 35.85350),

('keimyung', 'Student Center', 'admin',
 'Student organizations, club rooms, convenience store, and copy center.',
 'SC', 128.48850, 35.85560),

('keimyung', 'Sports Complex', 'sports',
 'Gymnasium, swimming pool, fitness center, and outdoor sports fields.',
 'GYM', 128.48600, 35.85320),

('keimyung', 'Health Center', 'medical',
 'Campus health clinic. Free basic medical services for students. Mon-Fri 9AM-5PM.',
 'HC', 128.48900, 35.85600),

('keimyung', 'Convenience Store (CU)', 'cafeteria',
 '24-hour convenience store near the dormitory. Snacks, drinks, and basic supplies.',
 'D1-GF', 128.49080, 35.85370),

('keimyung', 'Faculty Cafeteria', 'cafeteria',
 'Higher-quality meals, slightly more expensive. Open to all students.',
 'B5-1F', 128.48930, 35.85640);
