import { Configuration, OpenAIAPI } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({apiKey: process.env.OpenAI_API_Key});

const openai = new OpenAIAPI(configuration);

export default openai;