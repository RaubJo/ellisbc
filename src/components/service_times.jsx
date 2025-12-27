export default function ServiceTimes() {
    return (
        <section class="w-full relative px-10 pb-4 h-fit">
            <img src="/images/pew.png" class="inset-0 w-full absolute -z-10 h-full object-cover" />

            <div class="bg-white h-fit w-fit p-(--padding) mx-auto [--padding:--spacing(4)] sm:[--padding:--spacing(8)] md:[--padding:--spacing(10)] mb-18 lg:mb-24 lg:mr-[10vw] lg:ml-auto">
                <h1 class="font-serif text-black text-4xl lg:text-5xl mb-10 whitespace-nowrap">Service Times</h1>

                <div class="mb-8">
                    <h2 class="font-sans font-light text-black text-3xl">Sunday</h2>
                    <p class="font-sans font-light text-black text-xl">Sunday School 10:00am</p>
                    <p class="font-sans font-light text-black text-xl">Worship 11:00am</p>    
                </div>
               

                <div class="">
                    <h2 class="font-sans font-light text-black text-3xl">Wednesday</h2>
                    <p class="font-sans font-light text-black text-xl">Prayer 7:00pm</p>
                </div>


                <div class="-mx-(--padding) w-[calc(100%+(var(--padding)*2))] bg-green-100 relative">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-full absolute top-(--padding) left-0">
                        <polygon points="50,18 0,0 100,0" fill="white"/>
                    </svg>
                </div>
            </div>
        </section>
    )
}
