
// variable globale
const gallery = document.querySelector('.gallery')

const filter = document.querySelector('.filtre')



/****Récupérer les travaux de sophie dans le back-end****/
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



/****Afficher les travaux sur le front-end****/
async function displayWork() {
    const arrayWork = await getWork()
    createWork(arrayWork)
    
}
displayWork()

function createWork(work) {
    for (let i = 0; i < work.length; i++) {
        // creer element DOM
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work[i].imageUrl;
        img.alt = work[i].title;
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = work[i].title;

        // rattacher element au DOM
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    }
}


/****filtrer travaux par catégorie****/

// creer le boutton 'Tous' 
const allBtn = document.createElement('button');
allBtn.classList.add("btn")
allBtn.id = 0;
allBtn.setAttribute("type", 'button')
allBtn.innerText = "Tous"
filter.appendChild(allBtn);


// creer les boutons de catégorie 
async function displayFiltreBtn() {
    const arrayCat = await getcat();

    for (let i = 0; i < arrayCat.length; i++) {
        const catBtn = document.createElement('button');
        catBtn.classList.add('btn');
        catBtn.id = arrayCat[i].id
        catBtn.setAttribute("type", 'button');
        catBtn.innerText = arrayCat[i].name;
        filter.appendChild(catBtn);
    }
}
displayFiltreBtn()



// Filtrer et Afficher les travaux par catégories
async function filterCategory() {
    const arrayWork = await getWork()
    const buttons = document.querySelectorAll(".filtre button")

    for (let i = 0; i < buttons.length; i++) {
        
        buttons[i].addEventListener("click", async function (ev) {
            btnId = ev.target.id;
            gallery.innerHTML = "";

            if (btnId !== "0") { 
                const unit = arrayWork.filter( function (obj) {
                    return obj.categoryId == btnId;  
                });
                unit.forEach((obj) => {
                    createWork([obj]);                
                });
            } else {
                displayWork()
            }
        })   
    }      
}   
filterCategory()




