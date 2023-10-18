import React, { useState, useEffect } from 'react';
import { BsModal } from '../../collection/bootstrap/BootstrapComponents';
import Scoreboard from '../Scoreboard';
import { apiGet } from '../../utils/api';

export default function TimetableModal(props) {
    const updateData = async () => await apiGet("matches/get/" + props.matchId);

    const [match, setMatch] = useState(updateData);

    useEffect(() => {
        // API call
        apiGet("matches/get/" + props.matchId)
            .then(data => setMatch(data));
    }, []);

    // Establishing modular title
    var modalTitle = props.locale.code == 'es' ? "Partido" : "Game";
    if (props.matchId > 0 && props.matchId <= 224)
        props.locale.code == 'es' ? modalTitle += " | Fase de grupos" : modalTitle += " | Group Stage";
    else if (props.matchId > 224 && props.matchId <= 240)
        props.locale.code == 'es' ? modalTitle += " | Dieciseisavos" : modalTitle += " | Round of 32";
    else if (props.matchId > 240 && props.matchId <= 248)
        props.locale.code == 'es' ? modalTitle += " | Octavos" : modalTitle += " | Round of 16";
    else if (props.matchId > 248 && props.matchId <= 252)
        props.locale.code == 'es' ? modalTitle += " | Cuartos de final" : modalTitle += " | Quarter finals";
    else if (props.matchId > 252 && props.matchId <= 254)
        props.locale.code == 'es' ? modalTitle += " | Semifinales" : modalTitle += " | Semifinals";
    else if (props.matchId == 255)
        props.locale.code == 'es' ? modalTitle += " | Final" : modalTitle += " | Final";

    return <BsModal
        isNew={false}
        onUpdate={updateData}
        modalTitle={modalTitle}
        noButtons={true}
        show={props.show}
        onHide={props.onHide}>
        <Scoreboard game={match} />
    </BsModal>;
}
