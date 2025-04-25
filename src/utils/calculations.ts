import { CalculatorInputs, CalculationResults, CATEGORIES } from '../types';

export const calculateMercadoLivreFees = (inputs: CalculatorInputs): CalculationResults => {
  const {
    productPrice,
    cogs,
    orderVolume,
    listingType,
    category,
    installments,
    withdrawalType,
    shippingCost,
    advertisingRate,
    subscriptionPlan,
    freeShipping
  } = inputs;

  // Get category commission rate
  const categoryData = CATEGORIES.find(c => c.name === category) || CATEGORIES[CATEGORIES.length - 1];
  const commissionRate = listingType === 'premium' ? categoryData.premiumRate : categoryData.classicRate;
  
  // Calculate commission
  const standardCommission = productPrice * commissionRate * orderVolume;

  // Calculate payment processing fee (Mercado Pago)
  const basePaymentFee = (productPrice * 0.0499 + 0.70) * orderVolume;
  const expediteFee = withdrawalType === 'immediate' ? productPrice * 0.009 * orderVolume : 0;
  const paymentFee = basePaymentFee + expediteFee;

  // Calculate installment fee
  const installmentFee = installments > 1 
    ? productPrice * (installments - 1) * 0.0239 * orderVolume 
    : 0;

  // Calculate fixed service fee
  let fixedServiceFee = 0;
  if (productPrice < 29) {
    fixedServiceFee = category === 'Livros e Mídia' ? 3.00 : 6.25;
  } else if (productPrice < 50) {
    fixedServiceFee = category === 'Livros e Mídia' ? 3.50 : 6.50;
  } else if (productPrice < 79) {
    fixedServiceFee = category === 'Livros e Mídia' ? 4.00 : 6.75;
  }
  fixedServiceFee *= orderVolume;

  // Calculate shipping fee
  const shippingFee = freeShipping && productPrice >= 79 ? shippingCost : 0;

  // Calculate advertising fee
  const advertisingFee = productPrice * (advertisingRate / 100) * orderVolume;

  // Calculate subscription fee (prorated per item)
  let subscriptionFee = 0;
  if (subscriptionPlan === 'classic') {
    subscriptionFee = (39.99 / 30 / 10) * orderVolume; // Assuming 10 sales per day
  } else if (subscriptionPlan === 'premium') {
    subscriptionFee = (79.99 / 30 / 20) * orderVolume; // Assuming 20 sales per day
  }

  // Calculate total fees
  const totalFees = standardCommission + paymentFee + installmentFee + 
    fixedServiceFee + shippingFee + advertisingFee + subscriptionFee;

  // Calculate profits
  const grossProfit = (productPrice * orderVolume) - totalFees;
  const netProfit = grossProfit - (cogs * orderVolume);
  const profitMargin = (netProfit / (productPrice * orderVolume)) * 100;

  return {
    standardCommission,
    freeShippingFee: shippingFee,
    fixedServiceFee,
    campaignFee: 0,
    paymentFee,
    installmentFee,
    advertisingFee,
    subscriptionFee,
    shippingFee,
    totalFees,
    grossProfit,
    netProfit,
    profitMargin
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};