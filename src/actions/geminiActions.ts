"use server";
import { ArticleGemini } from "@/stores/articlestore";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export async function generateContent(prompt: string, apiKey: string) {
  try {
    const genIA = new GoogleGenerativeAI(apiKey);
    const model = genIA.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            titlePage: {
              type: SchemaType.STRING,
              nullable: false,
            },
            contentPage: {
              type: SchemaType.STRING,
              nullable: false,
            },
            titleSeo: {
              type: SchemaType.STRING,
              nullable: false,
            },
            descriptionSeo: {
              type: SchemaType.STRING,
              nullable: false,
            },
            excerpt: {
              type: SchemaType.STRING,
              nullable: false,
            },
          },
          required: [
            "titlePage",
            "contentPage",
            "titleSeo",
            "descriptionSeo",
            "excerpt",
          ],
        },
      },
    });
    const result = await model.generateContent(prompt);
    const json: ArticleGemini = JSON.parse(result.response.text());
    return { success: true, data: json };
  } catch (error: unknown) {
    console.error("Error generating content:", error);
    return { success: false, error: error };
  }
}

export async function verifyApiKey(apiKey: string) {
  try {
    const genIA = new GoogleGenerativeAI(apiKey);
    const model = genIA.getGenerativeModel({ model: "gemini-1.5-flash" });
    await model.generateContent("verify");
    return { success: true, message: "API Key válida" };
  } catch (error: unknown) {
    if (error) console.error("Error al validar el token");
    return { success: false, message: "Token inválido" };
  }
}
