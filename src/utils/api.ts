import axios from "axios";

const newsApi = axios.create({
  baseURL: "http://localhost:9090/api",
});

export async function getScreenings() {
  try {
    const {
      data: { screenings },
    } = await newsApi.get("/screenings");
    return screenings;
  } catch (e) {
    console.log(e);
  }
}
