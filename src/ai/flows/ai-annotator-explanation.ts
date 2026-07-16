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
  highlightedSnippet: z.string().optional().describe('Specific highlighted portion of the text that the user wants to focus on.'),
});
export type AIAnnotatorExplanationInput = z.infer<typeof AIAnnotatorExplanationInputSchema>;

const AIAnnotatorExplanationOutputSchema = z.object({
  explanation: z
    .string()
    .describe('An AI-generated explanation or contextual insight for the provided scripture passage, grounded in historical commentaries (e.g. Early Church Fathers, Reformers, Lexicons).'),
  theologicalContext: z.string().describe('Explanation of how this fits into the Grand Historical Narrative.'),
  suggestedReferences: z.array(z.object({
    ref: z.string(),
    reason: z.string().describe('Why this reference is relevant to the Grand Historical Narrative.')
  })).describe('Curated cross-references with pedagogical relevance.'),
  keyWords: z.array(z.string()).describe('3-5 key words from the passage suitable for original language study.'),
  lineationDisplay: z.string().describe('A visual graphical display of the passage (Greek/Hebrew original clauses or English) using indented lineation (ZECNT style) to show main verbs vs. subordinate modifiers.'),
  lineationEvaluation: z.string().describe('An assessment of standard/poetic lineation and structural indentation logic for this literary genre to help the user align their strategy.')
});
export type AIAnnotatorExplanationOutput = z.infer<typeof AIAnnotatorExplanationOutputSchema>;

export async function explainScripture(input: AIAnnotatorExplanationInput): Promise<AIAnnotatorExplanationOutput> {
  return aiAnnotatorExplanationFlow(input);
}

const aiAnnotatorExplanationPrompt = ai.definePrompt({
  name: 'aiAnnotatorExplanationPrompt',
  input: {schema: AIAnnotatorExplanationInputSchema},
  output: {schema: AIAnnotatorExplanationOutputSchema},
  prompt: `You are a Pedagogical Guide for serious biblical study. Your goal is to help the user move from casual reading to deep, scholarly understanding.

Ground your analysis using historical commentaries (e.g., Early Church Fathers, Medieval Scholastics, Reformation Commentators) and original lexicons (e.g. Strong's, BDAG). Explain the passage through this scholarly, peer-reviewed lens.

When explaining a passage:
1. Provide a concise, clear explanation of the text's immediate meaning grounded in historical and scholarly commentaries. Include quotes or viewpoints from church history if relevant. If a specific highlight/snippet is provided below, please tailor your explanation to focus heavily on analyzing that specific highlighted phrase, clause, or verse.
2. Specifically address how this passage fits into the "Grand Historical Narrative" of scripture (Creation, Fall, Redemption, Restoration).
3. Provide 2-3 highly relevant cross-references. For each, explain *why* it is pedagogically significant to understanding the broader narrative context.
4. Select 3-5 key words from the passage that are central or interesting for original language (Greek or Hebrew) study.
5. In the "lineationDisplay" field, provide a ZECNT-style Graphical Display of the text (either Greek/Hebrew original or English clauses) showing the main verbs aligned to the left, and subordinate clauses, participles, or relative clauses progressively indented underneath them to reveal the syntactic hierarchy.
6. In the "lineationEvaluation" field, provide a clear, graduate-level discourse analysis explaining the syntactic logic of the graphical lineation (e.g. how participles support main verbs, or chiasm symmetry), and guide the user on how their reading/writing strategies should adapt to this literary shape.

Scripture Passage: {{{scripturePassage}}}
{{#if highlightedSnippet}}
Focus Highlight: "{{{highlightedSnippet}}}"
Please give extra weight to interpreting and detailing this specific highlight.
{{/if}}`,
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
