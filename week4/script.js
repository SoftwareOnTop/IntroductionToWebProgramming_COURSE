const form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", function(event) {
    event.preventDefault(); })

const button = document.getElementById("submit-data")



async function get_data(url) {
    const userPromise = await fetch(url)
    const userJSON = await userPromise.json()
    const container = document.getElementsByClassName("show-container")[0]
    
    console.log(userJSON)
    container.innerHTML = ""

    userJSON.forEach(element => {
        
        const div = document.createElement("div")
        div.className = "show-data"
        const img = document.createElement("img")
        img.src = element.show.image.medium
        const info = document.createElement("div")
        info.className = "show-info"
        const h1 = document.createElement("h1")
        h1.innerText = element.show.name
        const p = document.createElement("div")
        p.innerHTML = element.show.summary
        console.log("test")
        div.appendChild(img)
        console.log("test")
        info.appendChild(h1)
        console.log("test")
        info.appendChild(p)
        console.log("test")
        div.appendChild(info)
        console.log("test")
        container.appendChild(div)
        
        
        

    });

}

button.addEventListener("click", function() {
    
    const keyword = document.getElementById("input-show").value
    console.log(keyword)
    const url =  "https://api.tvmaze.com/search/shows?q=" + keyword
    console.log(url)
    
    get_data(url)
    


})