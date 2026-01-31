const table = document.getElementById("tbody")
const url1 = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11ra.px"
const url2 = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyokay/statfin_tyokay_pxt_115b.px"
console.log("sonni")
async function fetchStatFinData(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  

  return await response.json();
}


async function getUsers() {
  
console.log("sonni")

const userJSON = await (await fetch("population_query.json")).json();
const userJSON2 = await (await fetch("employment_query.json")).json();


  const [populationData, employmentData] = await Promise.all([
    
    fetchStatFinData(url1, userJSON),
    fetchStatFinData(url2, userJSON2),
  ]);
  
  setupTable(userJSON, populationData, employmentData);


  
}


function setupTable(userJSON3, userJSON, userJSON2) {




  const list2 = userJSON2.value
  // let stringJson = JSON.stringify(userJSON)
  const list1 = userJSON.value

  
  const list = userJSON3.query[0].selection.values

  //console.log(userJSON.dimension.Alue.category.label)
 
  console.log("moi")
  let i = 0
  console.log(list1)
  list.forEach((code) => {

    //console.log(municipality)
    let population = list1[i]
    let employment = list2[i]
    let grade = (employment / population) * 100



    const tr = document.createElement("tr")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    const td3 = document.createElement("td")
    const td4 = document.createElement("td")

    if (grade > 45) {
      tr.style.backgroundColor = "#abffbd"; // vihreä
    } else if (grade < 30) {
      tr.style.backgroundColor = "#ff9e9e"; // punainen
    } else {
      if (i % 2 === 0) {
        tr.style.backgroundColor = "#f2f2f2"; 
      } else {
        tr.style.backgroundColor = "#ffffff"; 
      }
    }

    td1.innerText = userJSON.dimension.Alue.category.label[`${code}`]

    td2.innerText = population
    td3.innerText = employment

    td4.innerText = grade.toFixed(2) + "%"




    tr.appendChild(td1)

    tr.appendChild(td2)

    tr.appendChild(td3)

    tr.appendChild(td4)

    table.appendChild(tr)

    ++i

  })









}

getUsers()
