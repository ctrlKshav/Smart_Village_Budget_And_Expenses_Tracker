"""Add role column to users table

Revision ID: 20260212_add_role_to_users
Revises: 
Create Date: 2026-02-12 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '20260212_add_role_to_users'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('users', sa.Column('role', sa.String(length=20), nullable=False, server_default='villager'))


def downgrade():
    op.drop_column('users', 'role')
