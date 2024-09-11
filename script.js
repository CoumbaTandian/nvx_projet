/***************************Variables************************/

let divListePerso = document.getElementById("divListePerso");
let pageCourant = 1;
const nbPage = 42;
let tabIds = [];
let btnRecherche = document.getElementById("btnRecherche");
let textRecherche = document.getElementById("recherche");
let btnvivant = document.getElementById("vivant");
let btnmort = document.getElementById("mort");
let allCharacters = []; // Variable globale pour stocker tous les personnages

/***************************Fonctions************************/

async function recupererPersonnages(page) {
  try {
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error("La réponse n'est pas ok");
    }
    let donnees = await reponse.json();
    allCharacters = donnees.results; // Stocker les personnages récupérés
    afficherPersonnages(allCharacters);
  } catch (erreur) {
    console.error("Erreur : ", erreur);
  }
  return allCharacters;
}

function afficherPersonnages(personnagesPageI) {
  divListePerso.innerHTML = "";
  personnagesPageI.forEach((perso) => {
    let persoDiv = document.createElement("div");
    persoDiv.id = perso.id;

    let img = document.createElement("img");
    img.src = perso.image;
    img.alt = perso.name;
    persoDiv.appendChild(img);

    let nom = document.createElement("p");
    nom.textContent = perso.name;
    persoDiv.appendChild(nom);

    let statut = document.createElement("p");
    statut.textContent =
      perso.status === "Alive"
        ? "Vivant"
        : perso.status === "Dead"
        ? "Mort"
        : "Inconnu";
    persoDiv.appendChild(statut);

    persoDiv.addEventListener("click", () => {
      afficherDetailsPersonnage(perso.id);
    });

    divListePerso.appendChild(persoDiv);
  });
}

// async function afficherDetailsPersonnage(id) {
//   divListePerso.innerHTML = "";

//   try {
//     let url = `https://rickandmortyapi.com/api/character/${id}`;
//     const reponse = await fetch(url);
//     if (!reponse.ok) {
//       throw new Error("La réponse n'est pas OK");
//     }
//     const donnees = await reponse.json();

//     let persoDiv = document.createElement("div");
//     persoDiv.className = "conteneurDivPerso";

//     let img = document.createElement("img");
//     img.src = donnees.image;
//     img.alt = donnees.name;
//     persoDiv.appendChild(img);

//     let nom = document.createElement("p");
//     nom.textContent = donnees.name;
//     persoDiv.appendChild(nom);

//     let statut = document.createElement("p");
//     statut.textContent =
//       donnees.status === "Alive"
//         ? "Vivant"
//         : donnees.status === "Dead"
//         ? "Mort"
//         : "Inconnu";
//     persoDiv.appendChild(statut);

//     let espece = document.createElement("p");
//     espece.textContent =
//       donnees.species === "Human"
//         ? "Humain"
//         : donnees.species === "Alien"
//         ? "Alien"
//         : "Inconnu";
//     persoDiv.appendChild(espece);

//     let genre = document.createElement("p");
//     genre.textContent =
//       donnees.gender === "Male"
//         ? "Mâle"
//         : donnees.gender === "Female"
//         ? "Femelle"
//         : "Inconnu";
//     persoDiv.appendChild(genre);

//     divListePerso.appendChild(persoDiv);

//     let episodesDiv = document.createElement("div");
//     episodesDiv.id = "episodes";

//     let episodesTitle = document.createElement("h3");
//     episodesTitle.textContent = "Épisodes :";
//     episodesDiv.appendChild(episodesTitle);

//     for (let urlEpisode of donnees.episode) {
//       let response = await fetch(urlEpisode);
//       if (!response.ok) {
//         throw new Error("La réponse n'est pas OK");
//       }
//       let episodeData = await response.json();
//       let episodeElement = document.createElement("p");
//       episodeElement.textContent = `Épisode ${episodeData.id}: ${episodeData.name}`;
//       episodesDiv.appendChild(episodeElement);
//     }

//     divListePerso.appendChild(episodesDiv);

//     let retour = document.getElementById("retour");
//     let lien = document.createElement("a");
//     lien.href = "index.html";
//     let bouton = document.createElement("button");
//     bouton.textContent = "Retour";
//     lien.appendChild(bouton);
//     retour.appendChild(lien);

//     document.getElementById("btnPrecedent").style.display = "none";
//     document.getElementById("btnSuivant").style.display = "none";
//     document.getElementById("vivant").style.display = "none";
//     document.getElementById("mort").style.display = "none";
//     document.querySelector(".search-bar").style.display = "none";
//   } catch (erreur) {
//     console.error("Erreur :", erreur);
//   }
// }

async function afficherDetailsPersonnage(id) {
  divListePerso.innerHTML = "";

  try {
    let url = `https://rickandmortyapi.com/api/character/${id}`;
    const reponse = await fetch(url);
    if (!reponse.ok) {
      throw new Error("La réponse n'est pas OK");
    }
    const donnees = await reponse.json();

    let persoDiv = document.createElement("div");
    persoDiv.className = "conteneurDivPerso";

    let img = document.createElement("img");
    img.src = donnees.image;
    img.alt = donnees.name;
    persoDiv.appendChild(img);

    let nom = document.createElement("p");
    nom.textContent = donnees.name;
    persoDiv.appendChild(nom);

    let statut = document.createElement("p");
    statut.textContent =
      donnees.status === "Alive"
        ? "Vivant"
        : donnees.status === "Dead"
        ? "Mort"
        : "Inconnu";
    persoDiv.appendChild(statut);

    let espece = document.createElement("p");
    espece.textContent =
      donnees.species === "Human"
        ? "Humain"
        : donnees.species === "Alien"
        ? "Alien"
        : "Inconnu";
    persoDiv.appendChild(espece);

    let genre = document.createElement("p");
    genre.textContent =
      donnees.gender === "Male"
        ? "Mâle"
        : donnees.gender === "Female"
        ? "Femelle"
        : "Inconnu";
    persoDiv.appendChild(genre);

    divListePerso.appendChild(persoDiv);

    let episodesDiv = document.createElement("div");
    episodesDiv.id = "episodes";

    let episodesTitle = document.createElement("h3");
    episodesTitle.textContent = "Épisodes :";
    episodesDiv.appendChild(episodesTitle);

    for (let urlEpisode of donnees.episode) {
      let response = await fetch(urlEpisode);
      if (!response.ok) {
        throw new Error("La réponse n'est pas OK");
      }
      let episodeData = await response.json();
      let episodeElement = document.createElement("p");
      episodeElement.textContent = `Épisode ${episodeData.id}: ${episodeData.name}`;
      episodesDiv.appendChild(episodeElement);
    }

    divListePerso.appendChild(episodesDiv);

    let retour = document.getElementById("retour");
    let lien = document.createElement("a");
    lien.href = "index.html";
    let bouton = document.createElement("button");
    bouton.textContent = "Retour";
    lien.appendChild(bouton);
    retour.appendChild(lien);

    document.getElementById("btnPrecedent").style.display = "none";
    document.getElementById("btnSuivant").style.display = "none";
    document.getElementById("vivant").style.display = "none";
    document.getElementById("mort").style.display = "none";
    document.querySelector(".search-bar").style.display = "none";

    // Met à jour l'URL avec le hash
    window.location.hash = `#character/${id}`;
  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
}

function pageSuivante() {
  if (pageCourant < nbPage) {
    pageCourant++;
    recupererPersonnages(pageCourant);
  }
}

function pagePrecedente() {
  if (pageCourant > 1) {
    pageCourant--;
    recupererPersonnages(pageCourant);
  }
}

function filtrageMort(d) {
  let tabPerso = d.filter((perso) => perso.status === "Dead");
  afficherPersonnages(tabPerso);
}

function filtrageVivant(d) {
  let tabPerso = d.filter((perso) => perso.status === "Alive");
  afficherPersonnages(tabPerso);
}

// Ajouter un écouteur d'événement pour la barre de recherche
textRecherche.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filteredCharacters = allCharacters.filter((character) =>
    character.name.toLowerCase().includes(query)
  );
  afficherPersonnages(filteredCharacters);
});

/***************************** Initialiser la Page *************************/

document.addEventListener("DOMContentLoaded", () => {
  recupererPersonnages(pageCourant);
});

btnRecherche.addEventListener("click", async () => {
  let donnees = await recupererPersonnages(pageCourant);
  rechercheTextuelle(donnees);
});

btnmort.addEventListener("click", async () => {
  let donnees = await recupererPersonnages(pageCourant);
  filtrageMort(donnees);
});

btnvivant.addEventListener("click", async () => {
  let donnees = await recupererPersonnages(pageCourant);
  filtrageVivant(donnees);
});

document.getElementById("btnSuivant").addEventListener("click", pageSuivante);
document
  .getElementById("btnPrecedent")
  .addEventListener("click", pagePrecedente);