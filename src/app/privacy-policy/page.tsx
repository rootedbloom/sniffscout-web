import type { Metadata } from "next";
import Header from "@/blocks/header";
import LegalPage, { type LegalSection } from "@/blocks/legal-page";

// Same title and description as the Softr Privacy Policy page.
const title = "Privacy Policy | SniffScout";
const description = "How SniffScout collects, uses and protects your information when you browse the directory, submit a place, claim a listing or join the Email Pack.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title, description, url: "/privacy-policy" },
};

const SECTIONS: LegalSection[] = [
  { h: "Overview", p: ["SniffScout is a directory of dog-friendly places. This policy explains what information we collect, how we use it, and the choices you have. By using the site you agree to this policy."] },
  { h: "Information we collect", p: ["<b>Information you give us.</b> When you submit a place or claim a business listing, we collect what you enter in the form, such as your name, email address, business name, role, the place's details, and any photos you upload.", "<b>Information collected automatically.</b> Like most websites, our hosting and analytics tools may collect basic technical data such as browser type, device, pages visited, and approximate location from your IP address."] },
  { h: "How we use information", p: ["We use information to publish and verify listings, contact you about a submission or claim, send emails you have requested (such as a welcome email after claiming a business), operate and improve the site, and keep it safe. We do not sell your personal information."] },
  { h: "What is public", p: ["Business details and photos shown in the directory are public. Contact information you provide as a submitter or business owner is used by us to reach you and is not intended to be displayed publicly."] },
  { h: "Service providers", p: ["We use trusted providers to run SniffScout, including website hosting, database, forms, and email services. They process information only to provide their services to us."] },
  { h: "Cookies", p: ["We and our providers may use cookies and similar technologies to keep the site working and understand how it is used. You can control cookies in your browser settings."] },
  { h: "Your choices", p: ["You can ask us to access, correct, or delete the personal information you have given us, or to remove a listing, by emailing {EMAIL}. You can unsubscribe from any marketing email using the link in the message."] },
  { h: "Children", p: ["SniffScout is not directed to children under 13, and we do not knowingly collect their personal information."] },
  { h: "Changes to this policy", p: ["We may update this policy from time to time. The date at the top shows when it was last changed."] },
  { h: "Contact", p: ["Questions about privacy? Email {EMAIL}."] },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main><LegalPage title="Privacy Policy" sub="How SniffScout handles your information." updated="November 2026" sections={SECTIONS} /></main>
    </>
  );
}
