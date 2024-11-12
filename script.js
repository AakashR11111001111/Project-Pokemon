var inputField = document.querySelector("#search-field");
var loadingScr = document.querySelector(".loading");
var inputs = document.querySelector(".Allinputs");
var searchBtn = document.querySelector(".search-btn");
var selectList = document.querySelector("#SelectTypes");
var pokeContainer = document.querySelector(".poke-container");
var resetBtn = document.querySelector(".reset-btn");
var mainHead = document.querySelector(".main-head");
var mainContainer = document.querySelector(".main-container");
var detCardDiv = document.querySelector(".detailed-card");
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
        <h5 class="abs">Abilities: ${ele.abilities.map(ability => ability.ability.name.toUpperCase()).join(", ")}</h5>
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
        div.addEventListener("click",()=>{
            detCardDiv.innerHTML = "";
            let outerDet = document.createElement("div");
            let detCard = document.createElement("div");
            outerDet.appendChild(detCard);
            detCard.className = "det-card";
            detCard.style.backgroundColor = typeColors[type];
            detCardDiv.style.backdropFilter = "blur(10px)";
            detCardDiv.style.display = "flex";
            detCard.style.boxShadow = `0 0 5px 2px rgba(0,0,0,0.3),  0 0 20px 7px ${typeColors[type]}`;
            let code = `
            <h4> Rank #${ele.id}</h4>
                <h1 >${ele.name.toUpperCase()}</h1>
                <img src = "${ele.sprites.front_default}" id = "poke-img"/>
                <p><strong>Weight: </strong><em>${ele.weight}</em></p>
                <p><strong>Height: </strong><em>${ele.height}</em></p>
                <p><strong>Base Experience: </strong><em>${ele.base_experience}</em></p>
                <p><strong>Abilities: </strong><em>${ele.abilities.map(ab => ab.ability.name.toUpperCase())}</em></p>
            `
            detCard.innerHTML = code;
            let closeBtn = document.createElement("div");
            closeBtn.innerHTML = `<svg class="cross-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                <path fill="#F44336" d="M42,37c0,2.762-2.238,5-5,5H11c-2.762,0-5-2.238-5-5V11c0-2.762,2.238-5,5-5h26c2.762,0,5,2.238,5,5V37z"/>
                <path fill="#FFEBEE" d="M21.914 12.065H25.914V36.107H21.914z" transform="rotate(-134.999 23.914 24.086)"/>
                <path fill="#FFEBEE" d="M22.064 11.726H26.064V35.897H22.064z" transform="rotate(134.999 24.064 23.812)"/>
            </svg>`
            ;
            detCard.appendChild(closeBtn);

            detCardDiv.appendChild(detCard);

            closeBtn.addEventListener("click", () => {
                detCardDiv.style.display = "none";
            });

            detCard.addEventListener("mousemove",(e)=>{
                //Tilt Effect ka code 
                
                const rect = detCard.getBoundingClientRect();

                //mouse ki position corresponding to center of div
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                //  mouse ka distance from the center of the target div jaha hover ho rha h
                const centerX = x - (rect.width/2);
                const centerY = y - (rect.height/2);
                
                //chlo angle nikaalein !! kam se kam angle maintain krenge 
                const tiltX = (centerY / rect.height)*50;
                const tiltY = (centerX / rect.width)*50;

                // ye to ata hi hoga
                detCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                
            })
            
            detCard.addEventListener("mouseleave",()=>{
                detCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
            })
            detCardDiv.appendChild(detCard);
        })
    });
}

resetBtn.addEventListener("click",()=>{
    inputField.value = "";
    selectList.value = "Select a type";
    displayOnUI(allPoke);
})