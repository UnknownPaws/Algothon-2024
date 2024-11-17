from flask import Flask, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

@app.route('/answer.txt')
def get_answer():
    return send_from_directory('.', 'answer.txt')

if __name__ == '__main__':
    app.run(debug=True)
