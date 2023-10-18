import React from 'react';
import BsButton from './BsButton';
import './BsFloatingButton.scss';

/**
 * Bootstrap button that floats in the right bottom corner.
 * Other props: See BsButton.
 */
export default function BsFloatingButton(props) {
    const { className, ...otherProps } = props;
    return <BsButton className={"btn-floating " + className} {...otherProps} />;
}

BsFloatingButton.defaultProps = {
    size: "lg"
}
