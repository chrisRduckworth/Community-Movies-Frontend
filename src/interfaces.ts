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
