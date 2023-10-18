import React from 'react';

/**
 * Hidden input.
 * Props:
 * - name: Serves both as id and name of the input.
 * - value: Value of the input.
 * Other props: See input.
 */
export default function HiddenInput(props) {
    const { name, value, ...otherProps } = props;
    return (
        <input
            hidden
            readOnly
            id={name}
            name={name}
            value={value}
            {...otherProps}
        />
    );
}
