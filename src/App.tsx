import { useEffect, useState } from "react";
import eventsData from "./data.json";
import { Routes, Route } from "react-router-dom";
import Enough from "./pages/enough";
import Fundraisers from "./pages/fundraisers";
import "./style.css";
import Content, { Context } from "./components/Content";
import disableScroll from "./block-scroll.js"
import CouldNotStop from "./CouldNotStop";
import {isMobile} from 'react-device-detect';

type SetContentWarning = (index: boolean) => void;
type SetGraphic = (graphic: Graphic) => void;

interface Graphic {
    details: string;
    path:     string;
    level:   number;
}
let gallery: Graphic[][];

function makeGallery(){
    gallery = [[], [], [], [], [], [], [], [], [], []]
    eventsData.forEach(graphic => {
        const level = graphic["level"];
        if (level === -1){
            return;
        }
        
        gallery[level - 1].push(graphic);
    });

    for (let i = 0; i < gallery.length; i += 1){
        gallery[i] = gallery[i].sort((a, b) => 0.5 - Math.random());
    }
}

makeGallery();

let i = 0;
function getNextGraphic(){
    while (true) {
        if (i === gallery.length)
            return;
            
        const graphic = gallery[i].pop()
        if (graphic === undefined){
            i += 1;
            continue;
        }

        return graphic;
    }
}

const firstGraphic = getNextGraphic()!;

function MainContent({
    graphic,
    setGraphic,
    contentWarning,
    setContentWarning,
}: {
    graphic: Graphic;
    setGraphic: SetGraphic;
    contentWarning: boolean;
    setContentWarning: SetContentWarning;
}) {
    const [isBlurred, setBlurred] = useState(true)
    
    function disableWarning(
        contentWarning: boolean,
        setContentWarning: SetContentWarning
    ) {
        return () => {
            scrollToGraphic();
            setContentWarning(false);
        };
    }

    function scrollToGraphic() {
        document.querySelectorAll('video').forEach(vid => vid.play());

        document.getElementById("graphic")?.style.setProperty("filter", "none")
        window.scrollTo({
            top: document.getElementById("worse-warn")?.offsetTop || 0,
            behavior: "smooth",
        });
        setBlurred(false); 
    }
    
    return (
        <div id="page-container">
            {/* <a style={{"color": isMobile ? "red" : "blue"}}>ASDASDASDASD</a> */}
            <div id="title-container">
                <p id="main-title">
                    TRUE FACE
                    <br />
                    OF HAMAS
                </p>
                <p id="main-subtitle">
                    Like every war in the conflict, this one too started after a palestinian terror attack.
                    Hamas took over civilian towns, commiting some of the most horrifying atrocities of the 21st century.
                </p>

                {contentWarning && (
                    <>
                        <div id="warning-containter" onClick={disableWarning(contentWarning, setContentWarning)}>
                            <embed className="warn-icon" src="/images/warn.svg" />
                            <p id="content-warning">
                                CONTENT WARNING: EXTREME VIOLENCE
                                <br />
                            </p>
                            <p id="btn-disable-warning">
                                SHOW
                            </p>
                        </div>
                    </>
                )}
            </div>
            <p id="worse-warn">
                FOOTAGE WILL GET PROGRESSIVELY MORE GRAPHIC
                </p>
            <main id="graphic-container">
                <Context.Provider value={isBlurred}>
                    <Content
                        src={graphic.path}
                        details={graphic.details}
                    />
                </Context.Provider>
                <p id="graphic-detail">{graphic.details}</p>
            </main>
            <div className="btn-container">
                <button
                    onClick={nextGraphic(setGraphic)}
                    id="btn-more"
                >
                    WITNESS MORE
                </button>
                <button id="btn-stop" onClick={scrollToEnough}>
                    STOP
                </button>
            </div>
        </div>
    );
}

function scrollToEnough() {
    document.querySelectorAll('video').forEach(vid => vid.pause());

    const element = document.getElementById("could-not-stop")!;
    element.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
        const element = document.getElementById("enough-title")!;
        element.scrollIntoView({ behavior: "smooth" });

        document.querySelectorAll('video').forEach(vid => vid.remove());
    }, 6000) 
}

function nextGraphic(setGraphic: SetGraphic) {
    return () => {    
        document.getElementById("graphic-container")?.style.setProperty("opacity", "0%");
        setTimeout(() => {
            let nextGraphic = getNextGraphic();
            if (nextGraphic === undefined){
                scrollToEnough();
                return;
            }
            
            setGraphic(nextGraphic)
            setTimeout(() => {
                document.getElementById("graphic-container")?.style.setProperty("opacity", "100%");
            }, 1000)
        }, 1000)
    };
}



disableScroll();

const Homepage = () => {
    const [graphic, setGraphic] = useState(firstGraphic);
    const [contentWarning, setContentWarning] = useState(true);

    return (
        <>
            <MainContent
                graphic={graphic}
                contentWarning={contentWarning}
                setContentWarning={setContentWarning}
                setGraphic={setGraphic}
            ></MainContent>
            <CouldNotStop></CouldNotStop>
            <Enough></Enough>
        </>
    );
};

export default function App() { 
    window.addEventListener('load', () => {
        window.scrollTo(0, 0);
    });
    // const [width, setWidth] = useState<number>(window.innerWidth);
    // const [height, setHeight] = useState<number>(window.innerWidth);
    
    // function handleWindowSizeChange() {
    //     setWidth(window.innerWidth);
    //     setHeight(window.innerHeight);
    // }
    // useEffect(() => {
    //     window.addEventListener('resize', handleWindowSizeChange);
    //     return () => {
    //         window.removeEventListener('resize', handleWindowSizeChange);
    //     }
    // }, []);
    
    // const isMobile = height > width;
    
    if (!isMobile){
        return <div className="center">
                Sorry, this website is mobile only.<br />
                Please visit us at TrueFaceOfHamas.com
            </div>
    }
    return (
        <div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="enough" element={<Enough />} />
                <Route path="fundraisers" element={<Fundraisers />} />
            </Routes>
        </div>
    );
}
