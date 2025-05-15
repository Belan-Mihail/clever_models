from flask import Flask, request, jsonify
from ml_logic import first_process_data  
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route("/")
def home():
    return "Flask works!"

@app.route("/api/process", methods=["POST"])
def process():
    try:
        if 'file' not in request.files:
            return jsonify({"status": "error", "message": "No file part"}), 400

        file = request.files['file']
        filename = file.filename
        ext = os.path.splitext(filename)[1].lower()
    
        if (file.filename == '') or (ext not in ['.xlsx', '.csv', '.xls']):
            return jsonify({"status": "error", "message": "No selected file/or unexpected file type"}), 400

        # main logic
        result = first_process_data(file)  

        return jsonify({"status": "ok", **result})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route("api/select_columns/", methods=["POST"])
def select_columns():
    try:
        data = request.json
        session_id = data.get("session_id")
        x_col = data.get("x")
        y_col = data.get("y")
    
        from ml_logic import load_saved_df
        df = load_saved_df(session_id)

        if x_col not in df.columns or x_col not in df.columns:
            return jsonify({"status": "error", "message": "Invalid columns"}), 400
    
        return jsonify({"status": "ok"})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
