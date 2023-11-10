import React from "react";
import "../style.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import "../fundraisers.css";
import { Link } from "react-router-dom";
import { ReactComponent as HouseIcon } from "../images/house.svg";

function FundraisersContent() {
    return (
        <div id="fundraisers-container">
            <p className="title"><span>SUPPORT</span> ISRAEL</p>
            <section>
                <p className="subtitle">
                    Donate to Hospitals and Medical Centers
                </p>
                <div className="fundraiser-category">
                    <a
                        className="donate-link"
                        href="https://www.bmc.gov.il/?CategoryID=511"
                    >
                        Barzilai Hospital
                    </a>

                    <a
                        className="donate-link"
                        href="https://hadassah.gospringboard.com/"
                    >
                        Hadassah Hospital
                    </a>

                    <a
                        className="donate-link"
                        href="https://www.soroka.org/donate/"
                    >
                        Soroka Medical Center
                    </a>

                    <a
                        className="donate-link"
                        href="https://give.afsmc.org/give/409953/#!/donation/checkout"
                    >
                        Sheba Medical Center
                    </a>
                </div>
            </section>
            <section>
                <p className="subtitle">Donate to Emergency Services</p>
                <div className="fundraiser-category">
                    <a
                        className="donate-link"
                        href="https://www.mdais.org/en/donation"
                    >
                        Magen David Adom
                    </a>
                    <a className="donate-link" href="https://israelrescue.org/">
                        United Hatzalah
                    </a>
                    <a
                        className="donate-link"
                        href="https://give.zakaworld.org/"
                    >
                        Zaka
                    </a>
                </div>
            </section>
            <section>
                <p className="subtitle">Support Soldiers and Families</p>
                <div className="fundraiser-category">
                    <a
                        className="donate-link"
                        href="https://belevechad.nyc/who-we-are/"
                    >
                        Belev Echad
                    </a>

                    <a className="donate-link" href="https://www.fidf.org/">
                        Friends of the IDF
                    </a>

                    <a
                        className="donate-link"
                        href="https://www.latet.org.il/en/"
                    >
                        Latet{" "}
                    </a>
                </div>
            </section>{" "}
            <section>
                <p className="subtitle">Support Mental Health Resources</p>
                <div className="fundraiser-category">
                    <a className="donate-link" href="https://www.afnatal.org/">
                        AFNATAL
                    </a>

                    <a className="donate-link" href="https://en.eran.org.il/">
                        ERAN Emotional First Aid
                    </a>

                    <a
                        className="donate-link"
                        href="https://onefamilyfundus.org/"
                    >
                        One Family Fund
                    </a>

                    <a
                        className="donate-link"
                        href="https://www.bayit-cham.org.il/en/a-warm-house-%f0%9f%92%97-brightens-the-heart/"
                    >
                        A Warm House
                    </a>

                    <a className="donate-link" href="https://www.israaid.org/">
                        IsraAID
                    </a>
                </div>
            </section>
            <img src="../images/Star_of_David.png" id="star-of-david" />
            <Link to="/">
                <HouseIcon width={40} height={40} id="house-icon" />
            </Link>
        </div>
    );
}

const Fundraisers = () => {
    return (
        <>
            <FundraisersContent />
        </>
    );
};

export default Fundraisers;
