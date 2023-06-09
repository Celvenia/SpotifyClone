from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Here for reference when creating song seeders
# To convert google view files to direct urls for seeders follow these steps
# Replace /view?usp=sharing with /uc?export=download&id= in the URL.
# Remove everything before and including the /d/ in the URL.
# Remove the /view?usp=sharing at the end of the URL.

def seed_songs():

    songs = [
        Song(album_id=1, title='Come & Go', duration_ms=229000, url='https://drive.google.com/uc?export=download&id=1WKH_qL5yB_ggFjGyxIRbKradzaO9xwWT', release_date=datetime(2020, 7, 10), genre='Hip Hop', user_id=5),
        Song(album_id=1, title='Lucid Dreams', duration_ms=239836, url='https://drive.google.com/uc?export=download&id=1XKj5VrwQYGSTZE-hAVap_fyJrcIhELSl', release_date=datetime(2017, 6, 15), genre='Hip Hop', user_id=5),
        Song(album_id=1, title="Life's a Mess", duration_ms=202000, url='https://drive.google.com/uc?export=download&id=10EXcq1OZ7YFH-5WRuq1JO5-KhQbr9HJn', release_date=datetime(2020, 7, 10), genre='Hip Hop', user_id=5),
        Song(album_id=2, title='All Girls Are the Same', duration_ms=166064, url='https://drive.google.com/uc?export=download&id=1EOFJJzEtXUijgtCMQ318VcW_rNeGvYWu', release_date=datetime(2018, 5, 4), genre='Hip Hop', user_id=5),
        Song(album_id=3, title='Legends', duration_ms=240000, url='https://drive.google.com/uc?export=download&id=1BXvxFekdSPOhmry5mDIi9EGJXjgHPBK3', release_date=datetime(2018, 7, 13), genre='Hip Hop', user_id=5),
        Song(album_id=4, title='Robbery', duration_ms=240000, url='https://drive.google.com/uc?export=download&id=1SUnqlBH6LS9nZaUKuLNC7728aNvLr6jk', release_date=datetime(2019, 2, 13), genre='Hip Hop', user_id=5),
        Song(album_id=4, title='Hear Me Calling', duration_ms=185000, url='https://drive.google.com/uc?export=download&id=1nbi05vxfefBgEPJUo7HEn1znqKo4mDoe', release_date=datetime(2019, 3, 1), genre='Hip Hop', user_id=5),
        Song(album_id=4, title='Fast', duration_ms=209000, url='https://drive.google.com/uc?export=download&id=1ZZ8mL1ISZBYe7lCnFt_Xq9te_uod50rs', release_date=datetime(2019, 3, 8), genre='Hip Hop', user_id=5),
        Song(album_id=4, title='Bandit', duration_ms=189000, url='https://drive.google.com/uc?export=download&id=1nPZ-lD-iv377VyiVqfL0Zw40u-OUQVUl', release_date=datetime(2019, 10, 4), genre='Hip Hop', user_id=5),
        Song(album_id=1, title='Wishing Well', duration_ms=191000, url='https://drive.google.com/uc?export=download&id=1_phP7P9SwDD-WLfzA02GnFCb8PuS5BZL', release_date=datetime(2020, 7, 10), genre='Hip Hop', user_id=5),
        Song(album_id=1, title='Righteous', duration_ms=224000, url='https://drive.google.com/uc?export=download&id=162MicgIxqavYjNPX2BJMVHnjRcJr31mg', release_date=datetime(2020, 4, 24), genre='Hip Hop', user_id=5),
        Song(album_id=1, title='Stay High', duration_ms=149400, url='https://drive.google.com/uc?export=download&id=1q0YRfhtjKHDd__A_XooLRgPiW_Fz0AcF', release_date=datetime(2020, 7, 25), genre='Hip Hop', user_id=5),
# the_weekend, calvin_harris, rihanna
        Song(album_id=5, title='Feel The Fire', duration_ms=999999, url='https://drive.google.com/uc?id=1oSZPO6sLpLn4P51M3pycidb2Gj-c3lHI', release_date=datetime(2016, 11, 25), genre='R&B', user_id=6),
        Song(album_id=6, title='Past Lives', duration_ms=999999, url='https://drive.google.com/uc?id=1NY5KRiIou9JWCGOn9p3YZ70ImBEcjH3j', release_date=datetime(2020, 3, 20), genre='R&B', user_id=6),
        Song(album_id=7, title='The Hills x Creepin x The Color Violet', duration_ms=999999, url='https://drive.google.com/uc?id=15KABanxK1e98WMXOpZCr1CMhT3W9TszT', release_date=datetime(2013, 9, 10), genre='R&B', user_id=6),
        Song(album_id=8, title='Beauty Behind the Madness', duration_ms=999999, url='urlexample.com', release_date=datetime(2015, 8, 28), genre='R&B', user_id=6),
        Song(album_id=9, title='My Dear Melancholy', duration_ms=999999, url='urlexample.com', release_date=datetime(2018, 3, 30), genre='R&B', user_id=6),
        Song(album_id=10, title='Echoes of Silence', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 12, 21), genre='R&B', user_id=6),
        Song(album_id=11, title='Thursday', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 8, 18), genre='R&B', user_id=6),

        Song(album_id=12, title='House of Balloons', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 3, 21), genre='R&B', user_id=7),
        Song(album_id=13, title='The Highlights', duration_ms=999999, url='urlexample.com', release_date=datetime(2021, 2, 5), genre='Pop', user_id=7),
        Song(album_id=14, title='Motion', duration_ms=999999, url='urlexample.com', release_date=datetime(2014, 10, 31), genre='Electronic', user_id=7),
        Song(album_id=15, title='Funk Wav Bounces Vol. 1', duration_ms=999999, url='urlexample.com', release_date=datetime(2017, 6, 30), genre='Hip Hop', user_id=7),
        Song(album_id=16, title='18 Months', duration_ms=999999, url='urlexample.com', release_date=datetime(2012, 10, 26), genre='Electronic', user_id=7),
        Song(album_id=17, title='Ready for the Weekend', duration_ms=999999, url='urlexample.com', release_date=datetime(2009, 8, 14), genre='Electronic', user_id=7),
        Song(album_id=18, title='I Created Disco', duration_ms=999999, url='urlexample.com', release_date=datetime(2007, 6, 15), genre='Electronic', user_id=7),

        Song(album_id=19, title='We Found Love', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 9, 22), genre='Pop', user_id=8),
        Song(album_id=20, title='Anti', duration_ms=999999, url='urlexample.com', release_date=datetime(2016, 1, 28), genre='R&B', user_id=8),
        Song(album_id=21, title='Good Girl Gone Bad', duration_ms=999999, url='urlexample.com', release_date=datetime(2007, 5, 31), genre='Pop', user_id=8),
        Song(album_id=22, title='Loud', duration_ms=999999, url='urlexample.com', release_date=datetime(2010, 11, 12), genre='Pop', user_id=8),
        Song(album_id=23, title='Talk That Talk', duration_ms=999999, url='urlexample.com', release_date=datetime(2011, 11, 18), genre='Pop', user_id=8),
        Song(album_id=24, title='Unapologetic', duration_ms=999999, url='urlexample.com', release_date=datetime(2012, 11, 19), genre='Pop', user_id=8)
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
