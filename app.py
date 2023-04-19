import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2
from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import chart_studio
import chart_studio.plotly as py
import chart_studio.tools as tls
chart_studio.tools.set_credentials_file(username='Mika.Mo', api_key='NNQVku6hazjx6P4NKc1e')

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

###############################################
# Database Setup
###############################################
## declare the connection string specifying the hose name database name, user name and password
conn_string = "host= 'localhost' dbname= 'project3'\
user= 'postgres' password= 'Mahyar@378'"

#use connect function to establish the connection to the database
conn = psycopg2.connect(conn_string)

#Query all records in the database
data = pd.read_sql('select * from final', conn)


#################################################
# Flask Routes
#################################################
@app.route("/")
#Create function for welcome page
def welcome():
    return(
    
    f"Welcome to the CO2 Emissions by Country API!<br/>"
    f"Available Routes:<br/>"
    f"/api/v1.0/finalemissions<br/>"
    f"/api/v1.0/totalemissions<br/>"
    f"/api/v1.0/coal<br/>"
    f"/api/v1.0/oil<br/>"
    f"/api/v1.0/gas<br/>"
    f"/api/v1.0/cement<br/>"
    f"/api/v1.0/flaring<br/>"
    f"/api/v1.0/bubblechart<br/>"
    )

#Create function for total page
@app.route("/api/v1.0/finalemissions")
def final():
    
    conn = psycopg2.connect(conn_string)
    
    final = pd.read_sql('select * from final', conn)
    
   
    return final.to_json(orient = 'records')
    # return jsonify(total.loc[:, ['country', 'total']])
    # return jsonify(list(total_dictionary))


#Create function for total page
@app.route("/api/v1.0/totalemissions")
def total():
    
    conn = psycopg2.connect(conn_string)
    
    total = pd.read_sql('select * from total', conn)
    
   
    return total.to_json(orient = 'records')
    # return jsonify(total.loc[:, ['country', 'total']])
    # return jsonify(list(total_dictionary))

#Create function for coal page
@app.route("/api/v1.0/coal")
def coal():
    conn = psycopg2.connect(conn_string)
    
    coal = pd.read_sql('select * from coal', conn)
    
    return coal.to_json(orient = 'records')

#Create function for oil page
@app.route("/api/v1.0/oil")
def oil():
    conn = psycopg2.connect(conn_string)
    
    oil = pd.read_sql('select * from oil', conn)
    
    return oil.to_json(orient = 'records')

#Create function for gas page
@app.route("/api/v1.0/gas")
def gas():
    conn = psycopg2.connect(conn_string)
    
    gas = pd.read_sql('select * from gas', conn)
    
    return gas.to_json(orient = 'records')

#Create function for cement page
@app.route("/api/v1.0/cement")
def cement():
    conn = psycopg2.connect(conn_string)
    
    cement = pd.read_sql('select * from cement', conn)
    
    return cement.to_json(orient = 'records')

#Create function for flaring page
@app.route("/api/v1.0/flaring")
def flaring():
    conn = psycopg2.connect(conn_string)
    
    flaring = pd.read_sql('select * from flaring', conn)
    
    return flaring.to_json(orient = 'records')

#Create function for bubble chart
@app.route("/api/v1.0/bubblechart")
def bubblechart():
    # query the final table for the required data
    query = """
    SELECT country, SUM("total") AS total_emissions
    FROM final
    GROUP BY country
    """
    df = pd.read_sql(query, conn)
    
    # create a JSON object that includes the required data for the chart
    chart_data = {
        "datasets": [
            {
                "label": "CO2 Emissions",
                "backgroundColor": "rgba(255, 99, 132, 0.6)",
                "borderColor": "rgba(255, 99, 132, 1)",
                "data": df.to_dict('records')
            }
        ]
    }

    return jsonify(chart_data)


if __name__ == '__main__':
    app.run(debug=True)