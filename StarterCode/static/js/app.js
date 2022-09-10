const link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"



d3.json(link).then(function (data) {
    console.log(data);
    var names = data.names
    var selectTag = d3.select("select");

    for (let i = 0; i < names.length; i++){
        selectTag.append("option").text(names[i]).attr("value", names[i])
    }
    buildBubbleBar(names[0])
    demographic(names[0])
});

function demographic(name){
    d3.json(link).then(function(data) {
        let metadata = data.metadata;
        let found = metadata.find(({id}) => id == name)
        console.log(found)
        demoDiv = d3.select("#sample-metadata")
        demoDiv.html(null)
        for (key in found) {
            demoDiv.append("p").text(`${key}: ${found[key]}`)
        }
    })
}

function buildBubbleBar(name){
    d3.json(link).then(function(data) {
        let samples = data.samples;
        let found = samples.find(({id}) => id == name)
        //console.log(found)
        //console.log(found.otu_ids.slice(0,10).map(x => "OTU "+ x))
        var barData = [{
            type: "bar",
            x: found.sample_values.slice(0,10).reverse(),
            y: found.otu_ids.slice(0,10).map(x => "OTU "+ x).reverse(),
            text: found.otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }]
        Plotly.newPlot("bar", barData)

        var bubbleData = [{
            x: found.otu_ids,
            y: found.sample_values,
            mode: "markers",
            marker: {
                size: found.sample_values,
                color: found.otu_ids
            },
            text: found.otu_labels
        }]
        var layout = {
            title: "OTU ID",
        }
        Plotly.newPlot("bubble", bubbleData, layout)
    });
};

function optionChanged(name){
    buildBubbleBar(name)
    demographic(name)
};