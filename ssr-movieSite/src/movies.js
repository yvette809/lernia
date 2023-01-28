import fetch from "node-fetch"

const BASE_API = ' https://plankton-app-xhkom.ondigitalocean.app/api'


export async function getMovies (){
    try {
    const res = await fetch(BASE_API + '/movies')
    if(res.ok){
        const movies = await res.json()
        return movies.data
    }
       
    } catch (error) {
        console.log(error)
    }
    
}


export async function getMovie (id){
    const res = await fetch(BASE_API + "/movies/" + id)
    const movie = await res.json()
    return movie.data
}