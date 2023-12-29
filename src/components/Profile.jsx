export default function Profile(props) {
  return(
    <>
      <section id={props.id} className="text-gray-600 bg-gray-920 body-font">
        <div className="container px-2 py-8 mx-auto flex flex-col">
          <h1 className="mx-auto font-bold text-black text-4xl">{ props.title }</h1>
          <h2 className="text-center lg:w-4/6 mt-4 mx-auto text-xl">{ props.subtitle } </h2>
          <div className="lg:w-4/6 mx-auto mt-6">

            {props.children}
        
          </div>
        </div>
      </section>
    </>
  );
}