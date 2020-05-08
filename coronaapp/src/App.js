import React, { Component } from "react";
import { Charts, Cards, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { fetchStateData, fetchDistrictData } from "./api/india";
import image from "./images/image.png";
import { District } from "./components/district/district";

class App extends Component {
  state = {
    data: {},
    country: "",
    state: {},
    district: {},
    currentDistrict: null,
  };
  handleCountryChange = async (country) => {
    const fetchdata = await fetchData(country);
    this.setState({
      data: fetchdata,
      country: country,
      state: {},
      district: {},
      currentDistrict: null,
    });

    if (country === "India") {
      const stateData = await fetchStateData();
      const districtData = await fetchDistrictData();
      this.setState({ state: stateData, district: districtData });
    }
  };
  handleStateChange = async (recivestate) => {
    let data1 = this.state.state.filter(
      (state1) => recivestate === state1.state
    );

    let newData = {
      confirmed: {},
      deaths: {},
      recovered: {},
    };

    newData.confirmed.value = parseInt(data1[0].confirmed);
    newData.deaths.value = data1[0].deaths;
    newData.recovered.value = data1[0].recovered;
    newData.lastUpdate = data1[0].lastupdatedtime;
    newData.lastUpdate =
      newData.lastUpdate.slice(3, 6) +
      newData.lastUpdate.slice(0, 3) +
      newData.lastUpdate.slice(6);

    let districtdata = this.state.district[recivestate].districtData;
    this.setState({
      data: newData,
      country: data1[0].state,
      currentDistrict: districtdata,
    });
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  render() {
    const { data, country, state, currentDistrict } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker
          handleCountryChange={this.handleCountryChange}
          handleStateChange={this.handleStateChange}
          state={state}
        />
        <Charts data={data} country={country} />
        <District currentDistrict={currentDistrict} />
      </div>
    );
  }
}
export default App;
