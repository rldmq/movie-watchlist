// https://www.omdbapi.com/
// https://www.figma.com/file/UMsEnKVZ7XdvEhngSkCxnE/Mkovie-Watchlist?type=design&node-id=0-1&mode=design&t=glNH4WF1RptjN3Po-0
import { renderData } from "./scripts.js"

// VARIABLES
const apiKey = "89476e35"
const movieSearchEl = document.getElementById("movie-search")
const moviesContainer = document.getElementById("movies-container")
let imdbIds = []
let currentMovieList = []
let watchList = []

// EVENT LISTENERS
document.querySelector("form").addEventListener("submit", async function(e){
    e.preventDefault()

    // reset movie data
    imdbIds = []
    currentMovieList = []

    await getMovieIds(movieSearchEl.value)
    
    for(let id of imdbIds){
        await getMovieDetails(id)
    }

    renderData(currentMovieList, moviesContainer)

    movieSearchEl.value = ""
})

document.addEventListener("click", function(e){
    if(e.target.dataset.id){
        saveToLocalStorage(e.target.dataset.id)
    }
})

// FUNCTIONS
async function getMovieIds(searchTerm){
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie`)
    const movies = await response.json()

    imdbIds = movies.Search.map(e => e.imdbID)
}

async function getMovieDetails(id){
    const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}&type=movie&plot=short`)
    const movieData = await res.json()

    currentMovieList.push(movieData)
}

function saveToLocalStorage(id){
    const myCurrentWatchlist = JSON.parse(localStorage.getItem("myWatchlist")) || []

    // check if already stored, plus add a modal

    const newItem = currentMovieList.filter(e => e.imdbID === id)[0]

    myCurrentWatchlist.push(newItem)

    localStorage.setItem("myWatchlist",JSON.stringify(myCurrentWatchlist))

    // modal
}

// ISSUES:
// search bar doesn't resize smaller
// event listener for resize for media query 'hidden' toggle
