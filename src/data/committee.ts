import { resolveFirstExisting } from "@/lib/media";

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description?: string;
}

function memberPhoto(id: string): string {
  return resolveFirstExisting(
    [`/images/committee/${id}`, `/images/committee/member-${id}`],
    `/images/committee/member-${id}.svg`
  );
}

/** Names from the official mandal website. Photos: drop 01.webp … 10.webp in public/images/committee/ */
export const committeeMembers: CommitteeMember[] = [
  { id: "01", name: "अजय इंगोले", role: "अध्यक्ष", image: memberPhoto("01") },
  { id: "02", name: "भूषण भोयर", role: "उपाध्यक्ष", image: memberPhoto("02") },
  { id: "03", name: "अतुल आचारी", role: "सचिव", image: memberPhoto("03") },
  { id: "04", name: "संदीप डोये", role: "सहसचिव", image: memberPhoto("04") },
  { id: "05", name: "विकास तभाने", role: "कोषाध्यक्ष", image: memberPhoto("05") },
  { id: "06", name: "नितीन घोटेकर", role: "सहकोषाध्यक्ष", image: memberPhoto("06") },
  { id: "07", name: "सुधीर तिडके", role: "सहकोषाध्यक्ष", image: memberPhoto("07") },
  { id: "08", name: "सुशांत नाखले", role: "सहकोषाध्यक्ष", image: memberPhoto("08") },
  { id: "09", name: "अमित साबळे", role: "सहकोषाध्यक्ष", image: memberPhoto("09") },
  { id: "10", name: "प्रणित जीवतोडे", role: "सहकोषाध्यक्ष", image: memberPhoto("10") },
];
