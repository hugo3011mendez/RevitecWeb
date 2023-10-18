import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import BsButton from './BsButton';

/**
 * Simple bootstrap password input with an eye button that allows
 * the user to see what they write in clear text.
 * Props:
 * - name: Input name.
 * - placeholder: Input placeholder.
 * - variant: Variant of the eye button.
 * - onChange: Function triggered everytime the user changes the value.
 * - className: InputGroup className.
 * - isNewPassword: If true, autocomplete is turned off.
 * Other props: See FormControl.
 */
export default function BsInputPassword(props) {
    const { variant, isNewPassword, className, ...otherProps } = props;

    const [show, setShow] = useState(false);
    const switchShow = () => setShow(!show);

    return (
        <InputGroup className={className}>
            <Form.Control
                type={show ? "text" : "password"}
                autoComplete={props.isNewPassword ? "new-password" : "on"}
                {...otherProps}
            />
            <BsButton
                onClick={switchShow}
                variant={variant}>
                <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
            </BsButton>
        </InputGroup>
    );
}

BsInputPassword.defaultProps = {
    variant: "secondary"
}
