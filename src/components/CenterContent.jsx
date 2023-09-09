export default function CenterContent(props)
{
    return (
        <div className="flex justify-center w-full my-6">
            {props.children}
        </div>
    );
}