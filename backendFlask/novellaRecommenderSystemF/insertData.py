from datetime import datetime

import pandas as pd
import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="lumina"
)

#user_df = pd.read_csv('data/Author Data.csv')
user_df = pd.read_csv('data/Author Data.csv')
novella_df = pd.read_csv('data/novellas.csv')
ratings_df = pd.read_csv('data/Blog Ratings.csv')


max_content_length = 10

cursor = connection.cursor()

for index, row in user_df.iterrows():
    sql = "INSERT INTO users (id, name, email, password, img, description, auth_token , created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        row['author_id'],
        row['author_name'],
        row.get('author_email', 'example@example.com'),
        row.get('author_password', 'password123'),
        row.get('author_img', 'default.jpg'),
        row.get('author_description', 'No description available'),
        row.get('auth_token', 'No auth available'),
        datetime.now().strftime('%Y-%m-%d'),
        datetime.now().strftime('%Y-%m-%d')
    )
    cursor.execute(sql, values)


for (index_novella, row_novella), (index_ratings, row_ratings) in zip(novella_df.iterrows(), ratings_df.iterrows()):
    description = row_novella['blog_content'][:max_content_length]
    title = row_novella['blog_title'][:max_content_length]

    sql = "INSERT INTO packs (user_id, title, description, category, img, langue, price, packStatus, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        row_ratings['userId'],
        title,
        description,
        row_novella['topic'],
        row_novella['blog_img'],
        'anglais',
        50,
        '0',
        datetime.now().strftime('%Y-%m-%d'),
        datetime.now().strftime('%Y-%m-%d')
    )
    cursor.execute(sql, values)



for index, row in novella_df.iterrows():
    content = row['blog_content'][:max_content_length]
    title = row.get('blog_title', 'Untitled')[:max_content_length]

    sql = "INSERT INTO novellas (id, pack_id, title, description, img, content, progress, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        row['blog_id'],
        row.get('author_id', 450),
        title,
        row.get('topic', 'General'),
        row.get('blog_img', 'default.jpg'),
        content,
        1,
        datetime.now().strftime('%Y-%m-%d'),
        datetime.now().strftime('%Y-%m-%d')
    )
    cursor.execute(sql, values)







# Commit the transaction and close the cursor and connection
connection.commit()
cursor.close()
connection.close()
