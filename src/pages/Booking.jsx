
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";
import "./Booking.css";

const rows = ["A", "B", "C", "D", "E", "F"];
const columns = 8;
const ticketPrice = 180;

const showtimes = [
  "10:00 AM",
  "01:30 PM",
  "04:30 PM",
  "07:30 PM",
];

function getDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getStoredSeats(key) {
  try {
    const seats = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(seats) ? seats : [];
  } catch {
    return [];
  }
}

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find(
    (item) => item.id === Number(id)
  );

  const [currentUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("cinebook-user") || "null"
      );
    } catch {
      return null;
    }
  });

  const [date, setDate] = useState(
    getDateString(new Date())
  );

  const [showtime, setShowtime] = useState("07:30 PM");

  const [selectedSeats, setSelectedSeats] = useState([]);

  const seatKey = `cinebook-seats-${id}-${date}-${showtime}`;

  const occupiedSeats = getStoredSeats(seatKey);

  if (!movie) {
    return (
      <div className="booking-page">
        <h2>Movie not found</h2>
        <button onClick={() => navigate("/movies")}>
          Back to Movies
        </button>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="booking-page">
        <h2>Please login to book tickets.</h2>
        <button
          onClick={() =>
            navigate("/login", {
              state: { from: `/book/${id}` },
            })
          }
        >
          Login Now
        </button>
      </div>
    );
  }

  const toggleSeat = (seat) => {
    if (occupiedSeats.includes(seat)) {
      return;
    }

    setSelectedSeats((previous) => {
      if (previous.includes(seat)) {
        return previous.filter((item) => item !== seat);
      }

      return [...previous, seat];
    });
  };

  const totalAmount = selectedSeats.length * ticketPrice;

  const confirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    // Recheck seats before confirming
    const latestOccupiedSeats = getStoredSeats(seatKey);

    const unavailableSeats = selectedSeats.filter((seat) =>
      latestOccupiedSeats.includes(seat)
    );

    if (unavailableSeats.length > 0) {
      alert(
        `These seats are already booked: ${unavailableSeats.join(", ")}. Please select different seats.`
      );

      setSelectedSeats((previous) =>
        previous.filter(
          (seat) => !latestOccupiedSeats.includes(seat)
        )
      );

      return;
    }

    // Get existing booking history
    const bookings = JSON.parse(
      localStorage.getItem("cinebook-bookings") || "[]"
    );

    // Generate booking ID
    const bookingId = `CB${Date.now()}`;

    // Create booking
    const booking = {
      bookingId,
      userEmail: currentUser.email,
      userName: currentUser.name,

      movieId: movie.id,
      movie: movie.title,
      poster: movie.poster,

      theatre: "CineBook Multiplex, Kochi",

      date,
      showtime,

      seats: selectedSeats,

      ticketPrice,
      ticketCount: selectedSeats.length,
      amount: totalAmount,

      bookedAt: new Date().toISOString(),
    };

    // Save booking history
    bookings.push(booking);

    localStorage.setItem(
      "cinebook-bookings",
      JSON.stringify(bookings)
    );

    // Mark selected seats as booked
    const updatedSeats = [
      ...latestOccupiedSeats,
      ...selectedSeats,
    ];

    localStorage.setItem(
      seatKey,
      JSON.stringify(updatedSeats)
    );

    // Navigate to ticket history
    navigate("/tickets");
  };

  return (
    <main className="booking-page">

      {/* PAGE HEADER */}

      <div className="booking-heading">
        <span>YOUR CINEMA EXPERIENCE</span>

        <h1>Book Your Seats</h1>

        <p>
          Select your movie, choose your preferred seats
          and enjoy the show.
        </p>
      </div>

      <div className="booking-layout">

        {/* LEFT SIDE */}

        <section className="booking-main">

          {/* MOVIE DETAILS */}

          <div className="booking-movie">

            <img
              src={movie.poster}
              alt={movie.title}
            />

            <div>
              <span className="booking-tag">
                NOW SHOWING
              </span>

              <h2>{movie.title}</h2>

              <p>{movie.genre}</p>

              <p>
                {movie.language} · {movie.duration}
              </p>

              <p className="booking-user">
                Booking for: {currentUser.name}
              </p>
            </div>

          </div>

          {/* DATE SELECTION */}

          <div className="booking-panel">

            <h2>01. Select Date</h2>

            <input
              type="date"
              min={getDateString(new Date())}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setSelectedSeats([]);
              }}
              className="booking-date"
            />

          </div>

          {/* SHOWTIME SELECTION */}

          <div className="booking-panel">

            <h2>02. Select Showtime</h2>

            <div className="showtime-list">

              {showtimes.map((time) => (

                <button
                  key={time}
                  className={
                    showtime === time
                      ? "showtime-active"
                      : ""
                  }
                  onClick={() => {
                    setShowtime(time);
                    setSelectedSeats([]);
                  }}
                >
                  {time}
                </button>

              ))}

            </div>

          </div>

          {/* SEAT SELECTION */}

          <div className="booking-panel">

            <h2>03. Select Your Seats</h2>

            {/* SEAT LEGEND */}

            <div className="seat-legend">

              <span>
                <i className="seat available"></i>
                Available
              </span>

              <span>
                <i className="seat selected"></i>
                Selected
              </span>

              <span>
                <i className="seat occupied"></i>
                Booked
              </span>

            </div>

            {/* CINEMA SCREEN */}

            <div className="cinema-screen">

              <div className="screen-light"></div>

              <span>SCREEN THIS WAY</span>

            </div>

            {/* SEAT GRID */}

            <div className="seat-grid">

              {rows.map((row) => (

                <div className="seat-row" key={row}>

                  <span className="row-label">
                    {row}
                  </span>

                  {Array.from(
                    { length: columns },
                    (_, index) => {

                      const seat = `${row}${index + 1}`;

                      const isOccupied =
                        occupiedSeats.includes(seat);

                      const isSelected =
                        selectedSeats.includes(seat);

                      return (

                        <button
                          key={seat}
                          disabled={isOccupied}
                          onClick={() => toggleSeat(seat)}
                          className={`seat-button ${
                            isOccupied
                              ? "seat-occupied"
                              : isSelected
                              ? "seat-selected"
                              : "seat-available"
                          }`}
                          title={
                            isOccupied
                              ? `${seat} - Already Booked`
                              : isSelected
                              ? `${seat} - Selected`
                              : `${seat} - Available`
                          }
                        >
                          {index + 1}
                        </button>

                      );
                    }
                  )}

                </div>

              ))}

            </div>

            <p className="seat-note">
              Select your preferred seats.
              Each ticket costs ₹{ticketPrice}.
            </p>

          </div>

        </section>

        {/* RIGHT SIDE BOOKING SUMMARY */}

        <aside className="booking-summary">

          <span className="booking-tag">
            BOOKING SUMMARY
          </span>

          <h2>Your Selection</h2>

          <div className="summary-item">
            <span>Customer</span>
            <strong>{currentUser.name}</strong>
          </div>

          <div className="summary-item">
            <span>Movie</span>
            <strong>{movie.title}</strong>
          </div>

          <div className="summary-item">
            <span>Theatre</span>
            <strong>CineBook Multiplex</strong>
          </div>

          <div className="summary-item">
            <span>Date</span>
            <strong>{date}</strong>
          </div>

          <div className="summary-item">
            <span>Showtime</span>
            <strong>{showtime}</strong>
          </div>

          <div className="summary-item">
            <span>Selected Seats</span>

            <strong>
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "Not selected"}
            </strong>
          </div>

          <div className="summary-item">
            <span>Number of Tickets</span>
            <strong>{selectedSeats.length}</strong>
          </div>

          <div className="summary-item">
            <span>Price Per Ticket</span>
            <strong>₹{ticketPrice}</strong>
          </div>

          <div className="summary-total">

            <span>Total Amount</span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>

          <button
            className="confirm-booking"
            onClick={confirmBooking}
            disabled={selectedSeats.length === 0}
          >
            Confirm Booking →
          </button>

          <p className="booking-disclaimer">
            Demo booking only. No real payment is collected.
          </p>

        </aside>

      </div>

    </main>
  );
}

export default Booking;
