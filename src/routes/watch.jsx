import Footer from "@/components/footer"
import Nav from "@/components/nav"

export default function NotFound() {
  return (
    <>
    <Nav clear={false}/>
    <div class="bg-white h-32 pointer-events-none"></div>
    <section class="bg-white w-full py-12 px-20">
        <h1 class="font-seasons text-7xl text-black font-bold mb-8 text-left">Upcoming Events</h1>
    </section>
    <Footer />
    </>
  );
}
