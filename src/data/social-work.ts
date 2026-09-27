/** Programs listed on official mandal website */
export interface SocialInitiative {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const socialInitiatives: SocialInitiative[] = [
  {
    id: "s1",
    title: "रक्तदान शिबिर",
    description: "नवरात्र उत्सवात रक्तदान शिबिराचे आयोजन",
    icon: "🩸",
  },
  {
    id: "s2",
    title: "आरोग्य शिबिर",
    description: "आरोग्य तपासणी शिबिराचे आयोजन",
    icon: "🏥",
  },
  {
    id: "s3",
    title: "अनाथ आश्रमाला देणगी",
    description: "विविध सामाजिक संस्थांना मंडळाकडून देणगी",
    icon: "🤝",
  },
  {
    id: "s4",
    title: "महाहवन",
    description: "नवरात्र उत्सवात महाहवनाचे आयोजन",
    icon: "🔥",
  },
  {
    id: "s5",
    title: "नवकण्या भोजन",
    description: "नवकण्या भोजनाचे आयोजन",
    icon: "🍽️",
  },
  {
    id: "s6",
    title: "अखंड मनोकामना ज्योत",
    description: "घटधारकांच्या सहभागातून अखंड ज्योत प्रज्वलन",
    icon: "🪔",
  },
];
