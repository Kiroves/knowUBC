import os
import boto3
import json
import base64
from io import BytesIO

bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-west-2",
)
     
def lambda_handler(event, context):
    query_params = event.get("queryStringParameters", {})
    category = query_params.get("category", "")
    if not category:
        print("Missing required parameter: category")
        return {
            'statusCode': 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps('Missing required parameter: category')
        }

        # Fetch and parse the RSS feed related to the category
        #https://example.com/rss?category={category}
        
        # Summarize the article using Bedrock
    summary = invoke_bedrock_summary("The octopus is a fascinating marine creature known for its intelligence, adaptability, and unique physical characteristics. Belonging to the class Cephalopoda, octopuses are mollusks that can be found in oceans around the world, from shallow coastal waters to the deep sea. One of their most notable features is their eight arms, which are lined with sensitive suckers that can taste and feel their environment. These arms not only aid in locomotion but also assist in hunting and capturing prey, such as crabs, fish, and mollusks. Octopuses are renowned for their remarkable ability to change color and texture, a skill that serves various purposes, including camouflage to evade predators and communication with other octopuses. Their complex nervous system, with a significant portion of their neurons located in their arms, allows for intricate movement and problem-solving abilities, making them one of the most intelligent invertebrates. In addition to their unique biology, octopuses possess three hearts: two pump blood to the gills for oxygenation, while the third circulates it to the rest of the body. Interestingly, their blood is blue due to the presence of hemocyanin, which is more efficient at transporting oxygen in cold, low-oxygen environments.")
    return (summary)
        
       

def invoke_bedrock_summary(content):
    # Define the prompt with the content
    prompt =  "I need to summarize the content of the news article. The content of the article is" + content + "The summary must be concise and focus on the key points of the article. The output must be a string"

    # Call the Bedrock model to generate the summary
    summary = invoke(prompt, temperature=0.7, max_tokens=150)
    return summary



def invoke(prompt, temperature, max_tokens):
    # Configuration for the Bedrock model invocation
    prompt_config = {
        "prompt": f'\n\nHuman: {prompt} \n\nAssistant:',
        "temperature": temperature
    }

    response = bedrock_runtime.invoke_model(
        body=json.dumps(prompt_config),
        modelId="meta.llama3-70b-instruct-v1:0")
        

    response_body = json.loads(response['body'].read())

    return {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps(response_body)
        }