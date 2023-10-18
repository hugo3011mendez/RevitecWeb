import React, { useState, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import BsButton from '../collection/bootstrap/BsButton'
import './Navbar.scss';

export default function NavigationBar(props) {

    return (
        <Navbar collapseOnSelect expand={'xxxl'} className="bg-main" id="navbar-expand-xxxl" variant="dark" sticky="top">
            <Container className="container-fluid ms-5">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <div className="d-sm-inline-block">
                            {/*<img src={smTournamentLogo} className="logo d-sm-none" alt="Tournament Logo" />*/}
                        </div>
                        <h4 className="d-none d-sm-inline-block ms-2">Torneo Camino de Santiago</h4>
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="text-center bg-main">
                    <LinkContainer to="/view/messages">
                        <BsButton className="btn-primary">Mensajes</BsButton>
                    </LinkContainer>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}