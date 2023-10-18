import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { BsFormControl, BsFormSelect, BsModalForm } from '../../collection/bootstrap/BootstrapComponents';
import { useLoad } from '../../collection/Hooks';
import Loading from '../../collection/icons/Loading';
import { apiForm, apiGet } from '../../utils/api';

export default function DrawModal(props) {
    const isNew = props.drawId < 1;

    const updateData = async () => isNew ? {} : await apiGet("draws/get/" + props.drawId);

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
        // player3
        const player3Id = formData.get("player3Id");
        if (!player3Id) {
            errors["player3Id"] = "Campo obligatorio";
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
        // scorePlayer3
        const scorePlayer3 = formData.get("scorePlayer3");
        if (!scorePlayer3) {
            errors["scorePlayer3"] = "Campo obligatorio";
        }

        return errors;
    }

    const saveData = async data => {
        const result = await apiForm("draws/save", data);
        if (result) {
            props.onHide();
        }
    }

    return <BsModalForm
        isNew={isNew}
        onUpdate={updateData}
        onCheck={checkData}
        onSave={saveData}
        modalTitle={isNew ? "Empate nuevo" : "Editar empate"}
        show={props.show}
        onHide={props.onHide}
        saveOnEnter>
        <DrawForm />
    </BsModalForm>;
}

function DrawForm(props) {
    const data = props.data;
    const errors = props.errors;

    const [playerList] = useLoad(() => { return apiGet("players/list") });

    return playerList ? <>
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
        { /* Player 3 */}
        <BsFormSelect
            label="Jugador 3" name="player3Id"
            value={data.player3Id} error={errors.player3Id}
            options={playerList}
            className="mt-3" />
        { /* Player 4 */}
        <BsFormSelect
            label="Jugador 4" name="player4Id"
            value={data.player4Id}
            options={playerList}
            className="mt-3" />
        { /* Player 5 */}
        <BsFormSelect
            label="Jugador 5" name="player5Id"
            value={data.player5Id}
            options={playerList}
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
        { /* Score Player 3 */}
        <BsFormControl
            label="Aros Jugador 3" name="scorePlayer3"
            value={data.scorePlayer3} error={errors.scorePlayer3}
            className="mt-3" />
        { /* Score Player 4 */}
        <BsFormControl
            label="Aros Jugador 4" name="scorePlayer4"
            value={data.scorePlayer4}
            className="mt-3" />
        { /* Score Player 5 */}
        <BsFormControl
            label="Aros Jugador 5" name="scorePlayer5"
            value={data.scorePlayer5}
            className="mt-3" />
        { /* HasFinished */}
        <Row
            className="mt-3">
            <Col sm={4}>Finalizado</Col>
            <Col sm={8}>
                <Form.Check
                    name="hasFinished" value="true"
                    defaultChecked={data.hasFinished}
                    type="switch" id="hasFinished" />
            </Col>
        </Row>
        { /* IsRepositioned */}
        <Row
            className="mt-3">
            <Col sm={4}>Reposicionado</Col>
            <Col sm={8}>
                <Form.Check
                    name="isRepositioned" value="true"
                    defaultChecked={data.isRepositioned}
                    type="switch" id="isRepositioned" />
            </Col>
        </Row>
    </> : <Loading />;
}
