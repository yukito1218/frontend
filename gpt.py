#chat-gptの値をhtmlに受け渡す仕組み作る

from flask import *
import requests

app = Flask(__name__)
app.secret_key = 'api_key'

# チャットGPTに質問する関数
def query_chatgpt(prompt, apiKey):
    header = {
        "Content-Type" : "application/json",
        "Authorization" : f"Bearer {apiKey}",
    }

    body = '''
    {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content":"''' + prompt + '''"}
        ]
    }
    '''
    response = requests.post("https://api.openai.com/v1/chat/completions", headers = header, data = body.encode('utf_8'))
    rj = response.json()
    return rj["choices"][0]["message"]["content"]

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html",placeholder="OPENAIのAPIKEYを入れてください",value="登録")

@app.route("/api", methods=["POST"])
def api():
    session["apiKey"] = request.form["apiKey"]
    return render_template("index.html",placeholder=session["apiKey"],value="登録済")

@app.route("/query", methods=["POST"])
def query():
    apiKey = session["apiKey"]
    prompt = request.form["prompt_text"]
    ans = query_chatgpt(prompt, apiKey)
    return render_template("answer.html", answer=ans)



if __name__ == "__main__":
    app.run(debug=True)
