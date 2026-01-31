his week you are going to learn JSON POST requests and get familiarized with Frappe-chart JavaScript library. The goal of this week is to make a website that shows the population growth in a municipality in Finland.

1. Fetching data with POST
Create a post request to https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px upon page load and get the population data from the whole country. This data doesn’t have to be displayed anywhere yet. 

The request body consists of an array of objects. 

The first object (“Vuosi”) determines which years the data will be get from. We want to select the years 2000-2021. (You don’t have to worry about this) 

The second object (“Alue”) determines in which area the data is get from. The API requires the area to be in a municipality code form. The code for the whole country is “SSS”. 

The third object (“Tiedot”) determines which data we want from the API. The code to get population data is “vaesto”. (You only have to worry about this in task 5) 

An example POST request to get population data from the whole country:

{<br>    "query": [<br>        {<br>            "code": "Vuosi",<br>            "selection": {<br>                "filter": "item",<br>                "values": [<br>                    "2000",<br>                    "2001",<br>                    "2002",<br>                    "2003",<br>                    "2004",<br>                    "2005",<br>                    "2006",<br>                    "2007",<br>                    "2008",<br>                    "2009",<br>                    "2010",<br>                    "2011",<br>                    "2012",<br>                    "2013",<br>                    "2014",<br>                    "2015",<br>                    "2016",<br>                    "2017",<br>                    "2018",<br>                    "2019",<br>                    "2020",<br>                    "2021"<br>                ]<br>            }
        },
        {<br>            "code": "Alue",<br>            "selection": {<br>                "filter": "item",<br>                "values": [<br>                    "SSS"<br>                ]<br>            }
        },
        {<br>            "code": "Tiedot",<br>            "selection": {<br>                "filter": "item",<br>                "values": [<br>                    "vaesto"<br>                ]<br>            }
        }
    ],
    "response": {<br>        "format": "json-stat2"<br>    }
}
Don't forget to set the content-type header to application/json!


2. Adding data to chart
Import the Frappe-chart.js library to your project. Use the "include it directly in your HTML" version. Use the version provided by unpkg ("https://unpkg.com/frappe-charts@latest")

After importing the library, add a div with the id “chart”. Map the fetched data on this chart. 

The chart should have the correct styling:

It should be 450 high
It should be of “line” type
The line should have the color '#eb5146'
The chart labels on the x axis should be the years ranging from 2000 to 2021
The chart should have  title. 
 
3. Editing POST request body

Currently, the website only fetches the data from the whole country. To make the website a little more interesting, add a form that has an input field with an id of "input-area", where the user can type a municipality and a button with an id of "submit-data". After clicking the button the website tries to fetch the data of that municipality and put it to the chart. The search function should be case insensitive.

You have to edit the second object (Alue) of the JSON post body. The Alue field accepts only the area codes, not area names. You can get the municipality codes from https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px with a simple GET request (They are in the second object; the first array is the codes, and the second array is the area names).

 4. Simple data prediction

Let’s add some data predictions to the population chart. Add a button with the id of “add-data”. This button should add a data point to the chart using the following formula: 

Calculate the mean value of the delta of every data point 
Add the mean value to the last data point. 
For example, with the values of [5, 2, 4, -1] the next data point would be: ((2−5)+(4−2)+((−1)−4))/3+(−1)=(2−3−5)/3−1=(−6)/3−1=−3
 => [5, 2, 4, -1, -3]

5. Fetching additional data
The API provides additional data that we can utilize. Add means of navigation (for example, <a> tag or a button) with an id of “navigation” that navigates to /newchart.html. This page should contain a bar type chart which shows the births and deaths of the same municipality as the main page as well as means of navigation (for example, <a> tag or a button) with an id of “navigation” that navigates to /index.html.

Now you have to edit the third object of the post body (“Tiedot”) in order to get the data you want. The code to get birth data is “vm01” and the code to get death data is “vm11”.

Map the birth and death data into the chart. 

Like in the first task, the chart should have the correct styling.

It should be 450 high
It should be of “bar” type.
The birth data bars should have the color '#63d0ff'
The death bars should have the color '#363636'.
The chart labels on the x axis should be the years ranging from 2000 to 2021. 
The chart should have a title
Example charts:

index.html:




newchart.html: