import React from 'react';
import './FullScreen.scss';

/**
 * Div that covers the full screen.
 * Props:
 * - className
 * Children: rendered inside the div.
 * Other props: See div.
 */
export default function FullScreen(props) {
    const { className, children, ...otherProps } = props;
    return <div
        className={`full-screen ${className}`}
        {...otherProps}>
        {children}
    </div>;
}
