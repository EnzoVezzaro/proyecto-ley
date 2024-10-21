import dynamic from 'next/dynamic';

const CannabisMarketSimulator = dynamic(() => import('@/components/CannabisMarketSimulator'), { ssr: false });

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Simulador de Mercado de Cannabis en República Dominicana</h1>
      <CannabisMarketSimulator />
    </main>
  );
}