import { resolveFirstExisting } from "@/lib/media";

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  image: string;
  /** Main bearers sit above; accountants are a separate row */
  line: "पदाधिकारी" | "हिशोबनीस";
  description?: string;
}

const namedPhotos: Record<string, string> = {
  "01": "/images/committee/ajay-adhyaksha",
  "02": "/images/committee/bhushan-upaadhyaksha",
  "03": "/images/committee/atul-sachiv",
  "04": "/images/committee/sandip-sahasachiv",
  "05": "/images/committee/vikas-koshadhyaksha",
  "07": "/images/committee/sudhir-hishobnis",
  "10": "/images/committee/pranit-hisobnis",
};

function memberPhoto(id: string): string {
  const stems = [
    namedPhotos[id],
    `/images/committee/${id}`,
    `/images/committee/member-${id}`,
  ].filter(Boolean) as string[];

  const found = resolveFirstExisting(stems, "");
  return found;
}

/** Main office-bearers, then हिशोबनीस on their own row. Photos: 01.webp … in public/images/committee/ */
export const committeeMembers: CommitteeMember[] = [
  { id: "01", name: "अजय इंगोले", role: "अध्यक्ष", line: "पदाधिकारी", image: memberPhoto("01") },
  { id: "02", name: "भूषण भोयर", role: "उपाध्यक्ष", line: "पदाधिकारी", image: memberPhoto("02") },
  { id: "03", name: "अतुल आचारी", role: "सचिव", line: "पदाधिकारी", image: memberPhoto("03") },
  { id: "04", name: "संदीप डोये", role: "सहसचिव", line: "पदाधिकारी", image: memberPhoto("04") },
  { id: "05", name: "विकास तभाने", role: "कोषाध्यक्ष", line: "पदाधिकारी", image: memberPhoto("05") },
  { id: "06", name: "नितीन घोटेकर", role: "सहकोषाध्यक्ष", line: "पदाधिकारी", image: memberPhoto("06") },
  { id: "08", name: "सुशांत नाखले", role: "हिशोबनीस", line: "हिशोबनीस", image: memberPhoto("08") },
  { id: "10", name: "प्रणित जीवतोडे", role: "हिशोबनीस", line: "हिशोबनीस", image: memberPhoto("10") },
  { id: "07", name: "सुधीर तिडके", role: "हिशोबनीस", line: "हिशोबनीस", image: memberPhoto("07") },
  { id: "11", name: "हर्ष ठाकरे", role: "हिशोबनीस", line: "हिशोबनीस", image: memberPhoto("11") },
];
