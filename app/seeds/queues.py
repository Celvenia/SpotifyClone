# from app.models import db, Queue, environment, SCHEMA
# from sqlalchemy.sql import text
# from datetime import datetime

# # Adds a  user, you can add other users here if you want
# def seed_queues():
#     queue1 = Queue(user_id=1)
#     queue2 = Queue(user_id=2)
#     queue3 = Queue(user_id=3)
#     queue4 = Queue(user_id=4)
#     queue5 = Queue(user_id=5)
#     queue6 = Queue(user_id=6)
#     queue7 = Queue(user_id=7)
#     queue8 = Queue(user_id=8)
#     db.session.add(queue1)
#     db.session.add(queue2)
#     db.session.add(queue3)
#     db.session.add(queue4)
#     db.session.add(queue5)
#     db.session.add(queue6)
#     db.session.add(queue7)
#     db.session.add(queue8)

#     db.session.commit()

# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_queues():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.queued RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM queued"))
#         db.session.commit()
