import React from 'react';
import ShopeeCalculator from './ShopeeCalculator';

interface CalculatorProps {
  marketplace: 'shopee' | 'mercadolivre';
}

const Calculator: React.FC<CalculatorProps> = () => {
  return <ShopeeCalculator />;
};

export default Calculator;