'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from './ui/input';

const CannabisMarketSimulator = () => {
  const [medicalValue, setMedicalValue] = useState(50);
  const [hempValue, setHempValue] = useState(20);
  const [adultUseValue, setAdultUseValue] = useState(20);
  const [totalMarketValue, setTotalMarketValue] = useState(100);

  const [medicalCultivationFee, setMedicalCultivationFee] = useState(5000);
  const [medicalProductionFee, setMedicalProductionFee] = useState(500);
  const [medicalCommerceFee, setMedicalCommerceFee] = useState(500);

  const [hempProductionFee, setHempProductionFee] = useState(500);
  const [hempCommerceFee, setHempCommerceFee] = useState(500);
  const [hempCultivationFee, setHempCultivationFee] = useState(5000);
  const [hempMedicalCultivationFee, setHempMedicalCultivationFee] = useState(5000);

  const [adultUseCultivationFee, setAdultUseCultivationFee] = useState(5000);
  const [adultUseProductionFee, setAdultUseProductionFee] = useState(500);
  const [adultUseCommerceFee, setAdultUseCommerceFee] = useState(500);

  const licenseOptions = [0, 500, 5000, 10000, 15000, 25000, 50000, 100000];
  
  const [medicalCultivationMultiplier, setMedicalCultivationMultiplier] = useState(1000);
  const [medicalProductionMultiplier, setMedicalProductionMultiplier] = useState(1000);
  const [medicalCommerceMultiplier, setMedicalCommerceMultiplier] = useState(1000);

  const [hempProductionMultiplier, setHempProductionMultiplier] = useState(1000);
  const [hempCommerceMultiplier, setHempCommerceMultiplier] = useState(1000);
  const [hempCultivationMultiplier, setHempCultivationMultiplier] = useState(1000);
  const [hempMedicalCultivationMultiplier, setHempMedicalCultivationMultiplier] = useState(1000);

  const [adultUseCultivationMultiplier, setAdultUseCultivationMultiplier] = useState(1000);
  const [adultUseProductionMultiplier, setAdultUseProductionMultiplier] = useState(1000);
  const [adultUseCommerceMultiplier, setAdultUseCommerceMultiplier] = useState(1000);

  const similarMarketsData = [
    { country: "Colombia", marketValue: 300, medicinal: true, industrial: true, adultUse: false, description: "Mercado en crecimiento con enfoque en cannabis medicinal." },
    { country: "Canadá", marketValue: 5500, medicinal: true, industrial: true, adultUse: true, description: "Mercado maduro con regulación completa para uso adulto." },
    { country: "Uruguay", marketValue: 45, medicinal: true, industrial: true, adultUse: true, description: "Pionero en la legalización de cannabis." },
    { country: "Estados Unidos", marketValue: 10000, medicinal: true, industrial: true, adultUse: true, description: "Mercado grande y diverso en varios estados." },
    { country: "México", marketValue: 300, medicinal: true, industrial: true, adultUse: false, description: "Mercado en desarrollo con leyes en proceso." },
    { country: "Alemania", marketValue: 32, medicinal: true, industrial: true, adultUse: true, description: "Mercado establecido para cannabis medicinal." },
    { country: "Australia", marketValue: 87, medicinal: true, industrial: true, adultUse: false, description: "Regulación en cannabis medicinal y industrial." },
    { country: "Nueva Zelanda", marketValue: 35, medicinal: true, industrial: false, adultUse: false, description: "Cannabis medicinal regulado desde 2018." },
    { country: "Sudáfrica", marketValue: 1700, medicinal: true, industrial: true, adultUse: true, description: "Regulaciones en cannabis medicinal y uso recreativo." },
    { country: "Portugal", marketValue: 35, medicinal: true, industrial: false, adultUse: false, description: "Regulación del cannabis medicinal." },
    { country: "Italia", marketValue: 24, medicinal: true, industrial: true, adultUse: false, description: "Mercado para cannabis medicinal y productos derivados." },
    { country: "Chile", marketValue: 174, medicinal: true, industrial: false, adultUse: false, description: "Regulación de cannabis medicinal." },
    { country: "Costa Rica", marketValue: 2, medicinal: true, industrial: true, adultUse: false, description: "Mercado en desarrollo con enfoque en cannabis medicinal." },
    { country: "Bélgica", marketValue: 21, medicinal: true, industrial: true, adultUse: false, description: "Regulación de cannabis medicinal." },
    { country: "Suiza", marketValue: 241, medicinal: true, industrial: true, adultUse: true, description: "Regulaciones para uso recreativo en ciertas condiciones." },
    { country: "Luxemburgo", marketValue: 120, medicinal: true, industrial: true, adultUse: true, description: "Primer país europeo en legalizar el uso recreativo." },
    { country: "Israel", marketValue: 40, medicinal: true, industrial: true, adultUse: false, description: "Líder en investigación y uso medicinal del cannabis." },
    { country: "Malasia", marketValue: 51, medicinal: true, industrial: true, adultUse: false, description: "Las leyes son estrictas, pero se están considerando cambios." },
    { country: "Tailandia", marketValue: 130, medicinal: true, industrial: false, adultUse: false, description: "Primer país del sudeste asiático en legalizar el cannabis medicinal." },
    { country: "Panamá", marketValue: 5, medicinal: true, industrial: true, adultUse: false, description: "Regulación en cannabis medicinal en desarrollo." },
    { country: "Cleveland (EE.UU.)", marketValue: 484, medicinal: true, industrial: true, adultUse: true, description: "Estado que ha legalizado tanto el uso medicinal como el recreativo." },
    { country: "Virginia (EE.UU.)", marketValue: 60, medicinal: true, industrial: false, adultUse: true, description: "Legalización reciente del uso recreativo." },
    { country: "California (EE.UU.)", marketValue: 100, medicinal: true, industrial: true, adultUse: true, description: "Pionero en la legalización del cannabis medicinal y recreativo." },
    { country: "Colorado (EE.UU.)", marketValue: 70, medicinal: true, industrial: true, adultUse: true, description: "Uno de los primeros estados en legalizar el uso recreativo." },
    { country: "Oregon (EE.UU.)", marketValue: 50, medicinal: true, industrial: true, adultUse: true, description: "Amplia aceptación del cannabis recreativo y medicinal." },
    { country: "Illinois (EE.UU.)", marketValue: 80, medicinal: true, industrial: true, adultUse: true, description: "Legalización del uso recreativo desde 2020." },
    { country: "Michigan (EE.UU.)", marketValue: 55, medicinal: true, industrial: true, adultUse: true, description: "Legalización del uso recreativo y medicinal." },
    { country: "Massachusetts (EE.UU.)", marketValue: 65, medicinal: true, industrial: true, adultUse: true, description: "Legalización del uso recreativo en 2016." },
    { country: "New York (EE.UU.)", marketValue: 90, medicinal: true, industrial: true, adultUse: true, description: "Legalización del uso recreativo en 2021." },
    { country: "Nevada (EE.UU.)", marketValue: 75, medicinal: true, industrial: true, adultUse: true, description: "Legalización del uso recreativo desde 2017." },
    { country: "Washington (EE.UU.)", marketValue: 65, medicinal: true, industrial: true, adultUse: true, description: "Uno de los primeros estados en legalizar el cannabis recreativo." },
    { country: "Arizona (EE.UU.)", marketValue: 70, medicinal: true, industrial: true, adultUse: true, description: "Legalización del uso recreativo en 2020." },
    { country: "New Jersey (EE.UU.)", marketValue: 50, medicinal: true, industrial: true, adultUse: true, description: "Legalización del uso recreativo en 2020." },
    { country: "Maine (EE.UU.)", marketValue: 30, medicinal: true, industrial: true, adultUse: true, description: "Uso recreativo legalizado en 2016." },
    { country: "Alaska (EE.UU.)", marketValue: 25, medicinal: true, industrial: true, adultUse: true, description: "Uso recreativo legalizado en 2014." },
    { country: "Vermont (EE.UU.)", marketValue: 20, medicinal: true, industrial: true, adultUse: true, description: "Uso recreativo legalizado en 2018." },
    { country: "Rhode Island (EE.UU.)", marketValue: 40, medicinal: true, industrial: true, adultUse: true, description: "Legalización del uso recreativo en 2022." },
    { country: "Connecticut (EE.UU.)", marketValue: 45, medicinal: true, industrial: true, adultUse: true, description: "Uso recreativo legalizado en 2021." },
    { country: "Noruega", marketValue: 1, medicinal: true, industrial: true, adultUse: false, description: "Uso medicinal regulado en desarrollo." },
    { country: "Reino Unido", marketValue: 239, medicinal: true, industrial: true, adultUse: false, description: "Regulación del cannabis medicinal, pero uso recreativo prohibido." },
    { country: "Japón", marketValue: 0, medicinal: true, industrial: true, adultUse: false, description: "Regulaciones estrictas y prohibiciones. Permitido solo CBD." },
    { country: "República Checa", marketValue: 7, medicinal: true, industrial: true, adultUse: false, description: "Mercado de cannabis medicinal establecido." },
    { country: "Eslovenia", marketValue: 42, medicinal: true, industrial: false, adultUse: false, description: "Uso medicinal regulado desde 2013." },
    { country: "Ecuador", marketValue: 3, medicinal: true, industrial: true, adultUse: false, description: "Regulación en cannabis medicinal en desarrollo." },
    { country: "Argentina", marketValue: 13, medicinal: true, industrial: true, adultUse: false, description: "Regulación del cannabis medicinal." },
    { country: "Brasil", marketValue: 10, medicinal: true, industrial: true, adultUse: false, description: "Cannabis medicinal aprobado, pero con restricciones." },
    { country: "Perú", marketValue: 25, medicinal: true, industrial: true, adultUse: false, description: "Regulación de cannabis medicinal en desarrollo." },
    { country: "Cabo Verde", marketValue: 40, medicinal: true, industrial: false, adultUse: false, description: "Uso medicinal en discusión." },
    { country: "Catar", marketValue: 80, medicinal: true, industrial: false, adultUse: false, description: "Mercado en desarrollo para uso medicinal." },
    { country: "Rumanía", marketValue: 120, medicinal: true, industrial: false, adultUse: false, description: "Uso medicinal regulado." },
    { country: "Grecia", marketValue: 200, medicinal: true, industrial: true, adultUse: false, description: "Mercado en desarrollo con enfoque medicinal." },
    { country: "Serbia", marketValue: 90, medicinal: true, industrial: false, adultUse: false, description: "Regulación de cannabis medicinal en desarrollo." },
    { country: "Croacia", marketValue: 110, medicinal: true, industrial: false, adultUse: false, description: "Regulación para uso medicinal." },
    { country: "Malta", marketValue: 100, medicinal: true, industrial: false, adultUse: true, description: "Legalización del uso recreativo y medicinal." },
    { country: "Georgia", marketValue: 120, medicinal: true, industrial: false, adultUse: true, description: "Uso recreativo y medicinal legalizado." },
    { country: "Hong Kong", marketValue: 60, medicinal: false, industrial: false, adultUse: false, description: "Leyes estrictas contra el cannabis." },
    { country: "Zimbabue", marketValue: 70, medicinal: true, industrial: false, adultUse: false, description: "Uso medicinal regulado." },
    { country: "Antigua y Barbuda", marketValue: 50, medicinal: true, industrial: false, adultUse: false, description: "Regulación del cannabis medicinal en desarrollo." },
    { country: "San Cristóbal y Nieves", marketValue: 40, medicinal: true, industrial: false, adultUse: false, description: "Uso medicinal aprobado." },
    { country: "Jamaica", marketValue: 41, medicinal: true, industrial: true, adultUse: true, description: "Mercado establecido para uso recreativo y medicinal." },
    { country: "Barbados", marketValue: 5, medicinal: true, industrial: false, adultUse: false, description: "Uso medicinal regulado." },
    { country: "Bahamas", marketValue: 5, medicinal: true, industrial: false, adultUse: false, description: "Regulación en cannabis medicinal en desarrollo." }
  ];  

  useEffect(() => {
    setTotalMarketValue(medicalValue + hempValue + adultUseValue);
  }, [medicalValue, hempValue, adultUseValue]);

  const calculateRevenue = (percentage: any, baseValue: any) => {
    return (baseValue * percentage / 100).toFixed(2);
  };

  const calculateLicenseRevenue = (fee: any, multiplier: any) => {
    return ((fee * multiplier) / 1000000).toFixed(2); // Convert to millions
  };

  
  const segmentedTaxes = [
    {
      category: "Cannabis Medicinal",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 0, types: ["medical"] },
        { name: "Licencias - Producción", isLicenseFee: true, fee: medicalProductionFee, multiplier: medicalProductionMultiplier, setFee: setMedicalProductionFee, types: ["medical"] },
        { name: "Licencias - Industrialización y comercio", isLicenseFee: true, fee: medicalCommerceFee, multiplier: medicalCommerceMultiplier, setFee: setMedicalCommerceFee, types: ["medical"] },
        { name: "Licencias - Cultivo con fines médicos", isLicenseFee: true, fee: medicalCultivationFee, multiplier: medicalCultivationMultiplier, setFee: setMedicalCultivationFee, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Empresas Productoras", percentage: 7, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Empresas Industrializadoras", percentage: 5, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Comercios", percentage: 10, types: ["medical"] },
      ]
    },
    {
      category: "Cáñamo Industrial",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 27, types: ["hemp"] },
        { name: "Licencias - Producción", isLicenseFee: true, fee: hempProductionFee, multiplier: hempProductionMultiplier, setFee: setHempProductionFee, types: ["hemp"] },
        { name: "Licencias - Industrialización y comercio", isLicenseFee: true, fee: hempCommerceFee, multiplier: hempCommerceMultiplier, setFee: setHempCommerceFee, types: ["hemp"] },
        { name: "Licencias - Cultivo con fines industriales", isLicenseFee: true, fee: hempCultivationFee, multiplier: hempCultivationMultiplier, setFee: setHempCultivationFee, types: ["hemp"] },
        { name: "Licencias - Cultivo con fines médicos", isLicenseFee: true, fee: hempMedicalCultivationFee, multiplier: hempMedicalCultivationMultiplier, setFee: setHempMedicalCultivationFee, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Empresas Productoras", percentage: 7, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Empresas Industrializadoras", percentage: 5, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Comercios", percentage: 10, types: ["hemp"] },
      ]
    },
    {
      category: "Uso Adulto",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 27, types: ["adultUse"] },
        { name: "Licencias - Producción", isLicenseFee: true, fee: adultUseProductionFee, multiplier: adultUseProductionMultiplier, setFee: setAdultUseProductionFee, types: ["adultUse"] },
        { name: "Licencias - Industrialización y comercio", isLicenseFee: true, fee: adultUseCommerceFee, multiplier: adultUseCommerceMultiplier, setFee: setAdultUseCommerceFee, types: ["adultUse"] },
        { name: "Licencias - Cultivo con fines de uso adulto", isLicenseFee: true, fee: adultUseCultivationFee, multiplier: adultUseCultivationMultiplier, setFee: setAdultUseCultivationFee, types: ["adultUse"] },
        { name: "Impuesto sobre la Renta - Empresas Productoras", percentage: 7, types: ["adultUse"] },
        { name: "Impuesto sobre la Renta - Empresas Industrializadoras", percentage: 5, types: ["adultUse"] },
        { name: "Impuesto sobre la Renta - Comercios", percentage: 10, types: ["adultUse"] },
      ]
    },
  ];

  const getBaseValueForSegment = (types: any) => {
    return types.reduce((sum: any, type: any) => {
      switch (type) {
        case "medical": return sum + medicalValue;
        case "hemp": return sum + hempValue;
        case "adultUse": return sum + adultUseValue;
        default: return sum;
      }
    }, 0);
  };

  const getTotalRevenueForCategory = (category: any) => {
    return category.segments.reduce((sum: any, segment: any) => {
      if (segment.isLicenseFee) {
        return sum + Number(calculateLicenseRevenue(segment.fee, segment.multiplier));
      }
      return sum + Number(calculateRevenue(segment.percentage, getBaseValueForSegment(segment.types)));
    }, 0).toFixed(2);
  };

  const getTotalPercentageForCategory = (category: any) => {
    return category.segments.reduce((sum: any, segment: any) => 
      segment.isLicenseFee ? sum : sum + segment.percentage, 0
    );
  };

  const calculateTotalTaxRevenue = () => {
    return segmentedTaxes.reduce((sum, category) => sum + Number(getTotalRevenueForCategory(category)), 0).toFixed(2);
  };

  const calculateTotalRevenueDistribution = () => {
    return taxDistribution.reduce((total, tax) => {
      const taxRevenue = (calculateTotalTaxRevenue() as any * tax.percentage) / 100;
      return total + Number(taxRevenue.toFixed(2));
    }, 0).toFixed(2);
  };

  const taxDistribution = [
    { 
      name: "Ministerio de Salud Pública", 
      percentage: 30, 
      description: "Para atender la finalidad de 'Regular y permitir el acceso y la utilización del cannabis y sus derivados para uso medicinal y terapéutico' (inciso a) del artículo 2), así como la creación y fortalecimiento de la red integral de asistencia para personas con problemas derivados del consumo de cannabis (inciso f) del artículo 2)." 
    },
    { 
      name: "Ministerio de Industria, Comercio y Mipymes", 
      percentage: 10, 
      description: "Para atender la finalidad de 'Autorizar la producción, industrialización y comercialización del cáñamo de uso industrial con fines alimentarios, veterinarios y terapéuticos, y sus productos derivados' (inciso b) del artículo 2)." 
    },
    { 
      name: "Ministerio de Agricultura", 
      percentage: 10, 
      description: "Para la finalidad de 'Promover el desarrollo económico y social y el adecuado reparto de la riqueza con énfasis en las zonas rurales de nuestro país' (inciso c) del artículo 2), en particular mediante el fomento de encadenamientos productivos que beneficien a los pequeños productores agropecuarios." 
    },
    { 
      name: "Ministerio de Interior y Policía, DNCD, y Ministerio Público", 
      percentage: 15, 
      description: "Para atender la finalidad de 'Proteger a los habitantes del país de los riesgos que implica el vínculo con el comercio ilegal y el narcotráfico' (inciso d) del artículo 2), así como para reducir la incidencia del narcotráfico, el crimen organizado, la estigmatización y criminalización del consumidor." 
    },
    { 
      name: "Consejo Nacional de Drogas", 
      percentage: 5, 
      description: "Para la finalidad de 'Proteger, promover y mejorar la salud pública de la población mediante una política orientada a minimizar los riesgos y reducir los daños por el uso del cannabis psicoactivo' (inciso e) del artículo 2), especialmente para promover la debida información, educación y prevención sobre los posibles efectos perjudiciales del consumo problemático." 
    },
    { 
      name: "Instituto Dominicano del Cannabis (INDOCANNABIS)", 
      percentage: 20, 
      description: "Para fortalecer las capacidades del INDOCANNABIS en su rol de regulación y supervisión de las actividades relacionadas con el cannabis, conforme al ARTÍCULO 28 de esta ley." 
    },
    { 
      name: "Fondo para necesidades emergentes en la regulación del cannabis", 
      percentage: 10, 
      description: "Este fondo será administrado por el INDOCANNABIS para enfrentar eventualidades regulatorias, formativas o de salud pública, como se establece en el ARTÍCULO 34." 
    }
  ];  

  const distributionTable = [
    { institution: "Ministerio Público", percentage: 25, amount: 97789016.96 },
    { institution: "Consejo Nacional de Drogas (CND)", percentage: 25, amount: 97789016.96 },
    { institution: "Dirección Nacional de Control de Drogas (DNCD)", percentage: 25, amount: 97789016.96 },
    { institution: "Policía Nacional", percentage: 10, amount: 39115606.78 },
    { institution: "ONGs dedicadas a la prevención del consumo de drogas (primer grupo)", percentage: 15, amount: 58673410.18, organizations: [
      "Hogar Crea Internacional",
      "Comunidad Hermanos Unidos en Cristo",
      "Hogar Crea Dominicano Inc.",
      "Asociación Guarabird Inc",
      "Fundación Desafío Juvenil Internacional",
      "El Mesón de Dios Ministerio de Rehabilitación de Adictos",
      "Ministerio en Cristo Se Puede Filipenses 4:13",
      "Fundación Centro de Solidaridad Santo Domingo Proyecto Hombre",
      "Fundación Volver Voluntarios Verdaderos",
      "Asociación Casa Abierta"
    ] },
    { institution: "ONGs dedicadas a la prevención del consumo de drogas (segundo grupo)", percentage: 15, amount: 58673410.18, organizations: [
      "Centro de Restauración Gavaón",
      "Casa del Alfarero",
      "Nuevo Renacer Inc.",
      "Ministerio Evangelístico Carcelario Rescatando Adictos para Cristo Inc.",
      "Misión Yeshua-Trayer Temple Church Fundación",
      "Ministerio Evangelístico Juan 3:16",
      "Fundación Casa de la Restauración Dios es Fiel",
      "Fundación Ciudades de Refugio",
      "Ministerio Evangelístico Rescatado del Lodo",
      "Fundación Fenix Volver a Vivir",
      "Asociación contra las Adicciones (ASCAYD)"
    ] }
  ];

  const PIBDominicana = 11200 // en millones

  const filteredMarkets = similarMarketsData.filter(market => {
    const isMedicinalSelected = medicalValue > 0;
    const isIndustrialSelected = hempValue > 0;
    const isAdultUseSelected = adultUseValue > 0;
  
    const isMarketValueValid = market.marketValue <= totalMarketValue;
  
    const matchesMedicinal = isMedicinalSelected ? market.medicinal === true : market.medicinal === false;
    const matchesIndustrial = isIndustrialSelected ? market.industrial === true : market.industrial === false;
    const matchesAdultUse = isAdultUseSelected ? market.adultUse === true : market.adultUse === false;
  
    return isMarketValueValid && 
           matchesMedicinal && 
           matchesIndustrial && 
           matchesAdultUse;
  }).sort((a, b) => b.marketValue - a.marketValue);
  

  const [showAllMarkets, setShowAllMarkets] = useState(false);

  const handleShowMore = () => {
    setShowAllMarkets(true);
  };

  const marketsToDisplay = showAllMarkets ? filteredMarkets : filteredMarkets.slice(0, 4);

  const casosRegistrados: any = [
    { delito: 'Robo calificado', total: 27630, porcentaje: 16.70 },
    { delito: 'Violencia intrafamiliar', total: 24019, porcentaje: 14.52 },
    { delito: 'Amenaza', total: 17921, porcentaje: 10.83 },
    { delito: 'Código del menor NNA', total: 15128, porcentaje: 9.14 },
    { delito: 'Golpes y heridas', total: 13121, porcentaje: 7.93 },
    { delito: 'Crímenes y delitos de alta tecnología', total: 10170, porcentaje: 6.15 },
    { delito: 'Violencia de género', total: 9729, porcentaje: 5.88 },
    { delito: 'Droga, simple posesión', highlighted: true, total: 6235, porcentaje: 3.77 },
    { delito: 'Ley de armas', total: 5376, porcentaje: 3.25 },
    { delito: 'Daños y perjuicios a la cosa ajena', total: 4505, porcentaje: 2.72 },
    { delito: 'Asociación de malhechores', total: 4136, porcentaje: 2.50 },
    { delito: 'Abuso de confianza', total: 4135, porcentaje: 2.50 },
    { delito: 'Estafa', total: 4084, porcentaje: 2.47 },
    { delito: 'Código de trabajo', total: 3654, porcentaje: 2.21 },
    { delito: 'Droga, traficante de droga', highlighted: true, total: 2161, porcentaje: 1.31 },
    { delito: 'Agresión sexual', total: 1580, porcentaje: 0.95 },
    { delito: 'Droga, distribución de droga', highlighted: true, total: 1205, porcentaje: 0.73 },
    { delito: 'Protección animal y tenencia responsable', total: 1053, porcentaje: 0.64 },
    { delito: 'Homicidio', total: 841, porcentaje: 0.51 },
    { delito: 'Pérdida de documento de identidad', total: 775, porcentaje: 0.47 },
    { delito: 'Falsificación', total: 652, porcentaje: 0.39 },
    { delito: 'Droga, sanciones y circunstancias agravantes', highlighted: true, total: 649, porcentaje: 0.39 },
    { delito: 'Tentativa de homicidio', total: 626, porcentaje: 0.38 },
    { delito: 'Tránsito y seguridad vial', total: 615, porcentaje: 0.37 },
    { delito: 'Violación sexual', total: 542, porcentaje: 0.33 },
    { delito: 'Desaparición', total: 433, porcentaje: 0.26 },
    { delito: 'Robo simple', total: 429, porcentaje: 0.26 },
    { delito: 'Crímenes y delitos contra la propiedad', total: 305, porcentaje: 0.18 },
    { delito: 'Difamación e injuria', total: 270, porcentaje: 0.16 },
    { delito: 'Propiedad industrial, intelectual y derecho de autor', total: 243, porcentaje: 0.15 },
    { delito: 'Tráfico ilícito de migrantes y trata de personas', total: 227, porcentaje: 0.14 },
    { delito: 'Conflictos sociales', total: 148, porcentaje: 0.09 },
    { delito: 'Medio ambiente y recursos naturales', total: 112, porcentaje: 0.07 },
    { delito: 'Secuestro', total: 51, porcentaje: 0.03 },
    { delito: 'Ley general de salud', total: 48, porcentaje: 0.03 },
    { delito: 'Contra el lavado de activos', highlighted: true, total: 40, porcentaje: 0.02 },
    { delito: 'Ley de cheques', total: 21, porcentaje: 0.01 },
    { delito: 'Juegos de azar', total: 19, porcentaje: 0.01 },
    { delito: 'Derechos humanos', total: 16, porcentaje: 0.01 },
    { delito: 'Terrorismo', total: 9, porcentaje: 0.01 },
    { delito: 'Proxenetismo', total: 7, porcentaje: 0.00 },
    { delito: 'Prevaricación', total: 5, porcentaje: 0.00 },
    { delito: 'Aborto y tentativa', total: 3, porcentaje: 0.00 },
    { delito: 'Otros', total: 1994, porcentaje: 1.21 },
    { delito: 'Indeterminados', total: 539, porcentaje: 0.33 },
    { delito: 'Total', total: 165461, porcentaje: 100.00 }
  ];

  const employmentFactor = 150_000; // 1 employee per 150,000 US$

  const calculateEmployment = () => {
    const medicalEmployment = Math.floor(medicalValue * 1_000_000 / employmentFactor);
    const hempEmployment = Math.floor(hempValue * 1_000_000 / employmentFactor);
    const adultUseEmployment = Math.floor(adultUseValue * 1_000_000 / employmentFactor);
  
    return medicalEmployment + hempEmployment + adultUseEmployment;
  };

  return (
    <div className="space-y-6">
      {/* Valor de Mercado del Cannabis por Segmento */}
      <Card>
        <CardHeader>
          <CardTitle>Valor de Mercado del Cannabis por Segmento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2">Cannabis Medicinal: US$ {medicalValue} millones</p>
            <Slider
              id="medical-value"
              min={0}
              max={5000}
              step={10}
              value={[medicalValue]}
              onValueChange={(value) => setMedicalValue(value[0])}
            />
          </div>
          <div>
            <p className="mb-2">Cáñamo Industrial: US$ {hempValue} millones</p>
            <Slider
              id="hemp-value"
              min={0}
              max={5000}
              step={10}
              value={[hempValue]}
              onValueChange={(value) => setHempValue(value[0])}
            />
          </div>
          <div>
            <p className="mb-2">Cannabis de Uso Adulto: US$ {adultUseValue} millones</p>
            <Slider
              id="adult-use-value"
              min={0}
              max={5000}
              step={10}
              value={[adultUseValue]}
              onValueChange={(value) => setAdultUseValue(value[0])}
            />
          </div>
          <p className="text-lg font-bold mt-4">Valor Total del Mercado: US$ {totalMarketValue} millones</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mercados Regulados Similares</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredMarkets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketsToDisplay.map((market, index) => (
                <div key={index} className="border p-4 rounded">
                  <h3 className="font-bold">{market.country}</h3>
                  <p>Valor de Mercado: US$ {market.marketValue.toLocaleString('en-US')} millones</p>
                  <p>{market.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay mercados similares para mostrar.</p>
          )}
          
          {/* Show "Cargar Más" button if there are more than 4 markets */}
          {!showAllMarkets && filteredMarkets.length > 4 && (
            <button onClick={handleShowMore} className="mt-4 p-2 bg-blue-500 text-white rounded">
              Cargar Todos
            </button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impacto en el Mercado de Trabajo</CardTitle>
        </CardHeader>
        <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Desglose por Industria</TableHead>
              <TableHead>Empleados Generados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Desglose por Industria */}
            <TableRow>
              <TableCell>Medicina</TableCell>
              <TableCell>
                {Math.floor(medicalValue * 1_000_000 / employmentFactor)} empleos
              </TableCell>
            </TableRow>

            <TableRow className="text-sm bg-gray-100">
              <TableCell>Empleados</TableCell>
              <TableCell>{Math.floor(medicalValue * 1_000_000 / employmentFactor)}</TableCell>
            </TableRow>
            <TableRow className="text-sm bg-gray-100">
              <TableCell>Empresas</TableCell>
              <TableCell>{Math.floor((medicalValue * 1_000_000 / employmentFactor) / 5)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Industria del Cáñamo</TableCell>
              <TableCell>
                {Math.floor(hempValue * 1_000_000 / employmentFactor)} empleos
              </TableCell>
            </TableRow>

            <TableRow className="text-sm bg-gray-100">
              <TableCell>Empleados</TableCell>
              <TableCell>{Math.floor(hempValue * 1_000_000 / employmentFactor)}</TableCell>
            </TableRow>
            <TableRow className="text-sm bg-gray-100">
              <TableCell>Empresas</TableCell>
              <TableCell>{Math.floor((hempValue * 1_000_000 / employmentFactor) / 5)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Uso Adulto</TableCell>
              <TableCell>
                {Math.floor(adultUseValue * 1_000_000 / employmentFactor)} empleos
              </TableCell>
            </TableRow>

            <TableRow className="text-sm bg-gray-100">
              <TableCell>Empleados</TableCell>
              <TableCell>{Math.floor(adultUseValue * 1_000_000 / employmentFactor)}</TableCell>
            </TableRow>
            <TableRow className="text-sm bg-gray-100">
              <TableCell>Empresas</TableCell>
              <TableCell>{Math.floor((adultUseValue * 1_000_000 / employmentFactor) / 5)}</TableCell>
            </TableRow>

            <TableRow className="font-bold">
              <TableCell>Total Empleados Generados</TableCell>
              <TableCell>
                {calculateEmployment()} empleos
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
        <div className="m-4 mt-0 text-sm text-muted-foreground">
          <p>
            Nota: Debido a la falta de información verificable en el país, hemos utilizado las mejores prácticas internacionales para realizar estos cálculos. 
            <br /><br />1) Calculamos 1 trabajador por cada 150,000 US$ generados por esa industria.
            <br />2) Asumimos 1 empresa por cada 5 empleados.
            <br /><br />Estos son números indicativos y podrían cambiar con información más precisa.
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Costos de Licencia (US$)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Licencia</TableHead>
                <TableHead>Cannabis Medicinal</TableHead>
                <TableHead>Cáñamo Industrial</TableHead>
                <TableHead>Uso Adulto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Cultivo</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={medicalCultivationMultiplier}
                    onChange={(e) => setMedicalCultivationMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={hempCultivationMultiplier}
                    onChange={(e) => setHempCultivationMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={adultUseCultivationMultiplier}
                    onChange={(e) => setAdultUseCultivationMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Producción</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={medicalProductionMultiplier}
                    onChange={(e) => setMedicalProductionMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={hempProductionMultiplier}
                    onChange={(e) => setHempProductionMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={adultUseProductionMultiplier}
                    onChange={(e) => setAdultUseProductionMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Industrialización y Comercio</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={medicalCommerceMultiplier}
                    onChange={(e) => setMedicalCommerceMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={hempCommerceMultiplier}
                    onChange={(e) => setHempCommerceMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={adultUseCommerceMultiplier}
                    onChange={(e) => setAdultUseCommerceMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
              </TableRow>
              {/* Additional row for Hemp Medical Cultivation */}
              <TableRow>
                <TableCell>Cultivo con Fines Médicos</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={hempMedicalCultivationMultiplier}
                    onChange={(e) => setHempMedicalCultivationMultiplier(Number(e.target.value))}
                    className="w-32"
                  />
                </TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <div className="m-4 text-sm text-muted-foreground">
          <p>
            Nota: Las tarifas de licencia para los negocios de cannabis se determinan típicamente en función del tamaño de la operación para los fines de cultivo, la destinacion del producto para fines industriales y medicinales, y el interes economico-social del estado. Por ejemplo, una operación de cultivo de 50,000 pies cuadrados podría pagar RD$500,000 por una licencia, mientras que una operación de 5,000 pies cuadrados pagaría RD$50,000. Los reglamentos seran creados por las entidades competentes (ver CAPÍTULO IV - AUTORIZACIONES, LICENCIAS, REQUISITOS Y REGISTROS)
          </p>
        </div>
      </Card>

      {/* Recaudación Estimada por Segmentos en 3 columnas */}
      <div className="grid gap-4 w-full md:grid-cols-2 xl:grid-cols-3">
      {segmentedTaxes.map((category, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {category.category}
            </h3>
          </div>
          
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Porcentaje/Monto
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recaudación Est. (M US$)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {category.segments.map((segment, segIndex) => (
                  <tr key={segIndex}>
                    <td className="px-4 py-3 whitespace-normal text-sm text-gray-900">
                      {segment.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {segment.isLicenseFee ? (
                        <select 
                          value={segment.fee}
                          onChange={(e) => segment.setFee(parseInt(e.target.value))}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          {licenseOptions.map((option) => (
                            <option key={option} value={option}>
                              {option.toLocaleString()}
                            </option>
                          ))}
                        </select>
                      ) : (
                        `${segment.percentage}%`
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {segment.isLicenseFee 
                        ? calculateLicenseRevenue(segment.fee, segment.multiplier)
                        : calculateRevenue(segment.percentage, getBaseValueForSegment(segment.types))
                      }
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">
                    Total Recaudación
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">
                    {getTotalRevenueForCategory(category)} millones de US$
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={2} className="px-4 py-3 text-sm font-bold text-gray-900">
                    % / PIB
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {(getTotalRevenueForCategory(category) * 100 / PIBDominicana).toFixed(2)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>

      {/* Distribución de Impuestos Recaudados */}
      <Card>
        <CardHeader>
          <CardTitle>Distribución de Impuestos Recaudados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entidad</TableHead>
                <TableHead>Porcentaje</TableHead>
                <TableHead>Recaudación (Millones de US$)</TableHead>
                <TableHead>Descripción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxDistribution.map((tax, taxIndex) => (
                <TableRow key={taxIndex}>
                  <TableCell>{tax.name}</TableCell>
                  <TableCell>{tax.percentage}%</TableCell>
                  <TableCell>{((calculateTotalTaxRevenue() as any * tax.percentage) / 100).toFixed(2)}</TableCell>
                  <TableCell width={'35%'}>{tax.description}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-bold">
                <TableCell colSpan={2}>Total Recaudación</TableCell>
                <TableCell>
                  {calculateTotalRevenueDistribution()} millones de US$
                </TableCell>
                <TableCell colSpan={1}>{(calculateTotalRevenueDistribution() as any * 59).toFixed(2)} millones de RD$</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <div className="m-4 mt-0 text-sm text-muted-foreground">
          <p>Nota: Los porcentajes son estimados basados en la propuesta de ley &quot;LEY PARA LA REGULACIÓN Y CONTROL DEL CANNABIS: NUEVOS MERCADOS PARA EL DESARROLLO&quot; y pueden variar según la implementación final. El impuesto específico al consumo de productos con cannabis es del 27% según el Artículo 39 de la ley propuesta. La distribución de los impuestos recaudados se basa en el Artículo 49 de la ley propuesta.</p>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribución de Fondos PGR 2023 <span style={{ fontSize: 12 }}>(<a href='https://dncd.gob.do/index.php/noticias1/noticias/item/1795-procuraduria-entrega-391-millones-a-instituciones-que-luchan-contra-las-drogas' target='_blank'>Link</a>)</span></CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institución/ONG</TableHead>
                <TableHead>Porcentaje Asignado</TableHead>
                <TableHead>Monto Asignado (RD$)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {distributionTable.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{item.institution}</TableCell>
                    <TableCell>{item.percentage}%</TableCell>
                    <TableCell>{item.amount.toLocaleString()}</TableCell>
                  </TableRow>
                  {item.organizations && item.organizations.map((org, orgIndex) => (
                    <TableRow key={orgIndex} style={{ backgroundColor: '#bdbdbd1c', fontSize: 12}}>
                      <TableCell style={{ paddingLeft: '20px' }}>{org}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          <br />
          <p>Total distribuido: RD$391,156,067.85</p>
        </CardContent>
      </Card>

      <Card className="my-4">
      <CardHeader>
        <CardTitle>
          Número de Casos Registrados PGR 2023 {' '}
          <span style={{ fontSize: 12 }}>
            <a href="https://transparencia.pgr.gob.do/Inicio/VisualizarDocumento?DocumentoId=44382" target="_blank" rel="noopener noreferrer">
            (Link)
            </a>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Delito</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {casosRegistrados.map((caso: any, index: any) => (
              <TableRow key={index} className={caso.delito === 'Total' ? 'font-bold' : ''} style={{ backgroundColor: caso.highlighted ? '#fff' : '#bdbdbd1c', fontSize: caso.highlighted ? 14 : 12, fontWeight: caso.highlighted ? 800 : 500 }}>
                <TableCell>{caso.delito}</TableCell>
                <TableCell>{caso.total.toLocaleString()}</TableCell>
                <TableCell>{caso.porcentaje}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <br />
        <p>Total de casos registrados: {casosRegistrados.find((c: any) => c.delito === 'Total').total.toLocaleString()}</p>
        <p className="mt-4 text-sm">Fuente: Sistema Justicia 2.0.</p>
        <p className="mt-4 text-sm">
        Estas estadísticas suministra informaciones de los diferentes
        casos que fueron tramitados por las fiscalías en la República Dominicana
        durante el año 2023. Estos datos provienen de los sistemas de apoyo
        a los fiscales denominados “Justicia XXI” y
        “Justicia 2.0.”, desarrollados por
        la PGR.
        </p>
      </CardContent>
    </Card>
    </div>
  );
};

export default CannabisMarketSimulator;
