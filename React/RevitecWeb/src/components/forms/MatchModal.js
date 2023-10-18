import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { BsFormControl, BsFormSelect, BsModalForm } from '../../collection/bootstrap/BootstrapComponents';
import { useLoad } from '../../collection/Hooks';
import Loading from '../../collection/icons/Loading';
import { apiForm, apiGet } from '../../utils/api';

export default function MatchModal(props) {
    const isNew = props.matchId < 1;

    const updateData = async () => isNew ? {} : await apiGet("matches/get/" + props.matchId);

    const checkData = formData => {
        let errors = {};

        // player1
        const player1Id = formData.get("player1Id");
        if (!player1Id) {
            errors["player1Id"] = "Campo obligatorio";
        }
        // player2
        const player2Id = formData.get("player2Id");
        if (!player2Id) {
            errors["player2Id"] = "Campo obligatorio";
        }
        // field
        const fieldId = formData.get("fieldId");
        if (!fieldId) {
            errors["fieldId"] = "Campo obligatorio";
        }
        // scorePlayer1
        const scorePlayer1 = formData.get("scorePlayer1");
        if (!scorePlayer1) {
            errors["scorePlayer1"] = "Campo obligatorio";
        }
        // scorePlayer2
        const scorePlayer2 = formData.get("scorePlayer2");
        if (!scorePlayer2) {
            errors["scorePlayer2"] = "Campo obligatorio";
        }

        // startingDate
        const startingDate = formData.get("startingDate");
        if (!startingDate) {
            errors["startingDate"] = "Campo obligatorio";
        }
        // startingTime
        const startingTime = formData.get("startingTime");
        if (!startingTime) {
            errors["startingTime"] = "Campo obligatorio";
        }

        return errors;
    }

    const saveData = async data => {
        const result = await apiForm("matches/save", data);
        if (result) {
            props.onHide();
        }
    }

    return <BsModalForm
        isNew={isNew}
        onUpdate={updateData}
        onCheck={checkData}
        onSave={saveData}
        modalTitle={isNew ? "Partido nuevo" : "Editar partido"}
        show={props.show}
        onHide={props.onHide}>
        <MatchForm isNew={isNew} />
    </BsModalForm>;
}

function MatchForm(props) {
    const data = props.data;
    const errors = props.errors;

    const [playerList] = useLoad(() => { return apiGet("players/list") });
    const [fieldList] = useLoad(() => { return apiGet("fields/list") });
    const [isKO, setIsKO] = useState(data.isKO);

    const handleKOChange = (e) => {
        setIsKO(e.target.checked)
    };

    return playerList && fieldList ? <>
        { /* Player 1 */}
        <BsFormSelect
            label="Jugador 1" name="player1Id"
            value={data.player1Id} error={errors.player1Id}
            options={playerList} />
        { /* Player 2 */}
        <BsFormSelect
            label="Jugador 2" name="player2Id"
            value={data.player2Id} error={errors.player2Id}
            options={playerList}
            className="mt-3" />
        { /* Field */}
        <BsFormSelect
            label="Campo" name="fieldId"
            value={data.fieldId} error={errors.fieldId}
            options={fieldList}
            className="mt-3" />
        { /* Score Player 1 */}
        <BsFormControl
            label="Aros Jugador 1" name="scorePlayer1"
            value={data.scorePlayer1} error={errors.scorePlayer1}
            className="mt-3" />
        { /* Score Player 2 */}
        <BsFormControl
            label="Aros Jugador 2" name="scorePlayer2"
            value={data.scorePlayer2} error={errors.scorePlayer2}
            className="mt-3" />

        {
            isKO &&
            <>
                <BsFormControl
                    label="Aros 2ºSet Jugador 1" name="scorePlayer1Set2"
                    value={data.scorePlayer1Set2} error={errors.scorePlayer1Set2}
                    className="mt-3" />
                <BsFormControl
                    label="Aros 2ºSet Jugador 2" name="scorePlayer2Set2"
                    value={data.scorePlayer2Set2} error={errors.scorePlayer2Set2}
                    className="mt-3" />
                <BsFormControl
                    label="Aros 3ºSet Jugador 1" name="scorePlayer1Set3"
                    value={data.scorePlayer1Set3} error={errors.scorePlayer1Set3}
                    className="mt-3" />
                <BsFormControl
                    label="Aros 3ºSet Jugador 2" name="scorePlayer2Set3"
                    value={data.scorePlayer2Set3} error={errors.scorePlayer2Set3}
                    className="mt-3" />
            </>
        }

        { /* IsKO */}
        {props.isNew ?
            <Row
                className="mt-3">
                <Col sm={4}>Es eliminatoria</Col>
                <Col sm={8}>
                    <Form.Check
                        name="isKO" value="true"
                        defaultChecked={data.isKO}
                        onChange={handleKOChange}
                        type="switch" id="isKO" />
                </Col>
            </Row>
            :
            <input
                type="hidden"
                name="isKO"
                value={data.isKO ? true : false}
            />
        }

        { /* Starting Date */}
        <BsFormControl
            label="Fecha" name="startingDate"
            value={data.startingDate} error={errors.startingDate}
            type="date" className="mt-3" />
        { /* Starting Time */}
        <BsFormControl
            label="Hora de inicio" name="startingTime"
            value={data.startingTimeStr} error={errors.startingTime}
            type="time" className="mt-3" />
    </> : <Loading />;
}
