import { HTMLInputTypeAttribute } from 'react';

import { Input } from '../../share/ui/Input';

type PriceInputProps = {
  id: string;
  type: HTMLInputTypeAttribute;
  title: string;
  clickPrice: string | number;
  coin: string;
  disabled?: boolean;
  handler?: (value: string) => void | undefined;
};

export const PriceInput: React.FC<PriceInputProps> = (props) => {
  const { id, type, title, clickPrice, disabled, coin, handler } = props;

  return (
    <div className="flex gap-3 w-full bg-[#555] items-center px-2 my-3">
      <div>{title}</div>

      <Input
        name={id}
        type={type}
        id={id}
        value={clickPrice}
        disabled={disabled ?? true}
        onChange={(e) => handler?.(e.target.value)}
      />
      <div className="">
        <label htmlFor={id} className="uppercase">
          {coin}
        </label>
      </div>
    </div>
  );
};
