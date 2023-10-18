import moment from 'moment';
import React from 'react';
import { Form } from 'react-bootstrap';
import BsFormGroup from './BsFormGroup';

/**
 * Bootstrap FormControl inside a formGroup, with a label and help/error text.
 * Props:
 * - name: Name and id of the input.
 * - value
 * - label
 * - help: Description text.
 * - error: Error text, shown in red.
 * - isControlled: If true, the input is isControlled.
 * - isNewPassword: If true, autocomplete is turned off.
 * - className: FormGroup className.
 * - inputClassName: FormControl className.
 * - column: Horizontal space that the label takes (0-12).
 *       If 0, label is always shown on top of the input.
 * Other props: See FormControl.
 */
export default function BsFormControl(props) {
    // get props
    const { name, value, label, help, error, isControlled,
        isNewPassword, className, inputClassName, column, ...otherProps } = props;

    // handle value
    const getValue = () => {
        switch (props.type) {
            case "date":
                const dateValue = moment(value);
                return dateValue.isValid() ? dateValue.format("YYYY-MM-DD") : null;
            default:
                return value;
        }
    }
    const valueProps =
        props.isControlled ?
            { value: getValue() } :
            { defaultValue: getValue() };

    // render
    return (
        <BsFormGroup
            inputId={name} label={label}
            help={help} error={error}
            className={className} column={column}>
            <Form.Control
                id={name}
                name={name}
                {...valueProps}
                {...otherProps}
                className={inputClassName}
                aria-describedby={name + "HelpBlock"}
                autoComplete={props.isNewPassword ? "new-password" : "on"}
            />
        </BsFormGroup>
    );
}

BsFormControl.defaultProps = {
    value: ""
}
