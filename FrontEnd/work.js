// variable globale
const gallery = document.querySelector('.gallery')


// Récupérer les travaux de sophie dans le back-end
async function getWork () {
    try {
        const request = await fetch('http://localhost:5678/api/works');
        return await request.json();
    } catch (erreur) {
        console.log('il y a eu une erreur')
    }
}

// Afficher les travaux sur le front-end
async function afficherWork() {
    arrayWork = await getWork()

    for (let i = 0; i < arrayWork.length; i++) {
        // creer element DOM
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = arrayWork[i].imageUrl;
        img.alt = arrayWork[i].title;
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = arrayWork[i].title;

        // rattacher element au DOM
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);

    }
}
afficherWork()