import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { BsFloatingButton } from '../bootstrap/BootstrapComponents';
import './FloatingAddButton.scss';

/**
 * Bootstrap button.
 * Other props: See BsFloatingButton.
 */
export default function FloatingAddButton(props) {
    const { className, ...otherProps } = props;
    return (
        <BsFloatingButton className={"btn-icon " + className}
            {...otherProps}>
            <FontAwesomeIcon icon={faPlus} />
        </BsFloatingButton>
    );
}
