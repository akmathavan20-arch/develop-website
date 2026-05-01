import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askAI = async (prompt: string) => {
  const completion = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: 'You are a kid-friendly tutor. Reply in English/Tamil as requested.' },
      { role: 'user', content: prompt }
    ]
  });
  return completion.choices[0]?.message?.content;
};
