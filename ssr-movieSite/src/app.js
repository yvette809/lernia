import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { getMovies, getMovie, getScreenings } from "../src/movies.js";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./templates");

const MENU = [
  {
    label: "Öppetider & Kontakt",
    link: "/openinghours",
  },
  {
    label: "Om Spegeln",
    link: "/about",
  },
  {
    label: "Biljettinfo",
    link: "/ticket-info",
  },
  {
    label: "Vill du har vårt nyhetsbrev?",
    link: "/newsletter",
  },
  {
    label: "Köp Presentkort",
    link: "/giftcard",
  },

  {
    label: "screens",
    link: "/screen",
  },
];

app.get("/", async (req, res) => {
  const moviesFromApi = await getMovies();
  res.render("home", { moviesFromApi });
});

app.get("/movies/:movieId", async (req, res) => {
  const singleMovie = await getMovie(req.params.movieId);
  if (singleMovie) {
    res.render("movie", { singleMovie });
  } else {
    res.status(404).render("404");
  }
});

app.get("/screenings", async (req, res) => {
  const movieScreenings = await getScreenings();
  const finalScreens = movieScreenings.map((screen) => {
    return {
      id: screen.id,
      title: screen.title,
      startTime: screen.startTime.toString().split("T")[0],
      time: screen.startTime.toString().split("T")[1].slice(0, 5),
    };
  });
  // const { id, title, startTime } = movieScreenings;
  res.render("screens", { finalScreens });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/ticket-info", (req, res) => {
  res.render("ticket");
});

app.get("/newsletter", (req, res) => {
  res.render("news");
});

app.get("/giftcard", (req, res) => {
  res.render("giftcard");
});

app.get("/openinghours", (req, res) => {
  res.render("contact");
});

app.use("/static", express.static("./static"));

app.get("*", (req, res) => {
  res.render("404", { message: "Page not found" });
});

export default app;
