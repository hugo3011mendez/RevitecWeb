import React from 'react';
import { BsFormControl, BsModalForm } from '../../collection/bootstrap/BootstrapComponents';
import { apiForm, apiGet } from '../../utils/api';
import { useLoad } from '../../collection/Hooks';
import Loading from '../../collection/icons/Loading';

export default function PlayerModal(props) {
    const isNew = props.playerId < 1;

    const updateData = async () => isNew ? {} : await apiGet("players/get/" + props.playerId);

    const checkData = formData => {
        let errors = {};
        // name
        const name = formData.get("name");
        if (!name) {
            errors["name"] = "Campo obligatorio";
        }
        // userType
        const dgrade = formData.get("dgrade");
        if (!dgrade) {
            errors["dgrade"] = "Campo obligatorio";
        }
        return errors;
    }

    const saveData = async data => {
        const result = await apiForm("players/save", data);
        if (result) {
            props.onHide();
        }
    }

    return <BsModalForm
        isNew={isNew}
        onUpdate={updateData}
        onCheck={checkData}
        onSave={saveData}
        modalTitle={isNew ? "Jugador nuevo" : "Editar jugador"}
        show={props.show}
        onHide={props.onHide}
        saveOnEnter>
        <PlayerForm />
    </BsModalForm>;
}

function PlayerForm(props) {
    const data = props.data;
    const errors = props.errors;

    const [playerList] = useLoad(async () => await apiGet("players/list"));

    return playerList ? <>
        { /* Name */}
        <BsFormControl
            label="Nombre" name="name"
            value={data.name} error={errors.name}
            maxLength={50} />
        { /* Dgrade */}
        <BsFormControl
            label="Dgrade" name="dgrade"
            value={data.dgrade} error={errors.dgrade}
            className="mt-3" />
    </> : <Loading />;
}
