export default function CenteredContentRow(props)
{
    return (
        <div className="flex flex-col md:flex-row justify-items-center bg-gray-200 mx-6 p-4 mb-8 rounded-md">
            {props.children}
        </div>
    )
}