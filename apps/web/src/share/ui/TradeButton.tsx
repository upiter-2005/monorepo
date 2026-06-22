import React from 'react';

import Button from '@mui/material/Button';
import { PAIR_ORDER_TYPE } from '@org/constants';
import { Currencies, OrderType } from '@org/types';

type TradeButtonProps = {
  type: OrderType;
  currency: Currencies;
  disabled?: boolean;
  handler: (type: OrderType) => void;
  label: string;
};

export const TradeButton: React.FC<TradeButtonProps> = ({
  type,
  currency,
  disabled = false,
  handler,
  label,
}) => {
  const isBuy = type === PAIR_ORDER_TYPE.BUY;

  return (
    <Button
      type="button"
      fullWidth
      variant="contained"
      disabled={disabled}
      onClick={() => handler(type)}
      sx={{
        bgcolor: isBuy ? 'success.light' : 'warning.dark',
        opacity: disabled ? 0.25 : 1,
        borderRadius: '10px',
      }}
    >
      {label} {currency}
    </Button>
  );
};
