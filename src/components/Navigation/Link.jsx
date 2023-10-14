import classNames from "classnames"

export default function Link({href, children}) {
    return (
        <a 
            href={href}
            className="navlink flex flex-row w-full py-2 mx-0 justify-evenly text-left text-black hover:text-gray-700 transition-colors duration-150 font-bold md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center hover:underline-offest-10"
        >
            {children}
        </a>
    );
}