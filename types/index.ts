export interface ProductProps {
  _key: string
  name: string
  img: string
  price: number
  product_category: string
}

// export interface CategoriesProps {
//   _key: string
//   name: string
//   products: ProductProps[]
// }

export interface CartItemProps extends ProductProps {
  qty: number
}

export interface CampaignProps {
  _key: string
  coupon: CouponProps[]
  name: string
  campaign_category: string
  rule: string
  priority: number
  code?: string
  total_discount?: number
}

export interface CartProps {
  items: CartItemProps[]
  total_item: number
  cart_subtotal: number
  cart_total: number
  discount: number
  promotion: CampaignProps[]
  user_point?: number
}

export interface BarPriceProps {
  title: string
  price: number
}

export interface CouponProps {
  _key: string
  coupon: string
  discount: number
  category?: string
  every?: number
}
