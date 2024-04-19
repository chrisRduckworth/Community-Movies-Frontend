import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBooking } from "../../utils/api";
import { BookingDetail } from "../../interfaces";
import dayjs from "dayjs";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import "./Booking.css";

function Booking() {
  const { screening_id, booking_id } = useParams();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setBooking(null);
    setError("");
    getBooking(screening_id, booking_id)
      .then((bookingData: BookingDetail) => {
        setBooking(bookingData);
      })
      .catch(
        ({
          response: {
            data: { msg },
          },
        }) => {
          setError(msg);
        }
      );
  }, []);

  if (error) {
    return (
      <main>
        <Link to={`/screenings`} className="return-link">
          Return to screenings
        </Link>
        <div className="screenings-main">
          <div className="booking-main"></div>
          <p className="error">
            {error === "No booking found" ? error : "Something went wrong"}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Link to={`/screenings`} className="return-link">
        Return to screenings
      </Link>
      <div className="screenings-main">
        <div className="booking-main" id="booking-details">
          {booking === null ? (
            <h3 className="loading">Loading...</h3>
          ) : (
            <>
              <div>
                <h2>Booking Details</h2>
              </div>
              <div>
                <p>
                  {booking.screening.title} ({booking.screening.year})
                </p>
              </div>
              <div>
                <p>
                  {dayjs(booking.screening.date).format("D MMMM YYYY, HH:mm")}
                </p>
              </div>

              <div>
                {booking.screening.location.split(",").map((line, i, arr) => {
                  return (
                    <p key={line}>
                      {line}
                      {i === arr.length - 1 ? "" : ","}
                    </p>
                  );
                })}
              </div>
              <div id="ticket">
                <h4>Email address:</h4>
                <p>{booking.email}</p>
                <h4>Ticket reference:</h4>
                <p>{booking.booking_id}</p>
              </div>
              <AddToCalendarButton
                name={`${booking.screening.title} Screening`}
                options={[
                  "Google",
                  "Apple",
                  "iCal",
                  "Microsoft365",
                  "MicrosoftTeams",
                  "Outlook.com",
                  "Yahoo",
                ]}
                location={booking.screening.location}
                startDate={dayjs(booking.screening.date).format("YYYY-MM-DD")}
                endDate={dayjs(booking.screening.date).format("YYYY-MM-DD")}
                startTime={dayjs(booking.screening.date).format("HH:mm")}
                endTime={dayjs(booking.screening.date)
                  .add(3, "hour")
                  .format("HH:mm")}
                buttonStyle="round"
              ></AddToCalendarButton>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Booking;
