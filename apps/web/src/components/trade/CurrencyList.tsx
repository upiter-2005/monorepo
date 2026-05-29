import { CURRENCY_LIST } from '@org/constants';

import { CurrencyTicket } from './CurrencyTicket';

export const CurrencyList: React.FC = () => {
  return (
    <ul className="border border-[#e3e3e3]">
      <div className="flex justify-between w-full px-2 text-xs font-bold p-2 bg-[#a7a7a7]">
        <div>Pair</div>
        <div className="w-[90px] text-right">Price</div>
        <div className="w-[80px] text-right">Change 24h</div>
      </div>
      <div>
        {CURRENCY_LIST.map((currency) => (
          <CurrencyTicket key={currency} currency={currency} />
        ))}
      </div>
    </ul>
  );
};
