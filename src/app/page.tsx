import Contact from "@/components/Contact";
import Discord from "@/components/Discord";
import Hero from "@/components/Hero";
import { Button, Card, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";


export default function Home() {

  return (
    <main>
      <div className="flex flex-col items-center justify-around h-1/3 w-screen gap-6 lg:gap-10 mt-10 mb-20">
        <Hero />
        <div className="flex flex-col xl:flex-row items-center justify-center gap-4">
          <Contact />
          <Discord />
        </div>
        <Card
          radius="lg"
          className="border-none bg-[#6A7B6E] backdrop-blur-3xl shadow-inner"
        >
          <CardHeader className="text-gray-200 flex items-center">
            <h5 className="text-wrap font-bold text-base max-w-xs">
              Check out my latest album on Spotify!
            </h5>
          </CardHeader>
          <iframe src="https://open.spotify.com/embed/album/1hNcadbxNEZZtoCmIHVnyM?utm_source=generator" width="100%" height="168" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="eager" className="scroll-smooth overflow-y-scroll w-full"></iframe>
          {/* <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
              Notify me
            </Button>
          </CardFooter> */}
        </Card>
      </div>
      <div className="hidden lg:flex w-full items-center justify-center mx-auto h-full">
        Projects (to be continued...)
      </div>
    </main>
  )
}