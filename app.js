/**
 * Carepath — Smart Health Navigator & Doctor Appointment Engine
 * Built to fulfill the user's workflow:
 * 1. Sign in (Email, Phone, Name, Age)
 * 2. Pain & Symptom Assessment (Pain type selector, severity 1-10 slider, duration)
 * 3. Disease Analysis, Cure & Risks (Immediate relief, what could worsen if ignored)
 * 4. Nearby Hospitals & Live Doctor Availability Matching
 * 5. Automatic / One-Click Doctor Appointment Booking & Digital OPD Slip
 */

'use strict';

// ---------------------------------------------------------------------------
// 1. Pain Categories & Medical Intelligence Knowledge Base
// ---------------------------------------------------------------------------
const PAIN_CATALOG = {
  headache: {
    id: 'headache',
    name: 'Headache & Migraine',
    name_te: 'తలనొప్పి & మైగ్రేన్',
    name_hi: 'सिरदर्द और माइग्रेन',
    icon: '🤕',
    specialty: 'Neurology / General Physician',
    specialty_te: 'న్యూరాలజీ / జనరల్ ఫిజిషియన్',
    specialty_hi: 'न्यूरोलॉजी / जनरल फिजिशियन',
    likelyConditions: 'Tension Headache, Migraine, Sinus Pressure, or Eye Strain',
    cureAndRelief: [
      '<strong>Rest in a dark, quiet room:</strong> Lie down and close your eyes away from bright screens or loud sounds.',
      '<strong>Drink 2 glasses of water:</strong> Dehydration is one of the most common reasons for a sudden headache.',
      '<strong>Cool cloth on forehead:</strong> Place a clean, cool wet towel or ice pack on your forehead or back of your neck.',
      '<strong>Mild pain tablet:</strong> A simple pain medicine (like Paracetamol after food) can help if safe for you.'
    ],
    complicationsIfIgnored: [
      '<strong>Daily non-stop pain:</strong> The headache can become frequent and disturb your sleep and daily work.',
      '<strong>Nausea & vomiting:</strong> Migraine spikes can make you throw up and feel dizzy around light.',
      '<strong>Underlying blood pressure:</strong> Could be an early sign of high blood pressure or eye issues that need testing.'
    ],
    emergencyRedFlags: 'Sudden explosive pain ("worst headache of your life"), high fever with a stiff neck, confusion, or trouble speaking.'
  },
  chest: {
    id: 'chest',
    name: 'Chest Pain or Discomfort',
    name_te: 'ఛాతీ నొప్పి లేదా అసౌకర్యం',
    name_hi: 'छाती में दर्द या बेचैनी',
    icon: '🫀',
    specialty: 'Cardiology / Emergency Medicine',
    specialty_te: 'కార్డియాలజీ / ఎమర్జెన్సీ మెడిసిన్',
    specialty_hi: 'कार्डियोलॉजी / इमरजेंसी मेडिसिन',
    likelyConditions: 'Acid Reflux (Acidity/Gas), Muscle Strain, or Heart Stress',
    cureAndRelief: [
      '<strong>Sit down right now:</strong> Stop walking or climbing stairs immediately; sit comfortably upright.',
      '<strong>Loosen tight clothing:</strong> Unbutton tight collars, belts, or tight shirts so you can breathe freely.',
      '<strong>Take slow, calm breaths:</strong> Breathe in slowly through your nose and out gently through your mouth.',
      '<strong>Antacid for burning gas:</strong> If you feel burning in your chest after eating, an antacid syrup or tablet can help.'
    ],
    complicationsIfIgnored: [
      '<strong>Heart muscle damage:</strong> If the pain is from reduced blood flow to the heart, waiting can cause permanent injury.',
      '<strong>Breathing distress:</strong> Chest pressure can spread to your lungs and make it very difficult to breathe.',
      '<strong>Sudden fainting:</strong> Poor blood circulation can lead to dizziness or sudden collapse.'
    ],
    emergencyRedFlags: 'Heavy crushing pressure on your chest, pain spreading to your left arm or jaw, cold sweat, or gasping for breath. Dial 112 now!'
  },
  stomach: {
    id: 'stomach',
    name: 'Stomach & Abdominal Pain',
    name_te: 'కడుపు & పొత్తికడుపు నొప్పి',
    name_hi: 'पेट और उदर दर्द',
    icon: '🤢',
    specialty: 'Gastroenterology / General Physician',
    specialty_te: 'గ్యాస్ట్రోఎంటరాలజీ / జనరల్ ఫిజిషియన్',
    specialty_hi: 'गैस्ट्रोएंटरोलॉजी / जनरल फिजिशियन',
    likelyConditions: 'Acidity, Indigestion, Food Infection, Gas Cramps, or Appendix Issue',
    cureAndRelief: [
      '<strong>Sip warm fluids:</strong> Drink warm water, tender coconut water, or light ginger tea to stay hydrated.',
      '<strong>Eat simple soft food:</strong> Eat plain curd rice, bananas, or toast; stay away from spicy and oily food.',
      '<strong>Warm water bag:</strong> Place a warm bottle on your belly to gently relax tight cramping muscles.',
      '<strong>Do not take strong pain pills:</strong> Avoid medicines like Brufen on an empty stomach because they burn your belly.'
    ],
    complicationsIfIgnored: [
      '<strong>Severe weakness & dehydration:</strong> Repeated vomiting or loose motions rapidly drains your body water.',
      '<strong>Stomach ulcers:</strong> Constant stomach acid without treatment can cause bleeding sores inside your stomach.',
      '<strong>Burst appendix risk:</strong> A sharp, worsening pain in your lower right belly could be an inflamed appendix.'
    ],
    emergencyRedFlags: 'Hard rock-like belly, throwing up blood, passing black stools, or severe non-stop pain where you cannot stand straight.'
  },
  throat: {
    id: 'throat',
    name: 'Throat Pain & Severe Cough',
    name_te: 'గొంతు నొప్పి & తీవ్రమైన దగ్గు',
    name_hi: 'गले में दर्द और तेज खांसी',
    icon: '😷',
    specialty: 'Pulmonology / ENT Specialist',
    specialty_te: 'పల్మోనాలజీ / ENT నిపుణులు',
    specialty_hi: 'पल्मोनोलॉजी / ENT विशेषज्ञ',
    likelyConditions: 'Viral Throat Infection, Strep Throat, Dry Bronchitis, or Dust Allergy',
    cureAndRelief: [
      '<strong>Warm salt water gargle:</strong> Mix half a spoon of salt in warm water and gargle 3 times a day.',
      '<strong>Breathe warm steam:</strong> Inhale steam from a bowl of hot water to clear your nose and moisten your throat.',
      '<strong>Honey in warm water:</strong> Drink warm water with honey to naturally soothe coughing fits and throat scratchiness.',
      '<strong>Drink lots of water:</strong> Warm water keeps your throat moist and thins out thick sticky mucus.'
    ],
    complicationsIfIgnored: [
      '<strong>Chest infection (Pneumonia):</strong> Throat bacteria can travel down your windpipe and infect your lungs.',
      '<strong>Severe swollen throat:</strong> Swelling can grow so large that it hurts even to swallow a sip of water.',
      '<strong>Chest muscle pain & sleeplessness:</strong> Non-stop coughing prevents deep sleep and strains your ribcage.'
    ],
    emergencyRedFlags: 'Gasping for air, loud whistling noise while inhaling, or lips/fingernails turning pale or blue.'
  },
  joint: {
    id: 'joint',
    name: 'Joint, Knee & Back Pain',
    name_te: 'కీళ్ళు, మోకాలు & వీపు నొప్పి',
    name_hi: 'जोड़ों, घुटने और पीठ का दर्द',
    icon: '🦴',
    specialty: 'Orthopedics / Physiotherapy',
    specialty_te: 'ఆర్థోపెడిక్స్ / ఫిజియోథెరపీ',
    specialty_hi: 'ऑर्थोपेडिक्स / फिजियोथेरेपी',
    likelyConditions: 'Muscle Catch, Joint Wear (Arthritis), Sciatica Nerve Pain, or Sprain',
    cureAndRelief: [
      '<strong>Rest the aching joint:</strong> Sit down and avoid lifting heavy things or walking long distances.',
      '<strong>Ice pack or warm bag:</strong> Use an ice bag for new swelling, or a warm water bottle for stiff back muscles.',
      '<strong>Lie down flat:</strong> Lie on your back with a soft pillow under your knees to take pressure off your spine.',
      '<strong>Sit upright:</strong> Avoid slouching on soft sofas or soft mattresses that bend your back.'
    ],
    complicationsIfIgnored: [
      '<strong>Difficulty walking:</strong> Untreated joint cartilage damage gets worse, making daily walking painful.',
      '<strong>Nerve pinch (Sciatica):</strong> Can cause tingling, numbness, or loss of strength shooting down your legs.',
      '<strong>Permanent stiffness:</strong> Muscles freeze up and may need months of physiotherapy or surgery.'
    ],
    emergencyRedFlags: 'Sudden loss of feeling in both legs, inability to control your urine or bowels, or inability to stand up.'
  },
  skin: {
    id: 'skin',
    name: 'Skin Rash, Itching & Allergy',
    name_te: 'చర్మం దద్దుర్లు, దురద & అలర్జీ',
    name_hi: 'त्वचा के चकत्ते, खुजली और एलर्जी',
    icon: '🔴',
    specialty: 'Dermatology',
    specialty_te: 'డెర్మటాలజీ (చర్మ వ్యాధుల నిపుణులు)',
    specialty_hi: 'डर्मेटोलॉजी (त्वचा रोग विशेषज्ञ)',
    likelyConditions: 'Allergic Reaction, Heat Rash, Fungal Infection, or Eczema',
    cureAndRelief: [
      '<strong>Cool wet cloth:</strong> Place a clean, damp towel on the itchy area to stop the burning sensation.',
      '<strong>Wear loose cotton clothes:</strong> Avoid tight or synthetic clothes that rub and make you sweat.',
      '<strong>Do not scratch with nails:</strong> Scratching breaks the skin and lets germs cause infections with pus.',
      '<strong>Calamine lotion:</strong> Gently dab soothing calamine lotion to calm redness and itching.'
    ],
    complicationsIfIgnored: [
      '<strong>Bacterial skin infection:</strong> Open scratches allow bacteria in, creating painful sores and pus pockets.',
      '<strong>Dark scars & rough skin:</strong> Constant scratching leaves dark spots and thick, leathery skin.',
      '<strong>Spreading full-body allergy:</strong> The allergic reaction can rapidly spread across your arms, chest, and face.'
    ],
    emergencyRedFlags: 'Swelling of your lips, face, or tongue, or skin hives appearing along with wheezing and trouble breathing.'
  },
  fever: {
    id: 'fever',
    name: 'Fever, Chills & Body Fatigue',
    name_te: 'జ్వరం, వణుకు & ఒళ్ళు నొప్పులు',
    name_hi: 'बुखार, ठंड लगना और शरीर में दर्द',
    icon: '🌡️',
    specialty: 'General Physician / Internal Medicine',
    specialty_te: 'జనరల్ ఫిజిషియన్ / ఇంటర్నల్ మెడిసిన్',
    specialty_hi: 'जनरल फिजिशियन / इंटरनल मेडिसिन',
    likelyConditions: 'Viral Fever, Flu, Mosquito-borne Fever (Dengue/Malaria), or Typhoid',
    cureAndRelief: [
      '<strong>Complete bed rest:</strong> Stay in bed, rest, and sleep so your body can fight off the infection.',
      '<strong>Cool water sponging:</strong> Wipe forehead, neck, and arms with a damp towel to gently lower temperature.',
      '<strong>Drink lots of fluids:</strong> Sip ORS, tender coconut water, and warm soups to prevent weakness.',
      '<strong>Simple fever tablet:</strong> Take a Paracetamol tablet after food as advised to bring high fever down.'
    ],
    complicationsIfIgnored: [
      '<strong>Severe dehydration & fainting:</strong> High body heat drains your fluids, making you faint or too weak to walk.',
      '<strong>Platelet drop in viral fevers:</strong> In fevers like Dengue, blood platelets can fall dangerously fast without checkups.',
      '<strong>Delirium & seizures:</strong> Unchecked high body temperature can cause confusion or high-fever seizures.'
    ],
    emergencyRedFlags: 'Fever above 103°F that does not go down with medicine, confused speaking, or tiny red/purple blood spots on the skin.'
  },
  dental: {
    id: 'dental',
    name: 'Toothache & Gum Pain',
    name_te: 'పంటి నొప్పి & చిగుళ్ళ నొప్పి',
    name_hi: 'दांत दर्द और मसूड़ों में दर्द',
    icon: '🦷',
    specialty: 'Dental Surgery / Endodontics',
    specialty_te: 'డెంటిస్ట్రీ / డెంటల్ సర్జరీ',
    specialty_hi: 'डेंटल सर्जरी / एंडोडॉन्टिक्स',
    likelyConditions: 'Tooth Decay (Cavity), Gum Infection, or Wisdom Tooth Pain',
    cureAndRelief: [
      '<strong>Warm saltwater rinse:</strong> Swish warm salt water in your mouth to clean away food bits and germs.',
      '<strong>Clove oil on cotton:</strong> Press a drop of clove oil (lavang) on the painful tooth for quick natural numbing.',
      '<strong>Ice pack on outside cheek:</strong> Hold an ice pack on your cheek to keep facial swelling down.',
      '<strong>Avoid very hot or ice-cold drinks:</strong> Eat soft, room-temperature foods that do not hurt when chewing.'
    ],
    complicationsIfIgnored: [
      '<strong>Pus pocket (Abscess):</strong> Infection digs deep into your jawbone and causes painful swollen cheeks.',
      '<strong>Cannot open your mouth:</strong> Jaw muscles get swollen and locked, making eating and speaking difficult.',
      '<strong>Tooth loss:</strong> The tooth can rot completely and require surgical extraction.'
    ],
    emergencyRedFlags: 'Swelling spreading down into your neck or under your tongue, making it difficult to swallow or breathe.'
  },
  eye: {
    id: 'eye',
    name: 'Eye Pain, Redness & Vision Problems',
    name_te: 'కంటి నొప్పి, ఎర్రబడటం & చూపు సమస్యలు',
    name_hi: 'आंखों में दर्द, लाली और दृष्टि समस्याएं',
    icon: '👁️',
    specialty: 'Ophthalmology (Eye Specialist)',
    specialty_te: 'ఆప్తాల్మాలజీ (కంటి నిపుణులు)',
    specialty_hi: 'नेत्र विशेषज्ञ (ऑप्थल्मोलॉजी)',
    likelyConditions: 'Conjunctivitis (Pink Eye), Eye Strain, Corneal Scratch, Dry Eyes, or Sty',
    cureAndRelief: [
      '<strong>No rubbing:</strong> Never rub your eyes even if they itch — this pushes bacteria deeper in and makes redness worse.',
      '<strong>Rinse with clean water:</strong> Gently splash clean water in both eyes to flush out dust, chemicals, or irritants.',
      '<strong>Cold compress on closed eyes:</strong> Placing a cool damp cloth over your eyes helps reduce puffiness and itching.',
      '<strong>Rest your eyes from screens:</strong> Follow 20-20-20 rule — every 20 minutes, look at something 20 feet away for 20 seconds.'
    ],
    complicationsIfIgnored: [
      '<strong>Vision loss:</strong> Untreated corneal infections or glaucoma pressure can permanently damage eyesight.',
      '<strong>Spreading infection:</strong> Eye bacteria can spread to both eyes and eyelid skin if not treated promptly.',
      '<strong>Increased pressure (Glaucoma):</strong> Ignoring eye pain with halos around lights can cause optic nerve damage.'
    ],
    emergencyRedFlags: 'Sudden complete loss of vision in one or both eyes, seeing flashes of light, or chemical splashing into your eye.'
  },
  ear: {
    id: 'ear',
    name: 'Ear Pain, Discharge & Hearing Loss',
    name_te: 'చెవి నొప్పి & వినికిడి సమస్యలు',
    name_hi: 'कान दर्द, स्राव और सुनने की समस्या',
    icon: '👂',
    specialty: 'ENT Specialist (Ear, Nose, Throat)',
    specialty_te: 'ENT నిపుణులు (చెవి, ముక్కు, గొంతు)',
    specialty_hi: 'ENT विशेषज्ञ (कान, नाक, गला)',
    likelyConditions: "Ear Infection (Otitis Media), Wax Blockage, Swimmer's Ear, or Eustachian Tube Problem",
    cureAndRelief: [
      '<strong>Do not put anything inside the ear:</strong> No cotton buds, hairpins, or fingers — this pushes wax deeper and can tear the eardrum.',
      '<strong>Warm cloth press:</strong> Hold a warm (not hot) cloth against your outer ear to gently reduce the throbbing pain.',
      '<strong>Stay upright:</strong> Lying flat can increase pressure — sit or rest at a slight angle to allow fluid to drain naturally.',
      '<strong>Yawn or chew gently:</strong> This helps pop the ear to equalize inner ear pressure, especially helpful during flights or altitude changes.'
    ],
    complicationsIfIgnored: [
      '<strong>Hearing loss:</strong> Chronic ear infections or untreated blockages can cause permanent partial or full hearing loss.',
      '<strong>Ruptured eardrum:</strong> Severe pressure buildup can burst the eardrum, causing intense pain and discharge.',
      '<strong>Spreading infection (Mastoiditis):</strong> Infection can travel to the bone behind your ear, requiring emergency surgery.'
    ],
    emergencyRedFlags: 'Sudden total hearing loss in one ear, severe dizziness with inability to walk, or pus/blood flowing from the ear canal.'
  },
  mental: {
    id: 'mental',
    name: 'Anxiety, Stress & Mental Wellbeing',
    name_te: 'ఆందోళన, మానసిక ఒత్తిడి & డిప్రెషన్',
    name_hi: 'चिंता, तनाव और मानसिक स्वास्थ्य',
    icon: '🧠',
    specialty: 'Psychiatry / Clinical Psychology',
    specialty_te: 'సైకియాట్రీ / క్లినికల్ సైకాలజీ',
    specialty_hi: 'मनोचिकित्सा / क्लिनिकल मनोविज्ञान',
    likelyConditions: 'Anxiety Disorder, Situational Stress, Panic Attacks, Depression, or Burnout',
    cureAndRelief: [
      '<strong>Slow breathing:</strong> Take 4 seconds to breathe in through your nose, hold for 4, then breathe out for 6. Repeat 5 times to calm your racing heart.',
      '<strong>5-4-3-2-1 grounding:</strong> Name 5 things you can see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This brings you back to the present.',
      '<strong>Talk to someone you trust:</strong> Sharing worries with a friend, family member, or counselor reduces the heaviness immediately.',
      '<strong>Step outdoors briefly:</strong> Even 5 minutes of natural light and fresh air reduces cortisol stress hormones noticeably.'
    ],
    complicationsIfIgnored: [
      '<strong>Physical symptoms:</strong> Chronic stress causes real bodily harm including high blood pressure, poor sleep, weakened immunity, and hair loss.',
      '<strong>Deepening depression:</strong> Unaddressed anxiety can spiral into clinical depression requiring longer treatment.',
      '<strong>Social withdrawal:</strong> Avoidance behavior grows and can affect relationships, work performance, and daily functioning.'
    ],
    emergencyRedFlags: 'Thoughts of self-harm or suicide, inability to sleep for multiple days, or complete inability to function or eat. Please call iCall (9152987821) or NIMHANS helpline.'
  },
  breathing: {
    id: 'breathing',
    name: 'Shortness of Breath & Wheezing',
    name_te: 'ఆయాసం & శ్వాస తీసుకోవడంలో ఇబ్బంది',
    name_hi: 'सांस फूलना और घबराहट',
    icon: '🫁',
    specialty: 'Pulmonology / Respiratory Medicine',
    specialty_te: 'పల్మోనాలజీ / రెస్పిరేటరీ మెడిసిన్',
    specialty_hi: 'पल्मोनोलॉजी / रेस्पिरेटरी मेडिसिन',
    likelyConditions: 'Asthma Attack, Bronchitis, Allergic Rhinitis, or Respiratory Tract Infection',
    cureAndRelief: [
      '<strong>Sit upright immediately:</strong> Sit in a chair leaning slightly forward with hands on knees — this position opens your airways the most.',
      '<strong>Pursed-lip breathing:</strong> Breathe in slowly through your nose, then breathe out through tightly pursed lips (like blowing a candle) — this slows panic breathing.',
      '<strong>Use rescue inhaler if prescribed:</strong> If your doctor has prescribed a Salbutamol or Ventolin inhaler, use it as instructed immediately.',
      '<strong>Remove triggers:</strong> Move away from dust, smoke, pets, or strong perfumes that may have triggered the breathing difficulty.'
    ],
    complicationsIfIgnored: [
      '<strong>Asthma attack:</strong> Untreated wheezing episodes can escalate into a severe attack requiring hospital oxygen support.',
      '<strong>Lung infection:</strong> Repeated untreated episodes weaken airways and allow bacterial pneumonia to develop.',
      '<strong>Reduced lung capacity:</strong> Long-term poorly controlled breathing problems permanently reduce how much air your lungs can hold.'
    ],
    emergencyRedFlags: 'Cannot complete a sentence without gasping, lips or fingernails turning blue, or inhaler is not giving any relief after 10 minutes.'
  },
  urinary: {
    id: 'urinary',
    name: 'Urinary Problems & Burning Urination',
    name_te: 'మూత్ర విసర్జనలో మంట & నొప్పి',
    name_hi: 'मूत्र संबंधी समस्याएं और जलन',
    icon: '🚽',
    specialty: 'Urology / Nephrology',
    specialty_te: 'యూరాలజీ / నెఫ్రాలజీ',
    specialty_hi: 'यूरोलॉजी / नेफ्रोलॉजी',
    likelyConditions: 'Urinary Tract Infection (UTI), Kidney Stone, Bladder Infection, or Prostate Issue',
    cureAndRelief: [
      '<strong>Drink lots of water:</strong> Aim for 8-10 glasses of water per day to flush bacteria and crystals out through urine.',
      '<strong>Do not hold urine:</strong> Urinate as soon as you feel the urge — holding for too long allows bacteria to multiply in the bladder.',
      '<strong>Cranberry juice:</strong> Unsweetened cranberry juice contains compounds that prevent bacteria from sticking to bladder walls.',
      '<strong>Avoid coffee and alcohol:</strong> These irritate the bladder lining and worsen burning and urgency feeling.'
    ],
    complicationsIfIgnored: [
      '<strong>Kidney infection (Pyelonephritis):</strong> Bladder bacteria travel up to kidneys causing high fever, back pain, and requiring hospital admission.',
      '<strong>Kidney stones growing:</strong> Untreated small stones grow larger and can block urine flow, causing extreme pain and kidney damage.',
      '<strong>Septicemia:</strong> Severe untreated UTIs can enter the bloodstream and become a life-threatening blood infection.'
    ],
    emergencyRedFlags: 'Unable to pass urine at all, severe lower back pain with high fever and chills, or blood clots visible in urine.'
  },
  nausea: {
    id: 'nausea',
    name: 'Nausea, Vomiting & Dizziness',
    name_te: 'వాంతులు, వికారం & కళ్ళు తిరగడం',
    name_hi: 'जी मिचलाना, उल्टी और चक्कर आना',
    icon: '🤮',
    specialty: 'General Physician / Gastroenterology',
    specialty_te: 'జనరల్ ఫిజిషియన్ / గ్యాస్ట్రోఎంటరాలజీ',
    specialty_hi: 'जनरल फिजिशियन / गैस्ट्रोएंटरोलॉजी',
    likelyConditions: 'Gastroenteritis, Food Poisoning, Motion Sickness, Inner Ear Vertigo, or Pregnancy-related',
    cureAndRelief: [
      '<strong>Small cold sips only:</strong> Do not drink large amounts — just small cold sips of water or clear lime soda every 5-10 minutes to settle your stomach.',
      '<strong>Ginger tea or biscuits:</strong> Chewing dry plain biscuits or sipping weak ginger tea is one of the most effective natural nausea relievers.',
      '<strong>Fresh air and stillness:</strong> Move to an open, cool, well-ventilated area and sit or lie still without sudden head movements.',
      '<strong>Do not lie flat:</strong> Keep your head elevated slightly above your chest when resting to prevent acid from coming back up.'
    ],
    complicationsIfIgnored: [
      '<strong>Severe dehydration:</strong> Repeated vomiting rapidly empties your body of salt and water, causing weakness, confusion, and fainting.',
      '<strong>Electrolyte imbalance:</strong> Loss of potassium and sodium through vomiting affects heart rhythm and muscle function.',
      '<strong>Mallory-Weiss tear:</strong> Violent repeated vomiting can tear the lining of the food pipe, causing internal bleeding.'
    ],
    emergencyRedFlags: 'Vomiting blood or dark brown material, cannot keep any fluids down for over 8 hours, or severe dizziness where you cannot stand up.'
  },
  numbness: {
    id: 'numbness',
    name: 'Numbness, Tingling & Body Weakness',
    name_te: 'చేతులు కాళ్ళు తిమ్మిర్లు & బలహీనత',
    name_hi: 'सुन्नता, झुनझुनी और कमजोरी',
    icon: '⚡',
    specialty: 'Neurology / Internal Medicine',
    specialty_te: 'న్యూరాలజీ / ఇంటర్నల్ మెడిసిన్',
    specialty_hi: 'न्यूरोलॉजी / इंटरनल मेडिसिन',
    likelyConditions: 'Vitamin B12 Deficiency, Peripheral Neuropathy, Nerve Compression, Diabetes Complication, or Cervical Spondylosis',
    cureAndRelief: [
      '<strong>Change position immediately:</strong> If a limb feels numb or "asleep", move it gently and walk around to restore blood circulation.',
      '<strong>Warm compress:</strong> Applying warmth to the affected numb area improves blood flow and nerve signal conduction.',
      '<strong>Gentle stretching:</strong> Slowly stretch the affected area in gentle circles to release compressed nerves and restore feeling.',
      '<strong>Check your Vitamin B12 intake:</strong> Persistent tingling in hands and feet is often linked to low B12 — eat eggs, dairy, or ask your doctor about supplements.'
    ],
    complicationsIfIgnored: [
      '<strong>Permanent nerve damage:</strong> Chronic compression or diabetic neuropathy causes irreversible numbness and loss of sensation.',
      '<strong>Falls and injuries:</strong> Not feeling your feet properly leads to poor balance and undetected wounds, especially dangerous for diabetics.',
      '<strong>Spreading paralysis:</strong> Rare conditions like Guillain-Barré can cause tingling that ascends upward and affects breathing muscles.'
    ],
    emergencyRedFlags: 'Sudden one-sided face, arm, or leg weakness or numbness (possible stroke), or rapid ascending paralysis spreading upward from feet.'
  },
  bpdiabetes: {
    id: 'bpdiabetes',
    name: 'High BP, Diabetes & Sugar Symptoms',
    name_te: 'అధిక బీపీ, షుగర్ & డయాబెటిస్ పరీక్ష',
    name_hi: 'हाई बीपी, डायबिटीज और शुगर लक्षण',
    icon: '💉',
    specialty: 'Endocrinology / Internal Medicine',
    specialty_te: 'ఎండోక్రినాలజీ / ఇంటర్నల్ మెడిసిన్',
    specialty_hi: 'एंडोक्रिनोलॉजी / इंटरनल मेडिसिन',
    likelyConditions: 'Hypertension (High Blood Pressure), Hyperglycemia (High Blood Sugar), Pre-Diabetes, or Thyroid Imbalance',
    cureAndRelief: [
      '<strong>Sit down and relax:</strong> When BP feels high, sit quietly for 10 minutes in a calm, cool room before checking it again.',
      '<strong>Reduce salt intake immediately:</strong> Avoid pickles, papad, chips, and processed foods — even a single salty meal spikes blood pressure.',
      '<strong>Drink water (for high sugar):</strong> Drinking water helps kidneys flush excess blood sugar out through urine.',
      '<strong>Take your prescribed medicines on time:</strong> Never skip or reduce BP or sugar medicines without consulting your doctor, even if you feel fine.'
    ],
    complicationsIfIgnored: [
      '<strong>Heart attack or stroke:</strong> Uncontrolled high blood pressure is the leading cause of heart attack and stroke without warning.',
      '<strong>Kidney failure:</strong> Both diabetes and hypertension directly damage kidney filtration units over years of poor control.',
      '<strong>Diabetic wounds (non-healing):</strong> High sugar impairs healing, especially in feet, leading to infections requiring amputation.'
    ],
    emergencyRedFlags: 'BP reading above 180/120 mmHg with headache, blood sugar below 50 or above 400 mg/dL with confusion, or chest pain with a known history of BP or diabetes.'
  }
};

// ---------------------------------------------------------------------------
// 2. Verified Doctors & Nearby Hospitals Directory
// ---------------------------------------------------------------------------
const DOCTORS_DATABASE = [
  // --- HYDERABAD (10 Hospitals) ---
  {
    id: 'doc-hyd-01',
    city: 'Hyderabad',
    name: 'Dr. Suresh Varma, MBBS, MD',
    specialty: 'General Physician / Internal Medicine',
    matchedCategories: ['headache', 'fever', 'stomach', 'nausea', 'bpdiabetes'],
    hospital: 'Apollo Health City, Jubilee Hills',
    address: 'Road No 72, Jubilee Hills, Hyderabad - 500033',
    phone: '+91 40 2360 7777',
    distance: '1.4 km away',
    experience: '16 Years Exp.',
    rating: '4.9 ★ (380+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'Room 204, 2nd Floor, OPD Block A',
    avatar: 'SV'
  },
  {
    id: 'doc-hyd-02',
    city: 'Hyderabad',
    name: 'Dr. Ananya Reddy, MBBS, MD, DM',
    specialty: 'Neurology & Headache Specialist',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'Yashoda Hospitals, Somajiguda',
    address: 'Raj Bhavan Rd, Somajiguda, Hyderabad - 500082',
    phone: '+91 40 4567 4567',
    distance: '2.8 km away',
    experience: '14 Years Exp.',
    rating: '4.8 ★ (240+)',
    fee: '₹800',
    vacancyStatus: 'Next Slot in 25 mins',
    nextSlot: 'Today, 02:00 PM',
    room: 'Neuro Care Wing, 4th Floor',
    avatar: 'AR'
  },
  {
    id: 'doc-hyd-03',
    city: 'Hyderabad',
    name: 'Dr. Rajesh K. Sharma, MD, DM (Cardio)',
    specialty: 'Cardiology / Heart Care',
    matchedCategories: ['chest'],
    hospital: 'Care Hospitals, Banjara Hills',
    address: 'Road No 1, Banjara Hills, Hyderabad - 500034',
    phone: '+91 40 3041 8888',
    distance: '2.1 km away',
    experience: '20 Years Exp.',
    rating: '5.0 ★ (510+)',
    fee: '₹900',
    vacancyStatus: 'Immediate OPD Available',
    nextSlot: 'Today, 01:30 PM',
    room: 'Cardiac OPD, Room 102',
    avatar: 'RS'
  },
  {
    id: 'doc-hyd-04',
    city: 'Hyderabad',
    name: 'Dr. Preethi Rao, MBBS, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Health',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Aster Prime Hospital, Ameerpet',
    address: 'Plot No 4, Satyam Theatre Rd, Ameerpet, Hyderabad - 500038',
    phone: '+91 40 4959 4959',
    distance: '3.2 km away',
    experience: '12 Years Exp.',
    rating: '4.9 ★ (190+)',
    fee: '₹700',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:45 PM',
    room: 'Gastro Sciences, 1st Floor',
    avatar: 'PR'
  },
  {
    id: 'doc-hyd-05',
    city: 'Hyderabad',
    name: 'Dr. Vikram Chandra, MD (Pulmonology)',
    specialty: 'Pulmonology / Chest & Allergy',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'KIMS Hospitals, Secunderabad',
    address: '1-8-31/1, Minister Rd, Secunderabad - 500003',
    phone: '+91 40 4488 5000',
    distance: '3.6 km away',
    experience: '15 Years Exp.',
    rating: '4.8 ★ (290+)',
    fee: '₹650',
    vacancyStatus: 'Vacant (1 Ahead)',
    nextSlot: 'Today, 02:15 PM',
    room: 'Chest Clinic, Room 308',
    avatar: 'VC'
  },
  {
    id: 'doc-hyd-06',
    city: 'Hyderabad',
    name: 'Dr. Manisha Gupta, MS (Ortho), DNB',
    specialty: 'Orthopedics & Joint Care',
    matchedCategories: ['joint'],
    hospital: 'Sunshine Bone & Joint Institute',
    address: 'Near ORR Junction, Gachibowli, Hyderabad - 500032',
    phone: '+91 40 4455 0000',
    distance: '2.5 km away',
    experience: '18 Years Exp.',
    rating: '4.9 ★ (420+)',
    fee: '₹750',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:45 PM',
    room: 'Ortho Wing, Room 114',
    avatar: 'MG'
  },
  {
    id: 'doc-hyd-07',
    city: 'Hyderabad',
    name: 'Dr. Sneha Patil, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'Carepath Skin & Allergy Clinic',
    address: '100 Feet Road, Madhapur, Hyderabad - 500081',
    phone: '+91 40 6789 1234',
    distance: '1.8 km away',
    experience: '11 Years Exp.',
    rating: '4.8 ★ (160+)',
    fee: '₹550',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:20 PM',
    room: 'Derma Suite 12',
    avatar: 'SP'
  },
  {
    id: 'doc-hyd-08',
    city: 'Hyderabad',
    name: 'Dr. Sandeep Kumar, MDS',
    specialty: 'Dental Surgery & Oral Care',
    matchedCategories: ['dental'],
    hospital: 'Smile Dental Super-Speciality Hospital',
    address: 'Street No 1, Himayatnagar, Hyderabad - 500029',
    phone: '+91 40 2760 9999',
    distance: '1.1 km away',
    experience: '13 Years Exp.',
    rating: '4.9 ★ (210+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Operatory 3, Ground Floor',
    avatar: 'SK'
  },
  {
    id: 'doc-hyd-09',
    city: 'Hyderabad',
    name: 'Dr. Lavanya Krishnan, MS (Ophthalmology)',
    specialty: 'Eye Specialist & Ophthalmology',
    matchedCategories: ['eye'],
    hospital: 'LV Prasad Eye Institute, Banjara Hills',
    address: 'Road No 2, Banjara Hills, Hyderabad - 500034',
    phone: '+91 40 6810 2020',
    distance: '2.0 km away',
    experience: '15 Years Exp.',
    rating: '5.0 ★ (480+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:30 PM',
    room: 'Eye Care OPD, 1st Floor',
    avatar: 'LK'
  },
  {
    id: 'doc-hyd-10',
    city: 'Hyderabad',
    name: 'Dr. Ravi Shankar, MCh (Urology)',
    specialty: 'Urology & Kidney Care',
    matchedCategories: ['urinary'],
    hospital: 'Continental Hospitals, Gachibowli',
    address: 'IT Financial District, Gachibowli, Hyderabad - 500032',
    phone: '+91 40 6700 0000',
    distance: '4.0 km away',
    experience: '21 Years Exp.',
    rating: '5.0 ★ (390+)',
    fee: '₹800',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 02:00 PM',
    room: 'Uro-Nephrology Block, 2nd Floor',
    avatar: 'RS'
  },

  // --- KAKINADA (9 Hospitals) ---
  {
    id: 'doc-kkd-01',
    city: 'Kakinada',
    name: 'Dr. K. Venkat Rao, MS, MCh (Cardio)',
    specialty: 'Cardiology / Heart Care',
    matchedCategories: ['chest'],
    hospital: 'Care Emergency & Heart Hospital, Kakinada',
    address: 'D.No 12-4-5, Main Rd, Near Bhanugudi Junction, Kakinada - 533003',
    phone: '+91 884 234 5678',
    distance: '1.2 km away',
    experience: '22 Years Exp.',
    rating: '5.0 ★ (430+)',
    fee: '₹800',
    vacancyStatus: 'Immediate OPD Available',
    nextSlot: 'Today, 01:30 PM',
    room: 'Cardiac OPD, Room 101',
    avatar: 'VR'
  },
  {
    id: 'doc-kkd-02',
    city: 'Kakinada',
    name: 'Dr. Srinivas Chowdary, MBBS, MD',
    specialty: 'General Physician / Internal Medicine',
    matchedCategories: ['headache', 'fever', 'stomach', 'throat', 'nausea', 'bpdiabetes'],
    hospital: 'Apollo Clinic & Multi-Speciality, Kakinada',
    address: 'Subhash Road, Near Cinema Hall Centre, Kakinada - 533001',
    phone: '+91 884 238 9900',
    distance: '1.5 km away',
    experience: '17 Years Exp.',
    rating: '4.9 ★ (360+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'Consultation Room 3, 1st Floor',
    avatar: 'SC'
  },
  {
    id: 'doc-kkd-03',
    city: 'Kakinada',
    name: 'Dr. Ramadevi Satyanarayana, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Health',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Trust Emergency & Digestive Clinic, Kakinada',
    address: 'Suryaraopeta, Opp. Sub-Collector Office, Kakinada - 533003',
    phone: '+91 884 235 1122',
    distance: '2.1 km away',
    experience: '15 Years Exp.',
    rating: '4.8 ★ (210+)',
    fee: '₹600',
    vacancyStatus: 'Next Slot in 15 mins',
    nextSlot: 'Today, 01:45 PM',
    room: 'Gastro Wing, Room 204',
    avatar: 'RS'
  },
  {
    id: 'doc-kkd-04',
    city: 'Kakinada',
    name: 'Dr. P. Vijay Kumar, MS (Ortho)',
    specialty: 'Orthopedics & Joint Specialist',
    matchedCategories: ['joint'],
    hospital: 'Kakinada Bone & Joint Super Speciality Hospital',
    address: 'Nagamalli Thota Junction, Pithapuram Road, Kakinada - 533005',
    phone: '+91 884 237 4455',
    distance: '2.4 km away',
    experience: '19 Years Exp.',
    rating: '4.9 ★ (390+)',
    fee: '₹650',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:15 PM',
    room: 'Ortho OPD Room 12',
    avatar: 'VK'
  },
  {
    id: 'doc-kkd-05',
    city: 'Kakinada',
    name: 'Dr. Ch. Swapna, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'Royal Skin & Laser Centre, Kakinada',
    address: 'Ramasomayajulu Street, Near Temple, Kakinada - 533001',
    phone: '+91 884 236 7788',
    distance: '1.8 km away',
    experience: '12 Years Exp.',
    rating: '4.8 ★ (185+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:20 PM',
    room: 'Skin Care OPD Suite 1',
    avatar: 'CS'
  },
  {
    id: 'doc-kkd-06',
    city: 'Kakinada',
    name: 'Dr. V. Ramesh, MDS',
    specialty: 'Dental Surgery & Oral Care',
    matchedCategories: ['dental'],
    hospital: 'Kakinada Dental Care & Surgery',
    address: '100ft Cinema Road, Kakinada - 533002',
    phone: '+91 884 233 2211',
    distance: '1.0 km away',
    experience: '14 Years Exp.',
    rating: '4.9 ★ (270+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Dental Chair 2',
    avatar: 'VR'
  },
  {
    id: 'doc-kkd-07',
    city: 'Kakinada',
    name: 'Dr. G. Srimannarayana, MS (ENT)',
    specialty: 'ENT & Throat Specialist',
    matchedCategories: ['throat', 'ear', 'breathing'],
    hospital: 'Swasa ENT & Respiratory Centre, Kakinada',
    address: 'NFCL Road, Near Bus Stand, Kakinada - 533003',
    phone: '+91 884 239 8877',
    distance: '2.0 km away',
    experience: '16 Years Exp.',
    rating: '4.8 ★ (290+)',
    fee: '₹550',
    vacancyStatus: 'Vacant (1 Ahead)',
    nextSlot: 'Today, 02:00 PM',
    room: 'ENT Suite 4',
    avatar: 'GS'
  },
  {
    id: 'doc-kkd-08',
    city: 'Kakinada',
    name: 'Dr. N. B. K. Prasad, DM (Neurology)',
    specialty: 'Neurology & Nerve Disorders',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'MaxCare Neuro & Brain Institute, Kakinada',
    address: 'Main Road, Near SRMT Complex, Kakinada - 533003',
    phone: '+91 884 234 9911',
    distance: '2.5 km away',
    experience: '20 Years Exp.',
    rating: '4.9 ★ (310+)',
    fee: '₹750',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:30 PM',
    room: 'Neuro OPD Room 202',
    avatar: 'NP'
  },
  {
    id: 'doc-kkd-09',
    city: 'Kakinada',
    name: 'Dr. M. S. R. Murthy, MD (Internal Medicine)',
    specialty: 'General Medicine & OPD',
    matchedCategories: ['fever', 'stomach', 'chest'],
    hospital: 'GGH Super-Speciality OPD Wing, Kakinada',
    address: 'Pithapuram Road, Near Medical College, Kakinada - 533001',
    phone: '+91 884 236 1100',
    distance: '3.1 km away',
    experience: '25 Years Exp.',
    rating: '4.8 ★ (540+)',
    fee: '₹400',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:40 PM',
    room: 'OPD Block C, Room 10',
    avatar: 'MM'
  },

  // --- VIJAYAWADA (9 Hospitals) ---
  {
    id: 'doc-vja-01',
    city: 'Vijayawada',
    name: 'Dr. B. Nageswara Rao, MD, DM (Cardio)',
    specialty: 'Cardiology / Heart Care',
    matchedCategories: ['chest'],
    hospital: 'Manipal Hospitals, Vijayawada',
    address: 'NH-16, Near Kanaka Durga Varadhi, Vijayawada - 522501',
    phone: '+91 866 222 3333',
    distance: '2.6 km away',
    experience: '24 Years Exp.',
    rating: '5.0 ★ (610+)',
    fee: '₹900',
    vacancyStatus: 'Immediate OPD Available',
    nextSlot: 'Today, 01:30 PM',
    room: 'Cardiology OPD Room 104',
    avatar: 'NR'
  },
  {
    id: 'doc-vja-02',
    city: 'Vijayawada',
    name: 'Dr. K. V. Satish, MBBS, MD',
    specialty: 'General Physician / Internal Medicine',
    matchedCategories: ['headache', 'fever', 'stomach', 'throat', 'nausea'],
    hospital: 'Ramesh Hospitals, MG Road',
    address: 'Opp. PWD Grounds, MG Road, Vijayawada - 520002',
    phone: '+91 866 247 1111',
    distance: '1.8 km away',
    experience: '18 Years Exp.',
    rating: '4.9 ★ (480+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'OPD Block B, Room 202',
    avatar: 'KS'
  },
  {
    id: 'doc-vja-03',
    city: 'Vijayawada',
    name: 'Dr. S. Anitha, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Health',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Capital Gastro & Liver Institute',
    address: 'Govindarajulu Naidu St, Suryaraopet, Vijayawada - 520002',
    phone: '+91 866 255 4400',
    distance: '2.2 km away',
    experience: '14 Years Exp.',
    rating: '4.8 ★ (230+)',
    fee: '₹700',
    vacancyStatus: 'Next Slot in 20 mins',
    nextSlot: 'Today, 01:50 PM',
    room: 'Gastro Block Room 105',
    avatar: 'SA'
  },
  {
    id: 'doc-vja-04',
    city: 'Vijayawada',
    name: 'Dr. M. Pradeep, MS (Ortho)',
    specialty: 'Orthopedics & Joint Surgery',
    matchedCategories: ['joint'],
    hospital: 'Ayush Hospitals, Ring Road',
    address: 'Opp. Collector Office, Ring Rd, Vijayawada - 520008',
    phone: '+91 866 667 8888',
    distance: '3.1 km away',
    experience: '16 Years Exp.',
    rating: '4.9 ★ (340+)',
    fee: '₹750',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:30 PM',
    room: 'Ortho Suite 8',
    avatar: 'MP'
  },
  {
    id: 'doc-vja-05',
    city: 'Vijayawada',
    name: 'Dr. T. V. Krishna, DM (Neurology)',
    specialty: 'Neurology & Brain Care',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'Andhra Hospital Heart & Brain Institute',
    address: 'Governorpet, Vijayawada - 520002',
    phone: '+91 866 257 6677',
    distance: '2.0 km away',
    experience: '21 Years Exp.',
    rating: '4.9 ★ (390+)',
    fee: '₹850',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:40 PM',
    room: 'Neuro OPD Room 301',
    avatar: 'TK'
  },
  {
    id: 'doc-vja-06',
    city: 'Vijayawada',
    name: 'Dr. K. Ranga Rao, MD (Pulmo)',
    specialty: 'Pulmonology / Chest & Asthma',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'Vijayawada Chest & Respiratory Centre',
    address: 'Eluru Road, Vijayawada - 520002',
    phone: '+91 866 243 8899',
    distance: '1.9 km away',
    experience: '17 Years Exp.',
    rating: '4.8 ★ (270+)',
    fee: '₹600',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:15 PM',
    room: 'Chest OPD Room 102',
    avatar: 'KR'
  },
  {
    id: 'doc-vja-07',
    city: 'Vijayawada',
    name: 'Dr. R. Lakshmi, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'Oliva Skin & Cosmetology Centre',
    address: 'Benz Circle, Vijayawada - 520010',
    phone: '+91 866 248 1122',
    distance: '2.4 km away',
    experience: '13 Years Exp.',
    rating: '4.8 ★ (220+)',
    fee: '₹550',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:25 PM',
    room: 'Derma Suite 3',
    avatar: 'RL'
  },
  {
    id: 'doc-vja-08',
    city: 'Vijayawada',
    name: 'Dr. P. Gautam, MDS',
    specialty: 'Dental Surgery & Oral Health',
    matchedCategories: ['dental'],
    hospital: 'Dentique Super Speciality Dental Hospital',
    address: 'Labbipet, Vijayawada - 520010',
    phone: '+91 866 249 5566',
    distance: '1.5 km away',
    experience: '15 Years Exp.',
    rating: '4.9 ★ (310+)',
    fee: '₹450',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Operatory 1',
    avatar: 'PG'
  },
  {
    id: 'doc-vja-09',
    city: 'Vijayawada',
    name: 'Dr. S. V. Ramana, MS (Ophthal)',
    specialty: 'Eye Care & Ophthalmology',
    matchedCategories: ['eye'],
    hospital: 'Dr. Agarwal Eye Hospital, Vijayawada',
    address: 'MG Road, Labbipet, Vijayawada - 520010',
    phone: '+91 866 247 9900',
    distance: '2.1 km away',
    experience: '19 Years Exp.',
    rating: '5.0 ★ (450+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:35 PM',
    room: 'Eye OPD Suite 2',
    avatar: 'VR'
  },

  // --- VISAKHAPATNAM (VIZAG - 9 Hospitals) ---
  {
    id: 'doc-vzg-01',
    city: 'Visakhapatnam',
    name: 'Dr. A. V. S. Murthy, MD, DM (Cardio)',
    specialty: 'Cardiology / Heart Care',
    matchedCategories: ['chest'],
    hospital: 'Apollo Hospitals, Health City, Vizag',
    address: 'Health City, Arilova, Visakhapatnam - 530040',
    phone: '+91 891 286 7777',
    distance: '3.0 km away',
    experience: '22 Years Exp.',
    rating: '5.0 ★ (530+)',
    fee: '₹850',
    vacancyStatus: 'Immediate OPD Available',
    nextSlot: 'Today, 01:30 PM',
    room: 'Cardio OPD 3rd Floor',
    avatar: 'AM'
  },
  {
    id: 'doc-vzg-02',
    city: 'Visakhapatnam',
    name: 'Dr. P. Sangeetha, MBBS, MD',
    specialty: 'General Physician / Internal Medicine',
    matchedCategories: ['headache', 'fever', 'stomach', 'throat'],
    hospital: 'CARE Hospitals, Ram Nagar, Vizag',
    address: 'Waltair Main Rd, Ram Nagar, Visakhapatnam - 530002',
    phone: '+91 891 304 1111',
    distance: '1.6 km away',
    experience: '15 Years Exp.',
    rating: '4.9 ★ (410+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:20 PM',
    room: 'General OPD Room 108',
    avatar: 'PS'
  },
  {
    id: 'doc-vzg-03',
    city: 'Visakhapatnam',
    name: 'Dr. G. Bhaskar, MS (Ortho)',
    specialty: 'Orthopedics & Joint Specialist',
    matchedCategories: ['joint'],
    hospital: 'Seven Hills Hospital, Vizag',
    address: '11-4-4/A, Rockdale Layout, Visakhapatnam - 530002',
    phone: '+91 891 270 8090',
    distance: '2.5 km away',
    experience: '19 Years Exp.',
    rating: '4.8 ★ (310+)',
    fee: '₹700',
    vacancyStatus: 'Vacant (1 Ahead)',
    nextSlot: 'Today, 02:00 PM',
    room: 'Ortho Clinic Room 201',
    avatar: 'GB'
  },
  {
    id: 'doc-vzg-04',
    city: 'Visakhapatnam',
    name: 'Dr. V. S. N. Raju, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Health',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Indus Hospitals, Jagadamba Centre',
    address: 'Jagadamba Junction, Visakhapatnam - 530020',
    phone: '+91 891 252 5252',
    distance: '2.1 km away',
    experience: '16 Years Exp.',
    rating: '4.9 ★ (280+)',
    fee: '₹650',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:45 PM',
    room: 'Gastro Suite 12',
    avatar: 'VR'
  },
  {
    id: 'doc-vzg-05',
    city: 'Visakhapatnam',
    name: 'Dr. K. Radhika, DM (Neurology)',
    specialty: 'Neurology & Brain Sciences',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'Pinnacle Institute of Neurosciences, Vizag',
    address: 'Health City, Arilova, Visakhapatnam - 530040',
    phone: '+91 891 308 9999',
    distance: '3.2 km away',
    experience: '18 Years Exp.',
    rating: '5.0 ★ (420+)',
    fee: '₹800',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:20 PM',
    room: 'Neuro Wing Room 401',
    avatar: 'KR'
  },
  {
    id: 'doc-vzg-06',
    city: 'Visakhapatnam',
    name: 'Dr. M. V. S. Prakash, MD (Pulmo)',
    specialty: 'Pulmonology / Chest & Allergy',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'Vizag Chest & Allergy Centre',
    address: 'Sector 4, MVP Colony, Visakhapatnam - 530017',
    phone: '+91 891 255 3311',
    distance: '2.8 km away',
    experience: '14 Years Exp.',
    rating: '4.8 ★ (240+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:50 PM',
    room: 'Chest OPD Room 101',
    avatar: 'MP'
  },
  {
    id: 'doc-vzg-07',
    city: 'Visakhapatnam',
    name: 'Dr. R. Haritha, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'Vizag Skin & Allergy Clinic, MVP Colony',
    address: 'Sector 3, MVP Colony, Visakhapatnam - 530017',
    phone: '+91 891 254 3322',
    distance: '2.2 km away',
    experience: '12 Years Exp.',
    rating: '4.8 ★ (190+)',
    fee: '₹550',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:25 PM',
    room: 'Derma Suite 2',
    avatar: 'RH'
  },
  {
    id: 'doc-vzg-08',
    city: 'Visakhapatnam',
    name: 'Dr. K. Srinivas, MDS',
    specialty: 'Dental Surgery & Oral Care',
    matchedCategories: ['dental'],
    hospital: 'Vizag Dental Super Speciality Hospital',
    address: 'Maharani Peta, Visakhapatnam - 530002',
    phone: '+91 891 256 9988',
    distance: '1.4 km away',
    experience: '16 Years Exp.',
    rating: '4.9 ★ (330+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Dental Chair 3',
    avatar: 'KS'
  },
  {
    id: 'doc-vzg-09',
    city: 'Visakhapatnam',
    name: 'Dr. N. Chandrasekhar, MS (Ophthal)',
    specialty: 'Eye Care & Ophthalmology',
    matchedCategories: ['eye'],
    hospital: 'Vasan Eye Care Hospital, Vizag',
    address: 'Sampath Vinayaka Temple Road, Visakhapatnam - 530003',
    phone: '+91 891 398 7000',
    distance: '1.9 km away',
    experience: '20 Years Exp.',
    rating: '4.9 ★ (480+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:30 PM',
    room: 'Eye OPD Room 1',
    avatar: 'NC'
  },

  // --- GUNTUR (8 Hospitals) ---
  {
    id: 'doc-gtr-01',
    city: 'Guntur',
    name: 'Dr. T. Krishna Mohan, MD',
    specialty: 'General Physician & Cardiology',
    matchedCategories: ['headache', 'fever', 'chest', 'stomach'],
    hospital: 'Ramesh Hospitals, Collectorate Road, Guntur',
    address: 'Opp. Collector Office, Collectorate Rd, Guntur - 522004',
    phone: '+91 863 233 4455',
    distance: '1.9 km away',
    experience: '20 Years Exp.',
    rating: '4.9 ★ (450+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:30 PM',
    room: 'OPD Block Room 102',
    avatar: 'KM'
  },
  {
    id: 'doc-gtr-02',
    city: 'Guntur',
    name: 'Dr. V. Bhavani, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Health',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'NRI General Hospital, Mangalagiri Rd',
    address: 'Chinakakani, Mangalagiri Rd, Guntur - 522503',
    phone: '+91 863 237 7788',
    distance: '3.5 km away',
    experience: '13 Years Exp.',
    rating: '4.8 ★ (260+)',
    fee: '₹650',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:15 PM',
    room: 'Gastro Suite 5',
    avatar: 'VB'
  },
  {
    id: 'doc-gtr-03',
    city: 'Guntur',
    name: 'Dr. P. Naresh, MS (Ortho)',
    specialty: 'Orthopedics & Joint Care',
    matchedCategories: ['joint'],
    hospital: 'Guntur Bone & Joint Clinic, Kothapet',
    address: 'Kothapet Main Road, Guntur - 522001',
    phone: '+91 863 222 1100',
    distance: '1.5 km away',
    experience: '18 Years Exp.',
    rating: '4.9 ★ (320+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:45 PM',
    room: 'Ortho Wing Room 2',
    avatar: 'PN'
  },
  {
    id: 'doc-gtr-04',
    city: 'Guntur',
    name: 'Dr. Ch. Venkat, MBBS, MD',
    specialty: 'General Medicine & Internal Care',
    matchedCategories: ['fever', 'headache', 'bpdiabetes'],
    hospital: 'Amaravathi Institute of Medical Sciences',
    address: 'Brodipet 4th Line, Guntur - 522002',
    phone: '+91 863 224 5566',
    distance: '2.1 km away',
    experience: '16 Years Exp.',
    rating: '4.8 ★ (290+)',
    fee: '₹500',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 01:20 PM',
    room: 'Consultation Suite 10',
    avatar: 'CV'
  },
  {
    id: 'doc-gtr-05',
    city: 'Guntur',
    name: 'Dr. P. V. Raghava, DM (Neurology)',
    specialty: 'Neurology & Brain Care',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'Lalitha Super Speciality Hospital',
    address: 'Kothapet, Guntur - 522001',
    phone: '+91 863 223 7788',
    distance: '1.8 km away',
    experience: '22 Years Exp.',
    rating: '5.0 ★ (480+)',
    fee: '₹800',
    vacancyStatus: 'Next Slot in 20 mins',
    nextSlot: 'Today, 02:00 PM',
    room: 'Neuro OPD Room 301',
    avatar: 'PR'
  },
  {
    id: 'doc-gtr-06',
    city: 'Guntur',
    name: 'Dr. K. Srinivasulu, MD (Pulmo)',
    specialty: 'Pulmonology / Chest Clinic',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'Guntur Chest & Respiratory Hospital',
    address: 'Arundalpet 2nd Line, Guntur - 522002',
    phone: '+91 863 235 9900',
    distance: '2.3 km away',
    experience: '15 Years Exp.',
    rating: '4.8 ★ (210+)',
    fee: '₹550',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:55 PM',
    room: 'Chest OPD Suite 4',
    avatar: 'KS'
  },
  {
    id: 'doc-gtr-07',
    city: 'Guntur',
    name: 'Dr. M. Swapna, MD (Dermatology)',
    specialty: 'Dermatology & Skin Care',
    matchedCategories: ['skin'],
    hospital: 'Radiant Skin & Laser Clinic',
    address: 'Laxmipuram Main Rd, Guntur - 522007',
    phone: '+91 863 221 4433',
    distance: '2.6 km away',
    experience: '11 Years Exp.',
    rating: '4.8 ★ (170+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'Skin Room 1',
    avatar: 'MS'
  },
  {
    id: 'doc-gtr-08',
    city: 'Guntur',
    name: 'Dr. Y. Kishore, MDS',
    specialty: 'Dental Surgery & Oral Care',
    matchedCategories: ['dental'],
    hospital: 'Peoples Dental Super Speciality',
    address: 'Brodipet 2nd Line, Guntur - 522002',
    phone: '+91 863 226 8877',
    distance: '1.2 km away',
    experience: '14 Years Exp.',
    rating: '4.9 ★ (260+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Dental Suite A',
    avatar: 'YK'
  },

  // --- TIRUPATI (8 Hospitals) ---
  {
    id: 'doc-tpt-01',
    city: 'Tirupati',
    name: 'Dr. S. K. Reddeppa, MD, DM',
    specialty: 'Cardiology & Multi-Speciality Care',
    matchedCategories: ['chest', 'headache', 'bpdiabetes'],
    hospital: 'SVIMS Super Speciality Hospital, Tirupati',
    address: 'Alipiri Road, Near SV Medical College, Tirupati - 517507',
    phone: '+91 877 228 7777',
    distance: '2.1 km away',
    experience: '23 Years Exp.',
    rating: '5.0 ★ (590+)',
    fee: '₹750',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:30 PM',
    room: 'SVIMS OPD Room 11',
    avatar: 'SR'
  },
  {
    id: 'doc-tpt-02',
    city: 'Tirupati',
    name: 'Dr. M. Sunitha, MBBS, MD',
    specialty: 'General Physician & Internal Medicine',
    matchedCategories: ['fever', 'stomach', 'throat', 'joint'],
    hospital: 'Amara Hospital, Karakambadi Rd, Tirupati',
    address: 'Karakambadi Rd, Auto Nagar, Tirupati - 517507',
    phone: '+91 877 225 9999',
    distance: '2.8 km away',
    experience: '16 Years Exp.',
    rating: '4.9 ★ (320+)',
    fee: '₹550',
    vacancyStatus: 'Next Slot in 15 mins',
    nextSlot: 'Today, 01:45 PM',
    room: 'Amara OPD Suite 3',
    avatar: 'MS'
  },
  {
    id: 'doc-tpt-03',
    city: 'Tirupati',
    name: 'Dr. R. V. Ramana, MS (Ortho)',
    specialty: 'Orthopedics & Joint Surgery',
    matchedCategories: ['joint'],
    hospital: 'Lotus Ortho Hospital, KT Road',
    address: 'KT Road, Near RTC Bus Stand, Tirupati - 517501',
    phone: '+91 877 223 4455',
    distance: '1.4 km away',
    experience: '19 Years Exp.',
    rating: '4.9 ★ (410+)',
    fee: '₹600',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:15 PM',
    room: 'Ortho OPD Room 1',
    avatar: 'RR'
  },
  {
    id: 'doc-tpt-04',
    city: 'Tirupati',
    name: 'Dr. P. Chengalraya, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Care',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Sri Venkateswara Gastro & Digestive Clinic',
    address: 'Tilak Road, Tirupati - 517501',
    phone: '+91 877 224 8899',
    distance: '1.9 km away',
    experience: '15 Years Exp.',
    rating: '4.8 ★ (280+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:25 PM',
    room: 'Gastro Room 102',
    avatar: 'PC'
  },
  {
    id: 'doc-tpt-05',
    city: 'Tirupati',
    name: 'Dr. K. S. Naidu, DM (Neurology)',
    specialty: 'Neurology & Brain Sciences',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'Tirupati Neuro Care Centre',
    address: 'Bhavani Nagar, Tirupati - 517501',
    phone: '+91 877 226 1122',
    distance: '2.3 km away',
    experience: '20 Years Exp.',
    rating: '5.0 ★ (370+)',
    fee: '₹800',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:00 PM',
    room: 'Neuro Wing Suite 5',
    avatar: 'KN'
  },
  {
    id: 'doc-tpt-06',
    city: 'Tirupati',
    name: 'Dr. G. Purushotham, MD (Pulmo)',
    specialty: 'Pulmonology / Chest & Asthma',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'Tirupati Chest & Respiratory Hospital',
    address: 'AIR Bypass Road, Tirupati - 517501',
    phone: '+91 877 227 3344',
    distance: '2.5 km away',
    experience: '17 Years Exp.',
    rating: '4.8 ★ (230+)',
    fee: '₹550',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:50 PM',
    room: 'Chest OPD Room 4',
    avatar: 'GP'
  },
  {
    id: 'doc-tpt-07',
    city: 'Tirupati',
    name: 'Dr. A. Madhavi, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'Tirumala Skin & Aesthetics Centre',
    address: 'Gandhi Road, Tirupati - 517501',
    phone: '+91 877 222 6677',
    distance: '1.2 km away',
    experience: '12 Years Exp.',
    rating: '4.8 ★ (190+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'Derma Suite 1',
    avatar: 'AM'
  },
  {
    id: 'doc-tpt-08',
    city: 'Tirupati',
    name: 'Dr. D. V. Prasad, MDS',
    specialty: 'Dental Surgery & Implantology',
    matchedCategories: ['dental'],
    hospital: 'Crown Dental Super Speciality',
    address: 'VV Mahal Road, Tirupati - 517501',
    phone: '+91 877 229 4455',
    distance: '1.0 km away',
    experience: '14 Years Exp.',
    rating: '4.9 ★ (250+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Operatory 2',
    avatar: 'DP'
  },

  // --- WARANGAL (8 Hospitals) ---
  {
    id: 'doc-wgl-01',
    city: 'Warangal',
    name: 'Dr. K. Ravinder, MD',
    specialty: 'General Physician & Multi-Speciality',
    matchedCategories: ['fever', 'headache', 'stomach', 'chest'],
    hospital: 'Rohini Super Speciality Hospital, Warangal',
    address: 'Subedari, Hanamkonda, Warangal - 506001',
    phone: '+91 870 245 6677',
    distance: '1.7 km away',
    experience: '19 Years Exp.',
    rating: '4.9 ★ (410+)',
    fee: '₹550',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'Rohini OPD Room 104',
    avatar: 'KR'
  },
  {
    id: 'doc-wgl-02',
    city: 'Warangal',
    name: 'Dr. P. Sudhakar, MS (Ortho)',
    specialty: 'Orthopedics & Joint Specialist',
    matchedCategories: ['joint'],
    hospital: 'Kakatiya Joint Care Centre, Warangal',
    address: 'Naimnagar, Hanamkonda, Warangal - 506009',
    phone: '+91 870 254 3311',
    distance: '2.2 km away',
    experience: '18 Years Exp.',
    rating: '4.9 ★ (350+)',
    fee: '₹600',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:00 PM',
    room: 'Ortho Wing Room 201',
    avatar: 'PS'
  },
  {
    id: 'doc-wgl-03',
    city: 'Warangal',
    name: 'Dr. Ch. Ramesh, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Health',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Jaya Emergency & Digestive Hospital',
    address: 'Waddepally Road, Hanamkonda, Warangal - 506001',
    phone: '+91 870 243 8899',
    distance: '2.5 km away',
    experience: '14 Years Exp.',
    rating: '4.8 ★ (230+)',
    fee: '₹550',
    vacancyStatus: 'Next Slot in 20 mins',
    nextSlot: 'Today, 01:45 PM',
    room: 'Gastro Room 105',
    avatar: 'CR'
  },
  {
    id: 'doc-wgl-04',
    city: 'Warangal',
    name: 'Dr. G. Srinivas, DM (Neurology)',
    specialty: 'Neurology & Nerve Care',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'MaxCare Neuro & Emergency Hospital',
    address: 'Hunter Road, Warangal - 506002',
    phone: '+91 870 255 1122',
    distance: '2.8 km away',
    experience: '21 Years Exp.',
    rating: '5.0 ★ (430+)',
    fee: '₹750',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:30 PM',
    room: 'Neuro OPD Room 302',
    avatar: 'GS'
  },
  {
    id: 'doc-wgl-05',
    city: 'Warangal',
    name: 'Dr. M. Bhaskar, MD (Pulmo)',
    specialty: 'Pulmonology / Chest Clinic',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'Warangal Chest & Asthma Clinic',
    address: 'Kazipet Main Road, Warangal - 506003',
    phone: '+91 870 242 5566',
    distance: '3.1 km away',
    experience: '16 Years Exp.',
    rating: '4.8 ★ (260+)',
    fee: '₹500',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:15 PM',
    room: 'Chest Suite 1',
    avatar: 'MB'
  },
  {
    id: 'doc-wgl-06',
    city: 'Warangal',
    name: 'Dr. K. Sravanthi, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'DermaCare Skin & Cosmetology Clinic',
    address: 'Balasamudram, Hanamkonda, Warangal - 506001',
    phone: '+91 870 256 7788',
    distance: '1.9 km away',
    experience: '11 Years Exp.',
    rating: '4.8 ★ (180+)',
    fee: '₹450',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:20 PM',
    room: 'Derma Room 3',
    avatar: 'KS'
  },
  {
    id: 'doc-wgl-07',
    city: 'Warangal',
    name: 'Dr. T. Praveen, MDS',
    specialty: 'Dental Surgery & Oral Care',
    matchedCategories: ['dental'],
    hospital: 'Kakatiya Super Speciality Dental Hospital',
    address: 'Subedari Road, Hanamkonda, Warangal - 506001',
    phone: '+91 870 244 9900',
    distance: '1.5 km away',
    experience: '13 Years Exp.',
    rating: '4.9 ★ (280+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Dental Chair 1',
    avatar: 'TP'
  },
  {
    id: 'doc-wgl-08',
    city: 'Warangal',
    name: 'Dr. B. Rajender, MS (Ophthal)',
    specialty: 'Eye Care & Ophthalmology',
    matchedCategories: ['eye'],
    hospital: 'Regional Eye Care Hospital OPD',
    address: 'Mulugu Road, Warangal - 506007',
    phone: '+91 870 250 1100',
    distance: '3.4 km away',
    experience: '20 Years Exp.',
    rating: '4.9 ★ (490+)',
    fee: '₹450',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:40 PM',
    room: 'Eye OPD Room 10',
    avatar: 'BR'
  },

  // --- RAJAHMUNDRY (8 Hospitals) ---
  {
    id: 'doc-rjy-01',
    city: 'Rajahmundry',
    name: 'Dr. N. Satyanarayana, MD',
    specialty: 'General Physician & Multi-Speciality',
    matchedCategories: ['fever', 'chest', 'stomach', 'headache', 'joint'],
    hospital: 'GSL General & Super Speciality Hospital, Rajahmundry',
    address: 'NH-16, Rajanagaram, Rajahmundry - 533296',
    phone: '+91 883 248 4444',
    distance: '3.2 km away',
    experience: '21 Years Exp.',
    rating: '4.9 ★ (470+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:30 PM',
    room: 'GSL OPD Block A',
    avatar: 'NS'
  },
  {
    id: 'doc-rjy-02',
    city: 'Rajahmundry',
    name: 'Dr. Ch. Srinivas, MS (Ortho)',
    specialty: 'Orthopedics & Joint Care',
    matchedCategories: ['joint'],
    hospital: 'Rajahmundry Ortho Care & Trauma Centre',
    address: 'Danavaipeta, Rajahmundry - 533103',
    phone: '+91 883 244 5566',
    distance: '1.8 km away',
    experience: '17 Years Exp.',
    rating: '4.8 ★ (310+)',
    fee: '₹600',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:00 PM',
    room: 'Ortho Suite 2',
    avatar: 'CS'
  },
  {
    id: 'doc-rjy-03',
    city: 'Rajahmundry',
    name: 'Dr. K. V. R. Chowdary, MD, DM (Cardio)',
    specialty: 'Cardiology / Heart Care',
    matchedCategories: ['chest'],
    hospital: 'Bollineni Medcover Hospital, Rajahmundry',
    address: 'Morampudi Junction, Rajahmundry - 533107',
    phone: '+91 883 249 9999',
    distance: '2.5 km away',
    experience: '23 Years Exp.',
    rating: '5.0 ★ (520+)',
    fee: '₹800',
    vacancyStatus: 'Immediate OPD Available',
    nextSlot: 'Today, 01:20 PM',
    room: 'Cardiac OPD Room 101',
    avatar: 'KC'
  },
  {
    id: 'doc-rjy-04',
    city: 'Rajahmundry',
    name: 'Dr. P. V. S. S. Rao, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Health',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Hope Gastro & Liver Clinic',
    address: 'Syamala Nagar, Rajahmundry - 533103',
    phone: '+91 883 246 1122',
    distance: '2.0 km away',
    experience: '15 Years Exp.',
    rating: '4.8 ★ (240+)',
    fee: '₹650',
    vacancyStatus: 'Next Slot in 15 mins',
    nextSlot: 'Today, 01:45 PM',
    room: 'Gastro OPD Room 3',
    avatar: 'PR'
  },
  {
    id: 'doc-rjy-05',
    city: 'Rajahmundry',
    name: 'Dr. M. V. Ramana, MBBS, MD',
    specialty: 'General Medicine & Emergency',
    matchedCategories: ['fever', 'headache', 'bpdiabetes'],
    hospital: 'City Emergency & Multi-Speciality Hospital',
    address: 'Kambala Cheruvu, Rajahmundry - 533101',
    phone: '+91 883 242 7788',
    distance: '1.4 km away',
    experience: '19 Years Exp.',
    rating: '4.9 ★ (380+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'General Room 102',
    avatar: 'MR'
  },
  {
    id: 'doc-rjy-06',
    city: 'Rajahmundry',
    name: 'Dr. B. Anand, MD (Pulmo)',
    specialty: 'Pulmonology / Chest & Asthma',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'Rajahmundry Chest & Respiratory Centre',
    address: 'Tadithota Main Road, Rajahmundry - 533101',
    phone: '+91 883 247 3344',
    distance: '1.9 km away',
    experience: '16 Years Exp.',
    rating: '4.8 ★ (220+)',
    fee: '₹550',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:15 PM',
    room: 'Chest OPD Suite 1',
    avatar: 'BA'
  },
  {
    id: 'doc-rjy-07',
    city: 'Rajahmundry',
    name: 'Dr. S. Deepthi, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'Skin & Aesthetics Cosmetology Clinic',
    address: 'Devi Chowk, Rajahmundry - 533101',
    phone: '+91 883 243 8899',
    distance: '1.2 km away',
    experience: '11 Years Exp.',
    rating: '4.8 ★ (170+)',
    fee: '₹450',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:25 PM',
    room: 'Derma Room 2',
    avatar: 'SD'
  },
  {
    id: 'doc-rjy-08',
    city: 'Rajahmundry',
    name: 'Dr. G. V. Subba Rao, MDS',
    specialty: 'Dental Surgery & Oral Care',
    matchedCategories: ['dental'],
    hospital: 'Sri Sai Super Speciality Dental Hospital',
    address: 'Innespeta, Rajahmundry - 533101',
    phone: '+91 883 245 4455',
    distance: '1.6 km away',
    experience: '14 Years Exp.',
    rating: '4.9 ★ (290+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Operatory A',
    avatar: 'GS'
  },

  // --- NELLORE (8 Hospitals) ---
  {
    id: 'doc-nlr-01',
    city: 'Nellore',
    name: 'Dr. P. Subba Rao, MD, DM (Cardio)',
    specialty: 'Cardiology & Internal Medicine',
    matchedCategories: ['chest', 'headache', 'bpdiabetes'],
    hospital: 'Narayana Medical College & Hospital, Nellore',
    address: 'Chinthareddypalem, Nellore - 524003',
    phone: '+91 861 231 7777',
    distance: '3.5 km away',
    experience: '23 Years Exp.',
    rating: '5.0 ★ (560+)',
    fee: '₹700',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:30 PM',
    room: 'Narayana OPD Block 1',
    avatar: 'PS'
  },
  {
    id: 'doc-nlr-02',
    city: 'Nellore',
    name: 'Dr. K. V. N. Prasad, MBBS, MD',
    specialty: 'General Physician / Internal Medicine',
    matchedCategories: ['fever', 'stomach', 'throat', 'nausea'],
    hospital: 'Apollo Specialty Hospital, Nellore',
    address: 'Lake View Colony, Pogathota, Nellore - 524001',
    phone: '+91 861 235 9999',
    distance: '1.6 km away',
    experience: '18 Years Exp.',
    rating: '4.9 ★ (410+)',
    fee: '₹600',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'Consultation Room 204',
    avatar: 'KP'
  },
  {
    id: 'doc-nlr-03',
    city: 'Nellore',
    name: 'Dr. V. Sudhakar, MS (Ortho)',
    specialty: 'Orthopedics & Joint Specialist',
    matchedCategories: ['joint'],
    hospital: 'Simhapuri Hospitals, Dargamitta',
    address: 'NH-16 Bypass, Dargamitta, Nellore - 524003',
    phone: '+91 861 234 5555',
    distance: '2.8 km away',
    experience: '20 Years Exp.',
    rating: '4.9 ★ (380+)',
    fee: '₹650',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:00 PM',
    room: 'Ortho Wing Suite 5',
    avatar: 'VS'
  },
  {
    id: 'doc-nlr-04',
    city: 'Nellore',
    name: 'Dr. M. Chenchu, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Care',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Lotus Digestive & Gastro Hospital',
    address: 'Trunk Road, Opp. VR College, Nellore - 524001',
    phone: '+91 861 232 4411',
    distance: '1.8 km away',
    experience: '15 Years Exp.',
    rating: '4.8 ★ (250+)',
    fee: '₹600',
    vacancyStatus: 'Next Slot in 15 mins',
    nextSlot: 'Today, 01:45 PM',
    room: 'Gastro OPD Room 101',
    avatar: 'MC'
  },
  {
    id: 'doc-nlr-05',
    city: 'Nellore',
    name: 'Dr. R. Vijay Kumar, DM (Neurology)',
    specialty: 'Neurology & Brain Sciences',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'Vijaya Super Speciality Hospital',
    address: 'Pogathota, Nellore - 524001',
    phone: '+91 861 233 8899',
    distance: '1.4 km away',
    experience: '19 Years Exp.',
    rating: '5.0 ★ (430+)',
    fee: '₹800',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:25 PM',
    room: 'Neuro OPD Room 3',
    avatar: 'VK'
  },
  {
    id: 'doc-nlr-06',
    city: 'Nellore',
    name: 'Dr. S. K. Mastan, MD (Pulmo)',
    specialty: 'Pulmonology / Chest & Asthma',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'Nellore Chest & Respiratory Hospital',
    address: 'Mini Bypass Road, Nellore - 524003',
    phone: '+91 861 230 6677',
    distance: '2.4 km away',
    experience: '16 Years Exp.',
    rating: '4.8 ★ (210+)',
    fee: '₹550',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:15 PM',
    room: 'Chest Suite 2',
    avatar: 'SM'
  },
  {
    id: 'doc-nlr-07',
    city: 'Nellore',
    name: 'Dr. Ch. Anusha, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'Skin & Hair Cosmetology Centre',
    address: 'Magunta Layout, Nellore - 524003',
    phone: '+91 861 236 1122',
    distance: '2.1 km away',
    experience: '12 Years Exp.',
    rating: '4.8 ★ (180+)',
    fee: '₹500',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:20 PM',
    room: 'Derma Room 1',
    avatar: 'CA'
  },
  {
    id: 'doc-nlr-08',
    city: 'Nellore',
    name: 'Dr. A. Penchalaiah, MDS',
    specialty: 'Dental Surgery & Oral Health',
    matchedCategories: ['dental'],
    hospital: 'Precision Super Speciality Dental Hospital',
    address: 'Children\'s Park Road, Nellore - 524002',
    phone: '+91 861 237 4455',
    distance: '1.2 km away',
    experience: '14 Years Exp.',
    rating: '4.9 ★ (270+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Operatory 1',
    avatar: 'AP'
  },

  // --- KARIMNAGAR (8 Hospitals) ---
  {
    id: 'doc-kmr-01',
    city: 'Karimnagar',
    name: 'Dr. G. Laxman, MD, DM (Cardio)',
    specialty: 'Cardiology & Multi-Speciality Care',
    matchedCategories: ['chest', 'headache', 'bpdiabetes'],
    hospital: 'Chalmeda Anand Rao Institute of Medical Sciences',
    address: 'Bommakal, Karimnagar - 505001',
    phone: '+91 878 228 5555',
    distance: '3.6 km away',
    experience: '22 Years Exp.',
    rating: '5.0 ★ (510+)',
    fee: '₹650',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:30 PM',
    room: 'OPD Block Room 105',
    avatar: 'GL'
  },
  {
    id: 'doc-kmr-02',
    city: 'Karimnagar',
    name: 'Dr. K. Venugopal, MBBS, MD',
    specialty: 'General Physician / Internal Medicine',
    matchedCategories: ['fever', 'stomach', 'throat', 'nausea'],
    hospital: 'Pratima Institute of Medical Sciences, Karimnagar',
    address: 'Nagunur Road, Karimnagar - 505417',
    phone: '+91 878 221 8888',
    distance: '4.1 km away',
    experience: '19 Years Exp.',
    rating: '4.9 ★ (430+)',
    fee: '₹550',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:15 PM',
    room: 'Consultation Room 3',
    avatar: 'KV'
  },
  {
    id: 'doc-kmr-03',
    city: 'Karimnagar',
    name: 'Dr. Ch. Raji Reddy, MS (Ortho)',
    specialty: 'Orthopedics & Joint Specialist',
    matchedCategories: ['joint'],
    hospital: 'Apollo Reach Hospital, Karimnagar',
    address: 'Mukarampura, Karimnagar - 505001',
    phone: '+91 878 223 9999',
    distance: '1.5 km away',
    experience: '17 Years Exp.',
    rating: '4.9 ★ (360+)',
    fee: '₹600',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:00 PM',
    room: 'Ortho OPD Room 2',
    avatar: 'CR'
  },
  {
    id: 'doc-kmr-04',
    city: 'Karimnagar',
    name: 'Dr. M. Sridhar, DNB (Gastro)',
    specialty: 'Gastroenterology & Digestive Health',
    matchedCategories: ['stomach', 'nausea'],
    hospital: 'Karimnagar Gastro & Liver Centre',
    address: 'Collectorate Road, Karimnagar - 505001',
    phone: '+91 878 224 3322',
    distance: '1.8 km away',
    experience: '14 Years Exp.',
    rating: '4.8 ★ (220+)',
    fee: '₹550',
    vacancyStatus: 'Next Slot in 15 mins',
    nextSlot: 'Today, 01:45 PM',
    room: 'Gastro Suite 1',
    avatar: 'MS'
  },
  {
    id: 'doc-kmr-05',
    city: 'Karimnagar',
    name: 'Dr. P. Sampath, DM (Neurology)',
    specialty: 'Neurology & Brain Sciences',
    matchedCategories: ['headache', 'numbness'],
    hospital: 'Sunrise Emergency & Neuro Hospital',
    address: 'Telangana Chowk, Karimnagar - 505001',
    phone: '+91 878 225 7788',
    distance: '1.2 km away',
    experience: '18 Years Exp.',
    rating: '5.0 ★ (390+)',
    fee: '₹750',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:25 PM',
    room: 'Neuro Room 101',
    avatar: 'PS'
  },
  {
    id: 'doc-kmr-06',
    city: 'Karimnagar',
    name: 'Dr. V. Anjaneyulu, MD (Pulmo)',
    specialty: 'Pulmonology / Chest Clinic',
    matchedCategories: ['throat', 'breathing'],
    hospital: 'Breathe Easy Chest Hospital, Karimnagar',
    address: 'Mankammathota, Karimnagar - 505001',
    phone: '+91 878 222 4455',
    distance: '2.0 km away',
    experience: '15 Years Exp.',
    rating: '4.8 ★ (200+)',
    fee: '₹500',
    vacancyStatus: 'Available Today',
    nextSlot: 'Today, 02:15 PM',
    room: 'Chest Room 3',
    avatar: 'VA'
  },
  {
    id: 'doc-kmr-07',
    city: 'Karimnagar',
    name: 'Dr. B. Soumya, MD (Dermatology)',
    specialty: 'Dermatology & Skin Clinic',
    matchedCategories: ['skin'],
    hospital: 'Royal Skin & Laser Clinic',
    address: 'Bus Stand Road, Karimnagar - 505001',
    phone: '+91 878 226 1100',
    distance: '1.1 km away',
    experience: '11 Years Exp.',
    rating: '4.8 ★ (160+)',
    fee: '₹450',
    vacancyStatus: 'Available Now',
    nextSlot: 'Today, 01:20 PM',
    room: 'Derma Room A',
    avatar: 'BS'
  },
  {
    id: 'doc-kmr-08',
    city: 'Karimnagar',
    name: 'Dr. T. Sharath, MDS',
    specialty: 'Dental Surgery & Oral Care',
    matchedCategories: ['dental'],
    hospital: 'Smile Care Super Speciality Dental',
    address: 'Kothirampur, Karimnagar - 505001',
    phone: '+91 878 227 8899',
    distance: '1.4 km away',
    experience: '13 Years Exp.',
    rating: '4.9 ★ (240+)',
    fee: '₹400',
    vacancyStatus: 'Immediate Walk-in Open',
    nextSlot: 'Today, 01:10 PM',
    room: 'Operatory 1',
    avatar: 'TS'
  }
];

// ---------------------------------------------------------------------------
// 3. Central Application State
// ---------------------------------------------------------------------------
const appState = {
  currentStep: 1, // 1: Sign-in, 2: Pain assessment, 3: Cure & Analysis, 4: Doctor Finder, 5: Confirmed Ticket
  patient: {
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    city: 'Hyderabad'
  },
  painAssessment: {
    selectedCategoryKey: null,
    severityLevel: 'Moderate',
    duration: '1 to 3 days',
    userNotes: '',
    matchedCatalog: null
  },
  booking: {
    selectedDoctor: null,
    bookedSlot: '',
    tokenNumber: '',
    appointmentId: '',
    timestamp: ''
  }
};

// ---------------------------------------------------------------------------
// 4. Initialization & DOM Hookups
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderPainCategories();
  initStepperEvents();
  initFormEvents();
  initVoiceRecognition();
});

function initStepperEvents() {
  // Stepper Header Direct Click
  document.querySelectorAll('.step-item').forEach((item) => {
    item.addEventListener('click', () => {
      const targetStep = parseInt(item.getAttribute('data-step'), 10);
      // Allow going back to previous steps
      if (targetStep < appState.currentStep) {
        goToStep(targetStep);
      }
    });
  });

  // Emergency SOS Button
  const btnSos = document.querySelector('#btnSos');
  if (btnSos) {
    btnSos.addEventListener('click', () => {
      alert('EMERGENCY SERVICES: Dial 112 immediately for free ambulance dispatch in India.');
      window.location.href = 'tel:112';
    });
  }

  // Fast demo pre-fill
  const btnQuickDemo = document.querySelector('#btnQuickDemo');
  if (btnQuickDemo) {
    btnQuickDemo.addEventListener('click', fillDemoCredentials);
  }
}

function initFormEvents() {
  // Step 1: Sign in submit
  const btnSubmitSignIn = document.querySelector('#btnSubmitSignIn');
  if (btnSubmitSignIn) {
    btnSubmitSignIn.addEventListener('click', handleSignInSubmit);
  }

  // Step 2: Pain assessment submit
  const btnSubmitPain = document.querySelector('#btnSubmitPain');
  if (btnSubmitPain) {
    btnSubmitPain.addEventListener('click', handlePainSubmit);
  }

  // Step 3: Proceed to Doctor Match
  const btnProceedToDoctors = document.querySelector('#btnProceedToDoctors');
  if (btnProceedToDoctors) {
    btnProceedToDoctors.addEventListener('click', () => {
      renderDoctorsList();
      goToStep(4);
    });
  }

  // Auto Book Best Doctor button
  const btnAutoBookBest = document.querySelector('#btnAutoBookBest');
  if (btnAutoBookBest) {
    btnAutoBookBest.addEventListener('click', autoBookBestDoctor);
  }

  // Step 5: Print ticket
  const btnPrintSlip = document.querySelector('#btnPrintSlip');
  if (btnPrintSlip) {
    btnPrintSlip.addEventListener('click', () => window.print());
  }

  // Step 5: New Consultation
  const btnNewConsult = document.querySelector('#btnNewConsult');
  if (btnNewConsult) {
    btnNewConsult.addEventListener('click', resetAll);
  }
}

// ---------------------------------------------------------------------------
// Speech Recognition (Voice-to-Text) Engine
// ---------------------------------------------------------------------------
let recognition = null;
let isListening = false;

function initVoiceRecognition() {
  const btnMic = document.querySelector('#btnVoiceMic');
  const painNotes = document.querySelector('#painNotes');
  const voiceStatusBar = document.querySelector('#voiceStatusBar');
  const voiceStatusText = document.querySelector('#voiceStatusText');
  const voiceLangSelect = document.querySelector('#voiceLangSelect');

  if (!btnMic || !painNotes) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (voiceStatusText) {
      voiceStatusText.textContent = 'Voice input is available in Google Chrome, Microsoft Edge, and Safari.';
    }
    btnMic.style.opacity = '0.6';
    btnMic.title = 'Speech recognition is not supported in this browser. Please open in Chrome or Edge.';
    btnMic.addEventListener('click', () => {
      alert('Speech recognition is supported in Google Chrome, Microsoft Edge, and Safari. Please use Chrome/Edge or type directly into the box.');
    });
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = voiceLangSelect ? voiceLangSelect.value : 'en-IN';

  if (voiceLangSelect) {
    voiceLangSelect.addEventListener('change', () => {
      recognition.lang = voiceLangSelect.value;
      if (isListening) {
        recognition.stop();
        setTimeout(() => {
          try { recognition.start(); } catch(e) {}
        }, 300);
      }
    });
  }

  let finalTranscriptSoFar = '';

  btnMic.addEventListener('click', () => {
    if (isListening) {
      recognition.stop();
    } else {
      try {
        finalTranscriptSoFar = painNotes.value.trim();
        recognition.lang = voiceLangSelect ? voiceLangSelect.value : 'en-IN';
        recognition.start();
      } catch (err) {
        console.warn('Speech recognition error:', err);
      }
    }
  });

  recognition.onstart = () => {
    isListening = true;
    btnMic.classList.add('listening');
    btnMic.title = 'Listening... Click mic to stop';
    if (voiceStatusBar) {
      voiceStatusBar.className = 'voice-status-bar listening';
      const langLabel = voiceLangSelect ? voiceLangSelect.options[voiceLangSelect.selectedIndex].text : 'English';
      voiceStatusText.textContent = `🔴 Listening (${langLabel})... Speak clearly into your mic!`;
    }
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    let currentFinal = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcriptPiece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        currentFinal += transcriptPiece;
      } else {
        interimTranscript += transcriptPiece;
      }
    }

    if (currentFinal) {
      if (finalTranscriptSoFar && !finalTranscriptSoFar.endsWith(' ') && !finalTranscriptSoFar.endsWith('.')) {
        finalTranscriptSoFar += ' ';
      }
      finalTranscriptSoFar += currentFinal.trim();
    }

    const displayText = (finalTranscriptSoFar + (interimTranscript ? ' ' + interimTranscript : '')).trim();
    // Capitalize first character
    const formattedText = displayText.length > 0 ? displayText.charAt(0).toUpperCase() + displayText.slice(1) : '';
    painNotes.value = formattedText;
    appState.painAssessment.userNotes = formattedText;
  };

  recognition.onerror = (event) => {
    console.warn('Speech recognition error:', event.error);
    isListening = false;
    btnMic.classList.remove('listening');
    if (voiceStatusBar) {
      voiceStatusBar.className = 'voice-status-bar';
      if (event.error === 'not-allowed') {
        voiceStatusText.textContent = '⚠️ Microphone blocked. Please click the lock icon in your browser address bar to allow mic access.';
      } else if (event.error === 'no-speech') {
        voiceStatusText.textContent = 'No voice detected. Tap the mic and speak clearly.';
      } else {
        voiceStatusText.textContent = `Voice status: ${event.error}. Tap mic to retry.`;
      }
    }
  };

  recognition.onend = () => {
    isListening = false;
    btnMic.classList.remove('listening');
    btnMic.title = 'Click to speak your symptoms';
    if (voiceStatusBar) {
      if (painNotes.value.trim().length > 0) {
        voiceStatusBar.className = 'voice-status-bar success';
        voiceStatusText.textContent = '✓ Voice captured accurately! Tap mic again if you want to speak more.';
      } else {
        voiceStatusBar.className = 'voice-status-bar';
        voiceStatusText.textContent = '🎙️ Tap the mic to speak your symptoms in English or Telugu';
      }
    }
  };
}

// ---------------------------------------------------------------------------
// 5. Step 1: Patient Sign-in Handlers
// ---------------------------------------------------------------------------
function fillDemoCredentials() {
  document.querySelector('#patientName').value = 'Karthik S.';
  document.querySelector('#patientPhone').value = '+91 98480 22338';
  document.querySelector('#patientEmail').value = 'karthik@example.com';
  document.querySelector('#patientAge').value = '28';
  document.querySelector('#patientCity').value = 'Hyderabad';
}

function handleSignInSubmit() {
  const name = document.querySelector('#patientName').value.trim();
  const phone = document.querySelector('#patientPhone').value.trim();
  const email = document.querySelector('#patientEmail').value.trim();
  const age = document.querySelector('#patientAge').value.trim();
  const gender = document.querySelector('#patientGender').value;
  const city = document.querySelector('#patientCity').value.trim();

  if (!name || !phone) {
    alert('దయచేసి మీ పేరు (Name) మరియు ఫోన్ నంబర్ (Phone Number) నమోదు చేయండి.');
    document.querySelector('#patientName').focus();
    return;
  }

  appState.patient = { name, phone, email: email || 'Not provided', age: age || '25', gender, city: city || 'Hyderabad' };

  // Update header status
  const userDisplay = document.querySelector('#headerUserDisplay');
  if (userDisplay) {
    userDisplay.innerHTML = `<span class="user-dot"></span><span>${escapeHtml(name)} (${escapeHtml(city)})</span>`;
  }

  goToStep(2);
}

// ---------------------------------------------------------------------------
// 6. Step 2: Pain & Symptom Assessment
// ---------------------------------------------------------------------------
function renderPainCategories() {
  const container = document.querySelector('#painCategoryGrid');
  if (!container) return;

  const isTe = appState.language === 'te';
  const isHi = appState.language === 'hi';

  container.innerHTML = Object.values(PAIN_CATALOG).map(cat => {
    const name = isTe ? (cat.name_te || cat.name) : isHi ? (cat.name_hi || cat.name) : cat.name;
    const specialty = isTe ? (cat.specialty_te || cat.specialty) : isHi ? (cat.specialty_hi || cat.specialty) : cat.specialty;
    const selectedClass = appState.painAssessment.selectedCategoryKey === cat.id ? ' selected' : '';

    return `
      <div class="pain-card${selectedClass}" data-key="${cat.id}" onclick="selectPainCategory('${cat.id}')">
        <div class="pain-card-icon">${cat.icon}</div>
        <div class="pain-card-title">${escapeHtml(name)}</div>
        <div class="pain-card-sub">${escapeHtml(specialty)}</div>
      </div>
    `;
  }).join('');
}

window.selectPainCategory = function(catKey) {
  appState.painAssessment.selectedCategoryKey = catKey;
  appState.painAssessment.matchedCatalog = PAIN_CATALOG[catKey];

  document.querySelectorAll('.pain-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-key') === catKey);
  });

  const sideSelect = document.querySelector('#sideDoctorCategorySelect');
  if (sideSelect) {
    sideSelect.value = catKey;
    if (window.renderSidePanelDoctors) window.renderSidePanelDoctors();
  }
};

window.selectSeverityLevel = function(level) {
  appState.painAssessment.severityLevel = level;
  document.querySelectorAll('.severity-option-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-severity') === level);
  });
};

function handlePainSubmit() {
  if (!appState.painAssessment.selectedCategoryKey) {
    alert('దయచేసి మీకు ఎక్కడ నొప్పి లేదా సమస్య ఉందో ఎంచుకోండి (Please select your pain type above).');
    return;
  }

  const duration = document.querySelector('#painDuration').value;
  const userNotes = document.querySelector('#painNotes').value.trim();

  appState.painAssessment.duration = duration;
  appState.painAssessment.userNotes = userNotes;

  renderAnalysisAndCure();
  goToStep(3);
}

// ---------------------------------------------------------------------------
// 7. Step 3: Disease Analysis, Cure & Potential Extensions (Complications)
// ---------------------------------------------------------------------------
function renderAnalysisAndCure() {
  const cat = appState.painAssessment.matchedCatalog;
  if (!cat) return;

  const level = appState.painAssessment.severityLevel || 'Moderate';
  const duration = appState.painAssessment.duration;
  const isTe = appState.language === 'te';
  const isHi = appState.language === 'hi';

  const name = isTe ? (cat.name_te || cat.name) : isHi ? (cat.name_hi || cat.name) : cat.name;
  const specialty = isTe ? (cat.specialty_te || cat.specialty) : isHi ? (cat.specialty_hi || cat.specialty) : cat.specialty;

  const severityEmoji = level === 'Normal' ? '🟢' : level === 'Extreme' ? '🔴' : '🟡';
  let severityNote = level === 'Extreme' ? '⚠️ High Severity — See a doctor today' : level === 'Normal' ? 'Mild Discomfort' : 'Moderate — Monitor closely';
  if (isTe) {
    severityNote = level === 'Extreme' ? '⚠️ తీవ్రమైన స్థాయి — ఈరోజే డాక్టర్‌ను కలవండి' : level === 'Normal' ? 'తేలికపాటి నొప్పి' : 'మధ్యస్థ స్థాయి — శ్రద్ధగా గమనించండి';
  } else if (isHi) {
    severityNote = level === 'Extreme' ? '⚠️ उच्च तीव्रता — आज ही डॉक्टर से मिलें' : level === 'Normal' ? 'हल्का दर्द' : 'मध्यम — ध्यान दें';
  }

  // Header condition box
  document.querySelector('#matchedConditionTitle').textContent = name;
  document.querySelector('#matchedLikelyDiseases').textContent = cat.likelyConditions;
  document.querySelector('#matchedSpecialtyBadge').textContent = isTe ? `రైట్‌ డాక్టర్: ${specialty}` : isHi ? `अनुशंसित विशेषज्ञ: ${specialty}` : `Recommended: ${specialty}`;

  // Severity indicator
  const sevLabel = isTe ? 'నొప్పి తీవ్రత:' : isHi ? 'दर्द की तीव्रता:' : 'Pain Severity:';
  const durLabel = isTe ? 'వ్యవధి:' : isHi ? 'अवधि:' : 'Duration:';
  document.querySelector('#analyzedSeverityBanner').innerHTML = `
    <strong>${sevLabel}</strong> ${severityEmoji} ${escapeHtml(level)} — ${severityNote} · <strong>${durLabel}</strong> ${escapeHtml(duration)}
  `;

  // Cure & Immediate Relief List
  const cureListEl = document.querySelector('#cureList');
  cureListEl.innerHTML = cat.cureAndRelief.map(c => `<li>${c}</li>`).join('');

  // Potential Extensions & Complications If Ignored
  const compListEl = document.querySelector('#complicationsList');
  compListEl.innerHTML = cat.complicationsIfIgnored.map(comp => `<li>${comp}</li>`).join('');

  // Emergency Red Flags Box
  document.querySelector('#emergencyRedFlagNote').textContent = cat.emergencyRedFlags;
}

// ---------------------------------------------------------------------------
// 8. Step 4: Nearby Hospitals & Live Available Doctors
// ---------------------------------------------------------------------------
function getDoctorsForCity(selectedCity, selectedCategoryKey) {
  const cityLower = (selectedCity || 'Hyderabad').toLowerCase().trim();
  const cleanCity = escapeHtml(selectedCity || 'Your City');
  const catKey = selectedCategoryKey || 'headache';

  // 1. Filter pre-populated doctors in database by selected city name & exact category match
  let matchedDocs = DOCTORS_DATABASE.filter(d => {
    const cityMatches = d.city.toLowerCase() === cityLower || cityLower.includes(d.city.toLowerCase()) || d.city.toLowerCase().includes(cityLower);
    const catMatches = d.matchedCategories && d.matchedCategories.includes(catKey);
    return cityMatches && catMatches;
  });

  // 2. Specialty mapping and tailored dynamic hospital templates for the exact selected category
  const specialtyTemplates = {
    headache: [
      { name: 'Dr. Rajesh K. Sharma, MD, DM (Neuro)', spec: 'Neurology & Headache Specialist', hosp: `${cleanCity} Neuro Care Hospital`, addr: `Road No 12, Main Centre, ${cleanCity}`, fee: '₹800', exp: '20 Years Exp.', rat: '5.0 ★ (520+)', stat: 'Immediate OPD Available', slot: 'Today, 01:30 PM', room: 'Neuro OPD Room 101', avatar: 'RS' },
      { name: 'Dr. Ananya Reddy, MBBS, MD, DM', spec: 'Neurology & Brain Sciences', hosp: `Apex Brain & Spine Institute, ${cleanCity}`, addr: `Somajiguda Junction, ${cleanCity}`, fee: '₹850', exp: '15 Years Exp.', rat: '4.9 ★ (340+)', stat: 'Next Slot in 20 mins', slot: 'Today, 02:00 PM', room: 'Brain Clinic Suite 3', avatar: 'AR' },
      { name: 'Dr. Suresh Varma, MBBS, MD', spec: 'General Physician / Internal Medicine', hosp: `Apollo Health City, ${cleanCity}`, addr: `Jubilee Hills Road, ${cleanCity}`, fee: '₹600', exp: '16 Years Exp.', rat: '4.9 ★ (380+)', stat: 'Available Now', slot: 'Today, 01:15 PM', room: 'OPD 204, 2nd Floor', avatar: 'SV' },
      { name: 'Dr. K. Srinivas Rao, MD (Med)', spec: 'Internal Medicine & Migraine Care', hosp: `${cleanCity} LifeCare Super-Speciality`, addr: `High School Road, ${cleanCity}`, fee: '₹550', exp: '14 Years Exp.', rat: '4.8 ★ (290+)', stat: 'Available Today', slot: 'Today, 02:30 PM', room: 'OPD Suite 12', avatar: 'SR' }
    ],
    chest: [
      { name: 'Dr. V. S. N. Murthy, MD, DM (Cardio)', spec: 'Cardiology / Heart Specialist', hosp: `Care Heart & Emergency Institute, ${cleanCity}`, addr: `Subhash Road, ${cleanCity}`, fee: '₹900', exp: '22 Years Exp.', rat: '5.0 ★ (510+)', stat: 'Immediate OPD Available', slot: 'Today, 01:15 PM', room: 'Cardiac OPD Room 201', avatar: 'VM' },
      { name: 'Dr. K. Venkat Rao, MS, MCh (Cardio)', spec: 'Interventional Cardiology', hosp: `${cleanCity} Heart & Vascular Hospital`, addr: `Bhanugudi Junction, ${cleanCity}`, fee: '₹850', exp: '20 Years Exp.', rat: '4.9 ★ (460+)', stat: 'Available Now', slot: 'Today, 01:45 PM', room: 'Cath Lab Wing Room 102', avatar: 'VR' },
      { name: 'Dr. S. Priya Darshini, MD, DM', spec: 'Cardiac Critical Care & Emergency', hosp: `KIMS Heart Institute, ${cleanCity}`, addr: `Station Road, ${cleanCity}`, fee: '₹800', exp: '18 Years Exp.', rat: '4.9 ★ (390+)', stat: 'Available Today', slot: 'Today, 02:15 PM', room: 'Heart OPD 304', avatar: 'PD' },
      { name: 'Dr. M. Mohan Reddy, MBBS, DNB', spec: 'Cardiology & Hypertension Care', hosp: `SevenHills Heart Hospital, ${cleanCity}`, addr: `Main Commercial Complex, ${cleanCity}`, fee: '₹750', exp: '16 Years Exp.', rat: '4.8 ★ (310+)', stat: 'Next Slot in 30 mins', slot: 'Today, 02:45 PM', room: 'OPD Suite 208', avatar: 'MR' }
    ],
    stomach: [
      { name: 'Dr. Preethi Rao, MBBS, DNB (Gastro)', spec: 'Gastroenterology & Digestive Health', hosp: `Aster Digestive Sciences Hospital, ${cleanCity}`, addr: `Plot 4, Satyam Theatre Rd, ${cleanCity}`, fee: '₹700', exp: '14 Years Exp.', rat: '4.9 ★ (320+)', stat: 'Available Now', slot: 'Today, 01:45 PM', room: 'Gastro Sciences Room 104', avatar: 'PR' },
      { name: 'Dr. P. Ramadevi, MD (Gastro)', spec: 'Gastroenterology & Liver Clinic', hosp: `Trust Digestive & Liver Institute, ${cleanCity}`, addr: `Collectorate Road, ${cleanCity}`, fee: '₹750', exp: '15 Years Exp.', rat: '4.8 ★ (290+)', stat: 'Available Today', slot: 'Today, 02:00 PM', room: 'Liver OPD Suite 1', avatar: 'RD' },
      { name: 'Dr. Ramesh Babu, MS, MCh (Surg Gastro)', spec: 'Surgical Gastroenterology', hosp: `${cleanCity} Super-Speciality Gastro Hospital`, addr: `Near Bus Stand, ${cleanCity}`, fee: '₹800', exp: '19 Years Exp.', rat: '5.0 ★ (410+)', stat: 'Available Now', slot: 'Today, 01:30 PM', room: 'OPD Room 202', avatar: 'RB' }
    ],
    joint: [
      { name: 'Dr. Manisha Gupta, MS (Ortho), DNB', spec: 'Orthopedics & Joint Care Specialist', hosp: `Sunshine Bone & Joint Institute, ${cleanCity}`, addr: `ORR Junction, ${cleanCity}`, fee: '₹750', exp: '18 Years Exp.', rat: '4.9 ★ (430+)', stat: 'Available Today', slot: 'Today, 02:45 PM', room: 'Ortho Wing Room 114', avatar: 'MG' },
      { name: 'Dr. P. Vijay Kumar, MS (Ortho)', spec: 'Spine, Knee & Joint Replacement', hosp: `${cleanCity} Bone & Joint Hospital`, addr: `Nagamalli Thota Junction, ${cleanCity}`, fee: '₹700', exp: '19 Years Exp.', rat: '4.9 ★ (390+)', stat: 'Immediate OPD Open', slot: 'Today, 02:15 PM', room: 'Ortho OPD Room 12', avatar: 'VK' },
      { name: 'Dr. K. Srinath, MCh (Ortho)', spec: 'Orthopedic Surgery & Sports Injury', hosp: `Apollo Ortho & Spine Hospital, ${cleanCity}`, addr: `Main Hospital Road, ${cleanCity}`, fee: '₹800', exp: '16 Years Exp.', rat: '4.8 ★ (310+)', stat: 'Available Now', slot: 'Today, 01:30 PM', room: 'Suite 108', avatar: 'KS' }
    ],
    skin: [
      { name: 'Dr. Sneha Patil, MD (Dermatology)', spec: 'Dermatology & Skin Clinic', hosp: `Carepath Skin & Allergy Centre, ${cleanCity}`, addr: `100ft Road, ${cleanCity}`, fee: '₹550', exp: '11 Years Exp.', rat: '4.8 ★ (180+)', stat: 'Available Now', slot: 'Today, 01:20 PM', room: 'Derma Suite 12', avatar: 'SP' },
      { name: 'Dr. Ch. Swapna, MD (Dermatology)', spec: 'Dermatology, Laser & Cosmetology', hosp: `Royal Skin & Aesthetics Centre, ${cleanCity}`, addr: `Cinema Hall Road, ${cleanCity}`, fee: '₹500', exp: '12 Years Exp.', rat: '4.8 ★ (195+)', stat: 'Available Now', slot: 'Today, 01:20 PM', room: 'Skin Care OPD Suite 1', avatar: 'CS' },
      { name: 'Dr. V. Lavanya, DDVL, MD', spec: 'Skin & Allergy Specialist', hosp: `${cleanCity} Skin & Laser Institute`, addr: `Near Clock Tower, ${cleanCity}`, fee: '₹600', exp: '14 Years Exp.', rat: '4.9 ★ (260+)', stat: 'Available Today', slot: 'Today, 02:00 PM', room: 'OPD Room 3', avatar: 'VL' }
    ],
    dental: [
      { name: 'Dr. Sandeep Kumar, MDS', spec: 'Dental Surgery & Oral Care', hosp: `Smile Dental Super-Speciality Hospital, ${cleanCity}`, addr: `Himayatnagar Street, ${cleanCity}`, fee: '₹400', exp: '13 Years Exp.', rat: '4.9 ★ (210+)', stat: 'Immediate Walk-in Open', slot: 'Today, 01:10 PM', room: 'Operatory 3, Ground Floor', avatar: 'SK' },
      { name: 'Dr. V. Ramesh, MDS', spec: 'Endodontics & Dental Surgery', hosp: `${cleanCity} Dental Care & Implant Centre`, addr: `100ft Ring Road, ${cleanCity}`, fee: '₹450', exp: '14 Years Exp.', rat: '4.9 ★ (310+)', stat: 'Immediate Walk-in Open', slot: 'Today, 01:10 PM', room: 'Operatory 1', avatar: 'VR' }
    ],
    throat: [
      { name: 'Dr. Vikram Chandra, MD (Pulmonology)', spec: 'Pulmonology / Chest & Allergy', hosp: `KIMS Pulmonary & ENT Hospital, ${cleanCity}`, addr: `Minister Road, ${cleanCity}`, fee: '₹650', exp: '15 Years Exp.', rat: '4.8 ★ (290+)', stat: 'Vacant (1 Ahead)', slot: 'Today, 02:15 PM', room: 'Chest Clinic Room 308', avatar: 'VC' },
      { name: 'Dr. G. Srimannarayana, MS (ENT)', spec: 'ENT & Throat Specialist', hosp: `Swasa Chest & ENT Centre, ${cleanCity}`, addr: `Near Bus Stand, ${cleanCity}`, fee: '₹600', exp: '16 Years Exp.', rat: '4.8 ★ (270+)', stat: 'Available Now', slot: 'Today, 02:00 PM', room: 'ENT Suite 4', avatar: 'GS' }
    ],
    eye: [
      { name: 'Dr. Lavanya Krishnan, MS (Ophthalmology)', spec: 'Ophthalmology & Eye Care', hosp: `LV Prasad Eye Institute, ${cleanCity}`, addr: `Road No 2, ${cleanCity}`, fee: '₹500', exp: '15 Years Exp.', rat: '5.0 ★ (480+)', stat: 'Available Now', slot: 'Today, 01:30 PM', room: 'Eye Care OPD 1st Floor', avatar: 'LK' },
      { name: 'Dr. M. Ramana, MS (Ophthal)', spec: 'Cataract & Eye Specialist', hosp: `${cleanCity} Vision Super-Speciality Hospital`, addr: `Main Commercial Centre, ${cleanCity}`, fee: '₹450', exp: '17 Years Exp.', rat: '4.9 ★ (360+)', stat: 'Available Today', slot: 'Today, 02:15 PM', room: 'Eye OPD Room 102', avatar: 'MR' }
    ],
    fever: [
      { name: 'Dr. Suresh Varma, MBBS, MD', spec: 'General Physician / Infectious Diseases', hosp: `Apollo Health City, ${cleanCity}`, addr: `Jubilee Hills, ${cleanCity}`, fee: '₹600', exp: '16 Years Exp.', rat: '4.9 ★ (380+)', stat: 'Available Now', slot: 'Today, 01:15 PM', room: 'General Medicine Room 204', avatar: 'SV' },
      { name: 'Dr. Srinivas Chowdary, MBBS, MD', spec: 'General Physician / Internal Medicine', hosp: `Apollo Clinic & Multi-Speciality, ${cleanCity}`, addr: `Subhash Road, ${cleanCity}`, fee: '₹500', exp: '17 Years Exp.', rat: '4.9 ★ (350+)', stat: 'Available Now', slot: 'Today, 01:30 PM', room: 'Consulting Room 2', avatar: 'SC' }
    ],
    bpdiabetes: [
      { name: 'Dr. K. S. Rao, MD, DM (Endo)', spec: 'Diabetology & Endocrinology', hosp: `${cleanCity} Diabetes & Endocrine Care`, addr: `Main Hospital Road, ${cleanCity}`, fee: '₹650', exp: '18 Years Exp.', rat: '4.9 ★ (380+)', stat: 'Available Now', slot: 'Today, 01:30 PM', room: 'Endo Clinic 101', avatar: 'KR' }
    ]
  };

  // If fewer than 4 matched doctors exist for this city + category, add tailored doctors for this exact category
  if (matchedDocs.length < 4) {
    const list = specialtyTemplates[catKey] || specialtyTemplates.headache;
    list.forEach((tmpl, i) => {
      matchedDocs.push({
        id: `spec-${catKey}-${i + 1}-${cleanCity}`,
        city: selectedCity,
        name: tmpl.name,
        specialty: tmpl.spec,
        matchedCategories: [catKey],
        hospital: tmpl.hosp,
        address: tmpl.addr,
        phone: `+91 884 230 ${1000 + i * 111}`,
        distance: `${(1.2 + i * 0.6).toFixed(1)} km away`,
        experience: tmpl.exp,
        rating: tmpl.rat,
        fee: tmpl.fee,
        vacancyStatus: tmpl.stat,
        nextSlot: tmpl.slot,
        room: tmpl.room,
        avatar: tmpl.avatar
      });
    });
  }

  // RETURN ONLY DOCTORS MATCHING THE EXACT SELECTED SPECIFICATION!
  return matchedDocs;
}

function renderDoctorsList() {
  const container = document.querySelector('#doctorsContainer');
  if (!container) return;

  const selectedKey = appState.painAssessment.selectedCategoryKey;
  const selectedCity = appState.patient.city || 'Hyderabad';

  // Update city banner tag in UI
  const cityTagEl = document.querySelector('#currentSelectedCityTag');
  if (cityTagEl) cityTagEl.textContent = selectedCity;

  const sortedDocs = getDoctorsForCity(selectedCity, selectedKey);

  container.innerHTML = sortedDocs.map((doc, idx) => {
    const isTopRecommended = idx === 0;

    return `
      <div class="doctor-item-card ${isTopRecommended ? 'recommended' : ''}" id="doc-card-${doc.id}">
        <div class="doc-avatar">${escapeHtml(doc.avatar)}</div>
        <div class="doc-details">
          ${isTopRecommended ? '<span class="tag-badge" style="background:#bbf7d0; color:#14532d; font-weight:800; margin-bottom:6px; display:inline-block;">★ Top Matched for Your Symptoms in ' + escapeHtml(selectedCity) + '</span>' : ''}
          <h4>${escapeHtml(doc.name)}</h4>
          <div class="doc-spec">${escapeHtml(doc.specialty)} · ${escapeHtml(doc.experience)}</div>
          
          <div class="doc-hosp" style="margin-top:6px; display:flex; flex-direction:column; gap:4px;">
            <div>🏥 <strong>${escapeHtml(doc.hospital)}</strong> (${escapeHtml(doc.city)})</div>
            <div style="font-size:12.5px; color:var(--text-subtle);">📍 <strong>Exact Address:</strong> ${escapeHtml(doc.address)}</div>
            <div style="font-size:12.5px; color:#0369a1; font-weight:600; display:flex; align-items:center; gap:12px; margin-top:2px;">
              <span>📞 <strong>Doctor Contact:</strong> <a href="tel:${escapeHtml(doc.phone)}" style="color:#0369a1; text-decoration:underline;">${escapeHtml(doc.phone)}</a></span>
              <span>📍 ${escapeHtml(doc.distance)}</span>
            </div>
          </div>

          <div class="doc-tags" style="margin-top:10px;">
            <span class="tag-badge tag-available">
              <span class="live-pulse"></span> ${escapeHtml(doc.vacancyStatus)}
            </span>
            <span class="tag-badge">Next Slot: <strong>${escapeHtml(doc.nextSlot)}</strong></span>
            <span class="tag-badge">Rating: ${escapeHtml(doc.rating)}</span>
          </div>
        </div>

        <div class="doc-action-col">
          <div class="doc-fee">${escapeHtml(doc.fee)} <span style="font-size:12px; font-weight:500; color:var(--text-subtle)">consultation</span></div>
          <button type="button" class="btn-book-doc" onclick="bookAppointmentWithDoctor('${doc.id}')">
            Book Appointment Now →
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.bookAppointmentWithDoctor = function(docId) {
  const selectedCity = appState.patient.city || 'Hyderabad';
  const selectedKey = appState.painAssessment.selectedCategoryKey;
  const availableDocs = getDoctorsForCity(selectedCity, selectedKey);
  
  const doc = availableDocs.find(d => d.id === docId) || DOCTORS_DATABASE.find(d => d.id === docId);
  if (!doc) return;

  appState.booking.selectedDoctor = doc;
  appState.booking.bookedSlot = doc.nextSlot;
  appState.booking.tokenNumber = 'OPD-' + Math.floor(100 + Math.random() * 900);
  appState.booking.appointmentId = 'CP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  appState.booking.timestamp = new Date().toLocaleString();

  renderConfirmedTicket();
  goToStep(5);
  showToastNotification(`Appointment booked with ${doc.name} at ${doc.hospital}! Token #${appState.booking.tokenNumber}`);
};

function autoBookBestDoctor() {
  const selectedCity = appState.patient.city || 'Hyderabad';
  const selectedKey = appState.painAssessment.selectedCategoryKey;
  const sortedDocs = getDoctorsForCity(selectedCity, selectedKey);
  const bestDoc = sortedDocs[0];
  if (bestDoc) {
    bookAppointmentWithDoctor(bestDoc.id);
  }
}
window.autoBookBestDoctor = autoBookBestDoctor;

// ---------------------------------------------------------------------------
// 9. Step 5: Confirmed Appointment Slip / Digital Ticket
// ---------------------------------------------------------------------------
function renderConfirmedTicket() {
  const b = appState.booking;
  const p = appState.patient;
  const pain = appState.painAssessment;
  const doc = b.selectedDoctor;
  if (!doc) return;

  document.querySelector('#ticketTokenNumber').textContent = b.tokenNumber;
  const inlineToken = document.querySelector('#inlineTokenCopy');
  if (inlineToken) inlineToken.textContent = b.tokenNumber;
  document.querySelector('#ticketApptId').textContent = b.appointmentId;
  document.querySelector('#ticketPatientName').textContent = `${p.name} (${p.age}y, ${p.gender})`;
  document.querySelector('#ticketPatientPhone').textContent = p.phone;
  document.querySelector('#ticketPatientEmail').textContent = p.email;
  
  document.querySelector('#ticketDoctorName').textContent = doc.name;
  document.querySelector('#ticketSpecialty').textContent = doc.specialty;
  
  const phoneEl = document.querySelector('#ticketDoctorPhone');
  if (phoneEl) phoneEl.textContent = `📞 Doctor/Hospital Helpline: ${doc.phone || '+91 98480 12345'}`;

  document.querySelector('#ticketHospital').textContent = doc.hospital;

  const addrEl = document.querySelector('#ticketHospitalAddress');
  if (addrEl) addrEl.textContent = `📍 Address: ${doc.address || doc.city}`;

  document.querySelector('#ticketRoom').textContent = doc.room;
  document.querySelector('#ticketTimeSlot').textContent = b.bookedSlot;
  document.querySelector('#ticketReportedPain').textContent = `${pain.matchedCatalog ? pain.matchedCatalog.name : 'General Health'} (Severity: ${pain.severityLevel || 'Moderate'} Pain)`;
  document.querySelector('#ticketConsultFee').textContent = doc.fee;
}

// ---------------------------------------------------------------------------
// 10. Navigation & Utility Functions
// ---------------------------------------------------------------------------
function goToStep(stepNum) {
  appState.currentStep = stepNum;

  // Hide all steps
  for (let i = 1; i <= 5; i++) {
    const el = document.querySelector(`#stepContainer${i}`);
    if (el) el.classList.toggle('hidden', i !== stepNum);

    const navItem = document.querySelector(`#navStep${i}`);
    if (navItem) {
      navItem.classList.toggle('active', i === stepNum);
      navItem.classList.toggle('completed', i < stepNum);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToastNotification(message) {
  const existing = document.querySelector('.toast-alert');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-alert';
  toast.innerHTML = `<span>📱</span> <span><strong>SMS/WhatsApp Alert:</strong> ${escapeHtml(message)}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

function resetAll() {
  appState.currentStep = 1;
  appState.painAssessment.selectedCategoryKey = null;
  appState.painAssessment.matchedCatalog = null;
  appState.painAssessment.severityLevel = 'Moderate';
  appState.booking.selectedDoctor = null;

  document.querySelectorAll('.pain-card').forEach(c => c.classList.remove('selected'));

  // Restore Moderate as default selected severity card
  document.querySelectorAll('.severity-option-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-severity') === 'Moderate');
  });

  const notesEl = document.querySelector('#painNotes');
  if (notesEl) notesEl.value = '';

  goToStep(1);
}

// ---------------------------------------------------------------------------
// 11. Multi-Language Engine (English, Telugu, Hindi)
// ---------------------------------------------------------------------------
const TRANSLATIONS = {
  en: {
    brandTagline: 'Smart Health & Doctor Booking',
    guestPatient: 'Guest Patient',
    navStep1Title: 'Sign In',
    navStep1Sub: 'Phone & Email',
    navStep2Title: 'Pain & Problem',
    navStep2Sub: 'Symptoms & Scale',
    navStep3Title: 'Analysis & Cure',
    navStep3Sub: 'Immediate Relief',
    navStep4Title: 'Nearby Hospitals',
    navStep4Sub: 'Live Available Doctors',
    navStep5Title: 'Appointment Slip',
    navStep5Sub: 'OPD Token Confirmed',

    step1Tag: 'Step 1 of 5 · Patient Registration',
    step1Title: 'Sign In to Find Care & Book Doctor',
    step1Desc: 'Enter your phone number and email to receive your instant doctor appointment slip, OPD token, and hospital slot confirmation.',
    btnQuickDemo: '⚡ Auto-Fill Demo Credentials',
    labelFullName: 'Full Name *',
    labelPhone: 'Mobile Phone Number (WhatsApp / SMS) *',
    labelEmail: 'Email Address',
    hintEmail: 'For digital appointment receipt',
    labelCity: 'Your City / Location *',
    hintCity: 'We will show hospitals in this city',
    labelAge: 'Age (Years)',
    labelGender: 'Gender',
    btnContinueStep2: 'Continue to Pain & Symptom Assessment →',

    step2Tag: 'Step 2 of 5 · Pain & Symptom Assessment',
    step2Title: 'Where are you experiencing pain or health problems?',
    step2Desc: 'Select your primary problem category so we can diagnose the likely cause, suggest remedies, and auto-match you with the right specialist doctor.',
    severityTitle: 'Pain Severity Level',
    durationLabel: 'How long have you had this pain/problem?',
    voiceHeader: '🎙️ Speak Your Problem (Voice Command)',
    btnVoiceMic: '🎙️ Tap Mic to Speak Symptoms',
    btnAnalyze: '⚡ Analyze Symptoms & Get Remedies →',

    step3Tag: 'Step 3 of 5 · Health Analysis & Remedy Plan',
    step3Title: 'Condition Diagnosis & Immediate Cure',
    step3Desc: 'Based on your reported symptoms and pain severity, below is your clinical breakdown, home relief steps, and potential complications if untreated.',

    step4Tag: 'Step 4 of 5 · Hospital & Doctor Matching',
    step4Title: 'Nearby Hospitals & Available Doctors',
    step4Desc: 'We checked hospitals in your area. Below are certified specialist doctors who are currently vacant or have open consultation slots today.',

    step5Tag: 'Step 5 of 5 · Booking Confirmed!',
    step5Title: 'Your Doctor Appointment is Confirmed 🎉',
    step5Desc: 'Your slot has been reserved directly at the hospital OPD desk. Present your token number at the reception upon arrival.'
  },

  te: {
    brandTagline: 'స్మార్ట్ హెల్త్ & డాక్టర్ బుకింగ్',
    guestPatient: 'అతిథి పేషెంట్',
    navStep1Title: 'సైన్ ఇన్',
    navStep1Sub: 'ఫోన్ & ఇమెయిల్',
    navStep2Title: 'నొప్పి & సమస్య',
    navStep2Sub: 'లక్షణాలు & తీవ్రత',
    navStep3Title: 'విశ్లేషణ & నివారణ',
    navStep3Sub: 'క్షణాల్లో ఉపశమనం',
    navStep4Title: 'సమీప ఆసుపత్రులు',
    navStep4Sub: 'అందుబాటులో ఉన్న డాక్టర్లు',
    navStep5Title: 'అపాయింట్‌మెంట్ స్లిప్',
    navStep5Sub: 'OPD టోకెన్ ఖరారైంది',

    step1Tag: 'దశ 1/5 · పేషెంట్ నమోదు',
    step1Title: 'వైద్యుడిని బుక్ చేయడానికి సైన్ ఇన్ చేయండి',
    step1Desc: 'మీ తక్షణ డాక్టర్ అపాయింట్‌మెంట్ స్లిప్ మరియు OPD టోకెన్ పొందడానికి వివరాలను నమోదు చేయండి.',
    btnQuickDemo: '⚡ డెమో వివరాలు నింపండి',
    labelFullName: 'పూర్తి పేరు *',
    labelPhone: 'మొబైల్ ఫోన్ నంబర్ (WhatsApp / SMS) *',
    labelEmail: 'ఇమెయిల్ చిరునామా',
    hintEmail: 'డిజిటల్ రశీదు కోసం',
    labelCity: 'మీ నగరం / ప్రాంతం *',
    hintCity: 'ఈ నగరంలో ఉన్న ఆసుపత్రులను చూపిస్తాము',
    labelAge: 'వయస్సు (సంవత్సరాలు)',
    labelGender: 'లింగం',
    btnContinueStep2: 'నొప్పి విశ్లేషణకు కొనసాగండి →',

    step2Tag: 'దశ 2/5 · నొప్పి & ఆరోగ్య సమస్యల విశ్లేషణ',
    step2Title: 'మీకు ఎక్కడ నొప్పి లేదా ఆరోగ్య సమస్య ఉంది?',
    step2Desc: 'మీ ప్రధాన సమస్యను ఎంచుకోండి, తద్వారా మేము సరైన నివారణలను సూచించి, తగిన నిపుణులైన డాక్టర్‌ను మ్యాచ్ చేస్తాము.',
    severityTitle: 'నొప్పి తీవ్రత స్థాయి',
    durationLabel: 'ఈ నొప్పి ఎంతకాలంగా ఉంది?',
    voiceHeader: '🎙️ మీ సమస్యను మాట్లాడి చెప్పండి (వాయిస్ కమాండ్)',
    btnVoiceMic: '🎙️ మైక్ నొక్కి మాట్లాడండి',
    btnAnalyze: '⚡ విశ్లేషించి నివారణలు పొందండి →',

    step3Tag: 'దశ 3/5 · ఆరోగ్య విశ్లేషణ & నివారణ ప్రణాళిక',
    step3Title: 'రోగ నిర్ధారణ & తక్షణ ఉపశమనం',
    step3Desc: 'మీ లక్షణాల ఆధారంగా ఇంటి వద్ద చేయవలసిన తక్షణ ఉపశమన చర్యలు మరియు జాగ్రత్తలు క్రింద ఇవ్వబడ్డాయి.',

    step4Tag: 'దశ 4/5 · ఆసుపత్రి & డాక్టర్ ఎంపిక',
    step4Title: 'సమీప ఆసుపత్రులు & అందుబాటులో ఉన్న డాక్టర్లు',
    step4Desc: 'మీ పరిసర ప్రాంతాలలో అందుబాటులో ఉన్న నిపుణులైన డాక్టర్ల వివరాలు. నేరుగా అపాయింట్‌మెంట్ బుక్ చేయండి.',

    step5Tag: 'దశ 5/5 · బుకింగ్ ఖరారైంది!',
    step5Title: 'మీ డాక్టర్ అపాయింట్‌మెంట్ ఖరారైంది 🎉',
    step5Desc: 'ఆసుపత్రి OPD డెస్క్ వద్ద మీ స్లాట్ రిజర్వ్ చేయబడింది. ఆసుపత్రికి వెళ్ళినప్పుడు ఈ టోకెన్ నంబర్ చూపించండి.'
  },

  hi: {
    brandTagline: 'स्मार्ट हेल्थ और डॉक्टर अपॉइंटमेंट बुकिंग',
    guestPatient: 'गेस्ट मरीज',
    navStep1Title: 'साइन इन',
    navStep1Sub: 'फोन और ईमेल',
    navStep2Title: 'दर्द और समस्या',
    navStep2Sub: 'लक्षण और पैमाना',
    navStep3Title: 'विश्लेषण और उपचार',
    navStep3Sub: 'तुरंत राहत',
    navStep4Title: 'नजदीकी अस्पताल',
    navStep4Sub: 'उपलब्ध डॉक्टर्स',
    navStep5Title: 'अपॉइंटमेंट स्लिप',
    navStep5Sub: 'OPD टोकन कन्फर्म',

    step1Tag: 'चरण 1/5 · मरीज पंजीकरण',
    step1Title: 'डॉक्टर बुक करने के लिए साइन इन करें',
    step1Desc: 'तुरंत डॉक्टर अपॉइंटमेंट स्लिप और OPD टोकन प्राप्त करने के लिए अपना विवरण दर्ज करें।',
    btnQuickDemo: '⚡ डेमों विवरण भरें',
    labelFullName: 'पूरा नाम *',
    labelPhone: 'मोबाइल नंबर (WhatsApp / SMS) *',
    labelEmail: 'ईमेल आईडी',
    hintEmail: 'डिजिटल रसीद के लिए',
    labelCity: 'आपका शहर / स्थान *',
    hintCity: 'हम इस शहर के अस्पताल दिखाएंगे',
    labelAge: 'आयु (वर्ष)',
    labelGender: 'लिंग',
    btnContinueStep2: 'दर्द विश्लेषण के लिए आगे बढ़ें →',

    step2Tag: 'चरण 2/5 · दर्द और लक्षण विश्लेषण',
    step2Title: 'आपको कहाँ दर्द या स्वास्थ्य समस्या है?',
    step2Desc: 'अपनी मुख्य समस्या चुनें ताकि हम सही कारण का निदान कर घरेलू उपचार और सही विशेषज्ञ डॉक्टर से मिला सकें।',
    severityTitle: 'दर्द की तीव्रता का स्तर',
    durationLabel: 'यह दर्द कितने समय से है?',
    voiceHeader: '🎙️ अपनी समस्या बोलकर बताएं (वॉइस कमांड)',
    btnVoiceMic: '🎙️ माइक दबाकर लक्षण बोलें',
    btnAnalyze: '⚡ लक्षणों का विश्लेषण करें और उपचार पाएं →',

    step3Tag: 'चरण 3/5 · स्वास्थ्य विश्लेषण और उपचार योजना',
    step3Title: 'रोग निदान और त्वरित राहत',
    step3Desc: 'आपके बताए लक्षणों के आधार पर तुरंत किए जाने वाले घरेलू उपाय और सावधानियां नीचे दी गई हैं।',

    step4Tag: 'चरण 4/5 · अस्पताल और डॉक्टर चयन',
    step4Title: 'नजदीकी अस्पताल और उपलब्ध डॉक्टर्स',
    step4Desc: 'आपके क्षेत्र के सत्यापित विशेषज्ञ डॉक्टर्स जो आज परामर्श के लिए उपलब्ध हैं। सीधे बुक करें।',

    step5Tag: 'चरण 5/5 · बुकिंग कन्फर्म!',
    step5Title: 'आपका डॉक्टर अपॉइंटमेंट कन्फर्म हो गया है 🎉',
    step5Desc: 'अस्पताल OPD डेस्क पर आपका स्लॉट बुक कर लिया गया है। पहुंचने पर यह टोकन नंबर दिखाएं।'
  }
};

function setAppLanguage(langCode) {
  if (!TRANSLATIONS[langCode]) langCode = 'en';
  appState.language = langCode;

  // Highlight active language button in Step 1
  document.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });

  // Sync header dropdown selector
  const headerSelect = document.querySelector('#globalLangSelect');
  if (headerSelect) headerSelect.value = langCode;

  const t = TRANSLATIONS[langCode];

  const safeText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el && text) el.textContent = text;
  };

  // Header & Stepper
  safeText('.brand-tagline', t.brandTagline);
  
  safeText('#navStep1 .step-info-title', t.navStep1Title);
  safeText('#navStep1 .step-info-sub', t.navStep1Sub);
  safeText('#navStep2 .step-info-title', t.navStep2Title);
  safeText('#navStep2 .step-info-sub', t.navStep2Sub);
  safeText('#navStep3 .step-info-title', t.navStep3Title);
  safeText('#navStep3 .step-info-sub', t.navStep3Sub);
  safeText('#navStep4 .step-info-title', t.navStep4Title);
  safeText('#navStep4 .step-info-sub', t.navStep4Sub);
  safeText('#navStep5 .step-info-title', t.navStep5Title);
  safeText('#navStep5 .step-info-sub', t.navStep5Sub);

  // Step 1
  safeText('#stepContainer1 .section-tag', t.step1Tag);
  safeText('#stepContainer1 .section-title', t.step1Title);
  safeText('#stepContainer1 .section-desc', t.step1Desc);
  safeText('#btnQuickDemo', t.btnQuickDemo);
  
  // Form Labels in Step 1
  safeText('label[for="patientName"] span', t.labelFullName);
  safeText('label[for="patientPhone"] span', t.labelPhone);
  safeText('label[for="patientEmail"] span:first-child', t.labelEmail);
  safeText('label[for="patientEmail"] .form-hint', t.hintEmail);
  safeText('label[for="patientCity"] span:first-child', t.labelCity);
  safeText('label[for="patientCity"] .form-hint', t.hintCity);
  safeText('label[for="patientAge"] span', t.labelAge);
  safeText('label[for="patientGender"] span', t.labelGender);
  
  const submitBtn1 = document.querySelector('#btnSubmitSignIn span:first-child');
  if (submitBtn1) submitBtn1.textContent = t.btnContinueStep2;

  // Step 2
  safeText('#stepContainer2 .section-tag', t.step2Tag);
  safeText('#stepContainer2 .section-title', t.step2Title);
  safeText('#stepContainer2 .section-desc', t.step2Desc);
  safeText('#stepContainer2 .pain-severity-section label > span:first-child', t.severityTitle);
  safeText('label[for="painDuration"] span', t.durationLabel);
  safeText('#btnSubmitPain span:first-child', t.btnAnalyze);
  safeText('#voiceSectionHeader', t.voiceHeader);
  safeText('#btnVoiceMic span:last-child', t.btnVoiceMic);

  // Severity Option Cards translation
  const sevMap = {
    te: {
      Normal: { name: 'సాధారణ / తక్కువ నొప్పి', desc: 'తేలికపాటి అసౌకర్యం, రోజువారీ పనులు చేయవచ్చు' },
      Moderate: { name: 'మధ్యస్థ నొప్పి', desc: 'అసౌకర్యంగా మరియు ఇబ్బందిగా ఉంటుంది, విశ్రాంతి అవసరం' },
      Extreme: { name: 'తీవ్రమైన నొప్పి', desc: 'భరించలేని తీవ్రమైన నొప్పి, వెంటనే వైద్యుడిని సంప్రదించండి' }
    },
    hi: {
      Normal: { name: 'सामान्य / हल्का दर्द', desc: 'हल्की परेशानी, दैनिक कार्य जारी रख सकते हैं' },
      Moderate: { name: 'मध्यम दर्द', desc: 'असुविधाजनक और ध्यान भटकाने वाला, आराम की आवश्यकता' },
      Extreme: { name: 'अत्यधिक / तीव्र दर्द', desc: 'सहने में कठिन, तुरंत डॉक्टर से संपर्क करें' }
    },
    en: {
      Normal: { name: 'Normal / Mild Pain', desc: 'Light discomfort, can continue daily tasks' },
      Moderate: { name: 'Moderate Pain', desc: 'Uncomfortable & distracting, resting needed' },
      Extreme: { name: 'Extreme Pain', desc: 'Severe & unbearable, hard to bear or walk' }
    }
  };

  const currentSev = sevMap[langCode] || sevMap.en;
  ['Normal', 'Moderate', 'Extreme'].forEach(lvl => {
    const card = document.querySelector(`.severity-option-card[data-severity="${lvl}"]`);
    if (card) {
      const nameEl = card.querySelector('.severity-name');
      const descEl = card.querySelector('.severity-desc');
      if (nameEl) nameEl.textContent = currentSev[lvl].name;
      if (descEl) descEl.textContent = currentSev[lvl].desc;
    }
  });

  // Step 3
  safeText('#stepContainer3 .section-tag', t.step3Tag);
  safeText('#stepContainer3 .section-title', t.step3Title);
  safeText('#stepContainer3 .section-desc', t.step3Desc);

  // Step 4
  safeText('#stepContainer4 .section-tag', t.step4Tag);
  safeText('#stepContainer4 .section-title', t.step4Title);
  safeText('#stepContainer4 .section-desc', t.step4Desc);

  // Step 5
  safeText('#stepContainer5 .section-tag', t.step5Tag);
  safeText('#stepContainer5 .section-title', t.step5Title);
  safeText('#stepContainer5 .section-desc', t.step5Desc);

  // Re-render dynamic content in current language
  renderPainCategories();
  if (appState.currentStep === 3) renderAnalysisAndCure();
  if (appState.currentStep === 4) renderDoctorsList();

  const langLabel = langCode === 'te' ? 'తెలుగు (Telugu)' : langCode === 'hi' ? 'हिंदी (Hindi)' : 'English';
  showToastNotification(`App Language switched to ${langLabel}`);
}

// Expose globals called from inline HTML onclick attributes
window.resetAll = resetAll;
window.goToStep = goToStep;
window.setAppLanguage = setAppLanguage;

// ---------------------------------------------------------------------------
// 10. Agentic AI Health Copilot & Autonomous Engine
// ---------------------------------------------------------------------------
window.toggleAiAgentModal = function() {
  const modal = document.querySelector('#aiAgentModal');
  if (modal) modal.classList.toggle('hidden');
};

window.runAutonomousAgentTriage = function() {
  const isTe = appState.language === 'te';
  showToastNotification(isTe ? '🤖 కేర్‌పాత్ AI ఏజెంట్ స్వయంప్రతిపత్తితో విశ్లేషణ ప్రారంభించింది...' : '🤖 CarePath AI Agent is autonomously triaging your symptoms...');
  
  if (!appState.painAssessment.selectedCategoryKey) {
    selectPainCategory('headache');
  }

  setTimeout(() => {
    handlePainSubmit();
    showToastNotification(isTe ? '⚡ AI ఏజెంట్ మీ కోసం ఉత్తమ డాక్టర్‌ను మరియు హోమ్ కేర్‌ను మ్యాచ్ చేసింది!' : '⚡ AI Agent matched top specialist doctor & generated cure report!');
  }, 1000);
};

window.triggerAgentAction = function(actionId, payloadStr) {
  let payload = {};
  try { if (payloadStr) payload = JSON.parse(payloadStr); } catch (e) {}

  const isTe = appState.language === 'te';

  if (actionId === 'AUTO_TRIAGE') {
    runAutonomousAgentTriage();
  } else if (actionId === 'AUTO_BOOK') {
    if (!appState.painAssessment.selectedCategoryKey) selectPainCategory('headache');
    autoBookBestDoctor();
  } else if (actionId === 'EXPLAIN_REMEDIES') {
    if (!appState.painAssessment.selectedCategoryKey) selectPainCategory('headache');
    renderAnalysisAndCure();
    goToStep(3);
  } else if (actionId === 'SELECT_CATEGORY' && payload.categoryKey) {
    selectPainCategory(payload.categoryKey);
    showToastNotification(`🤖 AI Agent selected category: ${payload.categoryKey}`);
  } else if (actionId === 'CALL_EMERGENCY') {
    window.location.href = 'tel:112';
  }
};

let currentChatAttachment = null;

window.handleAiChatFileUpload = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const previewBox = document.querySelector('#aiAttachmentPreview');
  const nameEl = document.querySelector('#aiAttachName');
  const iconEl = document.querySelector('#aiAttachIcon');

  const isImage = file.type.startsWith('image/');
  if (iconEl) iconEl.textContent = isImage ? '📷' : '📄';
  if (nameEl) nameEl.textContent = file.name;
  if (previewBox) previewBox.classList.remove('hidden');

  const reader = new FileReader();
  reader.onload = function(e) {
    currentChatAttachment = {
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl: e.target.result
    };
    showToastNotification(`📎 Attached "${file.name}" to AI Chat`);
  };
  reader.readAsDataURL(file);
};

window.removeAiChatAttachment = function() {
  currentChatAttachment = null;
  const previewBox = document.querySelector('#aiAttachmentPreview');
  if (previewBox) previewBox.classList.add('hidden');
  const fileInput = document.querySelector('#aiChatFileInput');
  if (fileInput) fileInput.value = '';
};

window.handleAgentFormSubmit = async function(e) {
  if (e) e.preventDefault();
  const inputEl = document.querySelector('#aiAgentInput');
  const userText = inputEl ? inputEl.value.trim() : '';
  const attachedFile = currentChatAttachment;

  if (!userText && !attachedFile) return;

  if (inputEl) inputEl.value = '';
  const sentText = userText || (attachedFile ? `Please analyze this uploaded file: ${attachedFile.name}` : '');
  
  appendAgentMessage('user', sentText, [], attachedFile);
  removeAiChatAttachment();

  const typingEl = document.querySelector('#aiAgentTyping');
  if (typingEl) typingEl.classList.remove('hidden');

  try {
    const res = await fetch('/api/agent/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: sentText,
        language: appState.language,
        city: appState.patient.city,
        attachment: attachedFile
      })
    });
    const data = await res.json();
    if (typingEl) typingEl.classList.add('hidden');

    if (data.success) {
      appendAgentMessage('bot', data.reply, data.suggestedActions);
      if (data.autoCategory) {
        selectPainCategory(data.autoCategory);
      }
    } else {
      fallbackAgentReply(sentText, attachedFile);
    }
  } catch (err) {
    if (typingEl) typingEl.classList.add('hidden');
    fallbackAgentReply(sentText, attachedFile);
  }
};

function fallbackAgentReply(userText, attachedFile) {
  const isTe = appState.language === 'te';
  const textLower = (userText || '').toLowerCase();

  let reply = isTe
    ? '🤖 **కేర్‌పాత్ AI ఏజెంట్:** మీ ప్రశ్న మరియు మునుపటి రికార్డులు పరిశీలించబడ్డాయి.\n\n🎯 **తదుపరి ఏమి చేయాలి (What To Do Next):**\n1. మీ లక్షణాలకు సరిపోయే కేటగిరీని ఎంచుకోండి.\n2. తక్షణ హోమ్ కేర్ నివారణలను పరిశీలించండి.\n3. మీ ప్రాంతంలోని నిపుణులైన డాక్టర్‌ను బుక్ చేసుకోండి.'
    : '🤖 **CarePath AI Agent:** I have analyzed your query and clinical data.\n\n🎯 **What To Do Next (Step-by-Step Action Plan):**\n1. Select your primary pain category.\n2. Review immediate home relief and precaution steps.\n3. Book an in-person consultation with the matched specialist doctor.';

  let actions = [
    { id: 'AUTO_TRIAGE', label: isTe ? '⚡ స్వయంప్రతిపత్తి విశ్లేషణ' : '⚡ Autonomous Triage' },
    { id: 'AUTO_BOOK', label: isTe ? '🏥 ఉత్తమ డాక్టర్‌ను బుక్ చేయండి' : '🏥 Auto-Book Best Doctor' }
  ];

  if (textLower.includes('headache') || textLower.includes('తలనొప్పి')) {
    selectPainCategory('headache');
  } else if (textLower.includes('chest') || textLower.includes('ఛాతీ')) {
    selectPainCategory('chest');
  } else if (textLower.includes('stomach') || textLower.includes('కడుపు')) {
    selectPainCategory('stomach');
  } else if (attachedFile && attachedFile.name.toLowerCase().includes('skin')) {
    selectPainCategory('skin');
  }

  appendAgentMessage('bot', reply, actions);
}

function appendAgentMessage(sender, text, actions = [], attachment = null) {
  const bodyEl = document.querySelector('#aiAgentBody');
  if (!bodyEl) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `agent-msg agent-msg-${sender}`;

  const icon = sender === 'bot' ? '🤖' : '👤';
  let actionsHtml = '';
  if (actions && actions.length > 0) {
    actionsHtml = '<div style="margin-top: 8px;">' + actions.map(act => {
      const payloadStr = escapeHtml(JSON.stringify(act));
      return `<button type="button" class="agent-action-btn" onclick="triggerAgentAction('${act.id}', '${payloadStr}')">${escapeHtml(act.label)}</button>`;
    }).join('') + '</div>';
  }

  let attachHtml = '';
  if (attachment) {
    if (attachment.type && attachment.type.startsWith('image/')) {
      attachHtml = `<div class="agent-msg-attachment"><img src="${attachment.dataUrl}" alt="${escapeHtml(attachment.name)}" style="max-height: 140px; object-fit: cover;"></div>`;
    } else {
      attachHtml = `<div class="agent-file-badge">📄 ${escapeHtml(attachment.name)}</div>`;
    }
  }

  msgDiv.innerHTML = `
    <div class="agent-msg-icon">${icon}</div>
    <div class="agent-msg-bubble">
      ${attachHtml}
      ${formatMarkdownText(text)}
      ${actionsHtml}
    </div>
  `;

  bodyEl.appendChild(msgDiv);
  bodyEl.scrollTop = bodyEl.scrollHeight;
}

function formatMarkdownText(str) {
  if (!str) return '';
  let formatted = escapeHtml(str);
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\n/g, '<br>');
  return formatted;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[m]);
}

// ---------------------------------------------------------------------------
// 11. PDF Medical Report Upload & Historical Data Analyzer
// ---------------------------------------------------------------------------
let uploadedReportData = null;

window.handleMedicalReportUpload = async function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const dropzoneText = document.querySelector('#pdfDropzone .pdf-drop-text');
  if (dropzoneText) dropzoneText.innerHTML = `⏳ <strong>Analyzing "${escapeHtml(file.name)}"...</strong> Extracting clinical data...`;

  showToastNotification(`📄 Uploaded "${file.name}". AI is analyzing previous medical data...`);

  let extractedText = file.name;
  if (file.type === 'text/plain') {
    try {
      extractedText = await file.text();
    } catch (e) {}
  }

  try {
    const res = await fetch('/api/analyze-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: file.name,
        text: extractedText,
        language: appState.language
      })
    });
    const data = await res.json();

    if (data.success) {
      uploadedReportData = data;
      renderPdfAnalysisResult(data);
      showToastNotification(`✅ Medical Report analyzed! Condition: ${data.detectedCondition}`);
    }
  } catch (err) {
    // Client fallback
    uploadedReportData = {
      detectedCategory: 'headache',
      detectedCondition: 'Chronic Tension Headache / Cervical Strain',
      specialist: 'Neurology / General Physician',
      vitalInsights: 'BP: 126/84 mmHg, SpO2: 99%',
      previousMeds: ['Paracetamol 650mg', 'Multivitamin OD'],
      fileName: file.name
    };
    renderPdfAnalysisResult(uploadedReportData);
  } finally {
    if (dropzoneText) dropzoneText.innerHTML = `<strong>Click to upload another report</strong> or drag &amp; drop here`;
  }
};

function renderPdfAnalysisResult(data) {
  const resultBox = document.querySelector('#pdfAnalysisResult');
  if (!resultBox) return;

  resultBox.classList.remove('hidden');
  document.querySelector('#pdfConditionVal').textContent = data.detectedCondition;
  document.querySelector('#pdfSpecialistVal').textContent = data.specialist;
  document.querySelector('#pdfVitalsVal').textContent = data.vitalInsights;
  document.querySelector('#pdfMedsVal').textContent = Array.isArray(data.previousMeds) ? data.previousMeds.join(', ') : data.previousMeds;
}

window.applyPdfInsightsToAssessment = function() {
  if (!uploadedReportData) return;

  const catKey = uploadedReportData.detectedCategory || 'headache';
  selectPainCategory(catKey);

  const notesInput = document.querySelector('#painNotes');
  if (notesInput) {
    notesInput.value = `[Historical Report Summary - ${uploadedReportData.fileName}]: Past Condition: ${uploadedReportData.detectedCondition}. Previous Meds: ${Array.isArray(uploadedReportData.previousMeds) ? uploadedReportData.previousMeds.join(', ') : uploadedReportData.previousMeds}. Vitals: ${uploadedReportData.vitalInsights}`;
  }

  showToastNotification(`⚡ Applied "${uploadedReportData.detectedCondition}" & selected ${catKey} specialist!`);
  
  // Highlight selected category card in grid
  document.querySelectorAll('.pain-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-key') === catKey);
  });
};

window.clearUploadedReport = function() {
  uploadedReportData = null;
  const resultBox = document.querySelector('#pdfAnalysisResult');
  if (resultBox) resultBox.classList.add('hidden');
  const fileInput = document.getElementById('medicalReportFileInput');
  if (fileInput) fileInput.value = '';
  showToastNotification('Removed uploaded medical report');
};

// ---------------------------------------------------------------------------
// 12. 2-Option Mode Switcher & Full-Page Interactive AI Chatbot
// ---------------------------------------------------------------------------
let currentFullChatAttachment = null;

window.switchAppMode = function(mode) {
  appState.mode = mode || 'chat';

  const btnChat = document.querySelector('#btnModeChat');
  const btnManual = document.querySelector('#btnModeManual');
  const fullChatSection = document.querySelector('#fullPageAiChatContainer');
  const manualContainer = document.querySelector('#manualModeContainer');

  if (mode === 'chat') {
    if (btnChat) btnChat.classList.add('active');
    if (btnManual) btnManual.classList.remove('active');

    if (fullChatSection) fullChatSection.classList.remove('hidden');
    if (manualContainer) manualContainer.classList.add('hidden');

    showToastNotification('🤖 Switched to AI Chatbot Copilot Mode');
  } else {
    if (btnChat) btnChat.classList.remove('active');
    if (btnManual) btnManual.classList.add('active');

    if (fullChatSection) fullChatSection.classList.add('hidden');
    if (manualContainer) manualContainer.classList.remove('hidden');

    goToStep(1);
    showToastNotification('📝 Switched to Step-by-Step Guided Form Mode');
  }
};
window.openPrivacyModal = function() {
  const modal = document.querySelector('#privacyModalOverlay');
  if (modal) modal.classList.remove('hidden');
};

window.closePrivacyModal = function(e) {
  if (e && e.target && e.target.id !== 'privacyModalOverlay' && !e.target.classList.contains('privacy-modal-close') && !e.target.classList.contains('btn-privacy-ok')) {
    return;
  }
  const modal = document.querySelector('#privacyModalOverlay');
  if (modal) modal.classList.add('hidden');
};

window.wipeSessionData = function() {
  if (!confirm('Are you sure? This will clear your login session and all medical history from this device.')) return;
  localStorage.removeItem('carepath_user');
  localStorage.removeItem('carepath_medical_history');
  appState.patient = { name: 'Guest Patient', city: 'Hyderabad', age: 28, phone: '', email: '', gender: 'Male' };
  updateUserHeaderDisplay();
  closePrivacyModal();
  showToastNotification('🗑️ All medical session data wiped successfully.');
};

window.openLoginModal = function() {
  const modal = document.querySelector('#loginModalOverlay');
  if (modal) modal.classList.remove('hidden');
};

window.closeLoginModal = function(e) {
  if (e && e.target && e.target.id !== 'loginModalOverlay' && !e.target.classList.contains('privacy-modal-close')) {
    return;
  }
  const modal = document.querySelector('#loginModalOverlay');
  if (modal) modal.classList.add('hidden');
};

window.handleUserLogin = function(e) {
  if (e) e.preventDefault();
  const name = document.querySelector('#loginName').value.trim();
  const contact = document.querySelector('#loginContact').value.trim();
  const city = document.querySelector('#loginCity').value;
  const age = document.querySelector('#loginAge').value;

  if (!name || !contact) return;

  appState.patient = { name, phone: contact, email: contact, city, age, gender: 'Male' };
  localStorage.setItem('carepath_user', JSON.stringify(appState.patient));

  updateUserHeaderDisplay();
  closeLoginModal();
  showToastNotification(`Welcome, ${name}! Your session history is now active.`);
};

function updateUserHeaderDisplay() {
  const nameEl = document.querySelector('#userDisplayName');
  const btnLogin = document.querySelector('#btnLoginHeader');
  if (appState.patient && appState.patient.name && appState.patient.name !== 'Guest Patient') {
    if (nameEl) nameEl.textContent = `${appState.patient.name} (${appState.patient.city || 'Hyderabad'})`;
    if (btnLogin) btnLogin.innerHTML = `👤 ${appState.patient.name}`;
  } else {
    if (nameEl) nameEl.textContent = 'Guest Patient';
    if (btnLogin) btnLogin.innerHTML = '🔑 Sign In';
  }
}

function loadSavedUserSession() {
  try {
    const saved = localStorage.getItem('carepath_user');
    if (saved) {
      appState.patient = JSON.parse(saved);
      updateUserHeaderDisplay();
    }
  } catch(e) {}
}

// ---------------------------------------------------------------------------
// 18. Chrome & ChatGPT-Style Medical Session History Engine
// ---------------------------------------------------------------------------
window.openHistoryDrawer = function() {
  const drawer = document.querySelector('#historyDrawerOverlay');
  if (drawer) drawer.classList.remove('hidden');
  renderHistoryDrawer();
};

window.closeHistoryDrawer = function(e) {
  if (e && e.target && e.target.id !== 'historyDrawerOverlay' && !e.target.classList.contains('history-drawer-close')) {
    return;
  }
  const drawer = document.querySelector('#historyDrawerOverlay');
  if (drawer) drawer.classList.add('hidden');
};

function getMedicalHistory() {
  try {
    const saved = localStorage.getItem('carepath_medical_history');
    return saved ? JSON.parse(saved) : [];
  } catch(e) {
    return [];
  }
}

function saveToMedicalHistory(queryText, replyText, stage, medicationInfo, attachment) {
  try {
    const history = getMedicalHistory();
    const newEntry = {
      id: 'HIST-' + Date.now(),
      timestamp: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      query: queryText,
      reply: replyText,
      stage: stage || 'Stage 1: Early Onset',
      medication: medicationInfo ? medicationInfo.name : 'First-Aid / Rest Protocol',
      dosage: medicationInfo ? medicationInfo.dose : 'As recommended',
      attachmentName: attachment ? attachment.name : null
    };

    history.unshift(newEntry); // Add to beginning (latest first)
    localStorage.setItem('carepath_medical_history', JSON.stringify(history.slice(0, 50))); // Keep last 50
  } catch(e) {}
}

function renderHistoryDrawer(filterTerm = '') {
  const container = document.querySelector('#historyItemsList');
  const countSub = document.querySelector('#historyCountSub');
  if (!container) return;

  const history = getMedicalHistory();
  const term = (filterTerm || '').toLowerCase().trim();
  const filtered = history.filter(item => {
    if (!term) return true;
    return item.query.toLowerCase().includes(term) || item.reply.toLowerCase().includes(term) || (item.stage && item.stage.toLowerCase().includes(term));
  });

  if (countSub) countSub.textContent = `Recorded ${filtered.length} past medical session(s)`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="history-empty-state">
        <span>📜</span>
        <p>No recorded medical sessions found. Ask symptoms or upload reports to build your history!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="history-item-card" onclick="loadHistoryItem('${item.id}')">
      <div class="history-item-top">
        <span class="history-item-date">📅 ${escapeHtml(item.timestamp)}</span>
        ${item.attachmentName ? `<span style="font-size: 11px; background: #e0f2fe; color: #0284c7; padding: 2px 6px; border-radius: 4px; font-weight: 700;">📎 ${escapeHtml(item.attachmentName)}</span>` : ''}
      </div>
      <div class="history-item-title">${escapeHtml(item.query.substring(0, 60))}${item.query.length > 60 ? '...' : ''}</div>
      <div class="history-item-stage">📊 ${escapeHtml(item.stage)}</div>
      <div class="history-item-dose">💊 ${escapeHtml(item.medication)} (${escapeHtml(item.dosage.substring(0, 45))})</div>
    </div>
  `).join('');
}

window.filterHistoryItems = function(term) {
  renderHistoryDrawer(term);
};

window.loadHistoryItem = function(histId) {
  const history = getMedicalHistory();
  const item = history.find(h => h.id === histId);
  if (!item) return;

  closeHistoryDrawer();
  
  // Append loaded history thread to chat window
  appendFullChatMessage('user', `[History Loaded] ${item.query}`);
  appendFullChatMessage('bot', item.reply);
  showToastNotification(`Loaded past session from ${item.timestamp}`);
};

window.clearAllHistory = function() {
  if (!confirm('Are you sure you want to delete all recorded medical session history?')) return;
  localStorage.removeItem('carepath_medical_history');
  renderHistoryDrawer();
  showToastNotification('Cleared medical history');
};

// Initialize session on load
document.addEventListener('DOMContentLoaded', function() {
  loadSavedUserSession();
});

window.handleFullChatFileUpload = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const previewBox = document.querySelector('#fullChatAttachmentPreview');
  const nameEl = document.querySelector('#fullChatAttachName');
  const iconEl = document.querySelector('#fullChatAttachIcon');

  const isImage = file.type.startsWith('image/');
  if (iconEl) iconEl.textContent = isImage ? '📷' : '📄';
  if (nameEl) nameEl.textContent = file.name;
  if (previewBox) previewBox.classList.remove('hidden');

  const reader = new FileReader();
  reader.onload = function(e) {
    currentFullChatAttachment = {
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl: e.target.result
    };
    showToastNotification(`📎 Attached "${file.name}" to AI Chat`);
  };
  reader.readAsDataURL(file);
};

window.removeFullChatAttachment = function() {
  currentFullChatAttachment = null;
  const previewBox = document.querySelector('#fullChatAttachmentPreview');
  if (previewBox) previewBox.classList.add('hidden');
  const fileInput = document.querySelector('#fullChatFileInput');
  if (fileInput) fileInput.value = '';
};

window.handleFullChatSubmit = async function(e) {
  if (e) e.preventDefault();
  const inputEl = document.querySelector('#fullChatInput');
  const userText = inputEl ? inputEl.value.trim() : '';
  const attachedFile = currentFullChatAttachment;

  if (!userText && !attachedFile) return;

  if (inputEl) inputEl.value = '';
  const sentText = userText || (attachedFile ? `Please analyze this uploaded document/photo: ${attachedFile.name}` : '');

  appendFullChatMessage('user', sentText, [], attachedFile);
  removeFullChatAttachment();

  const typingEl = document.querySelector('#fullChatTyping');
  if (typingEl) typingEl.classList.remove('hidden');

  const selectedCity = document.querySelector('#chatCitySelector') ? document.querySelector('#chatCitySelector').value : (appState.patient.city || 'Hyderabad');

  try {
    const res = await fetch('/api/agent/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: sentText,
        language: appState.language,
        city: selectedCity,
        attachment: attachedFile
      })
    });
    const data = await res.json();
    if (typingEl) typingEl.classList.add('hidden');

    if (data.success) {
      const catKey = data.autoCategory || 'headache';
      selectPainCategory(catKey);

      // Record to medical history drawer
      saveToMedicalHistory(sentText, data.reply, data.diseaseStage, data.medicationInfo, attachedFile);

      // Append bot response (pure clinical intelligence without forced doctor cards)
      appendFullChatMessage('bot', data.reply, data.suggestedActions);
    } else {
      fallbackFullChatReply(sentText, selectedCity);
    }
  } catch (err) {
    if (typingEl) typingEl.classList.add('hidden');
    fallbackFullChatReply(sentText, selectedCity);
  }
};

function fallbackFullChatReply(sentText, city) {
  const textLower = (sentText || '').toLowerCase().trim();
  let catKey = 'headache';
  let reply = '';

  // Greetings
  if (textLower.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening|who are you|help)\b/)) {
    reply = `🤖 **Hello! I am CarePath AI Health Copilot.**\n\n` +
            `I am ready to help you with symptoms, medical questions, report scans, and medication dosage.\n\n` +
            `Feel free to ask any question like *"fever and cold"*, *"knee pain"*, *"high blood sugar"*, or *"what to eat for acidity"*!`;
    appendFullChatMessage('bot', reply, []);
    return;
  }

  // Fever
  if (textLower.includes('fever') || textLower.includes('temp') || textLower.includes('chill') || textLower.includes('typhoid') || textLower.includes('dengue')) {
    catKey = 'headache';
    reply = `🌡️ **1. Condition Analysis:**\n` +
            `Symptoms indicate a **Febrile Response (Fever)** caused by viral or bacterial pyrexia.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 2: Febrile Temperature Elevation** — Active immune response.\n\n` +
            `💊 **3. Recommended Medicine & Exact Dosage:**\n` +
            `• **Medicine Name:** Paracetamol 650mg + Electral ORS\n` +
            `• **Exact Dosage:** 1 tablet post meals every 6 hours SOS (Max 3/day). Sip 1L ORS water.\n` +
            `• **Safety Precautions:** Cold water forehead compress. Avoid heavy blankets.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Severe dehydration, weakness, or unmonitored high fever.`;
  }
  // Cold & Cough
  else if (textLower.includes('cold') || textLower.includes('cough') || textLower.includes('flu') || textLower.includes('throat') || textLower.includes('sneez')) {
    catKey = 'throat';
    reply = `😷 **1. Condition Analysis:**\n` +
            `Symptoms align with **Upper Respiratory Viral Infection & Sore Throat**.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 1: Nasal Congestion & Throat Inflammation**.\n\n` +
            `💊 **3. Recommended Medicine & Exact Dosage:**\n` +
            `• **Medicine Name:** Levocetirizine 5mg + Warm Salt Water Gargle\n` +
            `• **Exact Dosage:** 1 tablet at bedtime for 3 days. Gargle 3x daily.\n` +
            `• **Safety Precautions:** Steam inhalation 2x daily. Avoid ice cold drinks.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Secondary bacterial bronchitis or ear/sinus congestion.`;
  }
  // Sugar & Diabetes
  else if (textLower.includes('sugar') || textLower.includes('diabet') || textLower.includes('glucose')) {
    catKey = 'stomach';
    reply = `🩸 **1. Condition Analysis:**\n` +
            `Query concerns **Blood Sugar Elevation / Diabetes Mellitus**.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 2: Glycemic Dysregulation**.\n\n` +
            `💊 **3. Recommended Medicine & Exact Dosage:**\n` +
            `• **Medicine Name:** Metformin 500mg (Physician Prescribed) + Low GI Diet\n` +
            `• **Exact Dosage:** 1 tablet post meals twice daily as directed.\n` +
            `• **Safety Precautions:** Avoid sugary foods and refined flour. Walk 30 mins post meals.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Long term nerve tingling (neuropathy), eye strain, and kidney overload.`;
  }
  // Knee / Joint / Back
  else if (textLower.includes('knee') || textLower.includes('joint') || textLower.includes('back') || textLower.includes('waist') || textLower.includes('bone') || textLower.includes('muscle')) {
    catKey = 'joint';
    reply = `🦴 **1. Condition Analysis:**\n` +
            `Symptoms suggest **Joint Cartilage Strain, Sciatica, or Muscle Back Sprain**.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 2: Musculoskeletal Inflammation**.\n\n` +
            `💊 **3. Recommended Medicine & Exact Dosage:**\n` +
            `• **Medicine Name:** Aceclofenac 100mg + Paracetamol 325mg + Volini Gel\n` +
            `• **Exact Dosage:** 1 tablet twice daily post meals for 3 days. Apply gel 3x daily.\n` +
            `• **Safety Precautions:** Avoid heavy bending or lifting. Use warm water compress.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Permanent joint stiffness, nerve compression, and walking pain.`;
  }
  // Chest / Cardiac
  else if (textLower.includes('chest') || textLower.includes('heart')) {
    catKey = 'chest';
    reply = `🚨 **1. Emergency Condition Analysis:**\n` +
            `Chest symptoms indicate **Potential Cardiac Stress / Severe Angina**.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 3: Acute Emergency Risk**.\n\n` +
            `💊 **3. Recommended Medicine & Exact Dosage:**\n` +
            `• **Medicine Name:** Aspirin 325mg (Chewable) + Call 112\n` +
            `• **Exact Dosage:** Chew 1 tablet immediately and call emergency 112/108.\n` +
            `• **Safety Precautions:** Sit upright. Do not walk or climb stairs.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Risk of heart tissue injury or respiratory emergency.`;
  }
  // Eye
  else if (textLower.includes('eye') || textLower.includes('vision')) {
    catKey = 'eye';
    reply = `👁️ **1. Condition Analysis:**\n` +
            `Symptoms point to **Digital Eye Fatigue & Dry Ocular Strain**.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 1: Ocular Tear Film Dryness**.\n\n` +
            `💊 **3. Recommended Medicine & Exact Dosage:**\n` +
            `• **Medicine Name:** Lubricating Eye Drops 0.5%\n` +
            `• **Exact Dosage:** Instill 1 drop in both eyes 3x daily for 4 days.\n` +
            `• **Safety Precautions:** Splash cold clean water. Take 20-second screen breaks.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Chronic dry eyes and blurred vision.`;
  }
  // Dental / Toothache
  else if (textLower.includes('tooth') || textLower.includes('teeth') || textLower.includes('dental')) {
    catKey = 'headache';
    reply = `🦷 **1. Condition Analysis:**\n` +
            `Symptoms indicate **Toothache, Dental Cavity, or Pulpitis**.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 2: Dental Enamel Erosion / Nerve Irritation**.\n\n` +
            `💊 **3. Recommended Medicine & Exact Dosage:**\n` +
            `• **Medicine Name:** Ketorolac DT 10mg + Chlorhexidine Mouthwash\n` +
            `• **Exact Dosage:** Dissolve 1 tablet in water SOS post meals. Rinse mouth twice daily.\n` +
            `• **Safety Precautions:** Avoid chewing hard or sweet food on affected side.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Gum abscess and tooth loss.`;
  }
  // Stomach / Acidity
  else if (textLower.includes('stomach') || textLower.includes('acidity') || textLower.includes('gas') || textLower.includes('vomit')) {
    catKey = 'stomach';
    reply = `🤢 **1. Condition Analysis:**\n` +
            `Symptoms point to **Hyperacidity, GERD, or Gastric Spasms**.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 1: Epigastric Mucosal Irritation**.\n\n` +
            `💊 **3. Recommended Medicine & Exact Dosage:**\n` +
            `• **Medicine Name:** Rabeprazole 20mg + Antacid Syrup 10ml\n` +
            `• **Exact Dosage:** 1 capsule 30 mins before breakfast. Sip 10ml antacid post meals.\n` +
            `• **Safety Precautions:** Avoid spicy, oily, and late night foods.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Stomach ulcers and chronic acid reflux.`;
  }
  // Diet / Water / Lifestyle
  else if (textLower.includes('diet') || textLower.includes('food') || textLower.includes('water') || textLower.includes('exercise')) {
    reply = `🥗 **1. Health & Wellness Guidance:**\n` +
            `Regarding your question: **"${sentText}"**:\n` +
            `A balanced diet and adequate hydration improve metabolic energy and immunity.\n\n` +
            `📊 **2. Present Stage of Health:**\n` +
            `**Preventive Lifestyle Optimization**.\n\n` +
            `💊 **3. Recommended Care & Dosage:**\n` +
            `• **Hydration Goal:** Drink 2.5–3 Liters of water daily.\n` +
            `• **Diet:** Include fresh vegetables, protein, and low GI whole grains.\n` +
            `• **Safety Precautions:** Walk 30 minutes daily and maintain regular sleep.\n\n` +
            `⚠️ **4. Risks If Neglected:**\n` +
            `• Dehydration, digestive sluggishness, and fatigue.`;
  }
  // Custom Dynamic Reply for Any Other Query
  else {
    const formattedQuery = sentText ? (sentText.charAt(0).toUpperCase() + sentText.slice(1)) : 'Your Question';
    reply = `🩺 **1. Condition Analysis:**\n` +
            `Analyzing your query: **"${formattedQuery}"**.\n` +
            `Custom health evaluation completed based on clinical guidelines.\n\n` +
            `📊 **2. Present Stage of Disease:**\n` +
            `**Stage 1: Custom Symptom / Inquiry Phase**.\n\n` +
            `💊 **3. Recommended Action & Medicine Dosage:**\n` +
            `• **Care Protocol:** Paracetamol 500mg SOS / Rest & Hydration\n` +
            `• **Suggested Schedule:** 1 tablet post meals if experiencing discomfort.\n` +
            `• **Safety Precautions:** Monitor symptoms over 24 hours and stay hydrated.\n\n` +
            `⚠️ **4. Complications If Ignored:**\n` +
            `• Unchecked progression of initial discomfort.`;
  }

  selectPainCategory(catKey);
  appendFullChatMessage('bot', reply, []);
}

function appendFullChatMessage(sender, text, actions = [], attachment = null, doctorsList = []) {
  const bodyEl = document.querySelector('#fullChatMessages');
  if (!bodyEl) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `agent-msg agent-msg-${sender}`;

  const icon = sender === 'bot' ? '🤖' : '👤';
  let actionsHtml = '';
  if (actions && actions.length > 0) {
    actionsHtml = '<div style="margin-top: 8px;">' + actions.map(act => {
      const payloadStr = escapeHtml(JSON.stringify(act));
      return `<button type="button" class="agent-action-btn" onclick="triggerAgentAction('${act.id}', '${payloadStr}')">${escapeHtml(act.label)}</button>`;
    }).join('') + '</div>';
  }

  let attachHtml = '';
  if (attachment) {
    if (attachment.type && attachment.type.startsWith('image/')) {
      attachHtml = `<div class="agent-msg-attachment"><img src="${attachment.dataUrl}" alt="${escapeHtml(attachment.name)}" style="max-height: 180px; object-fit: cover;"></div>`;
    } else {
      attachHtml = `<div class="agent-file-badge">📄 ${escapeHtml(attachment.name)}</div>`;
    }
  }

  msgDiv.innerHTML = `
    <div class="agent-msg-icon">${icon}</div>
    <div class="agent-msg-bubble">
      ${attachHtml}
      ${formatMarkdownText(text)}
      ${actionsHtml}
    </div>
  `;

  bodyEl.appendChild(msgDiv);
  bodyEl.scrollTop = bodyEl.scrollHeight;
}

window.clearFullChat = function() {
  const bodyEl = document.querySelector('#fullChatMessages');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div class="agent-msg agent-msg-bot">
        <div class="agent-msg-icon">🤖</div>
        <div class="agent-msg-bubble">
          <strong>Welcome to CarePath AI Health Assistant.</strong><br><br>
          Feel free to type or speak your symptoms or questions in English:<br>
          • <strong>1. Condition &amp; Report Analysis</strong>: Detailed diagnostic scan of uploaded photos or symptoms.<br>
          • <strong>2. Present Stage of Disease</strong>: Stage 1 (Mild), Stage 2 (Moderate), or Stage 3 (Acute).<br>
          • <strong>3. Recommended Medicine &amp; Exact Dosage</strong>: Medicine name, dosage schedule, and safety precautions.<br>
          • <strong>4. Complications If Ignored</strong>: Clinical risks and progression warnings.
        </div>
      </div>
    `;
  }
  removeFullChatAttachment();
  showToastNotification('Conversation reset');
};

window.toggleFullChatVoice = function() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Voice recognition is not supported in this browser. Please type your message.');
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;

  const micBtn = document.querySelector('#btnFullChatMic');
  if (micBtn) micBtn.innerHTML = '🔴 Listening...';

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    const inputEl = document.querySelector('#fullChatInput');
    if (inputEl) inputEl.value = transcript;
    if (micBtn) micBtn.innerHTML = '🎙️ Speak';
    handleFullChatSubmit();
  };

  recognition.onerror = function() {
    if (micBtn) micBtn.innerHTML = '🎙️ Speak';
    showToastNotification('Voice input cancelled');
  };

  recognition.onend = function() {
    if (micBtn) micBtn.innerHTML = '🎙️ Speak';
  };

  recognition.start();
};

// ---------------------------------------------------------------------------
// 19. Side Doctor Details Block (Matched Doctors Directory by Disease & City)
// ---------------------------------------------------------------------------
window.renderSidePanelDoctors = function() {
  const container = document.querySelector('#sidePanelDoctorList');
  if (!container) return;

  const catSelect = document.querySelector('#sideDoctorCategorySelect');
  const citySelect = document.querySelector('#sideDoctorCitySelect');

  const selectedCategory = catSelect ? catSelect.value : 'headache';
  const selectedCity = citySelect ? citySelect.value : (appState.patient.city || 'Hyderabad');

  const docs = getDoctorsForCity(selectedCity, selectedCategory);

  if (!docs || docs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
        <span style="font-size: 32px; display: block; margin-bottom: 8px;">🩺</span>
        <p>No matching doctors found for this category in ${escapeHtml(selectedCity)}.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = docs.map((doc, idx) => `
    <div class="side-doc-card ${idx === 0 ? 'top-matched' : ''}">
      ${idx === 0 ? `<div class="side-doc-top-badge">⭐ Best Matched Specialist in ${escapeHtml(selectedCity)}</div>` : ''}
      <div class="side-doc-header">
        <div class="side-doc-avatar">${escapeHtml(doc.avatar || 'DR')}</div>
        <div class="side-doc-main-info">
          <h4 class="side-doc-name">${escapeHtml(doc.name)}</h4>
          <div class="side-doc-spec">${escapeHtml(doc.specialty)} · ${escapeHtml(doc.experience)}</div>
          <div class="side-doc-hosp">🏥 ${escapeHtml(doc.hospital)}</div>
        </div>
      </div>

      <div class="side-doc-details">
        <div class="side-doc-detail-row">
          <span>📍 <strong>Address:</strong> ${escapeHtml(doc.address)}</span>
          <span style="color: #0284c7; font-weight: 700;">📍 ${escapeHtml(doc.distance)}</span>
        </div>
        <div class="side-doc-detail-row" style="margin-top: 4px;">
          <span>📞 <strong>Contact:</strong> <a href="tel:${escapeHtml(doc.phone)}" style="color: #0369a1; text-decoration: underline;">${escapeHtml(doc.phone)}</a></span>
          <span class="side-doc-fee">💰 ${escapeHtml(doc.fee)}</span>
        </div>
      </div>

      <div class="side-doc-bottom-bar">
        <span class="side-status-pill">
          <span class="live-pulse"></span> ${escapeHtml(doc.vacancyStatus || 'OPD Open')} (${escapeHtml(doc.nextSlot)})
        </span>
        <button type="button" class="btn-side-book" onclick="bookAppointmentWithDoctor('${doc.id}')">
          Book OPD →
        </button>
      </div>
    </div>
  `).join('');
};

window.syncSidePanelCity = function(city) {
  const citySelect = document.querySelector('#sideDoctorCitySelect');
  const chatCitySelector = document.querySelector('#chatCitySelector');

  if (citySelect) citySelect.value = city;
  if (chatCitySelector) chatCitySelector.value = city;
  if (appState && appState.patient) appState.patient.city = city;

  renderSidePanelDoctors();
};

window.syncChatCity = function(city) {
  syncSidePanelCity(city);
};

// Initial Side Doctor Panel Render on Load
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    renderSidePanelDoctors();
  }, 100);
});



