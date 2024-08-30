import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// GET (read) 
export const GET = async (request, {params}) =>{
    try {
        await connectToDB();
        // console.log(userId, prompt, tag);
        const prompt = await Prompt.findById(params.id).populate('creator');
        //console.log(prompt);
        if(!prompt) return new Response("Prompt not found", { status:404});

        return new Response(JSON.stringify(prompt), { status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompt", { status: 500});
    }
     
} 
// PATCH (write)
export const PATCH = async (request, {params}) => {
    const { prompt, tag} = await request.json();
    try {
        const exstingPrompt = await Prompt.findById(params.id);
        if (!exstingPrompt) return new Response("Prompt not found",{status:404});

        exstingPrompt.prompt = prompt;
        exstingPrompt.tag = tag;
        
        await exstingPrompt.save();

        return new Response(JSON.stringify(exstingPrompt), { status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to update prompt", { status: 500});
    }
}

// DELETE (delete)
export const DELETE = async (request, {params}) => {  
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", { status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete prompt", { status: 500});
    }
} 