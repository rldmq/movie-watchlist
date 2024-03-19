import { renderData } from "./scripts.js"

// VARIABLES
let myWatchlist = JSON.parse(localStorage.getItem("myWatchlist"))

const moviesContainer = document.getElementById("movies-container")

// Render watchlist on load
renderOption()

// EVENT LISTENERS
document.addEventListener("click",function(e){
    if(e.target.dataset.id){
        removeItem(e.target.dataset.id)
        renderOption()
    }
})

// FUNCTIONS
function renderOption(){
    if(myWatchlist.length === 0){
        moviesContainer.classList.add("empty")
        moviesContainer.innerHTML = `
            <h2 class="no-movies-msg">Your watchlist is looking a little empty...<h2>
            <a href="./index.html" class="no-movies-btn"><i class="fa-solid fa-circle-plus""></i> Let's add some movies!</a>
        `
    }else{
        moviesContainer.classList.remove("empty")
        renderData(myWatchlist, moviesContainer, "remove")
    }
}

function removeItem(id){
    const updatedList = []

    for(let movie of myWatchlist){
        if(movie.imdbID !== id){
            updatedList.push(movie)
        }
    }

    localStorage.setItem("myWatchlist", JSON.stringify(updatedList))

    myWatchlist = updatedList
}