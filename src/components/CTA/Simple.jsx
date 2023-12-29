import Component from "@components/Component";
import Button from "@components/Button";

export default class extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            text: this.props.text ?? "If you want more information contact us or view our about us page!"
        }
    }

    render() {
        return(
            <div class="flex flex-col mx-auto items-center my-4">
                <p class="justify-self-center">{this.state.text}</p>
                <div class="flex flex-row mx-auto justify-evenly w-full">
                    <Button href="/contact/us" text="Contact Us" />
                    <Button href="/about/us" text="About Us"/>
                </div>
            </div>
        )
    }
}