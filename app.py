import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2
from flask import Flask, jsonify, render_template, request, redirect, url_for
import numpy as np

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

#create a cursor
cur = conn.cursor()

#cur.execute("SELECT * FROM emissions")

#commit changes
#conn.commit()

#close the cursor and connection
cur.close()
conn.close()


#################################################
# Flask Routes
#################################################
@app.route("/")
def index():
    #connect to the database
    conn = psycopg2.connect(database = "project3", 
                            user='postgres', 
                            password= '3LetterAnatomy', 
                            host='localhost', port='5432')
    #create a cursor
    cur = conn.cursor()
    
    #Select all products from the table
    cur.execute('SELECT * FROM emissions')
    
    #Fetch the data
    data = cur.fetchall()
    
    #close the cursor and connection
    cur.close()
    conn.close()
    
    #return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)