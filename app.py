# Import dependencies
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

# sampleName = "BB_940"
# sample = "940"

@app.route("/names")
def getNames():
    sampleNamesList = []
    sampleNames = session.execute("SELECT SAMPLEID FROM samples_metadata").fetchall()
    for name in sampleNames:
        sampleNamesList.append('BB_' + str(name.SAMPLEID))

    # sampleNamesList = ["BB_940", "BB_960"]
    return jsonify(sampleNamesList)

@app.route('/otu')
def otu():
    class OTU(Base):
        __tablename__ = "otu"
        otu_id = Column(Integer, primary_key=True)
        lowest_taxonomic_unit_found = Column(Text)

    engine = create_engine('sqlite:///DataSets/belly_button_biodiversity.sqlite')
    Base.metadata.create_all(engine)
    session = Session(bind=engine)
    otuDesc = session.query(OTU)
    otuDescList = []
    for desc in otuDesc:
        otuDescList.append(desc.lowest_taxonomic_unit_found)

    return jsonify(otuDescList)

@app.route('/metadata/<sample>')
# @app.route('/metadata/BB_940')
def metadata(sample):
    sample = sample.replace("BB_", "")
    engine = create_engine('sqlite:///DataSets/belly_button_biodiversity.sqlite')
    Base.metadata.create_all(engine)
    session = Session(bind=engine)
    samplesMetadata = session.query(SamplesMetadata).filter_by(SAMPLEID=sample)

    for dataField in samplesMetadata:
        samplesData = {"AGE": dataField.AGE, 
                        "BBTYPE": dataField.BBTYPE, 
                        "ETHNICITY": dataField.ETHNICITY, 
                        "GENDER": dataField.GENDER, 
                        "LOCATION": dataField.LOCATION, 
                        "SAMPLEID": dataField.SAMPLEID}

    return jsonify(samplesData)

@app.route('/wfreq/<sample>')
# @app.route('/wfreq/BB_940')
def wfreq(sample):
    sample = sample.replace("BB_", "")
    engine = create_engine('sqlite:///DataSets/belly_button_biodiversity.sqlite')
    Base.metadata.create_all(engine)
    session = Session(bind=engine)
    wfreqMetadata = session.query(SamplesMetadata).filter_by(SAMPLEID=sample)
    for dataField in wfreqMetadata:
        # wfreqData[sample].append('BB_' + str(name.SAMPLEID))
        wfreqData = {"WFREQ": dataField.WFREQ}

    return jsonify(wfreqData)

@app.route('/samples/<sample>')
# @app.route('/samples/BB_940')
def samples(sample):
    engine = create_engine('sqlite:///DataSets/belly_button_biodiversity.sqlite')
    Base.metadata.create_all(engine)
    session = Session(bind=engine)
    sample_ids = session.query(Samples).filter(sample).order_by(desc('otu_id'))
    sampleIdsList = []
    for sampleId in sample_ids:
        sampleIdsList.append(sampleId.otu_id)

    sample_values = session.query(Samples).filter(sample).order_by(desc(sample))
    sampleValuesList = []
    for sampleValue in sample_values:
        sampleValuesList.append(sampleValue.BB_940)

    sampleData = {"otu_ids": sampleIdsList,
                    "sample_values": sampleValuesList}
    return jsonify(sampleData)


if __name__ == "__main__":
    app.run(debug=True)