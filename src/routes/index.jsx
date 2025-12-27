import Nav from "@/components/nav"
import Hero from "@/components/hero"
import TriCTA from "@/components/tri_cta";
import ServiceTimes from "@/components/service_times";
import Location from "@/components/location";
import Events from "@/components/events";
import Footer from "@/components/footer"
import BackToTop from "@/components/back_to_top"

export default function Index() {
  return (
    <>
        <Nav />
        <Hero />
        <TriCTA />
        <ServiceTimes />
        <Location />
        <Events />
        <Footer />
        <BackToTop />
    </>
  );
}
