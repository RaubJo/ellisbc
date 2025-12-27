import TriCTA from "@/components/tri_cta";
import ServiceTimes from "@/components/service_times";
import Location from "@/components/location";
import Events from "@/components/events";
import Footer from "@/components/footer"

export default function Index() {
  return (
    <>
        <div class="absolute bottom-0 left-0 size-10 bg-blue-500 sm:bg-green-500 md:bg-yellow-500 lg:bg-white xl:bg-red-500  z-50"></div>
    
        <TriCTA />
        <ServiceTimes />
        <Location />
        <Events />
        <Footer />
    </>
  );
}
