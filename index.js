const types = [
  {
    name: "All",
    id: "0"
  },
  {
    name: "Movies",
    id: "1"
  },
  {
    name: "Tv Shows",
    id: "2"
  }
]

const genders = [
  {
    name: "All",
    id: "0",
  },
  {
    name: "Action",
    id: "11",
  },
  {
    name: "Adventure",
    id: "12",
  },
  {
    name: "Comedy",
    id: "13",
  },
  {
    name: "Drama",
    id: "14",
  }
]

const body = document.querySelector("body");
let selectedType = types[0].id;
let selectedGender = genders[0].id;
let shows = [];
let movies = [];

const getMovies = async () => {
  const response = await fetch("https://my-json-server.typicode.com/alpaula/fake-api/movies");
  const data = await response.json();
  movies = data;
}

const getShows = async () => {
  const response = await fetch("https://my-json-server.typicode.com/alpaula/fake-api/shows");
  const data = await response.json();
  shows = data;
}

const createList = (list) => {
  list.map(show => {
    const item = document.createElement("button");
    item.classList.add("item-button");
    item.addEventListener("click", () => handleSelectItem(show));

    const title = document.createElement("span");
    title.textContent = show.name;
    title.classList.add("name");

    const img = document.createElement("img")
    img.setAttribute('src', show.image);
    img.classList.add("img");

    item.appendChild(img);
    item.appendChild(title);

    const root = document.getElementById("root");
    root.appendChild(item);
  })
}

const createSelectedItem = (item) => {
  const backButton = document.createElement("button");
  backButton.textContent = "back";
  backButton.addEventListener("click", () => handleBack());

  const title = document.createElement("h1");
  title.textContent = item.name;

  const img = document.createElement("img")
  img.setAttribute('src', item.image);

  const description = document.createElement("p");
  description.textContent = item.description;

  body.appendChild(backButton);
  body.appendChild(title);
  body.appendChild(img);
  body.appendChild(description);
}

const selectType = document.createElement("select");
selectType.classList.add("select");

const selectGender = document.createElement("select");
selectGender.classList.add("select");

const createOption = (tag, select) => {
  const option = document.createElement("option");
  option.setAttribute("value", tag.id);
  option.textContent = tag.name;
  select.appendChild(option);
}

genders.map(tag => createOption(tag, selectGender));
types.map(tag => createOption(tag, selectType));

const handleBack = () => {
  body.innerHTML = "";

  const root = document.createElement("div");
  root.setAttribute("id", "root");
  body.appendChild(root);

  mountScreen();
}

const handleSelectItem = (item) => {
  body.innerHTML = "";

  createSelectedItem(item);
}

const handleSelect = () => {
  const newList = [...shows, ...movies].filter(show =>
    (show.type === selectedType || selectedType === "0") && 
    (show.gender === selectedGender || selectedGender === "0")
  );

  root.innerHTML = "";
  createList(newList);
}

selectGender.addEventListener('change', (event) => {
  const { value } = event.target;
  selectedGender = value;
  handleSelect();
});

selectType.addEventListener('change', (event) => {
  const { value } = event.target;
  selectedType = value;
  handleSelect();
});

const mountScreen = async () => {
  const root = document.getElementById("root");

  body.insertBefore(selectType, root);
  body.insertBefore(selectGender, root);

  await getMovies();
  await getShows();

  createList(shows);
  createList(movies);
}

mountScreen();
