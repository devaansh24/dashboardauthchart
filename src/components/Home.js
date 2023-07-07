import React, { useState } from "react";
import data from "../filedata/jsondata";
import "./Home.css";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import { Row, Col, Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState(data);
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRelevance, setSelectedRelevance] = useState("");

  // Apply filters to the data
const applyFilters = () => {
  let filtered = data;

  if (selectedSource) {
    filtered = filtered.filter((item) => item.source === selectedSource);
  }

  if (selectedCountry) {
    filtered = filtered.filter((item) => item.country === selectedCountry);
  }

  if (selectedRelevance) {
    filtered = filtered.filter((item) => item.relevance === selectedRelevance);
  }

  setFilteredData(filtered);
};

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
    const uniqueCountries = [...new Set(data.map((item) => item.country))];
    const uniqueSources = [...new Set(data.map((item) => item.source))];
    const uniqueRelevanceLevels = [
      ...new Set(data.map((item) => item.relevance)),
    ];

  return (
    <>
      <div className="outer__main__box">
        <div className="filter__box">
          <div className="filter__box__items">
            <label>
              Source:
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="">All Sources</option>
                {uniqueSources
                  .filter((source) => source !== "")
                  .sort()
                  .map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              Country:
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">All Countries</option>
                {uniqueCountries
                  .filter((country) => country !== "")
                  .sort()
                  .map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
              </select>
            </label>

            <label>
              Relevance:
              <select
                value={selectedRelevance}
                onChange={(e) => setSelectedRelevance(e.target.value)}
              >
                <option value="">All Relevance Levels</option>
                {uniqueRelevanceLevels
                  .filter((relevance) => relevance !== "")
                  .sort()
                  .map((relevance) => (
                    <option key={relevance} value={relevance}>
                      {relevance}
                    </option>
                  ))}
              </select>
            </label>

            <button onClick={applyFilters}>Apply Filters</button>
          </div>
        </div>

        <div className="charts__box">
          <h1>Dashboard</h1>

          <Row>
            <Col>
              <div className="chart__body">
                <h2>Energy Intensity by Sector</h2>
                <BarChart width={600} height={400} data={filteredData}>
                  <Bar dataKey="intensity" fill="#8884d8" />
                  <Legend />
                </BarChart>
              </div>
            </Col>
          </Row>
        </div>

        <div className="charts__box">
          <Row>
            <Col>
              <div className="chart__body">
                <h2>Relevance Radar Chart</h2>
                <RadarChart
                  outerRadius={150}
                  width={600}
                  height={400}
                  data={filteredData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="sector" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar
                    name="Relevance"
                    dataKey="relevance"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </div>
            </Col>

            <Col>
              <div className="chart__body">
                <h2>Likelihood by Sector</h2>
                <LineChart width={600} height={400} data={filteredData}>
                  <Line type="monotone" dataKey="likelihood" stroke="#8884d8" />
                  <Legend />
                  <Tooltip />
                </LineChart>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="chart__body">
                <h2>Scatter Chart</h2>
                <ScatterChart width={600} height={400} data={filteredData}>
                  <Scatter
                    data={filteredData}
                    dataKey="likelihood"
                    fill="#8884d8"
                  />
                  <Legend />
                  <Tooltip />
                </ScatterChart>
              </div>
            </Col>

            <Col>
              <div className="chart__body">
                <h2>Area Chart</h2>
                <AreaChart width={600} height={400} data={filteredData}>
                  <Area type="monotone" dataKey="intensity" fill="#8884d8" />
                  <Legend />
                  <Tooltip />
                </AreaChart>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="chart__body">
                <h2>Relevance by Sector</h2>
                <PieChart width={600} height={400}>
                  <Pie
                    data={filteredData}
                    dataKey="relevance"
                    nameKey="sector"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                  />
                  <Legend />
                  <Tooltip />
                </PieChart>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="chart__body">
                <h2>Line Chart</h2>
                <LineChart width={600} height={400} data={filteredData}>
                  <Line type="monotone" dataKey="intensity" stroke="#8884d8" />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </div>
            </Col>

            <Col>
              <div className="chart__body">
                <h2>Bar Chart</h2>
                <BarChart width={600} height={400} data={filteredData}>
                  <Bar dataKey="likelihood" fill="#8884d8" />
                  <Tooltip />
                  <Legend />
                </BarChart>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="d-grid gap-2 mt-3">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
