import type { Metadata } from "next";
import Header from "@/blocks/header";
import Contact from "@/blocks/contact";
import { BlockSettings } from "@/lib/editable-settings";

// Same title and description as the Softr Contact page.
const title = "Contact SniffScout | Dog-Friendly Directory, Union KY";
const description = "Questions, feedback or a correction to a listing? Contact SniffScout, the dog-friendly directory for Northern Kentucky and Cincinnati.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
};

// Photo currently saved on the Softr Contact page.
const photos = {
  "contact-photo": { src: "https://lmqrgeh284epdg91.public.blob.vercel-storage.com/site/f735f81a-4e3d-442e-9d54-f7379a23c9fe.jpeg", alt: "Marley and Bella side by side on the couch" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <BlockSettings values={photos}><Contact /></BlockSettings>
      </main>
    </>
  );
}
