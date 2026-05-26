import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
export async function POST(request) {
  const { conflict, region, analysisType } = await request.json();

  const prompt = `You are an expert diplomatic analyst. Generate a structured diplomatic brief for the following:

Conflict: ${conflict}
Region: ${region}
Analysis Type: ${analysisType}

Provide a clear, professional analysis with these sections:
1. CONFLICT OVERVIEW
2. PARTY POSITIONS (identify the main parties and their stances)
3. LEGAL PRECEDENTS (relevant international law or UN resolutions)
4. NEGOTIATION OPTIONS (3 concrete pathways)

Be concise, factual, and professional. Use plain text without markdown symbols.`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1000,
    messages: [{ role: 'user', content: prompt }],
  });

  return Response.json({ brief: message.content[0].text });
}