from flask import Flask, request, jsonify
from ml_logic import process_data  # допустим, там есть логика обработки файла

app = Flask(__name__)

@app.route("/")
def home():
    return "Flask works!"

@app.route("/api/process", methods=["POST"])
def process():
    try:
        if 'file' not in request.files:
            return jsonify({"status": "error", "message": "No file part"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"status": "error", "message": "No selected file"}), 400

        # main logic
        result = process_data(file)  

        return jsonify({"status": "ok", "result": result})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
