export interface ScreeningOverview {
  film: {
    title: string;
    year: number;
    poster_url: string;
  };
  screening_id: number;
  location: string;
  date: string;
  cost: number;
  is_pay_what_you_want: boolean;
}

export interface ScreeningDetail {
  film: {
    title: string;
    year: number;
    backdrop_url: string;
    logo_url: string;
    description: string;
  };
  location: string;
  date: string;
  cost: number;
  is_pay_what_you_want: boolean;
}

export interface BookingDetail {
  booking_id: string;
  email: string;
  charge: number;
  screening: {
    date: string;
    location: string;
    title: string;
    year: number;
  };
}

export interface NewScreeningForm {
  tmdb_id: number;
  date: string;
  streetAddress: "";
  postCode: "";
  city: "";
  isPayWhatYouWant: boolean;
  cost: number;
  value: string;
}

export interface Result {
  tmdb_id: number;
  title: string;
  year: number;
  poster_url: string;
}

export interface PostScreening {
  screening_id: number;
  location: string;
  date: string;
  cost: number;
  is_pay_what_you_want: boolean;
  film: {
    tmdb_id: number;
    title: string;
    year: number;
    poster_url: string;
    backdrop_url: string;
    description: string;
  };
}
