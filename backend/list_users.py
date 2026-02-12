from app.database import SessionLocal
from app import models

s = SessionLocal()
users = s.query(models.User).all()
for u in users:
    print(u.id, u.email, getattr(u, 'role', None), u.village_id)
s.close()
