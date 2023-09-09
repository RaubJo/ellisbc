export default function Button(props)
{
    return (
    <a href={props.href}>
        <div className="bg-white w-fit m-2 py-2 px-6 font-bold hover:bg-carbon-100 transition-colors duration-100 ease-linear shadow-md whitespace-nowrap">
            <span>{props.text}</span>
        </div>
    </a>
    );
}