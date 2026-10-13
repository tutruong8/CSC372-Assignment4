// const showUrl = "https://api.tvmaze.com/search/shows?q=QUERY";
// const castUrl = "https://api.tvmaze.com/shows/SHOW_ID/cast";

// async function getShowData(query) {
//     try {
//         let res = await fetch(showUrl.replace("QUERY", query));
//         if (!res.ok) {
//             throw new Error(await res.text())
//         }
//         res = await res.json();
//         console.log("Shows resolved: My Show Data:", res);
//     } catch (err) {
//         console.error("Error:", err);
//     }
// }

// async function getCastData(showId) {
//     try {
//         let res = await fetch(castUrl.replace("SHOW_ID", showId));
//         if (!res.ok) {
//             throw new Error(await res.text())
//         }
//         res = await res.json();
//         console.log("Cast resolved: My Cast Data:", res);
//     } catch (err) {
//         console.error("Error:", err);
//     }
// }

// let showResult = getShowData("Pokémon");
// console.log("Shows we just fetched (this is async!): ", showResult);

// let castResult = getCastData(1);
// console.log("Cast we just fetched (this is async!): ", castResult);

let showForm = document.getElementById("showKeyword");
showForm.addEventListener("submit", handleShowFormSubmit);

async function handleShowFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const keyword = formData.get("keyword");

    const showUrl = "https://api.tvmaze.com/search/shows?q=QUERY";
    try {
        let res = await fetch(showUrl.replace("QUERY", keyword));
        if (!res.ok) {
            throw new Error(await res.text())
        }
        res = await res.json();
        console.log("Shows resolved: My Show Data:", res);
        displayShows(res);
    } catch (err) {
        console.error("Error:", err);
    }
}

async function displayShows(shows) {
    const showList = document.getElementById("show-results");
    showList.innerHTML = "";
    let ul = document.createElement("ul");
    showList.appendChild(ul);
    await shows.forEach(async show => {
        const card = document.createElement("article");
        card.classList.add("show-card");

        const name = document.createElement("h2");
        name.textContent = show.show.name;
        card.appendChild(name);

        const summary = document.createElement("p");
        const summaryText = show.show.summary || "No summary available.";
        summary.innerHTML = summaryText;
        card.appendChild(summary);

        const premireDate = document.createElement("p");
        const premiereText = show.show.premiered || "No premiere date available.";
        premireDate.textContent = `Premiere Date: ${premiereText}`;
        card.appendChild(premireDate);

        const updatedDate = document.createElement("p");
        const updatedText = show.show.updated ? new Date(show.show.updated * 1000).toLocaleDateString() : "No updated date available.";
        updatedDate.textContent = `Updated Date: ${updatedText}`;
        card.appendChild(updatedDate);

        const genre = document.createElement("p");
        const genreText = show.show.genres.length > 0 ? show.show.genres.join(", ") : "No genres available.";
        genre.textContent = `Genres: ${genreText}`;
        card.appendChild(genre);

        const rating = document.createElement("p");
        const ratingText = show.show.rating.average !== null ? show.show.rating.average : "No rating available.";
        rating.textContent = `Rating: ${ratingText}`;
        card.appendChild(rating);

        const castUrl = "https://api.tvmaze.com/shows/SHOW_ID/cast";
        const castList = document.createElement("ul");
        castList.classList.add("cast-list");
        card.appendChild(castList);

        try {
            let castRes = await fetch(castUrl.replace("SHOW_ID", show.show.id));
            if (!castRes.ok) {
                throw new Error(await castRes.text())
            }
            let castData = await castRes.json();
            console.log("Cast resolved: My Cast Data:", castData);

            castData.forEach(castMember => {
                const castItem = document.createElement("li");
                castItem.textContent =
                    `${castMember.person.name} as ${castMember.character.name}`;
                castList.appendChild(castItem);
            });
        } catch (err) {
            console.error("Error:", err);
            const castItem = document.createElement("li");
            castItem.textContent = "Cast information unavailable.";
            castList.appendChild(castItem);
        }

        const link = document.createElement("a");
        link.textContent = "View on TVMaze";
        link.href = show.show.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.appendChild(link);

        ul.appendChild(card);
    });
    showForm.reset();
}