import React from 'react';
import { Link } from 'react-router-dom';
import imgSiroko from '../resources/SIROKO.jpg';
import imgCepa21 from '../resources/Cepa21.png';
import imgElCapote from '../resources/Capote Escudo.jpg';
import './Sponsors.scss';

export default function Collaborators(props) {
    return <>
        <div class="sponsors" className={"sponsors " + props.className}>
            <Link to="https://www.siroko.com/" target="_blank">
                <img src={imgSiroko} alt="SIROKO" />
            </Link>
            <Link to="https://www.cepa21.com/" target="_blank">
                <img src={imgCepa21} alt="Cepa 21" />
            </Link>
            <Link to="https://poloselcapote.com/" target="_blank">
                <img src={imgElCapote} alt="El Capote" />
            </Link>
        </div>
    </>;
}
