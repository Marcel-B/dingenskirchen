# This is a sample Python script.

# Press Umschalt+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
from flask import Flask,request
from flask_cors import CORS
import sqlite3

con = sqlite3.connect('haushaltsbuch.db')

app = Flask(__name__)
CORS(app)

@app.route('/haushaltsbuch/posten', methods = ['POST'])
def posten_new():
    content = request.get_json()
    buchung=content['buchung']
    cur=con.cursor()

    cur.execute('''INSERT INTO Buchungen VALUES ()''')

    print(content)
    return "OK"

# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    cur = con.cursor()
    # Create table
    # cur.execute('''CREATE TABLE IF NOT EXISTS Buchungen
    cur.execute('''DROP TABLE IF EXISTS Buchungen''')
    cur.execute('''CREATE TABLE Buchungen
                   (Key INTEGER PRIMARY KEY ASC,Created TEXT, Buchung TEXT, Intervall INT, Betrag REAL)''')

    con.commit()
    con.close()
    app.run(port=5044)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
