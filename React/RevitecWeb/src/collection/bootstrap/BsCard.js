import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import './BsCard.scss';

/**
 * Bootstrap Card and Collapse components combined to create a collapsable card.
 * Props:
 * - header: Rendered inside the card header.
 * - collapsed: If true, card will start collapsed.
 * - className
 * Children: Rendered inside the card body.
 */
export default function BsCard(props) {
    const [show, setShow] = useState(!props.collapsed);
    const switchShow = () => setShow(!show);

    return (
        <Card className={`${show && "expanded"} ${props.className}`}>
            <Card.Header role="button" onClick={switchShow}>
                {props.header} <FontAwesomeIcon icon={show ? faCaretUp : faCaretDown} />
            </Card.Header>
            <Collapse in={show}>
                <div>
                    <Card.Body className="text-start">
                        {props.children}
                    </Card.Body>
                </div>
            </Collapse>
        </Card>
    );
}
