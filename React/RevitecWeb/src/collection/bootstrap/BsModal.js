import React from 'react';
import { Modal, Stack } from 'react-bootstrap';
import Loading from '../../collection/icons/Loading';
import BsButton from './BsButton';

/**
 * Bootstrap modal.
 * Props:
 * - modalTitle: Title of the modal.
 * - isLoading: If true, shows a loading animation instead of the content.
 * - isSaving: If true, save button is disabled and a loading animation is shown inside.
 * - saveOnEnter: If true, the save function will be called when pressing enter.
 * - onSave: Triggered when the save button is pressed.
 * - show: If true, the modal will be visible.
 * - onHide: Triggered when the modal is closed.
 * - noButtons: If true, the footer is not rendered.
 * - saveBtnText: Text of the save button.
 * - hideBtnText: Text of the hide button.
 * - additionalButtons: Rendered between the hide and save buttons. 
 * 
 * Other props: See Modal.
 * Children: Rendered inside the modal body when it is not loading.
 */
export default function BsModal(props) {

    // get props
    const { onSave, onHide, modalTitle, isLoading, isSaving, noButtons,
        saveBtnText, hideBtnText, saveOnEnter, additionalButtons,
        children, ...otherProps } = props;

    // saveOnEnter
    const handleKeyPress = (event) => {
        if (saveOnEnter && event.which === 13) {
            onSave();
        }
    };

    // render
    return (
        <Modal
            onHide={onHide}
            onKeyPress={handleKeyPress}
            {...otherProps}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{isLoading ? <Loading /> : children}</Modal.Body>
            {!noButtons && <Modal.Footer as={Stack}>
                <Stack direction="horizontal" gap={2}>
                    {additionalButtons}
                    <BsButton variant="secondary" onClick={onHide} className="ms-auto">{hideBtnText}</BsButton>
                    <BsButton onClick={onSave} isLoading={isSaving || isLoading}>
                        {saveBtnText}
                    </BsButton>
                </Stack>
            </Modal.Footer>}
        </Modal>
    );
}

BsModal.defaultProps = {
    centered: true,
    saveBtnText: "Guardar",
    hideBtnText: "Cerrar"
}
