import Profile from './Profile';

export default function RightProfile(props)
{
  return (
    <Profile title={props.title}>
      <div className="sm:hidden sm:w-1/3 text-center sm:pl-8 sm:py-8">
        <div className="w-56 h-56 inline-flex items-center align-middle justify-center">
          
        <div className="flex-shrink-0 rounded-lg w-56 h-56 shadow-md mb-4">
          <img alt="Minister Image" className="object-cover h-full w-full rounded-md" src={props.image}/>
        </div>
        
        </div>
      </div>

      <div className="flex flex-col items-center sm:flex-row">
        <div className="sm:w-1/2 sm:pr-8 sm:py-8 sm:border-r-2 border-gray-400 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
          {props.content}
        </div>

        <div className="flex w-1/2 text-center pl-8 py-8">
          <div className="w-full inline-flex items-center align-middle justify-center">
      
            <div className="flex h-full w-full shadow-md">
              <img alt="Minister Image" className="object-cover h-full w-full rounded-md" src={props.image}/>
            </div>
      
          </div>
        </div>
      </div>
    </Profile>
  );
}