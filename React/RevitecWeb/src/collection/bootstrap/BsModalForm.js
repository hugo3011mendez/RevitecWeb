import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import HiddenId from '../inputs/HiddenId';
import BsModal from './BsModal';

/**
 * Bootstrap Form and Modal components combined. Handles some advanced form behaviour.
 * Props:
 * - isNew: If true, the form will not try to load previous data.
 * - function onUpdate(): object data
 * - function onCheck(FormData data): object errors
 * - function onSave(FormData data)
 * - hiddenId: If true (default), a hidden id input will be rendered inside the form
 * Other props: See BsModal.
 * Children: Additional props data, errors, isNew, onSubmit, isSaving and getFormData are passed to children.
 */
export default function BsModalForm(props) {
    const { isNew, onUpdate, onCheck, onSave, hiddenId,
        children, ...otherProps } = props;

    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const updateData = async () => setData(await onUpdate());

    // load
    useEffect(() => {
        if (isNew) setData({});
        else updateData();
    }, []);

    // form ref
    const formRef = useRef();
    const getFormData = () => new FormData(formRef.current);

    // check
    const checkErrors = formData => {
        let errors = {};
        if (typeof onCheck === 'function') {
            const result = onCheck(formData);
            if (result) errors = result;
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    // submit
    const handleSubmit = async () => {
        const formData = getFormData();
        const ok = checkErrors(formData);
        if (ok) {
            setIsSaving(true);
            await onSave(formData);
            setIsSaving(false);
        }
    }

    // children with additional props
    const proppedChildren = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                data: data,
                errors: errors,
                isNew: isNew,
                onSubmit: handleSubmit,
                isSaving: isSaving || !data,
                getFormData: getFormData
            });
        }
        return child;
    });

    return <BsModal
        isLoading={!data}
        isSaving={isSaving}
        onSave={handleSubmit}
        {...otherProps}>
        <Form ref={formRef}>
            { /* Form */}
            {data && <>
                {hiddenId && <HiddenId id={data.id} />}
                {proppedChildren}
            </>}
        </Form>
    </BsModal>;
}

BsModalForm.defaultProps = {
    saveBtnText: "Guardar",
    backBtnText: "Volver",
    hiddenId: true
}
