import { ProductProps, CampaignProps } from '@/types'

export const PRODUCT_LIST: ProductProps[] = [
  {
    key: "item00",
    name: "T-Shirt",
    img: "pexels-vie-studio-8148577.jpg",
    price: 350,
    product_category: "clothing"
  },
  {
    key: "item01",
    name: "Hoodie",
    img: "pexels-ron-lach-9594679.jpg",
    price: 700,
    product_category: "clothing"
  },
  {
    key: "item02",
    name: "Hat",
    img: "pexels-sueda-dilli-18465760.jpg",
    price: 250,
    product_category: "accessories"
  },
  {
    key: "item03",
    name: "Bag",
    img: "pexels-luis-quintero-3731256.jpg",
    price: 640,
    product_category: "accessories"
  },
  {
    key: "item04",
    name: "Belt",
    img: "pexels-tima-miroshnichenko-6765642.jpg",
    price: 250,
    product_category: "accessories"
  },
  {
    key: "item05",
    name: "Watch",
    img: "pexels-martin-péchy-2078268.jpg",
    price: 850,
    product_category: "electronics"
  },
]

export const CAMPAIGN_LIST: CampaignProps[] = [
  {
    key: "fixed_amount",
    coupon: ["fixed_amount"],
    name: "Fixed amount",
    campaign_category: "coupon",
    rule: "Discounts the entire cart by subtracting an amount from the total price",
    priority: 1,
  },
  {
    key: "percentage_discount",
    coupon: ["percentage_discount"],
    name: "Percentage discount",
    campaign_category: "coupon",
    rule: "Discounts the entire cart by subtracting a percentage from the total price",
    priority: 1,
  },
  {
    key: "percentage_discount_by_item_category",
    coupon: ["percentage_discount_by_item_category"],
    name: "Percentage discount by item category",
    campaign_category: "on_top",
    rule: "Discount the entire amount of a specific category of items in cart",
    priority: 2,
  },
  {
    key: "discount_by_points",
    coupon: ["discount_by_points"],
    name: "Discount by points",
    campaign_category: "on_top",
    rule: "Users spent points for a fixed amount of discount (1 point = 1 THB). The amount will be capped at 20% of total price",
    priority: 2,
  },
  {
    key: "special_campaigns",
    coupon: ["special_campaigns"],
    name: "Special campaigns",
    campaign_category: "Seasonal",
    rule: "From the total price, at every X THB, subtracting a fixed amount Y THB",
    priority: 3,
  }
]