from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(
        username='Demo', email='demo@aa.io', password='password', is_artist=False,
        profile_picture='https://w7.pngwing.com/pngs/598/553/png-transparent-computer-icons-spotify-graphics-streaming-media-spotify-icon-logo-grass-feather.png', public_name='Demo',
        banner_image='https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg'),

        User(
        username='dylan', email='dylan@aa.io', password='password', is_artist=False,
        profile_picture='https://w7.pngwing.com/pngs/598/553/png-transparent-computer-icons-spotify-graphics-streaming-media-spotify-icon-logo-grass-feather.png', public_name='Demo',
        banner_image='https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg'),

        User(
        username='kevin', email='kevin@aa.io', password='password', is_artist=False,
        profile_picture='https://w7.pngwing.com/pngs/598/553/png-transparent-computer-icons-spotify-graphics-streaming-media-spotify-icon-logo-grass-feather.png', public_name='Demo',
        banner_image='https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg'),

        User(
        username='chris', email='chris@aa.io', password='password', is_artist=False,
        profile_picture='https://w7.pngwing.com/pngs/598/553/png-transparent-computer-icons-spotify-graphics-streaming-media-spotify-icon-logo-grass-feather.png', public_name='Demo',
        banner_image='https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg'),

        User(
        username='juice_wrld', email='juice_wrld@gmail.com', password='password', is_artist=True,
        profile_picture='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397266/SpotifyClone/e7d6d436f2794f6cbe077473f7fbf21e_xl_viqv0m.jpg', public_name='Juice Wrld',
        banner_image='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397267/SpotifyClone/web.ae_.juicewrld.courtesy_vdj4bn.jpg'),

        User(
        username='trap_nation', email='trap_nation@gmail.com', password='password', is_artist=True,
        profile_picture='https://res.cloudinary.com/dtzv3fsas/image/upload/v1684066078/SpotifyClone/maxresdefault_bd5ula.jpg', public_name='Trap Nation',
        banner_image='https://res.cloudinary.com/dtzv3fsas/image/upload/v1684066140/SpotifyClone/maxresdefault_k9fdkt.jpg'),

        User(
        username='j_cole', email='j_cole@gmail.com', password='password', is_artist=True,
        profile_picture='https://res.cloudinary.com/dtzv3fsas/image/upload/v1684064814/SpotifyClone/ewkssbs59fezmehq5qw8.jpg', public_name='J Cole',
        banner_image='https://res.cloudinary.com/dtzv3fsas/image/upload/v1684066117/SpotifyClone/tumblr_p334ymnmwt1vsaj6co4_1280_cgcxhz.jpg'),
    

        User(
        username='rihanna', email='rihanna@gmail.com', password='password', is_artist=True,
        profile_picture='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397266/SpotifyClone/e7d6d436f2794f6cbe077473f7fbf21e_xl_viqv0m.jpg', public_name='Rihanna',
        banner_image='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397267/SpotifyClone/web.ae_.juicewrld.courtesy_vdj4bn.jpg')
    ]

    for user in users:
        db.session.add(user)
        db.session.commit()

    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.commit()
