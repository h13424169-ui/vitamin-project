
import { GoogleGenAI, Type } from "@google/genai";
import { VITAMIN_PRODUCTS } from "../constants";

const API_KEY = import.meta.env.VITE_API_KEY || "";

export const getExpertRecommendation = async (userSymptoms: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const productsSummary = VITAMIN_PRODUCTS.map(p => 
    `${p.name} (PC1: ${p.pc1}, PC2: ${p.pc2}): ${p.specialty}`
  ).join("\n");

  const systemInstruction = `
    당신은 식품공학자이자 비타민 분석 전문가입니다. 
    제공된 10종의 비타민 PCA 분석 데이터를 기반으로 사용자의 증상에 맞는 최적의 제품을 추천하세요.
    
    [PCA 분석 기준]
    1. PC1 (X축): 에너지/활력 지수. 값이 높을수록 수용성 비타민(B군, C) 함량이 높아 만성 피로에 좋습니다.
    2. PC2 (Y축): 성분 성향. 양(+)은 비타민 A/항산화/피부 위주, 음(-)은 아연/면역/미네랄 위주입니다.
    
    [분석 데이터]
    ${productsSummary}
    
    [출력 규칙]
    - 반드시 하나의 가장 적합한 제품을 선정하세요.
    - '식품공학적 관점'에서 해당 영양소가 왜 이 증상에 효과적인지 논리적으로 설명하세요.
    - 한국어로 답변하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userSymptoms,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedProductId: {
              type: Type.STRING,
              description: "추천 제품의 id (예: alive, centrum_men 등)"
            },
            expertReasoning: {
              type: Type.STRING,
              description: "식품공학 전문가로서의 상세 추천 사유"
            },
            nutritionalInsight: {
              type: Type.STRING,
              description: "추가적인 영양학적 조언 (섭취 방법 등)"
            }
          },
          required: ["recommendedProductId", "expertReasoning", "nutritionalInsight"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
