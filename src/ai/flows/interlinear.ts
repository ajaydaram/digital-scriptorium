'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getLocalStepBiblePassage } from '@/lib/stepbible-database';

const InterlinearInputSchema = z.object({
  reference: z.string().describe('The scripture passage reference (e.g. John 3:16)'),
});
export type InterlinearInput = z.infer<typeof InterlinearInputSchema>;

const InterlinearWordSchema = z.object({
  original: z.string().describe('The Greek, Hebrew or Aramaic word in original script'),
  transliteration: z.string().describe('The transliterated spelling in Latin script'),
  english: z.string().describe('The English word translation'),
  strongs: z.string().describe('The Strong\'s Concordance number'),
  parsing: z.string().describe('The grammatical parsing code'),
});
export type InterlinearWord = z.infer<typeof InterlinearWordSchema>;

const InterlinearVerseSchema = z.object({
  verseNumber: z.number().describe('The verse number'),
  words: z.array(InterlinearWordSchema).describe('The sequence of words in interlinear structure'),
});
export type InterlinearVerse = z.infer<typeof InterlinearVerseSchema>;

const InterlinearOutputSchema = z.object({
  verses: z.array(InterlinearVerseSchema).describe('The list of verses in the passage'),
});
export type InterlinearOutput = z.infer<typeof InterlinearOutputSchema>;

export async function getInterlinearAnalysis(input: InterlinearInput): Promise<InterlinearOutput> {
  try {
    const passage = getLocalStepBiblePassage(input.reference);
    const verses = passage.verses.map(v => ({
      verseNumber: v.verseNumber,
      words: v.words.map(w => ({
        original: w.original,
        transliteration: w.transliteration,
        english: w.english,
        strongs: w.strongs,
        parsing: w.parsing
      }))
    }));
    return { verses };
  } catch (error: any) {
    console.error('Local Interlinear Fetch Error:', error.message);
    throw new Error('Failed to retrieve offline interlinear data.');
  }
}

const interlinearPrompt = ai.definePrompt({
  name: 'interlinearPrompt',
  input: { schema: InterlinearInputSchema },
  output: { schema: InterlinearOutputSchema },
  prompt: `You are a scholarly Bible linguist specializing in original languages (Greek/Hebrew/Aramaic) and interlinear analysis.

For the given passage reference, generate a word-by-word interlinear translation.

Passage Reference: {{{reference}}}

For each verse:
1. Break down the verse into its original language words in correct biblical order.
2. For each word, provide:
   - The original word in its Greek/Hebrew/Aramaic alphabet.
   - The phonetic transliteration.
   - The English gloss/translation.
   - The Strong's Concordance number (starting with 'G' for Greek, 'H' for Hebrew).
   - The grammatical parsing code (e.g. V-PAI-3S, N-NSM, Prep, etc.).`,
});

const interlinearFlow = ai.defineFlow(
  {
    name: 'interlinearFlow',
    inputSchema: InterlinearInputSchema,
    outputSchema: InterlinearOutputSchema,
  },
  async (input) => {
    const { output } = await interlinearPrompt(input);
    return output!;
  }
);
