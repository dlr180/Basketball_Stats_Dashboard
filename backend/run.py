import os
import requests
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("BALDONTLIE_API_KEY")
#temporary line -- delete this later
print("✅ API Key Loaded:", API_KEY)
BASE_URL = "https://api.balldontlie.io/v1"

@app.route('/')
def index():
    return jsonify({"message": "Backend API is Working"})

@app.route('/api/players/<player_name>')
def get_player(player_name):
    url = f"{BASE_URL}/players"
    headers = {"Authorization": API_KEY} if API_KEY else {}
    params = {"search": player_name}

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({
            "error": "Failed to fetch player",
            "details": str(e),
            "raw": getattr(e.response, "text", None)
        }), getattr(e.response, "status_code", 500)

if __name__ == '__main__':
    app.run(debug=True, port=5000)


