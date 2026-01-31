

function initializeCode() {
    const button = document.getElementById("my-button")
    button.addEventListener('click', function() {
    let tag = document.getElementsByTagName("H1")[0]
        console.log("hello world")
        if (tag.innerHTML === "Hello world") {
            tag.innerHTML = "Moi maailma"
            console.log("worked")} else {
                tag.innerHTML = "Hello world"
                console.log("removeddd")
            }


    })

    const button2 = document.getElementById("add-data")
    button2.addEventListener('click', function() {
        const list = document.getElementById("my-list")
        let li = document.createElement("li")
        console.log(2)
        let value = document.getElementsByTagName("textarea")[0].value
        console.log(2)
        li.innerText = value
        console.log(2)
        list.appendChild(li)
        console.log(2)
        document.getElementsByTagName("textarea")[0].value = ""
        console.log(2)



    })


}


initializeCode()