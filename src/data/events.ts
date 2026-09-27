export interface MandalEvent {
  id: string;
  date: string;
  title: string;
  time?: string;
  description?: string;
  isPlaceholder?: boolean;
}

/** Navratri 2026 schedule — official mandal programme */
export const navratriEvents: MandalEvent[] = [
  {
    id: "e1",
    date: "११ ऑक्टोबर २०२६",
    title: "घटस्थापना व श्री दुर्गा मातेच्या आगमनाचा सोहळा",
    time: "सायंकाळी",
    description: "घटस्थापना व श्री दुर्गा मातेच्या आगमनासाठी भव्य शोभायात्रा",
  },
  {
    id: "e2",
    date: "१२–१७ ऑक्टोबर २०२६",
    title: "नवरात्र उत्सव — दैनंदिन कार्यक्रम",
    description: "आरती, भजन, सांस्कृतिक कार्यक्रम व दर्शन",
  },
  {
    id: "e3",
    date: "१८ ऑक्टोबर २०२६",
    title: "महाहवन",
    time: "सकाळी ६:०० वाजता",
    description: "महाहवनाचा पवित्र कार्यक्रम",
  },
  {
    id: "e4",
    date: "१९ ऑक्टोबर २०२६",
    title: "घट विसर्जन व भव्य महाप्रसाद",
    time: "दुपारी १:०० वाजता",
    description: "घट विसर्जनाची शोभायात्रा व महाप्रसाद",
  },
  {
    id: "e5",
    date: "२० ऑक्टोबर २०२६",
    title: "दसऱ्याच्या हार्दिक शुभेच्छा",
    description: "दसऱ्यानिमित्त सर्व भक्तांना हार्दिक शुभेच्छा",
  },
  {
    id: "e6",
    date: "२१ ऑक्टोबर २०२६",
    title: "श्री दुर्गा मातेच्या विसर्जनाचा सोहळा",
    time: "सायं. ७:०० वाजता",
    description: "श्री दुर्गा मातेच्या विसर्जनाचा सोहळा",
  },
];

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const programs: Program[] = [
  {
    id: "p1",
    title: "शोभायात्रा",
    description: "श्री दुर्गा मातेच्या आगमनासाठी भव्य शोभायात्रा",
    icon: "🚩",
  },
  {
    id: "p2",
    title: "महाआरती",
    description: "दररोज श्री दुर्गा मातेची महाआरती",
    icon: "🪔",
  },
  {
    id: "p3",
    title: "भजन / कीर्तन",
    description: "भक्तिमय भजन आणि कीर्तनाचे कार्यक्रम",
    icon: "🎵",
  },
  {
    id: "p4",
    title: "गरबा / दांडिया",
    description: "नवरात्रीच्या रात्री गरबा आणि दांडिया",
    icon: "💃",
  },
  {
    id: "p5",
    title: "महाप्रसाद",
    description: "भव्य महाप्रसादाचे आयोजन",
    icon: "🍽️",
  },
  {
    id: "p6",
    title: "रक्तदान शिबिर",
    description: "समाजासाठी रक्तदान शिबिराचे आयोजन",
    icon: "❤️",
  },
  {
    id: "p7",
    title: "आरोग्य शिबिर",
    description: "आरोग्य तपासणी शिबिर",
    icon: "🏥",
  },
  {
    id: "p8",
    title: "विसर्जन सोहळा",
    description: "श्री दुर्गा मातेच्या विसर्जनाचा सोहळा",
    icon: "🌊",
  },
];

/** Compact festival highlights for the programme overview */
export const festivalHighlights: Program[] = [
  {
    id: "h1",
    title: "घटस्थापना",
    description: "देवीचे आगमन व अखंड ज्योत",
    icon: "🌺",
  },
  {
    id: "h2",
    title: "नवरात्र उत्सव",
    description: "नऊ दिवस भक्ती व संस्कृती",
    icon: "🙏",
  },
  {
    id: "h3",
    title: "आरती व भजन",
    description: "दैनंदिन आरती आणि भजन",
    icon: "🪔",
  },
  {
    id: "h4",
    title: "सांस्कृतिक कार्यक्रम",
    description: "गरबा, दांडिया व सांस्कृतिक उपक्रम",
    icon: "🎭",
  },
  {
    id: "h5",
    title: "महाप्रसाद",
    description: "भव्य महाप्रसादाचे आयोजन",
    icon: "🍚",
  },
  {
    id: "h6",
    title: "दुर्गा माता विसर्जन",
    description: "विसर्जनाचा भव्य सोहळा",
    icon: "🌺",
  },
];

export const participationItems = [
  "कार्यक्रमांना उपस्थित रहा",
  "दर्शन घ्या",
  "महाप्रसादाचा लाभ घ्या",
  "सामाजिक उपक्रमांना सहकार्य करा",
] as const;
