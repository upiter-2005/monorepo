import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

type InputType = {
  className?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  id?: string;
  value: number | string;
  disabled?: true | false;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputType> = ({
  className,
  name,
  type,
  id,
  value,
  disabled,
  onChange,
}) => {
  return (
    <input
      className={`bg-[#555] p-2 w-full text-right ${className}`}
      name={name}
      type={type}
      id={id}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};
