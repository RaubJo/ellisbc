export default function RightContent(props)
{
    return (
        <div className="flex justify-end bg-gray-300 my-6 px-6 w-full">
            {props.children}
        </div>
    );
}