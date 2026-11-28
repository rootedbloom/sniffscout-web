import type { Metadata } from "next";
import Header from "@/blocks/header";
import About from "@/blocks/about";
import { BlockSettings } from "@/lib/editable-settings";

// Same title and description as the Softr About page.
const title = "About SniffScout | Dog-Friendly Directory from Union, KY";
const description = "SniffScout is a dog-friendly directory started in Union, KY. See how we verify restaurants, bars and shops around Northern Kentucky and Cincinnati.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
};

// Photos currently saved on the Softr About page.
const A = "https://lmqrgeh284epdg91.public.blob.vercel-storage.com/site/";
const photos = {
  "photo-hero-illustration": { src: A + "bad64916-acab-45dc-967d-39fc0c34d75a.png", alt: "Illustration of Jamie in her orange SniffScout shirt sitting with Marley the Goldendoodle and Bella the Cavapoo" },
  "photo-marley": { src: A + "3b2430d0-f649-4adf-a5f8-da30b8ff4f34.jpeg", alt: "Marley, Jamie's Goldendoodle, lying in the grass with her paw-print soccer ball and a big smile" },
  "photo-jamie-bella": { src: A + "eec44d70-54b4-4b8a-a9ec-2ae3a05ad883.jpeg", alt: "Jamie holding Bella, her Cavapoo" },
  "photo-bella": { src: A + "828a77c0-78cf-4ef0-aeea-05762148c3fc.jpeg", alt: "Bella, a Cavapoo, resting in her cozy gray dog bed and looking at the camera" },
  "photo-couch": { src: A + "63a2d874-bae7-4c2d-a2c3-ba49e8b577ee.jpeg", alt: "Marley and Bella side by side on the couch" },
  "photo-cta-beagle": { src: "https://files.leadconnectorhq.com/file/6b0aece33abd65885509ae07/sniffscout-beagle.webp", alt: "Beagle in an orange SniffScout bandana sniffing the ground" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <BlockSettings values={photos}><About /></BlockSettings>
      </main>
    </>
  );
}
