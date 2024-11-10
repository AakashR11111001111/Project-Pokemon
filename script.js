var inputField = document.querySelector("#search-field");
var loadingScr = document.querySelector(".loading");
var inputs = document.querySelector(".Allinputs");
var searchBtn = document.querySelector(".search-btn");
var selectList = document.querySelector("#SelectTypes");
var pokeContainer = document.querySelector(".poke-container");
var resetBtn = document.querySelector(".reset-btn");
var mainHead = document.querySelector(".main-head");
var mainContainer = document.querySelector(".main-container");
var allPoke = [];
var filteredPoke = [];

loadingScr.style.display = "block";
inputs.style.display = "none";


async function getAllPokemon(){
    for(let i = 1 ; i <= 150 ; i++){
        let fpoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let jPoke = await fpoke.json();
        allPoke.push(jPoke);
    }
    setTimeout(()=>{
        loadingScr.style.display = "none";
        inputs.style.display = "flex";
    }, 0);
    displayOnUI(allPoke);
}


window.addEventListener("load",()=>{
    getAllPokemon();
})


inputField.addEventListener("keyup",()=>{
    let value = inputField.value.toLowerCase();
    filteredPoke = allPoke.filter(em =>{
        return em.name.includes(value);
    })
    displayOnUI(filteredPoke);
})

searchBtn.addEventListener("click",()=>{
    let value = selectList.value;

    if(value == "Select a type") {
        alert("Select a Type from the DropDown");
        return; 
    }
    filteredPoke = allPoke.filter(em =>{
        return em.types[0].type.name.includes(value);
    })
    displayOnUI(filteredPoke);
})


function displayOnUI(arr){
    
    pokeContainer.innerHTML = "";
    arr.forEach(ele => {
        let div = document.createElement("div");
        div.className = "poke-card";
        div.innerHTML = `
        <div class = "outer-card">
        <div class = "card-front">
        <h4 class = "card-rank">#${ele.id}</h4>
        <div class = "poke-img-div">
        <img src = "${ele.sprites.front_default}" id = "poke-img"/>
        </div>
        <h5 class = "poke-name">${ele.name.toUpperCase()}</h5> 
        <div class="poke-type">
        <a href="" id="poke-abs">${ele.types[0].type.name.toUpperCase()}</a>  
        </div> 
        </div>
        <div class = "card-back">
        <h4 class = "card-rank">#${ele.id}</h4>
        <div class = "poke-img-div">
        <img src = "${ele.sprites.back_default}" id = "poke-img"/>
        </div>
        <h5 class = "poke-name">${ele.name.toUpperCase()}</h5>
        <h5 class="abs">Abilities: ${ele.abilities[0].ability.name.toUpperCase()}</h5>
        </div>
        </div>
        `;

        let outerCard = div.querySelector(".outer-card");
        let type = ele.types[0].type.name;
        const typeColors = {
            grass: "#02B816ef",
            fire: "#DC3307ef",
            water: "#4143BDef",
            bug: "#61A513ef",
            normal: "#D994C2ef",
            poison: "#84066Def",
            electric: "#e7c325ef",
            ground: "#DA8507ef",
            fairy: "#E164CAef",
            fighting: "#A22813ef",
            psychic: "#C03897ef",
            ice: "#5EE7D0ef",
            rock: "#BEB1B6ef",
            ghost: "#9498ABef",
            dragon: "#AF120Bef",
            dark: "#31372Bef"
        };
        outerCard.style.background = typeColors[type];
        pokeContainer.appendChild(div);        
    });
}

resetBtn.addEventListener("click",()=>{
    inputField.value = "";
    selectList.value = "Select a type";
    displayOnUI(allPoke);
})