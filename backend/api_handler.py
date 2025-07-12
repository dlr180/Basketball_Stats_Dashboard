# backend/run.py

import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import requests

# Optional: if using the balldontlie client
from balldontlie import BalldontlieAPI

# Load .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load API key
BASE_URL = "https://www.balldontlie.io/api/v1"
API_KEY = os.getenv("BALDONTLIE_API_KEY")  # Set this in your .env file

# Optional: Python client setup (only needed if using the balldontlie module directly)
client = BalldontlieAPI(api_key=API_KEY)

# Root route
@app.route('/')
def index():
    return jsonify({"message": "Backend API is Working"})

# Endpoint to get player info by name
@app.route('/api/players/<player_name>')
def get_player(player_name):
    url = f"{BASE}/players?search={player_name}"
    headers = {"Authorization": API_KEY} if API_KEY else {}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.HTTPError as errh:
        return jsonify({"error": "HTTP error", "details": str(errh)}), 500
    except requests.exceptions.RequestException as err:
        return jsonify({"error": "Request error", "details": str(err)}), 500
    except Exception as e:
        return jsonify({"error": "Unexpected error", "details": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
