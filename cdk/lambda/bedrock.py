import os
import boto3
import json
import base64
from io import BytesIO
from feedparser import parse
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()


bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-west-2",
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    aws_session_token=os.getenv('AWS_SESSION_TOKEN')
    )

def remove_html_tags(text):
    soup = BeautifulSoup(text, "html.parser")
    return soup.get_text()

def parse_feed():
    rss_url = "https://news.ubc.ca/category/science-technology/feed/"
    feed = parse(rss_url)
    a =[]
    for entry in feed.entries:
        title = entry.title
        content = entry.content[0].get("value")  # or entry.content if you need the full content
        a.append(remove_html_tags("" + content))
    for i in a:
        print("@")
        print("@")
        print("@")
        invoke_bedrock_summary(""+i)
        

# for i in info:
#     summary = invoke_bedrock_summary(i["summary"])
#     dic = {"title":i["title"]}
#     dic["summary"] = summary
#     output.append(dic)
        
     
# def lambda_handler(event, context):
#     query_params = event.get("queryStringParameters", {}) # event is a dictionary containing info about HTTP request
#     category = query_params.get("category", "") 
#     if not category:
#         print("Missing required parameter: category")
#         return {
#             'statusCode': 400,
#             "headers": {
#                 "Content-Type": "application/json",
#                 "Access-Control-Allow-Headers": "*",
#                 "Access-Control-Allow-Origin": "*",
#                 "Access-Control-Allow-Methods": "*",
#             },
#             'body': json.dumps('Missing required parameter: category')
#         }

#         # Fetch and parse the RSS feed related to the category
#         #https://example.com/rss?category={category}
        
#         # Summarize the article using Bedrock
#     output = []  
#     for i in info:
#         summary = invoke_bedrock_summary(i["summary"])
#         dic = {"title":i["title"]}
#         dic["summary"] = summary
#         output.append(dic)
        
       

def invoke_bedrock_summary(content):
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
    print(response_body)

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

parse_feed()
     

    
        
       

