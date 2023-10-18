import React from 'react';
import './Center.scss';

/**
 * Absolutelly centered div, vertically and horizontally. Its children are horizontally centered too.
 * Props:
 * - navMargin: Takes the navbar into account.
 * Children: Rendered inside the div.
 * Other props: See div.
 */
export default function Center(props) {
    const { navMargin, className, children, ...otherProps } = props;
    return (
        <div className={`absolute-center ${navMargin && 'nav-margin'} ${className}`} {...otherProps}>
            {children}
        </div>
    );
}
