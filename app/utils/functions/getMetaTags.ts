import { SEO_DATA } from "../constants/metaData";

;

const meteContent = {
    metadataBase: new URL(SEO_DATA.domain),
    title: SEO_DATA.title,
    description: SEO_DATA.description,
    image: SEO_DATA.image,
};

export function metaGenerator(props: any) {
    const { title, description, image } = props || {};
    const metaTitle = title ? title : meteContent.title;
    const metaDescription = description ? description : meteContent.description;
    const metaImage = image ? image : meteContent.image;

    return {
        metadataBase: meteContent.metadataBase,
        title: metaTitle,
        description: metaDescription,
        openGraph: {
            title: metaTitle,
            description: metaDescription,
            images: [
                {
                    url: metaImage,
                    width: 500,
                    height: 500,
                    alt: metaTitle,
                    type: "image/jpeg",
                },
            ],
        },
    };
}
