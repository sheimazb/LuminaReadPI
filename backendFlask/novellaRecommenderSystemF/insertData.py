from datetime import datetime

import pandas as pd
import mysql.connector

# Establish connection to MySQL database
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="lumina"
)

# Read CSV files into pandas DataFrames
#user_df = pd.read_csv('data/Author Data.csv')
user_df = pd.read_csv('data/Author Data.csv')
novella_df = pd.read_csv('data/novellas.csv')
ratings_df = pd.read_csv('data/Blog Ratings.csv')


# Set the maximum length for the content column
max_content_length = 10  # Adjust this value as needed

# Iterate over DataFrame rows and insert into MySQL database
cursor = connection.cursor()
# Insert data into 'users' table

for index, row in user_df.iterrows():
    # Execute SQL statement
    sql = "INSERT INTO users (id, name, email, password, img, description, auth_token , created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        row['author_id'],
        row['author_name'],
        row.get('author_email', 'example@example.com'),  # Placeholder email
        row.get('author_password', 'password123'),  # Placeholder password
        row.get('author_img', 'default.jpg'),  # Placeholder image
        row.get('author_description', 'No description available'),  # Placeholder description
        row.get('auth_token', 'No auth available'),  # Placeholder description
        datetime.now().strftime('%Y-%m-%d'),  # Current datetime for created_at
        datetime.now().strftime('%Y-%m-%d')   # Current datetime for updated_at
    )
    cursor.execute(sql, values)


for (index_novella, row_novella), (index_ratings, row_ratings) in zip(novella_df.iterrows(), ratings_df.iterrows()):
    # Execute SQL statement
    description = row_novella['blog_content'][:max_content_length]
    title = row_novella['blog_title'][:max_content_length]

    sql = "INSERT INTO packs (user_id, title, description, category, img, langue, price, packStatus, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        row_ratings['userId'],             # User ID from ratings_df
        title,         # Novella title from novella_df
        description,       # Novella description from novella_df
        row_novella['topic'],           # Replace with the correct column name
        row_novella['blog_img'],           # Novella image from novella_df
        'anglais',             # Novella language from novella_df
        50,                                 # Placeholder price
        '0',                                # Placeholder packStatus
        datetime.now().strftime('%Y-%m-%d'),  # Current datetime for created_at
        datetime.now().strftime('%Y-%m-%d')   # Current datetime for updated_at
    )
    cursor.execute(sql, values)


# Insert data into 'novellas' table

for index, row in novella_df.iterrows():
    # Truncate content if it's too long
    content = row['blog_content'][:max_content_length]
    title = row.get('blog_title', 'Untitled')[:max_content_length]

    # Execute SQL statement
    sql = "INSERT INTO novellas (id, pack_id, title, description, img, content, progress, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        row['blog_id'],
        row.get('author_id', 450),  # Placeholder pack_id
        title,
        row.get('topic', 'General'),  # Placeholder description
        row.get('blog_img', 'default.jpg'),  # Placeholder image
        content,  # Use truncated content
        1,  # Placeholder progress
        datetime.now().strftime('%Y-%m-%d'),  # Current datetime for created_at
        datetime.now().strftime('%Y-%m-%d')   # Current datetime for updated_at
    )
    cursor.execute(sql, values)







# Commit the transaction and close the cursor and connection
connection.commit()
cursor.close()
connection.close()
