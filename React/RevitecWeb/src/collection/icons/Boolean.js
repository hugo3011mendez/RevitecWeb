import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

/**
 * FontAwesome icon that represents a boolean value.
 * Props:
 * - value: Boolean value.
 * - 
 * Other props: See FontAwesomeIcon.
 */
export default function Boolean(props) {
    const { value, className, title,
        trueColor, falseColor,
        trueTitle, falseTitle,
        trueIcon, falseIcon,
        ...otherProps } = props;
    let bColor = falseColor;
    let bTitle = falseTitle;
    let bIcon = falseIcon;
    if (value) {
        bColor = trueColor;
        bTitle = trueTitle;
        bIcon = trueIcon;
    }
    return (
        <FontAwesomeIcon
            icon={bIcon}
            className={`text-${bColor} ${className}`}
            title={title ? title : bTitle}
            {...otherProps}
        />
    );
}

Boolean.defaultProps = {
    trueColor: "success",
    falseColor: "danger",
    trueTitle: "Verdadero",
    falseTitle: "Falso",
    trueIcon: faCheckCircle,
    falseIcon: faTimesCircle
}
