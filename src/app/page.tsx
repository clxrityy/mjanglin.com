import Hero from "@/components/Hero";
import Socials from "@/components/Socials";
import Contact from "@/components/Contact";
import { Suspense } from "react";
import Loading from "@/components/Loading";


export default function Home() {

  return (
    <div className="h-screen scroll-smooth container overflow-y-auto snap-none md:snap-y">
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Socials />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Contact />
      </Suspense>
    </div>
  );
}
