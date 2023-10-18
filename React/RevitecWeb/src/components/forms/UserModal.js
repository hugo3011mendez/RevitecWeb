import React from 'react';
import { BsFormControl, BsFormSelect, BsModalForm } from '../../collection/bootstrap/BootstrapComponents';
import { apiForm, apiGet } from '../../utils/api';
import { useLoad } from '../../collection/Hooks';
import Loading from '../../collection/icons/Loading';

export default function UserModal(props) {
    const isNew = props.userId < 1;

    const updateData = async () => isNew ? {} : await apiGet("users/get/" + props.userId);

    const checkData = formData => {
        let errors = {};

        // name
        const name = formData.get("name");
        if (!name) {
            errors["name"] = "Campo obligatorio";
        }
        // username
        const username = formData.get("username");
        if (!username) {
            errors["username"] = "Campo obligatorio";
        }
        // password
        const password = formData.get("password");
        if (isNew && !password) {
            errors["password"] = "Campo obligatorio";
        }
        // userType
        const userTypeId = formData.get("userTypeId");
        if (!userTypeId) {
            errors["userTypeId"] = "Campo obligatorio";
        }
        return errors;
    }

    const saveData = async data => {
        const result = await apiForm("users/save", data);
        if (result) {
            props.onHide();
        }
    }

    return <BsModalForm
        isNew={isNew}
        onUpdate={updateData}
        onCheck={checkData}
        onSave={saveData}
        modalTitle={isNew ? "Usuario nuevo" : "Editar usuario"}
        show={props.show}
        onHide={props.onHide}
        saveOnEnter>
        <UserForm />
    </BsModalForm>;
}

function UserForm(props) {
    const data = props.data;
    const errors = props.errors;

    const [userList] = useLoad(async () => await apiGet("users/list"));
    const [userTypesList] = useLoad(() => { return apiGet("users/typesList") });

    return userTypesList && userList ? <>
        { /* Name */}
        <BsFormControl
            label="Nombre" name="name"
            value={data.name} error={errors.name}
            maxLength={50} />
        { /* Username */}
        <BsFormControl
            label="Nombre de usuario" name="username"
            value={data.username} error={errors.username}
            maxLength={50} className="mt-3" />
        { /* Password */}
        <BsFormControl
            label="Contraseña" name="password"
            value={data.password} error={errors.password}
            maxLength={50}
            className="mt-3" />
        { /* UserType */}
        <BsFormSelect
            label="Tipo de usuario" name="userTypeId"
            value={data.userTypeId} error={errors.userTypeId}
            options={userTypesList}
            className="mt-3" />
    </> : <Loading />;
}
