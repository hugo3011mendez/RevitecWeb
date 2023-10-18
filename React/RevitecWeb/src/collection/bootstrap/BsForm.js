import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Loading from '../icons/Loading';
import HiddenId from '../inputs/HiddenId';

/**
 * Bootstrap form that handles some advanced form behaviour.
 * Props:
 * - isNew: If true, the form will not try to load previous data.
 * - function onUpdate(): object data
 * - function onCheck(FormData data): object errors
 * - function onSave(FormData data)
 * - saveOnEnter: If true, the save function will be called when pressing enter.
 * Other props: See Form.
 * Children: Additional props data, errors, isNew, onSubmit, isSaving and getFormData are passed to children.
 */
export default function BsForm(props) {
    const { isNew, onUpdate, onCheck, onSave, saveOnEnter,
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

    // saveOnEnter
    const handleKeyPress = event => {
        if (saveOnEnter && event.which === 13)
            handleSubmit();
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

    // render
    return (
        <Form
            ref={formRef}
            onKeyPress={handleKeyPress}
            {...otherProps}>
            {data ? <>
                {!isNew && <HiddenId id={data.id} />}
                {proppedChildren}
            </> : <Loading />
            }
        </Form>
    );
}
