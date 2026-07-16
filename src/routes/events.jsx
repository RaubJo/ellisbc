import Footer from "@/components/footer"
import Nav from "@/components/nav"
import Highlights from "@/components/highlights"

const CALENDAR_URL = "https://www.churchtrac.com/public_calendar?ui=E95F0D21"

export default function Events() {
    return (
        <>
        <Nav clear={false} />
        <div class="bg-white h-32 pointer-events-none"></div>
        <section class="bg-white w-full px-5 py-10 text-black sm:px-8 sm:py-12 md:px-12 lg:px-20">
            <div class="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10">
                <div class="max-w-3xl">
                    <h1 class="mb-4 text-left font-seasons text-4xl font-bold sm:text-5xl lg:text-7xl">
                        Upcoming Events
                    </h1>
                </div>

                <div class="-mx-5 sm:-mx-8 md:-mx-12 lg:mx-0">
                    <iframe
                        src={CALENDAR_URL}
                        title="Ellis Baptist Church event calendar"
                        class="block h-[1150px] w-full border-0 lg:h-[1350px]"
                        loading="lazy"
                        referrerpolicy="strict-origin-when-cross-origin"
                    />
                </div>
            </div>
        </section>
        <Highlights />
        <Footer />
        </>
    )
}
