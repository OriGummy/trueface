import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

function EnoughContent() {
    return (
        <div className="enough">
            <p id="enough-title">WHAT CAN I DO?</p>
            <ul className="bullet-points">
                <li className="bullet">SUPPORT ISRAEL ONLINE USING HASHTAGS <span className="hashtag">#TRUEFACEOFHAMAS #HAMASisISIS</span ></li>
                <li className="bullet"><span className="link" onClick={share}>SHARE THIS WEBSITE</span> AND SHOW THE WORLD WHO ARE HAMAS'S "FREEDOM FIGHTERS"<br/></li>
                {/* <div className="share-buttons">
                    <FacebookShareButton
                        url={"https://trueface.com/"}
                        quote={"Learn more about how Hamas Is Isis!"}
                        hashtag={"#TRUEFACEOFPALESTINE"}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        title={"The true face of Palestine"}
                        url={"https://trueface.com/"}
                        hashtags={["TRUEFACEOFPALESTINE", "HAMASisISIS"]}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <WhatsappShareButton
                        title={"The true face of Palestine"}
                        url={"https://trueface.com/"}
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div> */}
                <li className="bullet"> WATCH VIDEOS ABOUT <a href="https://www.prageru.com/video/why-isnt-there-a-palestinian-state" className="link"> THE CONFLICT </a> AND HOW PALESTINIAN LEADERSHIP ALWAYS DESTROYS THE PEACE PROCESS. </li>
                <li className="bullet"> DONATE TO THE FOLLOWING <Link to='/fundraisers' className="link">FUNDRAISERS</Link> SUPPORTING THE SURVIVORS AND THE IDF </li>
                <li className="bullet"> STAY VIGILANT. IF ANY MEDIA GROUP DOES NOT CALL HAMAS A TERRORIST ORGANIZATION, IT IS CLEARLY BIASED. </li>
            </ul>
            <p id="enough-footer">
                True Face <br /> of <span> Hamas</span>
            </p>
            <br />
        </div>
    );
}


function share(){
    navigator.share({
        title: 'True Face of Hamas',
        text: 'Today I learned how the war in Gaza started - the whole world must see what the Hamas did there.',
        url: 'truefaceofhamas.com',
    })
}
const Enough = () => {
    return (
        <>
            <EnoughContent />
        </>
    );
};

export default Enough;
