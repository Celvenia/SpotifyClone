from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlists = [

        Playlist(user_id=1, title='Liked Songs', description="", is_private=True),
        Playlist(user_id=1, title='Favorites', description="", is_private=False),
        Playlist(user_id=1, title='Secret Favorites', description="", is_private=True),

        Playlist(user_id=2, title='Liked Songs', description="", is_private=True),
        Playlist(user_id=2, title='Favorites', description="", is_private=False),
        Playlist(user_id=2, title='Secret Favorites', description="", is_private=True),

        Playlist(user_id=3, title='Liked Songs', description="", is_private=True),
        Playlist(user_id=3, title='Favorites', description="", is_private=False),
        Playlist(user_id=3, title='Secret Favorites', description="", is_private=True),

        Playlist(user_id=4, title='Liked Songs', description="", is_private=True),
        Playlist(user_id=4, title='Favorites', description="", is_private=False),
        Playlist(user_id=4, title='Secret Favorites', description="", is_private=True),

        Playlist(user_id=5, title='Liked Songs', description="", is_private=True),
        Playlist(user_id=5, title='Favorites', description="", is_private=False),
        Playlist(user_id=5, title='Secret Favorites', description="", is_private=True),

        Playlist(user_id=6, title='Liked Songs', description="", is_private=True),
        Playlist(user_id=6, title='Favorites', description="", is_private=False),
        Playlist(user_id=6, title='Secret Favorites', description="", is_private=True),
    ]

    for playlist in playlists:
        db.session.add(playlist)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the playlists table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        db.session.commit()
