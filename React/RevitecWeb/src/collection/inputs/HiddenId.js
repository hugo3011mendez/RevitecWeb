import React from 'react';
import HiddenInput from './HiddenInput';

/**
 * Hidden input with name and id "id".
 * Props:
 * - id: Default 0.
 * Other props: See HiddenInput.
 */
export default function HiddenId(props) {
    const { id, ...otherProps } = props;
    return (
        <HiddenInput
            name="id"
            value={id ? id : 0}
            {...otherProps}
        />
    );
}
