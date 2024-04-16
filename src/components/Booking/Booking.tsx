import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBooking } from "../../utils/api";
import { BookingDetail } from "../../interfaces";
import dayjs from "dayjs";
import "./Booking.css";

function Booking() {
  const { screening_id, booking_id } = useParams();
  const [booking, setBooking] = useState<BookingDetail | null>(null);

  useEffect(() => {
    getBooking(screening_id, booking_id).then((bookingData: BookingDetail) => {
      setBooking(bookingData);
    });
  }, []);
  return (
    <main>
      <Link to={`/screenings`} className="return-link">
        Return to screenings
      </Link>
      <div className="screenings-main">
        <div className="booking-main" id="booking-details">
          {booking === null ? (
            <p>Loading...</p>
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Booking;
