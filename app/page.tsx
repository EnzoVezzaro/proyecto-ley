import dynamic from 'next/dynamic';

const CannabisMarketSimulator = dynamic(() => import('@/components/CannabisMarketSimulator'), { ssr: false });

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">LEY PARA LA REGULACIÓN Y CONTROL DEL CANNABIS: <br />NUEVOS MERCADOS PARA EL DESARROLLO</h1>
      <h4 className="text-s mb-6 text-center">El objetivo de este proyecto de ley es crear un marco regulatorio para el cannabis y sus derivados para fines terapéuticos, industriales y de uso adulto. Esto con el fin de crear nuevas actividades productiva lícita acorde con la normativa y práctica internacionalmente aceptadas y arrebatarle al narcotráfico y otras redes ilícitas esta actividad económica y aprovechar este mercado en crecimiento, para crear nuevos empleos y una nueva fuente de recaudación tributaria. Además, se busca proteger a los dominicanos de los riesgos de seguridad y salud pública asociados al comercio ilegal de sustancias psicoactivas vinculadas a este producto, en especial a la población menor de edad.</h4>
      <CannabisMarketSimulator />
    </main>
  );
}