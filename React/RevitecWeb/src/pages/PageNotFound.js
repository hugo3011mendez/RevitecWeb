import React from 'react';
import { languageText } from '../utils/functions';

export default function PageNotFound() {
    return (
        <section className="PageNotFound">
            <p>{languageText("No se ha encontrado la página a la que intenta acceder.", "The page you are trying to access could not be found ")}</p>
        </section>
    );
}
