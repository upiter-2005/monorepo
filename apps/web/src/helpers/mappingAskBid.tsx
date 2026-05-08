import { JSX } from 'react';

import { TRADE_TYPE } from '@org/constants';
import { TradeType } from '@org/types';

import { formatPrice, multipleFormatPrice } from './formatPrice';
import { PRICE_COLORS } from '../constants/priceColors';

type AskBidData = [string, string];

export const mappingAskBid = (data: AskBidData[], type: TradeType): JSX.Element[] => {
  const textColor = type === TRADE_TYPE.ASK ? PRICE_COLORS.RED : PRICE_COLORS.GREEN;

  return data.map((el, i) => (
    <ul>
      <li
        key={i}
        className={`${textColor} text-xs p-1 hover:bg-gray-700 cursor-pointer flex gap-1.5`}
      >
        <span>{formatPrice(el[0], 2)}</span>
        <span>{formatPrice(el[1], 5)}</span>
        <span>{multipleFormatPrice(el[0], el[1])}</span>
      </li>
    </ul>
  ));
};
