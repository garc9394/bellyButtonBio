function getNames() {
    var url = `/names`;

    Plotly.d3.json(url, function(error, response) {

        if (error) {
            return console.warn(error);
        }

        var $name = response.sampleNamesList.name;
        // document.getElementById("selDataset");
    })
}

function optionChanged() {

}