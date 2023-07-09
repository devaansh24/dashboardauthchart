import React, { useState, useEffect } from "react";
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
  RadialBar,
  RadialBarChart,
 
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Row, Col, Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRelevance, setSelectedRelevance] = useState("");
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:4000/api/data");
  //     console.log(response, "response data");
  //     setFilteredData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/data", {});
      console.log(response, "response data");
      const limitedData = response.data.slice(0, 35);
      setFilteredData(limitedData);
      setOriginalData(limitedData); // Update the state with the data from the response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Apply filters to the data

  const applyFilters = () => {
    let filtered = [...originalData]; // Use originalData as a reference

    if (selectedSource) {
      filtered = filtered.filter((item) => item.source === selectedSource);
    }

    if (selectedCountry) {
      filtered = filtered.filter((item) => item.country === selectedCountry);
    }

    if (selectedRelevance) {
      filtered = filtered.filter(
        (item) => item.relevance === selectedRelevance
      );
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

  const uniqueCountries = [
    ...new Set(filteredData.map((item) => item?.country)),
  ];
  const uniqueSources = [...new Set(filteredData.map((item) => item?.source))];
  const uniqueRelevanceLevels = [
    ...new Set(filteredData.map((item) => item?.relevance)),
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
        <h1>Dashboard</h1>
        <div className="charts__box">
          <Row>
            <Col>
              <div className="chart__body">
                <h2>Energy Intensity by Sector</h2>
                <BarChart width={600} height={400} data={filteredData}>
                  <Bar dataKey="intensity" fill="#8884d8" />
                  <Bar dataKey="likelihood" fill="#C70039" />
                  <Legend />
                </BarChart>
              </div>
            </Col>

            <Col>
              <div className="chart__body">
                <h2>Energy Intensity by Sector</h2>
                <LineChart
                  width={730}
                  height={250}
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="relevance" stroke="#8884d8" />
                  <Line type="monotone" dataKey="likelihood" stroke="#82ca9d" />
                </LineChart>
              </div>
            </Col>
          </Row>
          {/* </div> */}

          {/* <div className="charts__box"> */}
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
                    name="Likelihood"
                    dataKey="relevance"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Relevance"
                    dataKey="likelihood"
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
                  <Line type="monotone" dataKey="relevance" stroke="#8884d8" />
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
                  <Scatter
                    data={filteredData}
                    dataKey="relevance"
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
                  <Area type="monotone" dataKey="relevance" fill="#8884d8" />
                  <Area type="monotone" dataKey="likelihood" fill="#8884d8" />
                  <Legend />
                  <Tooltip />
                </AreaChart>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="chart__body">
                <h2>Energy Intensity by Sector</h2>
                <LineChart
                  width={730}
                  height={250}
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="relevance" stroke="#8884d8" />
                  <Line type="monotone" dataKey="sector" stroke="#82ca9d" />
                </LineChart>
              </div>
            </Col>
            <Col>
              <div className="chart__body">
                <h2>Relevance by Sector</h2>
                <RadialBarChart
                  width={900}
                  height={450}
                  innerRadius="10%"
                  outerRadius="80%"
                  data={filteredData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    minAngle={15}
                    label={{ fill: "#666", position: "insideStart" }}
                    background
                    clockWise={true}
                    dataKey="likelihood"
                  />
                  <Legend
                    iconSize={10}
                    width={120}
                    height={140}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                  <Legend />
                  <Tooltip />
                </RadialBarChart>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="chart__body">
                <h2>Line Chart</h2>
                <LineChart width={600} height={400} data={filteredData}>
                  {/* <Line type="monotone" dataKey="intensity" stroke="#8884d8" /> */}
                  <Line type="monotone" dataKey="relevance" stroke="#8884d8" />
                  
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
                  <Bar dataKey="relevance" fill="#FFC300" />
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
