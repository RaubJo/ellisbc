import { Component } from "react";
import Link from "@components/Navigation/Link"
import MobileLink from "@components/Navigation/MobileLink"
import _ from 'lodash';
import { Fade as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from 'framer-motion'
import NavPopover from "@components/Navigation/Popover"

export default class extends Component
{
    constructor(props){
        super(props)
        this.state = {
            logo: "/logo.svg",
            title: "Ellis Baptist Church",
            links: props.links,
            mobileMenu: {
                active: false,
            }
        }
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    toggleMenu() {
        this.setState({ mobileMenu: {
            active: !this.state.mobileMenu.active,
        }})
    }

    render() {
        return (
            <nav className="sticky h-24 top-0 shadow-xl w-full uppercase font-normal text-black bg-white z-10">
                <div className="flex flex-row items-center justify-between h-24">
                    {this.state.logo &&
                        <div className="container relative flex flex-row w-fit">
                            <div className="flex items-center justify-evenly sm:justify-start h-full ml-4 lg:mx-4">
                                <a href="/" className="flex items-center font-extrabold text-gray-900 md:py-0">
                                    <span className="items-center justify-center w-24 h-24 text-black">
                                        <img src={this.state.logo} className="w-full h-full" alt="Logo Image"/>
                                    </span>
                                </a>
                            </div>
                        </div>
                    }
                    <div className="flex flex-row justify-evenly sm:justify-between">
                        <div className="flex items-center justify-evenly sm:justify-start h-full ml-4 lg:mx-4 text-black">
                            <a href="/"><span className="hidden lg:flex mx-auto md:mr-4 text-lg sm:text-3xl lg:text-2xl font-bold text-black whitespace-nowrap">{this.state.title}</span></a>
                        </div>
                    </div>
                    
                    <div className="hidden md:flex flex-row justify-end container relative mx-4 w-full items-center whitespace-nowrap">
                        {_.map(this.state.links, (link) => (
                            <Link key={link.text} href={link.href}>{link.text}</Link>
                        ))}
                    </div>
                    <div className="md:hidden flex-end items-center m-4 sm:m-6">
                            <Hamburger toggled={this.state.mobileMenu.active} toggle={this.toggleMenu} direction="right" duration={0.4} rounded label="Show menu" hideOutline={true}/>
                    </div>
                </div>
                
                <AnimatePresence>
                    {this.state.mobileMenu.active &&
                        <motion.div 
                            className="flex flex-col w-auto mr-0 ml-0 mx-auto z-50"
                            initial={{ opacity: 1, y: 0, x: -800}}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            exit={{ opacity: 1, y: 0, x: -800}}
                            transition={{ease: 'anticipate'}}
                        >
                            <ul className="font-medium flex flex-col p-4 md:p-0 mt-0 shadow-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0">
                                {_.map(this.state.links, (link) => (
                                    <MobileLink key={link.text} href={link.href} onClick={this.toggleMenu}>{link.text}</MobileLink>
                                ))}
                            </ul>
                        </motion.div>
                    }
                </AnimatePresence>
            </nav>
        );
    }
}