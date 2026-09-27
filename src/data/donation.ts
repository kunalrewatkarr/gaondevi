import { contactInfo } from "@/data/contact";

/**
 * Donation / contribution config.
 * Leave upiId and qrCodeImage empty until the organizer provides exact details.
 * Do NOT invent UPI IDs from the phone number.
 */
export const donationConfig = {
  heading: "देवीच्या उत्सवासाठी आपले योगदान",
  description:
    "मंडळाच्या उत्सव व सामाजिक उपक्रमांसाठी आपले योगदान महत्त्वाचे आहे.",
  ctaLabel: "योगदान द्या",
  phone: contactInfo.phone,
  /** Exact UPI ID from organizer — leave empty until confirmed */
  upiId: "",
  /** Path under /public, e.g. "/images/donation/upi-qr.png" */
  qrCodeImage: "",
  /** Display name for UPI payee — leave empty until confirmed */
  payeeName: "",
  bankDetails: {
    accountName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
  },
} as const;

export function isDonationPaymentReady(): boolean {
  return Boolean(donationConfig.upiId || donationConfig.qrCodeImage);
}

export function buildUpiPayLink(amount?: string): string | null {
  if (!donationConfig.upiId) return null;

  const params = new URLSearchParams({
    pa: donationConfig.upiId,
    cu: "INR",
  });

  if (donationConfig.payeeName) {
    params.set("pn", donationConfig.payeeName);
  }

  if (amount) {
    params.set("am", amount);
  }

  return `upi://pay?${params.toString()}`;
}
