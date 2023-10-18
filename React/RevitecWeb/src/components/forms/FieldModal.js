import React from 'react';
import { BsFormControl, BsModalForm } from '../../collection/bootstrap/BootstrapComponents';
import { apiForm, apiGet } from '../../utils/api';
import { useLoad } from '../../collection/Hooks';
import Loading from '../../collection/icons/Loading';

export default function FieldModal(props) {
    const isNew = props.messageId < 1;

    const updateData = async () => await apiGet("fields/get/" + props.messageId);

    const checkData = formData => {
        let errors = {};

        // name
        const name = formData.get("name");
        if (!name) {
            errors["name"] = "Campo obligatorio";
        }
        // description
        const description = formData.get("description");
        if (!description) {
            errors["description"] = "Campo obligatorio";
        }
        return errors;
    }

    const saveData = async data => {
        const result = await apiForm("fields/save", data);
        if (result) {
            props.onHide();
        }
    }

    return <BsModalForm
        isNew={isNew}
        onUpdate={updateData}
        onCheck={checkData}
        onSave={saveData}
        modalTitle={isNew ? "Campo nuevo" : "Editar campo"}
        show={props.show}
        onHide={props.onHide}
        saveOnEnter>
        <FieldForm />
    </BsModalForm>;
}

function FieldForm(props) {
    const data = props.data;
    const errors = props.errors;

    const [fieldList] = useLoad(async () => await apiGet("fields/list"));

    return fieldList ? <>
        { /* Name */}
        <BsFormControl
            label="Nombre en español" name="name"
            value={data.name} error={errors.name}
            maxLength={50} />
        { /* Description */}
        <BsFormControl
            label="English name" name="description"
            value={data.description} error={errors.description}
            maxLength={50}
            className="mt-3" />
    </> : <Loading />;
}
