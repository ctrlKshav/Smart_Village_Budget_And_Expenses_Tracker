"""merge heads

Revision ID: 7838992d0700
Revises: 20260212_add_role_to_users, 52279cc470c6
Create Date: 2026-02-12 12:08:16.236087

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7838992d0700'
down_revision: Union[str, Sequence[str], None] = ('20260212_add_role_to_users', '52279cc470c6')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
