import images from "./images";
import _ from 'lodash';

enum Position {
    Pastor = "Pastor",
    Assistant = "Assistant Pastor",
    Children = "Children's Minister",
    Mission = "Missions Intern",
    Youth = "Youth Minister",
    Primary = "1st - 3rd Sunday School",
    Secondary = "4th - 6th Sunday School"
}

const ministers: Profile[] = [
    {
        name: "Chad Pritchett",
        image_path: "chad",
        position: Position.Pastor,
        bio: "",
    },
    {
        name: "Colin Pritchett",
        image_path: "colin",
        position: Position.Assistant,
        bio: "Colin and Lacey have three children and love serving at EBC."
    },
    {
        name: "Josh McIntyre",
        image_path: "josh",
        position: Position.Children,
    },
    {
        name: "Joseph Raub",
        image_path: "joseph",
        position: Position.Mission,
        bio: "Joseph and Abigail are preparing to be sent by EBC to the field of Thailand."
    },
    {
        name: "Monty Cox",
        image_path: "monty",
        position: Position.Youth,
    },
    {
        name: "Nathan Cox",
        image_path: "nathan",
        position: Position.Youth,
    },
    {
        name: "Karin Polifka",
        image_path: "karin",
        position: Position.Primary,
    },
    {
        name: "Olavee Raub",
        image_path: "olavee",
        position: Position.Secondary,
    }
]

export default ministers;