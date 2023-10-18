import React from 'react';
import { Link } from 'react-router-dom';
import imgContinental from '../resources/ContinentalLogo.png';
import imgLinde from '../resources/LindeLogo.png';
import imgSOGACSA from '../resources/sogacsa.jpg';
import imgIATECC from '../resources/iatecc.png';
import imgENERSYS from '../resources/EnerSys logo.png';
import './Sponsors.scss';

export default function Sponsors(props) {
    return <>
        <div class="sponsors" className={"sponsors " + props.className}>
            <Link to="https://www.continental.com/en/" target="_blank">
                <img src={imgContinental} alt="Continental" />
            </Link>
            <Link to="https://www.linde-mh.es/es/" target="_blank">
                <img src={imgLinde} alt="Linde" />                
            </Link>
            <Link to="https://sogacsa.linde-mh.es/es/" target="_blank">
                <img src={imgSOGACSA} alt="Sogacsa" />
            </Link>
            <Link to="https://www.iatecc.com/" target="_blank">
                <img src={imgIATECC} alt="IATECC" />
            </Link>
            <Link to="https://www.enersys.com/" target="_blank">
                <img src={imgENERSYS} alt="ENERSYS" />
            </Link>
        </div>
    </>;
}
