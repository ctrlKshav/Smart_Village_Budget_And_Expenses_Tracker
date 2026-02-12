from app.database import SessionLocal
from app import models

EMAIL = "admin@example.com"

def set_admin(email: str):
    db = SessionLocal()
    try:
        user = db.query(models.User).filter(models.User.email == email).first()
        if not user:
            print(f"User not found: {email}")
            return
        prev = getattr(user, 'role', None)
        user.role = 'admin'
        db.add(user)
        db.commit()
        print(f"Updated user {email}: role {prev} -> {user.role}")
    except Exception as e:
        print('Error:', e)
        db.rollback()
    finally:
        db.close()

if __name__ == '__main__':
    set_admin(EMAIL)
