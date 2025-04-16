from typing import Union
from fastapi import FastAPI, WebSocket
from gpiozero import Motor
# import sparkmotor

app = FastAPI()
# testmotor = sparkmotor.PWMController(pin=12)  # Update with the correct GPIO pin

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.websocket("/drivepwr/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
        print("Received", data)
        # testmotor.set_power(float(data))