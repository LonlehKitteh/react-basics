import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import links from './data/links.json';

export default function Navigation() {
    return (
        <Navbar bg="dark" variant='dark' expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand><Link to='/'>Logo</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                    >
                        {links.map((link, key) => {
                            if (link.pages) {
                                return <NavDropdown key={key} title={link['main-link']} id="navbarScrollingDropdown">
                                    {
                                        link.pages.map((page, index) => {
                                            return (
                                                <React.Fragment key={`${key}-${index}`}>
                                                    {index === link.pages.length - 1 ? <NavDropdown.Divider /> : null}
                                                    <NavDropdown.Item as='div'>
                                                        <CustomLink to={`/${page.toLowerCase()}`}>{page}</CustomLink>
                                                    </NavDropdown.Item>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </NavDropdown>

                            }
                            return <CustomLink key={key} to={link['main-link'].toLowerCase() === 'home' ? '/' : `/${link['main-link'].toLowerCase()}`}>{link['main-link']}</CustomLink>
                        })}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return <Nav.Link as="div"><Link className={isActive ? "active" : ""} to={to} {...props}>{children}</Link></Nav.Link>
}