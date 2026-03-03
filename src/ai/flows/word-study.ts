
'use server';
/**
 * @fileOverview A Genkit flow for performing deep word studies in original biblical languages.
 *
 * - studyWord - A function that handles the original language lookup and theological analysis.
 * - WordStudyInput - The input type for the studyWord function.
 * - WordStudyOutput - The return type for the studyWord function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WordStudyInputSchema = z.object({
  word: z.string().describe('The English word from the scripture passage to study.'),
  context: z.string().describe('The full sentence or verse where the word appears.'),
});
export type WordStudyInput = z.infer<typeof WordStudyInputSchema>;

const WordStudyOutputSchema = z.object({
  originalWord: z.string().describe('The Greek or Hebrew word.'),
  transliteration: z.string().describe('The phonetic transliteration of the original word.'),
  language: z.enum(['Greek', 'Hebrew', 'Aramaic']),
  strongsNumber: z.string().describe('The Strong\'s Concordance number.'),
  definition: z.string().describe('The core lexical definition of the word.'),
  pedagogicalInsight: z.string().describe('How this word functions in the Grand Historical Narrative.'),
  relatedVerses: z.array(z.string()).describe('Other significant verses where this same root word is used.'),
});
export type WordStudyOutput = z.infer<typeof WordStudyOutputSchema>;

export async function studyWord(input: WordStudyInput): Promise<WordStudyOutput> {
  return wordStudyFlow(input);
}

const wordStudyPrompt = ai.definePrompt({
  name: 'wordStudyPrompt',
  input: { schema: WordStudyInputSchema },
  output: { schema: WordStudyOutputSchema },
  prompt: `You are a scholarly Linguistic Tutor for serious biblical study. Your goal is to help a user understand the original language behind a specific word.

When analyzing a word:
1. Identify the correct Greek or Hebrew root based on the provided context.
2. Provide the transliteration and language.
3. Give a clear, lexical definition.
4. Provide a "Pedagogical Insight": explain why this specific word choice matters for understanding the Grand Historical Narrative (Creation, Fall, Redemption, Restoration).
5. List 2-3 other verses where this root is used in a significant way.

Word: "{{{word}}}"
Context: "{{{context}}}"`,
});

const wordStudyFlow = ai.defineFlow(
  {
    name: 'wordStudyFlow',
    inputSchema: WordStudyInputSchema,
    outputSchema: WordStudyOutputSchema,
  },
  async (input) => {
    const { output } = await wordStudyPrompt(input);
    return output!;
  }
);
