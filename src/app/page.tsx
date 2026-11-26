import Header from "@/blocks/header";
import CtaCards from "@/blocks/cta-cards";
import KnowBeforeYouGo from "@/blocks/know-before";
import Footer from "@/blocks/footer";
import HomeSections from "@/components/home-sections";
import { getIndexedPlaces } from "@/lib/places";

export const revalidate = 3600;

export default async function Home() {
  const places = await getIndexedPlaces();
  const records = places.map(({ id, fields }) => ({ id, fields }));
  const links = Object.fromEntries(places.map((p) => [p.id, p.slug]));
  return (
    <>
      <Header />
      <main>
        <HomeSections records={records} links={links} />
        <CtaCards />
        <KnowBeforeYouGo />
      </main>
      <Footer />
    </>
  );
}
