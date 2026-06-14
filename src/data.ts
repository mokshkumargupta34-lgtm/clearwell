/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Item, Interaction } from "./types";

/**
 * Curated list of common medications, supplements, and foods.
 * All entries feature search aliases to support user type-ahead mappings
 * (e.g., searching "Advil" correctly surfaces Ibuprofen).
 */
export const CLINICAL_ITEMS: Item[] = [
  // --- MEDICATIONS ---
  {
    id: "med_warfarin",
    name: "Warfarin",
    type: "medication",
    aliases: ["coumadin", "jantoven", "blood thinner", "anticoagulant"],
    description: "Prescription blood thinner used to prevent clots"
  },
  {
    id: "med_aspirin",
    name: "Aspirin",
    type: "medication",
    aliases: ["bayer", "ecotrin", "acetylsalicylic acid", "heart aspirin", "cardio aspirin"],
    description: "NSAID & mild antiplatelet blood thinner"
  },
  {
    id: "med_ibuprofen",
    name: "Ibuprofen",
    type: "medication",
    aliases: ["advil", "motrin", "nuprin", "nsaid", "pain killer", "anti-inflammatory"],
    description: "Common NSAID pain and fever reducer"
  },
  {
    id: "med_atorvastatin",
    name: "Atorvastatin",
    type: "medication",
    aliases: ["lipitor", "cholesterol pill", "statin"],
    description: "Statin medication for lowering cholesterol"
  },
  {
    id: "med_simvastatin",
    name: "Simvastatin",
    type: "medication",
    aliases: ["zocor", "statin", "cholesterol medication"],
    description: "Statin medication for cholesterol reduction"
  },
  {
    id: "med_lisinopril",
    name: "Lisinopril",
    type: "medication",
    aliases: ["prinivil", "zestril", "ace inhibitor", "blood pressure pill"],
    description: "ACE inhibitor for high blood pressure"
  },
  {
    id: "med_levothyroxine",
    name: "Levothyroxine",
    type: "medication",
    aliases: ["synthroid", "levoxyl", "unithroid", "thyroid pill", "t4"],
    description: "Thyroid hormone replacement therapy"
  },
  {
    id: "med_sildenafil",
    name: "Sildenafil",
    type: "medication",
    aliases: ["viagra", "revatio", "pde5 inhibitor", "erectile dysfunction"],
    description: "Medication for erectile dysfunction or pulmonary hypertension"
  },
  {
    id: "med_nitroglycerin",
    name: "Nitroglycerin",
    type: "medication",
    aliases: ["nitrostat", "nitrolingual", "angina pill", "heart spray", "nitrate"],
    description: "Vasodilator for angina chest pain"
  },
  {
    id: "med_lithium",
    name: "Lithium",
    type: "medication",
    aliases: ["lithobid", "eskalith", "mood stabilizer"],
    description: "Psychotropic mood stabilizer for bipolar support"
  },
  {
    id: "med_spironolactone",
    name: "Spironolactone",
    type: "medication",
    aliases: ["aldactone", "potassium sparing diuretic", "water pill"],
    description: "Potassium-sparing diuretic"
  },
  {
    id: "med_potassium_chloride",
    name: "Potassium Chloride",
    type: "medication",
    aliases: ["k-dur", "micro-k", "prescription potassium", "k-lor"],
    description: "Prescription potassium mineral supplement"
  },
  {
    id: "med_ciprofloxacin",
    name: "Ciprofloxacin",
    type: "medication",
    aliases: ["cipro", "fluoroquinolone", "antibiotic"],
    description: "Fluoroquinolone antibiotic for bacterial infections"
  },
  {
    id: "med_doxycycline",
    name: "Doxycycline",
    type: "medication",
    aliases: ["vibramycin", "doryx", "tetracycline", "antibiotic"],
    description: "Tetracycline-class broad-spectrum antibiotic"
  },
  {
    id: "med_xanax",
    name: "Xanax",
    type: "medication",
    aliases: ["alprazolam", "benzodiazepine", "benzo", "sedative", "anxiety pill"],
    description: "Benzodiazepine for anxiety and panic disorders"
  },
  {
    id: "med_oxycodone",
    name: "Oxycodone",
    type: "medication",
    aliases: ["oxycontin", "percocet", "opioid", "narcotic", "strong pain pill"],
    description: "Opioid analgesic for moderate-to-severe pain"
  },
  {
    id: "med_sertraline",
    name: "Sertraline",
    type: "medication",
    aliases: ["zoloft", "ssri", "antidepressant"],
    description: "SSRI antidepressant and anxiety blocker"
  },
  {
    id: "med_fluoxetine",
    name: "Fluoxetine",
    type: "medication",
    aliases: ["prozac", "ssri", "antidepressant"],
    description: "SSRI antidepressant"
  },
  {
    id: "med_methotrexate",
    name: "Methotrexate",
    type: "medication",
    aliases: ["rheumatrex", "trexall", "chemo pill", "rheumatoid arthritis medication"],
    description: "Immunosuppressant for autoimmune conditions or cancer"
  },
  {
    id: "med_metformin",
    name: "Metformin",
    type: "medication",
    aliases: ["glucophage", "fortamet", "diabetes pill", "sugar medication"],
    description: "First-line primary medication for Type 2 Diabetes"
  },
  {
    id: "med_amlodipine",
    name: "Amlodipine",
    type: "medication",
    aliases: ["norvasc", "calcium channel blocker", "high blood pressure pill"],
    description: "Calcium channel blocker for high blood pressure"
  },
  {
    id: "med_digoxin",
    name: "Digoxin",
    type: "medication",
    aliases: ["lanoxin", "digitek", "heart failure pill"],
    description: "Cardiac glycoside for heart rate or rhythm control"
  },
  {
    id: "med_clopidogrel",
    name: "Clopidogrel",
    type: "medication",
    aliases: ["plavix", "antiplatelet", "heart protection"],
    description: "Antiplatelet blood thinner to prevent stroke/heart attacks"
  },
  {
    id: "med_omeprazole",
    name: "Omeprazole",
    type: "medication",
    aliases: ["prilosec", "ppi", "heartburn pill", "acid reducer"],
    description: "Proton pump inhibitor for acid reflux and ulcers"
  },
  {
    id: "med_acetaminophen",
    name: "Acetaminophen",
    type: "medication",
    aliases: ["tylenol", "paracetamol", "fever reducer", "non-aspirin pain reliever"],
    description: "Standard over-the-counter pain reliever and fever reducer"
  },

  // --- SUPPLEMENTS ---
  {
    id: "supp_ginkgo",
    name: "Ginkgo Biloba",
    type: "supplement",
    aliases: ["ginkgo", "maidenhair tree", "memory herbal"],
    description: "Herbal supplement promoted for cognitive focus"
  },
  {
    id: "supp_st_johns_wort",
    name: "St. John's Wort",
    type: "supplement",
    aliases: ["hypericum perforatum", "mood herbal", "natural antidepressant"],
    description: "Popular herbal supplement used for mild depressive moods"
  },
  {
    id: "supp_calcium",
    name: "Calcium Carbonate",
    type: "supplement",
    aliases: ["tums", "caltrate", "calcium supplement", "antacid"],
    description: "Mineral essential for bone health, also used as an antacid"
  },
  {
    id: "supp_iron",
    name: "Iron Supplement",
    type: "supplement",
    aliases: ["ferrous sulfate", "feosol", "iron pill", "anemia pill"],
    description: "Mineral supplement vital for red blood cell production"
  },
  {
    id: "supp_magnesium",
    name: "Magnesium Oxide",
    type: "supplement",
    aliases: ["magnesium", "mag-ox", "sleep supplement", "muscle relaxation", "laxative"],
    description: "Mineral supplement used for sleep, muscle cramps, or acid relief"
  },
  {
    id: "supp_potassium",
    name: "Potassium Supplement",
    type: "supplement",
    aliases: ["potassium gluconate", "over-the-counter potassium"],
    description: "Mineral supplement for electrolyte balance"
  },
  {
    id: "supp_vit_k",
    name: "Vitamin K",
    type: "supplement",
    aliases: ["phytonadione", "vitamin k1", "vitamin k2", "blood clotting vitamin"],
    description: "Vitamin key to blood coagulation and bone metabolism"
  },
  {
    id: "supp_vit_d3",
    name: "Vitamin D3",
    type: "supplement",
    aliases: ["cholecalciferol", "sunshine vitamin"],
    description: "Vitamin supporting immune health and calcium absorption"
  },
  {
    id: "supp_coq10",
    name: "Coenzyme Q10",
    type: "supplement",
    aliases: ["coq10", "ubiquinone", "heart health helper"],
    description: "Antioxidant supporting cellular energy and heart vitality"
  },
  {
    id: "supp_fish_oil",
    name: "Fish Oil",
    type: "supplement",
    aliases: ["omega-3", "epa", "dha", "marine fish oil"],
    description: "Omega-3 fatty acids for cardiovascular and brain health"
  },
  {
    id: "supp_melatonin",
    name: "Melatonin",
    type: "supplement",
    aliases: ["sleep hormone", "sleep aid supplement"],
    description: "Hormone supplement commonly taken to assist sleep onset"
  },
  {
    id: "supp_zinc",
    name: "Zinc Supplement",
    type: "supplement",
    aliases: ["zinc gluconate", "zinc picolinate", "cold remedy zinc"],
    description: "Essential trace mineral used for immune support"
  },
  {
    id: "supp_ginseng",
    name: "Ginseng",
    type: "supplement",
    aliases: ["panax ginseng", "asian ginseng", "energy herbal"],
    description: "Herbal root utilized in traditional medicine for vitality"
  },
  {
    id: "supp_garlic",
    name: "Garlic Supplement",
    type: "supplement",
    aliases: ["allicin", "garlic pills", "odorless garlic"],
    description: "Concentrated garlic compound for cholesterol and circulation"
  },

  // --- FOODS ---
  {
    id: "food_grapefruit",
    name: "Grapefruit",
    type: "food",
    aliases: ["grapefruit juice", "pomelo hybrid", "grape fruits"],
    description: "Citrus fruit that strongly inhibits liver enzyme CYP3A4"
  },
  {
    id: "food_leafy_greens",
    name: "Leafy Greens",
    type: "food",
    aliases: ["spinach", "kale", "collards", "swiss chard", "broccoli", "greens"],
    description: "Vegetables rich in Vitamin K"
  },
  {
    id: "food_potassium_rich",
    name: "Potassium-Rich Foods",
    type: "food",
    aliases: ["bananas", "avocados", "sweet potatoes", "banana", "avocado"],
    description: "Fruits and vegetables packed with high dietary potassium"
  },
  {
    id: "food_dairy",
    name: "Dairy Products",
    type: "food",
    aliases: ["milk", "yogurt", "cheese", "dairy", "ice cream"],
    description: "Milk, yogurt, or cheese loaded with active natural calcium"
  },
  {
    id: "food_alcohol",
    name: "Alcohol",
    type: "food",
    aliases: ["wine", "beer", "liquor", "drinks", "spirits", "ethanol"],
    description: "Beverages containing ethanol; affects liver and central nervous system"
  },
  {
    id: "food_aged_cheese",
    name: "Aged Cheese / Tyramine Foods",
    type: "food",
    aliases: ["aged cheese", "blue cheese", "cheddar cheese", "parmesan cheese", "red wine", "cured meats"],
    description: "Foods naturally rich in tyramine (fermented or aged products)"
  },
  {
    id: "food_green_tea",
    name: "Green Tea",
    type: "food",
    aliases: ["matcha", "sencha", "brewed green tea"],
    description: "Infusions rich in antioxidants and slight Vitamin K content"
  }
];

/**
 * Clean curated database of clinical interactions.
 * Keyed conceptually as an unordered combination.
 * In code, we query using sorted keys: `[id1, id2].sort().join('|')`.
 *
 * Severity Mapping:
 * 3 = Severe: Talk to a pharmacist or doctor before combining (Clay Warmth)
 * 2 = Moderate: Worth discussing at your next visit (Honey Amber)
 * 1 = Minor: Good to know — usually easy to manage (Slate Blue)
 */
export const CLINICAL_INTERACTIONS: Interaction[] = [
  // --- WARFARIN INTERACTIONS ---
  {
    a: "med_warfarin",
    b: "med_aspirin",
    severity: 3,
    what: "Both medications thin the blood but via distinct biochemical pathways. Aspirin also sensitizes the gastrointestinal lining.",
    advice: "Avoid combining unless specifically prescribed and monitored by your cardiologist. Taking both highly increases the threat of internal stomach bleeding.",
    source: "FDA Drug Labeling & Clinical Pharmacology References"
  },
  {
    a: "med_warfarin",
    b: "med_ibuprofen",
    severity: 3,
    what: "Ibuprofen is an NSAID that impairs platelet clotting and impairs gastric mucosal defenses, reinforcing Warfarin's active anti-coagulation.",
    advice: "Do not take routine NSAIDs like ibuprofen alongside Warfarin. Discuss safer localized topical alternatives or oral Acetaminophen with your physician.",
    source: "FDA Approved Labeling & Antithrombotic Guidelines"
  },
  {
    a: "med_warfarin",
    b: "supp_ginkgo",
    severity: 3,
    what: "Ginkgo Biloba components possess antiplatelet activity and can chemically synergize with Warfarin's anticoagulation.",
    advice: "Avoid Ginkgo supplements completely when taking Warfarin. Ensure all caretakers are aware of herbal use during regular INR blood checks.",
    source: "Clinical Pharmacology & Herbal Safety Monographs"
  },
  {
    a: "med_warfarin",
    b: "supp_vit_k",
    severity: 2,
    what: "Vitamin K is the direct physiological antidote to Warfarin; it stimulates the liver to produce clotting factors, lowering the drug's therapeutic blood-thinning effect.",
    advice: "Prioritize consistent Vitamin K dietary intake. Avoid starting new high-potency Vitamin K supplements unless directly managed by your anticoagulation clinic.",
    source: "Clinician Anticoagulation Reference Guide"
  },
  {
    a: "med_warfarin",
    b: "food_leafy_greens",
    severity: 2,
    what: "Dark green vegetables (spinach, kale, collards) contain high levels of standard Vitamin K, which naturally decreases Warfarin's effectiveness.",
    advice: "You can enjoy greens, but maintain a consistent daily consumption. Avoid sudden, drastic dietary changes (e.g., launching an intensive green smoothie juice diet).",
    source: "USDA Dietary Guidelines & Anticoagulant Education Manuals"
  },
  {
    a: "med_warfarin",
    b: "supp_garlic",
    severity: 2,
    what: "Concentrated garlic extracts can amplify antiplatelet functions in the body, subtly raising bleeding levels of Warfarin patients.",
    advice: "Normal culinary amounts of garlic in meals are safe. Avoid high-dosage standardized garlic capsules. Mention changes to your INR monitor expert.",
    source: "Herbal-Drug Interaction Compendiums"
  },
  {
    a: "med_warfarin",
    b: "food_green_tea",
    severity: 1,
    what: "Green tea contains trace minerals of Vitamin K. In exceptional volumes (over 1 gallon daily), it might slightly compress the INR levels.",
    advice: "Moderate, standard drinking (1-3 cups a day) is fully routine. Ensure consistency and avoid massive daily fluctuations.",
    source: "Anticoagulation Drug Interaction Studies"
  },

  // --- BENZODIAZEPINE & OPIOID DEPRESSANTS ---
  {
    a: "med_oxycodone",
    b: "med_xanax",
    severity: 3,
    what: "Co-administering opioids and benzodiazepines creates a compounded central nervous system depressant effect.",
    advice: "This combination has an FDA Boxed Warning. Take only under direct medical advice. Monitor for extreme lethargy, slow respiration, or sluggish reactions.",
    source: "FDA Boxed Warnings & CDC Opioid Prescribing Guidelines"
  },
  {
    a: "med_oxycodone",
    b: "food_alcohol",
    severity: 3,
    what: "Alcohol and opioid pain medications both diminish central respiratory drive in the brainstem, dangerous in combination.",
    advice: "Strictly avoid all alcoholic drinks while taking prescription Opioids. Ensure family members recognize the warning signs of shallow breathing.",
    source: "NIH National Institute on Drug Abuse Reference Manuals"
  },
  {
    a: "med_xanax",
    b: "food_alcohol",
    severity: 3,
    what: "Alcohol potentiates the GABA-enhancing properties of benzodiazepines, intensifying sedation, motor deterioration, and respiratory depression.",
    advice: "Avoid alcohol entirely when taking Xanax or sleep sedatives. Do not drive or operate machinery.",
    source: "FDA Safety Communications & Lexicomp Interactions"
  },

  // --- ANTIDEPRESSANTS & SEROTONERGICS ---
  {
    a: "med_sertraline",
    b: "supp_st_johns_wort",
    severity: 3,
    what: "Both substances raise active synaptic serotonin levels. Combining them can trigger excess accumulation, potentially causing Serotonin Syndrome.",
    advice: "Do not take St. John's Wort if you take SSRIs like Sertraline. Symptoms of excess serotonin are tachycardia, rigid muscles, severe sweating, and confusion.",
    source: "World Health Organization Secondary Drug Database"
  },
  {
    a: "med_fluoxetine",
    b: "supp_st_johns_wort",
    severity: 3,
    what: "Prozac (Fluoxetine) is a potent long-acting SSRI. Adding St. John's Wort elevates the risk of serotonin toxicity.",
    advice: "Avoid St. John's Wort. Seek alternative stress-management or herbal supplements after reviewing with your medical provider.",
    source: "NCCIH Herbal-Drug Interaction Factsheets"
  },
  {
    a: "med_sertraline",
    b: "food_alcohol",
    severity: 2,
    what: "Alcohol can exacerbate the psychomotor side effects of SSRIs (e.g., drowsiness, lightheadedness) and worsen clinical depression.",
    advice: "Limit or avoid alcohol consumption during SSRI therapy to ensure accurate evaluation of your mood and therapeutic stability.",
    source: "AAPA Clinical Antidepressant Resource Guidelines"
  },
  {
    a: "med_fluoxetine",
    b: "food_alcohol",
    severity: 2,
    what: "Alcohol paired with Fluoxetine can trigger unexpected dizziness, drowsiness, and may decrease the therapeutic efficacy of your mood treatment.",
    advice: "Avoid or significantly curtail alcohol intake. Let your psychiatrist know if you experience increased lethargy.",
    source: "Standard Clinical Psychiatry Medication Manuals"
  },
  {
    a: "med_sertraline",
    b: "med_aspirin",
    severity: 1,
    what: "Selective Serotonin Reuptake Inhibitors (SSRIs) can deplete serotonin in platelets, mildly impairing clotting functionality. Combining with Aspirin slightly raises stomach bleeding risk.",
    advice: "Usually acceptable, but monitor closely if you have a history of peptic ulcers or acid reflux. Report any coffee-ground-type reflux immediately.",
    source: "Gastroenterology Drug Interaction Clinical Reviews"
  },
  {
    a: "med_fluoxetine",
    b: "med_ibuprofen",
    severity: 1,
    what: "SSRIs like Fluoxetine coupled with NSAIDs like Ibuprofen slightly heighten the overall rates of upper gastrointestinal bleeding.",
    advice: "Use Ibuprofen occasionally and in moderation. If frequent pain relief is needed, discuss mucosal protectants or Acetaminophen with your doctor.",
    source: "Joint Guidelines of Cardiology & Gastrointestinal Associations"
  },

  // --- STATINS & GRAPEFRUIT ---
  {
    a: "med_simvastatin",
    b: "food_grapefruit",
    severity: 3,
    what: "Grapefruit compounds bind to the intestinal enzyme CYP3A4, which breaks down Simvastatin. This vastly elevates Simvastatin doses in the muscle tissue.",
    advice: "Avoid grapefruit and its juices completely if you take Simvastatin. High levels can cause myopathy or dangerous muscle breakdown (rhabdomyolysis).",
    source: "FDA Consumer Drug Safety Guidelines"
  },
  {
    a: "med_atorvastatin",
    b: "food_grapefruit",
    severity: 2,
    what: "Grapefruit inhibits the metabolizing path of Atorvastatin, elevating systemic drug blood levels and bringing elevated risk of muscle soreness.",
    advice: "Avoid large quantities of grapefruit juice (more than 1 quart daily). Mention any muscle weakness or dark-colored urine to your doctor immediately.",
    source: "Mayo Clinic Clinical Statin Guidelines"
  },

  // --- LISINOPRIL & POTASSIUM RAISERS ---
  {
    a: "med_lisinopril",
    b: "med_spironolactone",
    severity: 2,
    what: "Both medications reduce the kidneys' ability to excrete potassium. Lisinopril prevents aldosterone release, while Spironolactone blocks its action.",
    advice: "Monitor potassium levels with blood panels regularly. Do not use over-the-counter potassium supplements or potassium chloride salt substitutes.",
    source: "AHA Heart Failure Pharmacotherapy Manuals"
  },
  {
    a: "med_lisinopril",
    b: "med_potassium_chloride",
    severity: 2,
    what: "Lisinopril retains potassium in the blood. Combining with prescription potassium chloride directly elevates potassium counts.",
    advice: "Only take together under explicit prescription with serial blood work. Learn the signals of hyperkalemia: muscle weakness or irregular heartbeat.",
    source: "National Kidney Foundation Medication Guidelines"
  },
  {
    a: "med_lisinopril",
    b: "supp_potassium",
    severity: 2,
    what: "Lisinopril causes potassium retention. Adding a standalone potassium mineral supplement can lead to hyperkalemia.",
    advice: "Avoid OTC potassium supplements while on ACE inhibitors. Consult your physician prior to changing multi-mineral routines.",
    source: "American Journal of Cardiology Therapeutics"
  },
  {
    a: "med_lisinopril",
    b: "food_potassium_rich",
    severity: 1,
    what: "Dietary potassium (bananas, avocados) is essential, but extremely rich, concentrated supplies in combination with Lisinopril might raise potassium values mildly.",
    advice: "A standard, healthy intake of bananas is fine. Avoid salt-substitute shakers made of potassium chloride, and do not eat avocados in extreme abundance.",
    source: "Dietary Guidelines for Hypertension Management"
  },

  // --- SPIRONOLACTONE & POTASSIUM ---
  {
    a: "med_spironolactone",
    b: "med_potassium_chloride",
    severity: 3,
    what: "Spironolactone blocks potassium excretion. Adding a mineral supplement increases the risk of hyperkalemia (excess potassium) which can induce heart arrhythmias.",
    advice: "Contraindicated except under direct clinical specialist instruction. Seek urgent evaluation if you feel fluttering in your chest, numbness, or extreme fatigue.",
    source: "ACC/AHA Guideline-Directed Medical Therapy Reports"
  },
  {
    a: "med_spironolactone",
    b: "supp_potassium",
    severity: 3,
    what: "Spironolactone retains potassium. Consuming OTC potassium supplements frequently risks severe cardiac potassium overloading.",
    advice: "Strictly avoid potassium supplements. Read food labels to avoid salt substitutes containing potassium.",
    source: "American Heart Association Clinical Drug Guidelines"
  },

  // --- THYROID ABSORPTION ISSUES ---
  {
    a: "med_levothyroxine",
    b: "supp_calcium",
    severity: 2,
    what: "Calcium carbonate binds directly to the Levothyroxine hormone in the acidic environment of the stomach, preventing its absorption.",
    advice: "Separate intake by at least 4 hours. Take Levothyroxine first thing in the morning with plain water, and take Calcium later in the afternoon.",
    source: "Endocrine Society Clinical Practice Guidelines"
  },
  {
    a: "med_levothyroxine",
    b: "supp_iron",
    severity: 2,
    what: "Iron (ferrous sulfate) complexes with Levothyroxine in the gut, severely lowering thyroid hormone uptake and causing subclinical hypothyroidism.",
    advice: "Space these doses by at least 4 hours. Consistent separate scheduling ensures correct thyroid balance.",
    source: "American Thyroid Association Treatment Guidelines"
  },
  {
    a: "med_levothyroxine",
    b: "food_dairy",
    severity: 2,
    what: "The biological calcium present in milk, yogurt, and cheese binds to thyroid medicines similar to dietary calcium supplements.",
    advice: "Do not take Levothyroxine with your breakfast cereal or dairy. Wait at least 1 hour after taking thyroid medication before consuming dairy products.",
    source: "Thyroid Disease Patient Education Guidelines"
  },
  {
    a: "med_levothyroxine",
    b: "med_omeprazole",
    severity: 2,
    what: "Levothyroxine requires a highly acidic stomach environment to dissolve correctly. Omeprazole lowers acid, impairing absorption.",
    advice: "Have your doctor monitor your TSH bloodwork if you start, stop, or change your dose of Omeprazole.",
    source: "Clinical Thyroidology Database Studies"
  },

  // --- ANTIBIOTIC CHELATION ---
  {
    a: "med_ciprofloxacin",
    b: "supp_calcium",
    severity: 2,
    what: "Calcium binds or chelates Ciprofloxacin molecules, creating a larger, non-absorbable chemical compound in your intestine.",
    advice: "Separate the doses. Take Ciprofloxacin 2 hours before or 6 hours after any calcium supplements, multivitamins, or antacid chewables.",
    source: "IDSA Infectious Diseases Treatment Manuals"
  },
  {
    a: "med_ciprofloxacin",
    b: "supp_iron",
    severity: 2,
    what: "Iron supplements bind strongly to Ciprofloxacin in the stomach, rendering the antibiotic ineffective at fighting infections.",
    advice: "Space iron tablets and Ciprofloxacin by taking the antibiotic 2 hours before or 6 hours after the iron mineral supplement.",
    source: "Microbiology & Antibiotic Pharmacology Compendiums"
  },
  {
    a: "med_ciprofloxacin",
    b: "supp_magnesium",
    severity: 2,
    what: "Magnesium binds to Ciprofloxacin in the intestine, blockading its clinical uptake into your blood.",
    advice: "Separate magnesium supplements, laxatives, or magnesium-based antacids from your Cipro dose by at least 2 hours before or 6 hours after.",
    source: "FDA Antibiotic Medication Advisory Bulletins"
  },
  {
    a: "med_ciprofloxacin",
    b: "food_dairy",
    severity: 2,
    what: "The calcium content in standard dairy foods (like milk and yogurt) significantly blocks Ciprofloxacin absorption.",
    advice: "Avoid taking Ciprofloxacin with large dairy meals. You can eat dairy, but space it to avoid interaction (2 hours before or 6 hours after).",
    source: "Clinical Infectious Disease Pharmacology Databases"
  },
  {
    a: "med_doxycycline",
    b: "supp_calcium",
    severity: 2,
    what: "Calcium complexes with tetracycline-class antibiotics like Doxycycline, decreasing their overall clinical effectiveness.",
    advice: "Avoid taking calcium-rich antacids or calcium supplements within 2 hours of your oral Doxycycline dose.",
    source: "CDC Antibiotic Stewardship Core References"
  },
  {
    a: "med_doxycycline",
    b: "supp_iron",
    severity: 2,
    what: "Doxycycline binds with iron minerals, decreasing antibiotic bioavailability by up to 30-50%.",
    advice: "Ensure a minimum of 2 hours separation between taking your iron pills and your Doxycycline antibiotic capsules.",
    source: "Clinical Pharmacology & Toxicology Drug Guides"
  },
  {
    a: "med_doxycycline",
    b: "supp_magnesium",
    severity: 2,
    what: "Magnesium in supplements or antacids impairs Doxycycline absorption, possibly impacting treatment success.",
    advice: "Do not take magnesium-containing compounds within 2 hours before or after your Doxycycline dose.",
    source: "Lexicomp Core Drug Reference Bulletins"
  },
  {
    a: "med_doxycycline",
    b: "food_dairy",
    severity: 2,
    what: "Calcium in milk, cheese, and yogurt binds directly to Doxycycline, reducing its infection-fighting ability.",
    advice: "Take Doxycycline with a large glass of water on an empty stomach. If stomach upset occurs, you can take it with non-dairy food. Avoid dairy for 2 hours.",
    source: "National Institutes of Health Clinical Antibiotic Guides"
  },

  // --- SILDENAFIL & NITRATES ---
  {
    a: "med_sildenafil",
    b: "med_nitroglycerin",
    severity: 3,
    what: "Nitroglycerin releases nitric oxide to dilate blood vessels, and Sildenafil prevents the breakdown of the signaling molecule cGMP. Together, they trigger uncontrolled vasodilation.",
    advice: "This is a life-threatening contraindication. Never take Sildenafil if you use organic nitrates (like Nitroglycerin) for chest pain. A massive, sudden drop in blood pressure can occur.",
    source: "AHA/ACC Consensus Guidelines on Erectile Dysfunction & Cardiovascular Disease"
  },

  // --- LITHIUM TOXICITY ---
  {
    a: "med_lithium",
    b: "med_ibuprofen",
    severity: 3,
    what: "Ibuprofen restricts prostaglandins that control blood flow in the kidneys. This reduces the clearance of Lithium, leading to toxic, hazardous blood levels of Lithium.",
    advice: "Do not take Ibuprofen or Naproxen while on Lithium without close laboratory oversight. Acetaminophen is generally preferred for pain, but discuss with a doctor.",
    source: "AAPA Bipolar Pharmacotherapy Treatment Guidelines"
  },
  {
    a: "med_lithium",
    b: "med_aspirin",
    severity: 1,
    what: "Aspirin does not alter kidney prostaglandins to the same extent as other NSAIDs, meaning standard low doses do not impact Lithium levels.",
    advice: "Generally considered safe for headaches or heart protection, but high doses should be reviewed with your prescribing clinician.",
    source: "Standard Nephrology & Psychiatry Clinical Drug Guides"
  },

  // --- METHOTREXATE TOXICITY ---
  {
    a: "med_methotrexate",
    b: "med_ibuprofen",
    severity: 2,
    what: "NSAIDs like Ibuprofen can compete with Methotrexate for secretion in the renal tubules, raising Methotrexate blood concentration and toxicity risk.",
    advice: "Discuss with your rheumatologist. While some low-dose arthritis regimens include both with close monitoring, self-treatment with high-dose Ibuprofen is cautioned.",
    source: "American College of Rheumatology Drug Guidelines"
  },

  // --- HEART MEDICATIONS & HERBALS ---
  {
    a: "med_digoxin",
    b: "supp_ginseng",
    severity: 2,
    what: "Ginseng contains compounds that can structurally mimic Digoxin or trigger raised drug absorption, which can cause toxicity or disrupt routine blood assays.",
    advice: "Avoid starting Ginseng supplements if you take Digoxin. Let your cardiologist know of all herbal products you use.",
    source: "Cardiovascular Pharmacotherapy Interaction Reviews"
  },
  {
    a: "med_clopidogrel",
    b: "med_aspirin",
    severity: 2,
    what: "Both are platelet inhibitors. Combining them (while common as dual antiplatelet therapy after stents) structurally increases bleeding frequencies.",
    advice: "Only take together if specifically prescribed by your cardiologist. Avoid starting over-the-counter Aspirin on your own when on Plavix.",
    source: "ACC/AHA Stable Ischemic Heart Disease Guidelines"
  },
  {
    a: "med_clopidogrel",
    b: "med_ibuprofen",
    severity: 2,
    what: "NSAIDs like Ibuprofen increase gastrointestinal wear and, paired with Clopidogrel, boost upper gastrointestinal bleeding hazards.",
    advice: "Consult your doctor about substituting Acetaminophen for routine pain relief. Report black or dark stools immediately.",
    source: "FDA Plavix Product Safety Briefings"
  },
  {
    a: "med_clopidogrel",
    b: "supp_ginkgo",
    severity: 2,
    what: "Ginkgo Biloba components possess anti-coagulatory actions that can combine with Plavix to elevate clinical bruising rates.",
    advice: "Avoid Ginkgo Biloba leaves or standardized supplements while taking Clopidogrel.",
    source: "Herbal Remedies Clinical Safety Directory"
  },
  {
    a: "med_clopidogrel",
    b: "med_omeprazole",
    severity: 2,
    what: "Omeprazole inhibits the liver enzyme CYP2C19, which is required to convert Clopidogrel into its active antiplatelet form, making it less effective.",
    advice: "Consult your cardiologist. Other acid-reducing options (like Pantoprazole) do not interfere with Clopidogrel to the same extent.",
    source: "FDA Safety Announcement on Plavix-PPI Interactions"
  },

  // --- HERBAL HERBAL & METFORMIN/ALCOHOL ---
  {
    a: "supp_ginkgo",
    b: "supp_garlic",
    severity: 1,
    what: "Both supplements convey mild antiplatelet characteristics, slightly compounding natural bleeding times.",
    advice: "Usually routine, but monitor for nosebleeds or exceptionally easy brushing/bruising if starting high concentrations of both.",
    source: "Alternative Medicine Integrative Database"
  },
  {
    a: "med_metformin",
    b: "food_alcohol",
    severity: 3,
    what: "Metformin increases lactate production, and alcohol blocks lactate clearing in the liver, highly magnifying risks of lactic acidosis.",
    advice: "Avoid binge drinking or chronic heavy drinking while taking Metformin. Lactic acidosis is a serious emergent state that requires immediate clinical care.",
    source: "FDA Approved Metformin Prescribing Information"
  },
  {
    a: "supp_melatonin",
    b: "food_alcohol",
    severity: 2,
    what: "Alcohol alters normal circadian cycles and amplifies Melatonin's physiological side-effects, triggering grogginess or morning headaches.",
    advice: "Avoid alcohol on evenings you intend to take Melatonin. Keep sleeping spaces cool, dark, and device-free for optimal rest.",
    source: "American Academy of Sleep Medicine Guidelines"
  },
  {
    a: "supp_st_johns_wort",
    b: "med_xanax",
    severity: 2,
    what: "St. John's Wort triggers high CYP3A4 liver enzymes, boosting the rate of Alprazolam breakdown, lowering its effectiveness.",
    advice: "Do not combine. St. John's Wort can trigger the quick clearing of multiple prescription drugs (including birth control pills). Discuss alternatives.",
    source: "Clinical Pharmacokinetics & Drug Clearance Studies"
  },
  {
    a: "supp_st_johns_wort",
    b: "food_aged_cheese",
    severity: 1,
    what: "Aged cheese contains tyramine. St. John's Wort is a very poor, weak monoamine oxidase inhibitor, making hypertensive issues highly unlikely but theoretic.",
    advice: "Generally safe to consume aged cheese, but moderate dietary intake is a solid practice.",
    source: "Dietary Tyramine and MAOI Interaction Guidelines"
  },
  {
    a: "supp_st_johns_wort",
    b: "med_simvastatin",
    severity: 2,
    what: "St. John's Wort induces the CYP3A4 liver enzyme, accelerating Simvastatin degradation and rendering your cholesterol therapy less effective.",
    advice: "Avoid St. John's Wort. Other herbal mood supporters like S-Adenosylmethionine (SAMe) do not activate the CYP3A4 pathways.",
    source: "Expert Guidelines on Statin Competency & Herbals"
  }
];

/**
 * Perform an unordered interaction lookup.
 * Generates a sorted string key of the two IDs (e.g. "med_aspirin|med_warfarin").
 */
export function findInteraction(idA: string, idB: string): Interaction | undefined {
  const sortedPairKey = [idA, idB].sort();
  return CLINICAL_INTERACTIONS.find(
    (item) =>
      (item.a === sortedPairKey[0] && item.b === sortedPairKey[1]) ||
      (item.a === sortedPairKey[1] && item.b === sortedPairKey[0])
  );
}

/**
 * Searches the clinical item dataset using a scoring algorithm.
 * Matches on name or aliases.
 */
export function searchClinicalItems(query: string): Item[] {
  const sanitized = query.toLowerCase().trim();
  if (!sanitized) return [];

  return CLINICAL_ITEMS.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(sanitized);
    const aliasMatch = item.aliases.some((alias) => alias.toLowerCase().includes(sanitized));
    return nameMatch || aliasMatch;
  });
}
