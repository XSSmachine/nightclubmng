from typing import List

from fastapi import FastAPI, HTTPException, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import JWTError, jwt
from pydantic import BaseModel, ValidationError
from starlette import status
from starlette.responses import JSONResponse
from starlette.status import HTTP_401_UNAUTHORIZED

from database import *
from model import *
from security import *

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# @app.on_event("startup")
# async def startup_db_client():
#     await database.init_db()


### API: Auth & Users ###
#================================================================================================
async def authenticated(token: str = Depends(oauth2_scheme)):
    return await security.authenticated(token)

@app.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    return await security.login(form.username, form.password)

@app.post("/signup/users", response_model=model.UserIn)
async def create_user(user: model.UserIn = Body(...)):
    new_user = await database.new_user(user)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=new_user.dict())


@app.get("/users/me", response_model=model.UserDb)
async def get_me(current_user: model.UserDb = Depends(authenticated)):
    return jsonable_encoder(current_user)

# Event CRUD methods
#================================================================================================
@app.get("/events", response_model=List[model.Event])
async def get_events():
    events = await database.get_all_events()
    return events

@app.get("/events/{event_id}", response_model=Event)
async def get_event_by_id(event_id: int):
    event = await database.get_event_by_id(event_id)
    if event:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=event.dict())
    raise HTTPException(404, f"There is no event with the ID {event_id}")

@app.post("/events", response_model=model.Event)
async def create_event(event_data: model.EventCreate = Body(...)):
    event = await database.new_event(event_data)  # Await the coroutine

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=event.dict())

@app.put("/events/{event_id}", response_model=model.Event)
async def update_event(event_id: int, updated_event: EventCreate = Body(...)):
    my_event = await database.update_event_by_id(event_id, updated_event)

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=my_event.dict())


@app.delete("/events/{event_id}")
async def delete_event(event_id: int):
    result = await database.delete_event_by_id(event_id)
    if result:
        return {"message": "Event deleted"}
    raise HTTPException(404, f"There is no event with the ID {event_id}")
#================================================================================================


# Tickets
#================================================================================================
@app.get("/tickets", response_model=List[model.Ticket])
async def get_tickets():
    tickets = await database.get_all_tickets()
    return tickets

@app.get("/tickets/{ticket_id}", response_model=model.Ticket)
async def get_ticket_by_id(ticket_id: int):
    ticket = await database.get_ticket_by_id(ticket_id)
    if ticket:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=ticket.dict())
    raise HTTPException(404, f"There is no event with the ID {ticket_id}")

@app.post("/tickets", response_model=model.Ticket)
async def create_ticket(
    current_user: model.UserDb = Depends(authenticated),
    ticket_data: model.TicketCreate = Body(...)):
    event = await database.get_event_by_id(ticket_data.event_id)
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")

    user = jsonable_encoder(current_user)
    usernamee = user['username']
    ticket = model.TicketCreate(
        event_id=ticket_data.event_id,
        event_name=event.name,
        username=usernamee,
        quantity=ticket_data.quantity,
        price=ticket_data.price
    )
    printed_ticket = await database.new_ticket(ticket)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=printed_ticket.dict())

@app.put("/tickets/{ticket_id}", response_model=model.Ticket)
async def update_ticket(ticket_id: int, updated_ticket: TicketCreate = Body(...)):
    my_ticket = await database.update_ticket_by_id(ticket_id, updated_ticket)

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=my_ticket.dict())

@app.delete("/tickets/{ticket_id}")
async def delete_ticket(ticket_id: int):
    result = await delete_ticket_by_id(ticket_id)
    if result:
        return {"message": "Ticket deleted"}
    raise HTTPException(404, f"There is no ticket with the ID {ticket_id}")
#================================================================================================

# Error handling for HTTPException
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code, content={"detail": exc.detail})

