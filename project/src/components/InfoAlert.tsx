import React from 'react';
import { AlertCircle } from 'lucide-react';

const InfoAlert: React.FC = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            Esta calculadora é baseada na estrutura de taxas atual da Shopee Brasil:
            <ul className="mt-2 list-disc list-inside">
              <li>Comissão padrão: 14% (13% + 1% taxa de transação)</li>
              <li>Taxa de serviço fixa: R$4 para produtos acima de R$8, R$2 para produtos abaixo de R$8</li>
              <li>Programa Frete Grátis: +6% de comissão adicional</li>
            </ul>
            <a 
              href="https://seller.shopee.com.br/edu/article/18483/como-funciona-a-politica-de-comissao-para-vendedores-shopee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium underline hover:text-blue-600 mt-2 inline-block"
            >
              Consulte a política oficial da Shopee Brasil →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;