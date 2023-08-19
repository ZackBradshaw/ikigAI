from flask import Flask, render_template, request
import chat_agent
app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        api_key = request.form.get("api_key")
        if api_key:
            chat_agent.chat(api_key)

          
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)