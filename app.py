import os
from dotenv import load_dotenv
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

load_dotenv()

app = App(token=os.environ.get("OAUTH_SLACK_READ"))

@app.event("message")
def parse_update(body, logger):
    try:
        # Extract and print the message content
        text = body.get("event", {}).get("text", "")
        user = body.get("event", {}).get("user", "")
        joe = "U080GCRATP1"
        if str(user) == joe:
            print("Message from Joe!")
            message = text.split()
            if message[0] == 'Data' and message[4] == 'released':
                passcode = message[9][1:len(message[9])-2]
                file = message[5][1:len(message[5])-1]
                print(f"file is {file} with password {passcode}")
                out = open('out.txt', 'w')
                out.write(file + "\n" + passcode)
                out.close()
                os.system('python recursive_mean.py > answer.txt')

    except Exception as e:
        logger.error(f"Error in message handler: {e}")

if __name__ == "__main__":
    SocketModeHandler(app, os.environ["APP_SLACK"]).start()
