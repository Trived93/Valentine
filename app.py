from flask import Flask, render_template, request, jsonify

# Create Flask app instance
app = Flask(__name__)

# Store submitted answer
submitted_answer = None

# Route to render the index page
@app.route("/")
def index():
    return render_template("index.html")

# Route to handle answer submission
@app.route("/submit_answer", methods=['POST'])
def submit_answer():
    global submitted_answer
    data = request.get_json()
    submitted_answer = data.get('answer', '')
    print(f"Answer received: {submitted_answer}")
    return jsonify({'status': 'success', 'message': 'Answer submitted successfully'})

# Route to get the submitted answer
@app.route("/get_answer", methods=['GET'])
def get_answer():
    return jsonify({'answer': submitted_answer})

# Run application in debug mode
if __name__ == "__main__":
    app.run(debug=True)
