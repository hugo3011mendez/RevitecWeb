import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import './WideImageButton.scss';

/**
 * Wide clickable element with a blurred background image.
 * Props:
 * - img: Background image.
 * Children: rendered inside with white text.
 * Other props: See div.
 */
export default function WideImageButton(props) {
    const { img, children, className, ...otherProps } = props;
    return <div className={`wide-block rounded ${className}`} {...otherProps}>
        <div
            className="blurred-bg"
            style={{ backgroundImage: `url(${img})` }}>
        </div>
        <div style={{ backgroundColor: "#0005" }}></div>
        <div className="text-white">{children}</div>
    </div>;
}

/**
 * Wide image button styled internal link.
 * Props:
 * - to: Relative link.
 * Children: rendered inside with white text.
 * Other props: See div.
 */
export function WideImageLink(props) {
    const { to, ...otherProps } = props;
    return <LinkContainer to={to}>
        <WideImageButton {...otherProps} />
    </LinkContainer>
}

/**
 * Wide image button styled link.
 * Props:
 * - href: Link.
 * Children: rendered inside with white text.
 * Other props: See div.
 */
export function WideImageA(props) {
    const { href, ...otherProps } = props;
    return <a href={href} className="wide-block">
        <WideImageButton {...otherProps} />
    </a>
}
