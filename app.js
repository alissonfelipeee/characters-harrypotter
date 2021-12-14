
const selectCharacters = document.querySelector('#type')

const listPromises = []

const getCharacterUrl = value => {
    if (value === 'staff') { 
        return 'http://hp-api.herokuapp.com/api/characters/staff'
    } else {
        return 'http://hp-api.herokuapp.com/api/characters'
    }
}

const listCharacter = value => fetch(getCharacterUrl(value))
    .then(response => response.json())
    .catch(function(error) { console.log(error)})

const generateHTML = characters =>
    characters[0].reduce((accumulator, {name, image, house, ancestry, actor}) => {

        let casa = house == '' ? 'Sem informação' : house

        if(ancestry == 'pure-blood'){
            ancestry = 'Sangue-puro'
        } else if (ancestry == 'muggleborn') {
            ancestry = 'Nascido trouxa'
        } else if(ancestry == 'half-blood') {
            ancestry = 'Mestiço'
        } else if(ancestry == 'muggle') {
            ancestry = 'Trouxa'
        } else if(ancestry == 'squib') {
            ancestry = 'Aborto'
        } else {
            ancestry = 'Sem informação'
        }

        let ator = actor ==='' ? 'Sem informação' : actor

        if(image == '') {
            accumulator += `
            <li class="card">
                <h2 class="card-title">${name}</h2>
                <p>Casa: <span>${casa}</span></p>
                <p>Sangue: <span>${ancestry}</span></p>
                <p>Ator: <span>${ator}</span></p>
            </li>`
            return accumulator
        }

        accumulator += `
        <li class="card">
            <img class="card-image" alt=${name} src="${image}"/>
            <h2 class="card-title">${name}</h2>
            <p>Casa: <span>${casa}</span></p>
            <p>Sangue: <span>${ancestry}</span></p>
            <p>Ator: <span>${ator}</span></p>
        </li>`
        return accumulator
    }, ' ')


const insertCharactersIntoDOM = characters => {
    const ul = document.querySelector('[data-js="characters"]')
    ul.innerHTML = ' '
    ul.innerHTML = characters
}

const all = value => {
    listPromises.push(listCharacter(value))

    Promise.all(listPromises)
        .then(generateHTML)
        .then(insertCharactersIntoDOM)
        .then(listPromises.pop())
}

const update = () => {
    all(selectCharacters.value)
}