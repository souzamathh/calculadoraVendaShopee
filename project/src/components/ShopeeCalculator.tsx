import React, { useState, useEffect } from 'react';
import { CalculatorInputs, CalculationResults } from '../types';
import { formatCurrency } from '../utils/calculations';
import InfoAlert from './InfoAlert';

const ShopeeCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    productPrice: 0,
    cogs: 0,
    freeShipping: false,
    orderVolume: 1,
    campaignParticipation: false
  });

  const [results, setResults] = useState<CalculationResults>({
    standardCommission: 0,
    freeShippingFee: 0,
    fixedServiceFee: 0,
    campaignFee: 0,
    totalFees: 0,
    grossProfit: 0,
    netProfit: 0,
    profitMargin: 0,
    paymentFee: 0,
    installmentFee: 0,
    advertisingFee: 0,
    subscriptionFee: 0,
    shippingFee: 0,
    salesTax: 0
  });

  const calculateFees = (price: number, cost: number) => {
    const standardCommission = price * 0.14; // 14% standard commission
    const fixedServiceFee = price <= 8 ? 2 : 4; // R$4 for products above R$8, R$2 for below
    const freeShippingFee = inputs.freeShipping ? price * 0.06 : 0; // 6% for free shipping program
    const campaignFee = inputs.campaignParticipation ? price * 0.02 : 0; // 2% for campaigns

    const totalFees = standardCommission + fixedServiceFee + freeShippingFee + campaignFee;
    const receivePerSale = price - totalFees; // Amount received per sale (without considering costs)
    const salesTax = receivePerSale * 0.1026; // 10.26% sales tax on amount received
    const netProfit = receivePerSale - cost; // Net profit after costs
    const profitMargin = (netProfit / price) * 100;

    return {
      standardCommission,
      freeShippingFee,
      fixedServiceFee,
      campaignFee,
      totalFees,
      grossProfit: receivePerSale,
      netProfit,
      profitMargin,
      paymentFee: 0,
      installmentFee: 0,
      advertisingFee: 0,
      subscriptionFee: 0,
      shippingFee: 0,
      salesTax
    };
  };

  useEffect(() => {
    if (inputs.productPrice > 0) {
      setResults(calculateFees(inputs.productPrice, inputs.cogs));
    }
  }, [inputs]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <InfoAlert />
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzE0LTIyOjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjQuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDMtMjBUMTY6MzU6MzctMDM6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMDMtMjBUMTY6MzU6MzctMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTAzLTIwVDE2OjM1OjM3LTAzOjAwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY2ZjI5ZjE5LTJiZDAtNDJhZi1hZjE5LTJiZDY5ZjE5ZjE5ZiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjY2ZjI5ZjE5LTJiZDAtNDJhZi1h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"
            alt="Shopee" 
            className="h-8 w-8 mr-3"
          />
          <h2 className="text-xl font-semibold text-gray-900">Preço do produto</h2>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço do produto
            </label>
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-700 mr-2">R$</span>
              <input
                type="number"
                value={inputs.productPrice}
                onChange={(e) => setInputs({ ...inputs, productPrice: parseFloat(e.target.value) || 0 })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4a6670] focus:border-transparent"
                placeholder="0,00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custo do produto
            </label>
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-700 mr-2">R$</span>
              <input
                type="number"
                value={inputs.cogs}
                onChange={(e) => setInputs({ ...inputs, cogs: parseFloat(e.target.value) || 0 })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4a6670] focus:border-transparent"
                placeholder="0,00"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tarifas de venda</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <span className="text-gray-700">Programa Frete Grátis (+6%)</span>
                  <input
                    type="checkbox"
                    checked={inputs.freeShipping}
                    onChange={(e) => setInputs({ ...inputs, freeShipping: e.target.checked })}
                    className="ml-2 rounded text-[#4a6670] focus:ring-[#4a6670]"
                  />
                </label>
                <span className="text-gray-900">-{formatCurrency(results.freeShippingFee)}</span>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <span className="text-gray-700">Campanhas Promocionais (+2%)</span>
                  <input
                    type="checkbox"
                    checked={inputs.campaignParticipation}
                    onChange={(e) => setInputs({ ...inputs, campaignParticipation: e.target.checked })}
                    className="ml-2 rounded text-[#4a6670] focus:ring-[#4a6670]"
                  />
                </label>
                <span className="text-gray-900">-{formatCurrency(results.campaignFee)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Comissão padrão (14%)</span>
                <span className="text-gray-900">-{formatCurrency(results.standardCommission)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Taxa fixa de serviço</span>
                <span className="text-gray-900">-{formatCurrency(results.fixedServiceFee)}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Total em taxas</span>
              <span className="text-red-600">-{formatCurrency(results.totalFees)}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-semibold">
              <span>Você receberá por venda</span>
              <span className={results.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                {formatCurrency(results.grossProfit)}
              </span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-700">Custo do produto</span>
              <span className="text-gray-900">-{formatCurrency(inputs.cogs)}</span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-700">Imposto de venda (10,26%)</span>
              <span className="text-gray-900">-{formatCurrency(results.salesTax)}</span>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className="text-lg font-medium">Margem de contribuição</span>
              <div className="text-right">
                <div className={results.netProfit - results.salesTax >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {formatCurrency(results.netProfit - results.salesTax)}
                </div>
                <div className="text-sm text-gray-500">
                  {((results.netProfit - results.salesTax) / inputs.productPrice * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopeeCalculator;