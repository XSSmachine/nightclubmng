from pymongo import MongoClient, ReturnDocument, collection
from bson.objectid import ObjectId
import model
import security
import asyncio
import uuid
import os
import motor
from fastapi.encoders import jsonable_encoder

client = MongoClient("mongodb+srv://app:MawYwTsNz7ZCPMVL@demo.ipiv57e.mongodb.net/")
global db
db = client["nightclubmng"]
users_collection = db["users"]
events_collection = db["events"]
tickets_collection = db["tickets"]
print("database.init_db(): Connected to the MongoDB database!")



#================================================================
def collection_exists(collection_name):
    return collection_name in db.list_collection_names()

# Create counters collection and initialize sequence numbers if it doesn't exist
if not collection_exists("counters"):
    db.create_collection("counters")
    db.counters.insert_many([
        {"_id": "user_id", "seq": 0},
        {"_id": "event_id", "seq": 0},
        {"_id": "ticket_id", "seq": 0}
    ])


# Function to generate the next sequence number
def get_next_sequence_number(sequence_name):
    counter = db.counters.find_one_and_update(
        {"_id": sequence_name},
        {"$inc": {"seq": 1}},
        return_document=ReturnDocument.AFTER
    )
    if counter is None:
        # If the document doesn't exist, create it with the initial sequence number
        db.counters.insert_one({"_id": sequence_name, "seq": 1})
        return 1
    else:
        return counter["seq"]
#================================================================


# user manipulation
#================================================================
async def new_user(user_data: model.UserDb):
    hashed_password = security.hash_password(user_data.password)
    _id = get_next_sequence_number("user_id")
    user = {"_id": _id, "username": user_data.username, "email": user_data.email, "password": hashed_password}
    # result = await db.users.insert_one(user)
    # return result

    new_todo = db["users"].insert_one(jsonable_encoder(user))
    inserted_event = db["users"].find_one({"_id": new_todo.inserted_id})
    created_event = model.UserDb(**inserted_event)
    return created_event

async def get_user(username: str, password: str = None):
    document = db["users"].find_one({"username": username})
    print(f'database.get_user({username}, {password}): {document}')
    if document:
        user = model.UserDb(**document)
        if (password):
            if (security.verify_password(password, user.password)):
                return user
        else:
            return user

async def get_all_users():
    users = []
    async for user in users_collection.find():
        users.append(user)
    return users

async def get_user_by_id(user_id):
    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if user:
        return {"id": str(user["_id"]), "username": user["username"]}
    return None

async def update_user_by_id(user_id, updated_user):
    user = await users_collection.find_one_and_update(
        {"_id": ObjectId(user_id)},
        {"$set": {"username": updated_user.username, "password": updated_user.password}},
        return_document=True
    )
    if user:
        return {"id": str(user["_id"]), "username": user["username"]}
    return None


async def delete_user_by_id(user_id):
    result = await users_collection.delete_one({"_id": ObjectId(user_id)})
    return result.deleted_count > 0
#================================================================


#event management
#================================================================
async def new_event(event_in: model.EventCreate):
    event = model.Event(
        _id=get_next_sequence_number("user_id"),
        name=event_in.name,
        description=event_in.description

    )

    new_todo = db["events"].insert_one(jsonable_encoder(event))
    inserted_event = db["events"].find_one({"_id": new_todo.inserted_id})
    created_event = model.Event(**inserted_event)
    return created_event
#================================================================


# Ticket management
#================================================================
async def new_ticket(ticket_data: model.TicketCreate):
    event = model.Ticket(
        _id=get_next_sequence_number("user_id"),
        event_id=ticket_data.event_id,
        event_name=ticket_data.event_name,
        username=ticket_data.username,
        quantity=ticket_data.quantity,
        price=ticket_data.price

    )

    new_ticket = db["tickets"].insert_one(jsonable_encoder(event))
    inserted_ticket = db["tickets"].find_one({"_id": new_ticket.inserted_id})
    created_event = model.Ticket(**inserted_ticket)
    return created_event

async def get_all_tickets():
    tickets = []
    tickets = list(db["tickets"].find({}))
    return tickets


async def get_ticket_by_id(ticket_id):
    inserted_ticket = db["tickets"].find_one({"_id": ticket_id})
    ticket = model.Ticket(**inserted_ticket)

    return ticket


async def update_ticket_by_id(ticket_id, updated_ticket: model.TicketCreate):
    ticket = db["tickets"].find_one({"_id": ticket_id})
    if not ticket:
        return None
    else:

        update_data = {"$set": {
             "quantity": updated_ticket.quantity}}
        db["tickets"].update_one({"_id": ticket_id}, update_data)

        refreshed_ticket = db["tickets"].find_one({"_id": ticket_id})
        final_ticket = model.Ticket(**refreshed_ticket)
        return final_ticket


async def delete_ticket_by_id(ticket_id):
    result = tickets_collection.delete_one({"_id": ticket_id})
    return result.deleted_count > 0



# Event methods
#================================================================
async def get_all_events():
    events = []
    events = list(db["events"].find({}))
    return events


async def get_event_by_id(event_id):
    inserted_event = db["events"].find_one({"_id": event_id})
    event = model.Event(**inserted_event)

    return event


async def update_event_by_id(event_id, updated_event: model.EventCreate):
    event = db["events"].find_one({"_id": event_id})
    if not event:
        return None
    else:
        # Update the event with the provided data
        update_data = {"$set": {"name": updated_event.name, "description": updated_event.description}}
        db["events"].update_one({"_id": event_id}, update_data)

        refreshed_event = db["events"].find_one({"_id": event_id})
        final_event = model.Event(**refreshed_event)
        return final_event


async def delete_event_by_id(event_id):
    result = events_collection.delete_one({"_id": event_id})
    return result.deleted_count > 0

#================================================================




