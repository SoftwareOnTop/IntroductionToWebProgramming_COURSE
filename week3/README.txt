his week you are going to get familiarized with fetching data from an API and styling a webpage with CSS. This week’s goal is to make a table that shows population data from different municipalities. 

Note! API URL's updated 16.06.2025.

Added a video example of the modified request to the new API's.



1. Creating the table
Create a <table> element and add <thead> element and a <tbody> element to it. The <thead> element should have 2 <th> elements: municipality and population. The <tbody> should be populated with data fetched from https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11ra.px (the data should be fetched upon page load) with a POST request using the population_query.json as the body of the request.

You can download the file for the population query below.



population_query.json

The municipalities can be found in dataset.dimension.Alue.category.label dimension.Alue.category.label
The values can be found in dataset.value value (.value)

2. Styling the table
With plain HTML the table looks frankly horrible. Let’s add some styling to make it more tolerable. To make the table look a little better add the following styling: 

The body should have the font-family “Verdana, Arial, sans-serif” 
The table data cells (td elements) should have the following styling: 
Padding of 6px 
1 pixel wide solid gray bottom border 
The table header (th elements) should be adjusted as well to make it stand out better. 
The table header should have: 
Background color “#b7d0ff” 
Bold font 
Padding of “12px 0px 12px 6px” 
Border-bottom of “2px solid gray” 
And finally, the table:
The table should have the property “border-collapse” set to “collapse” 
The table should have the font size of 16px and the text should be aligned left 
3. Additional styling

Currently, the table is too narrow. Let’s center it and expand it. Create a div and give it “center” class. Put the table inside it. In addition to the table, create a <h1> tag that should contain a header for the table, for example "Municipality employment statistics in Finland". The “center” class should have the following styling: 

Margin should be set to “auto” 
Padding should be 60px 
Width should be set to 60% 
The table should also get adjusted:

The table should have the “table-layout” set to “fixed” 
The table should have its width set to 100%
The text for the <h1> tag should also be centered.

Also, the even table rows should have the background color of “#f2f2f2”. Other rows (except for the header) should have a background color of "#ffffff"

4. Additional data
Let’s add more data to the table. Add one extra column to the table header called “Employment amount” and populate the column with data from https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyokay/statfin_tyokay_pxt_115b.px. You can get the data using a POST request with the body from the file employment_query.json included.

You can download the file for the employment query below.

employment_query.json


5. Conditional styling
Add one extra column to the table called “Employment-%”. Calculate the percentage of employment by municipality, rounded to two decimals. 
The rows (tr element) with over 45% employment should have a background color of “#abffbd” 
The rows (tr element) with under 25% employment should have a background color of “#ff9e9e”

Example table:






API example request