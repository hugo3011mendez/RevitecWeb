import React from 'react';
import { BsModalForm, BsFormButton, BsFormControl, BsInputPassword } from '../../collection/bootstrap/BootstrapComponents';
import { apiForm } from '../../utils/api';
import { languageText } from '../../utils/functions';
import './Login.scss';

export default function LoginModal(props) {
    const checkData = formData => {
        let errors = {};

        // username
        const username = formData.get("username");
        if (!username) {
            errors["username"] = "Campo obligatorio";
        }

        // password
        const password = formData.get("password");
        if (!password) {
            errors["password"] = "Campo obligatorio";
        }
        return errors;
    }

    const saveData = async data => {
        const result = await apiForm("session/login", data);
        if (result) {
            props.onLogin(result);
            props.onHide();
        }
    }

    return <BsModalForm
        isNew={true}
        onCheck={checkData}
        onSave={saveData}
        noButtons={true}
        modalTitle={languageText("Iniciar sesión", "Login")}
        show={props.show}
        onHide={props.onHide}
        saveOnEnter>
        <LoginForm onSubmit={saveData} />
    </BsModalForm>;
}

function LoginForm(props) {
    const errors = props.errors;

    return <>
        <BsFormControl placeholder={languageText("Nombre de usuario", "Username")} name="username" error={errors.username} column=""/>
        <BsInputPassword placeholder={languageText("Contraseña", "Password")} name="password" className="mt-3" error={errors.password} />
        <BsFormButton onClick={props.onSubmit} isLoading={props.isSaving} className="mt-3">
            {languageText("Entrar", "Login")}
        </BsFormButton>
    </>;
}
