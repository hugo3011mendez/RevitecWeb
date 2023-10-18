import React from 'react';
import { Button } from 'react-bootstrap';
import Loading from '../../collection/icons/Loading';

/**
 * Bootstrap button.
 * Props:
 * - isLoading: If true, button will be disabled and show a loading animations instead of its text content.
 * - type
 * - variant
 * - disabled
 * Other props: See Button.
 * Children: Rendered inside the button when it is not loading.
 */
export default function BsButton(props) {
    const { disabled, isLoading, children, ...otherProps } = props;
    return (
        <Button
            disabled={disabled || isLoading}
            {...otherProps}>
            {isLoading ? <Loading /> : children}
        </Button>
    );
}

BsButton.defaultProps = {
    type: "button",
    variant: "main"
}
