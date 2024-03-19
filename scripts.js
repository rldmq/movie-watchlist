function renderData(movies, element, addRemove = "add"){
    let moviesListHtml = ""

    const addRemoveBtnClass = addRemove === "add" ? "fa-solid fa-circle-plus" : "fa-solid fa-circle-minus"
    const addRemoveBtnText = addRemove === "add" ? "Watchlist" : "Remove"

    for(let movieData of movies){
        moviesListHtml += `
        <div class="movie-container">
            <img src="${movieData.Poster}" alt="${movieData.Title} Poster" class="movie-poster"/>
            <div class="details-grid">
                <p class="movie-title">${movieData.Title} <span class="movie-year">(${movieData.Year})</span></p>
                <p class="movie-rating"><i class="fa-solid fa-star"></i> ${movieData.imdbRating}</p>
                <p class="movie-runtime">${movieData.Runtime}</p>
                <p class="movie-genre">${movieData.Genre}</p>
                <button class="movie-${addRemove}-btn" data-id="${movieData.imdbID}"><i class="${addRemoveBtnClass}" data-id="${movieData.imdbID}"></i> ${addRemoveBtnText}</button>
                <p class="movie-plot hidden">${movieData.Plot}</p>
            </div>
        </div>
        `
    }

    element.innerHTML = moviesListHtml
}

export { renderData }