
const imageFiles = import.meta.glob(
  "../assets/images/*.{jpg,jpeg,png}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function findPoster(keyword) {
  const match = Object.entries(imageFiles).find(([path]) =>
    path.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!match) {
    console.error(`Poster not found: ${keyword}`);
    return "";
  }

  return match[1];
}

const movies = [
  {
    id: 1,
    title: "Interstellar",
    rating: 8.7,
    genre: "Sci-Fi · Adventure",
    language: "English",
    duration: "2h 49m",
    certificate: "UA",
    poster: findPoster("interstellar"),
    description:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    status: "Now Showing",
  },
  {
    id: 2,
    title: "The Batman",
    rating: 7.8,
    genre: "Action · Crime",
    language: "English",
    duration: "2h 56m",
    certificate: "UA",
    poster: findPoster("the batman"),
    description:
      "Batman investigates a series of mysterious crimes threatening Gotham City.",
    status: "Now Showing",
  },
  {
    id: 3,
    title: "Dune",
    rating: 8.0,
    genre: "Sci-Fi · Drama",
    language: "English",
    duration: "2h 35m",
    certificate: "UA",
    poster: findPoster("dune"),
    description:
      "A young heir travels to a dangerous desert planet where the fate of an empire unfolds.",
    status: "Now Showing",
  },
  {
    id: 4,
    title: "Avatar",
    rating: 7.9,
    genre: "Sci-Fi · Fantasy",
    language: "English",
    duration: "2h 42m",
    certificate: "UA",
    poster: findPoster("avatar1"),
    description:
      "Explore an extraordinary world filled with breathtaking landscapes and adventure.",
    status: "Now Showing",
  },
  {
    id: 5,
    title: "The Dark Knight",
    rating: 9.0,
    genre: "Action · Thriller",
    language: "English",
    duration: "2h 32m",
    certificate: "UA",
    poster: findPoster("dark knight"),
    description:
      "Gotham faces a dangerous new threat that challenges its protector.",
    status: "Now Showing",
  },
  {
    id: 6,
    title: "The Lost World",
    rating: 8.1,
    genre: "Fantasy · Adventure",
    language: "English",
    duration: "2h 10m",
    certificate: "UA",
    poster: findPoster("lost world"),
    description:
      "An expedition enters a mysterious world filled with unexpected discoveries.",
    status: "Now Showing",
  },
  {
    id: 7,
    title: "Space Journey",
    rating: 8.3,
    genre: "Sci-Fi · Adventure",
    language: "English",
    duration: "2h 15m",
    certificate: "UA",
    poster: findPoster("space journey"),
    description:
      "An adventurous journey through the mysteries of outer space.",
    status: "Now Showing",
  },
];

export default movies;
