from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

app = Flask(__name__)

engine = create_engine('sqlite:///DataSets/belly_button_biodiversity.sqlite')

Base = automap_base()
Base.prepare(engine, reflect=True)

session = Session(engine)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/names")
def getNames():
    sampleNamesList = []
    sampleNames = session.execute("SELECT SAMPLEID FROM samples_metadata").fetchall()
    for name in sampleNames:
        sampleNamesList.append('BB_' + str(name.SAMPLEID))

    return jsonify(sampleNamesList)

@app.route('/otu')
def otu():
    otuIdList = []
    otuDescList = []
    otuList = []
    otuDict = {}
    otuDesc = session.execute("SELECT otu_id, lowest_taxonomic_unit_found FROM otu").fetchall()
    for desc in otuDesc:
        otuIdList.append(desc.otu_id)
        otuDescList.append(desc.lowest_taxonomic_unit_found)

    otuDict = {"otu_ids": otuIdList, 
                "otu_desc": otuDescList}
    otuList.append(otuDict)

    return jsonify(otuList)

@app.route('/metadata/<sample>')
def metadata(sample):
    sample = sample.replace("BB_", "")
    samplesData = {}
    samplesMetadata = session.execute("SELECT * FROM samples_metadata WHERE SAMPLEID = :sample", {"sample":sample}).fetchall()
    for dataField in samplesMetadata:
        samplesData = {"AGE": dataField.AGE, 
                        "BBTYPE": dataField.BBTYPE, 
                        "ETHNICITY": dataField.ETHNICITY, 
                        "GENDER": dataField.GENDER, 
                        "LOCATION": dataField.LOCATION, 
                        "SAMPLEID": dataField.SAMPLEID}

    return jsonify(samplesData)

@app.route('/wfreq/<sample>')
def wfreq(sample):
    sample = sample.replace("BB_", "")
    wfreqData = session.execute("SELECT WFREQ FROM samples_metadata WHERE SAMPLEID = :sample", {"sample":sample}).fetchall()
    for wfreqField in wfreqData:
        wfreq = str(wfreqField.WFREQ)
    return jsonify(wfreq)

@app.route('/samples/<sample>')
def samples(sample):
    sqlQuery = "SELECT otu_id, " + sample + " AS sample_value FROM samples WHERE " + sample + " > 0 ORDER BY " + sample + " DESC LIMIT 10"
    sample_ids = session.execute(sqlQuery).fetchall()

    idsList = []
    valuesList = []
    sampleIdsList = []
    sampleDict = {}
    for sampleId in sample_ids:
        idsList.append(sampleId.otu_id)
        valuesList.append(sampleId.sample_value)

    sampleDict = {"otu_ids": idsList, 
                    "sample_values": valuesList}
    sampleIdsList.append(sampleDict)

    return jsonify(sampleIdsList)

if __name__ == "__main__":
    app.run(debug=True)