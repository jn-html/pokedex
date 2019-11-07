import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './iconecroix.png';
import './NavBar.css';

const Branding = styled.a `
user-select: none;
`;
const Logo = styled.img`
height: 30px;
width: 30px;
margin-right: 0.5em;
`;
const NavBarStyle = styled.nav``;

export default class NavBar extends Component {
state = {
    hoverNavBar: false
};

hoverNavBar() {
window.scrolly <= 0
    ?this.setState ({hoverNavBar:flase})
    :this.setState ({hoverNavBar: true});
};

componentDidMount() {
    window.addEventListener('scroll', this.hoverNavBar.bind(this), true );
}

componentWillMount() {
    window.removeEventListener('scroll', this.hoverNavBar.bind(this), true );
}

render() {
    return (
        <NavBarStyle
            className="navbar navbar-expand-md navbar-dark bg-dark fixed-top"
            style={
                this.state.hoverNavBar
                ? {
                    boxShadow:
                    '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba (0, 0, 0, 0.24)',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    backgroundColor: '#ef5350 !important'
                    }
                : { backgroundColor: 'transparent !important' }
            }
            >
            <Branding
            href="#"
            className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
            >
                <Logo src={logo} />
                close Modal
                </Branding>
            </NavBarStyle>
            );
    }


}