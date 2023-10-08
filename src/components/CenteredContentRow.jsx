import classNames from "classnames"

export default function CenteredContentRow({children, className})
{
    return (
        <div className={classNames("w-full flex flex-col md:flex-row justify-self-center justify-items-center bg-gray-200 p-4 mb-8 rounded-md", className)}>
            {children}
        </div>
    )
}