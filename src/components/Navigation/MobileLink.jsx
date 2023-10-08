import classNames from "classnames"

export default function Link({href, children}) {
    return (
        <a 
            href={href}
            className="flex
                       flex-row
                       w-full
                       p-2                       
                       mx-0
                       justify-end
                       text-left
                       text-black
                       font-bold"
        >
            {children}
        </a>
    );
}