import { useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, type Edge, type Node, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import type { LinguisticDetail } from '../types';

interface WordGraphProps {
  data: LinguisticDetail;
  onWordClick: (word: string) => void;
}

export default function WordGraph({ data, onWordClick }: WordGraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    const baseStyle = { borderRadius: '999px', padding: '10px 20px', fontWeight: 'bold', border: 'none', shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' };
    const edgeStyle = { stroke: '#94a3b8', strokeWidth: 2 };
    const markerEnd = { type: MarkerType.ArrowClosed, color: '#94a3b8' };
    const labelBgStyle = { fill: '#ffffff', fillOpacity: 0.9, color: '#334155' };

    // 1. Merkez Düğüm
    newNodes.push({
      id: 'center-word',
      position: { x: 0, y: 0 },
      data: { label: data.word.toUpperCase() },
      style: { 
        ...baseStyle, 
        backgroundColor: '#0ea5e9', 
        color: 'white', 
        fontSize: '20px',
        width: 'max-content', // BU SATIR KUTUYU KELİMEYE GÖRE UZATIR
        padding: '10px 30px'
      },
    });

    // 2. Köken (Etymology)
    if (data.etymology?.root) {
      newNodes.push({
        id: 'root',
        position: { x: 0, y: -160 },
        data: { 
          label: (
            <div className="text-center">
              <div className="font-bold">{data.etymology.originLanguage}: {data.etymology.root}</div>
              <div className="text-xs font-normal opacity-90 mt-1 italic">"{data.etymology.meaning}"</div>
            </div>
          ) 
        },
        style: { ...baseStyle, backgroundColor: '#f59e0b', color: 'white', width: 'max-content', minWidth: '180px' },
      });
      newEdges.push({ id: 'e-word-root', source: 'center-word', target: 'root', style: edgeStyle, markerEnd, animated: true, label: 'origin', labelBgStyle });
    }

    // 3. Anlamlar (Definitions) - ARALIKLAR GENİŞLETİLDİ (80 -> 130) VE MAX-WIDTH EKLENDİ
    /*data.definitions?.forEach((def, i) => {
      const defId = `def-${i}`;
      newNodes.push({
        id: defId,
        position: { x: 0, y: 160 + i * 130 },
        data: { label: `(${def.context}) ${def.meaning}` },
        style: { borderRadius: '12px', padding: '12px', backgroundColor: '#fff', border: '2px solid #e2e8f0', minWidth: '250px', maxWidth: '350px', textAlign: 'center', fontSize: '13px', color: '#334155' },
      });
      newEdges.push({ id: `e-word-${defId}`, source: 'center-word', target: defId, style: edgeStyle, markerEnd });
    });*/

    // 4. Ekler (Prefix/Suffix) - UZUN YAZILAR KIRPILDI VE UZAKLAŞTIRILDI
    data.affixes?.forEach((affix, i) => {
      const affixId = `affix-${i}`;
      newNodes.push({
        id: affixId,
        position: { x: -350, y: (i * 90) - 45 },
        data: { label: `${affix.morpheme} (${affix.type})` },
        style: { ...baseStyle, backgroundColor: '#10b981', color: 'white' },
      });
      
      // Çok uzun etiketleri grafiği bozmaması için akıllıca kırpıyoruz
      const shortLabel = affix.meaning.length > 25 ? affix.meaning.substring(0, 25) + '...' : affix.meaning;
      newEdges.push({ id: `e-word-${affixId}`, source: 'center-word', target: affixId, style: edgeStyle, markerEnd, label: shortLabel, labelBgStyle });
    });

    // 5. Eş Anlamlılar (Synonyms)
    data.synonyms?.slice(0, 3).forEach((syn, i) => {
      const synId = `syn-${i}`;
      newNodes.push({
        id: synId,
        position: { x: 320, y: (i * 70) - 100 },
        data: { label: syn },
        style: { ...baseStyle, backgroundColor: '#f1f5f9', color: '#334155', border: '2px solid #cbd5e1', cursor: 'pointer' },
      });
      newEdges.push({ id: `e-word-${synId}`, source: 'center-word', target: synId, style: edgeStyle, markerEnd, label: '=', labelBgStyle });
    });

    // 6. Zıt Anlamlılar (Antonyms)
    data.antonyms?.slice(0, 3).forEach((ant, i) => {
      const antId = `ant-${i}`;
      newNodes.push({
        id: antId,
        position: { x: 320, y: (i * 70) + 120 },
        data: { label: ant },
        style: { ...baseStyle, backgroundColor: '#fee2e2', color: '#991b1b', border: '2px solid #fca5a5', cursor: 'pointer' },
      });
      newEdges.push({ id: `e-word-${antId}`, source: 'center-word', target: antId, style: edgeStyle, markerEnd, label: '≠', labelBgStyle: { fill: '#fee2e2', color: '#991b1b' } });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [data]);

  // Tıklama fonksiyonu: Eş ve Zıt anlamlıları kapsar
  const onNodeClick = (_: any, node: Node) => {
    // Sadece eş anlamlı ve zıt anlamlı kelimelere tıklandığında işlem yap
    if (node.id.startsWith('syn-') || node.id.startsWith('ant-')) {
      // Label'ın güvenli bir metin (string) olduğundan emin ol
      if (node.data && typeof node.data.label === 'string') {
        const cleanWord = node.data.label.trim();
        if (cleanWord) {
          onWordClick(cleanWord);
        }
      }
    }
  };

  return (
    <div 
      className="w-full h-full bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-inner"
      style={{ height: '100%', width: '100%' }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        fitView // Grafiği ekrana otomatik sığdırır
        fitViewOptions={{ padding: 0.2, minZoom: 0.5, maxZoom: 1.2 }} 
        attributionPosition="bottom-left"
      >
        <Background color="#94a3b8" gap={16} size={1} />
        <Controls className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl shadow-sm" />
      </ReactFlow>
    </div>
  );
}