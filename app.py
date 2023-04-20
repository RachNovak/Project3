import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2
from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

###############################################
# Database Setup
###############################################
## declare the connection string specifying the host name database name, user name and password
conn_string = "host= 'localhost' dbname= 'project3'\
<<<<<<< HEAD
user= 'postgres' password= 'admin'"
=======
user= 'postgres' password= 'Mahyar@378'"
>>>>>>> bf6cf63638d587019daf78ce430904373df54e02

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
    f"/api/v1.0/australia<br/>"
    f"/api/v1.0/totalemissions<br/>"
    f"/api/v1.0/coal<br/>"
    f"/api/v1.0/oil<br/>"
    f"/api/v1.0/gas<br/>"
    f"/api/v1.0/cement<br/>"
    f"/api/v1.0/flaring<br/>"
    f"/api/v1.0/australia<br/>"
    )

#Create function for total page
@app.route("/api/v1.0/finalemissions")
def final():
    
    conn = psycopg2.connect(conn_string)
    
    final = pd.read_sql('select * from final', conn)
    
   
    return final.to_json(orient = 'records')


#Create function for total page
@app.route("/api/v1.0/australia")
def australia():
    
    conn = psycopg2.connect(conn_string)
    
    final = pd.read_sql('select * from australia', conn)
    
   
    return final.to_json(orient = 'records')


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

#Create function for total page
@app.route("/api/v1.0/australia")
def australia():
    
    conn = psycopg2.connect(conn_string)
    
    final = pd.read_sql('select * from australia', conn)
    
   
    return final.to_json(orient = 'records')
    # return jsonify(total.loc[:, ['country', 'total']])
    # return jsonify(list(total_dictionary))

if __name__ == '__main__':
    app.run(debug=True)