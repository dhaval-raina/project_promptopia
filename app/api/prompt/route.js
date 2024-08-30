import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, res) => {
  try {
    // Connect to the database
    await connectToDB();

    // Fetch prompts with populated creator information
    const prompts = await Prompt.find().populate('creator');

    // Return successful response with prompts
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching prompts:', error);

    // Return an error response
    return new Response('Failed to fetch prompts', { status: 500 });
  }
};
