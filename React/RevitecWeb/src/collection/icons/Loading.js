import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

/**
 * FontAwesome spinning loading icon.
 * - className: Wrapper classname.
 * Other props: See FontAwesomeIcon.
 */
export default function Loading(props) {
    const { className, ...otherProps } = props;
    return (
        <div className={className}>
            <FontAwesomeIcon
                icon={faSpinner}
                className="fa-spin"
                {...otherProps}
            />
        </div>
    );
}

Loading.defaultProps = {
    size: "lg"
}
