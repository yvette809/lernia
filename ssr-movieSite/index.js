import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { getMovies, getMovie } from "./src/movies.js";

const app = express();

/* app.engine("handlebars", engine({
    helpers: {
      markdown: md => marked(md),
    },
  })); */

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

const port = 5080;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
