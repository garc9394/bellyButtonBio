var response = ["BB_940", "BB_960"];
var select = document.getElementById("selDataset");

for (var i = 0; i < response.length; i++) {
    var opt = response[i];
    var ele = document.createElement("option");
    ele.textContent = opt;
    ele.value = opt;
    select.appendChild(ele);
}

// function getNames() {
//     var url = `/names`;

//     d3.json(url, function(error, response) {

//         if (error) {
//             return console.warn(error);
//         }

//         // response = ["BB_940", "BB_960"];
//         var select = document.getElementById("selDataset");
  
//         for (var i = 0; i < response.length; i++) {
//             var opt = response[i];
//             var ele = document.createElement("option");
//             ele.textContent = opt;
//             ele.value = opt;
//             select.appendChild(ele);
//         }
//     })
// }

function optionChanged() {

}