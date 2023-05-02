from app.models import db, Artist, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_artists():
    aA = Artist(
        id=1, user_id=1, bio='This is my bio', genre='pop', is_band=False, members=[1, 2])
    Hack = Artist(
        id=1, user_id=2, bio='This is not my bio', genre='EDM', is_band=False, members=[12])
    Stella = Artist(
        id=1, user_id=3, bio='This is my bio now', genre='pop', is_band=False, members=[13])
    db.session.add(aA)
    db.session.add(Hack)
    db.session.add(Stella)
    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.commit()