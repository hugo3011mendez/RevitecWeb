import React from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import imgLogoRevitec from '../resources/logo_revitec.png'

export default function NavigationBar(props) {

    return (
        <Navbar collapseOnSelect expand={'xxxl'} id="navbar-expand-xxxl" className="border-bottom" sticky="top">
            <Container className="container-fluid ms-5">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <div className="d-sm-inline-block ps-5">
                            <img src={imgLogoRevitec} style={{ height: '3.5rem' }} alt="Revitec Logo" />
                        </div>
                    </Navbar.Brand>
                </LinkContainer>

                <NavDropdown title="Servicios" id="basic-nav-dropdown">
                    <LinkContainer to="/view/messages">
                        <NavDropdown.Item className="text-center">Fachadas</NavDropdown.Item>
                    </LinkContainer>
                </NavDropdown>
            </Container>
        </Navbar>
    );
}