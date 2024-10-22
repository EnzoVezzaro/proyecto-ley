import dynamic from 'next/dynamic';

const CannabisMarketSimulator = dynamic(() => import('@/components/CannabisMarketSimulator'), { ssr: false });

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">LEY PARA LA REGULACIÓN Y CONTROL DEL CANNABIS: <br />NUEVOS MERCADOS PARA EL DESARROLLO</h1>
      <CannabisMarketSimulator />
    </main>
  );
}