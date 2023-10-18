import React from 'react';

/**
 * Colored box.
 * Props:
 * - color
 * - className
 * Children: rendered inside the div.
 * Other props: See div.
 */
export default function Colored(props) {
    const { children, color, className, ...otherProps } = props;
    return <div
        style={{ backgroundColor: `#${color}60` }}
        className={`rounded ${className}`}
        {...otherProps}>
        {children}
    </div>;
}
