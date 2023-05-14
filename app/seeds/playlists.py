from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlists = [

        Playlist(user_id=1, title='Liked Songs', is_private=True, tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=1, title='Favorites', is_private=False, tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=1, title='Demo Playlist', is_private=True, tile_image_url="https://i.scdn.co/image/ab67706c0000da84c9843a57235c97b457561e32"),

        Playlist(user_id=2, title='Liked Songs', is_private=True,  tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=2, title='Favorites', is_private=False, tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=2, title='Dylan Playlist', is_private=True, tile_image_url="https://i.scdn.co/image/ab67706c0000da84c9843a57235c97b457561e32"),

        Playlist(user_id=3, title='Liked Songs', is_private=True,tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=3, title='Favorites', is_private=False, tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=3, title='Kevin Playlist', is_private=True,tile_image_url="https://i.scdn.co/image/ab67706c0000da84c9843a57235c97b457561e32"),

        Playlist(user_id=4, title='Liked Songs', is_private=True, tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=4, title='Favorites', is_private=False,tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=4, title='Chris Playlist', is_private=True, tile_image_url="https://i.scdn.co/image/ab67616d00001e023e0698e4ae5ffb82a005aeeb"),

        Playlist(user_id=5, title='Liked Songs', is_private=True,  tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=5, title='Favorites', is_private=False,  tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=5, title='Very Juice Wrld Playlist', is_private=True,  tile_image_url="https://i.scdn.co/image/ab67616d00001e023e0698e4ae5ffb82a005aeeb"),

        Playlist(user_id=6, title='Liked Songs', is_private=True, tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=6, title='Favorites', is_private=False, tile_image_url="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"),
        Playlist(user_id=6, title='Its Finally The Weeknd Playlist', is_private=True, tile_image_url="https://i.scdn.co/image/ab67616d00001e027fcead687e99583072cc217b"),
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
