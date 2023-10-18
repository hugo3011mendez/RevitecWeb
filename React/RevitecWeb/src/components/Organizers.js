import React from 'react';
import { Link } from 'react-router-dom';
import imgEDC from '../resources/SpainCroquetLandLogo.png';
import imgCaminoDeSantiago from '../resources/tournamentLogo.png';
import imgBarceloMontecastillo from '../resources/barcelomontecastillo.jpeg';
import './Sponsors.scss';

export default function Organizers(props) {
    return <>
        <div class="sponsors" className={"sponsors " + props.className}>
            <Link to="https://spaincroquetland.com/" target="_blank">
                <img src={imgEDC} alt="España Destino Croquet" />
            </Link>

            <img src={imgCaminoDeSantiago} alt="Torneo Camino de Santiago" />

            <Link to="https://www.barcelo.com/es-es/barcelo-jerez-montecastillo-convention-center/" target="_blank">
                <img src={imgBarceloMontecastillo} alt="Barceló Montecastillo" />
            </Link>
        </div>
    </>;
}
