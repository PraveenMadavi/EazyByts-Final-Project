import React, { useState } from 'react';
import { useNews } from './NewsContext';
import UserProfile from './UserProfile';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import "../styles/Logo.css";
import "../App.css"

function NewsNav(args) {
  const [isOpen, setIsOpen] = useState(false);
  const { setSearchQuery, userEmail } = useNews();


  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        expand="md"
        fixed="top"
        style={{
          backgroundColor: "rgba(43, 13, 133, 0.6)", // transparent background
          backdropFilter: "blur(5px)",               // blur effect
          WebkitBackdropFilter: "blur(10px)",         // for Safari support
        }}
        className="shadow-sm"
        {...args}
      >


        <NavbarBrand tag={Link} to="/">
          <div className="nav-logo">
            EazyByts<span className="nav-accent">News</span>
          </div>

        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="mx-auto d-flex justify-content-center" navbar>
            <NavItem > 
              <NavLink href="/components/" className="text-light fw-bold nav-hover">Home</NavLink> </NavItem>
            <NavItem >
              <NavLink href="#"
                className="text-light fw-bold nav-hover"
                onClick={(e) => {
                  e.preventDefault(); // prevent page reload
                  setSearchQuery("News");
                }}>News</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#"
                className="text-light fw-bold nav-hover"
                onClick={(e) => {
                  e.preventDefault(); // prevent page reload
                  setSearchQuery("India");
                }}>India</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#"
                className="text-light fw-bold nav-hover"
                onClick={(e) => {
                  e.preventDefault(); // prevent page reload
                  setSearchQuery("World");
                }}>World</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#"
                className="text-light fw-bold nav-hover"
                onClick={(e) => {
                  e.preventDefault(); // prevent page reload
                  setSearchQuery("Sports");
                }}>Sports</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#"
                className="text-light fw-bold nav-hover"
                onClick={(e) => {
                  e.preventDefault(); // prevent page reload
                  setSearchQuery("Politics");
                }}>Politics</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#"
                className="text-light fw-bold nav-hover"
                onClick={(e) => {
                  e.preventDefault(); // prevent page reload
                  setSearchQuery("Business");
                }}>Business</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#"
                className="text-light fw-bold nav-hover"
                onClick={(e) => {
                  e.preventDefault(); // prevent page reload
                  setSearchQuery("Innovation");
                }}>Innovation</NavLink>
            </NavItem>
            <NavItem >
              <NavLink href="#"
                className="text-light fw-bold nav-hover"
                onClick={(e) => {
                  e.preventDefault(); // prevent page reload
                  setSearchQuery("Weather");
                }}>Weather</NavLink>
            </NavItem>

            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="text-dark">
                Options
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <UserProfile />

        </Collapse>
      </Navbar>

    </div>
  );
}

export default NewsNav;