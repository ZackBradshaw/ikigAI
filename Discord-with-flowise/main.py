import os
import discord
import requests
import asyncio
from dotenv import load_dotenv
from discord import app_commands

load_dotenv()
API_KEY = os.getenv('API_KEY')
DISCORD_BOT_SECRET = os.getenv('DISCORD_BOT_SECRET')
FLOWISE_API_URL = "https://flow.ikig-ai.me/api/v1/prediction/b72742a3-46d1-41bf-a493-46b86925e5be"
SURVEY_API_URL = "https://flow.ikig-ai.me/api/v1/prediction/41a93541-c253-4426-8341-bc336f5c8e11"
headers = {"Authorization": API_KEY}

class CustomClient(discord.Client):

    def __init__(self, *, intents: discord.Intents):
        super().__init__(intents=intents)
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()

client = CustomClient(intents=discord.Intents.all())

def query(api_url, payload):
    try:
        response = requests.post(api_url, headers=headers, json=payload)
        return response.json()
    except Exception as e:
        return {"error": str(e)}
        
async def survey(interaction):
    questions = [
        ("Section 1: Passions\nWhat activities make you lose track of time, and what hobbies or tasks do you love so much that you would do them for free?", "passions"),
        ("Section 2: Missions\nWhat causes or issues deeply resonate with you, and if you had all the resources in the world, what problem would you want to solve?", "missions"),
        ("Section 3: Professions\nWhat are your top three skills or talents, and if you could choose any job in the world, what would it be?", "professions"),
        ("Section 4: Vocations\nWhat skills or talents do you possess that people would be willing to pay for, and if you were to start a business or offer a service, what would it be?", "vocations"),
    ]

    input_array = []  # To hold the array of question-answer objects
    for question_text, section in questions:
        await interaction.followup.send(question_text)
        try:
            response = await client.wait_for('message', timeout=120.0, check=lambda message: message.author == interaction.user)
            input_array.append({"question": question_text, "answer": response.content}) # Appending the question and answer as an object
        except asyncio.TimeoutError:
            await interaction.followup.send('You took too long to answer. Please try the survey again.')
            return None
        print([input_array])
    return input_array

@client.event
async def on_ready():
    print("I'm in")
    print(client.user)

@client.tree.command(name="flowise", description="Ask a question to Flowise")
async def flowise(interaction: discord.Interaction, question: str):
    await interaction.response.defer()
    output = query(FLOWISE_API_URL, {"question": question})
    await interaction.followup.send(output)

@client.tree.command(name="survey", description="Take a survey")
async def survey_command(interaction: discord.Interaction):
    await interaction.response.defer()
    answers = await survey(interaction)
    if answers:
        output = query(SURVEY_API_URL, answers)
        # Format the output as needed
        formatted_output = output  # Modify this line to format the output as desired
        await interaction.followup.send(formatted_output)

client.run(DISCORD_BOT_SECRET)


