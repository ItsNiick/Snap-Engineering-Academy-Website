const csv = require('csv-parser');
const fs = require('fs');

const WARRIOR_URL = "https://hearthstone.wiki.gg/images/e/e4/HERO_01.png"
const SHAMAN_URL = "https://hearthstone.wiki.gg/images/5/51/HERO_02.png"
const ROGUE_URL  = "https://hearthstone.wiki.gg/images/1/1f/HERO_03.png"
const PALADIN_URL = "https://hearthstone.wiki.gg/images/e/e7/HERO_04.png"
const HUNTER_URL = "https://hearthstone.wiki.gg/images/8/8b/HERO_05.png"
const DRUID_URL = "https://hearthstone.wiki.gg/images/e/e2/HERO_06.png"
const WARLOCK_URL = "https://hearthstone.wiki.gg/images/8/84/HERO_07.png"
const MAGE_URL = "https://hearthstone.wiki.gg/images/a/af/HERO_08.png"
const PRIEST_URL = "https://hearthstone.wiki.gg/images/b/b1/HERO_09.png"

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelector('.menu-li');
    const selected = dropdown.querySelector('.selected');
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });
    options.forEach(option =>  {
        option.addEventListener('change', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add();
        });
    });
});

let player_class = []
let name = []
let cost = []
let attack = []
let health = []
let type = []
let rarity = []

fs.createReadStream('cards_flat.csv')
    .pipe(csv())
    .on('data', (row) => {
        player_class.push(row.player_class);
        name.push(row.name);
        cost.push(row.cost);
        attack.push(row.attack);
        health.push(row.health);
        type.push(row.type);
        rarity.push(row.rarity);
    })
    .on('end', () => {
        // Count occurrences of each cost value
        const costCounts = {};
        cost.forEach((value) => {
                costCounts[value] = (costCounts[value] || 0) + 1;
        });

        // Output the counts for each cost value
        console.log('Cost Counts:');
        for (const [value, count] of Object.entries(costCounts)) {
            if (value !== '') {
            console.log(`Cost ${value}: ${count} entries`);
            }
            if (value == '') {
                console.log(`Free Summon: ${count} entries`);
            }
        }

        // Count occurences of each class value
        const classCounts = {};
        player_class.forEach((value) => {
            // Exclude specific class values from counting
            if (value !== '' && value !== 'DREAM' && value !== 'DEATHKNIGHT') {
                classCounts[value] = (classCounts[value] || 0) + 1;
            }
        });

        // Count occurrences of each attack value
        const attackCounts = {};
        attack.forEach((value) => {
                attackCounts[value] = (attackCounts[value] || 0) + 1;
        });
    
        // Count occurrences of each health value
        const healthCounts = {};
        health.forEach((value) => {
            healthCounts[value] = (healthCounts[value] || 0) + 1;
        });


        // Count occurrences of each type value
        const typeCounts = {};
        type.forEach((value) => {
            typeCounts[value] = (typeCounts[value] || 0) + 1;
        });
        
        // Count occurrences of each type value
        const rarityCounts = {};
        rarity.forEach((value) => {
            rarityCounts[value] = (rarityCounts[value] || 0) + 1;
        });

    });


let titles = [
    "Warrior",
    "Shaman",
    "Rogue",
    "Paladin",
    "Hunter",
    "Druid",
    "Warlock",
    "Mage",
    "Priest"
];

// This function displays the associated class image for the given class name.
function showCards() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const templateCard = document.querySelector(".card");
    
    for (let i = 0; i < titles.length; i++) {
        let title = titles[i];
        if (i == 0) {
            imageURL = WARRIOR_URL;
        } else if (i == 1) {
            imageURL = SHAMAN_URL;
        } else if (i == 2) {
            imageURL = ROGUE_URL;
        } else if (i == 3) {
            imageURL = PALADIN_URL;
        } else if (i == 4) {
            imageURL = HUNTER_URL;
        } else if (i == 5) {
            imageURL = DRUID_URL;
        } else if (i == 6) {
            imageURL = WARLOCK_URL;
        } else if (i == 7) {
            imageURL = MAGE_URL;
        } else if (i == 8) {
            imageURL = PRIEST_URL;
        }
            

        const nextCard = templateCard.cloneNode(true); // Copy the template card
        editCardContent(nextCard, title, imageURL); // Edit title and image
        cardContainer.appendChild(nextCard); // Add new card to the container
    }
}

function editCardContent(card, newTitle, newImageURL) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " Poster";

    console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);
