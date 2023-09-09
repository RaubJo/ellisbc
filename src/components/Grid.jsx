export default function Grid(props)
{
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-2 py-8 mx-auto">

        <div className="flex flex-col text-center w-full mb-10">

          <h1 className="text-4xl font-bold title-font mb-4 text-gray-900">{props.title}</h1>

          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">

            {props.description}

          </p>
        </div>

        <div className="flex flex-wrap m-4 mx-auto lg:mx-0 justify-center lg:justify-start">
            
            {props.children}
        
        </div>
      </div>
    </section>
  );
}