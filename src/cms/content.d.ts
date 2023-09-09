interface Profile
{
    name: string;
    image_id: string;
    position?: Position;
}

interface Doctrine
{
    title: string;
    text: string;
    verses: Verse[];
}

interface Verse
{
    reference: string;
    content: string;
}

interface NavBar
{
    logo_path: string;
    header?: string;
    links: NavLink[];
}

interface NavLink
{
    text: string;
    to: string;
}

enum Position {
    Pastor = "Pastor",
    Assistant = "Assistant Pastor",
    Children = "Children's Minister",
    Mission = "Missions Intern",
    Youth = "Youth Minister",
    Primary = "1st - 3rd Sunday School",
    Secondary = "4th - 6th Sunday School"
}

interface Image
{
    id: string;
    path: string;
    altText: string;
    resolution: Resolution;
    type: ImageType;
}

enum ImageType
{
    Profile = 0,
    Hero = 1,
    Cover = 2,
    Logo = 3
}

type Resolution = [int,int];