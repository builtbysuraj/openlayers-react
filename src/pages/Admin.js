import { useEffect, useState } from "react";
import { Container, Form, ListGroup, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([])
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = () => {
    fetch("/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as="span"><Link className="text-warning" to={"/login"}>Log out</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <p className="mt-4 fw-bold">Logged in users</p>
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search user"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

        </Form>
        <ListGroup>
          {filteredUser.map((user) => (
            <ListGroup.Item key={user.id}>
              {user.id}.  {user.name} ({user.email})
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  )
}
