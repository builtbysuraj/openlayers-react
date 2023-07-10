import { useState } from "react";
import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import useLogin from "../hook/useLogin";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const handleLogin = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleLogin(username, password);
    if (!success) {
      setShowToast(true);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={3}></Col>
        <Col md={6}>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="warning" type="submit">
              Login
            </Button>
          </Form>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Body>Please enter correct details or fill all input fields</Toast.Body>
          </Toast>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
}
