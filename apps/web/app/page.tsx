import Header from "@/components/layout/Header/Header"
import Footer from "@/components/layout/Footer/Footer"
import About from "@/components/sections/About/About"
import Achievements from "@/components/sections/Achievements/Achievements"
import Concerns from "@/components/sections/Concerns/Concerns"
import Contact from "@/components/sections/Contact/Contact"
import MainVisual from "@/components/sections/MainVisual/MainVisual"
import Plan from "@/components/sections/Plan/Plan"
import Questions from "@/components/sections/Questions/Questions"
import Recruit from "@/components/sections/Recruit/Recruit"
import Service from "@/components/sections/Service/Service"
import SupportArea from "@/components/sections/SupportArea/SupportArea"
import SupportFlow from "@/components/sections/SupportFlow/SupportFlow"


export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <MainVisual />
        <Concerns />
        <Service />
        <SupportArea />
        <SupportFlow />
        <Plan />
        <Achievements />
        <About />
        <Questions />
        <Recruit />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
