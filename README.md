Here’s a cleaner and more **reader-friendly markdown version** of your content:


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

```
