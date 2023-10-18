import React from 'react';
import './StickyFooter.scss';

/**
 * Sticky footer, always visible on the bottom.
 * Other props: See footer.
 * Children: Rendered inside the footer.
 */
export default function (props) {
    const { className, children, ...otherProps } = props;
    return (
        <footer
            className={`${className} sticky`}
            {...otherProps}>
            {children}
        </footer>
    );
}
