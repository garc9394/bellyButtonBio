# Import dependencies
from flask import Flask, jsonify, render_template

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Routes
#################################################


# Main route 
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/names')
def names():
    return jsonify()

@app.route('/otu')

@app.route('/metadata/<sample>')

@app.route('/wfreq/<sample>')

@app.route('/samples/<sample>')

if __name__ == "__main__":
    app.run(debug=True)