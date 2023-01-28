import app from "../src/app.js";
import request from "supertest";
import { getMovie, getMovies } from "../src/movies.js";

test("Isles of Dog page containins dog info", async () => {
  const response = await request(app)
    .get("/movies/1")
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(200);

  expect(response.text.includes("Isle of dogs")).toBeTruthy();
});

test("movie page contains title", async () => {
  const id = 2;
  const response = await request(app)
    .get("/movies/" + id)
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(200);

  const apiResponse = await getMovie(id);

  //expect(response.text).toMatch(apiResponse.attributes.title);

  expect(response.text.includes(apiResponse.attributes.title)).toBeTruthy();
});

test("hompage shows list of movies", async () => {
  const response = await request(app)
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=utf-8");


  expect(response.text.includes('Shawshank')).toBeTruthy();
});
