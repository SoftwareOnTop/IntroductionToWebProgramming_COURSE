async function fetchcodes() {
    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px" 
    const res = await fetch(url)
    const data = await res.json()
    const alue = data.variables.find(v => v.code === "Alue");
    console.log("heyeee")
    let areacodes = []
    let areanames = []
    areacodes = alue.values
    areanames = alue.valueTexts
    console.log(areanames)
    let area = "SSS"
    let storage = localStorage.setItem("selectedArea", area)
    let storage2 = localStorage.setItem("selectedArea2", "WHOLE COUNTRY")
    const dat = await addingArea(area);
    
    buildChart(dat, "WHOLE COUNTRY")
    console.log("mulli")
    const button = document.getElementById("submit-data")
    console.log(button)
    button.addEventListener("click", async () => {
        const inputti = document.getElementById("input-area").value
        console.log(inputti)
        const input = inputti.trim().toLowerCase()
        
        const index = areanames.findIndex(name => name.toLowerCase() === input);

    
        if (index === -1) {
            
            return;
        }
        console.log("pip")
        console.log(area)
        area = areacodes[index]
        storage = localStorage.setItem("selectedArea", area);
        storage2 = localStorage.setItem("selectedArea2", inputti)
   
        const data = await addingArea(area);
        buildChart(data, inputti);
    })

}


async function addingArea(area){
    const queryJson = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "2000", "2001", "2002", "2003", "2004", "2005",
                    "2006", "2007", "2008", "2009", "2010", "2011",
                    "2012", "2013", "2014", "2015", "2016", "2017",
                    "2018", "2019", "2020", "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [area],
            
                
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": [
                    "vaesto"
                    
                    
                    
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
};
    console.log("testi1")
    const data = await getData(queryJson);
    return data;
    
}








const getData = async (queryJson) => {
    console.log("hey")

    const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px" 

    const res = await fetch(url, {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(queryJson)


    })
   
    console.log("sonnn")

    if(!res.ok) {
        return;
    }

    const data = await res.json()
    console.log(data)
    console.log("Sonniiuiii")
    
    return data
    
   
}

const buildChart = (data, inputti) => {

 
   
    const years = Object.values(data.dimension.Vuosi.category.label);
    const values = data.value;
    console.log(values)
    let i = 0
    let mulli = 0
    let lis1 = []

    values
    values.forEach((luku) => {
       
        
           lis1.push(luku)
            

        
            
        
       

    })
    console.log(lis1)
    let lis = []
 
    for(let i = 0; i< lis1.length -1; i++) {
        mulli = lis1[i+1] - lis1[i]
        lis.push(mulli)
    }

    console.log(lis)
    
    const summa = lis.reduce((accumulator, currentValue) => accumulator + currentValue)
    console.log(summa)
    
    const lasku = summa / lis.length + lis1[lis1.length - 1]
    const tulos = Math.round(lasku)
  
   
    
    console.log(tulos)
    
    const button = document.getElementById("add-data")

    button.addEventListener("click", () => {

        years.push("2022")
        
        lis1.push(tulos)
        let dat = {
            labels: years,
    datasets: [
        {
            name: "Some Data", type: "bar",
            values: lis1
        }
        
    ]
}





let chart = new frappe.Chart("#chart", { 
                                            
    title: `population growth in ${inputti}`,
    data: dat,
    type: 'line', 
    height: 450,
    colors: ['#eb5146']
})
    })
    
  




    

    

    let dat = {
            labels: years,
    datasets: [
        {
            name: "Some Data", type: "bar",
            values: lis1
        }
        
    ]
}





let chart = new frappe.Chart("#chart", { 
                                            
    title: `population growth in ${inputti}`,
    data: dat,
    type: 'line', 
    height: 450,
    colors: ['#eb5146']
})


}




fetchcodes()
