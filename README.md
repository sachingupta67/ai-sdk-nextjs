# 🚀 Install AI SDK

```bash
npm install ai @ai-sdk/openai @ai-sdk/react zod
````

* **ai** → Core package, provides all fundamental functions
* **@ai-sdk/openai** → Connects to OpenAI models
* **@ai-sdk/react** → React-specific hooks for integration
* **zod** → Input validation made easy

---

# 🔑 Generate API Key

👉 Get it from [OpenAI Dashboard](https://platform.openai.com/api-keys)

---

# ▶️ Start Development Server

```bash
npm run dev
```

---

# ⚡ Stream Text Response

AI models can be **slow** ⏳, especially for long answers.
Users may end up staring at a **spinner for 5, 10, or even 20 seconds** — not a great experience.

✅ Instead of waiting for the **entire response**, start **streaming text** as soon as the AI begins generating it.
This gives a smooth **ChatGPT-like experience** ✨.






---

# 🤖 What is an AI Model?

An **AI Model** is:

* a program trained on a dataset
* designed to **recognize patterns**
* make **predictions or decisions**
* often **without human intervention**

💡 Think of it as:

* A really smart assistant who has read millions of books 📚
* It can **write, analyze, or create** content based on that knowledge
* AI models power **autocomplete**, **recommendation engines**, and even **self-driving cars** 🚗

---

## 🔮 Types of AI Models

### 1. Text Generation Models (LLMs)

* Process and generate **human-like text**
* Used for writing, analysis, conversation, and even code

👉 **Large Language Models (LLMs):**

* Called "large" because they’re trained on **massive datasets**
* Example: **GPT-4 (OpenAI)**, **Claude (Anthropic)**, **Gemini (Google)**

---

### 2. Embedding Models

* Convert text into **vectors (numbers)** representing meaning
* Similar meanings are **closer together in vector space**
* Power features like **search & recommendations**

💡 Example: Search "pasta places" → find **Italian restaurants** 🍝

---

### 3. Image Models

* Generate or analyze images 🖼️
* Example: **MidJourney**, **DALL·E (OpenAI)**, **Flux**
* Perfect for: product images, photo analysis, creative visuals

---

### 4. Multi-Modal Models

* The **Swiss army knife 🔪** of AI
* Handle **multiple inputs/outputs** (text, images, sometimes audio)
* Very powerful, but usually more expensive

👉 Examples: **GPT-4o**, **Claude-4**, **Gemini**

---

## ⚙️ Key Characteristics of AI Models

| Characteristic        | Meaning                                            | When It Matters                               |
| --------------------- | -------------------------------------------------- | --------------------------------------------- |
| 🧠 **Context Window** | How much info a model can process at once          | Document analysis needs large context         |
| 🎯 **Intelligence**   | Ability to follow complex instructions, creativity | Best for nuanced tasks & content creation     |
| ⚡ **Speed**           | Response time                                      | Real-time chat/autocomplete needs fast models |
| 💰 **Cost**           | Price per use                                      | Balance between dev stage vs production       |

---

## 🎯 Choosing the Right Model

* **Real-time chat / autocomplete** → Pick **fast models** ⚡
* **Content generation** → Pick **high-quality, intelligent models** 🧠
* **Document analysis** → Pick **large context window models** 📑
* **Always test & compare** before locking choice 🔍

👉 Analogy: Choosing between a **sports car** 🏎️ and a **city car** 🚙 → both work, but one is for **performance**, the other for **efficiency**.

---

## 🏭 Providers (Who Build the Models)

If models are **cars**, then **providers are manufacturers** 🏭

| Provider      | Famous Models         | Like a…         |
| ------------- | --------------------- | --------------- |
| **OpenAI**    | GPT-4o, GPT-3.5       | Tesla ⚡         |
| **Anthropic** | Claude-3.5            | Mercedes 🚘     |
| **Google**    | Gemini-1.5            | BMW 🚗          |
| **Others**    | Cohere, Mistral, Meta | Niche brands 🚙 |

---

## 🔑 Choosing a Provider

* ✅ **Reliability** → Is uptime stable?
* 💵 **Pricing** → Fits your budget?
* 🛠️ **Features** → Do they support what you need?
* 🔒 **Privacy** → How do they handle your data?

---

## 🔄 Switching Models with **AI SDK**

Super easy → just **change 2 lines of code** 🎉

### 1️⃣ Install SDKs

```bash
npm install @ai-sdk/anthropic
npm install @ai-sdk/google
```

### 2️⃣ Add API Keys

**`.env.local`**

```env
OPENAI_API_KEY="openai-api-key"
ANTHROPIC_API_KEY="anthropic-api-key"
GOOGLE_GENERATIVE_AI_API_KEY="google-api-key"
```

### 3️⃣ Update Your Code

```js
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";

streamText({
  // model: openai("gpt-4.1-nano"),
  // model: anthropic("claude-3-5-haiku-20241022"),
  model: google("gemini-1.5-flash"),
  prompt,
});
```

✅ That’s it → You’ve switched models! 🚀

---

## 📌 Quick Reference Cheat Sheet

| Use Case              | Best Model Choice          |
| --------------------- | -------------------------- |
| ⚡ Real-time chat      | Fast, small models         |
| ✍️ Content creation   | Smart, high-quality models |
| 📑 Document analysis  | Large context models       |
| 💸 Budget dev/testing | Cheaper, smaller models    |

---


Here’s a polished and more engaging version of your markdown notes 👇

---

# 🔹 What are Tokens in AI Context?

* A **token** is the smallest unit of text a model processes.
* Think of it as **chunks of text** (not fixed length).
* Tokens can be:

  * Whole words
  * Parts of words
  * Individual characters
  * Punctuation marks

⚡ The same word may be split differently by different models.

---

### 🧩 Example: Word Splitting

* **"Hamburger"**

  * Model A → `"ham"`, `"bur"`, `"ger"`
  * Model B → `"ham"`, `"burger"`

* **"I love to eat pizza!"**

  * Model A (6 tokens) → `"I"`, `"love"`, `"to"`, `"eat"`, `"pizza"`, `"!"`

🔗 Try it yourself → [OpenAI Tokenizer](https://platform.openai.com/tokenizer)

---

# 🎯 Why Tokens Matter?

Tokens directly impact your app in **3 key ways**:

1️⃣ **How much text you can process at once**
→ Every model has a max token capacity.

2️⃣ **API cost**
→ More tokens = higher cost.

3️⃣ **Quality of results**
→ If the context is too long, old info gets dropped.

---

## 📝 Context Window (Short-Term Memory)

* The **context window** = how many tokens the model can handle in one go.
* Example:

  * **GPT-4.1-nano** → up to **1M tokens** per conversation.
  * That’s \~2,500–3,000 pages → almost the **entire Lord of the Rings Trilogy** in one shot!

🖊️ Imagine the model’s memory like a **whiteboard**:

* As you write new stuff, old notes get erased when space runs out.

---

# 🔄 Input vs Output Tokens

* **Input Tokens** → everything you send (prompt + system messages + history).
* **Output Tokens** → everything the model generates in response.

💡 Why it matters:

* Different models have **different input/output limits**.
* **Pricing** is often **different** for input vs output tokens.
* Optimizing this = saves \$\$ and improves performance.

🔗 [Check OpenAI Pricing](https://platform.openai.com/docs/pricing)

---

📸 Token Example:

![alt text](<Screenshot 2025-08-19 at 11.23.48 PM-1.png>)


Here’s a polished version of your markdown with improved clarity, structure, and readability:

---

# 💬 Chat with AI

* Each **prompt** is treated as a completely independent request.
* It’s similar to browsing the web in **Incognito Mode** → the AI starts fresh every time with **zero memory** of past messages.

👉 To build a **proper conversation experience**, we need to:

* Maintain an **ordered history** of all messages.
* Include that history with **every new prompt**.

✨ The **AI SDK** makes this otherwise complex process super simple.

---

## 🚀 How to Approach (Building a Chatbot)

1. **Create a Route Handler**

   * Handles communication with OpenAI while maintaining conversation history.
   * **Code:** `src/app/api/chat`

2. **Build a Chat UI**

   * Displays the conversation in an interactive interface.
   * **Code:** `src/app/ui/chat`

--- 


Here’s a polished, more engaging **markdown version** of your content, with a clean structure, clear hierarchy, and improved flow 👇

---

# ✨ Structured Data with AI

We’ve all been generating text responses from AI — great for **chat interfaces** and **content generation**.
But when you’re building the frontend of an application, you often need **data in a specific format**.

---

## 🚫 The Problem with Text Responses

* If you’re building a **recipe app**, you don’t want the AI to just write paragraphs about cooking.

  * You need **ingredients as arrays**, **steps in order**, and **cooking time as a number**.
* If you’re building a **task manager**, you need tasks with specific properties:

  * `title`, `priority`, `dueDate`.
* You *could* try to parse AI’s text output… but that’s **messy and error-prone**.

  * Every slight formatting change breaks your logic.

---

## ✅ Enter Structured Data

With structured data, you can **tell the AI the exact shape** of the response you need.
It will return **objects and arrays** that can be used directly in your code.

**Example:**
👉 Build a recipe generator:

* User enters a dish name.

* AI returns a structured recipe object:

  ```json
  {
    "recipe": {
      "name": "Pasta",
      "ingredients": [
        { "name": "Tomato", "amount": "2 cups" },
        { "name": "Pasta", "amount": "200g" }
      ],
      "steps": [
        "Boil pasta",
        "Make sauce",
        "Mix and serve"
      ]
    }
  }
  ```

* **API**: `/api/structured-data`

* **UI**: `/ui/structured-data`

---

## 💡 Real Use Cases

* 🛒 **Product Catalogs** → `name`, `price`, `description`, `category`
* 📊 **Analysis Reports** → `dataPoints[]`, `conclusion`
* ✅ **Task Lists** → `title`, `priority`, `dueDate`
* 🎓 **Quizzes** → `question`, `choices[]`, `answer`

---

## 🔧 Schema Support in AI SDK

Structured data generation supports:

* 📦 **Nested objects**
* 📋 **Arrays of objects**
* ❓ **Optional fields**
* 🎛 **Enums for fixed choices**
* 🔢 **Numbers, booleans, dates**

---



# 🎮 Pokémon & 📝 Sentiment AI Examples

This project demonstrates two AI-powered features using **structured arrays** and **enums**:

---

## 1️⃣ Pokémon Generator (Array)

Generate a list of Pokémon based on a **given type**.

- **API Endpoint:** `api/structured-array`  
- **UI Component:** `ui/structured-array`  

**How it works:**  
1. Enter a Pokémon type (e.g., `Fire`, `Water`, `Grass`).  
2. The AI generates a structured array of Pokémon matching that type.  
3. Each Pokémon includes its **name** and **abilities**.

**Example Output:**
```json
[
  {
    "name": "Charmander",
    "abilities": ["Blaze", "Solar Power"]
  },
  {
    "name": "Vulpix",
    "abilities": ["Flash Fire", "Drought"]
  }
]
````

---

## 2️⃣ Sentiment Classifier (Enum)

Classify text as **Positive**, **Negative**, or **Neutral**.

* **API Endpoint:** `api/structured-enum`
* **UI Component:** `ui/structured-enum`

**How it works:**

1. Enter any text in the input field.
2. The AI analyzes the sentiment.
3. Displayed with **emoji + text** for instant visual feedback:

| Sentiment | Emoji | Description                       |
| --------- | ----- | --------------------------------- |
| Positive  | 😊    | Text expresses a positive emotion |
| Negative  | 😞    | Text expresses a negative emotion |
| Neutral   | 😐    | Text is neutral or factual        |

**Example Output:**

```json
{
  "sentiment": "positive"
}
```

---

## 📁 Project Structure

```
api/
 ├─ structured-array      # Pokémon generator API
 └─ structured-enum       # Sentiment classifier API
ui/
 ├─ structured-array      # UI for Pokémon generator
 └─ structured-enum       # UI for sentiment classifier
```

---

## 🚀 Usage

* Use `structured-array` to generate **Pokémon lists** by type.
* Use `structured-enum` to classify **sentiment** of any text.

**Tip:** Both APIs return **structured, predictable data** suitable for building interactive UIs or dashboards.

 

---

# 🔍 Analyse Image with AI

So far, we’ve been working exclusively with **text-based interactions**:
- Generating responses  
- Building chat conversations  
- Creating structured data  

---

## 🚀 But Modern AI Models Can Do More  
They are **multi-modal** — meaning they can understand and process **different types of content**:

- 📝 Text  
- 📄 PDFs  
- 🖼️ Images  
- …and much more  

---

## ⚡ Example: Multi-Modal Chat  

👉 API Endpoint:  
```bash
api/multi-modal-chat
````

👉 UI Component:

```bash
ui/multi-modal-chat
```


# 🖼️ Generate Images with AI

- We’ve seen how AI can **analyze images and PDFs**  
- AI can also **create images from scratch** based on text descriptions  

✨ Example:  
There are many AI models available for image generation.  
For now, we’ll use **DALL·E 3** from **OpenAI**:  
- ✅ Not the best, but the **cheapest option**  
- 🔄 You can always **upgrade to more advanced models** depending on needs and budget  

---

## ⚙️ Source Code Structure

- **API** → `api/generate-image`  
- **UI** → `ui/generate-image`  

