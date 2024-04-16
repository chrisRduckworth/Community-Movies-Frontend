import axios from "axios";
import { ScreeningDetail, ScreeningOverview } from "../interfaces";

const screeningsApi = axios.create({
  baseURL: "http://localhost:9090/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export async function getScreenings(): Promise<ScreeningOverview[]> {
  const {
    data: { screenings },
  } = await screeningsApi.get("/screenings");
  return screenings;
}

export async function getScreening(
  screening_id: string | undefined
): Promise<ScreeningDetail> {
  const {
    data: { screening },
  } = await screeningsApi.get(`/screenings/${screening_id}`);
  return screening;
}

export async function postCheckout(
  screening_id: string | undefined,
  charge: number
): Promise<string> {
  const {
    data: { session_url },
  } = await screeningsApi.post(`/screenings/${screening_id}/checkout`, {
    charge,
  });
  return session_url;
}
