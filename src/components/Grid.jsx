import { Component } from "react"
import _ from 'lodash'
import Staff from "./Staff";

export default class extends Component
{
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      description: props.description,
      data: props.data
    }
  }

  componentDidMount() {
    this.setState({
      data: _.filter(this.state.data, (minister) => (minister.position != 'Pastor'))
    })
  }

  render() {
    return (
      <section className="text-gray-600 body-font">
        <div className="container px-2 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="text-4xl font-bold title-font mb-4 text-gray-900">{this.state.title}</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              {this.state.description}
            </p>
          </div>
          <div className="flex flex-wrap m-4 mx-auto lg:mx-0 justify-center lg:justify-start">
              
              {this.state.data.map((minister) => (
                  <Staff
                    key={minister.name}
                    name={minister.name}
                    position={minister.position}
                    image={`/images/profiles/${minister.image_path}.png`}
                    altText="Minister Image"
                  ></Staff>
              ))}
          
          </div>
        </div>
      </section>
    );
  }
}