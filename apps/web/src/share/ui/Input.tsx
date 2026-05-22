import { ChangeEvent, HTMLInputTypeAttribute, useEffect, useState } from 'react';

type InputType = {
  className?: string;
  name: string;
  type: HTMLInputTypeAttribute;
  id?: string;
  value: number | string;
  disabled: true | false;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputType> = (props) => {
  const { className, name, type, id, value, disabled, onChange } = props;

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      className={`bg-[#555] p-2 w-full text-right ${className}`}
      name={name}
      type={type}
      id={id}
      value={inputValue}
      disabled={disabled}
      onChange={(e) => {
        setInputValue(e.target.value);
        onChange?.(e);
      }}
    />
  );
};
