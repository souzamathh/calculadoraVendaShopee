import React from 'react';
import { CalculatorInputs } from '../types';
import { CheckCircle as CircleCheck } from 'lucide-react';

interface InputSectionProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
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
          label: 'Preço do Produto (R$)',
          name: 'productPrice',
          value: inputs.productPrice,
          type: 'number',
          placeholder: 'Digite o preço',
        },
        {
          label: 'Custo do Produto (R$)',
          name: 'cogs',
          value: inputs.cogs,
          type: 'number',
          placeholder: 'Digite o custo',
        },
        {
          label: 'Quantidade',
          name: 'orderVolume',
          value: inputs.orderVolume,
          type: 'number',
          placeholder: 'Digite a quantidade',
        },
      ],
    },
    {
      title: 'Opções de Venda',
      fields: [
        {
          label: 'Programa Frete Grátis',
          name: 'freeShipping',
          value: inputs.freeShipping,
          type: 'checkbox',
        },
        {
          label: 'Campanhas Promocionais',
          name: 'campaignParticipation',
          value: inputs.campaignParticipation,
          type: 'checkbox',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div key={section.title} className="bg-white rounded-lg p-6">
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#e8f5f1] text-[#4a6670] mr-3">
              {idx + 1}
            </div>
            <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
            <CircleCheck className="ml-auto h-5 w-5 text-[#4a6670]" />
          </div>
          
          <div className="space-y-4">
            {section.fields.map(field => (
              <div key={field.name}>
                {field.type === 'checkbox' ? (
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={field.value as boolean}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-[#4a6670] focus:ring-[#4a6670]"
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
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4a6670] focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="flex space-x-4">
        <button 
          type="button"
          onClick={() => onChange({
            productPrice: 0,
            cogs: 0,
            freeShipping: false,
            orderVolume: 1,
            campaignParticipation: false
          })}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4a6670]"
        >
          Limpar
        </button>
        <button 
          type="button"
          className="flex-1 px-4 py-2 bg-[#4a6670] text-white rounded-md hover:bg-[#5c7882] focus:outline-none focus:ring-2 focus:ring-[#4a6670] focus:ring-offset-2"
        >
          Calcular
        </button>
      </div>
    </div>
  );
};

export default InputSection;