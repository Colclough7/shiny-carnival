const input = document.querySelector('input')
const getCocktailsButton = document.querySelector('#getCocktailsButton')
const getCategory = document.querySelector('.cocktail__category')
const container = document.querySelector('.cocktail__container')
const showSection = document.querySelector('section')
const reset = document.querySelector('#reset')


getCocktailsButton.addEventListener('click',fetchCocktails)
reset.addEventListener('click',resetAll)



function fetchCocktails() {
                let cocktail = input.value.trim()
                showSection.classList.remove('none')
                let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
                fetch(url)
                .then(response=>response.json())
                .then(data=>{
                    getCategory.textContent = `${cocktail.toUpperCase()}` || 'Random Drinks'
                    data.drinks.map(drink => container.innerHTML +=`
                    <div class="drink__card">
                    <div class="drink__image">
                        <span class="drink__name">${drink.strDrink}</span>
                        <img src=${drink.strDrinkThumb} alt="" class="drink__thumb">
                        <button class="drink__card--button"><i id=${drink.idDrink} onclick="liked(this)" class="fas fa-heart"></i></button>
                    </div>
                    <div class="cocktail__info">
                        <h2 class="drink__brand">${drink.strCategory}</h2>
                    </div>
                </div>`)
                })
                .catch(err => {
                    console.log(`error ${err}`)
                })
            }




function liked(element){
    element.classList.toggle('liked') 
    if(element.classList.contains('liked')){
        let results = input.value.trim()
        let newUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${results}`
        fetch(newUrl)
        .then(response=>response.json())
        .then(data=>{
            data.drinks.filter(drink => element.id === drink.idDrink?container.innerHTML += `
                <div id="myModal" class="modal">
                    <div class="modal-content">
                        <h2>${drink.strDrink}</h2>
                        <span onclick="closeModal()" class="close"> &times; </span>
                        <p>${drink.strInstructions}</p>
                    </div>
                </div>
            `: '')
        })
      
    }
  }



function closeModal(){
    const modal = document.querySelector('#myModal')
    modal.remove()
}


function resetAll(){
    input.value = ''
    getCategory.textContent = ''
    let children = [...document.querySelectorAll('.drink__card')]
    children?children.map((child) =>child.remove()):''
    console.log(children)

   
}