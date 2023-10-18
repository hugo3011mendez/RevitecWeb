import React from 'react';
import { BsFormControl, BsFormSelect, BsModalForm } from '../../collection/bootstrap/BootstrapComponents';
import { apiForm, apiGet } from '../../utils/api';
import { useLoad } from '../../collection/Hooks';
import Loading from '../../collection/icons/Loading';

export default function MessageModal(props) {
    const isNew = props.messageId < 1;

    const updateData = async () => await apiGet("messages/get/" + props.messageId);

    const checkData = formData => {
        let errors = {};

        // title
        const title = formData.get("title");
        if (!title) {
            errors["title"] = "Campo obligatorio";
        }
        // text
        const text = formData.get("text");
        if (!text) {
            errors["text"] = "Campo obligatorio";
        }
        // messageType
        const messageTypeId = formData.get("messageTypeId");
        if (!messageTypeId) {
            errors["messageTypeId"] = "Campo obligatorio";
        }
        // language
        const messageLanguageId = formData.get("messageLanguageId");
        if (!messageLanguageId) {
            errors["messageLanguageId"] = "Campo obligatorio";
        }
        return errors;
    }

    const saveData = async data => {
        const result = await apiForm("messages/save", data);
        if (result) {
            props.onHide();
        }
    }

    return <BsModalForm
        isNew={isNew}
        onUpdate={updateData}
        onCheck={checkData}
        onSave={saveData}
        modalTitle={isNew ? "Mensaje nuevo" : "Editar mensaje"}
        show={props.show}
        onHide={props.onHide}
        saveOnEnter>
        <MessageForm />
    </BsModalForm>;
}

function MessageForm(props) {
    const data = props.data;
    const errors = props.errors;

    const [messageList] = useLoad(async () => await apiGet("messages/list"));
    const [messageTypesList] = useLoad(() => { return apiGet("messages/typesList") });
    const [messageLanguagesList] = useLoad(() => { return apiGet("messages/languagesList") });

    return messageTypesList && messageList ? <>
        { /* Title */}
        <BsFormControl
            label="Título" name="title"
            value={data.title} error={errors.title}
            maxLength={100} />
        { /* Text */}
        <BsFormControl
            label="Texto" name="text"
            value={data.text} error={errors.text}
            maxLength={300} as="textarea"
            className="mt-3" />
        {/* MessageType */}
        <BsFormSelect
            label="Tipo de mensaje" name="messageTypeId"
            value={data.messageTypeId} error={errors.messageTypeId}
            options={messageTypesList}
            className="mt-3" />
        { /* Language */}
        <BsFormSelect
            label="Idioma" name="messageLanguageId"
            value={data.messageLanguageId} error={errors.messageLanguageId}
            options={messageLanguagesList}
            className="mt-3" />
    </> : <Loading />;}
