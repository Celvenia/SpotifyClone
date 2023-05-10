from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_songs():

    songs = [
        Song(album_id=1, title='Come & Go', duration_ms=229000, url='https://www.youtube.com/watch?v=5ho88VXJTBg', release_date=datetime(2020, 7, 10), genres='Hip Hop'),
        Song(album_id=1, title='Lucid Dreams', duration_ms=239836, url='https://www.youtube.com/watch?v=mzB1VGEGcSU', release_date=datetime(2017, 6, 15), genres='Hip Hop'),
        Song(album_id=1, title="Life's a Mess", duration_ms=202000, url='https://www.youtube.com/watch?v=IetcXhv83gQ', release_date=datetime(2020, 7, 10), genres='Hip Hop'),
        Song(album_id=2, title='All Girls Are the Same', duration_ms=166064, url='https://www.youtube.com/watch?v=3tmd-ClpJxA', release_date=datetime(2018, 5, 4), genres='Hip Hop'),
        Song(album_id=3, title='Legends', duration_ms=240000, url='https://www.youtube.com/watch?v=AYaBtElX9Y0', release_date=datetime(2018, 7, 13), genres='Hip Hop'),
        Song(album_id=4, title='Robbery', duration_ms=240000, url='https://www.youtube.com/watch?v=iI_zwDQYx-0', release_date=datetime(2019, 2, 13), genres='Hip Hop'),
        Song(album_id=4, title='Hear Me Calling', duration_ms=185000, url='https://www.youtube.com/watch?v=VxlQYEM92Dg', release_date=datetime(2019, 3, 1), genres='Hip Hop'),
        Song(album_id=4, title='Fast', duration_ms=209000, url='https://www.youtube.com/watch?v=_IXJ2P9umU4', release_date=datetime(2019, 3, 8), genres='Hip Hop'),
        Song(album_id=4, title='Bandit', duration_ms=189000, url='https://www.youtube.com/watch?v=FwJGv5CwWYw', release_date=datetime(2019, 10, 4), genres='Hip Hop'),
        Song(album_id=1, title='Wishing Well', duration_ms=191000, url='https://www.youtube.com/watch?v=7EFL01sGAY4', release_date=datetime(2020, 7, 10), genres='Hip Hop'),
        Song(album_id=1, title='Righteous', duration_ms=224000, url='https://www.youtube.com/watch?v=Hm0q5jBi3mA', release_date=datetime(2020, 4, 24), genres='Hip Hop'),
        Song(album_id=5, title='Starboy', duration_ms=999999, url='urlexample.com', release_date=datetime(2016, 11, 25), genres='R&B'),
        Song(album_id=6, title='After Hours', duration_ms=999999, url='urlexample.com', release_date=datetime(2020, 3, 20), genres='R&B'),
        Song(album_id=7, title='Kiss Land', duration_ms=999999, url='urlexample.com', release_date=datetime(2013, 9, 10), genres='R&B'),
        Song(album_id=8, title='Beauty Behind the Madness', duration_ms=999999, url='urlexample.com', release_date=datetime(2015, 8, 28), genres='R&B'),
        Song(album_id=9, title='My Dear Melancholy', duration_ms=999999, url='urlexample.com', release_date=datetime(2018, 3, 30), genres='R&B'),
        Song(album_id=10, title='Echoes of Silence', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 12, 21), genres='R&B'),
        Song(album_id=11, title='Thursday', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 8, 18), genres='R&B'),
        Song(album_id=12, title='House of Balloons', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 3, 21), genres='R&B'),
        Song(album_id=13, title='The Highlights', duration_ms=999999, url='urlexample.com', release_date=datetime(2021, 2, 5), genres='Pop'),
        Song(album_id=14, title='Motion', duration_ms=999999, url='urlexample.com', release_date=datetime(2014, 10, 31), genres='Electronic'),
        Song(album_id=15, title='Funk Wav Bounces Vol. 1', duration_ms=999999, url='urlexample.com', release_date=datetime(2017, 6, 30), genres='Hip Hop'),
        Song(album_id=16, title='18 Months', duration_ms=999999, url='urlexample.com', release_date=datetime(2012, 10, 26), genres='Electronic'),
        Song(album_id=17, title='Ready for the Weekend', duration_ms=999999, url='urlexample.com', release_date=datetime(2009, 8, 14), genres='Electronic'),
        Song(album_id=18, title='I Created Disco', duration_ms=999999, url='urlexample.com', release_date=datetime(2007, 6, 15), genres='Electronic'),
        Song(album_id=19, title='We Found Love', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 9, 22), genres='Pop'),
        Song(album_id=20, title='Anti', duration_ms=999999, url='urlexample.com', release_date=datetime(2016, 1, 28), genres='R&B'),
        Song(album_id=21, title='Good Girl Gone Bad', duration_ms=999999, url='urlexample.com', release_date=datetime(2007, 5, 31), genres='Pop'),
        Song(album_id=22, title='Loud', duration_ms=999999, url='urlexample.com', release_date=datetime(2010, 11, 12), genres='Pop'),
        Song(album_id=23, title='Talk That Talk', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 11, 18), genres='Pop'),
        Song(album_id=24, title='Unapologetic', duration_ms=999999, url='urlexample.com', release_date=datetime(2012, 11, 19), genres='Pop')
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
