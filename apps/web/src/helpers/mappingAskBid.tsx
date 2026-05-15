import { JSX } from 'react';

import { TRADE_TYPE } from '@org/constants';
import { TradeType } from '@org/types';

import { formatPrice, multipleFormatPrice } from './formatPrice';
import { PRICE_COLORS } from '../constants/priceColors';

type AskBidData = [string, string];

export const mappingAskBid = (data: AskBidData[], type: TradeType): JSX.Element[] => {
  //const dispatch = useAppDispatch();

  const textColor = type === TRADE_TYPE.ASK ? PRICE_COLORS.RED : PRICE_COLORS.GREEN;
  const filteredAskBid = type === TRADE_TYPE.ASK ? data.reverse() : data;

  return filteredAskBid.map((el, i) => (
    <li
      key={i + el[0]}
      className={`${textColor} text-xs p-1 hover:bg-gray-700 cursor-pointer flex gap-1.5`}
      //onClick={e => dispatch(setClickPrice(formatPrice(el[0], 2)))}
    >
      <span>{formatPrice(el[0], 2)}</span>
      <span>{formatPrice(el[1], 5)}</span>
      <span>{multipleFormatPrice(el[0], el[1])}</span>
    </li>
  ));
};
