import type { Metadata } from "next";
import Header from "@/blocks/header";
import LegalPage, { type LegalSection } from "@/blocks/legal-page";

// Same title and description as the Softr Terms of Use page.
const title = "Terms of Use | SniffScout";
const description = "The terms for using SniffScout, the dog-friendly directory for Northern Kentucky and Cincinnati. Read them before you browse, submit a place or claim a listing.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title, description, url: "/terms" },
};

const SECTIONS: LegalSection[] = [
  { h: "Acceptance of terms", p: ["By accessing or using SniffScout, you agree to these Terms of Use. If you do not agree, please do not use the site."] },
  { h: "What SniffScout is", p: ["SniffScout is an online directory of dog-friendly places. Listing details come from our research, business owners, and community submissions. Dog policies change often, so please call ahead to confirm before you go."] },
  { h: "Accuracy of information", p: ["We work to keep listings accurate but do not guarantee that any information is complete, current, or error-free. \"SniffScout Verified\" means our team has reviewed a listing's dog-friendly details at a point in time. It is not a guarantee of a business's policies, safety, or conduct."] },
  { h: "Your submissions", p: ["When you submit a place, photos, or business information, you confirm that it is accurate to the best of your knowledge and that you have the right to share it. You grant SniffScout a non-exclusive, royalty-free license to display, edit for clarity, and promote that content on the site and related channels. We may remove or decline any submission at our discretion."] },
  { h: "Claiming a listing", p: ["Only owners or authorized representatives may claim a business listing. By claiming, you confirm you have that authority. We may ask for verification and may remove claims we cannot verify."] },
  { h: "Acceptable use", p: ["Do not misuse the site: no unlawful, misleading, or abusive content, no attempts to disrupt or gain unauthorized access, and no scraping or copying the directory at scale without our written permission."] },
  { h: "Your responsibility at venues", p: ["You are responsible for your dog's behavior and for following each venue's rules and local laws, including leash and vaccination requirements. SniffScout is not responsible for incidents involving pets, people, or property at any listed place."] },
  { h: "Third-party links", p: ["The site may link to third-party sites, such as business websites and forms. We do not control them and are not responsible for their content or practices."] },
  { h: "Intellectual property", p: ["The SniffScout name, logo, design, and original content belong to SniffScout. Business names and marks belong to their respective owners."] },
  { h: "Disclaimers and limitation of liability", p: ["The site is provided \"as is\" and \"as available\" without warranties of any kind. To the fullest extent permitted by law, SniffScout is not liable for indirect, incidental, or consequential damages arising from your use of the site."] },
  { h: "Changes and governing law", p: ["We may update these terms from time to time; continued use means you accept the changes. These terms are governed by the laws of the Commonwealth of Kentucky."] },
  { h: "Contact", p: ["Questions about these terms? Email {EMAIL}."] },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main><LegalPage title="Terms of Use" sub="The ground rules for using SniffScout." updated="November 2026" sections={SECTIONS} /></main>
    </>
  );
}
