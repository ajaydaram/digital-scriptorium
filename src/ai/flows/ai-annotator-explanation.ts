'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating AI-powered explanations or contextual insights for scripture passages.
 * Matches Zondervan Exegetical Commentary on the New Testament (ZECNT) discourse analysis.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIAnnotatorExplanationInputSchema = z.object({
  scripturePassage: z.string().describe('The scripture passage to be explained or annotated.'),
  highlightedSnippet: z.string().optional().describe('Specific highlighted portion of the text that the user wants to focus on.'),
});
export type AIAnnotatorExplanationInput = z.infer<typeof AIAnnotatorExplanationInputSchema>;

const AIAnnotatorExplanationOutputSchema = z.object({
  literaryContext: z
    .string()
    .describe('Analyze the immediate macro-context. Keep it to 3 sentences maximum.'),
  structuralMechanics: z
    .string()
    .describe('Identify the main independent clauses and explain how the subordinate clauses cluster around them. Explicitly mention rhetorical shifts, structural symmetry, chiasms, pivots, or thematic repetitions.'),
  exegeticalOutline: z.array(z.object({
    heading: z.string().describe('Main section heading with verse range'),
    subPoints: z.array(z.string()).describe('Subordinate structural points with verse reference')
  })).describe('A text-driven outline based strictly on the structural layout of the passage.'),
  historicalMarginalia: z.array(z.object({
    concept: z.string().describe('Historical-cultural or lexical concept'),
    explanation: z.string().describe('Socio-rhetorical context or fact')
  })).describe('High-density, highly accurate historical or cultural facts necessary to understand the structural movement of the text.'),
  keyWords: z.array(z.string()).describe('3-5 key words from the passage suitable for original language study.'),
  lineationDisplay: z.string().describe('A visual graphical display of the passage (Greek/Hebrew original clauses or English) using indented lineation (ZECNT style) to show main verbs vs. subordinate modifiers.'),
  lineationEvaluation: z.string().describe('An assessment of standard/poetic lineation and structural indentation logic for this literary genre to help the user align their strategy.')
});
export type AIAnnotatorExplanationOutput = z.infer<typeof AIAnnotatorExplanationOutputSchema>;

export async function explainScripture(input: AIAnnotatorExplanationInput): Promise<AIAnnotatorExplanationOutput> {
  return aiAnnotatorExplanationFlow(input);
}

const promptContent = 'You are an expert biblical scholar and exegete, functioning as a "Scholarly AI Guide" for an academic reading platform. Your core methodology is grounded strictly in Discourse Analysis and the tradition of the Zondervan Exegetical Commentary on the New Testament (ZECNT).\n\n' +
'CRITICAL CONSTRAINTS:\n' +
'1. NEVER provide homiletical material, devotional reflections, or modern life applications.\n' +
'2. Focus exclusively on syntax, literary genre, structural transitions, and historical facts.\n' +
'3. Base your analysis on the original language (Greek/Hebrew) mechanics, but explain them clearly for a graduate-level reader.\n\n' +
'When a user clicks "Consult AI Guide", process the request using these output categories:\n' +
'1. literaryContext: Analyze the immediate macro-context of the passage within the book\'s narrative arc. Keep it to 3 sentences maximum.\n' +
'2. structuralMechanics: Break down the clause relations of the text. Identify the main independent clauses and explain how the subordinate clauses cluster around them. Explicitly mention rhetorical shifts, structural symmetry, chiasms, pivots, or thematic repetitions.\n' +
'3. exegeticalOutline: Generate a text-driven outline based strictly on the structural layout of the passage.\n' +
'4. historicalMarginalia: Provide high-density, highly accurate historical or cultural facts necessary to understand the structural movement of the text.\n' +
'5. keyWords: Select 3-5 key words suitable for original language studies.\n' +
'6. lineationDisplay: Provide a ZECNT-style Graphical Display of the text (Greek/Hebrew or English clauses) showing main verbs left-aligned, and subordinate clauses progressively indented underneath them.\n' +
'7. lineationEvaluation: Explain the syntactic logic of the graphical lineation and guide the user on how they should adapt their reading/writing strategies.\n\n' +
'Scripture Passage: {{{scripturePassage}}}\n' +
'{{#if highlightedSnippet}}\n' +
'Focus Highlight: "{{{highlightedSnippet}}}"\n' +
'Please give extra weight to interpreting and detailing this specific highlight.\n' +
'{{/if}}';

const aiAnnotatorExplanationPrompt = ai.definePrompt({
  name: 'aiAnnotatorExplanationPrompt',
  input: {schema: AIAnnotatorExplanationInputSchema},
  output: {schema: AIAnnotatorExplanationOutputSchema},
  prompt: `${promptContent}`,
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
