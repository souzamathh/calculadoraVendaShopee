import React, { useState, useEffect } from 'react';
import { CalculatorInputs, CATEGORIES } from '../types';
import { calculateMercadoLivreFees } from '../utils/calculations';

const MercadoLivreCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    productPrice: 0,
    cogs: 0,
    freeShipping: false,
    orderVolume: 1,
    campaignParticipation: false,
    listingType: 'classic',
    category: CATEGORIES[0].name,
    shippingCost: 0,
    advertisingRate: 0
  });

  const [results, setResults] = useState(calculateMercadoLivreFees(inputs));

  useEffect(() => {
    setResults(calculateMercadoLivreFees(inputs));
  }, [inputs]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/825/825561.png" 
            alt="Mercado Livre" 
            className="h-8 w-8 mr-3"
          />
          <h2 className="text-xl font-semibold text-gray-900">Preço do anúncio</h2>
        </div>

        <div className="mb-6">
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-700 mr-2">R$</span>
            <input
              type="number"
              value={inputs.productPrice}
              onChange={(e) => setInputs({ ...inputs, productPrice: parseFloat(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#856404] focus:border-transparent"
              placeholder="0,00"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Custos estimados</h3>
            
            <div className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={inputs.category}
                  onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#856404] focus:border-transparent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de anúncio
                </label>
                <select
                  value={inputs.listingType}
                  onChange={(e) => setInputs({ ...inputs, listingType: e.target.value as 'classic' | 'premium' })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#856404] focus:border-transparent"
                >
                  <option value="classic">Clássico</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Comissão ML</span>
                <span className="text-gray-900">-{((results.standardCommission / inputs.productPrice) * 100).toFixed(1)}%</span>
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <span className="text-gray-700">Frete Grátis (acima de R$79)</span>
                  <input
                    type="checkbox"
                    checked={inputs.freeShipping}
                    onChange={(e) => setInputs({ ...inputs, freeShipping: e.target.checked })}
                    className="ml-2 rounded text-[#856404] focus:ring-[#856404]"
                  />
                </label>
                <span className="text-gray-900">-{results.shippingFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Taxa de venda</span>
                <span className="text-gray-900">-{results.standardCommission.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Total em taxas</span>
              <span className="text-red-600">-{results.totalFees.toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-semibold">
              <span>Você receberá por venda</span>
              <span className={results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}>
                {results.netProfit.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1 text-right">
              Margem de lucro: <span className={results.profitMargin >= 10 ? 'text-green-600' : 'text-red-600'}>
                {results.profitMargin.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MercadoLivreCalculator;