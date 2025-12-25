
export interface VitaminProduct {
  id: string;
  name: string;
  pc1: number; // 에너지/활력 (B, C 함량)
  pc2: number; // 성분 성향 (양: A 위주, 음: 아연/면역 위주)
  description: string;
  specialty: string;
  color: string;
}

export interface AnalysisResult {
  recommendedProductId: string;
  expertReasoning: string;
  nutritionalInsight: string;
}
