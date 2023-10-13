import _ from 'lodash'
import { CartItemProps, CartProps, CampaignProps } from '@/types'
import { CAMPAIGN_LIST } from '@/constants'

export const mergedCartItem = (cartItems: CartItemProps[]): CartItemProps[] => {
  return _.map(_.groupBy(cartItems, '_key'), (items) => {
    return {
      ...items[0],
      qty: _.sumBy(items, 'qty'),
    }
  })
}

export const checkCartItem = (cart: CartProps): boolean => {
  if (_.isEmpty(cart.items)) return false
  return true
}

export const checkPromotionInCart = (cart: CartProps): boolean => {
  if (_.isEmpty(cart.promotion)) return false
  return true
}

export const checkAvailableCoupon = (code: string): boolean => {
  const availableCoupon = CAMPAIGN_LIST.flatMap((item) => item.coupon).find(
    (item) => item.coupon === code
  )
  return !!availableCoupon
}

export const sortPromotionByPriority = (promotion: CampaignProps[]) => {
  return _.orderBy(promotion, 'priority')
}

export const refreshCart = (cart: CartProps): CartProps => {
  if (!checkCartItem(cart)) return resetCart(cart)
  let nTotalItem = 0
  let nCartSubTotal = 0
  let nCartTotal = 0
  for (let item of cart.items) {
    nTotalItem += item.qty
    nCartSubTotal += item.price * item.qty
    nCartTotal += item.price * item.qty
  }
  cart['total_item'] = nTotalItem
  cart['cart_subtotal'] = nCartSubTotal
  cart['cart_total'] = nCartTotal
  cart['discount'] = 0
  return cart
}

export const calculateFixedAmount = (cart: CartProps): CartProps => {
  const { promotion } = cart
  const fixedAmountPromo = _.find(promotion, { _key: 'fixed_amount' })
  const discountCoupon = _.find(fixedAmountPromo?.coupon, {
    coupon: fixedAmountPromo?.code,
  })
  const discount = _.get(discountCoupon, 'discount', 0)
  if (cart.cart_total - discount < 0)
    throw new Error('Cannot add this campaign because it over discount.')
  _.set(cart, 'discount', cart.discount + discount)
  _.set(cart, 'cart_total', cart.cart_total - discount)
  return cart
}

export const calculatePercentage = (cart: CartProps): CartProps => {
  const { promotion, cart_total } = cart
  const promo = _.find(promotion, { _key: 'percentage_discount' })
  const discountCoupon = _.find(promo?.coupon, { coupon: promo?.code })
  const percentDiscount = _.get(discountCoupon, 'discount', 0)
  const discount = (percentDiscount / 100) * cart_total
  if (cart_total - discount < 0)
    throw new Error('Cannot add this campaign because it over discount.')
  _.set(cart, 'discount', cart.discount + discount)
  _.set(cart, 'cart_total', cart_total - discount)
  return cart
}

export const calculatePercentageByCat = (cart: CartProps): CartProps => {
  const { promotion, cart_total, items } = cart
  const promo = _.find(promotion, {
    _key: 'percentage_discount_by_item_category',
  })
  const discountCoupon = _.find(promo?.coupon, { coupon: promo?.code })
  const percentDiscount = _.get(discountCoupon, 'discount', 0)
  const categoryDiscount = _.get(discountCoupon, 'category', '')
  const itemByCategory = _.filter(items, { product_category: categoryDiscount })
  const totalByCategory = _.sumBy(itemByCategory, 'price')
  const discount = (percentDiscount / 100) * totalByCategory
  if (cart_total - discount < 0)
    throw new Error('Cannot add this campaign because it over discount.')
  _.set(cart, 'discount', cart.discount + discount)
  _.set(cart, 'cart_total', cart_total - discount)
  return cart
}

export const calculateByPoint = (cart: CartProps): CartProps => {
  const { promotion, cart_total, user_point, discount } = cart
  const promo = _.find(promotion, { _key: 'discount_by_points' })
  const discountCoupon = _.find(promo?.coupon, { coupon: promo?.code })
  const pointDiscount = _.get(discountCoupon, 'discount', 0)
  const limitDiscount = (20 / 100) * cart_total
  const userPoint = user_point || 0
  if (pointDiscount <= limitDiscount && pointDiscount <= userPoint) {
    _.set(cart, 'discount', discount + pointDiscount)
    _.set(cart, 'cart_total', cart_total - pointDiscount)
    _.set(cart, 'user_point', userPoint - pointDiscount)
  } else {
    throw new Error('Point not enough or discount is over 20% of totol price')
  }
  return cart
}

export const calculateBySeasonal = (cart: CartProps): CartProps => {
  const { promotion, cart_total } = cart
  const promo = _.find(promotion, { _key: 'special_campaigns' })
  const discountCoupon = _.find(promo?.coupon, { coupon: promo?.code })
  const discount = _.get(discountCoupon, 'discount', 0)
  const every = _.get(discountCoupon, 'every', 0)
  if (every > 0 && discount + every <= cart_total && cart_total > 0) {
    const totalDiscount = (cart_total / every) * discount
    _.set(cart, 'discount', cart.discount + totalDiscount)
    _.set(cart, 'cart_total', cart_total - totalDiscount)
  } else {
    if (discount + every > cart_total) {
      throw new Error('Cannot process. Please remove special campaigns before.')
    } else {
      throw new Error('Cannot add this campaign because it over discount.')
    }
  }
  return cart
}

export const calculatePromotions = (cart: CartProps): CartProps => {
  if (!checkPromotionInCart(cart)) return resetPromotions(cart)
  cart['promotion'] = sortPromotionByPriority(cart.promotion)
  const promotions = cart.promotion
  for (const promotion of promotions) {
    if (promotion.campaign_category === 'coupon') {
      if (promotion._key === 'fixed_amount') calculateFixedAmount(cart)
      if (promotion._key === 'percentage_discount') calculatePercentage(cart)
    }

    if (promotion.campaign_category === 'on_top') {
      if (promotion._key === 'percentage_discount_by_item_category')
        calculatePercentageByCat(cart)
      if (promotion._key === 'discount_by_points') calculateByPoint(cart)
    }

    if (promotion.campaign_category === 'seasonal') {
      if (promotion._key === 'special_campaigns') calculateBySeasonal(cart)
    }
  }
  return cart
}

export const resetCart = (cart: CartProps): CartProps => {
  cart.items = []
  cart.promotion = []
  cart.total_item = 0
  cart.discount = 0
  cart.cart_subtotal = 0
  cart.cart_total = 0
  return cart
}

export const resetPromotions = (cart: CartProps): CartProps => {
  cart['discount'] = 0
  cart['cart_total'] = cart.cart_subtotal
  return cart
}

export const addCouponToCart = (cart: CartProps, coupon: string) => {
  let campaign = _.cloneDeep(CAMPAIGN_LIST).find((item) =>
    item.coupon.find((item) => item.coupon === coupon)
  )
  if (campaign) {
    _.set(campaign, 'code', coupon)
    if (_.isEmpty(cart.promotion)) {
      cart['promotion'].push(campaign)
    } else {
      const foundSameCategory = _.find(cart['promotion'], {
        campaign_category: campaign.campaign_category,
      })
      if (!foundSameCategory) {
        cart['promotion'].push(campaign)
      } else {
        for (let i = 0; i < cart['promotion'].length; i++) {
          if (
            cart['promotion'][i].campaign_category ===
            campaign.campaign_category
          ) {
            cart['promotion'][i] = campaign
          }
        }
      }
    }
  }
  return cart
}
