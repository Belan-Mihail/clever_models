from flask import Flask, request, jsonify
from ml_logic import process_data

app = Flask(__name__)


@app.route("/api/process", methods=["POST"])
def process():
    try:
        data = request.get_json()
        result = process_data(data)  # Call main function
        return jsonify({"status": "ok", "result": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
