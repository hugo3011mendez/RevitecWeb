import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import StickyFooter from '../styles/StickyFooter';
import BsButton from './BsButton';
import BsForm from './BsForm';

/**
 * Bootstrap form that handles some advanced form behaviour and includes save and back buttons.
 * Props:
 * - saveBtnText: Content of the save button.
 * - backBtnText: Content of the back button.
 * - backBtnLink: Link of the back button.
 * - buttonsInFooter: If true, the buttons will be inside a sticky footer.
 * Other props: See BsForm.
 * Children: Additional props data and errors are passed to children.
 */
export default function BsFormWithButtons(props) {
    const { saveBtnText, backBtnText, backBtnLink, buttonsInFooter,
        children, ...otherProps } = props;

    return (
        <BsForm className={buttonsInFooter && "mb-5"} {...otherProps}>
            {children}
            <Buttons
                stickyFooter={buttonsInFooter}
                saveBtnText={saveBtnText}
                backBtnText={backBtnText}
                backBtnLink={backBtnLink}
            />
        </BsForm>
    );
}

BsFormWithButtons.defaultProps = {
    saveBtnText: "Guardar",
    backBtnText: "Volver",
    backBtnLink: "/"
}

const Buttons = (props) => {
    const saveButton = (
        <BsButton
            variant={props.stickyFooter ? "primary" : "main"}
            onClick={props.onSubmit}
            isLoading={props.isSaving}>
            {props.saveBtnText}
        </BsButton>
    );
    const backButton = (
        <LinkContainer to={props.backBtnLink}>
            <BsButton variant="secondary">{props.backBtnText}</BsButton>
        </LinkContainer>
    );
    return props.stickyFooter ?
        <StickyFooter className="d-flex justify-content-between bg-main p-2">
            {backButton}{saveButton}
        </StickyFooter> :
        <div className="d-flex justify-content-center gap-3 mt-3">
            {saveButton}{backButton}
        </div>;
};
