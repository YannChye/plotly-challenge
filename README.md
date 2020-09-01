# plotly-challenge

Completed plotly (week 15) homework for Monash University Data Analytics Boot Camp.

Goal is to create an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

Folder structure include - 
* **samples.json** dataset file
* **index.html** page for [Belly Button Biodiversity Dashboard](https://yannchye.github.io/plotly-challenge/)
* **/static/js/** folder containing javascript code to read the *samples.json* data and render metadata and plots on the dashboard. Contains
    * **app.js** file - to create bar and bubble chart via plotly, and sample metadata
    * **bonus.js** file - to create the bonus gauge chart, referencing code from [here](https://com2m.de/blog/technology/gauge-charts-with-plotly/)