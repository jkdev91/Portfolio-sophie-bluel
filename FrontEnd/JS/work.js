"use strict" 
// `use strict` allows to avoid bugs with non declared variables

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
// window.getWork = getWork

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
    gallery.innerHTML = ""
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
    const arrayWork = await getWork();
    const buttons = document.querySelectorAll(".filtre button")
    // console.log(buttons)

    for (let i = 0; i < buttons.length; i++) {
        
        buttons[i].addEventListener("click", async function (ev) {
            let btnId = ev.target.id;
            console.log(btnId)
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
        });  
    }      
}   
filterCategory()



//------------------------------------------------//
// gestion de la page lorsque le login est activé
//-----------------------------------------------//

// si token est stocke (verification) alors
const Token = localStorage.getItem("token")
// console.log(Token)
// const ido = localStorage.getItem("id")
// console.log(ido)

if (Token) {
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

navLog.addEventListener('click', function() {
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("token");
    
    
})


//-----------------------------------//
// gestion de la boite modal
//-----------------------------------//


const btnEdit = document.querySelector('.btn-edit');
const overlay = document.querySelector('.modal-overlay')
const modal = document.getElementById('modal')
const close1 = document.getElementById('')


// fermeture du modal en cliquant sur l'overlay
overlay.addEventListener('click', function() {
    console.log('je clique bien sur overlay')
    overlay.classList.add('hide');
    modal.classList.add('hide');
})



// gerer l'ouverture du modal
function openModal() {
    btnEdit.addEventListener('click', function() {
        overlay.classList.remove('hide')
        modal.classList.remove('hide')      
        createModal ()
    })
}
openModal()



// gerer la fermeture du modal
function closeModal(closeIcone) {
    closeIcone.addEventListener('click', function(){
        overlay.classList.add('hide');
        modal.classList.add('hide');
    }) 
}

//retourner vers la modale gallerie de photo

function modalReturn (returnbtn) {
    returnbtn.addEventListener('click',function(){
        createModal()
    }) 
} 


function createModal () {
    modal.innerHTML = ""
    // modal-header
    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')
    modal.appendChild(modalHeader)
    const closebtn1 = document.createElement('i')
    closebtn1.classList.add("fa-solid", "fa-xmark")
    modalHeader.appendChild(closebtn1)

    closeModal(closebtn1)

    //modal-body
    const modalBody1 = document.createElement('div')
    modalBody1.classList.add('modal-body')
    modal.appendChild(modalBody1)

    //modal-body titre
    const modalTitle1 = document.createElement('h3')
    modalTitle1.classList.add('modal-title')
    modalTitle1.innerText = "Galerie Photo"
    modalBody1.appendChild(modalTitle1)


    //modal-body gallery
    const modalGallery1 = document.createElement('div')
    modalGallery1.classList.add('modal-gallery')
    modalBody1.appendChild(modalGallery1)
    
    afficherModalGallery(modalGallery1)
    
    // modal footer 
    const modalFooter1 = document.createElement('div')
    modalFooter1.classList.add('modal-footer')
    modal.appendChild(modalFooter1)
    const btnAjoutPhoto = document.createElement('button')
    btnAjoutPhoto.classList.add('modal-btn', 'green')
    btnAjoutPhoto.setAttribute("id", "btnAjoutPhoto")
    btnAjoutPhoto.innerText = "Ajouter photo"
    modalFooter1.appendChild(btnAjoutPhoto)

    // evenement ecoute sur boutton ajouter photo
    btnAjoutPhoto.addEventListener('click', createModal2)


}

async function afficherModalGallery(modalGallery1) {
    const arrayWork = await getWork();
    for (let i = 0; i < arrayWork.length; i++) {
        // creer element DOM des photos
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = arrayWork[i].imageUrl;
        img.id = arrayWork[i].id;

        // creer les bouttons de suppression
        const btnSuppresion = document.createElement('div');
        btnSuppresion.classList.add('btnSupression')
        const iconSuppression = document.createElement('i')
        iconSuppression.id = arrayWork[i].id;
        iconSuppression.classList.add("fa-solid", "fa-trash-can")
        

        // rattacher element au DOM
        modalGallery1.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(btnSuppresion);
        btnSuppresion.appendChild(iconSuppression);

    }
    deletePhoto()
}


// suppression des photo de la modal          
function deletePhoto() {
    const trashIcon = document.querySelectorAll('.fa-trash-can')
    trashIcon.forEach(iconSuppression => {
        iconSuppression.addEventListener("click", (e)=> {
            const id = iconSuppression.id
            const charge = {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer '+ Token,
                    'content-type': "application/json;charset=utf-8",}
            }
            fetch('http://localhost:5678/api/works/' +id, charge)
            .then((response)=>{
                if (!response.ok) {
                    console.log("le delete n'a pas marché !")
                }
                return response
            })
            .then((data)=>{
                console.log("le delete a reussi voici la data :", data)
                createModal()
                displayWork()
            })
        })
    });

}


function createModal2() {
    modal.innerHTML = ""

    // modal-header
    const modalHeader2 = document.createElement('div')
    modalHeader2.classList.add('modal-header', "flex")
    modal.appendChild(modalHeader2)
    const returnbtn = document.createElement('i')
    returnbtn.classList.add("fa-solid", "fa-arrow-left", )
    modalHeader2.appendChild(returnbtn)
    const closebtn2 = document.createElement('i')
    closebtn2.classList.add("fa-solid", "fa-xmark")
    modalHeader2.appendChild(closebtn2)

    closeModal(closebtn2)
    modalReturn (returnbtn)

    // creer modal body
    const modalBody2 = document.createElement('div')
    modalBody2.classList.add('modal-body')
    modal.appendChild(modalBody2)

    // creer modal title
    const modalTitle2 = document.createElement('h3')
    modalTitle2.classList.add('modal-title')
    modalTitle2.innerText = "Ajouter Photo"
    modalBody2.appendChild(modalTitle2)

    // Créer un élément form
    const modalForm = document.createElement('form');
    modalBody2.appendChild(modalForm)

    // Créer un élément div pour le champ image
    const imageDivBox = document.createElement('div');
    imageDivBox.classList.add('uploadBox')
    modalForm.appendChild(imageDivBox)
    
    // Créer un élément div pour l'icon du champ image
    const iconDivBox = document.createElement('div');
    iconDivBox.classList.add('uploadBox__icon')
    imageDivBox.appendChild(iconDivBox)


    // Créer un élément icon pour le champ image
    const imageIcon = document.createElement('i');
    imageIcon.classList.add('fa-solid', 'fa-mountain-sun', 'fa-flip-horizontal')
    iconDivBox.appendChild(imageIcon)

    // Créer un élément label pour le champ image
    const imageLabel = document.createElement('label');
    imageLabel.setAttribute('for', 'upload_file');
    imageLabel.textContent = 'ajouter une photo';
    imageDivBox.appendChild(imageLabel)
 
    // Créer un élément p pour le champ image
    const imageP = document.createElement('p');
    imageP.textContent = 'jpg, png : 4mo max';
    imageDivBox.appendChild(imageP)
    
    // Créer un élément input pour le champ image
    const imageInput = document.createElement('input');
    imageInput.setAttribute('type', 'file');
    imageInput.setAttribute('id', 'upload_file');
    imageInput.setAttribute('name','image')
    imageInput.setAttribute('accept', 'image/jpeg, image/png');
    imageInput.setAttribute('hidden', true);
    modalForm.appendChild(imageInput)


    
    // Créer un élément label pour le champ title
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Titre';
    modalForm.appendChild(titleLabel)

    // Créer un élément input pour le champ title
    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'title');
    titleInput.setAttribute('id', 'title');
    modalForm.appendChild(titleInput)

    // Créer un élément label pour le champ categorie
    const categoryLabel = document.createElement('label');
    categoryLabel.setAttribute('for', 'category');
    categoryLabel.textContent = 'Catégorie';
    modalForm.appendChild(categoryLabel)

    // Créer un élément input pour le champ categorie
    const categoryInput = document.createElement('select');
    // categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('name', 'category');
    categoryInput.setAttribute('id', 'category');
    modalForm.appendChild(categoryInput)

    const optionElement = document.createElement('option')
    categoryInput.appendChild(optionElement)
    optioncategory ()

    // creer footer modal2
    const modalFooter2 = document.createElement("div")
    modalFooter2.classList.add('modal-footer')
    modal.appendChild(modalFooter2)
    //creer element bouton valider 
    const btnSubmit = document.createElement('button')
    btnSubmit.classList.add('modal-btn', 'grey')
    btnSubmit.setAttribute('id', 'btnsubmit')
    btnSubmit.innerText = "Valider"
    modalFooter2.appendChild(btnSubmit)

    previewImg(imageInput, imageDivBox, iconDivBox, imageLabel, imageP)
    submitPhoto(btnSubmit, imageInput, titleInput, categoryInput)
}

// creer la liste deroulante des catégories
async function optioncategory () {
    const arrayCat = await getcat();
    // console.log(arrayCat)
    const categoryInput = document.querySelector('#category')
    // console.log(categoryInput)

    for (let i = 0; i < arrayCat.length; i++) {
        const optionCat = document.createElement('option');
        // catBtn.classList.add('btn');
        optionCat.id = arrayCat[i].id
        // catBtn.setAttribute("type", 'button');
        optionCat.innerText = arrayCat[i].name;
        categoryInput.appendChild(optionCat);
    }
}

// recuperer et affiche le chemin de la source d'image uploader methode createObjetUrl 
function previewImg(imageInput, imageDivBox, iconDivBox, imageLabel, imageP) {
    const img = document.createElement('img');
    img.classList.add('image_preview')
    imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    // console.log(file)
    const url = URL.createObjectURL(file);
    img.src = url;
    
    imageDivBox.appendChild(img);
    iconDivBox.remove();
    imageLabel.remove();
    imageP.remove()
});   
}




// function pour valider l'envoi des élément de la formdata
function submitPhoto(btnSubmit, imageInput, titleInput, categoryInput) {
    btnSubmit.addEventListener('click', (e) =>{
        e.preventDefault();
        const fileName = imageInput.files[0]
        console.log(fileName)

        const fileTitle = titleInput.value
        console.log(fileTitle)

        const selectoptionid = categoryInput.options[categoryInput.selectedIndex].id
        console.log(selectoptionid)

        const formData = new FormData();
        formData.append('image', fileName)
        formData.append('title', fileTitle)
        formData.append('category', selectoptionid)

        const charge = {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${Token}`
            
            },
            body: formData,
        };

        fetch('http://localhost:5678/api/works', charge)
        .then((response)=>{
            if (!response.ok) {
                throw new Error('Erreur de réseau : ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then((data)=>{
            if (data.error){
                console.error("Erreur :", data.error);
            } else {
                console.log("Photo ajoutée avec succès :", data);
                createModal2()
                displayWork()
            }
        })
        .catch((error)=> {
            console.error('Erreur lors de l’envoi du fichier :',error)

        }); 
            
    })
}

// gestion validation du Form submit





