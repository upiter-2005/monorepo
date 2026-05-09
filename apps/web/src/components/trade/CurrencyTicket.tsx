import { useWsTicker } from '../../hooks/useWsTicker';

type CurrencyTicketProps = {
  currency: string;
};

export const CurrencyTicket: React.FC<CurrencyTicketProps> = ({ currency }) => {
  const { symbol, price, priceChange } = useWsTicker(currency);

  return (
    <div className="flex justify-between w-full px-2">
      <div>
        <span>{symbol}</span>
      </div>
      <div className={``}>{price}</div>
      <div>{priceChange}%</div>
    </div>
  );
};
