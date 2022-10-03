 
const data = [
    {
      "id": 1,
      "company": "Photosnap",
      "logo": "./images/photosnap.svg",
      "new": true,
      "featured": true,
      "position": "Senior Frontend Developer",
      "role": "Frontend",
      "level": "Senior",
      "postedAt": "1d ago",
      "contract": "Full Time",
      "location": "USA Only",
      "languages": ["HTML", "CSS", "JavaScript"],
      "tools": []
    },
    {
      "id": 2,
      "company": "Manage",
      "logo": "./images/manage.svg",
      "new": true,
      "featured": true,
      "position": "Fullstack Developer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "1d ago",
      "contract": "Part Time",
      "location": "Remote",
      "languages": ["Python"],
      "tools": ["React"]
    },
    {
      "id": 3,
      "company": "Account",
      "logo": "./images/account.svg",
      "new": true,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2d ago",
      "contract": "Part Time",
      "location": "USA Only",
      "languages": ["JavaScript"],
      "tools": ["React", "Sass"]
    },
    {
      "id": 4,
      "company": "MyHome",
      "logo": "./images/myhome.svg",
      "new": false,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "5d ago",
      "contract": "Contract",
      "location": "USA Only",
      "languages": ["CSS", "JavaScript"],
      "tools": []
    },
    {
      "id": 5,
      "company": "Loop Studios",
      "logo": "./images/loop-studios.svg",
      "new": false,
      "featured": false,
      "position": "Software Engineer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "1w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["JavaScript"],
      "tools": ["Ruby", "Sass"]
    },
    {
      "id": 6,
      "company": "FaceIt",
      "logo": "./images/faceit.svg",
      "new": false,
      "featured": false,
      "position": "Junior Backend Developer",
      "role": "Backend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "UK Only",
      "languages": ["Ruby"],
      "tools": ["RoR"]
    },
    {
      "id": 7,
      "company": "Shortly",
      "logo": "./images/shortly.svg",
      "new": false,
      "featured": false,
      "position": "Junior Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["HTML", "JavaScript"],
      "tools": ["Sass"]
    },
    {
      "id": 8,
      "company": "Insure",
      "logo": "./images/insure.svg",
      "new": false,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "USA Only",
      "languages": ["JavaScript"],
      "tools": ["Vue", "Sass"]
    },
    {
      "id": 9,
      "company": "Eyecam Co.",
      "logo": "./images/eyecam-co.svg",
      "new": false,
      "featured": false,
      "position": "Full Stack Engineer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "3w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["JavaScript", "Python"],
      "tools": ["Django"]
    },
    {
      "id": 10,
      "company": "The Air Filter Company",
      "logo": "./images/the-air-filter-company.svg",
      "new": false,
      "featured": false,
      "position": "Front-end Dev",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "1mo ago",
      "contract": "Part Time",
      "location": "Worldwide",
      "languages": ["JavaScript"],
      "tools": ["React", "Sass"]
    }
  ]

function getSkillHTML(skill) {
    return `<button class="skill">
        ${skill}
    </button>`;
};

function getSearchHTML(search) {
  return `<button class="search_close">
        ${search}
    </button>`;
};

function getJobPostHTML(jobPost, searched = []) {
    const skillPlaceholder = 'SKILL';
    let jobPostHTML = `
    <div class="card" id="id${jobPost.id.toString()}">
      <div class="state">
        <div class="info">
          <div class="oval">
            <img src="${jobPost.logo}" alt="${jobPost.company}" class="oval-image">
          </div>
          <div class="content">
            <div class="item">
              <p class="company">${jobPost.company}</p>
              ${jobPost.new ? `<button class="new">NEW!</button>` : ``}
              ${jobPost.featured ? `<button class="featured">FEATURED</button>` : ``}
            </div>
            <div class="title">
              <p>${jobPost.position}</p>
            </div>
            <div class="posting">
              <p>${jobPost.postedAt}</p>
              <div class="dot">&sdot;</div>
              <p>${jobPost.contract}</p>
              <div class="dot">&sdot;</div>
              <p>${jobPost.location}</p>
            </div>
          </div>
        </div>
        <hr>
        <div class="skills">
            ${skillPlaceholder}
        </div>
      </div>
    </div>`;

    const skillArray = [
        jobPost.role,
        jobPost.level,
        ...(jobPost.languages || []),
        ...(jobPost.tools || [])
    ];

    const trueSearch = !searched.length || searched.every(search => (
      skillArray.includes(search)
    ));

    if (!trueSearch) {
      return '';
    };

    const skillData = skillArray.reduce((accumulator, currentSkill) => {
        return accumulator + getSkillHTML(currentSkill);
    }, '');

    return jobPostHTML.replace(skillPlaceholder, skillData);
};

function searchHandler(targetValue, searchItem) {
  let closeSearch = Array.from(searchItem.children)
    .map(node => node.innerHTML && node.innerHTML.trim())
    .filter(search => !!search);

  if (closeSearch.includes(targetValue)) {
    closeSearch = closeSearch.filter(search => search !== targetValue);
  } else {
    closeSearch = [...closeSearch, targetValue];
  }


  return closeSearch;
};

function setSkill(searched) {
  const dataHTML = data.reduce((accumulator, currentData) => {
    return accumulator + getJobPostHTML(currentData, searched);
  }, '');

  document.getElementById('main').innerHTML = dataHTML;
};

function showSearchItem(display = false) {
  const searchShow = document.getElementById('filter');
  
  if (display) {
    searchShow.classList.remove('hidden');
    return;
  }
  searchShow.classList.add('hidden');
}

function clearSearch(searchItem) {
  searchItem.innerHTML = '';

  setSkill();
  showSearchItem(false);
}

window.addEventListener('click', (event) => {
  const targetElement = event.target;
  const targetValue = targetElement.innerHTML.trim();
  const targetClasses = ['skill', 'search_close'];
  const searchItem = document.getElementById('search_item');
  const closeSearch = searchHandler(targetValue, searchItem);

  if (targetElement.id === 'clear' || !closeSearch.length) {
    clearSearch(searchItem);
    return;
  };

  if (!targetClasses.some(classes => targetElement.classList.contains(classes))) {
    return;
  };

  searchItem.innerHTML = closeSearch.reduce((accumulator, currentSearch) => {
    return accumulator + getSearchHTML(currentSearch, 'search_close');
  }, '');

  showSearchItem(closeSearch.length > 0);
  setSkill(closeSearch);
});

setSkill();