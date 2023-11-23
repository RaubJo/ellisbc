import { Component } from "react";
import axios from 'axios';
import { isNull } from "lodash";
import { FormatQuoteRounded } from "@mui/icons-material";

export default class extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            loading: false,
            reference: this.props.reference,
            translation: "kjv",
            endpoint: 'https://bible-api.com',
            verse: null
        }

        this.fetch = this.fetch.bind(this)
    }

    componentDidMount() {
        this.fetch()
    }

    fetch() {
        if(this.state.loading) {
            return
        }

        this.setState({...this.state, loading: true})
        axios.get(`${this.state.endpoint}/${this.state.reference}?translation=${this.state.translation}`)
        .then((response) => {
            this.setState({
                ...this.state,
                verse: {
                    text: response.data.text,
                    reference: response.data.reference
                },
                loading: false
            })
        .catch((error) => {})
        })
    }

    render() {
        return (
          <>
          {! isNull(this.state.verse) && (
            <div className="bg-gray-100 rounded-md p-2 mt-2">
                 <FormatQuoteRounded className="mx-4 mt-4 mb-1"/>
                <div className="px-4 w-full">
                    <p className="italic">{this.state.verse.text}</p>
                </div>
                <div>
                    <a href="#" className="flex whitespace-nowrap justify-end mb-2 mx-2">({this.state.verse.reference})</a>
                </div>
            </div>
          )}
          </>  
        );
    }
}