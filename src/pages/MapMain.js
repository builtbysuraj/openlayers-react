import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MapMain() {
  const [map, setMap] = useState(null);
  const [statesLayerVisible, setStatesLayerVisible] = useState(true);
  const [districtsLayerVisible, setDistrictsLayerVisible] = useState(false);
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const initMap = () => {
    const statesLayer = new VectorLayer({
      source: new VectorSource({
        url:
          "https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States",
        format: new GeoJSON(),
      }),
      visible: statesLayerVisible,
    });

    const districtsLayer = new VectorLayer({
      source: new VectorSource({
        url:
          "https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson",
        format: new GeoJSON(),
      }),
      visible: districtsLayerVisible,
    });

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        statesLayer,
        districtsLayer,
      ],
      view: new View({
        center: [8700000, 2300000],
        zoom: 4,
      }),
    });

    setMap(map);
  };

  const handleStatesLayerChange = (e) => {
    setStatesLayerVisible(e.target.checked);
    map.getLayers().getArray()[1].setVisible(e.target.checked);
  };

  const handleDistrictsLayerChange = (e) => {
    setDistrictsLayerVisible(e.target.checked);
    map.getLayers().getArray()[2].setVisible(e.target.checked);
  };

  return (
    <>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand>Openlayers Maps</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as="span"><Link className="text-warning" to={"/login"}>Log out</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <div className="toast-container">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Body>Effects may take some time due to huge data set</Toast.Body>
          </Toast>
        </div>
        <div>
          <div id="map" style={{ width: "100%", height: "500px" }}></div>
          <Form className="d-flex gap-4">
            <Form.Check
              className="py-2"
              type="checkbox"
              checked={statesLayerVisible}
              id="States"
              onChange={handleStatesLayerChange}
              label="States"
            />
            <Form.Check
              className="py-2"
              type="checkbox"
              id="Districts"
              checked={districtsLayerVisible}
              onChange={handleDistrictsLayerChange}
              label="Districts"
            />
          </Form>
        </div>
      </Container>
    </>
  );
}
