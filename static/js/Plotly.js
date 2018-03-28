var namesUrl = "/names";

d3.json(namesUrl, function(error, samples) {

    if (error) {
        return console.warn(error);
    }

    var select = document.getElementById("selDataset");

    for (var i = 0; i < samples.length; i++) {
        var optVal = samples[i];
        var option = document.createElement("option");
        option.textContent = optVal;
        option.value = optVal;
        select.appendChild(option);
    }
});

function optionChanged(sample) {

    var sampleUrl = "/metadata/";
    d3.select('#sampleSummary').selectAll('li').remove();
    d3.json(sampleUrl + sample, function(error, samplesData) {

        d3.select('#sampleSummary')
        .append('li').attr('id', 'age').text('AGE: ' + samplesData["AGE"])
        .append('li').attr('id', 'bbtype').text('BBTYPE: ' + samplesData["BBTYPE"])
        .append('li').attr('id', 'ethnicity').text('ETHNICITY: ' + samplesData["ETHNICITY"])
        .append('li').attr('id', 'gender').text('GENDER: ' + samplesData["GENDER"])
        .append('li').attr('id', 'location').text('LOCATION: ' + samplesData["LOCATION"])
        .append('li').attr('id', 'sampleid').text('SAMPLEID: ' + samplesData["SAMPLEID"])

    });

    // var sampleValueUrl = "/samples/";
    var sampleValues = [19, 26, 55];
    // d3.json(sampleValueUrl + sample, function(error, sampleIdsList) {
    //     // for (i = 0; i < 10; i++) { 
    //         sampleValues.push(sampleIdsList["sample_value"]);
    //     // }
    // });

    // var namesUrl = "/otu";
    // d3.json(namesUrl, function(error, otuDescList) {
    //     console.log(otuDescList);
    // });

    var labelValues = ['Residential', 'Non-Residential', 'Utility'];

    var data = [{
        values: sampleValues,
        labels: labelValues,
        type: 'pie'
    }];
    
    var layout = {
    height: 350,
    width: 400
    };
    
    Plotly.newPlot('pieChart', data, layout);

    // var sampleValueUrl = "/samples/"

    // // d3.select('#sampleValues').selectAll('li').remove();
    // d3.select('#pieChart').selectAll('li').remove();

    // d3.json(sampleValueUrl + sample, function(error, sampleIdsList) {

    //     console.log(sampleIdsList);
    //     // d3.select('#sampleValues')
    //     // d3.select('#pieChart')
    //     // .append('li').attr('id', '1st_value').text(sampleIdsList[1])

    // });



    /////////////////////////////////////
    // for SQL query verification only //
    /////////////////////////////////////

    // var namesUrl = "/names";
    // d3.json(namesUrl, function(error, samples) {
    //     console.log(samples);
    // });

    // var namesUrl = "/otu";
    // d3.json(namesUrl, function(error, otuDescList) {
    //     console.log(otuDescList);
    // });

    // var sampleUrl = "/metadata/";
    // d3.json(sampleUrl + sample, function(error, samplesData) {
    //     console.log(samplesData);
    // });

    // var wfreqUrl = "/wfreq/";
    // d3.json(wfreqUrl + sample, function(error, wfreq) {
    //     console.log(wfreq);
    // });

    // var sampleValueUrl = "/samples/";
    // d3.json(sampleValueUrl + sample, function(error, sampleIdsList) {
    //     console.log(sampleIdsList);
    // });
}