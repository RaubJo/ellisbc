import { Component } from "react";


export default class extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            url: props.url,
            buttonText: props.button
        }
    }

    shouldShowButton() {
        return this.state.buttonText && this.state.url
    }

    render() {
        return(
            <>
                <div className="mx-auto h-full flex flex-col max-w-sm bg-white border rounded-lg shadow-lg p-7 border-neutral-200/60">
                    <a href="#_" className="block mb-3">
                        <h5 className="text-xl font-bold leading-none tracking-tight text-neutral-900">{this.state.title}</h5>
                    </a>
                    <p className="mb-4 text-neutral-500">
                        {this.props.children}
                    </p>
                    {this.shouldShowButton() &&
                        <button onClick={() => window.open(this.state.url)}
                            className="inline-flex items-center w-3/4 mx-auto mt-auto h-10 px-4 justify-end text-sm font-medium text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-neutral-950 hover:bg-neutral-950/90">
                                <span className="w-full mx-auto">{this.state.buttonText}</span>
                                <svg className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"></path>
                                </svg>
                        </button>
                    }
                </div>
            </>
        );
    }
}