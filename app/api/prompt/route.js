import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    // Connect to the database
    await connectToDB();

    // Parse URL parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 100;
    const skip = (page - 1) * limit;

    // Fetch prompts with pagination and populated creator information
    // const prompts = await Prompt.find()
    //   .populate('creator')
    //   .skip(skip)
    //   .limit(limit);
   
    const prompts = await Prompt.find().populate("creator");

    // Return successful response with prompts
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching prompts:", error);

    // Return an error response
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
