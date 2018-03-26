// var response = ["BB_940", "BB_960"];

// for (var i = 0; i < response.length; i++) {
//     var optVal = response[i];
//     var option = document.createElement("option");
//     option.textContent = optVal;
//     option.value = optVal;
//     var select = document.getElementById("selDataset");
//     select.appendChild(option);
// }

// getNames();

// function getNames() {
    var url = "/names";

    // d3.json("/names", function(error, response) {
    d3.json(url, function(error, response) {

        if (error) {
            return console.warn(error);
        }

        // console.log(response);
        // response = ["BB_940", "BB_960"];
        var select = document.getElementById("selDataset");
  
        for (var i = 0; i < response.length; i++) {
            var optVal = response[i];
            var option = document.createElement("option");
            option.textContent = optVal;
            option.value = optVal;
            select.appendChild(option);
        }
    });
// }

function optionChanged() {
    // var sample = document.getElementById('selDataset'.value);
    // console.log(sample)
    var sampleValue = sample;
    var sampleUrl = "/samples/";
    // var url = "/samples/BB_940";

    d3.select('#sampleSummary').selectAll('li').remove();

    // d3.json(url, function(error, response) {

    //     if (error) {
    //         return console.warn(error);
    //     }

    //     for (var i = 0; i < response.length; i++) {
    //         console.log(response[i]);
    //     }
    // });
}