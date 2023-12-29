export default function Map({address = false})
{
    return (
        <div className="w-full mx-auto m-2 items-center">
            {address &&
                <p>
                    We are located at:
                    <a className="ml-2" target="_blank" href="https://maps.google.com/maps/dir//107+W+9th+St+Ellis,+KS+67637/@38.9386293,-99.5608247,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x87a1a00e1de3b4f5:0xefbfd87667c1a7d3">
                        107 W 9th St Ellis, KS 67637
                    </a>
                </p>
                
            }
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