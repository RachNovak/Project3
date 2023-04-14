import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2
from flask import Flask, jsonify, render_template, request, redirect, url_for
import numpy as np
import pandas as pd

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


###############################################
# Database Setup
###############################################
## declare the connection string specifying the hose name database name, user name and password
conn_string = "host= 'localhost' dbname= 'project3'\
user= 'postgres' password= '3LetterAnatomy'"

#use connect function to establish the connection to the database
conn = psycopg2.connect(conn_string)

#Query all records in the database
data = pd.read_sql('select * from emissions', conn)


#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    
    conn = psycopg2.connect(conn_string)
    
    data = pd.read_sql('select * from emissions', conn)
    
    return data.to_json()



if __name__ == '__main__':
    app.run(debug=True)