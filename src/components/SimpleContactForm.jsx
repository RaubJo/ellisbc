import { Component, createRef } from "react";
import emailjs from '@emailjs/browser';
import classNames from "classnames";
import _ from "lodash";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleReCaptchaProvider, GoogleReCaptchaCheckbox } from 'react-google-recaptcha-ultimate';
import axios from 'axios';

export default class extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            submitting: false,
            error: { },
            captcha: {
                sitekey: '6Lcx3TEpAAAAAEE-mxOdCZQzGI3eAtJ6TlpOLUv7',
            },
            captchaToken: null,
            form: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                message: ''
            },
            config: {
                service_id: 'service_hnbuech',
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
        this.handleChange = this.handleChange.bind(this)

        this.reCaptchaRef = createRef();
    }

    clear() {
        this.setState({
            form: {
                first_name: '',
                last_name: '',
                email: '',
                message: ''
            },
            captcha: {
                token: null
            }
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

    handleChange(value) {
        this.setState({
            captchaToken: value
        })
      };

    submit(e) {
        e.preventDefault()

        if(this.state.submitting) {
            return false
        }

        if(_.isEmpty(this.state.captToken)) {
            toast.warning('Please verify the reCAPTCHA', {
                position: "bottom-right",
                autoClose: 4000,
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

        axios.post('/api/verify', {
            token: this.state.captchaToken
        })
        .then((response) => {

            if(response.data.success !== true) {
                toast.error('Something went wrong with the reCAPTCHA. Please try again later.', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });

                return false;
            }
            
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
        })
        .catch((response) => {
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
        .finally(() => {
            this.clear()
            this.setState({ submitting: true})
        })

    }

    render() {
        return (
            <>
                <form onSubmit={this.submit} >
                    <div className="mt-4">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex flex-row gap-6">
                                <label className="block">
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
                                <input 
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handle}
                                    id="email"
                                    className={classNames(this.state.styles.default, this.state.styles.focus, this.state.styles.hover)}
                                    value={this.state.form.email}
                                    required
                                />
                            </label>

                            <label className="block">
                                <input 
                                    type="phone"
                                    placeholder="Phone Number"
                                    onChange={this.handle}
                                    id="phone"
                                    className={classNames(this.state.styles.default, this.state.styles.focus, this.state.styles.hover)}
                                    value={this.state.form.phone}
                                    required
                                />
                            </label>

                            <label className="block">
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
                    <div className="flex flex-col md:flex-row mt-6 md:justify-between">

                    {/* <ReCAPTCHA
                        ref={this.reCaptchaRef}
                        sitekey={this.state.captcha.siteKey}
                        onChange={this.handleChange}
                        className="mx-auto mb-4 md:ml-0"
                    /> */}

                    <GoogleReCaptchaProvider
                        type="v2-checkbox"
                        siteKey={this.state.captcha.sitekey}
                    >
                        <GoogleReCaptchaCheckbox
                            callback={this.handleChange()}
                            className="mx-auto mb-4 md:ml-0"
                        />
                    </GoogleReCaptchaProvider>
                        <button 
                            className="
                                inline-flex
                                text-white 
                                bg-gray-500 
                                w-fit
                                mx-auto
                                md:mr-0
                                border-0 
                                py-2 
                                px-6 
                                my-auto
                                focus:outline-none 
                                hover:bg-blue-500
                                rounded 
                                text-lg
                                items-center
                                disabled:cursor-not-allowed
                                disabled:hover:bg-gray-500
                                disabled:opacity-50
                            "
                            type="submit"
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