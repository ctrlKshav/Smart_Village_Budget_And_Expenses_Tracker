from typing import Generator
from sqlalchemy.orm import Session

from .database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Dependency that creates a new SQLAlchemy session for each request
    and closes it when the request is finished.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
