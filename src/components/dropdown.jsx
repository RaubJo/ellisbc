import { A } from "@solidjs/router"
import isEmpty from "lodash/isEmpty"
import { createSignal, Show, For, onMount, onCleanup } from "solid-js"

const DropdownItem = (props) => (
    <A
        href={props.href}
        onClick={() => props.onNavigate?.()}
        class="block px-3.5 py-3 text-base border-l-4 border-l-white hover:border-l-gray-400"
    >
        <strong class="block mb-1 font-bold text-gray-900 text-xl">
            {props.title}
        </strong>
        <Show when={props.subtitle}>
            <span class="block font-medium leading-5 opacity-90 text-gray-900">
                {props.subtitle}
            </span>
        </Show>
    </A>
)

const DropdownContent = (props) => (
    <div class="flex items-stretch justify-center w-full max-w-2xl p-6 gap-x-3">
        <For each={props.columns}>
            {(column, idx) => (
                <Show
                    when={!column.items[idx()]?.block}
                    fallback={
                        <div class="shrink-0 w-48 bg-gray-200 border-8 border-gray-400">
                            <Show when={column.items[idx()]?.image}>
                                <img
                                    src={column.items[idx()].image.url}
                                    width={column.items[idx()].image.width}
                                    height={column.items[idx()].image.height}
                                    alt={column.items[idx()].image.alt}
                                    class="w-full h-full bg-white object-cover aspect-4/3"
                                />
                            </Show>
                        </div>
                    }
                >
                    <div class="w-60">
                        <Show when={column.header}>
                            <h2 class="mx-3.5 uppercase font-bold text-lg text-gray-900 border-b-4 border-green-600 pb-2 mb-6 tracking-wide w-fit">
                                {column.header}
                            </h2>
                        </Show>
                        <For each={column.items}>
                            {(item) => (
                                <DropdownItem
                                    href={item.href}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    onNavigate={props.onNavigate}
                                />
                            )}
                        </For>
                    </div>
                </Show>
            )}
        </For>
    </div>
)

const ChevronIcon = (props) => (
    <svg
        class={`relative top-px -ml-1 left-2 size-4 transition-transform duration-300 ${props.rotated ? "-rotate-180" : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
)

const NavLink = (props) => {
    return (
        <Show
            when={!isEmpty(props.item.columns)}
            fallback={
                <li>
                    <A
                        href={props.item.href ?? "#"}
                        target={props.item.target ?? "_self"}
                        rel={props.item.target === "_blank" ? "noreferrer" : undefined}
                        class="inline-flex items-center justify-center h-10 px-4 py-2 font-bold transition-colors hover:text-blue-20 w-max"
                    >
                        {props.item.name}
                    </A>
                </li>
            }
        >
            <li class={props.class}>
                <Show
                    when={props.item.href}
                    fallback={
                        <button
                            class={`inline-flex items-center justify-center h-10 px-3 lg:px-4 py-5 text-lg transition-colors w-max cursor-pointer ${
                                ""
                            } ${
                                props.isActive && "text-blue-20"
                            }`}
                            onMouseOver={(e) => props.onHover?.(e.currentTarget)}
                            onMouseLeave={() => props.onLeave?.()}
                            onClick={() => props.item.key && window.open(props.item.key, "_self")}
                        >
                            <span class="font-bold">{props.item.name}</span>
                            <ChevronIcon rotated={props.isActive} />
                        </button>
                    }
                >
                    <A
                        href={props.item.href}
                        target={props.item.target ?? "_self"}
                        rel={props.item.target === "_blank" ? "noreferrer" : undefined}
                        class={`inline-flex items-center justify-center h-10 px-3 lg:px-4 py-5 text-lg transition-colors w-max ${
                            ""
                        } ${
                            props.isActive && "text-blue-20"
                        }`}
                        onMouseOver={(e) => props.onHover?.(e.currentTarget)}
                        onMouseLeave={() => props.onLeave?.()}
                    >
                        <span class="font-bold">{props.item.name}</span>
                        <ChevronIcon rotated={props.isActive} />
                    </A>
                </Show>
            </li>
        </Show>
    )
}

const MobileSelect = (props) => {
    const [open, setOpen] = createSignal(false)
    let listRef

    const handleClickOutside = (e) => {
        if (listRef && !listRef.contains(e.target)) {
            setOpen(false)
        }
    }

    onMount(() => {
        document.addEventListener("click", handleClickOutside)
        onCleanup(() => document.removeEventListener("click", handleClickOutside))
    })

    return (
        <div class="relative">
            <button
                type="button"
                onClick={() => setOpen(!open())}
                class="min-h-9.5 text-white flex items-center justify-between w-full py-2 text-left cursor-pointer"
            >
                <span class="font-bold whitespace-nowrap">{props.label}</span>
                <ChevronIcon rotated={open()} />
            </button>

            <Show when={open()}>
                <ul
                    ref={listRef}
                    class="absolute z-30 w-fit mt-1 overflow-auto bg-white max-h-fit shadow-xl"
                >
                    <For each={props.options}>
                        {(option) => (
                            <li
                                onClick={() => {
                                    setOpen(false)
                                    props.onSelect?.(option.href)
                                }}
                                class="relative flex items-center h-full px-4 py-2 text-gray-900 cursor-pointer select-none hover:bg-gray-100"
                            >
                                <span class="block font-medium whitespace-nowrap">
                                    {option.title}
                                </span>
                            </li>
                        )}
                    </For>
                </ul>
            </Show>
        </div>
    )
}

const MobileNavLink = (props) => {
    const links = () =>
        props.item.columns
            ?.flatMap((col) => col.items)
            .filter((link) => link.title)
            .map((link) => ({ title: link.title, href: link.href })) ?? []

    return (
        <li class={props.class}>
            <MobileSelect
                label={props.item.name}
                options={links()}
                onSelect={(href) => window.location.href = href}
            />
        </li>
    )
}

export default function Navigation(props) {
    const [menuOpen, setMenuOpen] = createSignal(false)
    const [activeMenu, setActiveMenu] = createSignal("")
    let dropdownRef
    let closeTimeout

    const handleLeave = () => {
        closeTimeout = setTimeout(() => {
            setMenuOpen(false)
            setActiveMenu("")
        }, 200)
    }

    const handleHover = (element, itemName) => {
        clearTimeout(closeTimeout)
        setMenuOpen(true)
        setActiveMenu(itemName)

        if (dropdownRef && element) {
            dropdownRef.style.left = `${element.offsetLeft}px`
            dropdownRef.style.marginLeft = `${element.offsetWidth / 2}px`
        }
    }

    const clearCloseTimeout = () => clearTimeout(closeTimeout)

    onCleanup(() => clearTimeout(closeTimeout))

    const activeColumns = () =>
        props.links?.find((item) => item.name === activeMenu())?.columns

    return (
        <div class="relative z-40 h-fit my-auto">
            <ul class="flex flex-row items-center justify-end gap-3 lg:gap-8 list-none text-white w-full">
                <For each={props.links ?? []}>
                    {(item) => (
                        <>
                            <Show when={item.mobile !== false}>
                                <MobileNavLink item={item} class="md:hidden" />
                            </Show>
                            <NavLink
                                item={item}
                                class="hidden md:block"
                                isActive={activeMenu() === item.name}
                                onHover={(el) => handleHover(el, item.name)}
                                onLeave={handleLeave}
                            />
                        </>
                    )}
                </For>
            </ul>

            <div
                ref={dropdownRef}
                class={`absolute top-0 pt-3 duration-200 ease-out -translate-x-1/2 translate-y-10 z-50 transition-[opacity,transform] ${
                    menuOpen()
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90 pointer-events-none"
                }`}
                onMouseOver={clearCloseTimeout}
                onMouseLeave={handleLeave}
            >
                <div class="flex justify-center w-auto h-auto overflow-hidden bg-white shadow-xl">
                    <Show when={activeColumns()}>
                        <DropdownContent
                            columns={activeColumns()}
                            onNavigate={() => setMenuOpen(false)}
                        />
                    </Show>
                </div>
            </div>
        </div>
    )
}
