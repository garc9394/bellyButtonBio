# Import dependencies
from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Routes
#################################################


# Main route 
# @app.route('/')
# def home():
#     return render_template('index.html')

@app.route('/names')
def names():
    # return jsonify()

    Base = declarative_base()

    class Samples(Base):
        __tablename__ = "samples"
        # otu_id = Column(Integer, primary_key=True)

    # Create Database Connection
    # ----------------------------------
    # Establish Connection to database
    engine = create_engine('sqlite:///DataSets/belly_button_biodiversity.sqlite')
    Base.metadata.create_all(engine)
    session = Session(bind=engine)
    # Print all of the player names in the database
    sampleNames = session.query(Samples.column_descriptions)# Samples.columns.keys().name
    # What kind of object is `players`?
    # print(f'\nSample name: {sampleNames}')
    # Type of `players`: <class 'sqlalchemy.orm.query.Query'>
    # http://docs.sqlalchemy.org/en/latest/orm/query.html

# @app.route('/otu')

# @app.route('/metadata/<sample>')

# @app.route('/wfreq/<sample>')

# @app.route('/samples/<sample>')

if __name__ == "__main__":
    app.run(debug=True)