from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_songs():
    song1 = Song(album_id=1, title='song one', duration_ms=10, url='url', user_id=3, release_date=datetime(2011, 1, 1))
    
    song2 = Song(album_id=2, title='song two', duration_ms=10, url='url', user_id=3, release_date=datetime(2010, 1, 1))
    song3 = Song(album_id=2, title='song three', duration_ms=10, url='url', user_id=3, release_date=datetime(2012, 1, 1))

    song4 = Song(album_id=3, title='song four', duration_ms=10, url='url', user_id=4, release_date=datetime(2013, 1, 1))
    song5 = Song(album_id=3, title='song five', duration_ms=10, url='url', user_id=4, release_date=datetime(2014, 1, 1))
    
    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)

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
