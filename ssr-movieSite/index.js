import express from "express"
import {engine} from "express-handlebars"
import {marked} from "marked"
import { getMovies, getMovie } from "./src/movies.js"



const app = express()

/* app.engine("handlebars", engine({
    helpers: {
      markdown: md => marked(md),
    },
  })); */

  app.engine('handlebars', engine())
// set our app to use the handlebars engine
app.set("view engine", "handlebars")
app.set("views", "./templates")

app.get("/", async(req,res)=>{
  const moviesFromApi = await getMovies()
res.render("home", {moviesFromApi})
 
})

app.get("/movies/:movieId", async(req,res)=>{

  const singleMovie = await getMovie(req.params.movieId)
  console.log('singleMovie', singleMovie)
  if(singleMovie){
    res.render("movie",{singleMovie})
  }else{
    res.status(404).render("404")
  }
 

})

app.use("/static", express.static("./static"))

const port = 5080
app.listen(port, ()=>{
  console.log(`server is running on port ${port}`)
})