import React from 'react';
import MainHeader from './MainHeader';
import './MainNavigation.css';
import { Link } from 'react-router-dom';
import { Navbar} from 'react-bootstrap';
import { Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainNavigation = props => {
    return (
        <MainHeader>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/posts">Posts By Date</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/cms">CMS</Nav.Link>
                    <Nav.Link href="/posts">POSTS</Nav.Link>
                </Nav>  
            </Navbar>
        </MainHeader>
    );
};

export default MainNavigation;