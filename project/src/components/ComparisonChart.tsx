import React from 'react';
import { ComparisonResults } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface ComparisonChartProps {
  comparison: ComparisonResults;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ comparison }) => {
  const { withFreeShipping, withoutFreeShipping } = comparison;
  
  // Determine which option has better net profit
  const betterOption = withFreeShipping.netProfit > withoutFreeShipping.netProfit
    ? 'with'
    : withFreeShipping.netProfit < withoutFreeShipping.netProfit
      ? 'without'
      : 'equal';
  
  const profitDifference = Math.abs(withFreeShipping.netProfit - withoutFreeShipping.netProfit);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Comparação do Programa Frete Grátis</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Métrica
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Com Frete Grátis
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sem Frete Grátis
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diferença
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Standard Commission */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Comissão Padrão</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withFreeShipping.standardCommission)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withoutFreeShipping.standardCommission)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(withFreeShipping.standardCommission - withoutFreeShipping.standardCommission)}
              </td>
            </tr>
            
            {/* Free Shipping Fee */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Taxa Frete Grátis (6%)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withFreeShipping.freeShippingFee)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withoutFreeShipping.freeShippingFee)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(withFreeShipping.freeShippingFee - withoutFreeShipping.freeShippingFee)}
              </td>
            </tr>
            
            {/* Fixed Service Fee */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Taxa de Serviço Fixa</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withFreeShipping.fixedServiceFee)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withoutFreeShipping.fixedServiceFee)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(withFreeShipping.fixedServiceFee - withoutFreeShipping.fixedServiceFee)}
              </td>
            </tr>
            
            {/* Campaign Fee */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Taxa de Campanha</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withFreeShipping.campaignFee)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withoutFreeShipping.campaignFee)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(withFreeShipping.campaignFee - withoutFreeShipping.campaignFee)}
              </td>
            </tr>
            
            {/* Total Fees */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Total de Taxas</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{formatCurrency(withFreeShipping.totalFees)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{formatCurrency(withoutFreeShipping.totalFees)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-500">
                {formatCurrency(withFreeShipping.totalFees - withoutFreeShipping.totalFees)}
              </td>
            </tr>
            
            {/* Gross Profit */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Lucro Bruto</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withFreeShipping.grossProfit)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(withoutFreeShipping.grossProfit)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(withFreeShipping.grossProfit - withoutFreeShipping.grossProfit)}
              </td>
            </tr>
            
            {/* Net Profit */}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">Lucro Líquido</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${betterOption === 'with' ? 'text-green-600' : 'text-gray-700'}`}>
                {formatCurrency(withFreeShipping.netProfit)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${betterOption === 'without' ? 'text-green-600' : 'text-gray-700'}`}>
                {formatCurrency(withoutFreeShipping.netProfit)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                betterOption === 'with' ? 'text-green-600' : betterOption === 'without' ? 'text-red-500' : 'text-gray-700'
              }`}>
                {formatCurrency(withFreeShipping.netProfit - withoutFreeShipping.netProfit)}
              </td>
            </tr>
            
            {/* Profit Margin */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Margem de Lucro</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${betterOption === 'with' ? 'text-green-600' : 'text-gray-500'}`}>
                {formatPercentage(withFreeShipping.profitMargin)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${betterOption === 'without' ? 'text-green-600' : 'text-gray-500'}`}>
                {formatPercentage(withoutFreeShipping.profitMargin)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                betterOption === 'with' ? 'text-green-600' : betterOption === 'without' ? 'text-red-500' : 'text-gray-500'
              }`}>
                {formatPercentage(withFreeShipping.profitMargin - withoutFreeShipping.profitMargin)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {betterOption !== 'equal' && (
        <div className={`mt-4 p-3 rounded-md ${betterOption === 'with' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
          <p className="text-sm font-medium">
            {betterOption === 'with' 
              ? `Usar o Programa Frete Grátis aumentaria seu lucro em ${formatCurrency(profitDifference)}`
              : `Não usar o Programa Frete Grátis aumentaria seu lucro em ${formatCurrency(profitDifference)}`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonChart;