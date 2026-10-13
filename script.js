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
    shows.forEach(show => {
        let li = document.createElement("li");
        li.textContent = show.show.name;
        ul.appendChild(li);
    });
    showForm.reset();
}