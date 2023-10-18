import React, { useState, useContext } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import smTournamentLogo from '../resources/tournamentLogo.png';
import lgTournamentLogo from '../resources/tournamentLogo.png';
import smOrganizationLogo from '../resources/SpainCroquetLandLogo.png';
import lgOrganizationLogo from '../resources/SpainCroquetLandLogo.png';
import BsButton from '../collection/bootstrap/BsButton'
import './Navbar.scss';

export default function NavigationBar(props) {

    // Login
    const [isModalOpen, setIsModalOpen] = useState(false);

    /***** show login *****/
    const showLoginModal = () => {
        setIsModalOpen(true);
    }
    /***** close login *****/
    const closeLoginModal = () => {
        setIsModalOpen(false);
    }

    return (
        <Navbar collapseOnSelect expand={'xxxl'} className="bg-main" id="navbar-expand-xxxl" variant="dark" sticky="top">
            <Container className="container-fluid ms-5">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <div className="d-sm-inline-block">
                            <img src={smTournamentLogo} className="logo d-sm-none" alt="Tournament Logo" />
                            <img src={lgTournamentLogo} className="logo d-sm-inline-block d-none" alt="Tournament Logo" />
                            <img src={smOrganizationLogo} className="logo d-sm-none" alt="Organization Logo" />
                            <img src={lgOrganizationLogo} className="logo d-sm-inline-block d-none" alt="Organization Logo" />
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