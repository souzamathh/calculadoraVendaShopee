export interface CalculatorInputs {
  productPrice: number;
  cogs: number;
  freeShipping: boolean;
  orderVolume: number;
  campaignParticipation: boolean;
  listingType?: 'classic' | 'premium';
  category?: string;
  installments?: number;
  withdrawalType?: 'immediate' | '14days' | '30days';
  shippingCost?: number;
  advertisingRate?: number;
  subscriptionPlan?: 'individual' | 'classic' | 'premium';
}

export interface CalculationResults {
  standardCommission: number;
  freeShippingFee: number;
  fixedServiceFee: number;
  campaignFee: number;
  totalFees: number;
  grossProfit: number;
  netProfit: number;
  profitMargin: number;
  paymentFee: number;
  installmentFee: number;
  advertisingFee: number;
  subscriptionFee: number;
  shippingFee: number;
  salesTax: number;
}

export const CATEGORIES = [
  { name: 'Acessórios para Veículos' },
  { name: 'Agro' },
  { name: 'Alimentos e Bebidas' },
  { name: 'Animais' },
  { name: 'Antiguidades e Coleções' },
  { name: 'Arte, Papelaria e Armarinho' },
  { name: 'Bebês' },
  { name: 'Beleza e Cuidado Pessoal' },
  { name: 'Brinquedos e Hobbies' },
  { name: 'Calçados, Roupas e Bolsas' },
  { name: 'Casa, Móveis e Decoração' },
  { name: 'Celulares e Telefones' },
  { name: 'Construção' },
  { name: 'Eletrodomésticos' },
  { name: 'Eletrônicos, Áudio e Vídeo' },
  { name: 'Esportes e Fitness' },
  { name: 'Ferramentas' },
  { name: 'Festas e Lembrancinhas' },
  { name: 'Games' },
  { name: 'Imóveis' },
  { name: 'Indústria e Comércio' },
  { name: 'Informática' },
  { name: 'Ingressos' },
  { name: 'Instrumentos Musicais' },
  { name: 'Joias e Relógios' },
  { name: 'Livros, Revistas e Comics' },
  { name: 'Moda' },
  { name: 'Música' },
  { name: 'Saúde' },
  { name: 'Serviços' },
  { name: 'Outros' }
];