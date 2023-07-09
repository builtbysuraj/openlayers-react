import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { useEffect, useState } from "react";

export default function MapMain() {
  const [map, setMap] = useState(null);
  const [statesLayerVisible, setStatesLayerVisible] = useState(true);
  const [districtsLayerVisible, setDistrictsLayerVisible] = useState(false);

  useEffect(() => {
    initMap();
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

  const handleStatesLayerChange = (event) => {
    setStatesLayerVisible(event.target.checked);
    map.getLayers().getArray()[1].setVisible(event.target.checked);
  };

  const handleDistrictsLayerChange = (event) => {
    setDistrictsLayerVisible(event.target.checked);
    map.getLayers().getArray()[2].setVisible(event.target.checked);
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div>
        <label>
          States
          <input
            type="checkbox"
            checked={statesLayerVisible}
            onChange={handleStatesLayerChange}
          />
        </label>
        <br />
        <label>
          Districts
          <input
            type="checkbox"
            checked={districtsLayerVisible}
            onChange={handleDistrictsLayerChange}
          />
        </label>
      </div>
    </div>
  );
}
