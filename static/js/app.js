function init() {
    var dropDown=d3.select("#selDataset");
    //populate dropdown options
    d3.json("samples.json").then(data => {
        var subIDs=data.names;
        subIDs.forEach((subID) => {
            dropDown.append("option").text(subID).property("value",subID);
        })
    })
    //initial metadata-using subject 940
    getMetadata("940");
    //initial otu data
    d3.json("samples.json").then(data => {
        var selected=data.samples.filter(sample => sample.id==="940");
        var otuIds=selected[0].otu_ids;
        var otuLabels=selected[0].otu_labels;
        var otuVals=selected[0].sample_values;
        //initial bar chart
        var traceBar={
            type:"bar",
            y:otuIds.slice(0,10).reverse().map(id=>`OTU ${id}`),
            x:otuVals.slice(0,10).reverse(),
            text:otuLabels.slice(0,10).reverse(),
            orientation:"h"
        };
        var dataBar=[traceBar];
        Plotly.newPlot("bar",dataBar);
        //initial bubble chart
        var traceBubble={
            type:"bubble",
            x:otuIds,
            y:otuVals,
            text:otuLabels,
            mode:"markers",
            marker:{
                color:otuIds,
                colorscale:"Viridis",
                opacity:[0.8],
                size:otuVals,
                sizemode:"area",
                sizeref:0.2
            }
        };
        var dataBubble=[traceBubble];
        var layoutBubble={
            showlegend:false,
            xaxis:{title:"OTU ID"},
            yaxis:{title:"sample values"},
            width:1000
        };
        Plotly.newPlot("bubble",dataBubble,layoutBubble);
    })
}
//update subject otus based on dropdown selection
function updateSubject(subject) {
    d3.json("samples.json").then(data => {
        var selected=data.samples.filter(sample => sample.id===subject);
        var otuIds=selected[0].otu_ids;
        var otuLabels=selected[0].otu_labels;
        var otuVals=selected[0].sample_values;
        //update bar chart
        Plotly.restyle("bar", "x", [otuVals.slice(0,10).reverse()]);
        Plotly.restyle("bar", "y", [otuIds.slice(0,10).reverse().map(id=>`OTU ${id}`)]);
        Plotly.restyle("bar", "text", [otuLabels.slice(0,10).reverse()]);
        //update bubble chart
        var marker={
            color:otuIds,
            colorscale:"Viridis",
            opacity:[0.8],
            size:otuVals,
            sizemode:"area",
            sizeref:0.2}
        Plotly.restyle("bubble", "x", [otuIds]);
        Plotly.restyle("bubble", "y", [otuVals]);
        Plotly.restyle("bubble", "text", [otuLabels]);
        Plotly.restyle("bubble", "marker", [marker]);
    })
}
//get and populate subject metadata
function getMetadata(subject) {
    d3.json("samples.json").then(data => {
        var metadata=data.metadata;
        var selected=metadata.filter(sample => sample.id===parseInt(subject));
        d3.select("#sample-metadata").selectAll("*").remove();
        Object.entries(selected[0]).forEach(([key, value]) =>
            {if (value.length>15) {value=value.replace("/","/\n")};
            d3.select("#sample-metadata").append("li").style("list-style-type","none").text(`${key}: ${value}`)}
        ) 
    })
}
function optionChanged(subject) {
    getMetadata(subject);
    updateSubject(subject);
    changeGauge(subject);
}
init();
