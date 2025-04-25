import React from 'react';
import { CalculationResults, CalculatorInputs, ComparisonResults } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface ResultsSectionProps {
  results: CalculationResults;
  inputs: CalculatorInputs;
  comparison: ComparisonResults;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, inputs, comparison }) => {
  const isProfitable = results.netProfit > 0;
  const betterOption = comparison.withFreeShipping.netProfit > comparison.withoutFreeShipping.netProfit
    ? 'with'
    : 'without';

  const getMarginColorClass = (margin: number) => {
    return margin >= 10 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {formatCurrency(results.netProfit)}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Lucro Líquido por Venda</p>
        <div className={`text-sm mt-2 ${getMarginColorClass(results.profitMargin)}`}>
          Margem de Lucro: {formatPercentage(results.profitMargin)}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Detalhamento</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Preço de Venda</span>
              <span className="text-sm font-medium">{formatCurrency(inputs.productPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Comissão (14%)</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(results.standardCommission)}
              </span>
            </div>
            {inputs.freeShipping && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Taxa Frete Grátis (6%)</span>
                <span className="text-sm font-medium text-red-600">
                  -{formatCurrency(results.freeShippingFee)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taxa de Serviço</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(results.fixedServiceFee)}
              </span>
            </div>
            {inputs.campaignParticipation && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Taxa de Campanha (2%)</span>
                <span className="text-sm font-medium text-red-600">
                  -{formatCurrency(results.campaignFee)}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t">
              <span className="text-sm font-medium text-gray-700">Total de Taxas</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(results.totalFees)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Programa Frete Grátis</h3>
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Com Frete Grátis</span>
              <span className={`text-sm font-medium ${betterOption === 'with' ? 'text-green-600' : 'text-gray-600'}`}>
                {formatCurrency(comparison.withFreeShipping.netProfit)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Sem Frete Grátis</span>
              <span className={`text-sm font-medium ${betterOption === 'without' ? 'text-green-600' : 'text-gray-600'}`}>
                {formatCurrency(comparison.withoutFreeShipping.netProfit)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;