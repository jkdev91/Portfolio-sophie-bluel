
// variable globale DOM
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
    createModalWork(arrayWork)

    
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



//------------------------------------------------//
// gestion de la page lorsque le login est activé
//-----------------------------------------------//

// si token est stocke (verification) alors
const checkToken = localStorage.getItem("token")
if (checkToken) {
    // modifier le login en logout 
    const navLog = document.querySelector('#js-log')
    navLog.innerText ="logout"
    navLog.setAttribute("href", "index.html")
    // ajouter une entete mode edition en haut de page
    const body = document.querySelector('body')
    const div = document.createElement('div')
    body.insertBefore(div, body.firstChild)
    div.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>Mode Edition<p>';
    div.classList.add('header-edit')

    // ajouter un lien "modifier" a droite du titre projet
    const porfolio = document.querySelector('#portfolio div')
    porfolio.classList.add('edit')
    const porfolioH2 = document.querySelector('#portfolio h2')
    const divBis = document.createElement('button')
    porfolioH2.insertAdjacentElement("afterend", divBis)
    divBis.classList.add('btn-edit')
    divBis.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><p>Modifier<p> ';

    // cacher les boutons de filtre
    filter.classList.add("hide")

}


    

//-----------------------------------//
// gestion de la page lors du logout
//-----------------------------------//

const navLog = document.querySelector('#js-log')
console.log(navLog)
navLog.addEventListener('click', function() {
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("token");
    
    
})


//-----------------------------------//
// gestion de la boite modal
//-----------------------------------//

const modalGallery = document.querySelector('.modal-gallery');
// console.log(modalGallery);
const btnEdit = document.querySelector('.btn-edit');
const overlay = document.querySelector('.modal-overlay')
const modal1 = document.getElementById('modal1')
const modal2 = document.getElementById('modal2')
const close = document.querySelector('.close')



function createModalWork(work) {
    for (let i = 0; i < work.length; i++) {
        // creer element DOM
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = work[i].imageUrl;

        // rattacher element au DOM
        modalGallery.appendChild(figure);
        figure.appendChild(img);
    }
}



// gerer l'ouverture du modal
function openModal() {
    btnEdit.addEventListener('click', function() {
        overlay.classList.remove('hide')
        modal1.classList.remove('hide')
    })
}
openModal()



// gerer la fermeture du modal
function closeModal() {
    close.addEventListener('click', function(){
        overlay.classList.add('hide')
        modal1.classList.add('hide')
    
    }) 

}
closeModal()


// gerer icone de suppression
const modalFigure = modalGallery.children
console.log(modalFigure)
const it = document.querySelectorAll('.modal-gallery figure')
console.log(it)



// modale ajouter
// aller vers la modale ajouter
const modaleBtnAdd = document.querySelector('.modal-btn');
console.log(modaleBtnAdd)
modaleBtnAdd.addEventListener('click', function(){
    modal1.classList.add('hide')
    modal2.classList.remove('hide')
}) 