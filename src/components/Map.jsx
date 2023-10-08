export default function Map()
{
    return (
        <div className="w-full mx-auto m-2 items-center">
            <div className="h-[32rem]">
                <div className="w-full h-full max-w-full">
                    <iframe
                        className="h-full w-full border-0 max-w-full"
                        src="https://www.google.com/maps/embed/v1/place?q=107+West+9th+Street,+Ellis,+KS,+USA&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                    />
                </div>
            </div>
        </div>
    );
}