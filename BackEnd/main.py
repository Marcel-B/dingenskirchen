# This is a sample Python script.

# Press Umschalt+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
from flask import Flask,jsonify,request
from flask_api import status
from flask_cors import CORS
import datetime
import sqlite3

con = sqlite3.connect('haushaltsbuch.db')

app = Flask(__name__)
CORS(app)

@app.route('/haushaltsbuch/posten', methods = ['POST'])
def posten_new():
    content = request.get_json()
    print(content)
    return "OK", status.HTTP_200_OK

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    cur = con.cursor()
    # Create table
    cur.execute('''CREATE TABLE IF NOT EXISTS Buchungen
                   (date text, trans text, symbol text, qty real, price real)''')

    con.commit()
    con.close()
    app.run(port=5044)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
