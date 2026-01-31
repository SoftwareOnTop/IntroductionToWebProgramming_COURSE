
function addTable() {
    const form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", function(event) {
    event.preventDefault(); 

   
    const username = document.getElementById("input-username").value;
    const email = document.getElementById("input-email").value;
    const admin = document.getElementById("input-admin").checked;
    const file = document.getElementById("input-image").files[0];

    console.log(username, email, admin, file);
  })
    
    const button = document.getElementById("submit-data")
    let checker = document.getElementById("input-admin")
    const clear = document.getElementById("empty-table")
    const fileInput = document.getElementById("input-image")
    checker.addEventListener("click", function() {
        if (checker.value === "-") {
            console.log("perhek")
            checker.value = "X"
        } else {
            checker.value = "-"
        }})

    button.addEventListener("click", function() {
        
        const element1 = document.querySelectorAll("tr")
        let username = document.getElementById("input-username").value
        let email = document.getElementById("input-email").value
        let admin = document.getElementById("input-admin").value
       
        let photo = document.getElementById("input-image").files[0]
        const element = document.getElementsByTagName("Table")[0]

        a = true
       
        for (let i = 1; element1.length > i; i++) {
            const first = element1[i].querySelectorAll("td")
            if (first.length >= 3 && first[0].textContent.trim() === username) {
                first[1].textContent = email
                first[2].textContent = admin
                if (photo) {

                    const reader = new FileReader()
                    reader.onload = function() {

                        const img = document.createElement("img")
                        img.width = 64
                        img.height = 64
                        img.src = reader.result
                        first[3].innerHTML = ""
                        first[3].appendChild(img)
                    }
                    reader.readAsDataURL(photo);



                }
                a = false 
                break
                
            } 
        }
      

     
        
        if (a) {

            console.log(email, admin)
        
            console.log("perkele")
            const newRow = document.createElement("tr")
            const td1 = document.createElement("td")
            td1.innerText = username
            const td2 = document.createElement("td")
            td2.innerText = email
            const td3 = document.createElement("td")
            td3.innerText = admin
            console.log("perkele")
            
            console.log("perkele2")
            const file1 = document.getElementById("input-image").files[0]
            console.log(file1)
            console.log("perkele2")
            const td4 = document.createElement("td")
            if (file1) {
                    
                    const reader = new FileReader()
                    reader.onload = function() {
                        console.log("hgththgthulli")
                        const img = document.createElement("img")
                        img.width = 64
                        img.height = 64
                        img.src = reader.result
                        td4.appendChild(img)
                        

                        newRow.appendChild(td1)
                        newRow.appendChild(td2)
                        newRow.appendChild(td3)
                        newRow.appendChild(td4)
                        element.appendChild(newRow)
                    } 
                    reader.readAsDataURL(file1)



            } else {

                newRow.appendChild(td1);
                newRow.appendChild(td1);
                newRow.appendChild(td2);
                newRow.appendChild(td3);
                newRow.appendChild(td4);
                element.appendChild(newRow);

            }
            

                
            

        }
    })

    

    
    

    clear.addEventListener("click", function() {
        
        const element = document.querySelectorAll("tr")
        

        for (let i = element.length - 1; i >= 1; --i) {
            element[i].remove()
        }

    })
}



addTable()
