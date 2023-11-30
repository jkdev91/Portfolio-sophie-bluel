
// variable globale
const gallery = document.querySelector('.gallery')
console.log(gallery)
const filter = document.querySelector('.filtre')



// Récupérer les travaux de sophie dans le back-end
async function getWork () {
    try {
        const request = await fetch('http://localhost:5678/api/works');
        return await request.json();
    } catch (erreur) {
        console.log('il y a eu une erreur')
    }
}

async function getcat() {
    try {
        const request2 = await fetch('http://localhost:5678/api/categories');
         return await request2.json();
    } catch (erreur) {
        console.log('il y a eu une erreur')
    }
}





// Afficher les travaux sur le front-end
async function displayWork() {
    const arrayWork = await getWork()

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
displayWork()


// filtrer travaux par catégorie

// creer les btn de filtre dans le DOM
async function displayFiltreBtn() {
    // creer le boutton 'Tous' 
    const allBtn = document.createElement('button');
    allBtn.classList.add("btn")
    allBtn.setAttribute("type", 'button')
    allBtn.innerText = "Tous"

    filter.appendChild(allBtn);
    
    // recuperer les categories
    const arrayWork =  await getWork();
    console.log(arrayWork)
    const setCategorie = new Set(arrayWork.map(object => object.category.name));
    console.log(setCategorie);


    /*
    for (let category of setCategorie) {
        const catBtn = document.createElement('button');
        catBtn.classList.add("btn")
        catBtn.innerText = "test"
        filter.appendChild(catBtn);
    }*/

// creer les éléments DOM pour les buttons en passant par fetch 
    const arrayCat = await getcat();
    console.log(arrayCat)

    for (let i = 0; i < arrayCat.length; i++) {
        const catBtn = document.createElement('button');
        catBtn.classList.add("btn")
        catBtn.setAttribute("type", 'button')
        catBtn.innerText = arrayCat[i].name;
        filter.appendChild(catBtn);
    }
}
displayFiltreBtn()



// creer event listner sur les boutons pour faire le filtre 

const buttonFilter = document.querySelectorAll("button");
console.log(buttonFilter.length)



// function filter() {

//     buttonFilter.addEventListener('click', function() {



//     }) 


// }
// filter()