from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


    # record_label = db.Column(db.String, nullable=False)
    # created_at = db.Column(db.DateTime(timezone=True))
    # updated_at = db.Column(db.DateTime(timezone=True))


# Adds a demo album
def seed_albums():
    album1 = Album(artist_id=3, title='My First Album', cover_art='example.url', release_date=datetime.now(), record_label='example label')
    album2 = Album(artist_id=3, title='My Second Album', cover_art='example.url', release_date=datetime.now(), record_label='example label')
    album3 = Album(artist_id=4, title='Greatest Hits', cover_art='example.url', release_date=datetime(2010, 1, 1), record_label='example label')
    
    db.session.add(album1)
    db.session.add(album2)
    db.session.add(album3)
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