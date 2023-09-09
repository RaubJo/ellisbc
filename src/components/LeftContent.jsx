export default function LeftContent(props)
{
    retrun (
        <div className="flex justify-start bg-slate-400 my-6 px-6 w-full">
            {props.children}
        </div>
    );
}