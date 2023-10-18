import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

/**
 * Bootstrap FormGroup.
 * Props:
 * - inputId: Id of the input, used to link the label and help text.
 * - label
 * - help: Description text.
 * - error: Error text, shown in red.
 * - className: FormGroup className.
 * - column: Horizontal space that the label takes (0-12).
 *       Object with size properties, example: {sm: 4, md:2}
 *       If falsy, label is always shown on top of the input.
 * Other props: See FormGroup.
 * Children: Rendered inside the FormGroup.
 */
export default function BsFormGroup(props) {
    // get props
    const { inputId, label, help, error, column,
        className, children, ...otherProps } = props;

    // column
    const isColumn = !!column;
    const reverseColumn = {};
    if (isColumn) {
        for (const [key, value] of Object.entries(column)) {
            reverseColumn[key] = 12 - value;
        }
    }

    // input
    const formControl =
        <>
            {children}
            {(error || help) &&
                <Form.Text id={inputId + "HelpBlock"}>
                    <span>{help}</span>
                    {error && help && <br />}
                    <span className="text-danger">{error}</span>
                </Form.Text>
            }
        </>;

    // render
    return (
        <Form.Group as={isColumn ? Row : Form.Group} className={className} {...otherProps}>
            {label && <Form.Label column={isColumn} {...column} htmlFor={inputId}>{label}</Form.Label>}
            {isColumn ? (<Col {...reverseColumn}>{formControl}</Col>) : formControl}
        </Form.Group>
    );
}

BsFormGroup.defaultProps = {
    column: { sm: 4 }
}
