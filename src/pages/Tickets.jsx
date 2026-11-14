
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import "./Tickets.css";

function getStatus(booking) {
  const [hourMinute, period] = booking.showtime.split(" ");
  let [hours, minutes] = hourMinute.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const showDate = new Date(
    `${booking.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
  );

  return showDate < new Date() ? "Completed" : "Upcoming";
}

export default function Tickets() {
  const [bookings] = useState(() =>
    JSON.parse(localStorage.getItem("cinebook-bookings") || "[]")
      .reverse()
  );

  return (
    <main className="tickets-page">
      <div className="tickets-header">
        <span>YOUR CINEMA HISTORY</span>
        <h1>My Tickets</h1>
        <p>All your CineBook reservations in one place.</p>
      </div>

      <section className="tickets-list">
        {bookings.length === 0 ? (
          <div className="tickets-empty">
            <h2>No bookings yet</h2>
            <p>Your movie tickets will appear here after booking.</p>
            <a href="/movies">Explore Movies →</a>
          </div>
        ) : (
          bookings.map((booking) => {
            const status = getStatus(booking);

            return (
              <article className="ticket-card" key={booking.bookingId}>
                <div className="ticket-poster">
                  <img src={booking.poster} alt={booking.movie} />
                </div>

                <div className="ticket-details">
                  <span className={`ticket-status ${status === "Completed" ? "completed" : ""}`}>
                    {status}
                  </span>

                  <h2>{booking.movie}</h2>

                  <p>{booking.theatre}</p>

                  <div className="ticket-information">
                    <div>
                      <span>Date</span>
                      <strong>{booking.date}</strong>
                    </div>

                    <div>
                      <span>Showtime</span>
                      <strong>{booking.showtime}</strong>
                    </div>

                    <div>
                      <span>Seats</span>
                      <strong>{booking.seats.join(", ")}</strong>
                    </div>

                    <div>
                      <span>Amount</span>
                      <strong>₹{booking.amount}</strong>
                    </div>
                  </div>

                  <p className="ticket-id">
                    Booking ID: {booking.bookingId}
                  </p>
                </div>

                <div className="ticket-qr">
                  <QRCodeSVG
                    value={JSON.stringify({
                      bookingId: booking.bookingId,
                      movie: booking.movie,
                      date: booking.date,
                      showtime: booking.showtime,
                      seats: booking.seats,
                    })}
                    size={125}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#080b18"
                  />

                  <span>SCAN TICKET</span>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
