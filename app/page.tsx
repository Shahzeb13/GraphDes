import { getContent } from "@/lib/content";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import Work from "@/components/Work";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Navbar {...content.navbar} />
      <Hero {...content.hero} />
      <About {...content.about} />
      <Work {...content.work} />
      <Contact {...content.contact} />
      <Footer {...content.footer} />
      <Reveal />
    </>
  );
}