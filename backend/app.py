from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/')
def home():
    return jsonify({"status": "Backend is running!", "message": "API is ready"})

@app.route('/api/chia-doi', methods=['POST'])
def api_chia_doi():
    try:
        data = request.json
        players = data['players']
        team_count = data['teamCount']
        
        if len(players) < team_count:
            return jsonify({'error': 'Số cầu thủ phải >= số đội'}), 400
            
        random.shuffle(players)
        teams = [players[i::team_count] for i in range(team_count)]
        
        return jsonify({'teams': teams})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)