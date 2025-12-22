
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("No API Key found in env");
        return;
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy init to get access? No, need direct list.
        // Actually the SDK doesn't expose listModels directly easily on the instance, 
        // usually it's a separate call or managed differently. 
        // Let's just try to generate content with gemini-pro to see if THAT works, 
        // if not, fallback to rest api for listing.

        console.log("Trying gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        await modelPro.generateContent("Test");
        console.log("gemini-pro works!");

        console.log("Trying gemini-1.5-flash-001...");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        await modelFlash.generateContent("Test");
        console.log("gemini-1.5-flash-001 works!");

    } catch (error) {
        console.error("Error details:", error.message);
    }
}

listModels();
