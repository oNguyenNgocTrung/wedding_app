import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import CoupleIntro from "@/components/CoupleIntro";
import AboutUs from "@/components/AboutUs";
import WhenWhere from "@/components/WhenWhere";
import RsvpForm from "@/components/RsvpForm";
import Gallery from "@/components/Gallery";
import ThankYou from "@/components/ThankYou";
import MusicPlayer from "@/components/MusicPlayer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Header />
      <MusicPlayer />
      <main>
        <HeroSlider />
        <CoupleIntro />
        <AboutUs />
        <WhenWhere />
        <RsvpForm />
        <Gallery />
        <ThankYou />
      </main>
      <ScrollToTop />
    </>
  );
}
