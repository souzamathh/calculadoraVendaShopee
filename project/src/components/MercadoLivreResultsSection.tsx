import React from 'react';
import { CalculationResults, CalculatorInputs } from '../types';
import { formatCurrency, formatPercentage } from '../utils/calculations';

interface MercadoLivreResultsSectionProps {
  results: CalculationResults;
  inputs: CalculatorInputs;
}

const MercadoLivreResultsSection: React.FC<MercadoLivreResultsSectionProps> = ({ results, inputs }) => {
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
              <span className="text-sm text-gray-600">Comissão ML</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(results.standardCommission)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Taxa Mercado Pago</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(results.paymentFee)}
              </span>
            </div>
            
            {results.installmentFee > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Taxa de Parcelamento</span>
                <span className="text-sm font-medium text-red-600">
                  -{formatCurrency(results.installmentFee)}
                </span>
              </div>
            )}
            
            {results.fixedServiceFee > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Taxa Fixa</span>
                <span className="text-sm font-medium text-red-600">
                  -{formatCurrency(results.fixedServiceFee)}
                </span>
              </div>
            )}
            
            {results.shippingFee > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Custo de Envio</span>
                <span className="text-sm font-medium text-red-600">
                  -{formatCurrency(results.shippingFee)}
                </span>
              </div>
            )}
            
            {results.advertisingFee > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Custo de Publicidade</span>
                <span className="text-sm font-medium text-red-600">
                  -{formatCurrency(results.advertisingFee)}
                </span>
              </div>
            )}
            
            {results.subscriptionFee > 0 && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Taxa de Assinatura</span>
                <span className="text-sm font-medium text-red-600">
                  -{formatCurrency(results.subscriptionFee)}
                </span>
              </div>
            )}
            
            <div className="flex justify-between pt-2 border-t">
              <span className="text-sm font-medium text-gray-700">Total de Taxas</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(results.totalFees)}
              </span>
            </div>
            
            <div className="flex justify-between pt-2">
              <span className="text-sm font-medium text-gray-700">Custo do Produto</span>
              <span className="text-sm font-medium text-red-600">
                -{formatCurrency(inputs.cogs * inputs.orderVolume)}
              </span>
            </div>
            
            <div className="flex justify-between pt-2 border-t">
              <span className="text-sm font-medium text-gray-700">Lucro Líquido</span>
              <span className={`text-sm font-medium ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(results.netProfit)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MercadoLivreResultsSection;