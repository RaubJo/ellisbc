import { Component } from "react";
import axios from 'axios';
import isNull from "lodash/isNull";
import { FormatQuoteRounded, ExpandMore } from "@mui/icons-material";

export default class extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            loading: false,
            reference: this.props.reference,
            translation: "kjv",
            endpoint: '/api/bible',
            verse: null
        }

        this.fetch = this.fetch.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        this.fetch()
    }

    toggle() {
        if( isNull(this.state.verse) ) {
            this.setState({
                ...this.state,
                verse: {
                    ...this.state.verse,
                    show: false
                }
            })
        }

        // this.setState({
        //     ...this.state,
        //     verse: {
        //         ...this.state.verse,
        //         show: ! this.state.verse.show
        //     }
        // });
    }

    fetch() {
        if(this.state.loading) {
            return
        }

        this.setState({...this.state, loading: true})

        let query = new URLSearchParams(Object.entries({
            reference: this.state.reference,
            translation: this.state.translation
        })).toString()

        axios.get(`${this.state.endpoint}?${query}`)
        .then((response) => {
            this.setState({
                ...this.state,
                verse: {
                    content: response.data.verse.content,
                    reference: response.data.verse.reference,
                    show: true
                },
                loading: false
            })
        })
        .catch((error) => {})
    }

    render() {
        return (
          <>
            {! isNull(this.state.verse) && (
                <div className="bg-gray-100 rounded-md p-1 mt-1">
                    <div className="flex mx-2 mt-1 mb-1 justify-between">
                        <FormatQuoteRounded />
                        {/* <ExpandMore onClick={this.toggle()} className="justify-end" /> */}
                    </div>
                    {this.state.verse.show && (
                        <div className="px-2 w-full">
                            <p className="italic">{this.state.verse.content}</p>
                        </div>
                    )}
                    <div>
                        <a href="#" className="flex whitespace-nowrap justify-end mb-1 mx-1">({this.state.verse.reference})</a>
                    </div>
                </div>
            )}
          </>  
        );
    }
}