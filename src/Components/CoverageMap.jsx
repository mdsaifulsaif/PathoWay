import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Replace this with your imported JSON or local state
import coverageData from "../../data/warehouses.json";

// Fix Leaflet icon bug in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const CoveragePage = () => {
  const [search, setSearch] = useState("");

  const filtered = coverageData.filter((d) =>
    d.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-base-100 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-neutral">
        We are available in 64 districts
      </h1>

      {/* Search */}
      <div className="flex items-center gap-2 max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search here"
          className="input input-bordered w-full rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn bg-lime-400 text-black rounded-full hover:bg-lime-500">
          <FaSearch />
          Search
        </button>
      </div>

      {/* Subheading */}
      <h2 className="text-xl font-semibold text-center mb-6">
        We deliver almost all over Bangladesh
      </h2>

      {/* Leaflet Map */}
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded-lg z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filtered.map((place, index) => (
          <Marker key={index} position={[place.latitude, place.longitude]}>
            <Popup>
              <strong>{place.city}</strong>
              <br />
              District: {place.district}
              <br />
              Areas: {place.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoveragePage;
