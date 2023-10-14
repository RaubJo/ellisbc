
export default function NavLink(props) {
    return (
        <a 
            href={props.href}
            className="flex flex-row w-full py-2 mx-0 justify-evenly font-medium text-left text-black md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center"
        >
            {props.children}
        </a>
    );
}