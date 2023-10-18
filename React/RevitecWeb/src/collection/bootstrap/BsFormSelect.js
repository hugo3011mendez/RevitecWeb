import React from 'react';
import Select from 'react-select';
import BsFormGroup from './BsFormGroup';

/**
 * React Select inside a FormGroup, with a label and help/error text.
 * Props:
 * - name: Name and id of the input.
 * - value
 * - label
 * - help: Description text.
 * - error: Error text, shown in red.
 * - isControlled: If true, the input is isControlled.
 * - className: FormGroup className.
 * - inputClassName: FormControl className.
 * - column: Horizontal space that the label takes (0-12).
 *       If 0, label is always shown on top of the input.
 * Other props: See Select.
 */
export default function BsFormSelect(props) {
    // get props
    const { name, value, label, help, error, isControlled,
        inputClassName, column,
        innerRef, className, ...otherProps } = props;

    // handle value
    const isSelected = option =>
        Array.isArray(value) ?
            value.includes(option.value) :
            option.value == value;
    const val = (value == null) ?
        "" :
        props.options.filter(isSelected);
    const valueProps =
        isControlled ?
            { value: val } :
            { defaultValue: val };

    // render
    return (
        <BsFormGroup
            inputId={name} label={label}
            help={help} error={error}
            className={className} column={column}>
            <Select
                id={name}
                name={name}
                ref={innerRef}
                {...valueProps}
                {...otherProps}
                className={inputClassName}
                aria-describedby={name + "HelpBlock"}
            />
        </BsFormGroup>
    );
}

BsFormSelect.defaultProps = {
    placeholder: "",
    noOptionsMessage: () => "Sin opciones"
}
