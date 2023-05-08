from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Here for reference when creating song seeders
#  albums = [
#         Album(user_id=5, title='Legends Never Die', cover_art='https://example.url', release_date=datetime(2020, 7, 10), record_label='Interscope'),
#         Album(user_id=5, title='Goodbye & Good Riddance', cover_art='https://example.url', release_date=datetime(2018, 5, 23), record_label='Interscope'),
#         Album(user_id=5, title='Fighting Demons', cover_art='https://example.url', release_date=datetime(2022, 3, 18 ), record_label='Grade A'),
#         Album(user_id=5, title='Death Race for Love', cover_art='https://example.url', release_date=datetime(2019, 3, 8 ), record_label='Interscope')
#     ]

# Adds a demo user, you can add other users here if you want
def seed_songs():

    songs = [
        Song(album_id=1, title='Come & Go', duration_ms=229000, url='https://www.youtube.com/watch?v=5ho88VXJTBg', user_id=5, release_date=datetime(2020, 7, 10)),
        Song(album_id=1, title='Lucid Dreams', duration_ms=239836, url='https://www.youtube.com/watch?v=mzB1VGEGcSU', user_id=5, release_date=datetime(2017, 6, 15)),
        Song(album_id=1, title="Life's a Mess", duration_ms=202000, url='https://www.youtube.com/watch?v=IetcXhv83gQ', user_id=5, release_date=datetime(2020, 7, 10)),
        Song(album_id=2, title='All Girls Are the Same', duration_ms=166064, url='https://www.youtube.com/watch?v=3tmd-ClpJxA', user_id=5, release_date=datetime(2018, 5, 4)),
        Song(album_id=3, title='Legends', duration_ms=240000, url='https://www.youtube.com/watch?v=AYaBtElX9Y0', user_id=5, release_date=datetime(2018, 7, 13)),
        Song(album_id=4, title='Robbery', duration_ms=240000, url='https://www.youtube.com/watch?v=iI_zwDQYx-0', user_id=5, release_date=datetime(2019, 2, 13)),
        Song(album_id=4, title='Hear Me Calling', duration_ms=185000, url='https://www.youtube.com/watch?v=VxlQYEM92Dg', user_id=5, release_date=datetime(2019, 3, 1)),
        Song(album_id=4, title='Fast', duration_ms=209000, url='https://www.youtube.com/watch?v=_IXJ2P9umU4', user_id=5, release_date=datetime(2019, 3, 8)),
        Song(album_id=4, title='Bandit', duration_ms=189000, url='https://www.youtube.com/watch?v=FwJGv5CwWYw', user_id=5, release_date=datetime(2019, 10, 4)),
        Song(album_id=1, title='Wishing Well', duration_ms=191000, url='https://www.youtube.com/watch?v=7EFL01sGAY4', user_id=5, release_date=datetime(2020, 7, 10)),
        Song(album_id=1, title='Righteous', duration_ms=224000, url='https://www.youtube.com/watch?v=Hm0q5jBi3mA', user_id=5, release_date=datetime(2020, 4, 24))
        ]
    
    for song in songs:
        db.session.add(song)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        db.session.commit()
