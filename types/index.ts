export interface ProductProps {
  key: string
  name: string
  img: string
  price: number
  product_category: string
}

// export interface CategoriesProps {
//   key: string
//   name: string
//   products: ProductProps[]
// }

export interface CartItemProps extends ProductProps {
  item: number
  subTotal: number
}

export interface CampaignProps {
  key: string
  coupon: string[]
  name: string
  campaign_category: string
  rule: string
  priority: number
}

export interface CartProps {
  items: CartItemProps[]
  totalItem: number
  cartSubTotal: number
  cartTotal: number
  discount: number
  promotion: CampaignProps[]
}

export interface BarPriceProps {
  title: string
  price: number
}