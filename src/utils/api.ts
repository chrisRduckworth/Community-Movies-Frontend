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

export async function getScreening(screening_id: string | undefined) {
  try {
    const {
      data: { screening },
    } = await newsApi.get(`/screenings/${screening_id}`);
    return screening;
  } catch (e) {
    console.log(e);
  }
}
