from app.models import db, Like, environment, SCHEMA
from sqlalchemy.sql import text

# like_type = ('song', 'playlist', 'album')

def seed_likes():
    # user1_likes_song1 = Like(user_id=1, like_type='song', song_id=1)
    # user1_likes_album1 = Like(user_id=1, like_type='album', album_id=1)
    # user1_likes_playlist1 = Like(user_id=1, like_type='playlist', playlist_id=1)
    # user2_likes_song1 = Like(user_id=2, like_type='song', song_id=1)
    # user2_likes_album1 = Like(user_id=2, like_type='album', album_id=1)
    # user2_likes_playlist1 = Like(user_id=2, like_type='playlist', playlist_id=1)
<<<<<<< HEAD

=======
>>>>>>> chris
    user1_likes_song1 = Like(user_id=1, song_id=1)
    user1_likes_album1 = Like(user_id=1, album_id=1)
    user1_likes_playlist1 = Like(user_id=1, playlist_id=1)
    user2_likes_song1 = Like(user_id=2, song_id=1)
    user2_likes_album1 = Like(user_id=2, album_id=1)
    user2_likes_playlist1 = Like(user_id=2, playlist_id=1)
<<<<<<< HEAD

    
=======
>>>>>>> chris

    db.session.add(user1_likes_song1)
    db.session.add(user1_likes_album1)
    db.session.add(user1_likes_playlist1)
    db.session.add(user2_likes_song1)
    db.session.add(user2_likes_album1)
    db.session.add(user2_likes_playlist1)
    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        db.session.commit()