//initial gauge chart
//adapted from https://com2m.de/blog/technology/gauge-charts-with-plotly/
function init() {
    d3.json("./data/samples.json").then(data => {
        // getting wash freq from subject 940
        var wFreq=data.metadata.filter(sample => sample.id===940)[0].wfreq;
        // creating pointer
        var path=needlePath(wFreq);
        // creating gauge
        // using pie instead of gauge because can't change the gauge width "pie hole" with plotly gauge to match example screenshot
        var dataGauge = [{ 
                type:"scatter",
                x:[0],
                y:[0],
                marker:{size:14,color:'850000'},
                showlegend:false},
                {values: [1,1,1,1,1,1,1,1,1,9],
                rotation: 90,
                text: ["8-9","7-8","6-7","5-6","4-5","3-4","2-3","1-2","0-1"," "],
                textinfo: 'text',
                textposition:'inside',
                hoverinfo:"none",
                marker: {colors:['rgb(103,165,123)','rgb(120,179,130)','rgb(137,192,137)',
                    'rgb(177,212,158)','rgb(213,229,158)','rgb(230,232,179)',
                    'rgb(240,237,204)','rgb(245,241,229)','rgb(248,246,242)',
                     'rgba(0,0,0,0)']},
                hole:.5,
                type: 'pie',
                showlegend: false
            }];
        var layoutGauge = {
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per week" }, 
            shapes:[{
                type:"path",
                path:path,
                fillcolor:"850000",
                line: {color:"850000"}
            }],
            xaxis: {zeroline:false,showticklabels:false,showgrid:false,range:[-1, 1]},
            yaxis: {zeroline:false,showticklabels:false,showgrid:false,range:[-1, 1]}
        };
        Plotly.newPlot("gauge",dataGauge,layoutGauge);
    })
}
//update gauge needle when subject dropdown changes
function changeGauge(subject) {
    d3.json("./data/samples.json").then(data => {
        var wFreq=data.metadata.filter(sample => sample.id===parseInt(subject))[0].wfreq;
        var path=needlePath(wFreq);
        var layoutUpdate = {type:"path",
                path:path,
                fillcolor:"850000",
                line: {color:"850000"}};
        Plotly.relayout("gauge", "shapes", [layoutUpdate])
       })};
//creating needle path as per https://com2m.de/blog/technology/gauge-charts-with-plotly/
function needlePath(value) {
    var degrees = (9-value)/9*180;
    var x = 0.5 * Math.cos(degrees * Math.PI / 180);
    var y = 0.5 * Math.sin(degrees * Math.PI / 180);
    var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
    var mainPath=path1;
    var pathX=String(x);
    var space=" ";
    var pathY=String(y);
    var pathEnd=" Z";
    var path=mainPath.concat(pathX,space,pathY,pathEnd);
    return path
}
init()
