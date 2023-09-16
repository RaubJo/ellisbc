import { Component } from "react";
import NavLink from "./NavLink";
import _ from 'lodash'
import { Fade as Hamburger } from "hamburger-react";

export default class extends Component
{
    constructor(props){
        super(props)
        this.state = {
            logo: "/logo_light.svg",
            title: "Ellis Baptist Church",
            links: props.links,
            menuActive: false,
        }
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu() {
        this.setState({ menuActive: !this.state.menuActive})
    }

    render() {
        return (
            <nav className="z-50 h-24 top-0 border-b border-gray-200 shadow-lg w-full">
                <div className="flex flex-row">
                    <div className="container relative flex flex-row w-fit">
                        <div className="flex items-center justify-evenly sm:justify-start h-full ml-4 lg:mx-4">
                            <a href="/" class="flex items-center font-extrabold text-gray-900 md:py-0">
                                <span class="items-center justify-center w-24 h-24 text-black">
                                    <img src={this.state.logo} class="w-full h-full" alt="Ellis Baptist Church"/>
                                </span>
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly sm:justify-between">
                        <div className="flex items-center justify-evenly sm:justify-start h-full ml-4 lg:mx-4">
                            <a href="/"><span class="flex mx-auto md:mr-4 text-lg sm:text-3xl lg:text-2xl font-bold whitespace-nowrap">{this.state.title}</span></a>
                        </div>
                    </div>
                    <div className="hidden md:flex container relative flex-row mx-4 w-full items-center justify-evenly whitespace-nowrap">
                        {_.map(this.state.links, (link) => (
                            <NavLink key={link.text} href={link.href}>{link.text}</NavLink>
                        ))}
                    </div>
                    <div className="md:hidden flex items-center m-4 sm:m-6">
                            <Hamburger toggled={this.state.menuActive} toggle={this.toggleMenu} direction="right" duration={0.4} rounded label="Show menu" hideOutline={true}/>
                    </div>
                    {this.state.menuActive &&
                        <div className="z">

                        </div>
                    }
                </div>
            </nav>
        );
    }
}