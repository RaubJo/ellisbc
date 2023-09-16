export default function Map()
{
    return (
        <div className="mx-6">
            <div className="my-4 h-[32rem] mb-8">
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