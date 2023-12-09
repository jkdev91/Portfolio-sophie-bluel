
/*** page login***/

const email = document.getElementById("email")
console.log(email)
const password = document.getElementById('password')
console.log(password)
const form = document.querySelector('form')

// verifier si le token est stoker dans le local storage
 function checkingLocalStorage (){
    const checkToken = localStorage.getItem("token")
    // si token store on redirige vers la page accueille 
    if (checkToken) {
        window.location.href = "../index.html"
    }
}
checkingLocalStorage()


// recuperer les email + password entrer par le user

function requestToken () {
    form.addEventListener('submit', async function(event){
        event.preventDefault ();
        // création objet contenant email + password
        const userID = {
            email: event.target.querySelector("[name=email]").value ,
            password: event.target.querySelector("[name=password]").value,
        };
        console.log(userID)
        // convertir la charge utile en Json
        const chargeUtile = JSON.stringify(userID);
        // appeler la fonction Fetch pour envoyer les données entré par le user
            await fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: chargeUtile,
        })

        // recuperer la réponse (l'id + token) de l'api 
        .then((response) => {
            if (!response.ok) {
                return alert("le mot de passe ou l'email est incorrect")

            } else {
               return data = response.json()
               // sauvegarder id + token dans le localstorage 
                .then(data => {
                    const userId = data.userId;
                    window.localStorage.setItem("id", userId)
                    const token = data.token;
                    window.localStorage.setItem("token", token)
                });  
            };    
        })
        checkingLocalStorage()  

    });
}
requestToken ()


// validation de l'email entrer par le user







