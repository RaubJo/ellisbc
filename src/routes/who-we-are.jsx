import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import BackToTop from "@/components/back_to_top"
import { query, createAsync } from "@solidjs/router"
import Highlights from "@/components/highlights"

const getMission = query(async () => {
    "use server"
    return [
        {
            title: "Abide in Christ",
            content: "Dwelling in Christ’s presence and inviting others into a life-changing relationship with Him.",
            background: 'bg-blue-40',
        },
        {
            title: "Fulfill His Word",
            content: "Growing into Christ’s likeness by learning and living the Scriptures, and discipling others to do the same.",
            background: 'bg-blue-80',
        },
        {
            title: "Proclaim His glory",
            content: "Passionately praising God’s work in our lives, and proclaiming the gospel to further his kingdom.",
            background: 'bg-blue-100',
        },
    ]

})

export default function WhoWeAre() {
    const mission = createAsync(() => getMission())

    return (
    <>
        <Nav />
        <Hero angles={false} subtitle="Who We Are" />
        <section class="w-full bg-white flex flex-col pt-12 px-10 text-black pb-12">
            <h1 class="text-6xl font-serif font-bold mb-8">Who we Are</h1>
            <p class="text-xl font-sans">
                Elit deserunt commodo do fugiat et adipisicing anim consequat occaecat ipsum esse sunt anim mollit tempor. Ullamco cupidatat non laboris Lorem quis mollit sint ullamco adipisicing commodo dolor. Amet qui ullamco sunt aliqua aliqua sit consectetur ut est non esse ut excepteur laboris. Excepteur aliqua voluptate cillum eiusmod aliqua.
            </p>
        </section>

        <section id="what-to-expect" class="w-full bg-white flex flex-col pt-12 px-10 text-black pb-12 scroll-mt-24">
            <h1 class="text-6xl font-serif font-bold mb-8">What to Expect</h1>
            <p class="text-xl font-sans">
                Elit deserunt commodo do fugiat et adipisicing anim consequat occaecat ipsum esse sunt anim mollit tempor. Ullamco cupidatat non laboris Lorem quis mollit sint ullamco adipisicing commodo dolor. Amet qui ullamco sunt aliqua aliqua sit consectetur ut est non esse ut excepteur laboris. Excepteur aliqua voluptate cillum eiusmod aliqua.
            </p>
        </section>

        <Highlights />
        <Footer />
        <BackToTop />
    </>
  );
}
