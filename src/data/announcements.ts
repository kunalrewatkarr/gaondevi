export interface Announcement {
  id: string;
  title: string;
  message: string;
  isActive: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "नवरात्र उत्सव २०२६",
    message:
      "घटस्थापना ११ ऑक्टोबर २०२६ पासून — कार्यक्रम, दर्शन व महाप्रसादासाठी सर्वांचे हार्दिक स्वागत.",
    isActive: false,
  },
];

/** ISO date for countdown — घटस्थापना / Navratri start */
export const festivalCountdownDate: string = "2026-10-11";
