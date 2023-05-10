from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', is_artist=False,
        profile_picture='https://w7.pngwing.com/pngs/598/553/png-transparent-computer-icons-spotify-graphics-streaming-media-spotify-icon-logo-grass-feather.png', public_name='Demo',
        banner_image='https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', is_artist=False,
        profile_picture='https://w7.pngwing.com/pngs/598/553/png-transparent-computer-icons-spotify-graphics-streaming-media-spotify-icon-logo-grass-feather.png', public_name='Demo',
        banner_image='https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', is_artist=False,
        profile_picture='https://w7.pngwing.com/pngs/598/553/png-transparent-computer-icons-spotify-graphics-streaming-media-spotify-icon-logo-grass-feather.png', public_name='Demo',
        banner_image='https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg')
    chris = User(
        username='chris', email='chris@aa.io', password='password', is_artist=True,
        profile_picture='https://w7.pngwing.com/pngs/598/553/png-transparent-computer-icons-spotify-graphics-streaming-media-spotify-icon-logo-grass-feather.png', public_name='Demo',
        banner_image='https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg')
    juice_wrld = User(
        username='juice_wrld', email='juice_wrld@gmail.com', password='password', is_artist=True,
        profile_picture='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397266/SpotifyClone/e7d6d436f2794f6cbe077473f7fbf21e_xl_viqv0m.jpg', public_name='Juice Wrld',
        banner_image='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397267/SpotifyClone/web.ae_.juicewrld.courtesy_vdj4bn.jpg')
    the_weeknd = User(
        username='the_weeknd', email='the_weeknd@gmail.com', password='password', is_artist=True,
        profile_picture='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397266/SpotifyClone/e7d6d436f2794f6cbe077473f7fbf21e_xl_viqv0m.jpg', public_name='The Weekend',
        banner_image='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397267/SpotifyClone/web.ae_.juicewrld.courtesy_vdj4bn.jpg')
    calvin_harris = User(
        username='calvin_harris', email='calvin_harris@gmail.com', password='password', is_artist=True,
        profile_picture='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397266/SpotifyClone/e7d6d436f2794f6cbe077473f7fbf21e_xl_viqv0m.jpg', public_name='Calvin Harris',
        banner_image='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397267/SpotifyClone/web.ae_.juicewrld.courtesy_vdj4bn.jpg')
    rihanna = User(
        username='rihanna', email='rihanna@gmail.com', password='password', is_artist=True,
        profile_picture='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397266/SpotifyClone/e7d6d436f2794f6cbe077473f7fbf21e_xl_viqv0m.jpg', public_name='Rihanna',
        banner_image='https://res.cloudinary.com/dtzv3fsas/image/upload/v1683397267/SpotifyClone/web.ae_.juicewrld.courtesy_vdj4bn.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(chris)
    db.session.add(juice_wrld)
    db.session.add(the_weekend)
    db.session.add(calvin_harris)
    db.session.add(rihanna)
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
