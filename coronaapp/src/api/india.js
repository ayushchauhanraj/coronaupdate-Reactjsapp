import axios from "axios";

const url1 = "https://api.covid19india.org/state_district_wise.json";
const url2 = "https://api.covid19india.org/data.json";

export const fetchStateData = async () => {
  try {
    const {
      data: { statewise },
    } = await axios.get(url2);
    //console.log(statewise[0].state);
    return statewise;
  } catch (error) {
    //console.log(error);
  }
};

export const fetchDistrictData = async () => {
  try {
    const { data } = await axios.get(url1);
    //console.log(data);
    return data;
  } catch (error) {
    //console.log(error);
  }
};
