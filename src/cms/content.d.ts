type Profile = {
    name: string;
    image_path: string;
    position?: Position;
}

type Verse = {
    reference: string;
    content: string;
}



type Image = {
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

type Doctrine = {
    title: string;
    content: string;
    references: string[]
};

type Link = {
    text: string;
    href: string;
}