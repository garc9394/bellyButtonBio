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

    var sampleValueUrl = "/samples/";
    d3.json(sampleValueUrl + sample, function(error, sampleIdsList) {

        var sampleValues = [];
        var labelValues = [];
        for (i=0; i<10; i++) {
            sampleValues.push(sampleIdsList[0].sample_values[i]);
            labelValues.push(sampleIdsList[0].otu_ids[i]);
        }

        var namesUrl = "/otu";
        d3.json(namesUrl, function(error, otuDescList) {

            var otuDescValues = [];
            for (i=0; i<labelValues.length; i++) {
                otuIdx = labelValues[i] - 1;
                otuDescValues.push(otuDescList[otuIdx]);
            }

            var data = [{
                values: sampleValues,
                labels: labelValues,
                text: otuDescValues,
                textinfo: 'none',
                type: 'pie'
            }];
            
            var layout = {
            height: 550,
            width: 550
            };
            
            Plotly.newPlot('pieChart', data);
        });

    });

    var wfreqUrl = "/wfreq/";
    d3.json(wfreqUrl + sample, function(error, wfreq) {

        var level = wfreq;

        var degrees = 9 - level,
            radius = .5;
        var radians = degrees * Math.PI / 9;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
        x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'scrubs',
            text: level,
            hoverinfo: 'text+name'},
        { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6',
                    '4-5', '3-4', '2-3', '1-2', '0-1'],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                                'rgba(170, 202, 42, .5)', 'rgba(186, 204, 84, .5)',
                                'rgba(196, 206, 122, .5)', 'rgba(202, 214, 154, .5)',
                                'rgba(212, 216, 182, .5)', 'rgba(222, 218, 202, .5)',
                                'rgba(232, 226, 224, .5)', 'rgba(255, 255, 255, 0)']},
        labels: ['8-9', '7-8', '6-7', '5-6',
        '4-5', '3-4', '2-3', '1-2', '0-1'],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: 'Washing Frequency - Scrubs per Week',
        height: 425,
        width: 425,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gaugeChart', data, layout);

    });

    var sampleValueUrl = "/samples/";
    d3.json(sampleValueUrl + sample, function(error, sampleIdsList) {

        var sampleValues = sampleIdsList[0].sample_values;
        var labelValues = sampleIdsList[0].otu_ids;

        var namesUrl = "/otu";

        d3.json(namesUrl, function(error, otuDescList) {

            var otuDescValues = [];
            var hoverText = [];
            for (i=0; i<labelValues.length; i++) {
                otuIdx = labelValues[i] - 1;
                otuDescValues.push(otuDescList[otuIdx]);
                hoverText.push(labelValues[i] + " - " + otuDescList[otuIdx]);
            }

            var trace1 = {
                x: labelValues,
                y: sampleValues,
                text: hoverText,
                mode: 'markers',
                marker: {
                color: labelValues,
                colorscale: 'Viridis',
                size: sampleValues,
                sizeref: 0.03,
                sizemode: 'area',
                opacity: [0.6, 0.7, 0.8, 0.9]
                },
                type: 'scatter'
            };

            var data = [trace1];
            
            var layout = {
                showlegend: false,
                height: 550,
                width: 1050
              };
            
            Plotly.newPlot('bubbleChart', data, layout);
        
        });

    });
}