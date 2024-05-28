from flask import Flask, render_template, request, jsonify
from recommendationSystem import novella_recommendations, cosine_sim_df
from flask_cors import CORS
import pandas as pd
import logging

app = Flask(__name__)
CORS(app)


logging.basicConfig(level=logging.INFO)

try:
    popular_df = pd.read_pickle("./novella_top10")
    logging.info("Pickle file loaded successfully.")
except Exception as e:
    logging.error(f"Error loading pickle file: {e}")
    try:
        popular_df = pd.read_csv("C:/Users/asus/Downloads/novella_top10.csv")
        logging.info("CSV file loaded successfully as fallback.")
    except Exception as e:
        logging.error(f"Error loading CSV file: {e}")
        popular_df = pd.DataFrame()


@app.route('/', methods=['POST'])
def index():
    data = request.get_json()
    input_title = data['title']

    results = novella_recommendations(input_title, cosine_sim_df)
    results = results.to_dict(orient='records')

    logging.info(f"Results: {results}")
    return jsonify({'recommendations': results})


@app.route('/top10')
def top10():
    if popular_df.empty:
        return jsonify({'error': 'Failed to load data'}), 500

    top_products = []
    for index, row in popular_df.iterrows():
        product_data = {
            'novella_id': row['novella_id'],
            'pack_id': row['pack_id'],
            'title': row['title'],
            'content': row['content'],
            'blog_link': row['blog_link'],
            'blog_img': row['blog_img'],
            'category': row['category'],
            'scrape_time': str(row['scrape_time']),
            'novellaContent': row['novellaContent']
        }
        top_products.append(product_data)
    return jsonify(top_products)


@app.route('/novella', methods=['POST'])
def novella():
    data = request.get_json()
    input_title = data['title']

    results = novella_recommendations(input_title, cosine_sim_df)
    results = results.to_dict(orient='records')

    logging.info(f"Results: {results}")
    return render_template('index.html', novella_name=results[0]['title'])


if __name__ == '__main__':
    app.run(debug=True)
