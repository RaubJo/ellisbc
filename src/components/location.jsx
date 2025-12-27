import { A } from "@solidjs/router";

export default function Location() {
    return (
        <section class="relative w-full h-fit md:h-screen flex flex-col md:flex-row  justify-end overflow-x-hidden">
            <img src="/images/map.png" class="inset-0 w-full object-cover scale-200 md:scale-100 -z-10" />
            <div class="bg-white md:h-full w-full h-1/2 md:w-1/2 lg:w-1/3 px-10 flex md:absolute"> 
                <div class="text-black font-sans flex flex-col text-lg md:text-2xl gap-4 my-auto py-10">
                    <h1 class="text-3xl md:text-5xl font-serif">Our Location</h1>
                    <A href="#">
                        107 W 9th St. <br />
                        Ellis, KS 67637
                    </A>
                    <A href="tel:+17857263657">785.726.3567</A>
                    <A href="mailto:info@ellisbc.org">info@ellisbc.org</A>
                    <button class="bg-[#1D263D] uppercase text-white w-fit h-fit px-6 py-3 cursor-pointer hover:bg-[#1D263DAA] transition-colors select-none">
                        Directions
                    </button>
                </div>
            </div>

        </section>
    )
}
