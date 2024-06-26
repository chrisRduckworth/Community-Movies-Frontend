import axios from "axios";
import {
  ScreeningDetail,
  ScreeningOverview,
  BookingDetail,
  Result,
  NewScreeningForm,
  PostScreening,
} from "../interfaces";
import dayjs from "dayjs";

const screeningsApi = axios.create({
  baseURL: "https://community-movies-backend.adaptable.app/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export async function getScreenings(): Promise<ScreeningOverview[]> {
  try {
    const {
      data: { screenings },
    } = await screeningsApi.get("/screenings");
    return screenings;
  } catch {
    return Promise.reject();
  }
}

export async function getScreening(
  screening_id: string | undefined
): Promise<ScreeningDetail> {
  try {
    const {
      data: { screening },
    } = await screeningsApi.get(`/screenings/${screening_id}`);
    return screening;
  } catch (e: any) {
    // for when the server doesn't send a response eg if it's down
    const res = e.response ? e : { response: { data: { msg: "uh oh" } } };
    return Promise.reject(res);
  }
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

export async function getBooking(
  screening_id: string | undefined,
  booking_id: string | undefined
): Promise<BookingDetail> {
  try {
    const {
      data: { booking },
    } = await screeningsApi.get(
      `/screenings/${screening_id}/bookings/${booking_id}`
    );
    return booking;
  } catch (e: any) {
    const res = e.response ? e : { response: { data: { msg: "uh oh" } } };
    return Promise.reject(res);
  }
}

export async function postLogin(password: string): Promise<string> {
  const {
    data: { token },
  } = await screeningsApi.post("/staff/login", { password });
  return token;
}

export async function getFilms(title: string, jwt: string): Promise<Result[]> {
  const {
    data: { films },
  } = await screeningsApi.get(`/films?title=${title}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return films;
}

export async function postScreening(
  form: NewScreeningForm,
  jwt: string
): Promise<PostScreening> {
  const {
    data: { screening },
  } = await screeningsApi.post(
    "/screenings",
    {
      tmdb_id: form.tmdb_id,
      location: `${form.streetAddress}, ${form.city}, ${form.postCode}`,
      date: dayjs(form.date).format(),
      cost: form.cost,
      is_pay_what_you_want: form.isPayWhatYouWant,
    },
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );
  return screening;
}
