import { ProductProps, CampaignProps } from '@/types'

export const PRODUCT_LIST: ProductProps[] = [
  {
    _key: "item00",
    name: "T-Shirt",
    img: "pexels-vie-studio-8148577.jpg",
    price: 350,
    product_category: "clothing"
  },
  {
    _key: "item01",
    name: "Hoodie",
    img: "pexels-ron-lach-9594679.jpg",
    price: 700,
    product_category: "clothing"
  },
  {
    _key: "item02",
    name: "Hat",
    img: "pexels-sueda-dilli-18465760.jpg",
    price: 250,
    product_category: "accessories"
  },
  {
    _key: "item03",
    name: "Bag",
    img: "pexels-luis-quintero-3731256.jpg",
    price: 640,
    product_category: "accessories"
  },
  {
    _key: "item04",
    name: "Belt",
    img: "pexels-tima-miroshnichenko-6765642.jpg",
    price: 250,
    product_category: "accessories"
  },
  {
    _key: "item05",
    name: "Watch",
    img: "pexels-martin-péchy-2078268.jpg",
    price: 850,
    product_category: "electronics"
  },
]

export const CAMPAIGN_LIST: CampaignProps[] = [
  {
    _key: "fixed_amount",
    coupon: [
      {
        _key: "fixed01",
        coupon: "fixed_50",
        discount: 50
      },
      {
        _key: "fixed02",
        coupon: "fixed_100",
        discount: 100
      },
      {
        _key: "fixed03",
        coupon: "fixed_350",
        discount: 350
      },
      {
        _key: "fixed04",
        coupon: "fixed_500",
        discount: 500
      }
    ],
    name: "Fixed amount",
    campaign_category: "coupon",
    rule: "Discounts the entire cart by subtracting an amount from the total price",
    priority: 1,
    code: "",
  },
  {
    _key: "percentage_discount",
    coupon: [
      {
        _key: "percentage01",
        coupon: "percent_10",
        discount: 10
      },
      {
        _key: "percentage02",
        coupon: "percent_50",
        discount: 50
      }
    ],
    name: "Percentage discount",
    campaign_category: "coupon",
    rule: "Discounts the entire cart by subtracting a percentage from the total price",
    priority: 1,
    code: "",
  },
  {
    _key: "percentage_discount_by_item_category",
    coupon: [
      {
        _key: "percentage_by_cat_01",
        coupon: "percent_clothing_15",
        discount: 15,
        category: "clothing"
      },
      {
        _key: "percentage_by_cat_02",
        coupon: "percent_electronics_50",
        discount: 50,
        category: "electronics"
      },
      {
        _key: "percentage_by_cat_03",
        coupon: "percent_accessories_10",
        discount: 10,
        category: "accessories"
      }
    ],
    name: "Percentage discount by item category",
    campaign_category: "on_top",
    rule: "Discount the entire amount of a specific category of items in cart",
    priority: 2,
    code: "",
  },
  {
    _key: "discount_by_points",
    coupon: [
      {
        _key: "point_discount_01",
        coupon: "discount_point_10",
        discount: 10
      },
      {
        _key: "point_discount_02",
        coupon: "discount_point_70",
        discount: 70
      },
      {
        _key: "point_discount_03",
        coupon: "discount_point_400",
        discount: 400
      }
    ],
    name: "Discount by points",
    campaign_category: "on_top",
    rule: "Users spent points for a fixed amount of discount (1 point = 1 THB). The amount will be capped at 20% of total price",
    priority: 2,
    code: "",
  },
  {
    _key: "special_campaigns",
    coupon: [
      {
        _key: "season_discount_01",
        coupon: "ev300_dis40",
        discount: 40,
        every: 300
      },
      {
        _key: "point_discount_02",
        coupon: "ev100_dis10",
        discount: 10,
        every: 100
      }
    ],
    name: "Special campaigns",
    campaign_category: "seasonal",
    rule: "From the total price, at every X THB, subtracting a fixed amount Y THB",
    priority: 3,
    code: "",
  }
]