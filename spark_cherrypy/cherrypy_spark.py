#import numpy as np
from paste.translogger import TransLogger
import time
import json
from pyspark.context import SparkContext
from pyspark.sql import HiveContext
import cherrypy
from flask import Flask, request,Blueprint

sc = SparkContext()
sqlContext = HiveContext(sc)


main = Blueprint('main',__name__)

#table = sqlContext.sql("select bf_m1_arpu from skt_customer_mst where ( (cust_age_cd >= 30 and cust_age_cd <= 50) )").toDF("bf_m1_arpu").cache()

table = sqlContext.sql("select bf_m1_arpu from skt_customer_mst").toDF("bf_m1_arpu").cache()
quantiles = [0.25, 0.5, 0.75, 1.0]


@main.route('/test', methods=['GET'])  #can set first param to '/'
def toyFunction():
    start = time.time()
    qs = table.approxQuantile("bf_m1_arpu", quantiles,4.83293024e-04 )
    dt = time.time() - start


    return json.dumps(qs)

def create_app():

    app = Flask(__name__)
    app.register_blueprint(main)

    return app

def run_server(app):

    # Enable WSGI access logging via Paste
    app_logged = TransLogger(app)

    # Mount the WSGI callable object (app) on the root directory
    cherrypy.tree.graft(app_logged, '/')

    # Set the configuration of the web server
    cherrypy.config.update({
        'engine.autoreload.on': True,
        'log.screen': True,
        'server.socket_port': 5432,
        'server.socket_host': '0.0.0.0'
    })

    # Start the CherryPy WSGI web server
    cherrypy.engine.start()
    cherrypy.engine.block()




if __name__=="__main__":

    app = create_app()

    run_server(app)