import type { Metadata } from "next";
import Header from "@/blocks/header";
import SubmitPlace from "@/blocks/submit-place";

// Same title and description as the Softr Submit a Place page.
const title = "Submit a Dog-Friendly Spot | SniffScout";
const description = "Know a dog-friendly restaurant, bar, coffee shop or brewery in Northern Kentucky or Cincinnati? Suggest it to SniffScout and help other pups find a welcome spot.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/submit-a-place" },
  openGraph: { title, description, url: "/submit-a-place" },
};

export default function SubmitPlacePage() {
  return (
    <>
      <Header />
      <main><SubmitPlace /></main>
    </>
  );
}
