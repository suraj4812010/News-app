const API_KEY = "03f0d516d68b40488c2435b067551507";

const url = "https://newsapi.org/v2/everything?q="

function reload(){
    window.location.reload();
}


window.addEventListener('load', () => fetchNews("India"));


async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=03f0d516d68b40488c2435b067551507`);
    const data =await response.json();
    // console.log(data);

    bindData(data.articles);
}


function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card')

    cardContainer.innerHTML = "";

    articles.forEach(articles => {
        if(!articles.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);

        fildataInCard(cardClone, articles);

        cardContainer.appendChild(cardClone);
    });
}

function fildataInCard(cardClone, articles){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    

    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML=articles.title;
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/jakarta"
    });

    newsSource.innerHTML = `${articles.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(articles.url, "_blank");
    })
}

const selectedNav = "";
function onNavItemClick(id){
    fetchNews(id)

    const navItem = document.getElementById(id);
    selectedNav.classList.remove("active");
    selectedNav = navItem;
    selectedNav.classList.add("active");

}

const searchButton = document.getElementById('search-text');
const searchText = document.getElementById('news-input');


searchButton.addEventListener('click', () =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    selectedNav.classList.remove("active");
    selectedNav = null;
})