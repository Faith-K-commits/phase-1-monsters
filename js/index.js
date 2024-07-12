const getMonsters = () => {
    fetch('http://localhost:3000/monsters/?_limit=50')
    .then(res => {
    if(!res.ok){
        throw new Error('Could not fetch data.');
    }
    return res.json();
})
.then(data => {
    console.log(data);
    data.forEach(monster => {
        const monsters = document.getElementById('monster-container');
        const container = document.createElement('div');
        container.innerHTML = `
            <h1>Name: ${monster.name}</h1>
            <h3>Age: ${monster.age}</h3>
            <p>${monster.description}</p>
        `;
        monsters.appendChild(container);
    });
})
.catch(error => console.log("Error:", error))
};

document.addEventListener('DOMContentLoaded', function() {
    const submit = document.querySelector('#form'); 
    if (submit) {
        submit.addEventListener('click', e => e.preventDefault());
        // getMonsters();
    } else {
        console.error('404 not found');
    }
})


const postMonster = () => {
    const name = document.getElementById('name');
    name.textContent = name.value;
    const age = document.getElementById('age');
    age.textContent = age.value;
    const description = document.getElementById('desc');
    description.textContent = description.value

    const formData = {
        name: name,
        age: age,
        description: description
    }
    return fetch('http://localhost:3000/monstersS', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(res => {
        if(!res.ok){
            throw new Error('Could not connect to the server')
        }
        return res.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
};

const nextPage = () => {
    const next = document.getElementById('forward');
    next.addEventListener('click', () => {
        return fetch('http://localhost:3000/monsters/?_limit=50&_page=2')
        .then(res => res.json)
        .then(data => console.log(data))
    });

}

