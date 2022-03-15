const parent = document.querySelector(".main-row")
const image = document.querySelector(".dimage")
const search = document.querySelector('#search')
const select = document.querySelector('select')





// window.addEventListener('load', ()=>{ 
//     if
//     poputateCountries()
// })


app();


function app() {
    if (parent.childElementCount === 0){
        poputateCountries()

        
    }
}

search.addEventListener('keyup', (event)=>{
    if(event.keyCode === 13){
        event.preventDefault()
        poputateCountries(search.value, "Country")
        search.value = "";
    }
})

// if(card){

//     card.addEventListener('click', ()=>{
//         console.log(card[2].innerText)
//         localStorage.setItem('country', card[2].innerText)
//     })
// }


select.addEventListener('change', ()=> {
    poputateCountries(select.value, "Continent")
})

async function poputateCountries(text="",type=""){
    
    if(text.length && type === "Country")
    {
        image.classList.remove('noshow');
        let response = await fetch(`https://restcountries.com/v2/name/${text}`)
        let data = await response.json()
        seedCountry(data)
    } else if(text.length && type === "Continent")
    {
        image.classList.remove('noshow');
        console.log('here')
        let response = await fetch(`https://restcountries.com/v3.1/region/${text}`)
        let data = await response.json()
        seedContinent(data)
    } else
    {
        let response = await fetch("https://restcountries.com/v2/all")
        let data = await response.json()
        seed(data)
 
    }
    

}
function myFunction(obj){
    const cardBody = obj.firstElementChild.nextElementSibling
    const next = document.querySelector('.nextbtn')
    const countryName = cardBody.firstElementChild.innerText;
    localStorage.clear()
    localStorage.setItem('country', countryName)

    next.click()
}
function seed(data) {
    data.forEach(item => {
        image.classList.add('noshow');
        parent.innerHTML += `
        <div class="col">
        <div class="card" onclick="myFunction(this)">
        
            <img style="height:200px" src=${item.flags.png} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text mt-2">
            <strong>Population</strong> : ${item.population} <br>
            <strong>Region</strong> : ${item.region} <br>
            <strong>Capital</strong> : ${item.capital} <br>
            </p>
            </div>
        </div>
        </div>
        `
        
    }); 
}

function seedCountry(data) {
    data.forEach(item => {
        image.classList.add('noshow');
        parent.innerHTML = `
        <div class="col">
        <div class="card" onclick="myFunction(this)">
        
            <img style="height:200px" src=${item.flags.png} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text mt-2">
            <strong>Population</strong> : ${item.population} <br>
            <strong>Region</strong> : ${item.region} <br>
            <strong>Capital</strong> : ${item.capital} <br>
            </p>
            </div>
        </div>
        </div>
        `
})
}
function seedContinent(data) {
    parent.innerHTML = ""
    data.forEach(item => {
        image.classList.add('noshow');
        
        parent.innerHTML += `
        <div class="col">
        <div class="card" onclick="myFunction(this)">
        
            <img style="height:200px" src=${item.flags.png} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${item.name.common}</h5>
            <p class="card-text mt-2">
            <strong>Population</strong> : ${item.population} <br>
            <strong>Region</strong> : ${item.region} <br>
            <strong>Capital</strong> : ${item.capital} <br>
            </p>
            </div>
        </div>
        </div>
        `
})
}