import _ from 'lodash'
import { CartItemProps, CartProps } from '@/types'
import { mergedCartItem, calculatePromotions, refreshCart, checkAvailableCoupon, checkCartItem, addCouponToCart } from './cartLogic'

export const addToCart = (cart: CartProps, item: CartItemProps): CartProps => {
  let nCart = _.cloneDeep(cart)
  const nItems = [ ...cart.items, { ...item, qty: 1 } ]
  nCart = { ...cart, items: mergedCartItem(nItems) }
  return calculatePromotions(refreshCart(nCart))
}

export const removeItemByKey = (cart: CartProps, key: string): CartProps | string => {
  try {
    const nCart = _.cloneDeep(cart)
    nCart['items'] = nCart.items.filter(item => item._key !== key)
    return calculatePromotions(refreshCart(nCart))
  } catch (error: any) {
    return `${error.message}`
  }
}

export const addCoupon = (cart: CartProps, coupon: string): CartProps | string => {    
  try {
    const nCart = _.cloneDeep(cart)
    if(!checkCartItem(cart)) throw new Error("Please add item to cart before")
    const availablePromotion = checkAvailableCoupon(coupon)
    if(!availablePromotion) throw new Error("Coupon not found")
    const resultAddCoupon = refreshCart(addCouponToCart(nCart, coupon))
    return calculatePromotions(resultAddCoupon)
  } catch (error: any) {
    return `${error.message}`
  }
}

export const removeCoupon = (cart: CartProps, campaignKey: string): CartProps | string => {
  try {
    const nCart = _.cloneDeep(cart)
    if(_.isEmpty(nCart?.promotion)) throw new Error('There is not campaign in cart.')
    nCart["promotion"] = nCart.promotion.filter(promo => promo._key != campaignKey)
    return calculatePromotions(refreshCart(nCart))
  } catch (error: any) {
    return `${error.message}`
  }
}

export const checkOut = () => {}