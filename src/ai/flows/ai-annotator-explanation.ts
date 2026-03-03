'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating AI-powered explanations or contextual insights for scripture passages.
 *
 * - explainScripture - A function that handles the AI annotation process.
 * - AIAnnotatorExplanationInput - The input type for the explainScripture function.
 * - AIAnnotatorExplanationOutput - The return type for the explainScripture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIAnnotatorExplanationInputSchema = z.object({
  scripturePassage: z.string().describe('The scripture passage to be explained or annotated.'),
});
export type AIAnnotatorExplanationInput = z.infer<typeof AIAnnotatorExplanationInputSchema>;

const AIAnnotatorExplanationOutputSchema = z.object({
  explanation: z
    .string()
    .describe('An AI-generated explanation or contextual insight for the provided scripture passage.'),
});
export type AIAnnotatorExplanationOutput = z.infer<typeof AIAnnotatorExplanationOutputSchema>;

export async function explainScripture(input: AIAnnotatorExplanationInput): Promise<AIAnnotatorExplanationOutput> {
  return aiAnnotatorExplanationFlow(input);
}

const aiAnnotatorExplanationPrompt = ai.definePrompt({
  name: 'aiAnnotatorExplanationPrompt',
  input: {schema: AIAnnotatorExplanationInputSchema},
  output: {schema: AIAnnotatorExplanationOutputSchema},
  prompt: `You are an expert biblical scholar and theological commentator.
Your task is to provide a concise, clear, and insightful explanation or contextual insight for the given scripture passage.
Focus on explaining complex concepts, historical background, cultural context, or theological implications relevant to the passage.
Ensure the explanation is easy to understand for a user who wants to deepen their study without being overwhelmed.

Scripture Passage: {{{scripturePassage}}}`,
});

const aiAnnotatorExplanationFlow = ai.defineFlow(
  {
    name: 'aiAnnotatorExplanationFlow',
    inputSchema: AIAnnotatorExplanationInputSchema,
    outputSchema: AIAnnotatorExplanationOutputSchema,
  },
  async input => {
    const {output} = await aiAnnotatorExplanationPrompt(input);
    return output!;
  }
);
