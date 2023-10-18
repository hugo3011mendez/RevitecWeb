import React from 'react';
import styled from "styled-components";
import BsButton from "./bootstrap/BsButton";
// Language
import { languageText } from '../utils/functions';

const Input = styled.input.attrs(props => ({
    type: "text",
    size: props.small ? 5 : undefined
}))`
  height: 2.5rem;
  width: 12rem;
  border-radius: 0.5rem;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 0.5rem 0 0.25rem;
`;

function FilterComponent(props)
{
    return <>
        <div className={props.className}>
            <h5 className="d-inline-block me-2">{languageText("Buscar :", "Search :")}</h5>

            <Input
                id="search"
                type="text"
                placeholder={languageText("Filtrar...", "Filter...")}
                value={props.filterText}
                onChange={props.onFilter}
                autoFocus={props.autoFocus}
            />

            <BsButton className="ms-1" style={{ height: '2.5rem', marginTop: '-0.35rem' }} onClick={props.onClear}>X</BsButton>
        </div>
    </>
} 

export default FilterComponent;
