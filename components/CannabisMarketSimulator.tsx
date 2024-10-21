'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CannabisMarketSimulator = () => {
  const [medicalValue, setMedicalValue] = useState(50);
  const [hempValue, setHempValue] = useState(30);
  const [adultUseValue, setAdultUseValue] = useState(20);
  const [totalMarketValue, setTotalMarketValue] = useState(100);

  useEffect(() => {
    setTotalMarketValue(medicalValue + hempValue + adultUseValue);
  }, [medicalValue, hempValue, adultUseValue]);

  const calculateRevenue = (percentage: any, baseValue: any) => {
    return (baseValue * percentage / 100).toFixed(2);
  };

  const segmentedTaxes = [
    {
      category: "Cannabis Medicinal",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 0, types: ["medical"] },
        { name: "Licencias - Producción", percentage: 2, types: ["medical"] },
        { name: "Licencias - Industrialización y comercio", percentage: 2, types: ["medical"] },
        { name: "Licencias - Cultivo con fines médicos", percentage: 1, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Empresas Productoras", percentage: 7, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Empresas Industrializadoras", percentage: 5, types: ["medical"] },
        { name: "Impuesto sobre la Renta - Comercios", percentage: 10, types: ["medical"] },
      ]
    },
    {
      category: "Cáñamo Industrial",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 27, types: ["hemp"] },
        { name: "Licencias - Producción", percentage: 2, types: ["hemp"] },
        { name: "Licencias - Industrialización y comercio", percentage: 2, types: ["hemp"] },
        { name: "Licencias - Cultivo con fines industriales", percentage: 1, types: ["hemp"] },
        { name: "Licencias - Cultivo con fines médicos", percentage: 1, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Empresas Productoras", percentage: 7, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Empresas Industrializadoras", percentage: 5, types: ["hemp"] },
        { name: "Impuesto sobre la Renta - Comercios", percentage: 10, types: ["hemp"] },
      ]
    },
    {
      category: "Uso Adulto",
      segments: [
        { name: "Impuesto Específico al Consumo", percentage: 27, types: ["adultUse"] },
        { name: "Licencias - Producción", percentage: 2, types: ["adultUse"] },
        { name: "Licencias - Industrialización y comercio", percentage: 2, types: ["adultUse"] },
        { name: "Licencias - Cultivo con fines de uso adulto", percentage: 1, types: ["adultUse"] },
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
    return category.segments.reduce((sum: any, segment: any) =>
      sum + Number(calculateRevenue(segment.percentage, getBaseValueForSegment(segment.types))), 0
    ).toFixed(2);
  };

  const getTotalPercentageForCategory = (category: any) => {
    return category.segments.reduce((sum: any, segment: any) => sum + segment.percentage, 0);
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
    { name: "Ministerio de Salud", percentage: 10, description: "Para atender los incisos a) y e) del artículo 2" },
    { name: "Ministerio de Salud", percentage: 5, description: "Para atender el inciso f) del artículo 2" },
    { name: "Instituto Dominicano del Cannabis (INDOCANNABIS)", percentage: 15, description: "Para fortalecer sus capacidades y asegurar el cumplimiento normativo" },
    { name: "Otros destinos", percentage: 65, description: "Destino no especificado en el Artículo 42" },
  ];

  const stateSavings = [
    { entity: "Salud Pública", savings: 50, description: "Ahorros asignados para el sistema de salud." },
    { entity: "Educación", savings: 30, description: "Fondos destinados a mejorar la infraestructura educativa." },
    { entity: "Desarrollo Social", savings: 20, description: "Inversiones en programas de bienestar social." },
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
                    <TableHead>Porcentaje</TableHead>
                    <TableHead>Recaudación Estimada (Millones de US$)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.segments.map((segment, segIndex) => (
                    <TableRow key={segIndex}>
                      <TableCell>{segment.name}</TableCell>
                      <TableCell>{segment.percentage}%</TableCell>
                      <TableCell>{calculateRevenue(segment.percentage, getBaseValueForSegment(segment.types))}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold">
                    <TableCell>Total Recaudación</TableCell>
                    <TableCell colSpan={1}>
                      <span className="text-sm">{getTotalPercentageForCategory(category)}%</span>
                    </TableCell>
                    <TableCell colSpan={1}>
                      {getTotalRevenueForCategory(category)} millones de US$ 
                    </TableCell>
                  </TableRow>
                  <TableRow className="font-bold">
                    <TableCell colSpan={2}>% / PIB</TableCell>
                    <TableCell>
                      <span className="text-sm">{(getTotalRevenueForCategory(category) * 100 / PIBDominicana).toFixed(2)}%</span>
                    </TableCell>
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
                <TableCell colSpan={1}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
