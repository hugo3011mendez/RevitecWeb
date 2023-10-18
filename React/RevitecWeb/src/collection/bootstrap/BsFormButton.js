import React from 'react';
import BsButton from './BsButton';

/**
 * Bootstrap button prepared to take the place of a form input.
 * Other props: See BsButton.
 */
export default function BsFormButton(props) {
    return <div className="d-grid"><BsButton {...props} /></div>;
}
