import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CartProps } from '@/types';

const cartState = atom<CartProps>({
  key: 'cartState',
  default: {
    items: [],
    total_item: 0,
    cart_subtotal: 0,
    cart_total: 0,
    discount: 0,
    promotion: [],
    user_point: 100,
  },
})

export const useCartState = () => useRecoilState(cartState)
export const useCartStateValue = () => useRecoilValue(cartState)
export const useSetCartStateState = () => useSetRecoilState(cartState)