import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="text-center my-5">
      <h1>Welcome to Openlayers Map</h1>
      <Link to={"/login"}><Button variant="warning">Log In</Button></Link>
    </Container>
  )
}
