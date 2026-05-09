import { CurrencyTicket } from './CurrencyTicket';
import { CURRENCY_LIST } from '../../constants/currencyList';

export const Currencies: React.FC = () => {
  return (
    <div className="">
      <div className="flex justify-between w-full px-2">
        <span>Pair</span>
        <span>Price</span>
        <span>Change 24h</span>
      </div>
      <div className="">
        {CURRENCY_LIST.map((currency) => (
          <CurrencyTicket key={currency} currency={currency} />
        ))}
      </div>
    </div>
  );
};
