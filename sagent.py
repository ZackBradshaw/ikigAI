
import os
import openai
import pprint



def generate_response(messages,key):
    
    openai.api_key =key
    model_name ="gpt-3.5-turbo"
    response = openai.ChatCompletion.create(
            model=model_name,
            messages=messages,
            temperature=0.5,
            max_tokens=250)

   
    
    pp = pprint.PrettyPrinter(indent=4)
    print("Request:")
    pp.pprint(messages)

   
    print(f"Completion tokens: {response['usage']['completion_tokens']}, Prompt tokens: {response['usage']['prompt_tokens']}, Total tokens: {response['usage']['total_tokens']}")

   
    return response['choices'][0]['message']

# Main function to run the chatbot
def main():
    key=input("Enter your open api key:")
    # Initialize the messages with a system message
    messages=[
        {"role": "system", "content": "You are a ikigai guruwho will guide me on my questions"}
        ]

    # Continue chatting until the user types "quit"
    while True:
        input_text = input("You: ")
        if input_text.lower() == "quit":
            break

        # Add the user's message to the messages
        messages.append({"role": "user", "content": input_text})

        # Get a response from the model and add it to the messages
        response = generate_response(messages,key)
        messages.append(response)

        # Print the assistant's response
        print(f"Wizard: {response['content']}")

# Run the main function when the script is run
if __name__ == "__main__":
    main()