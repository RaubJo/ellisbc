import Footer from "@/components/footer"
import Nav from "@/components/nav"
import { A } from "@solidjs/router"
import Chevron from "@/icons/chevron.svg"

export default function NotFound() {
  return (
    <>
    <Nav clear={false}/>
    <div class="bg-white h-32 pointer-events-none"></div>
    <section class="bg-white w-full py-12 px-20">
        <h1 class="font-seasons text-7xl text-black font-bold mb-8">Page Not Found</h1>
        <div class="flex gap-4 items-center">
            <button onClick={() => window.history.back()} class="text-2xl cursor-pointer inline-flex text-black group hover:text-red-100 transition-colors"><Chevron class="rotate-180 h-5 my-auto fill-black group-hover:fill-red-100 transition-colors"/>Back</button>
            <A href="/" class="text-black text-2xl hover:text-red-100 transition-colors">Home</A>
        </div>
    </section>
    <Footer />
    </>
  );
}
