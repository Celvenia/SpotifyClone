from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo album
def seed_albums():

    albums = [
        Album(user_id=5, title='Legends Never Die', cover_art='https://example.url', release_date=datetime(2020, 7, 10), record_label='Interscope'),
        Album(user_id=5, title='Goodbye & Good Riddance', cover_art='https://example.url', release_date=datetime(2018, 5, 23), record_label='Interscope'),
        Album(user_id=5, title='Fighting Demons', cover_art='https://example.url', release_date=datetime(2022, 3, 18 ), record_label='Grade A'),
        Album(user_id=5, title='Death Race for Love', cover_art='https://example.url', release_date=datetime(2019, 3, 8 ), record_label='Interscope')
    ]

    
    for album in albums:
        db.session.add(album)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the albums table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))
        
    db.session.commit()