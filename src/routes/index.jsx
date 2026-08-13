import Nav from "@/components/nav"
import Hero from "@/components/hero"
import RegistrationBanner from "@/components/registration_banner"
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
        <RegistrationBanner />
        <section class="w-full py-12 bg-white px-12 flex">
            <div class="mx-auto w-full sm:w-4/5 text-center">
                <p class="mx-auto text-black text-2xl md:text-5xl font-sans font-light">Ellis Baptist Church is a <u class="green">soul winning,</u> <u class="blue">disciple making,</u> <u class="yellow">leadership equipping,</u> <u class="red">church planting church</u>.</p>
            </div>
        </section>
        <TriCTA />
        <ServiceTimes />
        <Location />
        <Events />
        <Footer />
        <BackToTop />
    </>
  );
}
