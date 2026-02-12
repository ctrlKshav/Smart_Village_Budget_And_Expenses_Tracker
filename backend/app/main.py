from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import villages, budgets, categories, expenses, auth

# Initialize FastAPI application
app = FastAPI(
    title="Smart Village Budget and Expense Tracker API",
    description="API for managing village budgets, categories, and expenses",
    version="1.0.0"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "*"  # Allow all origins for development; remove or restrict in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(villages.router)
app.include_router(budgets.router)
app.include_router(categories.router)
app.include_router(expenses.router)


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Smart Village Budget and Expense Tracker API",
        "docs": "/docs",
        "redoc": "/redoc"
    }
