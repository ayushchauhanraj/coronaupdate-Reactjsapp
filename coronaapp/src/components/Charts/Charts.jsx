import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Charts.module.css";

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, [setDailyData]);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  );
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255,  0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255,0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current status in ${country}` },
      }}
    />
  ) : (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  );
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Charts;
