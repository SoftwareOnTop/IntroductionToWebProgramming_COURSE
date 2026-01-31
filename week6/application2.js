
const area = localStorage.getItem("selectedArea")

console.log(area)
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
                    
                    "vm01",
                    "vm11"
                    
                    
                    
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
}

const getData = async () => {
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

const buildChart = async () => {

    let data = await getData()
    
    const years = Object.values(data.dimension.Vuosi.category.label);
    const values = data.value;
    console.log(values)
    let i = 0
    let lis2 = []
    let lis1 = []

    console.log(values.length)

    for(let i = 1; i < (values.length / 2) + 1; i++) {
        lis1.push(values[(i-1)*2])
        lis2.push(values[1+(i-1)*2])


    }
    
    
    console.log(lis1)




    

    

    let dat = {
            labels: years,
    datasets: [
        {
            name: "Births", type: "bar",
            values: lis1
        },
        {
            name: "Deaths", type: "bar",
            values: lis2
        }
        
    ]
}





let chart = new frappe.Chart("#chart", { 
                                            
    title: `Births and deaths in ${localStorage.getItem("selectedArea2")}`,
    data: dat,
    type: 'bar', 
    height: 450,
    colors: ['#63d0ff', '#363636']
})


}


buildChart()
