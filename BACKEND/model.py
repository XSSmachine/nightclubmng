from pydantic import BaseModel, Field


class UserIn(BaseModel):
    username: str
    email: str
    password: str

class UserDb(BaseModel):
    id: int = Field(alias="_id")
    username: str
    email: str
    password: str

class EventCreate(BaseModel):
    name: str
    description: str

class Event(BaseModel):
    id: int = Field(alias="_id")
    name: str
    description: str

class TicketCreate(BaseModel):
    event_id: int
    event_name: str
    username: str
    quantity: int
    price: float

class Ticket(BaseModel):
    id: int = Field(alias="_id")
    event_id: int
    event_name: str
    username: str
    quantity: int
    price: float

