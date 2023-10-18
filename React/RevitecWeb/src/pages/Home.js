import React from 'react';
import { apiGet } from '../utils/api';
import { useLoad } from '../collection/Hooks';
import BsButton from '../collection/bootstrap/BsButton'
import Sponsors from '../components/Sponsors'
import Collaborators from '../components/Collaborators';
import Organizers from '../components/Organizers';
import imgDossierTitle from '../resources/DossierTitle.png';
import imgTournamentLogo from '../resources/tournamentLogo.png';
import img2022Champion from '../resources/Dossier-Azul-1.jpg';
import img2021Champion from '../resources/Dossier-Azul-2.jpg';
import imgAGVs from '../resources/Dossier-Azul-3.jpg';
import './Home.scss';

export default function Home(props) {
    // Banner showing the last message
    function AlertBanner(props) {
        const [lastMessages] = useLoad(async () => await apiGet("messages/getLastMessages/Spanish"));

        return lastMessages && <>
            {
                <div className="bg-danger text-white p-3 pb-1 mb-4 overflow-hidden">
                    <p className="text-start">Últimos mensajes :</p>
                        {lastMessages.map((message) => (
                            <p className="d-inline-block teletext me-4">
                                <h6>{message.title}</h6>
                                <p>{message.text}</p>
                            </p>
                        ))}
                </div>
            }
        </>;
    }

    return <>
        <AlertBanner />
        <div className="dossier row d-flex justify-content-between align-items-start">
            <div className="col-9">
                <h1 className="text-primary">
                    III TORNEO INTERNACIONAL <br />
                    CAMINO DE SANTIAGO
                </h1>

                <img src={imgDossierTitle} id="imgTitle" alt="Awards of last year's Torneo Camino de Santiago" className="img-fluid d-inline-block" />

                <h2 className="text-primary">¡BIENVENIDOS, JUGADORES!</h2>
                <p>
                    Para España Destino Croquet (EDC) supone una enorme satisfacción daros la bienvenida a esta 3º edición del
                    Torneo Internacional de croquet Camino de Santiago. Ilusionados por celebrar este evento con todos vosotros y, en colaboración con
                    el Barceló Montecastillo en Jerez de la Frontera, nos sentimos muy agradecidos por la acogida que ha tenido esta nueva edición
                    en la que se han completado las 64 plazas disponibles para jugadores y se ha obtenido un listado de pre-inscritos de hasta 80 participantes.
                </p>

                <p>
                    Por ello, queremos, en primer lugar, dar las gracias a todos vosotros jugadores que habéis confiado en esta organización para disfrutar de
                    un torneo tan especial para nosotros y en el que nos esforzaremos al máximo para convertirlo en una semana de croquet inolvidable.
                    Cabe mencionar, también, a aquellos participantes que vienen desde el extranjero y que completan un cartel de jugadores único y nunca antes visto en España.
                </p>

                {/*----------------- SPONSORS Y COLABORADORES -----------------*/}
                <p>
                    Agradecer, un año más, el apoyo de nuestros patrocinadores y colaboradores por apostar e invertir en nosotros para dar cobertura y visibilidad a este torneo.
                </p>
                <h4>Patrocinadores</h4>
                <Sponsors className='mt-3 mb-3' />

                <h4>Colaboradores</h4>
                <Collaborators className='mt-3 mb-3' />

                {/*----------------- AGRADECIMIENTOS -----------------*/}
                <h4>Agradecimientos</h4>
                <p>
                    Nos gustaría señalar también a todos aquellos que han aportado su granito de arena y se han involucrado de algún modo en la organización de esta
                    nueva edición toda vez que, sin ellos, estamos convencidos que no hubiera sido posible.
                </p>

                <h4>Organizadores</h4>
                <Organizers className='mt-3 mb-3' />

                <p>
                    Por último, agradecimiento especial a Barceló Montecastillo por todas las facilidades que nos han dado desde el primer día, así como por poner a
                    nuestra disposición unas instalaciones de primer nivel para que durante nuestra estancia… ¡nos sintamos como en casa!
                </p>

                {/*----------------- LO QUE DEBES SABER -----------------*/}
                <h2 className="text-primary">Lo que debes saber...</h2>
                <ul class="list-group">
                    <li class="list-group-item">
                        El lunes 25 de septiembre los campos estarán abiertos y disponibles para los jugadores desde las 16pm y hasta las 20pm.
                    </li>
                    <li class="list-group-item">
                        El martes 26 a las 8:30am habrá, primero, un briefing de bienvenida por parte de la organización en donde se entregarán los Welcome Pack
                        y se resolverán todas aquellas dudas que puedan surgir. Posteriormente, a las 9am dará comienzo el desayuno
                        previo al inicio del torneo que tendrá lugar a las 10am.
                    </li>
                    <li class="list-group-item">
                        Para el resto de días (miércoles, jueves y viernes), el desayuno estará disponible para los jugadores desde las 8.00am hasta las 10.30am.
                        Esos días el inicio de los partidos tendrán lugar a las 9am.
                    </li>
                    <li class="list-group-item">
                        Habrá ocho grupos de ocho jugadores cada uno y pasarán a la siguiente ronda los cuatro mejores de cada grupo.
                        Los jugadores eliminados disputarán el torneo Linde Continental, puntuable para Dgrade Internacional durante el transcurso del torneo.
                    </li>
                    <li class="list-group-item">
                        La duración del torneo es de cuatro días. Durante las dos primeras jornadas se jugará la fase de grupos. A partir del jueves comenzarán
                        las rondas eliminatorias del Championship knockout así como el torneo Linde Continental para los jugadores que se encuentren eliminados.
                    </li>
                    <li class="list-group-item">
                        El martes 26 a las 21.30pm se celebrará un cóctel (media pensión) en una de las terrazas que Barceló Montecastillo habilitará a tal efecto.
                    </li>
                    <li class="list-group-item">
                        El miércoles 27 a las 21.30pm se visitará una de las mejores bodegas de vino de España donde se podrá disfrutar de un informal picoteo
                        (saldrán autobuses desde el hotel).
                    </li>
                    <li class="list-group-item">
                        El jueves 28 a las 21.30pm tendrá lugar la cena oficial del torneo (media pensión) en uno de los comedores del hotel Barceló Montecastillo.
                    </li>
                    <li class="list-group-item">
                        Código de vestimenta: Los participantes del torneo deberán vestir de blanco y con los polos oficiales
                        que se les entregarán a todos los jugadores en su <b>Welcome Pack</b>.
                    </li>
                    <li class="list-group-item">
                        El viernes 29 se retransmitirán en directo las semifinales y la final del torneo. Posteriormente se hará la entrega de premios y seguido el acto
                        de clausura de esta 3º edición (hora prevista de finalización 16.00pm).
                    </li>
                </ul>

                {/*----------------- FORMATO DEL TORNEO -----------------*/}
                <h2 className="text-primary mt-3">Formato del torneo</h2>
                <p>
                    Durante la fase de grupos, todos los partidos se jugarán a partido único al mejor de 19 aros con 90 minutos de límite de tiempo
                    y en sistema de <b>double-banking</b>. Sólo los cuatro primeros jugadores de cada grupo pasarán al <b>Championship Knock-out</b>.
                </p>

                <p>
                    Para la clasificación en esta fase de grupos se tendrá en cuenta, en primer lugar, el número de partidos ganados; en segundo lugar,
                    la diferencia de aros y, por último, el mayor número de aros a favor. En caso de empate, si es entre dos jugadores,
                    se tendrá en cuenta el resultado del enfrentamiento particular entre estos dos jugadores, y en caso de que el empate sea entre
                    tres o más jugadores, cada uno de ellos realizará 5 tiros al corsario (tantas rondas como sea necesario para resolver el empate)
                    y los jugadores que más veces impacten el mismo serán los que pasarán a la siguiente ronda.
                </p>

                <p>
                    Las rondas de dieciseisavos de final y de octavos de final se disputarán a un partido único al mejor de 19 aros con límite de tiempo de 90 minutos y
                    en sistema de double-banking. Desde cuartos de final y en adelante hasta la final del torneo,
                    los partidos serán al mejor de 3 partidos de 13 aros cada uno sin límite de tiempo.
                </p>


                {/*----------------- BARCELÓ MONTECASTILLO -----------------*/}
                <h2 className="text-primary mt-3">Barceló Montecastillo</h2>
                <p>
                    El Barceló Montecastillo es un magnífico hotel en un impresionante entorno natural a las afueras de Jerez de la Frontera.
                    Este resort posee una ubicación privilegiada, a media hora de la playa, junto a uno de los circuitos de carreras más famosos de España
                    y a tan solo 10 minutos del aeropuerto de la ciudad. Sus amplias y bien equipadas habitaciones siguen un nuevo concepto de habitación B-Room
                    que incorpora un diseño actual, conservando el estilo clásico y elegante que caracteriza al hotel.
                </p>

                <p>
                    Entre sus completas y bien cuidadas instalaciones deportivas se encuentran, entre otras: un campo de golf de 18 hoyos diseñado por <b>Jack Nicklaus</b>,
                    3 campos de fútbol reglamentarios, un innovador U-Spa con sauna, bañera de hidromasaje, cabinas de masajes y gimnasio y todo ello
                    además de inmejorables tratamientos estéticos específicos para cada huésped.
                </p>

                <p>
                    Entre los diversos restaurantes con los que cuenta el hotel Barceló Montecastillo, los jugadores y público asistente podrán deleitarse
                    con platos regionales típicos de la zona y elaborados con la mejor materia prima para disfrutar de una gastronomía única en el mundo.
                </p>

                <img id="logo" src={imgTournamentLogo} alt="Logo del torneo" style={{ height: '12rem' }} className="img-fluid" />
            </div>


            {/*----------------- BLOQUE AZUL -----------------*/}
            <div className="col-3">
                {/* ----------------- DESCARGAR GUÍA -----------------*/}
                <a href="GUIA JUGADORES.pdf" download="GUIA JUGADORES.pdf">
                    <BsButton className="mb-3">Descargar Guía</BsButton>
                </a>

                <div class="aboutUs p-2 overflow-hidden">
                    <h4 class="overTitle">De donde venimos</h4>
                    <p>
                        Este torneo nace en el año 2021 con el firme propósito de, por un lado, generar una mayor visibilidad sobre este deporte y, por el otro,
                        colaborar con el crecimiento y desarrollo del croquet, no sólo en Galicia, sino también en toda España.
                    </p>

                    <p>
                        Para ser capaces de cumplir con este ambicioso proyecto, en ESPAÑA DESTINO CROQUET trabajamos sin descanso durante todo
                        el año para que en cada edición participen los mejores jugadores del mundo, obteniendo como resultado un torneo que, a
                        día de hoy y gracias a todo lo anterior, se ha posicionado como uno de los torneos imprescindibles en el calendario anual de
                        cualquier apasionado de este deporte.
                    </p>

                    <p>
                        En esta 3º edición lo hacemos, además, de la mano de Barceló Montecastillo y
                        sus magnificas instalaciones que harán de nuestros días allí un precioso recuerdo.
                    </p>

                    {/*----------------- PALMARÉS -----------------*/}
                    <h5 class="overTitle">Palmarés de las anteriores ediciones</h5>
                    <ul className="list-group mb-3">
                        <li className="list-group-item ps-sm-0 ps-md-5 overflow-hidden">
                            <img src={img2022Champion} className="img-fluid d-none d-md-inline-block d-lg-inline-block" style={{ height: '10rem' }} alt="Moe Karem levantando el trofeo" />
                            <p>2022 - Moe Karem (Egipto)</p>
                        </li>
                        <li className="list-group-item ps-sm-0 ps-md-5 overflow-hidden">
                            <img src={img2021Champion} className="img-fluid d-none d-md-inline-block d-lg-inline-block" style={{ height: '10rem' }} alt="Beltrán Hormaechea en un partido" />
                            <p>2021 - Beltrán<br/>Hormaechea<br/>(España)</p>
                        </li>
                    </ul>

                    {/*----------------- IMPACTO Y RECORRIDO -----------------*/}
                    <h4 class="overTitle">Impacto y recorrido</h4>
                    <p>
                        El alto nivel de los jugadores participantes, que cada año va a más, unido a la labor de promoción y difusión del torneo, supusieron que,
                        en la edición del año pasado, más de 300 personas se registraran para asistir de forma presencial a este evento como espectadores.
                    </p>

                    <p>
                        El seguimiento de las semifinales y final del año pasado a través de las redes sociales de EDC tocó un máximo histórico en 9.777
                        visualizaciones. Un auténtico logro que marca un nuevo récord que aspira a ser superado en este 2023.
                    </p>

                    <p>
                        Para la edición de este año, la presencia de jugadores internacionales como Moe Karem, Edmund Fordyce o Ahmed Elmahdy, son, entre otros
                        tantos jugadores, los que generan que este torneo sea ya reconocido como uno de los mejores del mundo.
                    </p>

                    <img src={imgAGVs} className="img-fluid d-none d-md-inline-block d-lg-inline-block mb-3" style={{ height: '10rem' }} alt="EDC AGV" />
                </div>
            </div>
        </div>
    </>;
}
