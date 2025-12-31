import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Footer from "@/components/footer"
import BackToTop from "@/components/back_to_top"
import { query, createAsync } from "@solidjs/router"

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

export default function OurMission() {
    const mission = createAsync(() => getMission())

    return (
    <>
        <Nav />
        <Hero angles={false} subtitle="Our Mission" />
        <section class="w-full bg-white flex flex-col pt-12 items-center">

            <div class="text-black mx-auto font-serif flex flex-col text-4xl md:text-6xl lg:text-7xl md:px-8 md:py-8 relative md:m-8 leading-snug mb-[12vh] w-fit">
                <div class="hidden md:block w-1/2 bg-linear-to-r h-px from-gold-30/50 to-white absolute top-0 left-0"/>
                <div class="hidden md:block h-1/2 bg-linear-to-b w-px from-gold-30/50 to-white absolute top-0 left-0"/>
                <div class="hidden md:block h-1/2 bg-linear-to-t w-px from-gold-30/50 to-white absolute bottom-0 right-0"/>
                <div class="hidden md:block w-1/2 bg-linear-to-l h-px from-gold-30/50 to-white absolute bottom-0 right-0"/>

                <For each={mission()}>
                    {({title}) => (<span>{title}</span>)}
                </For>
            </div>

            <For each={mission()}>
                {({title, content, background}) => (
                <div class="w-full pt-12 pb-24 px-8 md:px-12 lg:px-24" classList={{[background]: true}}>
                    <h1 class="font-serif text-4xl md:text-5xl mb-8">{title}</h1>
                    <p class="text-2xl font-thin leading-relaxed w-full md:w-3/4 font-sans">
                        {content}
                    </p>
                </div>
                )}
            </For>
        </section>
        <Footer />
        <BackToTop />
    </>
  );
}
