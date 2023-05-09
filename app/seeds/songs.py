from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Here for reference when creating song seeders
#  albums = [
#         Song(title='Legends Never Die', duration_ms=999999, url='urlexample.com', release_date=datetime(2020, 7, 10), record_label='Interscope'),
#         Song(title='Goodbye & Good Riddance', duration_ms=999999, url='urlexample.com', release_date=datetime(2018, 5, 23), record_label='Interscope'),
#         Song(title='Fighting Demons', duration_ms=999999, url='urlexample.com', release_date=datetime(2022, 3, 18 ), record_label='Grade A'),
#         Song(title='Death Race for Love', duration_ms=999999, url='urlexample.com', release_date=datetime(2019, 3, 8 ), record_label='Interscope')
#     ]

# Adds a demo user, you can add other users here if you want
def seed_songs():

    songs = [
        Song(title='Come & Go', duration_ms=229000, url='https://www.youtube.com/watch?v=5ho88VXJTBg', release_date=datetime(2020, 7, 10)),
        Song(title='Lucid Dreams', duration_ms=239836, url='https://www.youtube.com/watch?v=mzB1VGEGcSU', release_date=datetime(2017, 6, 15)),
        Song(title="Life's a Mess", duration_ms=202000, url='https://www.youtube.com/watch?v=IetcXhv83gQ', release_date=datetime(2020, 7, 10)),
        Song(title='All Girls Are the Same', duration_ms=166064, url='https://www.youtube.com/watch?v=3tmd-ClpJxA', release_date=datetime(2018, 5, 4)),
        Song(title='Legends', duration_ms=240000, url='https://www.youtube.com/watch?v=AYaBtElX9Y0', release_date=datetime(2018, 7, 13)),
        Song(title='Robbery', duration_ms=240000, url='https://www.youtube.com/watch?v=iI_zwDQYx-0', release_date=datetime(2019, 2, 13)),
        Song(title='Hear Me Calling', duration_ms=185000, url='https://www.youtube.com/watch?v=VxlQYEM92Dg', release_date=datetime(2019, 3, 1)),
        Song(title='Fast', duration_ms=209000, url='https://www.youtube.com/watch?v=_IXJ2P9umU4', release_date=datetime(2019, 3, 8)),
        Song(title='Bandit', duration_ms=189000, url='https://www.youtube.com/watch?v=FwJGv5CwWYw', release_date=datetime(2019, 10, 4)),
        Song(title='Wishing Well', duration_ms=191000, url='https://www.youtube.com/watch?v=7EFL01sGAY4', release_date=datetime(2020, 7, 10)),
        Song(title='Righteous', duration_ms=224000, url='https://www.youtube.com/watch?v=Hm0q5jBi3mA', release_date=datetime(2020, 4, 24)),
        Song(title='Starboy', duration_ms=999999, url='urlexample.com', release_date=datetime(2016, 11, 25)),
        Song(title='After Hours', duration_ms=999999, url='urlexample.com', release_date=datetime(2020, 3, 20)),
        Song(title='Kiss Land', duration_ms=999999, url='urlexample.com', release_date=datetime(2013, 9, 10)),
        Song(title='Beauty Behind the Madness', duration_ms=999999, url='urlexample.com', release_date=datetime(2015, 8, 28)),
        Song(title='My Dear Melancholy,', duration_ms=999999, url='urlexample.com', release_date=datetime(2018, 3, 30)),
        Song(title='Trilogy', duration_ms=999999, url='urlexample.com', release_date=datetime(2012, 11, 13)),
        Song(title='Echoes of Silence', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 12, 21)),
        Song(title='Thursday', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 8, 18)),
        Song(title='House of Balloons', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 3, 21)),
        Song(title='The Highlights', duration_ms=999999, url='urlexample.com', release_date=datetime(2021, 2, 5)),
        Song(title='Motion', duration_ms=999999, url='urlexample.com', release_date=datetime(2014, 10, 31)),
        Song(title='Funk Wav Bounces Vol. 1', duration_ms=999999, url='urlexample.com', release_date=datetime(2017, 6, 30)),
        Song(title='18 Months', duration_ms=999999, url='urlexample.com', release_date=datetime(2012, 10, 26)),
        Song(title='Ready for the Weekend', duration_ms=999999, url='urlexample.com', release_date=datetime(2009, 8, 14)),
        Song(title='I Created Disco', duration_ms=999999, url='urlexample.com', release_date=datetime(2007, 6, 15)),
        Song(title='We Found Love', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 9, 22)),
        Song(title='Anti', duration_ms=999999, url='urlexample.com', release_date=datetime(2016, 1, 28)),
        Song(title='Good Girl Gone Bad', duration_ms=999999, url='urlexample.com', release_date=datetime(2007, 5, 31)),
        Song(title='Loud', duration_ms=999999, url='urlexample.com', release_date=datetime(2010, 11, 12)),
        Song(title='Talk That Talk', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 11, 18)),
        Song(title='Unapologetic', duration_ms=999999, url='urlexample.com', release_date=datetime(2012, 11, 19))
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
