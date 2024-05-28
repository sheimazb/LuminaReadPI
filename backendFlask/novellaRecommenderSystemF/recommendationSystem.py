import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
import nltk
import re
from pathlib import Path
from nltk.corpus import stopwords, wordnet as wn
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from sklearn.model_selection import train_test_split
import time  # Import the time module at the beginning of your script


# Ensuring that the necessary NLTK downloads are present
nltk.download('stopwords')
nltk.download('wordnet')

# File paths using pathlib for better path handling

novella_df = pd.read_csv('data/novellas.csv')
author_df = pd.read_csv('data/Author Data.csv')
ratings_df = pd.read_csv('data/Blog Ratings.csv')

# Renaming and dropping columns efficiently
rename_dict = {'author_id': 'pack_id', 'blog_title': 'title', 'blog_id': 'novella_id', 'blog_content': 'content', 'topic': 'category'}
novella_df.rename(columns=rename_dict, inplace=True)
novella_df.drop(columns=['blog_link', 'scrape_time'], inplace=True)
ratings_df.rename(columns={'blog_id': 'novella_id'}, inplace=True)

# Pre-processing function for text data
def pre_process_text(text, flg_stemm=False, flg_lemm=True, lst_stopwords=None):
    text = re.sub(r'[^\w\s]', '', text.lower().strip())
    tokens = text.split()
    if lst_stopwords is not None:
        tokens = [word for word in tokens if word not in lst_stopwords]
    if flg_lemm:
        lemmatizer = WordNetLemmatizer()
        tokens = [lemmatizer.lemmatize(word) for word in tokens]
    if flg_stemm:
        stemmer = PorterStemmer()
        tokens = [stemmer.stem(word) for word in tokens]
    return " ".join(tokens)

# Apply text processing
stop_words = stopwords.words('english')
novella_df['novellaContent'] = novella_df['content'].apply(lambda x: pre_process_text(x, flg_lemm=True, lst_stopwords=stop_words))

# TF-IDF Vectorization
tfidf_vectorizer = TfidfVectorizer()
tfidf_matrix = tfidf_vectorizer.fit_transform(novella_df['novellaContent'])

# Cosine Similarity Matrix
cosine_sim = cosine_similarity(tfidf_matrix)
cosine_sim_df = pd.DataFrame(cosine_sim, index=novella_df.title, columns=novella_df.title)

# Euclidean Distance Matrix
euclidean_dist = euclidean_distances(tfidf_matrix)
euclidean_dist_df = pd.DataFrame(euclidean_dist, index=novella_df.title, columns=novella_df.title)
print(novella_df.columns)


# Function for recommending novellas
def novella_recommendations(title, similarity_data, items=novella_df[['title', 'category', 'novellaContent', 'blog_img']], k=10, similarity_type='cosine'):

    start_time = time.time()  # Start timing

    if title not in similarity_data.columns:
        return f"Title '{title}' not found in the dataset."

    if similarity_type == 'cosine':
        index = similarity_data.loc[:, title].argsort()[::-1][:k + 1]
    else:
        index = similarity_data.loc[:, title].argsort()[:k + 1]

    closest = similarity_data.columns[index]
    closest = closest.drop(title, errors='ignore')
    result = pd.DataFrame(closest).merge(items, on='title').head(k)
    result['score'] = similarity_data.loc[title, closest].values
    img_urls = [novella_df.loc[novella_df['title'] == title, 'blog_img'].values[0] for title in result['title']]

    result['img_url'] = img_urls

    end_time = time.time()  # End timing
    print(f"Recommendations generated in {end_time - start_time:.2f} seconds.")  # Print the duration

    return result


# Example usage
# recommendations = novella_recommendations('Generative Artificial Intelligence (AI)', cosine_sim_df)
# print(recommendations)

# TensorFlow Model for Recommender System (placeholder for your existing model configuration)

# Further steps would include refining models, exploring data, and potentially integrating more features
