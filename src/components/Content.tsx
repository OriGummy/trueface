import React, { useState, useEffect, useContext, createContext } from "react";

const ContentContext = createContext(true);


export interface ContentProps {
    src: string;
    details: string;
    children?: JSX.Element | JSX.Element[];
}

const Content = (props: ContentProps) => {
    const src: string = props.src;
    const details: string = props.details;

    const [contentType, setContentType] = useState("undefined");
    const isBlurred = useContext(ContentContext);

    useEffect(() => {
        const getContentType = (path: string | undefined) => {
            const videoTypes: string[] = ["mkv", "mov", "mp4", "webv"];
            const imageTypes: string[] = ["png", "jpeg", "jpg", "webp"];
            const fileExtention = path?.split(".").pop();

            if (fileExtention === undefined) {
                return "undefined";
            } else if (videoTypes.includes(fileExtention)) {
                return "video";
            } else if (imageTypes.includes(fileExtention)) {
                return "image";
            } else if (fileExtention === "svg") {
                return "icon";
            }

            return "";
        };

        setContentType(getContentType(src));
    });

    if (contentType === "video") {
        return (
            <video controls loop autoPlay id="graphic" key={src} style={isBlurred ? {"filter": "blur(2.5vmin) brightness(80%)"} : {}}>
                <source src={src} type="video/mp4" />
            </video>
        );
    } else if (contentType === "image") {
        return <img src={src} id="graphic" alt={details} style={isBlurred ? {"filter": "blur(2.5vmin) brightness(80%)"} : {}}/>;
    } else if (contentType === "icon") {
        return <embed src={src} className="health-icon"/>;
    }

    return <div>Media could not be loaded.</div>;
};

export const Context = ContentContext;
export default Content;
