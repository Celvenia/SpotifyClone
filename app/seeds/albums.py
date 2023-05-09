from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo album
def seed_albums():

    albums = [
        Album(user_id=5, title='Legends Never Die', cover_art='https://example.url', release_date=datetime(2020, 6, 10), record_label='Interscope'),
        Album(user_id=5, title='Goodbye & Good Riddance', cover_art='https://example.url', release_date=datetime(2018, 5, 23), record_label='Interscope'),
        Album(user_id=5, title='Fighting Demons', cover_art='https://example.url', release_date=datetime(2022, 3, 18 ), record_label='Grade A'),
        Album(user_id=5, title='Death Race for Love', cover_art='https://example.url', release_date=datetime(2019, 3, 8 ), record_label='Interscope'),
        Album(user_id=6, title='Starboy', cover_art='https://example.url', release_date=datetime(2016, 11, 25), record_label='XO Records'),
        Album(user_id=6, title='After Hours', cover_art='https://example.url', release_date=datetime(2020, 3, 20), record_label='Republic Records'),
        Album(user_id=6, title='Kiss Land', cover_art='https://example.url', release_date=datetime(2013, 9, 10), record_label='XO Records'),
        Album(user_id=6, title='Beauty Behind the Madness', cover_art='https://example.url', release_date=datetime(2015, 8, 28), record_label='Republic Records'),
        Album(user_id=6, title='My Dear Melancholy,', cover_art='https://example.url', release_date=datetime(2018, 3, 30), record_label='Republic Records'),
        Album(user_id=6, title='Trilogy', cover_art='https://example.url', release_date=datetime(2012, 11, 13), record_label='XO Records'),
        Album(user_id=6, title='Echoes of Silence', cover_art='https://example.url', release_date=datetime(2011, 12, 21), record_label='XO Records'),
        Album(user_id=6, title='Thursday', cover_art='https://example.url', release_date=datetime(2011, 8, 18), record_label='XO Records'),
        Album(user_id=6, title='House of Balloons', cover_art='https://example.url', release_date=datetime(2011, 3, 21), record_label='XO Records'),
        Album(user_id=6, title='The Highlights', cover_art='https://example.url', release_date=datetime(2021, 2, 5), record_label='Republic Records'),
        Album(user_id=7, title='Motion', cover_art='https://example.url', release_date=datetime(2014, 10, 31), record_label='Columbia Records'),
        Album(user_id=7, title='Funk Wav Bounces Vol. 1', cover_art='https://example.url', release_date=datetime(2017, 6, 30), record_label='Columbia Records'),
        Album(user_id=7, title='18 Months', cover_art='https://example.url', release_date=datetime(2012, 10, 26), record_label='Columbia Records'),
        Album(user_id=7, title='Ready for the Weekend', cover_art='https://example.url', release_date=datetime(2009, 8, 14), record_label='Columbia Records'),
        Album(user_id=7, title='I Created Disco', cover_art='https://example.url', release_date=datetime(2007, 6, 15), record_label='Columbia Records'),
        Album(user_id=7, title='We Found Love', cover_art='https://example.url', release_date=datetime(2011, 9, 22), record_label='Columbia Records'),
        Album(user_id=8, title='We Found Love', cover_art='https://example.url', release_date=datetime(2011, 9, 22), record_label='Columbia Records'),
        Album(user_id=8, title='Anti', cover_art='https://example.url', release_date=datetime(2016, 1, 28), record_label='Roc Nation'),
        Album(user_id=8, title='Good Girl Gone Bad', cover_art='https://example.url', release_date=datetime(2007, 5, 31), record_label='Def Jam Recordings'),
        Album(user_id=8, title='Loud', cover_art='https://example.url', release_date=datetime(2010, 11, 12), record_label='Def Jam Recordings'),
        Album(user_id=8, title='Talk That Talk', cover_art='https://example.url', release_date=datetime(2011, 11, 18), record_label='Def Jam Recordings'),
        Album(user_id=8, title='Unapologetic', cover_art='https://example.url', release_date=datetime(2012, 11, 19), record_label='Def Jam Recordings')
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
