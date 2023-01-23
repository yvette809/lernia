import express from "express"
import {engine} from "express-handlebars"
import {marked} from "marked"



const app = express()

app.engine("handlebars", engine({
    helpers: {
      markdown: md => marked(md),
    },
  }));

app.set("view engine", "handlebars")
app.set("views", "./templates")

app.get("/", (req,res)=>{
res.render("home")
    console.log('hello world')
})

app.listen(5080)