
import React from 'react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  LabelList, 
  ResponsiveContainer, 
  ReferenceLine,
  Cell
} from 'recharts';
import { VITAMIN_PRODUCTS } from '../constants';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-bold text-gray-800">{data.name}</p>
        <p className="text-sm text-gray-600">활력(PC1): {data.pc1}</p>
        <p className="text-sm text-gray-600">성향(PC2): {data.pc2}</p>
        <p className="text-xs mt-2 italic text-blue-500">{data.specialty}</p>
      </div>
    );
  }
  return null;
};

export const PCABiplot: React.FC<{ selectedId?: string }> = ({ selectedId }) => {
  return (
    <div className="w-full h-[400px] bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        비타민 PCA 매핑 (PC1 vs PC2)
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
          <XAxis 
            type="number" 
            dataKey="pc1" 
            name="에너지/활력" 
            domain={[-6, 6]} 
            label={{ value: '활력 (PC1)', position: 'insideBottom', offset: -10 }} 
          />
          <YAxis 
            type="number" 
            dataKey="pc2" 
            name="성분 성향" 
            domain={[-6, 6]} 
            label={{ value: '성향 (PC2)', angle: -90, position: 'insideLeft' }} 
          />
          <ZAxis type="number" range={[100, 400]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <ReferenceLine x={0} stroke="#cbd5e1" strokeWidth={1} />
          <ReferenceLine y={0} stroke="#cbd5e1" strokeWidth={1} />
          <Scatter name="Vitamins" data={VITAMIN_PRODUCTS}>
            {VITAMIN_PRODUCTS.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                opacity={selectedId ? (selectedId === entry.id ? 1 : 0.3) : 0.7}
                stroke={selectedId === entry.id ? "#000" : "none"}
                strokeWidth={2}
              />
            ))}
            <LabelList dataKey="name" position="top" style={{ fontSize: '12px', fontWeight: 'bold' }} />
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-gray-500 justify-center">
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>에너지↑ (B, C)</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500"></div>피부/시력↑ (A)</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div>면역↑ (아연)</span>
      </div>
    </div>
  );
};
