import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

export const Header = props => {
    const Navigation = withRouter(({ history }) => (
        <Navbar.Collapse>
            <Nav>
                <NavItem eventKey={1} onClick={() => history.push("/voting")}>
                    {"Voting"}
                </NavItem>

                <NavItem eventKey={2} onClick={() => history.push("/statistics")}>
                    {"Statistics"}
                </NavItem>

                <NavItem eventKey={3} onClick={() => history.push("/top")}>
                    {"Top"}
                </NavItem>
            </Nav>
        </Navbar.Collapse>
    ));

    return (
        <header>
            <Navbar
                inverse
                collapseOnSelect={true}
                style={{ marginBottom: "0", borderRadius: "0" }}
            >
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/voting">AB cat testing</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navigation />
            </Navbar>
        </header>
    );
};
