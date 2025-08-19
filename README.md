# Install AI SDK
- npm install ai @ai-sdk/openai @ai-sdk/react zod

>>> ai - fundamental / core package , if provide all the fundamental function we need
>>> @ai-sdk/openai - connect us to openai models
>>> @ai-sdk/react - contain react specific use hook in our component
>>> zod

# Generate API key
  OpenAI - https://platform.openai.com/api-keys

# Start Development Server
  npm run dev

# Stream Text response
 - AI Models can be slow , especially when generating longer responses
 - User might be starting at spinner for 5, 10 , 20 seconds which is not a great experience
 - Instead of waiting for the entire response , we can start showing text as soon as the AI Starts   
   generating text  