from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from backend import models, schemas, crud, auth, database


models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()
origins = [
    "http://localhost:3000",
]
# ✅ Allow both localhost:3000 (React) and 5173 (Vite)
app.add_middleware(
    CORSMiddleware,
       allow_origins=["http://localhost:3000",
                       "http://127.0.0.1:3000",
                       "http://10.10.3.225:3000",
                       "http://localhost:3001",       # 👈 Add this
                       "http://127.0.0.1:3001"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/signup", response_model=schemas.UserResponse)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db, user)


@app.post("/signin")
def signin(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if not db_user or not auth.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer"}
