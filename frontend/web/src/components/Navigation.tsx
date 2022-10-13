import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";


export default function Navigation() {

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		alert('An error occurred on the server. Please try again!!!');
	}


  return(
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>MovieSearch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link>noe</Nav.Link>
            <Nav.Link>noe2</Nav.Link>
            </Nav>
          <Form onSubmit = {handleSubmit} className="d-sm-flex">
            <Form.Control 
            type="text"
            placeholder="Movie"
            className="me-4 my-2"
            aria-label="movie"
            name="Movie"
            data-testid="movie" />
          </Form>
          <Button id = "getMovies" className="me-2" type="submit" variant="outline-success">Go</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}