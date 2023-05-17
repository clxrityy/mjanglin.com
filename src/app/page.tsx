
import Hero from "@/components/Hero";
import Socials from "@/components/Socials";
import Contact from "@/components/Contact";


export default function Home() {
  return (
    <div className="h-screen scroll-smooth container overflow-y-auto snap-none md:snap-y">
      <Hero />
      <Socials />
      <Contact />
    </div>
  );
}
