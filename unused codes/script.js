'use strict';

const filter = document.querySelector('.filter');
const searchItem = document.querySelector('.search_item');
const clear = document.querySelector('.clear');
const jobContainer = document.querySelectorAll('.job');
const removeItem = document.querySelectorAll('.search_remove');
const skill = document.querySelectorAll('.skill');

let newSearchName, newSearch, newSearchRemove;

let newSearchArray= [];

const createSearch = () => {
    newSearchName = document.createElement('div');
    newSearch = document.createElement('button');
    newSearchRemove = document.createElement('img');
};

const addClassToSearch = () => {
    newSearchName.classList.add('search_name');
    newSearch.classList.add('search_name_item');
    newSearchRemove.classList.add('search_remove');
    newSearchRemove.src = './images/icon-remove.svg';
};

const appendtoDOM = () => {
    searchItem.appendChild(newSearch);
    newSearch.appendChild(newSearchName);
    newSearch.appendChild(newSearchRemove);
};

const removeItemFromSearch = () => {
    removeItem.forEach((item) => {
        item.addEventListener('click', (e) => {
            newSearchArray = newSearchArray.filter(
                (itemSearch) => itemSearch !== item.parentNode.textContent.toLowerCase()
            );
            item.parentNode.remove();
        });
    });
};

const updateSearch = () =>
    (removeItem = document.querySelectorAll('.search_remove'));


const saveSearch = () =>
    newSearchArray.push(newSearch.id.toLowerCase());

document.addEventListener('click', () => {
    if(!searchItem.hasChildNodes()) filter.classList.add('hidden');
    else filter.classList.remove('hidden');
});

clear.addEventListener('click', () => {
    while(searchItem.firstChild) {
        searchItem.removeChild(searchItem.firstChild);
    }
    jobContainer.forEach((task) => task.classList.remove('hidden'));
    newSearchArray = [];
});

skill.forEach((selectChoice) => {
    selectChoice.addEventListener('click', () => {
        if(newSearchArray.includes(selectChoice.textContent.toLowerCase())) return;

        createSearch();

        newSearchName.textContent = selectChoice.textContent;
        newSearch.setAttribute('id', selectChoice.textContent);

        addClassToSearch()
        appendtoDOM;
        updateSearch;
        saveSearch;

        jobContainer.forEach((task) => {
            if(!task.classList.contains(selectChoice.textContent.toLowerCase()))
            task.classList.add('hidden');
        });

        removeItemFromSearch();
    });
});

document.addEventListener('mouseup', () => {
    jobContainer.forEach((cardState) => {
        let searchCheck = 0;

        if(newSearchArray.length === 0) {
            cardState.classList.remove('hidden');
            cardState.classList.add('state');
            return;
        }
        newSearchArray.forEach((item) => {
            if([...cardState.classList].includes(item)) searchCheck++;
        });
        if(searchCheck !== newSearchArray.length) {
            cardState.classList.add('hidden');
            cardState.classList.remove('state');
        }

        if(searchCheck === newSearchArray.length) {
            cardState.classList.remove('hidden');
            cardState.classList.add('state');
        }
    })
})