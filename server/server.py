from hashlib import md5
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ROOT_ID = md5(b"DDAYLABS").hexdigest()

@app.route('/root')
def root():
    return jsonify({"root" : ROOT_ID})


@app.route('/nodes/<node_id>')
def hello_world(node_id):
    return jsonify({"nodes" : list(get_nodes(node_id))})


def get_nodes(parent_node_id):
    number_of_nodes = int(parent_node_id, 16) % 4
    for n in range(number_of_nodes):
        new_node_id = parent_node_id + str(n)
        new_node = md5(new_node_id.encode()).hexdigest()
        yield new_node


app.run(debug=True, host='0.0.0.0', port=5000)

