import { Component } from "react";
import Profile from "./Profile";


export default class extends Component
{
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      image: props.image,
      content: props.content
    }
  }
  render() {
    return (
      <Profile title={this.state.title}>
            <div className="flex flex-col items-center sm:flex-row">
              <div className="w-2/3 sm:w-1/2 text-center pr-4 py-4">
                <div className="inline-flex items-center justify-center">

                  <div className="flex h-full w-full shadow-md">
                    {this.state.image}
                  </div>
                
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l-2 border-gray-400 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-left md:text-center">
                
                {this.state.content}
              
              </div>
            </div>
          </Profile>
    )
  }
}