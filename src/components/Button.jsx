import { Component } from "react";

export default class extends Component
{
    render() {
        return (
            <a href={this.props.href}>
                <div className="bg-white w-fit m-2 py-2 px-6 font-bold hover:bg-carbon-100 transition-colors duration-100 ease-linear shadow-md whitespace-nowrap">
                    <span>{this.props.text}</span>
                </div>
            </a>
        );
    }
}