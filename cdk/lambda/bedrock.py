import os
import boto3
import json
import base64
from io import BytesIO
import feedparser
from random import randint
from dotenv import load_dotenv
from aws_lambda_powertools import Logger

load_dotenv()

logger = Logger()   


bedrock_runtime = boto3.client(
    service_name="bedrock-runtime",
    region_name=os.environ.get('AWS_DEFAULT_REGION'),
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
    aws_session_token=os.environ.get('AWS_SESSION_TOKEN')
)
     
def lambda_handler(event, context):
    query_params = event.get("queryStringParameters", {})
    category = query_params.get("category", "")
    if not category:
        logger.error("Missing required parameter: category")
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

    try:
         # Fetch and parse the RSS feed related to the category
         #https://example.com/rss?category={category}
        rss_url = f"https://news.ubc.ca/rss?category=Science&Technology"  
        feed = feedparser.parse(rss_url)
        
        summaries = []
        
        for entry in feed.entries:
            title = entry.title
            content = entry.summary  # or entry.content if you need the full content
            
            # Summarize the article using Bedrock
            summary = invoke_bedrock_summary(content)
            summaries.append({"title": title, "summary": summary})

        # Return the summarized data
        return {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps(summaries)
        }
    except Exception as e:
        logger.exception(f"Error processing the feed: {e}")
        return {
            'statusCode': 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps('Internal server error')
        }


def invoke_bedrock_summary(content):
    # Define the prompt with the content
    prompt = f"""
    I need to summarize the content of the news article. The content of the article is between the <data> XML-like tags.

    <data>
    {content}
    </data>

    The summary must be concise and focus on the key points of the article. The output must be provided in the following JSON format:

    Example output:
    {{
        "summary": "<summarised_content>"
    }}

    Write the JSON output and nothing more.
    """

    # Call the Bedrock model to generate the summary
    summary = invoke(prompt, temperature=0.7, max_tokens=150)
    return summary



def invoke(prompt, temperature, max_tokens):
    # Configuration for the Bedrock model invocation
    prompt_config = {
        "prompt": f'\n\nHuman: {prompt} \n\nAssistant:',
        "max_tokens_to_sample": max_tokens,
        "temperature": temperature
    }

    try:
        # Invoke the model using Bedrock runtime
        response = bedrock_runtime.invoke_model(
            body=json.dumps(prompt_config),
            modelId="us.meta.llama3-2-3b-instruct-v1:0"
        )

        response_body = json.loads(response['body'].read())
        return response_body.get("completion")

    except Exception as e:
        logger.error(f"Error invoking the Bedrock model: {e}")
        return "Error generating summary"
    
def demotry():
# Fetch and parse the RSS feed related to the category
# https://example.com/rss?category={category}
    rss_url = f"https://news.ubc.ca/rss?category=Science&Technology"  
    feed = feedparser.parse(rss_url)
    
    summaries = []
    
    for entry in feed.entries:
        title = entry.title
        content = entry.summary  # or entry.content if you need the full content
        
        # Summarize the article using Bedrock
        summary = invoke_bedrock_summary(content)
        summaries.append({"title": title, "summary": summary})

    return {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
            },
            'body': json.dumps(summaries)
        }
demotry()
