import { Component } from "react";
import emailjs from '@emailjs/browser';
import classNames from "classnames";
import { isEmpty, every } from "lodash";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default class extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            submitting: false,
            error: { },
            form: {
                first_name: '',
                last_name: '',
                email: '',
                message: ''
            },
            config: {
                service_id: 'service_yscbhkb',
                template_id: 'template_ym0fbks',
                user_id: 'I5ASvLKmlvDBcYJId'
            },
            styles: {
                default: 'border-2 mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm ',
                focus: 'focus:ring focus:ring-blue-500 focus:ring-opacity-50',
                hover: 'hover:border-blue-300'
            }
        }

        this.clear = this.clear.bind(this)
        this.handle = this.handle.bind(this)
        this.submit = this.submit.bind(this)
        this.isFormFilled = this.isFormFilled.bind(this)

    }

    clear() {
        this.setState({
            form: {
                first_name: '',
                last_name: '',
                email: '',
                message: ''
            },
        });
    }

    handle(el) {
        this.setState({
            form: {
                ...this.state.form,
                [el.target.id]: el.target.value
            }
        })
    }

    isFormFilled() {
        return ! every(this.state.form, (value, key) => ! isEmpty(value))
    }

    submit(e) {
        e.preventDefault()

        if(this.state.submitting) {
            return false
        }

        if(this.isFormFilled()) {
            toast.error('Please fill out the form.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            return false
        }

        this.setState({ submitting: true})
        
        emailjs.send(this.state.config.service_id, this.state.config.template_id, this.state.form, this.state.config.user_id)
            .then((result) => {
                toast.success('Form submitted successfully!', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            }, (error) => {
                toast.error('Something went wrong. Please try again later.', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            })
            .finally(()=>{
                this.clear()
            })

        this.setState({ submitting: false})

    }

    

    render() {
        return (
            <>
                <form onSubmit={this.submit} >
                    <div className="mt-8">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex flex-row gap-6">
                                <label className="block">
                                    <span className="text-gray-700">First Name</span>
                                    <input
                                        type="text"
                                        id="first_name"
                                        placeholder="First Name"
                                        className={classNames(this.state.styles.default, this.state.styles.focus, this.state.styles.hover)}     
                                        onChange={this.handle}
                                        value={this.state.form.first_name}
                                        required
                                    />
                                </label>
            
                                <label className="block">
                                    <span className="text-gray-700">Last Name</span>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        id="last_name"
                                        onChange={this.handle}
                                        className={classNames(this.state.styles.default, this.state.styles.focus, this.state.styles.hover)}
                                        value={this.state.form.last_name}
                                        required  
                                    />
                                </label>
                            </div>

                            
                            <label className="block">

                                <span className="text-gray-700">Email address</span>
                                <input 
                                    type="email"
                                    placeholder="email@example.com"
                                    onChange={this.handle}
                                    id="email"
                                    className={classNames(this.state.styles.default, this.state.styles.focus, this.state.styles.hover)}
                                    value={this.state.form.email}
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700">Message</span>
                                <textarea
                                    rows="8"
                                    id="message"
                                    placeholder="We'd love to hear from you!"
                                    onChange={this.handle}
                                    className={classNames('resize-none', this.state.styles.default, this.state.styles.focus, this.state.styles.hover)}
                                    value={this.state.form.message}
                                    required
                                >
                            </textarea>
                            </label>
                        </div>
                    </div>
                    <div className="flex mt-6 justify-end">
                        <button 
                            className="
                                inline-flex
                                text-white 
                                bg-gray-500 
                                border-0 
                                py-2 
                                px-6 
                                focus:outline-none 
                                hover:bg-red-300 
                                rounded 
                                text-lg
                                disabled:cursor-not-allowed
                                disabled:hover:bg-gray-500
                                disabled:opacity-50
                            "
                            type="submit"
                            disabled={this.isFormFilled()}
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </>
        )
    }
}