
import { VitaminProduct } from './types';

export const VITAMIN_PRODUCTS: VitaminProduct[] = [
  {
    id: 'alive',
    name: '얼라이브 (Alive!)',
    pc1: 5.0,
    pc2: 0.2,
    description: '고함량 비타민의 대명사. 에너지 대사에 최적화.',
    specialty: '에너지/활력 최상위',
    color: '#ef4444'
  },
  {
    id: 'centrum_men',
    name: '센트룸 맨',
    pc1: 3.5,
    pc2: -0.5,
    description: '남성 맞춤형 에너지 밸런스. 활동량이 많은 남성용.',
    specialty: '활력/균형',
    color: '#3b82f6'
  },
  {
    id: 'centrum_women',
    name: '센트룸 우먼',
    pc1: 1.5,
    pc2: 4.0,
    description: '여성을 위한 항산화 및 피부 건강 중심 설계.',
    specialty: '비타민 A 특화/피부',
    color: '#ec4899'
  },
  {
    id: 'korea_eundan_men',
    name: '고려은단 맨',
    pc1: 0.8,
    pc2: -3.5,
    description: '면역력 강화와 아연 섭취에 최적화된 설계.',
    specialty: '아연/면역 특화',
    color: '#10b981'
  },
  {
    id: '99vital',
    name: '99바이탈',
    pc1: -1.2,
    pc2: -4.0,
    description: '미네랄과 면역 중심의 가성비 제품.',
    specialty: '면역 강화',
    color: '#8b5cf6'
  },
  {
    id: 'ckd',
    name: '종근당 멀티비타민',
    pc1: 0.0,
    pc2: 0.0,
    description: '표준적인 데일리 비타민. 입문용으로 적합.',
    specialty: '무난한 데일리',
    color: '#f59e0b'
  },
  {
    id: 'daesang',
    name: '대상 웰라이프',
    pc1: 0.2,
    pc2: -0.3,
    description: '기초 영양을 꼼꼼히 채워주는 밸런스 제품.',
    specialty: '무난한 데일리',
    color: '#64748b'
  },
  {
    id: 'solgar_vm2000',
    name: '솔가 VM-2000',
    pc1: 4.2,
    pc2: 1.5,
    description: '프리미엄 원료 중심의 고성능 멀티비타민.',
    specialty: '고함량 항산화',
    color: '#b45309'
  },
  {
    id: 'gnc_mega',
    name: 'GNC 메가맨',
    pc1: 2.8,
    pc2: -1.2,
    description: '운동 선수나 활동적인 남성에게 적합.',
    specialty: '스포츠/활동성',
    color: '#0369a1'
  },
  {
    id: 'natures_way',
    name: '네이처스웨이',
    pc1: 1.0,
    pc2: 2.5,
    description: '천연 추출물 중심의 부드러운 성분 구성.',
    specialty: '비타민 A/시력 보호',
    color: '#15803d'
  }
];
