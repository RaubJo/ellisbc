import { Component } from "react";
import NavLink from "@components/NavLink.jsx";
import _ from 'lodash'


export default class extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            title: "Ellis Baptist Church",
            links: {
                youtube: null,
                facebook: "https://www.facebook.com/www.ellisbc.org",
                pushpay: "https://pushpay.com/g/ellisbc?src=hpp",
                mediaExtension: "/videos/",
                email: "pastor@ellisbc.org",
            },
            navLinks: props.navigation
        }

        this.media = this.media.bind(this)
    }

    media() {
        return this.state.links.facebook + this.state.links.mediaExtension
    }

    render() {
        return (
            <section className="bottom-0 w-full lg:px-6 mt-auto antialiased bg-white">
                <div className="flex flex-col md:flex-row p-2 mt-8 border-t border-gray-300 items-center justify-between">
                    <div className="inline-flex justify-start items-center">
                        <div className="flex flex-col border-b-2 md:border-b-0 md:border-r-2 border-gray-300">
                            <h1 className="mx-2 p-2 font-bold whitespace-nowrap">{this.state.title}</h1>
                            <div>
                                <div className="flex flex-row justify-center">
                                    {this.state.links.facebook &&
                                    <a href={this.state.links.facebook} className="mx-2">
                                        <i className="fa-brands fa-facebook fa-lg opacity-60"></i>
                                    </a>
                                    }
                                    {this.state.links.email &&
                                    <a href={this.state.links.email} className="mx-2">
                                        <i className="fa-regular fa-envelope fa-lg opacity-60"></i>
                                    </a>
                                    }
                                    {this.state.links.youtube &&
                                    <a href={this.state.links.youtube} className="mx-2">
                                        <i className="fa-brands fa-youtube fa-lg opacity-60"></i>
                                    </a>
                                    }
                                </div>
                            </div>
                        </div>
                        <span className="hidden md:inline-flex text-sm text-gray-500 p-2 items-center whitespace-nowrap">Copyright <i className="fa-regular fa-copyright m-1"></i> 2023 All Rights Reserved</span>
                    </div>
                    <div className="inline-flex justify-end items-center w-full lg:w-1/2">
                        <div className="flex flex-col sm:flex-row justify-evenly w-full">
                            {_.map(this.state.navLinks, (link) => (
                                <NavLink key={link.text} href={link.href}>{link.text}</NavLink>
                            ))}
                        </div>
                    </div>
                    <span className="md:hidden text-sm text-gray-500 p-2 border-t-2 sm:border-t-0 border-gray-300">Copyright <i className="fa-regular fa-copyright m-1"></i> 2023 All Rights Reserved</span>
                </div>
            </section>
        );
    }
}