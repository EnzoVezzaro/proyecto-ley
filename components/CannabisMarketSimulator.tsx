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

  const calculateRevenue = (percentage: number) => {
    return (totalMarketValue * percentage / 100).toFixed(2);
  };

  const segmentedTaxes = [
    { category: "Impuesto Específico al Consumo", segments: [
      { name: "Uso Medicinal o Terapéutico", percentage: 10 },
      { name: "Cosméticos", percentage: 5 },
      { name: "Alimenticio", percentage: 5 },
      { name: "Veterinario", percentage: 3 },
      { name: "Uso Adulto", percentage: 4 },
    ]},
    { category: "Licencias", segments: [
      { name: "Producción", percentage: 2 },
      { name: "Industrialización", percentage: 2 },
      { name: "Comercio", percentage: 1 },
    ]},
    { category: "Impuesto sobre la Renta", segments: [
      { name: "Empresas Productoras", percentage: 10 },
      { name: "Empresas Industrializadoras", percentage: 10 },
      { name: "Comercios", percentage: 7 },
    ]},
  ];

  const taxDistribution = [
    { name: "Ministerio de Economía, Planificación y Desarrollo", percentage: 5, description: "Para atender el inciso c) del artículo 2" },
    { name: "Ministerio de Salud", percentage: 10, description: "Para atender los incisos a) y e) del artículo 2" },
    { name: "Ministerio de Salud", percentage: 5, description: "Para atender el inciso f) del artículo 2" },
    { name: "Instituto Dominicano del Cannabis (INDOCANNABIS)", percentage: 15, description: "Para fortalecer sus capacidades y asegurar el cumplimiento normativo" },
    { name: "Otros destinos", percentage: 65, description: "Destino no especificado en el Artículo 42" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Valor de Mercado del Cannabis por Segmento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2">Cannabis Medicinal: RD$ {medicalValue} millones</p>
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
            <p className="mb-2">Cáñamo Industrial: RD$ {hempValue} millones</p>
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
            <p className="mb-2">Cannabis de Uso Adulto: RD$ {adultUseValue} millones</p>
            <Slider
              id="adult-use-value"
              min={0}
              max={500}
              step={10}
              value={[adultUseValue]}
              onValueChange={(value) => setAdultUseValue(value[0])}
            />
          </div>
          <p className="text-lg font-bold mt-4">Valor Total del Mercado: RD$ {totalMarketValue} millones</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recaudación Estimada por Segmentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead>Segmento</TableHead>
                <TableHead>Porcentaje</TableHead>
                <TableHead>Recaudación Estimada (Millones de RD$)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {segmentedTaxes.map((category, index) => (
                <React.Fragment key={index}>
                  {category.segments.map((segment, segIndex) => (
                    <TableRow key={`${index}-${segIndex}`}>
                      {segIndex === 0 && (
                        <TableCell rowSpan={category.segments.length}>{category.category}</TableCell>
                      )}
                      <TableCell>{segment.name}</TableCell>
                      <TableCell>{segment.percentage}%</TableCell>
                      <TableCell>{calculateRevenue(segment.percentage)}</TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
              <TableRow className="font-bold">
                <TableCell colSpan={2}>Total Recaudación</TableCell>
                <TableCell>
                  {segmentedTaxes.reduce((acc, category) => 
                    acc + category.segments.reduce((sum, segment) => sum + segment.percentage, 0)
                  , 0)}%
                </TableCell>
                <TableCell>
                  {calculateRevenue(segmentedTaxes.reduce((acc, category) => 
                    acc + category.segments.reduce((sum, segment) => sum + segment.percentage, 0)
                  , 0))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribución de Impuestos Recaudados (Según Artículo 42)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destino</TableHead>
                <TableHead>Porcentaje</TableHead>
                <TableHead>Monto (Millones de RD$)</TableHead>
                <TableHead>Descripción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxDistribution.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>{(Number(calculateRevenue(59)) * item.percentage / 100).toFixed(2)}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
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