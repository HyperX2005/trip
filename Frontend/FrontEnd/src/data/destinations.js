export const southIndiaDestinations = [
  {
    state: "Kerala",
    country: "India",
    climates: ["Cold", "Moderate", "Tropical", "Coastal Tropical"],
    moods: ["Spiritual", "Relaxing", "Adventurous", "Romantic", "Cultural", "Party"],
    distance: "1,200 km",
    image: "/kerala.jpg",
    description:
      "God's Own Country — a tropical paradise of serene backwaters, misty hill stations, lush tea plantations, pristine beaches and ancient temples.",
    temperature: "22°C to 36°C",
    weather: "Warm & humid year-round, heavy monsoon Jun–Sep",
    coordinates: { lat: 9.9312, lng: 76.2673 },

    hazards: [
      "Severe floods (2018, 2019)",
      "Landslides during monsoon in hilly regions",
      "Cyclone risk along coast (Oct–Dec)",
    ],

    attractions: [

      /* ── SPIRITUAL ───────────────────────────────────── */
      {
        name: "Padmanabhaswamy Temple",
        category: "Spiritual",
        description: "Ancient Dravidian temple in Thiruvananthapuram dedicated to Lord Vishnu — one of the wealthiest temples in the world.",
        image: "/padmanabha.jpeg",
        coordinates: { lat: 8.4830, lng: 76.9479 },
        nearby: [
          { name: "Ariya Nivas Vegetarian", distance: "0.4 km", rating: 4.2 },
          { name: "General Hospital Trivandrum", distance: "1.5 km" },
          { name: "BPCL Petrol Pump East Fort", distance: "0.8 km" },
        ],
      },
      {
        name: "Sabarimala Sree Ayyappa Temple",
        category: "Spiritual",
        description: "Revered hilltop shrine of Lord Ayyappa in the Western Ghats, attracting millions of pilgrims each Mandala season.",
        image: "/sabarimala.jpg",
        coordinates: { lat: 9.4271, lng: 77.0751 },
        nearby: [
          { name: "Pilgrim Rest House Pampa", distance: "3 km" },
          { name: "Pamba Base Camp Medical Aid", distance: "3 km" },
          { name: "KSRTC Petrol Pump Pampa", distance: "4 km" },
        ],
      },
      {
        name: "Guruvayur Sri Krishna Temple",
        category: "Spiritual",
        description: "One of the holiest Vaishnavite temples in Kerala, known as the 'Dwarka of the South', home to sacred elephants.",
        image: "/guruvayur.jpg",
        coordinates: { lat: 10.5943, lng: 76.0420 },
        nearby: [
          { name: "Saravana Bhavan Guruvayur", distance: "0.5 km", rating: 4.3 },
          { name: "Guruvayur Devaswom Hospital", distance: "1 km" },
          { name: "HP Petrol Pump Guruvayur", distance: "1.2 km" },
        ],
      },
      {
        name: "Attukal Bhagavathy Temple",
        category: "Spiritual",
        description: "Famous for the Attukal Pongala festival — the largest annual gathering of women in the world, a UNESCO record-holder.",
        image: "/attukal.jpg",
        coordinates: { lat: 8.4892, lng: 76.9503 },
        nearby: [
          { name: "Sri Padmam Restaurant", distance: "0.3 km", rating: 4.1 },
          { name: "SAT Hospital Trivandrum", distance: "2 km" },
          { name: "BPCL Pump Attukal", distance: "1 km" },
        ],
      },
      {
        name: "Chottanikkara Bhagavathy Temple",
        category: "Spiritual",
        description: "Sacred goddess temple near Ernakulam revered for its miraculous healing power, drawing thousands of devotees daily.",
        image: "/chottanikkara.jpg",
        coordinates: { lat: 10.0055, lng: 76.3773 },
        nearby: [
          { name: "Chottanikkara Hotel Restaurant", distance: "0.3 km", rating: 4.0 },
          { name: "General Hospital Chottanikkara", distance: "2 km" },
          { name: "Indian Oil Petrol Pump", distance: "1.5 km" },
        ],
      },

      /* ── CULTURAL ────────────────────────────────────── */
      {
        name: "Sree Vadakkumnathan Temple",
        category: "Cultural",
        description: "Ancient Shiva temple at the heart of Thrissur, the cultural capital of Kerala — site of the grand Thrissur Pooram festival.",
        image: "/vadakkumnathan.jpg",
        coordinates: { lat: 10.5267, lng: 76.2172 },
        nearby: [
          { name: "Indian Coffee House Thrissur", distance: "0.4 km", rating: 4.0 },
          { name: "District Hospital Thrissur", distance: "1.5 km" },
          { name: "HP Petrol Pump Thrissur", distance: "1 km" },
        ],
      },
      {
        name: "Chettikulangara Bhagavathy Temple",
        category: "Cultural",
        description: "Famous Devi temple in Alappuzha known for the spectacular Chettikulangara Bharani chariot festival each February.",
        image: "/chettikulangara.jpg",
        coordinates: { lat: 9.1779, lng: 76.5996 },
        nearby: [
          { name: "Chettikulangara Hotel", distance: "0.5 km", rating: 3.9 },
          { name: "Primary Health Centre Mavelikara", distance: "3 km" },
          { name: "IOCL Pump Mavelikara", distance: "2 km" },
        ],
      },

      /* ── ADVENTUROUS ─────────────────────────────────── */
      {
        name: "Meenmutty Waterfalls Trek",
        category: "Adventure",
        description: "A thrilling 2 km jungle trek through Wayanad's dense forest to reach the spectacular three-tiered, 300-metre Meenmutty Falls — one of Kerala's most rewarding adventure trails.",
        image: "/meenmutty.jpg",
        coordinates: { lat: 11.5613, lng: 75.9954 },
        nearby: [
          { name: "Meenmutty Trek Canteen", distance: "0.5 km", rating: 3.7 },
          { name: "Kalpetta General Hospital", distance: "22 km" },
          { name: "IOCL Pump Kalpetta", distance: "20 km" },
        ],
      },
      {
        name: "Soochipara Waterfalls Trek",
        category: "Adventure",
        description: "A scenic trek through Wayanad's Sentinel Rock forest to reach the three-tiered Soochipara Falls — the trail crosses streams, suspension bridges, and lush shola woodland.",
        image: "/soochipara.jpg",
        coordinates: { lat: 11.5571, lng: 76.0151 },
        nearby: [
          { name: "Echo Valley Restaurant", distance: "2 km", rating: 4.0 },
          { name: "Kalpetta District Hospital", distance: "24 km" },
          { name: "HP Petrol Pump Meppadi", distance: "10 km" },
        ],
      },
      {
        name: "Kolukkumalai Jeep Safari",
        category: "Adventure",
        description: "An exhilarating jeep safari up hairpin bends to the world's highest tea estate at 7,900 ft — rough terrain, misty ridges, and breathtaking sunrise views over the Ghats.",
        image: "/kolukkumalai.jpg",
        coordinates: { lat: 10.0681, lng: 77.0950 },
        nearby: [
          { name: "Kolukkumalai Estate Canteen", distance: "0.2 km", rating: 4.1 },
          { name: "Munnar General Hospital", distance: "35 km" },
          { name: "IOCL Pump Munnar", distance: "30 km" },
        ],
      },
      {
        name: "Wayanad Trekking Trails",
        category: "Adventure",
        description: "Wayanad's vast wilderness offers epic treks — Chembra Peak (the heart-shaped lake), Brahmagiri trail, and Pakshipathalam cave trek through dense tropical forest and coffee estates.",
        image: "/wayanad.jpg",
        coordinates: { lat: 11.6854, lng: 76.1320 },
        nearby: [
          { name: "Green Gates Hotel Restaurant", distance: "2 km", rating: 4.1 },
          { name: "Kalpetta Government Hospital", distance: "5 km" },
          { name: "IOCL Pump Kalpetta Bypass", distance: "3 km" },
        ],
      },
      {
        name: "Thekkady Jungle Safari",
        category: "Adventure",
        description: "Periyar Tiger Reserve's legendary jungle safari — boat rides, bamboo rafting, and guided border hikes to spot wild elephants, bison, sambar deer, and rare jungle cat.",
        image: "/thekkady.jpg",
        coordinates: { lat: 9.6000, lng: 77.1667 },
        nearby: [
          { name: "Spice Village Restaurant", distance: "1 km", rating: 4.5 },
          { name: "Thekkady Medical Centre", distance: "2 km" },
          { name: "HP Petrol Pump Kumily", distance: "3 km" },
        ],
      },

      /* ── ROMANTIC ────────────────────────────────────── */
      {
        name: "Munnar Tea Gardens",
        category: "Romantic",
        description: "Rolling emerald hills carpeted with endless tea plantations at 1,600 m altitude — a dreamy landscape perfect for couples, with cool air, mist-veiled valleys, and golden sunrises.",
        image: "/munnar.jpg",
        coordinates: { lat: 10.0889, lng: 77.0595 },
        nearby: [
          { name: "Saravana Bhavan Munnar", distance: "1 km", rating: 4.3 },
          { name: "Tata General Hospital Munnar", distance: "2 km" },
          { name: "HP Petrol Pump Munnar", distance: "1.5 km" },
        ],
      },
      {
        name: "Varkala Cliff Beach Sunset",
        category: "Romantic",
        description: "The iconic red laterite cliffs of Varkala glow amber at sunset — watch the sun sink into the Arabian Sea from the clifftop promenade lined with candlelit cafés and hammocks.",
        image: "/varkala.jpg",
        coordinates: { lat: 8.7337, lng: 76.7113 },
        nearby: [
          { name: "Cliff Café Varkala", distance: "0.1 km", rating: 4.5 },
          { name: "Varkala PHC", distance: "2 km" },
          { name: "KSRTC Petrol Pump Varkala", distance: "1.5 km" },
        ],
      },
      {
        name: "Kumarakom Backwaters",
        category: "Romantic",
        description: "Enchanting cluster of islands on Vembanad Lake in Kottayam — a luxury houseboat gliding through glassy backwaters at dusk is one of Kerala's most romantic experiences.",
        image: "/kumarakom.jpg",
        coordinates: { lat: 9.6157, lng: 76.4264 },
        nearby: [
          { name: "Kumarakom Lake Resort Restaurant", distance: "0.5 km", rating: 4.6 },
          { name: "Kottayam Medical College", distance: "16 km" },
          { name: "BPCL Pump Kumarakom Rd", distance: "5 km" },
        ],
      },
      {
        name: "Vagamon Meadows",
        category: "Romantic",
        description: "A serene plateau at 1,100 m blanketed in undulating pine-meadows and mist — couples come to walk hand-in-hand through the grasslands, go paragliding, and watch the clouds roll in.",
        image: "/vagamon.jpg",
        coordinates: { lat: 9.6859, lng: 76.9064 },
        nearby: [
          { name: "Vagamon Meadows Resort Restaurant", distance: "1 km", rating: 4.3 },
          { name: "PHC Vagamon", distance: "3 km" },
          { name: "BPCL Petrol Pump Vagamon Rd", distance: "5 km" },
        ],
      },
      {
        name: "Alleppey Houseboat Cruise",
        category: "Romantic",
        description: "Drift through Alleppey's labyrinth of lagoons on a traditional kettuvallam houseboat — candlelit dinners, kingfisher-blue canals, paddy fields drifting by, and starlit skies above.",
        image: "/alleppey.jpg",
        coordinates: { lat: 9.4981, lng: 76.3388 },
        nearby: [
          { name: "Dreamboat Kitchen", distance: "0.5 km", rating: 4.5 },
          { name: "Alappuzha Medical College", distance: "4 km" },
          { name: "IOCL Petrol Pump Alleppey", distance: "3 km" },
        ],
      },

      /* ── RELAXING ────────────────────────────────────── */
      {
        name: "Munroe Island",
        category: "Relaxing",
        description: "A tranquil cluster of eight islands at the confluence of Kallada River and Ashtamudi Lake — perfect for slow kayaking, village walks, and total disconnection from city life.",
        image: "/munroe.jpg",
        coordinates: { lat: 9.0018, lng: 76.5984 },
        nearby: [
          { name: "Munroe Island Homestay Kitchen", distance: "0.5 km", rating: 4.2 },
          { name: "Kollam District Hospital", distance: "25 km" },
          { name: "HP Petrol Pump Munroe Rd", distance: "8 km" },
        ],
      },
      {
        name: "Kuttanad Backwaters",
        category: "Relaxing",
        description: "The 'Rice Bowl of Kerala' — a unique below-sea-level farming region with paddy fields, canals, and traditional country boats gliding past village life at its most unhurried.",
        image: "/kuttanad.jpg",
        coordinates: { lat: 9.4016, lng: 76.5280 },
        nearby: [
          { name: "Kuttanad Village Restaurant", distance: "1 km", rating: 3.9 },
          { name: "Govt Hospital Kuttanad", distance: "6 km" },
          { name: "IOCL Pump Champakulam", distance: "4 km" },
        ],
      },
      {
        name: "Valiyaparamba Backwaters",
        category: "Relaxing",
        description: "Serene lesser-known backwater paradise in Kasaragod with four rivers meeting the sea, surrounded by coconut groves — ideal for a peaceful escape away from tourist crowds.",
        image: "/valiyaparamba.jpg",
        coordinates: { lat: 12.0899, lng: 75.1531 },
        nearby: [
          { name: "Valiyaparamba Boat House Café", distance: "0.5 km", rating: 4.0 },
          { name: "Kasaragod District Hospital", distance: "35 km" },
          { name: "BPCL Pump Payyanur", distance: "18 km" },
        ],
      },
      {
        name: "Cherai Beach",
        category: "Relaxing",
        description: "Pristine 15-km beach on Vypeen Island near Kochi, famous for Chinese fishing nets, dolphins, and a calm lagoon backdrop — perfect for a laid-back coastal day.",
        image: "/cherai.jpg",
        coordinates: { lat: 10.1426, lng: 76.1809 },
        nearby: [
          { name: "Cherai Beach Resort Restaurant", distance: "0.5 km", rating: 4.3 },
          { name: "Vypeen PHC", distance: "4 km" },
          { name: "HP Petrol Pump Cherai", distance: "3 km" },
        ],
      },
      {
        name: "Kappad Beach",
        category: "Relaxing",
        description: "Historic beach near Kozhikode where Vasco da Gama first landed in India in 1498 — serene, rocky, uncrowded, and steeped in maritime history.",
        image: "/kappad.jpg",
        coordinates: { lat: 11.3510, lng: 75.7412 },
        nearby: [
          { name: "Kappad Beach Restaurant", distance: "0.2 km", rating: 4.1 },
          { name: "Kozhikode Medical College", distance: "14 km" },
          { name: "IOCL Pump Kappad Road", distance: "2 km" },
        ],
      },

      /* ── PARTY / VIBRANT ─────────────────────────────── */
      {
        name: "Varkala Beach Cliff Cafés",
        category: "Party",
        description: "The clifftop strip above Varkala beach is lined with bohemian cafés, rooftop bars, and live music joints — the perfect sunset social scene with shisha, cocktails, and a traveller vibe.",
        image: "/varkala.jpg",
        coordinates: { lat: 8.7350, lng: 76.7120 },
        nearby: [
          { name: "Cliff Café Varkala", distance: "0.1 km", rating: 4.5 },
          { name: "Varkala PHC", distance: "2 km" },
          { name: "KSRTC Pump Varkala", distance: "1.5 km" },
        ],
      },
      {
        name: "Kovalam Beach Nightlife",
        category: "Party",
        description: "Kovalam's crescent beach transforms after dark — beachside restaurants, themed shacks, cultural dance performances, and a vibrant promenade make it Kerala's liveliest beach night scene.",
        image: "/kovalam.jpg",
        coordinates: { lat: 8.4004, lng: 76.9787 },
        nearby: [
          { name: "Fusion Restaurant Kovalam", distance: "0.3 km", rating: 4.4 },
          { name: "Kovalam Health Center", distance: "2 km" },
          { name: "BPCL Petrol Pump Kovalam", distance: "1.5 km" },
        ],
      },
      {
        name: "Cherai Beach Shacks",
        category: "Party",
        description: "Cherai's beachside shacks come alive in the evening with fresh seafood, local toddy, bonfire circles, and music — a relaxed but lively coastal party experience unique to Kerala.",
        image: "/cherai.jpg",
        coordinates: { lat: 10.1430, lng: 76.1815 },
        nearby: [
          { name: "Cherai Beach Shack Bar", distance: "0.2 km", rating: 4.1 },
          { name: "Vypeen PHC", distance: "4 km" },
          { name: "HP Petrol Pump Cherai", distance: "3 km" },
        ],
      },

      /* ── WATERFALLS (MODERATE CLIMATE) ───────────────── */
      {
        name: "Athirappilly Waterfalls",
        category: "Waterfall",
        description: "Kerala's largest waterfall at 80 ft, flowing through the Sholayar forest — featured in numerous Bollywood films, stunning year-round.",
        image: "/athirappilly.jpg",
        coordinates: { lat: 10.2840, lng: 76.5691 },
        nearby: [
          { name: "Forest Rest House Athirappilly", distance: "1 km", rating: 4.0 },
          { name: "Chalakudy PHC", distance: "30 km" },
          { name: "BPCL Pump Chalakudy", distance: "32 km" },
        ],
      },
      {
        name: "Vazhachal Waterfalls",
        category: "Waterfall",
        description: "A scenic waterfall just 5 km from Athirappilly, set in dense jungle with cool mist and lush vegetation all year — a perfect quick nature escape.",
        image: "/vazhachal.jpg",
        coordinates: { lat: 10.2842, lng: 76.5706 },
        nearby: [
          { name: "Vazhachal Forest Canteen", distance: "0.5 km", rating: 3.8 },
          { name: "Sholayar Dam Medical Post", distance: "4 km" },
          { name: "Petrol Pump Chalakudy Rd", distance: "35 km" },
        ],
      },
      {
        name: "Thusharagiri Waterfalls",
        category: "Waterfall",
        description: "A cluster of three scenic waterfalls in Kozhikode — Thenpara Falls, Erattu Falls, and Thumbipoovu Falls — set in a forest ideal for light trekking and nature walks.",
        image: "/thusharagiri.jpg",
        coordinates: { lat: 11.4434, lng: 75.8682 },
        nearby: [
          { name: "Thusharagiri Forest Lodge", distance: "1 km", rating: 4.1 },
          { name: "Kozhikode Government Hospital", distance: "40 km" },
          { name: "Petrol Pump Thamarassery", distance: "20 km" },
        ],
      },

      /* ── HILL STATIONS / TEA ESTATES (COLD CLIMATE) ─── */
      {
        name: "Munnar",
        category: "Hill Station",
        description: "Kerala's premier hill station at 1,600 m — misty valleys, tea gardens, Eravikulam National Park and cascading waterfalls.",
        image: "/munnar.jpg",
        coordinates: { lat: 10.0889, lng: 77.0595 },
        nearby: [
          { name: "Rapsy Restaurant Munnar", distance: "0.5 km", rating: 4.2 },
          { name: "General Hospital Munnar", distance: "1.5 km" },
          { name: "HP Petrol Pump Town", distance: "0.8 km" },
        ],
      },
      {
        name: "Kannan Devan Hills Plantations",
        category: "Tea Plantation",
        description: "Iconic Tata-owned tea estate near Munnar spreading across 23,000 acres; the green terraces are a photographer's dream.",
        image: "/kannandevan.jpg",
        coordinates: { lat: 10.0867, lng: 77.0614 },
        nearby: [
          { name: "Kannan Devan Hills Club Restaurant", distance: "0.5 km", rating: 4.4 },
          { name: "Tata General Hospital", distance: "3 km" },
          { name: "HP Petrol Pump Munnar Town", distance: "4 km" },
        ],
      },
      {
        name: "Lockhart Tea Estate",
        category: "Tea Plantation",
        description: "A verdant tea plantation in Munnar with classic colonial-era bungalow stays, mist-covered trails, and guided plucking tours.",
        image: "/lockhart.jpg",
        coordinates: { lat: 10.1056, lng: 77.0722 },
        nearby: [
          { name: "Lockhart Bungalow Restaurant", distance: "0.3 km", rating: 4.3 },
          { name: "Munnar District Hospital", distance: "8 km" },
          { name: "BPCL Petrol Pump Pallivasal", distance: "6 km" },
        ],
      },

    ],

    routeStops: [
      {
        name: "District Hospital Kollam",
        distance: "1,050 km from you",
        type: "hospital",
        coordinates: { lat: 8.8932, lng: 76.6141 },
      },
      {
        name: "Indian Coffee House Thrissur",
        distance: "600 km from you",
        rating: 4.0,
        type: "restaurant",
        coordinates: { lat: 10.5276, lng: 76.2144 },
      },
      {
        name: "Saravana Bhavan Guruvayur",
        distance: "620 km from you",
        rating: 4.3,
        type: "restaurant",
        coordinates: { lat: 10.5943, lng: 76.0420 },
      },
      {
        name: "Abad Plaza Kochi",
        distance: "700 km from you",
        rating: 4.1,
        type: "hotel",
        coordinates: { lat: 9.9785, lng: 76.2773 },
      },
      {
        name: "BPCL Pump Kottarakara",
        distance: "900 km from you",
        type: "fuel",
        coordinates: { lat: 9.0003, lng: 76.7764 },
      },
    ],
  },


  {
    state: "Goa",
    country: "India",
    climates: ["Cold", "Arid", "Moderate", "Tropical", "Mediterranean"],
    moods: ["Spiritual", "Relaxing", "Adventurous", "Romantic", "Cultural", "Party"],
    distance: "900 km",
    image: "/goa.jpg",
    description:
      "India's beach capital — golden sands, Portuguese heritage, vibrant nightlife, ancient temples, misty ghats and exotic wildlife all in one tiny paradise.",
    temperature: "20°C to 36°C",
    weather: "Sunny and warm most of the year, heavy monsoon Jun–Sep",
    coordinates: { lat: 15.2993, lng: 74.1240 },

    hazards: [
      "Heavy monsoon flooding (Jun–Sep)",
      "Strong sea currents at some beaches",
      "High tourist congestion during Dec–Jan",
    ],

    attractions: [

      /* ── SPIRITUAL ───────────────────────────────────── */
      {
        name: "Shri Mangeshi Temple",
        category: "Spiritual",
        description:
          "Goa's largest and most visited temple, dedicated to Lord Mangesh (Shiva), located at Mangeshi village in Ponda. Its 18th-century architecture and towering deepstambha are iconic.",
        image: "/mangeshi.jpg",
        coordinates: { lat: 15.3611, lng: 74.0414 },
        nearby: [
          { name: "Prasad Corner Mangeshi", distance: "0.2 km", rating: 4.1 },
          { name: "Primary Health Centre Ponda", distance: "8 km" },
          { name: "HP Petrol Pump Ponda", distance: "7 km" },
        ],
      },
      {
        name: "Shanta Durga Temple",
        category: "Spiritual",
        description:
          "One of the richest and most revered temples in Goa, dedicated to Shanta Durga — the goddess of peace — set amid serene hills in Kavale, Ponda.",
        image: "/shantadurga.jpg",
        coordinates: { lat: 15.3472, lng: 74.0369 },
        nearby: [
          { name: "Temple Prasad Stall", distance: "0.1 km", rating: 4.0 },
          { name: "PHC Kavale", distance: "3 km" },
          { name: "Indian Oil Pump Ponda", distance: "6 km" },
        ],
      },
      {
        name: "Mahadev Temple Tambdi Surla",
        category: "Spiritual",
        description:
          "Goa's oldest surviving temple, built in the 12th century by the Kadamba dynasty, tucked inside the lush Bhagwan Mahaveer Wildlife Sanctuary — a serene archaeological gem.",
        image: "/tambdisurla.jpg",
        coordinates: { lat: 15.4203, lng: 74.3003 },
        nearby: [
          { name: "Forest Rest House Tambdi Surla", distance: "1 km" },
          { name: "PHC Mollem", distance: "12 km" },
          { name: "Petrol Pump Collem", distance: "10 km" },
        ],
      },

      /* ── CULTURAL ────────────────────────────────────── */
      {
        name: "Basilica of Bom Jesus",
        category: "Cultural",
        description:
          "A UNESCO World Heritage Site in Old Goa built in 1605, enshrining the mortal remains of St. Francis Xavier. One of the finest examples of baroque architecture in Asia.",
        image: "/bomjesus.jpg",
        coordinates: { lat: 15.5009, lng: 73.9117 },
        nearby: [
          { name: "Viva Panjim Restaurant", distance: "2 km", rating: 4.4 },
          { name: "Goa Medical College Hospital", distance: "8 km" },
          { name: "BPCL Pump Old Goa", distance: "2 km" },
        ],
      },
      {
        name: "Our Lady of the Immaculate Conception",
        category: "Cultural",
        description:
          "Panaji's magnificent 1619 baroque church, gleaming white on a hilltop over the city square — one of the oldest and most photographed churches in Goa.",
        image: "/immaculateconception.jpg",
        coordinates: { lat: 15.4989, lng: 73.8319 },
        nearby: [
          { name: "Upper House Cafe Panaji", distance: "0.5 km", rating: 4.3 },
          { name: "Goa Medical College", distance: "6 km" },
          { name: "HP Pump Panaji", distance: "1.5 km" },
        ],
      },
      {
        name: "Fontainhas Latin Quarter",
        category: "Cultural",
        description:
          "Panaji's heritage neighbourhood of narrow winding lanes lined with terracotta-roofed Portuguese villas painted in ochre, indigo, and cream — Goa's most charming slice of old Lusophone life.",
        image: "/fontainhas.jpg",
        coordinates: { lat: 15.4973, lng: 73.8368 },
        nearby: [
          { name: "Viva Panjim Restaurant", distance: "0.3 km", rating: 4.4 },
          { name: "Goa Medical College Hospital", distance: "6 km" },
          { name: "HP Pump Panaji", distance: "1 km" },
        ],
      },
      {
        name: "Se Cathedral",
        category: "Cultural",
        description:
          "The largest church in Asia, built between 1562–1619 in Old Goa — a stunning Portuguese Gothic and Manueline masterpiece dedicated to St. Catherine, a UNESCO World Heritage Site.",
        image: "/secathedral.jpg",
        coordinates: { lat: 15.5017, lng: 73.9125 },
        nearby: [
          { name: "Hotel Mandovi Restaurant Old Goa", distance: "3 km", rating: 4.2 },
          { name: "Goa Medical College Hospital", distance: "8 km" },
          { name: "BPCL Pump Old Goa", distance: "2 km" },
        ],
      },

      /* ── RELAXING ────────────────────────────────────── */
      {
        name: "Chorla Ghats",
        category: "Hill Station",
        description:
          "A breathtaking mountain pass at the tri-border of Goa, Karnataka and Maharashtra, blanketed in evergreen forests, rare orchids, and cascading streams — perfect for nature lovers.",
        image: "/chorlaghat.jpg",
        coordinates: { lat: 15.6167, lng: 74.1167 },
        nearby: [
          { name: "Wildernest Nature Resort", distance: "1 km", rating: 4.5 },
          { name: "PHC Valpoi", distance: "25 km" },
          { name: "Petrol Pump Valpoi", distance: "22 km" },
        ],
      },
      {
        name: "Netravali Wildlife Sanctuary",
        category: "Wildlife",
        description:
          "A pristine sanctuary in South Goa covering 211 sq km of undisturbed forest, home to gaur, leopards, and the famous Netravali Bubble Lake — a sacred natural wonder.",
        image: "/netravali.jpg",
        coordinates: { lat: 15.0833, lng: 74.1667 },
        nearby: [
          { name: "Forest Dept Rest House Netravali", distance: "1 km" },
          { name: "PHC Quepem", distance: "20 km" },
          { name: "Petrol Pump Quepem", distance: "18 km" },
        ],
      },
      {
        name: "Salim Ali Bird Sanctuary",
        category: "Wildlife",
        description:
          "A mangrove forest sanctuary on Chorao Island named after India's legendary ornithologist. Accessible only by boat, it shelters over 400 bird species including rare migratory birds.",
        image: "/salimali.jpg",
        coordinates: { lat: 15.5290, lng: 73.8620 },
        nearby: [
          { name: "Chorao Ferry Point", distance: "0.2 km" },
          { name: "PHC Ribandar", distance: "3 km" },
          { name: "BPCL Pump Panaji", distance: "4 km" },
        ],
      },

      /* ── ROMANTIC ────────────────────────────────────── */
      {
        name: "Dona Paula View Point",
        category: "Romantic",
        description:
          "A legendary clifftop promontory jutting into the Arabian Sea where the Zuari and Mandovi rivers meet — named after a lovestruck Portuguese noblewoman, offering stunning sunsets and a serene couple-friendly atmosphere.",
        image: "/donapaula.jpg",
        coordinates: { lat: 15.4544, lng: 73.8058 },
        nearby: [
          { name: "O Coqueiro Restaurant Dona Paula", distance: "0.5 km", rating: 4.2 },
          { name: "Goa Medical College Hospital", distance: "5 km" },
          { name: "HP Pump Dona Paula", distance: "1.5 km" },
        ],
      },
      {
        name: "Divar Island",
        category: "Romantic",
        description:
          "A tranquil river island in the Mandovi, Divar is a living time capsule of Indo-Portuguese culture — coconut groves, whitewashed churches, laterite mansions and blissful car-free lanes perfect for a romantic escape.",
        image: "/divaisland.jpg",
        coordinates: { lat: 15.5167, lng: 73.8833 },
        nearby: [
          { name: "Casa Portuguesa Divar", distance: "0.8 km", rating: 4.2 },
          { name: "PHC Old Goa", distance: "5 km" },
          { name: "Petrol Pump Panaji Ferry", distance: "3 km" },
        ],
      },
      {
        name: "Chapora Fort Sunset Point",
        category: "Romantic",
        description:
          "The ruined 17th-century Portuguese fort perched dramatically above Chapora River — immortalised in the film Dil Chahta Hai, it offers arguably the most breathtaking sunset panorama in Goa.",
        image: "/chapofort.jpg",
        coordinates: { lat: 15.6033, lng: 73.7390 },
        nearby: [
          { name: "Bean Me Up Café Vagator", distance: "1.5 km", rating: 4.3 },
          { name: "PHC Mapusa", distance: "10 km" },
          { name: "Indian Oil Pump Mapusa", distance: "9 km" },
        ],
      },
      {
        name: "Palolem Beach Sunset",
        category: "Romantic",
        description:
          "A crescent-shaped palm-fringed paradise in South Goa — calm turquoise waters, silent disco nights, and magnificent golden sunsets make Palolem the most romantic beach in Goa.",
        image: "/palolem.jpg",
        coordinates: { lat: 15.0100, lng: 74.0233 },
        nearby: [
          { name: "Dropadi Restaurant Palolem", distance: "0.3 km", rating: 4.4 },
          { name: "PHC Canacona", distance: "5 km" },
          { name: "Indian Oil Pump Canacona", distance: "4 km" },
        ],
      },

      /* ── ADVENTUROUS ─────────────────────────────────── */
      {
        name: "Dudhsagar Trek",
        category: "Adventure",
        description:
          "A thrilling 11 km jungle trek through the Bhagwan Mahaveer Wildlife Sanctuary to reach the majestic Dudhsagar Falls — crossing streams, railway bridges, and dense Konkan forest.",
        image: "/dudhsagartrek.jpg",
        coordinates: { lat: 15.3143, lng: 74.3143 },
        nearby: [
          { name: "Jungle Camp Dudhsagar", distance: "2 km", rating: 4.2 },
          { name: "PHC Mollem", distance: "18 km" },
          { name: "Petrol Pump Collem", distance: "15 km" },
        ],
      },
      {
        name: "Tambdi Surla Waterfall",
        category: "Waterfall",
        description:
          "A hidden cascading waterfall near the ancient Mahadev temple inside the Bhagwan Mahaveer sanctuary — surrounded by lush jungle making it a perfect off-beat adventure spot.",
        image: "/tambdisurlafall.jpg",
        coordinates: { lat: 15.4180, lng: 74.3020 },
        nearby: [
          { name: "Mollem National Park Entry", distance: "5 km" },
          { name: "PHC Mollem", distance: "10 km" },
          { name: "Petrol Pump Collem", distance: "8 km" },
        ],
      },
      {
        name: "Cotigao Wildlife Sanctuary Trails",
        category: "Adventure",
        description:
          "South Goa's largest sanctuary spanning 86 sq km — its guided jungle trails, tree-top watch towers, and rare wildlife sightings of flying squirrels, pangolins, and slender lorises make it an adventurer's dream.",
        image: "/cotigao.jpg",
        coordinates: { lat: 15.0167, lng: 74.0667 },
        nearby: [
          { name: "Forest Rest House Cotigao", distance: "0.5 km" },
          { name: "PHC Canacona", distance: "12 km" },
          { name: "Indian Oil Pump Canacona", distance: "10 km" },
        ],
      },
      {
        name: "Mhadei Wildlife Sanctuary",
        category: "Wildlife",
        description:
          "A biodiversity hotspot in North Goa's Western Ghats, source of the Mandovi River — home to tigers, leopards, Indian bison and over 200 bird species through misty forest trails.",
        image: "/mhadei.jpg",
        coordinates: { lat: 15.5833, lng: 74.2333 },
        nearby: [
          { name: "Forest Quarters Valpoi", distance: "8 km" },
          { name: "PHC Valpoi", distance: "10 km" },
          { name: "Petrol Pump Valpoi", distance: "9 km" },
        ],
      },

      /* ── PARTY / MEDITERRANEAN BEACHES ──────────────── */
      {
        name: "Baga Beach",
        category: "Party",
        description:
          "Goa's most energetic beach, famous for its buzzing shacks, water sports, beach clubs and legendary Tito's nightlife strip — the ultimate party destination in India.",
        image: "/baga.jpg",
        coordinates: { lat: 15.5557, lng: 73.7517 },
        nearby: [
          { name: "Britto's Beach Bar Baga", distance: "0.1 km", rating: 4.4 },
          { name: "North Goa District Hospital", distance: "12 km" },
          { name: "HP Pump Calangute", distance: "2 km" },
        ],
      },
      {
        name: "Calangute Beach",
        category: "Party",
        description:
          "The 'Queen of Beaches', Calangute is Goa's largest and most popular beach — stretching 7 km with a bustling beach market, water sports, and a lively promenade.",
        image: "/calangute.jpg",
        coordinates: { lat: 15.5440, lng: 73.7552 },
        nearby: [
          { name: "Infantaria Cafe Calangute", distance: "0.3 km", rating: 4.3 },
          { name: "North Goa District Hospital", distance: "10 km" },
          { name: "Indian Oil Pump Calangute", distance: "1 km" },
        ],
      },
      {
        name: "Anjuna Beach",
        category: "Party",
        description:
          "Anjuna's rugged rocky cliffs, psychedelic history and legendary Wednesday flea market give it a bohemian soul unlike any other beach in Goa — backpacker paradise.",
        image: "/anjuna.jpg",
        coordinates: { lat: 15.5742, lng: 73.7397 },
        nearby: [
          { name: "Curlies Beach Shack Anjuna", distance: "0.2 km", rating: 4.2 },
          { name: "PHC Anjuna", distance: "2 km" },
          { name: "BPCL Pump Mapusa Road", distance: "4 km" },
        ],
      },
      {
        name: "Candolim Beach",
        category: "Party",
        description:
          "A quieter, more upscale alternative to Calangute — Candolim's long straight stretch of sand draws vacationers seeking a blend of relaxation, beach bars, and water sports.",
        image: "/candolim.jpg",
        coordinates: { lat: 15.5183, lng: 73.7620 },
        nearby: [
          { name: "Stone House Restaurant Candolim", distance: "0.3 km", rating: 4.3 },
          { name: "North Goa District Hospital", distance: "8 km" },
          { name: "HP Pump Candolim", distance: "1.5 km" },
        ],
      },

      /* ── ARID CLIMATE BEACHES ────────────────────────── */
      {
        name: "Morjim Beach",
        category: "Beach",
        description:
          "A serene turtle-nesting beach in North Goa known as 'Little Russia' — its calm, unspoilt shores are protected as an olive ridley sea turtle sanctuary, perfect for birdwatching and peaceful sunbathing.",
        image: "/morjim.jpg",
        coordinates: { lat: 15.6310, lng: 73.7290 },
        nearby: [
          { name: "Antares Restaurant Morjim", distance: "0.5 km", rating: 4.5 },
          { name: "PHC Pernem", distance: "10 km" },
          { name: "Indian Oil Pump Pernem", distance: "9 km" },
        ],
      },
      {
        name: "Mandrem Beach",
        category: "Beach",
        description:
          "One of Goa's most pristine and uncrowded beaches — a long sweep of white sand with casuarina groves and gentle waves, favoured by yoga retreaters and those seeking peaceful solitude.",
        image: "/mandrem.jpg",
        coordinates: { lat: 15.6500, lng: 73.7153 },
        nearby: [
          { name: "Dune Shack Mandrem", distance: "0.3 km", rating: 4.3 },
          { name: "PHC Pernem", distance: "12 km" },
          { name: "HP Petrol Pump Pernem", distance: "11 km" },
        ],
      },

    ],

    routeStops: [
      {
        name: "Goa Medical College Hospital",
        distance: "10 km from Panaji",
        type: "hospital",
        coordinates: { lat: 15.4586, lng: 73.8259 },
      },
      {
        name: "Viva Panjim Restaurant",
        distance: "Panaji city centre",
        rating: 4.4,
        type: "restaurant",
        coordinates: { lat: 15.4993, lng: 73.9124 },
      },
      {
        name: "Britto's Beach Bar Baga",
        distance: "16 km from Panaji",
        rating: 4.4,
        type: "restaurant",
        coordinates: { lat: 15.5557, lng: 73.7520 },
      },
      {
        name: "BPCL Pump Old Goa",
        distance: "9 km from Panaji",
        type: "fuel",
        coordinates: { lat: 15.5010, lng: 73.9118 },
      },
      {
        name: "Indian Oil Pump Canacona",
        distance: "60 km from Panaji",
        type: "fuel",
        coordinates: { lat: 15.0135, lng: 74.0335 },
      },
    ],
  },


  {
    state: "Tamil Nadu",
    country: "India",
    climates: ["Cold", "Arid", "Moderate", "Tropical", "Mediterranean"],
    moods: ["Spiritual", "Relaxing", "Adventurous", "Romantic", "Cultural", "Party"],
    distance: "800 km",
    image: "/TamilNadu.jpg",
    description:
      "A land of majestic Dravidian temples, mist-covered hill stations, roaring waterfalls, sun-kissed beaches, and vibrant Chettinad culture — Tamil Nadu is South India's crown jewel.",
    temperature: "15°C to 42°C",
    weather: "Cool hills in the north-west, arid coast in the south-east, tropical coast along the Bay of Bengal; monsoon Oct–Dec",
    coordinates: { lat: 11.1271, lng: 78.6569 },

    hazards: [
      "Cyclone risk along Bay of Bengal coast (Oct–Dec)",
      "Extreme heat in summer (Apr–Jun) in interior and southern districts",
      "Flash floods during north-east monsoon",
    ],

    attractions: [

      /* ── SPIRITUAL ─────────────────────────────────── */
      {
        name: "Meenakshi Amman Temple",
        category: "Spiritual",
        description:
          "A magnificent Dravidian temple in Madurai rising with 14 towering gopurams adorned with thousands of painted sculptures — one of the greatest temple complexes in the world.",
        image: "/meenakshi.jpg",
        coordinates: { lat: 9.9195, lng: 78.1193 },
        nearby: [
          { name: "Murugan Idli Shop", distance: "0.4 km", rating: 4.5 },
          { name: "Govt Rajaji Hospital Madurai", distance: "2 km" },
          { name: "IndianOil Pump Madurai", distance: "1 km" },
        ],
      },
      {
        name: "Ramanathaswamy Temple",
        category: "Spiritual",
        description:
          "One of the 12 Jyotirlinga shrines, located on Rameswaram Island — famous for its magnificent 1,220-metre corridor with soaring stone pillars, a sacred pilgrimage destination.",
        image: "/rameswaram.jpg",
        coordinates: { lat: 9.2885, lng: 79.3129 },
        nearby: [
          { name: "Ashram Restaurant Rameswaram", distance: "0.3 km", rating: 4.0 },
          { name: "Rameswaram PHC", distance: "1 km" },
          { name: "Bharat Petroleum Rameswaram", distance: "2 km" },
        ],
      },
      {
        name: "Arunachaleswarar Temple",
        category: "Spiritual",
        description:
          "An ancient Shiva temple at the foot of the sacred Arunachala hill in Tiruvannamalai — one of the Pancha Bhuta Stalas representing the element of fire, revered by millions.",
        image: "/arunachaleswarar.jpg",
        coordinates: { lat: 12.2253, lng: 79.0747 },
        nearby: [
          { name: "Sri Ramana Bhavan", distance: "0.5 km", rating: 4.2 },
          { name: "Govt Hospital Tiruvannamalai", distance: "2 km" },
          { name: "HP Petrol Pump Tiruvannamalai", distance: "1.5 km" },
        ],
      },
      {
        name: "Chidambaram Nataraja Temple",
        category: "Spiritual",
        description:
          "A legendary temple dedicated to Lord Shiva as Nataraja (Cosmic Dancer), one of the Pancha Bhuta Stalas representing the element of space — known for its spectacular Bharatanatyam festival.",
        image: "/chidambaram.jpg",
        coordinates: { lat: 11.3993, lng: 79.6930 },
        nearby: [
          { name: "Annapoorna Hotel Chidambaram", distance: "0.4 km", rating: 4.1 },
          { name: "Govt Hospital Chidambaram", distance: "1.5 km" },
          { name: "IndianOil Pump Chidambaram", distance: "1 km" },
        ],
      },
      {
        name: "Brihadeeswarar Temple",
        category: "Spiritual",
        description:
          "A UNESCO World Heritage Site and architectural marvel in Thanjavur built by Raja Raja Chola I in 1010 CE — its 66-metre vimana and shadow that never falls on the ground are iconic wonders.",
        image: "/brihadeeswarar.jpg",
        coordinates: { lat: 10.7828, lng: 79.1318 },
        nearby: [
          { name: "Saravana Bhavan Thanjavur", distance: "0.6 km", rating: 4.3 },
          { name: "Thanjavur Medical College Hospital", distance: "3 km" },
          { name: "BPCL Pump Thanjavur", distance: "1.5 km" },
        ],
      },

      /* ── RELAXING (HILL STATIONS) ──────────────────── */
      {
        name: "Ooty",
        category: "Hill Station",
        description:
          "The 'Queen of Hill Stations' in the Nilgiri range — cool mountain air, verdant tea gardens, the vintage Nilgiri Mountain Railway, and a serene botanical garden make Ooty an eternal favourite.",
        image: "/ooty.jpg",
        coordinates: { lat: 11.4102, lng: 76.6950 },
        nearby: [
          { name: "Hyderabad Biryani House Ooty", distance: "0.5 km", rating: 4.2 },
          { name: "Ooty Government Hospital", distance: "1.5 km" },
          { name: "HP Petrol Pump Ooty", distance: "1 km" },
        ],
      },
      {
        name: "Kodaikanal",
        category: "Hill Station",
        description:
          "Known as the 'Princess of Hill Stations', Kodaikanal sits at 2,133 m in the Palani Hills — famous for its star-shaped lake, cascading waterfalls, shola forests, and a thriving flower festival.",
        image: "/kodaikanal.jpg",
        coordinates: { lat: 10.2381, lng: 77.4892 },
        nearby: [
          { name: "Cloud Street Café Kodaikanal", distance: "0.3 km", rating: 4.4 },
          { name: "Govt Hospital Kodaikanal", distance: "2 km" },
          { name: "BPCL Pump Kodaikanal", distance: "1.5 km" },
        ],
      },
      {
        name: "Coonoor",
        category: "Hill Station",
        description:
          "A peaceful Nilgiri hill town renowned for its high-grown second-flush tea, colonial-era bungalows, Sim's Park, and the scenic toy-train ride through misty slopes.",
        image: "/coonoor.jpg",
        coordinates: { lat: 11.3530, lng: 76.7959 },
        nearby: [
          { name: "Ramyas Restaurant Coonoor", distance: "0.4 km", rating: 4.1 },
          { name: "PHC Coonoor", distance: "2 km" },
          { name: "IndianOil Pump Coonoor", distance: "1.2 km" },
        ],
      },
      {
        name: "Yercaud",
        category: "Hill Station",
        description:
          "A scenic hill station in the Shevaroys range at 1,515 m — affordable and serene, known for its coffee and orange plantations, boating lake, and cool misty mornings.",
        image: "/yercaud.jpg",
        coordinates: { lat: 11.7740, lng: 78.2120 },
        nearby: [
          { name: "GRT Nature Trails Restaurant", distance: "0.5 km", rating: 4.2 },
          { name: "Govt Hospital Yercaud", distance: "2 km" },
          { name: "HP Petrol Pump Salem Ghat", distance: "15 km" },
        ],
      },
      {
        name: "Yelagiri Hills",
        category: "Hill Station",
        description:
          "A tranquil hill retreat in Vellore district at 1,100 m — popular for rose gardens, a scenic lake, orchards, and paragliding, offering a quiet escape from city life.",
        image: "/yelagiri.jpg",
        coordinates: { lat: 12.5833, lng: 78.6333 },
        nearby: [
          { name: "Nature's Valley Resort Restaurant", distance: "0.5 km", rating: 4.0 },
          { name: "PHC Yelagiri", distance: "2 km" },
          { name: "IOCL Pump Vaniyambadi", distance: "25 km" },
        ],
      },

      /* ── ADVENTUROUS ───────────────────────────────── */
      {
        name: "Hogenakkal Falls",
        category: "Waterfall",
        description:
          "Called the 'Niagara of India', Hogenakkal on the Kaveri River plunges dramatically over carbonatite rocks — famous for its coracle boat rides through misty gorges and rejuvenating oil massages.",
        image: "/hogenakkal.jpg",
        coordinates: { lat: 12.1026, lng: 77.7924 },
        nearby: [
          { name: "TPTDC Restaurant Hogenakkal", distance: "0.5 km", rating: 3.9 },
          { name: "PHC Hogenakkal", distance: "3 km" },
          { name: "HP Petrol Pump Dharmapuri", distance: "45 km" },
        ],
      },
      {
        name: "Agaya Gangai Waterfalls",
        category: "Waterfall",
        description:
          "A breathtaking 300-ft waterfall hidden deep in the Kolli Hills, accessible only by a 1,000-step trek through dense forest — a spectacular reward for adventurous trekkers.",
        image: "/agayagangai.jpg",
        coordinates: { lat: 11.2213, lng: 78.3510 },
        nearby: [
          { name: "Kolli Hills Estate Canteen", distance: "1 km", rating: 3.8 },
          { name: "PHC Namakkal", distance: "55 km" },
          { name: "BPCL Pump Namakkal", distance: "50 km" },
        ],
      },
      {
        name: "Suruli Falls",
        category: "Waterfall",
        description:
          "A 150-ft twin cascade on the Suruliyar River near Cumbum, surrounded by the Megamalai forest — popular for trekking, swimming, and nature photography.",
        image: "/suruli.jpg",
        coordinates: { lat: 9.8522, lng: 77.3671 },
        nearby: [
          { name: "TN Forest Dept Rest House", distance: "1.5 km" },
          { name: "PHC Cumbum", distance: "12 km" },
          { name: "IndianOil Pump Cumbum", distance: "10 km" },
        ],
      },
      {
        name: "Yelagiri Paragliding Point",
        category: "Adventure",
        description:
          "One of South India's finest paragliding launch pads atop the Yelagiri plateau — offering sweeping aerial views over plains, orchards, and the Javadi hill range.",
        image: "/yelagiripara.jpg",
        coordinates: { lat: 12.5900, lng: 78.6400 },
        nearby: [
          { name: "Hilltop Restaurant Yelagiri", distance: "0.5 km", rating: 4.0 },
          { name: "PHC Yelagiri", distance: "2 km" },
          { name: "BPCL Pump Vaniyambadi", distance: "25 km" },
        ],
      },
      {
        name: "Kolli Hills Trek",
        category: "Adventure",
        description:
          "A challenging and rewarding trek through the majestic Kolli Hills with 70 hairpin bends on the ascent road, offering panoramic views, cascading falls, and dense shola forests.",
        image: "/kollihills.jpg",
        coordinates: { lat: 11.2331, lng: 78.3561 },
        nearby: [
          { name: "Forest Canteen Kolli Hills", distance: "1 km", rating: 3.7 },
          { name: "Govt Hospital Namakkal", distance: "55 km" },
          { name: "HP Petrol Pump Rasipuram", distance: "50 km" },
        ],
      },

      /* ── ROMANTIC ──────────────────────────────────── */
      {
        name: "Kodaikanal Lake",
        category: "Romantic",
        description:
          "A star-shaped man-made lake at the heart of Kodaikanal — perfect for romantic rowboating at dawn, lakeside cycling, and watching the clouds drift through the eucalyptus trees.",
        image: "/kodaikanallake.jpg",
        coordinates: { lat: 10.2352, lng: 77.4899 },
        nearby: [
          { name: "Tava Restaurant Kodaikanal", distance: "0.3 km", rating: 4.3 },
          { name: "Govt Hospital Kodaikanal", distance: "2 km" },
          { name: "IOCL Pump Kodaikanal", distance: "1.5 km" },
        ],
      },
      {
        name: "Ooty Botanical Garden",
        category: "Romantic",
        description:
          "A 55-acre Government Botanical Garden laid out in 1847 on the slopes of the Doddabetta range — 650+ plant species, a 20-million-year-old fossilised tree trunk, and an annual flower show.",
        image: "/ootybotanicalgarden.jpg",
        coordinates: { lat: 11.4132, lng: 76.6956 },
        nearby: [
          { name: "Willy's Café Ooty", distance: "0.3 km", rating: 4.2 },
          { name: "Govt Hospital Ooty", distance: "1.5 km" },
          { name: "HP Pump Ooty Town", distance: "1 km" },
        ],
      },
      {
        name: "Dhanushkodi Beach",
        category: "Romantic",
        description:
          "A hauntingly beautiful abandoned ghost town at the southern tip of Rameswaram Island, where the Bay of Bengal meets the Indian Ocean — surreal ruins, twin seas, and breathtaking sunsets.",
        image: "/dhanushkodi.jpg",
        coordinates: { lat: 9.1715, lng: 79.4104 },
        nearby: [
          { name: "Beach Shack Dhanushkodi", distance: "0.5 km", rating: 3.8 },
          { name: "PHC Rameswaram", distance: "20 km" },
          { name: "Bharat Petroleum Rameswaram", distance: "18 km" },
        ],
      },
      {
        name: "Kanyakumari Sunset Point",
        category: "Romantic",
        description:
          "The southernmost tip of mainland India where three seas meet — the iconic Kanyakumari sunset and moonrise are considered among the most spectacular natural spectacles in Asia.",
        image: "/kanyakumari.jpg",
        coordinates: { lat: 8.0883, lng: 77.5385 },
        nearby: [
          { name: "TTDC Restaurant Kanyakumari", distance: "0.5 km", rating: 4.1 },
          { name: "Govt Hospital Kanyakumari", distance: "2 km" },
          { name: "IndianOil Pump Kanyakumari", distance: "1.5 km" },
        ],
      },

      /* ── CULTURAL ──────────────────────────────────── */
      {
        name: "Mahabalipuram Shore Temple",
        category: "Cultural",
        description:
          "A UNESCO World Heritage Site — a complex of 7th-century Pallava rock-cut temples and monuments on the Coromandel Coast, with the Shore Temple rising dramatically from the sea.",
        image: "/mahabalipuram.jpg",
        coordinates: { lat: 12.6175, lng: 80.1927 },
        nearby: [
          { name: "Mamalla Bhavan Restaurant", distance: "0.3 km", rating: 4.2 },
          { name: "PHC Mahabalipuram", distance: "2 km" },
          { name: "BPCL Pump Mahabalipuram", distance: "1.5 km" },
        ],
      },
      {
        name: "Thanjavur Palace",
        category: "Cultural",
        description:
          "The grand Maratha palace in Thanjavur housing the Saraswathi Mahal Library (one of Asia's oldest), Royal Museum, and the ancient Nayak durbar hall — a treasure trove of Tamil culture.",
        image: "/thanjavurpalace.jpg",
        coordinates: { lat: 10.7889, lng: 79.1378 },
        nearby: [
          { name: "Sathars Restaurant Thanjavur", distance: "0.5 km", rating: 4.1 },
          { name: "Thanjavur Medical College Hospital", distance: "3 km" },
          { name: "HP Petrol Pump Thanjavur", distance: "1 km" },
        ],
      },
      {
        name: "Chettinad Mansions",
        category: "Cultural",
        description:
          "The grand palatial mansions (Naattukotai Chettiar heritage homes) in Karaikudi — world-famous for their antique décor, intricately carved pillars, Italian marble floors, and origins of the globally celebrated Chettinad cuisine.",
        image: "/chettinad.jpg",
        coordinates: { lat: 10.0769, lng: 78.7765 },
        nearby: [
          { name: "Visalam Heritage Hotel Restaurant", distance: "0.5 km", rating: 4.5 },
          { name: "PHC Karaikudi", distance: "3 km" },
          { name: "IndianOil Pump Karaikudi", distance: "2 km" },
        ],
      },
      {
        name: "DakshinaChitra Heritage Museum",
        category: "Cultural",
        description:
          "A living museum on the ECR coast south of Chennai showcasing reconstructed heritage homes from Tamil Nadu, Kerala, Andhra Pradesh, and Karnataka — a vibrant celebration of South Indian folk art and crafts.",
        image: "/dakshinachitra.jpg",
        coordinates: { lat: 12.8343, lng: 80.2289 },
        nearby: [
          { name: "DakshinaChitra Café", distance: "0.1 km", rating: 4.0 },
          { name: "PHC Thiruporur", distance: "10 km" },
          { name: "HP Petrol Pump ECR", distance: "3 km" },
        ],
      },

      /* ── PARTY ─────────────────────────────────────── */
      {
        name: "Marina Beach Night Area",
        category: "Party",
        description:
          "The world's longest urban beach at 13 km in Chennai comes alive at night with food stalls, street artists, carnival rides, and a buzzing promenade — the heartbeat of Chennai's social life.",
        image: "/marinabeach.jpg",
        coordinates: { lat: 13.0500, lng: 80.2824 },
        nearby: [
          { name: "Murugan Idli Shop Marina", distance: "0.5 km", rating: 4.4 },
          { name: "Govt General Hospital Chennai", distance: "2 km" },
          { name: "BPCL Pump Triplicane", distance: "1 km" },
        ],
      },
      {
        name: "ECR Beach Resorts",
        category: "Party",
        description:
          "The East Coast Road (ECR) south of Chennai is lined with premium beach resorts, rooftop bars, infinity pools, and weekend DJ nights — the go-to party and weekend getaway strip for Chennai's youth.",
        image: "/ecr.jpg",
        coordinates: { lat: 12.8500, lng: 80.2300 },
        nearby: [
          { name: "Zara's Restaurant ECR", distance: "0.5 km", rating: 4.3 },
          { name: "PHC Thiruporur", distance: "8 km" },
          { name: "HP Petrol Pump ECR Sholinganallur", distance: "5 km" },
        ],
      },
      {
        name: "Mahabalipuram Beach Cafés",
        category: "Party",
        description:
          "The beach town of Mahabalipuram has transformed into a cool hangout destination with chic beachfront cafés, live bands, fusion restaurants, and a laid-back bohemian vibe by the sea.",
        image: "/mahabalipurambeach.jpg",
        coordinates: { lat: 12.6200, lng: 80.1940 },
        nearby: [
          { name: "Seashore Restaurant Mahabalipuram", distance: "0.2 km", rating: 4.2 },
          { name: "PHC Mahabalipuram", distance: "2 km" },
          { name: "IndianOil Pump Mahabalipuram", distance: "1.5 km" },
        ],
      },
      {
        name: "Kodaikanal Night Cafés",
        category: "Party",
        description:
          "As dusk settles over the hills, Kodaikanal's cosy café culture comes alive with bonfires, live acoustic music, bonhomie, and misty evenings — perfect for a relaxed night out in the clouds.",
        image: "/kodaikanalbeach.jpg",
        coordinates: { lat: 10.2395, lng: 77.4890 },
        nearby: [
          { name: "Cloud Street Café Kodaikanal", distance: "0.2 km", rating: 4.5 },
          { name: "PHC Kodaikanal", distance: "2 km" },
          { name: "BPCL Pump Kodaikanal", distance: "1.5 km" },
        ],
      },

    ],

    routeStops: [
      {
        name: "Govt Rajaji Hospital Madurai",
        distance: "350 km from Chennai",
        type: "hospital",
        coordinates: { lat: 9.9211, lng: 78.1196 },
      },
      {
        name: "Murugan Idli Shop T. Nagar",
        distance: "Chennai city centre",
        rating: 4.5,
        type: "restaurant",
        coordinates: { lat: 13.0418, lng: 80.2341 },
      },
      {
        name: "Saravana Bhavan Thanjavur",
        distance: "320 km from Chennai",
        rating: 4.3,
        type: "restaurant",
        coordinates: { lat: 10.7900, lng: 79.1350 },
      },
      {
        name: "BPCL Pump Trichy Highway",
        distance: "280 km from Chennai",
        type: "fuel",
        coordinates: { lat: 10.7905, lng: 78.7047 },
      },
      {
        name: "HP Petrol Pump Kanyakumari",
        distance: "710 km from Chennai",
        type: "fuel",
        coordinates: { lat: 8.0870, lng: 77.5400 },
      },
    ],
  },

  {
    state: "Karnataka",
    country: "India",
    climates: ["Tropical", "Moderate", "Cold"],
    moods: ["Spiritual", "Cultural", "Adventurous", "Relaxing", "Party", "Romantic"],
    distance: "950 km",
    image: "/Karnataka.jpg",
    description:
      "A land of ancient temples, misty coffee hills, thundering waterfalls, high mountain peaks, and a sun-kissed coastline along the Arabian Sea.",
    temperature: "15°C to 38°C",
    weather: "Cool hills, tropical coast, heavy monsoon Jun–Sep in Western Ghats",
    coordinates: { lat: 15.3173, lng: 75.7139 },

    hazards: [
      "Flash floods during heavy monsoon in Ghats",
      "Wildlife caution in forest and sanctuary regions",
      "Strong sea currents at some beaches",
    ],

    attractions: [

      /* ── TEMPLES / SPIRITUAL ─────────────────────────── */
      {
        name: "Kollur Mookambika Temple",
        category: "Spiritual",
        description:
          "A revered Shakti shrine on the Kodachadri hills at Kollur, dedicated to Goddess Mookambika — one of the most powerful and celebrated temples on the Konkan coast.",
        image: "/mookambika.jpg",
        coordinates: { lat: 13.8635, lng: 74.8124 },
        nearby: [
          { name: "Mookambika Prasad Bhavan", distance: "0.2 km", rating: 4.2 },
          { name: "PHC Kollur", distance: "2 km" },
          { name: "Indian Oil Pump Byndoor", distance: "15 km" },
        ],
      },
      {
        name: "Kukke Subramanya Temple",
        category: "Spiritual",
        description:
          "A famous Shaivite temple in the heart of the Pushpagiri forest, dedicated to Lord Subramanya — revered for serpent worship and drawing millions of pilgrims annually.",
        image: "/kukke.jpg",
        coordinates: { lat: 12.8382, lng: 75.7465 },
        nearby: [
          { name: "Kukke Devasthanam Canteen", distance: "0.1 km", rating: 4.1 },
          { name: "PHC Subramanya", distance: "1 km" },
          { name: "HP Pump Subramanya", distance: "2 km" },
        ],
      },
      {
        name: "Murudeshwar Shiva Temple",
        category: "Spiritual",
        description:
          "Home to the world's second tallest Shiva statue at 123 ft, perched dramatically on a rocky headland surrounded on three sides by the Arabian Sea — a breathtaking coastal shrine.",
        image: "/murudeshwar.jpeg",
        coordinates: { lat: 14.0940, lng: 74.1040 },
        nearby: [
          { name: "RNS Dayananda Sagar Hotel", distance: "0.5 km", rating: 4.0 },
          { name: "Murudeshwar PHC", distance: "1.5 km" },
          { name: "BPCL Pump Murudeshwar", distance: "1 km" },
        ],
      },
      {
        name: "Udupi Sri Krishna Temple",
        category: "Spiritual",
        description:
          "The 13th-century Vaishnavite temple in Udupi is where the famous Udupi cuisine originates — managed by the Ashta Mathas, it is one of the most visited shrines in coastal Karnataka.",
        image: "/udupi.jpeg",
        coordinates: { lat: 13.3409, lng: 74.7517 },
        nearby: [
          { name: "Woodlands Hotel Udupi", distance: "0.3 km", rating: 4.3 },
          { name: "Kasturba Medical College Hospital", distance: "3 km" },
          { name: "Indian Oil Pump Udupi", distance: "1 km" },
        ],
      },
      {
        name: "Virupaksha Temple Hampi",
        category: "Spiritual",
        description:
          "The UNESCO-listed living temple at Hampi, dedicated to Lord Virupaksha (Shiva), standing since the 7th century amid the dramatic boulder-strewn landscape of the Vijayanagara empire ruins.",
        image: "/virupaksha.jpg",
        coordinates: { lat: 15.3350, lng: 76.4600 },
        nearby: [
          { name: "Mango Tree Restaurant Hampi", distance: "0.5 km", rating: 4.4 },
          { name: "Hospet Govt Hospital", distance: "13 km" },
          { name: "HP Petrol Bunk Hospet", distance: "12 km" },
        ],
      },

      /* ── HILL STATIONS / RELAXING ───────────────────── */
      {
        name: "Coorg Madikeri",
        category: "Hill Station",
        description:
          "The 'Scotland of India' — Coorg's misty hillsides are blanketed in coffee and spice plantations, with ancient temples, waterfalls, and the Raja's Seat sunset viewpoint.",
        image: "/coorg.jpeg",
        coordinates: { lat: 12.4244, lng: 75.7382 },
        nearby: [
          { name: "Coorg Cuisine Restaurant", distance: "0.5 km", rating: 4.3 },
          { name: "Coorg District Hospital", distance: "3 km" },
          { name: "Indian Oil Pump Madikeri", distance: "2 km" },
        ],
      },
      {
        name: "Chikmagalur",
        category: "Hill Station",
        description:
          "The birthplace of coffee in India — Chikmagalur's rolling estates, dense shola forests, and the highest peak Mullayanagiri make it a must-visit for nature lovers and trekkers alike.",
        image: "/chikmagalur.jpeg",
        coordinates: { lat: 13.3161, lng: 75.7720 },
        nearby: [
          { name: "Mayura Residency Chikmagalur", distance: "0.5 km", rating: 4.1 },
          { name: "Chikmagalur District Hospital", distance: "2 km" },
          { name: "BPCL Pump Chikmagalur", distance: "1 km" },
        ],
      },
      {
        name: "Agumbe",
        category: "Hill Station",
        description:
          "Known as the 'Cherrapunji of the South', Agumbe receives India's second-highest rainfall and is famous for its sunset view, king cobras, and the setting of Malgudi Days.",
        image: "/agumbe.jpg",
        coordinates: { lat: 13.5022, lng: 75.0981 },
        nearby: [
          { name: "Aranya Guest House Agumbe", distance: "0.5 km", rating: 4.0 },
          { name: "PHC Agumbe", distance: "1 km" },
          { name: "Petrol Pump Sringeri", distance: "18 km" },
        ],
      },
      {
        name: "Sakleshpur",
        category: "Hill Station",
        description:
          "A quiet coffee-growing hill town at 3,000 ft in the Western Ghats — renowned for the Manjarabad Star Fort, misty trails, spice gardens, and the scenic Sakleshpur–Subramanya trek.",
        image: "/sakleshpur.jpg",
        coordinates: { lat: 12.9477, lng: 75.7832 },
        nearby: [
          { name: "Coffee Estate Homestay", distance: "1 km", rating: 4.2 },
          { name: "PHC Sakleshpur", distance: "2 km" },
          { name: "HP Pump Hassan Road", distance: "5 km" },
        ],
      },

      /* ── WATERFALLS & PEAKS / ADVENTUROUS ─────────────── */
      {
        name: "Jog Falls",
        category: "Waterfall",
        description:
          "India's second-highest plunge waterfall at 253 m on the Sharavathi river — majestic during monsoon when four distinct falls (Raja, Roarer, Rocket, Rani) crash dramatically into the gorge.",
        image: "/jog.jpeg",
        coordinates: { lat: 14.2269, lng: 74.7947 },
        nearby: [
          { name: "KSTDC Mayura Guesthouse Jog", distance: "0.5 km", rating: 4.0 },
          { name: "PHC Jog", distance: "2 km" },
          { name: "Indian Oil Pump Sagar", distance: "20 km" },
        ],
      },
      {
        name: "Hebbe Falls",
        category: "Waterfall",
        description:
          "A stunning two-tiered waterfall deep inside the Bhadra Wildlife Sanctuary near Chikmagalur — only accessible by jeep or a trek through coffee and cardamom plantations.",
        image: "/hebbe.jpeg",
        coordinates: { lat: 13.2935, lng: 75.6188 },
        nearby: [
          { name: "Plantation Café Chikmagalur", distance: "15 km", rating: 4.1 },
          { name: "PHC Kalasa", distance: "10 km" },
          { name: "Petrol Pump Kalasa", distance: "9 km" },
        ],
      },
      {
        name: "Abbey Falls Coorg",
        category: "Waterfall",
        description:
          "A picturesque 70-ft cascade near Madikeri, framed by coffee plantations and spice estates — one of Coorg's most visited and photogenic natural attractions.",
        image: "/abbeyfalls.jpeg",
        coordinates: { lat: 12.4393, lng: 75.7052 },
        nearby: [
          { name: "Café Coorg Madikeri", distance: "5 km", rating: 4.2 },
          { name: "Coorg District Hospital", distance: "6 km" },
          { name: "Indian Oil Pump Madikeri", distance: "5 km" },
        ],
      },
      {
        name: "Shivanasamudra Falls",
        category: "Waterfall",
        description:
          "The Cauvery river splits into the Gaganachukki and Bharachukki falls at Shivanasamudra — one of Asia's first hydroelectric projects, now a spectacular island waterfall near Mysore.",
        image: "/shivanasamudra.jpg",
        coordinates: { lat: 12.2614, lng: 77.1618 },
        nearby: [
          { name: "KSTDC Rest House Shivanasamudra", distance: "1 km" },
          { name: "PHC Malavalli", distance: "18 km" },
          { name: "BPCL Pump Malavalli", distance: "16 km" },
        ],
      },
      {
        name: "Mullayanagiri Peak",
        category: "Peak",
        description:
          "Karnataka's highest peak at 1,930 m in the Chikmagalur district — a thrilling trek through shola forests and grasslands with panoramic views of the surrounding coffee hills.",
        image: "/mullayanagiri.jpg",
        coordinates: { lat: 13.4021, lng: 75.7127 },
        nearby: [
          { name: "Homestay Chikmagalur Town", distance: "20 km", rating: 4.1 },
          { name: "PHC Bababudangiri", distance: "5 km" },
          { name: "Petrol Pump Chikmagalur", distance: "18 km" },
        ],
      },
      {
        name: "Kudremukh Peak",
        category: "Peak",
        description:
          "Named for its horse-face silhouette, Kudremukh at 1,894 m is one of Karnataka's great treks — through dense shola, rolling grasslands and the source of river Bhadra.",
        image: "/kudremukh.jpg",
        coordinates: { lat: 13.2274, lng: 75.2028 },
        nearby: [
          { name: "Forest Rest House Kudremukh", distance: "1 km" },
          { name: "PHC Kalasa", distance: "30 km" },
          { name: "Petrol Pump Kalasa", distance: "28 km" },
        ],
      },
      {
        name: "Kodachadri Peak",
        category: "Peak",
        description:
          "A sacred hilltop at 1,343 m in Shimoga — home to the Mookambika temple summit shrine, golden sunsets over the Arabian Sea, and dense evergreen forests teeming with wildlife.",
        image: "/kodachadri.jpg",
        coordinates: { lat: 13.8837, lng: 74.8636 },
        nearby: [
          { name: "Forest Rest House Nagodi", distance: "3 km" },
          { name: "PHC Kollur", distance: "10 km" },
          { name: "Petrol Pump Byndoor", distance: "20 km" },
        ],
      },
      {
        name: "Kumara Parvatha",
        category: "Peak",
        description:
          "Karnataka's most challenging and rewarding trek at 1,712 m — a 2-day climb through Pushpagiri Wildlife Sanctuary from Kukke Subramanya, passing pristine shola and waterfalls.",
        image: "/kumaraparvatha.jpg",
        coordinates: { lat: 12.7982, lng: 75.7424 },
        nearby: [
          { name: "Kukke Temple Canteen", distance: "5 km", rating: 4.0 },
          { name: "PHC Subramanya", distance: "5 km" },
          { name: "HP Pump Subramanya", distance: "5 km" },
        ],
      },

      /* ── BEACHES / PARTY & RELAXING ─────────────────── */
      {
        name: "Malpe Beach",
        category: "Beach",
        description:
          "Udupi's wide golden beach with calm waters, the St. Mary's Islands ferry, and colorful fishing boats — one of Karnataka's most family-friendly and scenic coastal spots.",
        image: "/malpe.jpg",
        coordinates: { lat: 13.3555, lng: 74.7088 },
        nearby: [
          { name: "Sea Shell Restaurant Malpe", distance: "0.3 km", rating: 4.2 },
          { name: "Kasturba Medical College Hospital", distance: "8 km" },
          { name: "Indian Oil Pump Udupi", distance: "6 km" },
        ],
      },
      {
        name: "Murudeshwar Beach",
        category: "Beach",
        description:
          "A pristine coastal strip beside the dramatic Murudeshwar temple and the giant Shiva statue — offering a unique blend of spiritual grandeur and Arabian Sea beach vibes.",
        image: "/murudeshwarbeach.jpg",
        coordinates: { lat: 14.0940, lng: 74.1040 },
        nearby: [
          { name: "RNS Hotel Murudeshwar", distance: "0.3 km", rating: 4.0 },
          { name: "PHC Murudeshwar", distance: "1.5 km" },
          { name: "BPCL Pump Murudeshwar", distance: "1 km" },
        ],
      },
      {
        name: "Gokarna Beach",
        category: "Beach",
        description:
          "A laid-back coastal town with pristine beaches, ancient Mahabaleshwar temple, cliff-top trails, and a bohemian backpacker culture — Karnataka's answer to Goa but quieter and more spiritual.",
        image: "/gokarna.jpg",
        coordinates: { lat: 14.5479, lng: 74.3188 },
        nearby: [
          { name: "Namaste Café Gokarna", distance: "0.5 km", rating: 4.3 },
          { name: "PHC Gokarna", distance: "1.5 km" },
          { name: "HP Pump Gokarna", distance: "2 km" },
        ],
      },
      {
        name: "Om Beach Gokarna",
        category: "Beach",
        description:
          "Shaped naturally like the sacred Om symbol, this crescent beach at Gokarna is famous for its dramatic cliffs, vibrant sunset views, cliff-top café, and water sports.",
        image: "/ombeach.jpg",
        coordinates: { lat: 14.5230, lng: 74.3100 },
        nearby: [
          { name: "Namaste Café Om Beach", distance: "0.2 km", rating: 4.4 },
          { name: "PHC Gokarna", distance: "3 km" },
          { name: "HP Pump Gokarna Town", distance: "3 km" },
        ],
      },

    ],
  },



  {
    state: "Andhra Pradesh",
    country: "India",
    climates: ["Tropical", "Moderate", "Cold"],
    moods: ["Spiritual", "Cultural", "Relaxing", "Adventurous", "Party", "Romantic"],
    distance: "1,100 km",
    image: "/AndhraPradesh.jpg",
    description:
      "Land of temple towns, misty valleys, thundering waterfalls and a long golden coastline along the Bay of Bengal.",
    temperature: "18°C to 42°C",
    weather: "Hot summers, cool hill stations, cyclone-prone coast Oct–Dec",
    coordinates: { lat: 15.9129, lng: 79.74 },

    hazards: [
      "Cyclone-prone coastline (Oct–Dec)",
      "Extreme heat in summer (Apr–Jun)",
      "Flash floods near waterfalls during monsoon",
    ],

    attractions: [

      /* ── TEMPLES / SPIRITUAL ─────────────────────────── */
      {
        name: "Tirumala Venkateswara Temple",
        category: "Spiritual",
        description:
          "One of the most visited pilgrimage sites in the world, perched atop the seven sacred hills of Tirumala. Dedicated to Lord Venkateswara, it draws over 50,000 devotees daily.",
        image: "/tirupati.jpg",
        coordinates: { lat: 13.6833, lng: 79.3474 },
        nearby: [
          { name: "Annapurna Restaurant Tirupati", distance: "0.5 km", rating: 4.3 },
          { name: "SVIMS Hospital Tirupati", distance: "12 km" },
          { name: "HP Petrol Pump Tirupati", distance: "8 km" },
        ],
      },
      {
        name: "Srisailam Mallikarjuna Temple",
        category: "Spiritual",
        description:
          "One of the 12 Jyotirlingas and 18 Shakti Peethas, this ancient shrine stands on the banks of the Krishna river surrounded by dense Nallamala forests.",
        image: "/srisailam.jpg",
        coordinates: { lat: 16.0725, lng: 78.8681 },
        nearby: [
          { name: "Srisailam Devasthanam Canteen", distance: "0.3 km", rating: 4.0 },
          { name: "Area Hospital Srisailam", distance: "2 km" },
          { name: "IOCL Pump Srisailam", distance: "3 km" },
        ],
      },
      {
        name: "Kanaka Durga Temple",
        category: "Spiritual",
        description:
          "The presiding deity of Vijayawada, this powerful goddess temple stands atop Indrakeeladri hill on the banks of the Krishna river, renowned across Andhra.",
        image: "/kanakadurga.jpg",
        coordinates: { lat: 16.5183, lng: 80.6104 },
        nearby: [
          { name: "Hotel Mamata Vijayawada", distance: "1 km", rating: 4.1 },
          { name: "GGH Vijayawada", distance: "3 km" },
          { name: "BPCL Pump MG Road", distance: "1.5 km" },
        ],
      },
      {
        name: "Simhachalam Temple",
        category: "Spiritual",
        description:
          "A magnificent 11th-century temple dedicated to Lord Narasimha Varaha, located on a scenic hill 182 m above sea level near Visakhapatnam.",
        image: "/simhachalam.jpg",
        coordinates: { lat: 17.7725, lng: 83.2518 },
        nearby: [
          { name: "Temple Prasadam Counter", distance: "0.1 km", rating: 4.4 },
          { name: "King George Hospital Vizag", distance: "10 km" },
          { name: "HP Pump Simhachalam", distance: "2 km" },
        ],
      },
      {
        name: "Annavaram Satyanarayana Temple",
        category: "Spiritual",
        description:
          "Perched atop Ratnagiri Hill, this celebrated temple of Lord Satyanarayana overlooks the Pampa river and is a major Vaishnavite pilgrimage destination.",
        image: "/annavaram.jpg",
        coordinates: { lat: 17.2039, lng: 82.0728 },
        nearby: [
          { name: "Devasthanam Canteen Annavaram", distance: "0.3 km", rating: 4.0 },
          { name: "PHC Annavaram", distance: "2 km" },
          { name: "Indian Oil Pump Annavaram", distance: "1.5 km" },
        ],
      },

      /* ── HILL STATIONS ──────────────────────────────── */
      {
        name: "Araku Valley",
        category: "Hill Station",
        description:
          "A breathtaking valley in the Eastern Ghats with coffee plantations, tribal villages, waterfalls, and a scenic toy train ride — the crown jewel of Andhra tourism.",
        image: "/araku.jpg",
        coordinates: { lat: 18.3273, lng: 82.8756 },
        nearby: [
          { name: "Araku Coffee House", distance: "0.3 km", rating: 4.3 },
          { name: "Araku Community Health Centre", distance: "1 km" },
          { name: "APSRTC Fuel Station Araku", distance: "2 km" },
        ],
      },
      {
        name: "Lambasingi",
        category: "Hill Station",
        description:
          "Known as the 'Ooty of Andhra Pradesh', Lambasingi is the only place in AP that experiences snowfall. Its apple orchards and mist-laden hills are enchanting.",
        image: "/lambasingi.jpg",
        coordinates: { lat: 17.9104, lng: 82.5456 },
        nearby: [
          { name: "Haritha Hill Resort", distance: "0.5 km", rating: 4.1 },
          { name: "PHC Chintapalle", distance: "12 km" },
          { name: "Petrol Pump Chintapalle", distance: "10 km" },
        ],
      },
      {
        name: "Ananthagiri Hills",
        category: "Hill Station",
        description:
          "A serene hill retreat near Araku covered in lush forests, coffee estates, and cool streams — perfect for trekking, nature walks, and peaceful getaways.",
        image: "/ananthagiri.jpg",
        coordinates: { lat: 18.3420, lng: 82.9120 },
        nearby: [
          { name: "Ananthagiri Homestay", distance: "0.8 km", rating: 4.0 },
          { name: "PHC Ananthagiri", distance: "5 km" },
          { name: "Fuel Point Araku Road", distance: "8 km" },
        ],
      },
      {
        name: "Horsley Hills",
        category: "Hill Station",
        description:
          "Once the summer retreat of British officer W.D. Horsley, these cool Chittoor hills at 1,265 m offer stunning views, ancient eucalyptus trees, and a peaceful climate.",
        image: "/horsleyhills.jpg",
        coordinates: { lat: 13.6527, lng: 78.3994 },
        nearby: [
          { name: "APTDC Haritha Resort", distance: "0.5 km", rating: 4.2 },
          { name: "Madanapalle Govt Hospital", distance: "30 km" },
          { name: "BPCL Pump Madanapalle", distance: "25 km" },
        ],
      },

      /* ── WATERFALLS ─────────────────────────────────── */
      {
        name: "Talakona Waterfalls",
        category: "Waterfall",
        description:
          "The highest waterfall in Andhra Pradesh at 270 ft, located inside the Sri Venkateswara National Park. Rich in rare medicinal herbs, the water is believed to have healing properties.",
        image: "/talakona.jpg",
        coordinates: { lat: 13.7286, lng: 79.5052 },
        nearby: [
          { name: "Forest Canteen Talakona", distance: "0.5 km", rating: 3.9 },
          { name: "PHC Chandragiri", distance: "35 km" },
          { name: "Indian Oil Pump Chandragiri", distance: "32 km" },
        ],
      },
      {
        name: "Katiki Waterfalls",
        category: "Waterfall",
        description:
          "A hidden gem near Bheemunipatnam in the Borra Guhalu forest, this 50-ft cascade is reached through a thrilling jungle trail with streams and boulders.",
        image: "/katiki.jpg",
        coordinates: { lat: 17.9320, lng: 83.3720 },
        nearby: [
          { name: "Aranya Cafe Bheemunipatnam", distance: "5 km", rating: 3.8 },
          { name: "Community Health Centre Bheemunipatnam", distance: "6 km" },
          { name: "Petrol Pump Bheemunipatnam", distance: "7 km" },
        ],
      },
      {
        name: "Mallela Theertham Waterfalls",
        category: "Waterfall",
        description:
          "A sacred 150-ft waterfall deep inside the Nallamala forest near Srisailam — famous for the tiny Lord Shiva shrine at its base and the trek through dense jungle.",
        image: "/mallelatheertham.jpg",
        coordinates: { lat: 15.9858, lng: 78.6935 },
        nearby: [
          { name: "Forest Rest House Srisailam", distance: "20 km" },
          { name: "Area Hospital Srisailam", distance: "25 km" },
          { name: "IOCL Pump Srisailam", distance: "22 km" },
        ],
      },
      {
        name: "Ethipothala Waterfalls",
        category: "Waterfall",
        description:
          "A stunning 70-ft wide waterfall on the Chandravanka river near Nagarjuna Sagar. Known for its roaring twin cascades and a resident mugger crocodile in the pool below.",
        image: "/ethipothala.jpg",
        coordinates: { lat: 16.5440, lng: 79.3380 },
        nearby: [
          { name: "Haritha Hotel Nagarjuna Sagar", distance: "15 km", rating: 4.0 },
          { name: "PHC Macherla", distance: "18 km" },
          { name: "HP Pump Macherla", distance: "16 km" },
        ],
      },

      /* ── BEACHES ────────────────────────────────────── */
      {
        name: "Ramakrishna Beach",
        category: "Beach",
        description:
          "Visakhapatnam's most iconic beach stretching 1.5 km along the Bay of Bengal. Home to submarines, a naval museum, beach volleyball, and vibrant evening food stalls.",
        image: "/rkbeach.jpg",
        coordinates: { lat: 17.7168, lng: 83.3809 },
        nearby: [
          { name: "RK Beach Food Court", distance: "0.2 km", rating: 4.1 },
          { name: "King George Hospital Vizag", distance: "4 km" },
          { name: "HP Petrol Pump Beach Road", distance: "1.5 km" },
        ],
      },
      {
        name: "Rushikonda Beach",
        category: "Beach",
        description:
          "Visakhapatnam's premium water sports beach with golden sands, clear blue water, and facilities for surfing, jet skiing, and parasailing.",
        image: "/rushikonda.jpg",
        coordinates: { lat: 17.7817, lng: 83.3758 },
        nearby: [
          { name: "Sea Side Restaurant Rushikonda", distance: "0.4 km", rating: 4.2 },
          { name: "King George Hospital Vizag", distance: "8 km" },
          { name: "IndianOil Pump Rushikonda", distance: "4 km" },
        ],
      },
      {
        name: "Yarada Beach",
        category: "Beach",
        description:
          "A secluded and unspoiled beach enclosed between two hillocks near Vizag, offering calm waters, white sands, and a serene escape away from city crowds.",
        image: "/yarada.jpg",
        coordinates: { lat: 17.6600, lng: 83.3080 },
        nearby: [
          { name: "Yarada Beach Shack", distance: "0.3 km", rating: 3.9 },
          { name: "Navy Hospital Vizag", distance: "5 km" },
          { name: "BPCL Pump Gangavaram", distance: "6 km" },
        ],
      },
      {
        name: "Bheemunipatnam Beach",
        category: "Beach",
        description:
          "A historic Dutch cemetery meets a breezy beach at Bheemunipatnam, the first municipality in India — offering a rare mix of colonial history and coastal charm.",
        image: "/bheemunipatnam.jpg",
        coordinates: { lat: 17.8921, lng: 83.4555 },
        nearby: [
          { name: "Beach View Restaurant Bheemunipatnam", distance: "0.5 km", rating: 4.0 },
          { name: "Community Health Centre Bheemunipatnam", distance: "1 km" },
          { name: "Petrol Pump Bheemunipatnam", distance: "2 km" },
        ],
      },

    ],
  },

];
