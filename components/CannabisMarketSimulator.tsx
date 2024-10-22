'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CannabisMarketSimulator = () => {
  const [medicalValue, setMedicalValue] = useState(50);
  const [hempValue, setHempValue] = useState(30);
  const [adultUseValue, setAdultUseValue] = useState(20);
  const [totalMarketValue, setTotalMarketValue] = useState(100);

  const [medicalCultivationFee, setMedicalCultivationFee] = useState(500);
  const [medicalProductionFee, setMedicalProductionFee] = useState(500);
  const [medicalCommerceFee, setMedicalCommerceFee] = useState(500);

  const [hempCultivationFee, setHempCultivationFee] = useState(500);
  const [hempProductionFee, setHempProductionFee] = useState(500);
  const [hempCommerceFee, setHempCommerceFee] = useState(500);
  const [hempMedicalCultivationFee, setHempMedicalCultivationFee] = useState(500);

  const [adultUseCultivationFee, setAdultUseCultivationFee] = useState(500);
  const [adultUseProductionFee, setAdultUseProductionFee] = useState(500);
  const [adultUseCommerceFee, setAdultUseCommerceFee] = useState(500);

  const LICENSE_MULTIPLIER = 1000;
  const licenseOptions = [0, 500, 5000, 10000, 15000, 25000, 50000, 100000];

  useEffect(() => {
    setTotalMarketValue(medicalValue + hempValue + adultUseValue);
  }, [medicalValue, hempValue, adultUseValue]);

  const calculateRevenue = (percentage: any, baseValue: any) => {
    return (baseValue * percentage / 100).toFixed(2);
  };

  const calculateLicenseRevenue = (fee: any) => {
    return ((fee * LICENSE_MULTIPLIER) / 1000000).toFixed(2); // Convert to millions
  };

  
  const segmentedTaxes = [
    {
      category: "Cannabis Medicinal",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 0, types: ["medical"] },
        { name: "Licencias - Producción", isLicenseFee: true, fee: medicalProductionFee, setFee: setMedicalProductionFee, types: ["medical"] },
        { name: "Licencias - Industrialización y comercio", isLicenseFee: true, fee: medicalCommerceFee, setFee: setMedicalCommerceFee, types: ["medical"] },
        { name: "Licencias - Cultivo con fines médicos", isLicenseFee: true, fee: medicalCultivationFee, setFee: setMedicalCultivationFee, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Empresas Productoras", percentage: 7, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Empresas Industrializadoras", percentage: 5, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Comercios", percentage: 10, types: ["medical"] },
      ]
    },
    {
      category: "Cáñamo Industrial",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 27, types: ["hemp"] },
        { name: "Licencias - Producción", isLicenseFee: true, fee: hempProductionFee, setFee: setHempProductionFee, types: ["hemp"] },
        { name: "Licencias - Industrialización y comercio", isLicenseFee: true, fee: hempCommerceFee, setFee: setHempCommerceFee, types: ["hemp"] },
        { name: "Licencias - Cultivo con fines industriales", isLicenseFee: true, fee: hempCultivationFee, setFee: setHempCultivationFee, types: ["hemp"] },
        { name: "Licencias - Cultivo con fines médicos", isLicenseFee: true, fee: hempMedicalCultivationFee, setFee: setHempMedicalCultivationFee, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Empresas Productoras", percentage: 7, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Empresas Industrializadoras", percentage: 5, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Comercios", percentage: 10, types: ["hemp"] },
      ]
    },
    {
      category: "Uso Adulto",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 27, types: ["adultUse"] },
        { name: "Licencias - Producción", isLicenseFee: true, fee: adultUseProductionFee, setFee: setAdultUseProductionFee, types: ["adultUse"] },
        { name: "Licencias - Industrialización y comercio", isLicenseFee: true, fee: adultUseCommerceFee, setFee: setAdultUseCommerceFee, types: ["adultUse"] },
        { name: "Licencias - Cultivo con fines de uso adulto", isLicenseFee: true, fee: adultUseCultivationFee, setFee: setAdultUseCultivationFee, types: ["adultUse"] },
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

  const getTotalRevenueForCategory = (category) => {
    return category.segments.reduce((sum, segment) => {
      if (segment.isLicenseFee) {
        return sum + Number(calculateLicenseRevenue(segment.fee));
      }
      return sum + Number(calculateRevenue(segment.percentage, getBaseValueForSegment(segment.types)));
    }, 0).toFixed(2);
  };

  const getTotalPercentageForCategory = (category) => {
    return category.segments.reduce((sum, segment) => 
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
    { name: "Ministerio de Economía, Planificación y Desarrollo", percentage: 5, description: "Para atender el inciso c) del artículo 2" },
    { name: "Ministerio de Salud: Uso Medicinal", percentage: 10, description: "Para atender los incisos a) y e) del artículo 2" },
    { name: "Ministerio de Salud: Red integral de Asistencia ", percentage: 5, description: "Para atender el inciso f) del artículo 2" },
    { name: "Instituto Dominicano del Cannabis (INDOCANNABIS)", percentage: 15, description: "Para fortalecer sus capacidades y asegurar el cumplimiento normativo" },
    { name: "Otros destinos", percentage: 65, description: "Destino no especificado en el Artículo 42" },
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
              max={500}
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
              max={500}
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
              max={500}
              step={10}
              value={[adultUseValue]}
              onValueChange={(value) => setAdultUseValue(value[0])}
            />
          </div>
          <p className="text-lg font-bold mt-4">Valor Total del Mercado: US$ {totalMarketValue} millones</p>
        </CardContent>
      </Card>

      {/* Recaudación Estimada por Segmentos en 3 columnas */}
      <div className="flex space-x-4">
      {segmentedTaxes.map((category, index) => (
          <Card key={index} className="flex-1">
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Porcentaje/Monto</TableHead>
                    <TableHead>Recaudación Estimada (Millones de US$)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.segments.map((segment, segIndex) => (
                    <TableRow key={segIndex}>
                      <TableCell>{segment.name}</TableCell>
                      <TableCell>
                        {segment.isLicenseFee ? (
                          <Select 
                            value={segment.fee.toString()} 
                            onValueChange={(value) => segment.setFee(parseInt(value))}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {licenseOptions.map((option) => (
                                <SelectItem key={option} value={option.toString()}>
                                  {option.toLocaleString()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          `${segment.percentage}%`
                        )}
                      </TableCell>
                      <TableCell>
                        {segment.isLicenseFee 
                          ? calculateLicenseRevenue(segment.fee)
                          : calculateRevenue(segment.percentage, getBaseValueForSegment(segment.types))
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold">
                    <TableCell>Total Recaudación</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{getTotalRevenueForCategory(category)} millones de US$</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
                  <TableCell>{tax.description}</TableCell>
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
      </Card>

      <Card>
      <CardHeader>
        <CardTitle>Distribución de Fondos Procuraduria 2023 <span style={{ fontSize: 12 }}>(<a href='https://dncd.gob.do/index.php/noticias1/noticias/item/1795-procuraduria-entrega-391-millones-a-instituciones-que-luchan-contra-las-drogas' target='_blank'>Link</a>)</span></CardTitle>
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

      <div className="text-sm text-muted-foreground">
        <p>Nota: Los porcentajes son estimados basados en la ley propuesta y pueden variar según la implementación final.</p>
        <p>El impuesto específico al consumo de productos con cannabis es del 27% según el Artículo 36 de la ley propuesta.</p>
        <p>La distribución de los impuestos recaudados se basa en el Artículo 42 de la ley propuesta.</p>
      </div>
    </div>
  );
};

export default CannabisMarketSimulator;
