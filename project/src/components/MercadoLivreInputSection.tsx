import React from 'react';
import { CalculatorInputs, CATEGORIES } from '../types';
import { CheckCircle } from 'lucide-react';

interface MercadoLivreInputSectionProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

const MercadoLivreInputSection: React.FC<MercadoLivreInputSectionProps> = ({ inputs, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    onChange({
      ...inputs,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
    });
  };

  const sections = [
    {
      title: 'Dados do Produto',
      fields: [
        {
          label: 'Categoria',
          name: 'category',
          type: 'select',
          value: inputs.category,
          options: CATEGORIES.map(cat => ({
            value: cat.name,
            label: cat.name
          }))
        },
        {
          label: 'Preço do Produto (R$)',
          name: 'productPrice',
          type: 'number',
          value: inputs.productPrice,
          placeholder: 'Digite o preço'
        },
        {
          label: 'Custo do Produto (R$)',
          name: 'cogs',
          type: 'number',
          value: inputs.cogs,
          placeholder: 'Digite o custo'
        },
        {
          label: 'Quantidade',
          name: 'orderVolume',
          type: 'number',
          value: inputs.orderVolume,
          placeholder: 'Digite a quantidade'
        }
      ]
    },
    {
      title: 'Opções de Venda',
      fields: [
        {
          label: 'Tipo de Anúncio',
          name: 'listingType',
          type: 'select',
          value: inputs.listingType,
          options: [
            { value: 'classic', label: 'Clássico' },
            { value: 'premium', label: 'Premium' }
          ]
        },
        {
          label: 'Plano de Assinatura',
          name: 'subscriptionPlan',
          type: 'select',
          value: inputs.subscriptionPlan,
          options: [
            { value: 'individual', label: 'Individual' },
            { value: 'classic', label: 'Clássico (R$39,99/mês)' },
            { value: 'premium', label: 'Premium (R$79,99/mês)' }
          ]
        },
        {
          label: 'Parcelas',
          name: 'installments',
          type: 'select',
          value: inputs.installments,
          options: Array.from({ length: 12 }, (_, i) => ({
            value: i + 1,
            label: `${i + 1}x${i === 0 ? ' à vista' : ''}`
          }))
        },
        {
          label: 'Prazo de Recebimento',
          name: 'withdrawalType',
          type: 'select',
          value: inputs.withdrawalType,
          options: [
            { value: 'immediate', label: 'Imediato (+0.9%)' },
            { value: '14days', label: '14 dias' },
            { value: '30days', label: '30 dias' }
          ]
        }
      ]
    },
    {
      title: 'Opções Adicionais',
      fields: [
        {
          label: 'Custo de Envio (R$)',
          name: 'shippingCost',
          type: 'number',
          value: inputs.shippingCost,
          placeholder: 'Digite o custo de envio'
        },
        {
          label: 'Taxa de Publicidade (%)',
          name: 'advertisingRate',
          type: 'number',
          value: inputs.advertisingRate,
          placeholder: 'Digite a taxa de publicidade'
        },
        {
          label: 'Frete Grátis (acima de R$79)',
          name: 'freeShipping',
          type: 'checkbox',
          checked: inputs.freeShipping
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div key={section.title} className="bg-white rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fff3cd] text-[#856404] mr-3">
              {idx + 1}
            </div>
            <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
            <CheckCircle className="ml-auto h-5 w-5 text-[#856404]" />
          </div>
          
          <div className="space-y-4">
            {section.fields.map(field => (
              <div key={field.name}>
                {field.type === 'select' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <select
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#856404] focus:border-transparent"
                    >
                      {field.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : field.type === 'checkbox' ? (
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={field.checked}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-[#856404] focus:ring-[#856404]"
                    />
                    <span className="text-sm text-gray-700">{field.label}</span>
                  </label>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#856404] focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MercadoLivreInputSection;