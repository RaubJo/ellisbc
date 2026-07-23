import { A } from "@solidjs/router"

const REGISTRATION_URL = "https://ellisbc.churchtrac.com/connect?ei=EBZL1SU"

export default function VbsBanner() {
    return (
        <section class="w-full bg-white px-5 py-8 sm:px-8 md:px-12 lg:px-20">
            <div class="mx-auto flex max-w-7xl flex-col gap-6 overflow-hidden bg-blue-100 px-6 py-8 text-white sm:px-8 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                <div class="max-w-3xl">
                    <p class="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.28em] text-white/75">
                        Vacation Bible School
                    </p>
                    <h2 class="font-seasons text-4xl font-bold leading-none sm:text-5xl lg:text-6xl">
                        Emerald Crossing
                    </h2>
                    <p class="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/88 sm:text-lg">
                        Registration is open now. Reserve your child&apos;s spot for Vacation Bible School.
                    </p>
                </div>

                <div class="flex shrink-0 w-full lg:w-auto">
                    <A
                        href={REGISTRATION_URL}
                        target="_blank"
                        class="inline-flex min-h-13 w-full items-center justify-center bg-white px-6 py-3 font-sans text-sm font-semibold uppercase tracking-[0.22em] text-blue-100 transition-colors hover:bg-white/90 sm:px-8 lg:w-auto"
                    >
                        Register Now
                    </A>
                </div>
            </div>
        </section>
    )
}
