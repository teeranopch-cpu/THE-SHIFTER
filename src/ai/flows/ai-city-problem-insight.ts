'use server';
/**
 * @fileOverview Provides an AI-generated summary of a city problem from a video.
 *
 * - aiCityProblemInsight - A function that handles generating insights for a city problem video.
 * - AiCityProblemInsightInput - The input type for the aiCityProblemInsight function.
 * - AiCityProblemInsightOutput - The return type for the aiCityProblemInsight function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiCityProblemInsightInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of an urban problem, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>' (e.g., 'data:video/mp4;base64,...')."
    ),
  problemDescription: z
    .string()
    .describe(
      'A brief textual description of the city problem to provide additional context to the AI.'
    ),
});
export type AiCityProblemInsightInput = z.infer<
  typeof AiCityProblemInsightInputSchema
>;

const AiCityProblemInsightOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the urban problem and its context, without providing solutions.'
    ),
});
export type AiCityProblemInsightOutput = z.infer<
  typeof AiCityProblemInsightOutputSchema
>;

export async function aiCityProblemInsight(
  input: AiCityProblemInsightInput
): Promise<AiCityProblemInsightOutput> {
  try {
    return await aiCityProblemInsightFlow(input);
  } catch (error) {
    console.error('Error in aiCityProblemInsight:', error);
    throw error;
  }
}

const aiCityProblemInsightPrompt = ai.definePrompt({
  name: 'aiCityProblemInsightPrompt',
  input: { schema: AiCityProblemInsightInputSchema },
  output: { schema: AiCityProblemInsightOutputSchema },
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_CIVIC_INTEGRITY',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
  prompt: `You are an AI assistant tasked with analyzing and summarizing urban problems presented in videos.
Analyze the provided video and the additional description to give a clear, concise summary of the urban issue and its context. Do not suggest or provide any solutions or actions; focus solely on understanding and explaining the problem as presented.

Problem Description: {{{problemDescription}}}
Video: {{media url=videoDataUri}}`,
});

const aiCityProblemInsightFlow = ai.defineFlow(
  {
    name: 'aiCityProblemInsightFlow',
    inputSchema: AiCityProblemInsightInputSchema,
    outputSchema: AiCityProblemInsightOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await aiCityProblemInsightPrompt(input);
      if (!output) {
        const emptyOutputError = new Error(
          'aiCityProblemInsightPrompt returned empty output'
        );
        console.error(emptyOutputError);
        throw emptyOutputError;
      }
      return output;
    } catch (error) {
      console.error('Error executing aiCityProblemInsightFlow:', error);
      throw error;
    }
  }
);
