import React, { useState, useEffect } from 'react';
import { BsModal } from '../../collection/bootstrap/BootstrapComponents';
import Scoreboard from '../Scoreboard';
import { apiGet } from '../../utils/api';

export default function PlateTimetableModal(props) {
    const updateData = async () => await apiGet("plategames/get/" + props.plateGameId);

    const [plateGame, setPlateGame] = useState(updateData);

    useEffect(() => {
        // API call
        apiGet("plategames/get/" + props.plateGameId)
            .then(data => setPlateGame(data));
    }, []);

    // Establishing modular title
    var modalTitle = props.locale.code == 'es' ? "Partido de Linde Continental" : "Linde Continental Game";
    if (props.plateGameId > 0 && props.plateGameId <= 16)
        props.locale.code == 'es' ? modalTitle += " | Dieciseisavos" : modalTitle += " | Round of 32";
    else if (props.plateGameId > 16 && props.plateGameId <= 24)
        props.locale.code == 'es' ? modalTitle += " | Octavos" : modalTitle += " | Round of 16";
    else if (props.plateGameId > 24 && props.plateGameId <= 28)
        props.locale.code == 'es' ? modalTitle += " | Cuartos de final" : modalTitle += " | Quarter finals";
    else if (props.plateGameId > 28 && props.plateGameId <= 30)
        props.locale.code == 'es' ? modalTitle += " | Semifinales" : modalTitle += " | Semifinals";
    else if (props.plateGameId == 31)
        props.locale.code == 'es' ? modalTitle += " | Final" : modalTitle += " | Final";

    return <BsModal
        isNew={false}
        onUpdate={updateData}
        modalTitle={modalTitle}
        noButtons={true}
        show={props.show}
        onHide={props.onHide}>
        <Scoreboard game={plateGame} />
    </BsModal>;
}
