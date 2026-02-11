"""Seed database with sample data for testing."""
import sys
from datetime import date, datetime
from decimal import Decimal

from app.database import SessionLocal
from app import models, crud, schemas


def seed_data():
    """Add sample data to the database."""
    db = SessionLocal()
    
    try:
        # Check if villages exist first (to determine which village to assign to admin)
        existing_villages = db.query(models.Village).count()
        
        # Create villages if they don't exist
        if existing_villages == 0:
            print("🌱 Seeding database with sample data...")
            
            # Create villages
            villages_data = [
                {"name": "Greenfield Village", "district": "Central District", "state": "Maharashtra"},
                {"name": "Riverside Village", "district": "North District", "state": "Punjab"},
                {"name": "Mountain View Village", "district": "Hill District", "state": "Himachal Pradesh"},
            ]
            
            villages = []
            for village_data in villages_data:
                village = models.Village(**village_data)
                db.add(village)
                villages.append(village)
            
            db.commit()
            print(f"✓ Created {len(villages)} villages")
        else:
            print(f"✓ Database already has {existing_villages} villages.")
            villages = db.query(models.Village).all()
        
        # Refresh villages to ensure they have IDs
        for v in villages:
            db.refresh(v)
        
        # Create admin user if doesn't exist
        admin_email = "admin@example.com"
        existing_admin = crud.get_user_by_email(db=db, email=admin_email)
        
        if not existing_admin:
            print("👤 Creating admin user...")
            admin_user = schemas.UserCreate(
                name="Admin User",
                email=admin_email,
                password="admin123",
                village_id=villages[0].id  # Assign to first village
            )
            admin = crud.create_user(db=db, user=admin_user)
            print(f"✓ Created admin user: {admin.email} for village: {villages[0].name}")
        else:
            # Update admin user's village if not set
            if existing_admin.village_id is None:
                existing_admin.village_id = villages[0].id
                db.commit()
                print(f"✓ Updated admin user {existing_admin.email} with village: {villages[0].name}")
            else:
                print(f"✓ Admin user already exists: {existing_admin.email}")
        
        # Check if budgets already exist
        existing_budgets = db.query(models.Budget).count()
        if existing_budgets > 0:
            print(f"✓ Database already has {existing_budgets} budgets. Skipping budget seed.")
            return
        
        # Create budgets for villages
        budgets = []
        for i, village in enumerate(villages):
            db.refresh(village)  # Ensure village has ID
            budget = models.Budget(
                village_id=village.id,
                year=2024 + i % 2,
                total_allocated=Decimal("1000000.00") + Decimal(i * 500000)
            )
            db.add(budget)
            budgets.append(budget)
        
        db.commit()
        print(f"✓ Created {len(budgets)} budgets")
        
        # Create budget categories
        categories_data = [
            {"category_name": "Infrastructure", "allocated_amount": Decimal("400000.00")},
            {"category_name": "Education", "allocated_amount": Decimal("300000.00")},
            {"category_name": "Healthcare", "allocated_amount": Decimal("200000.00")},
            {"category_name": "Agriculture", "allocated_amount": Decimal("100000.00")},
        ]
        
        categories = []
        for budget in budgets:
            db.refresh(budget)  # Ensure budget has ID
            for cat_data in categories_data:
                category = models.BudgetCategory(
                    budget_id=budget.id,
                    category_name=cat_data["category_name"],
                    allocated_amount=cat_data["allocated_amount"]
                )
                db.add(category)
                categories.append(category)
        
        db.commit()
        print(f"✓ Created {len(categories)} budget categories")
        
        # Create expenses
        expenses_data = [
            {
                "description": "Road construction materials",
                "amount": Decimal("150000.00"),
                "vendor_name": "BuildRight Suppliers",
                "expense_date": date(2024, 3, 15)
            },
            {
                "description": "School furniture",
                "amount": Decimal("75000.00"),
                "vendor_name": "Edu Furnishings Ltd",
                "expense_date": date(2024, 4, 20)
            },
            {
                "description": "Medical equipment",
                "amount": Decimal("85000.00"),
                "vendor_name": "HealthCare Supplies",
                "expense_date": date(2024, 5, 10)
            },
            {
                "description": "Fertilizer distribution",
                "amount": Decimal("45000.00"),
                "vendor_name": "Agro Solutions",
                "expense_date": date(2024, 6, 5)
            },
        ]
        
        expenses = []
        for category in categories[:4]:  # Add expenses to first 4 categories
            db.refresh(category)  # Ensure category has ID
            expense = models.Expense(
                category_id=category.id,
                description=expenses_data[len(expenses) % len(expenses_data)]["description"],
                amount=expenses_data[len(expenses) % len(expenses_data)]["amount"],
                vendor_name=expenses_data[len(expenses) % len(expenses_data)]["vendor_name"],
                expense_date=expenses_data[len(expenses) % len(expenses_data)]["expense_date"]
            )
            db.add(expense)
            expenses.append(expense)
        
        db.commit()
        print(f"✓ Created {len(expenses)} expenses")
        
        print("\n✅ Database seeded successfully!")
        print("\n📊 Summary:")
        print(f"   Villages: {len(villages)}")
        print(f"   Budgets: {len(budgets)}")
        print(f"   Categories: {len(categories)}")
        print(f"   Expenses: {len(expenses)}")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    seed_data()
