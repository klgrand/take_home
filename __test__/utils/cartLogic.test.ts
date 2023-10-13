import { mergedCartItem, calculatePercentage, calculatePercentageByCat, calculateByPoint, calculateBySeasonal } from '@/utils/cartLogic'
import { CartItemProps, CartProps } from '@/types'

describe('mergedCartItem function', () => {
  it('should merge cart item correctly', () => {
    const items: CartItemProps[] = [
      {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
      },
      {
          "_key": "item01",
          "name": "Hoodie",
          "img": "pexels-ron-lach-9594679.jpg",
          "price": 700,
          "product_category": "clothing",
          "qty": 1
      },
      {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
      }
    ]
    const mergeItem = mergedCartItem(items)
    expect(mergeItem).toHaveLength(2)
  })
})

describe('calculatePercentage function', () => {
  it('should discount percentage correctly', () => {
    const cart: CartProps = {
      "items": [
          {
              "_key": "item00",
              "name": "T-Shirt",
              "img": "pexels-vie-studio-8148577.jpg",
              "price": 350,
              "product_category": "clothing",
              "qty": 2
          }
      ],
      "total_item": 2,
      "cart_subtotal": 700,
      "cart_total": 700,
      "discount": 0,
      "promotion": [
          {
              "_key": "percentage_discount",
              "coupon": [
                  {
                      "_key": "percentage01",
                      "coupon": "percent_10",
                      "discount": 10
                  },
                  {
                      "_key": "percentage02",
                      "coupon": "percent_50",
                      "discount": 50
                  }
              ],
              "name": "Percentage discount",
              "campaign_category": "coupon",
              "rule": "Discounts the entire cart by subtracting a percentage from the total price",
              "priority": 1,
              "code": "percent_10"
          }
      ],
      "user_point": 100
  }
    const result = calculatePercentage(cart)
    expect(result.discount).toBe(70)
  })
})

describe('calculatePercentageByCat function', () => {
  it('should discount percentage by category correctly', () => {
    const cart: CartProps = {
      "items": [
          {
              "_key": "item00",
              "name": "T-Shirt",
              "img": "pexels-vie-studio-8148577.jpg",
              "price": 350,
              "product_category": "clothing",
              "qty": 2
          }
      ],
      "total_item": 2,
      "cart_subtotal": 700,
      "cart_total": 647.5,
      "discount": 0,
      "promotion": [
          {
              "_key": "percentage_discount_by_item_category",
              "coupon": [
                  {
                      "_key": "percentage_by_cat_01",
                      "coupon": "percent_clothing_15",
                      "discount": 15,
                      "category": "clothing"
                  },
                  {
                      "_key": "percentage_by_cat_02",
                      "coupon": "percent_electronics_50",
                      "discount": 50,
                      "category": "electronics"
                  },
                  {
                      "_key": "percentage_by_cat_03",
                      "coupon": "percent_accessories_10",
                      "discount": 10,
                      "category": "accessories"
                  }
              ],
              "name": "Percentage discount by item category",
              "campaign_category": "on_top",
              "rule": "Discount the entire amount of a specific category of items in cart",
              "priority": 2,
              "code": "percent_clothing_15"
          }
      ],
      "user_point": 100
    }
    const result = calculatePercentageByCat(cart)
    expect(result.discount).toBe(52.5)
  })
})

describe('calculateByPoint function', () => {
  it('should discount by user point correctly', () => {
    const cart: CartProps = {
      "items": [
          {
              "_key": "item00",
              "name": "T-Shirt",
              "img": "pexels-vie-studio-8148577.jpg",
              "price": 350,
              "product_category": "clothing",
              "qty": 2
          }
      ],
      "total_item": 2,
      "cart_subtotal": 700,
      "cart_total": 700,
      "discount": 0,
      "promotion": [
          {
              "_key": "discount_by_points",
              "coupon": [
                  {
                      "_key": "point_discount_01",
                      "coupon": "discount_point_10",
                      "discount": 10
                  },
                  {
                      "_key": "point_discount_02",
                      "coupon": "discount_point_70",
                      "discount": 70
                  }
              ],
              "name": "Discount by points",
              "campaign_category": "on_top",
              "rule": "Users spent points for a fixed amount of discount (1 point = 1 THB). The amount will be capped at 20% of total price",
              "priority": 2,
              "code": "discount_point_10"
          }
      ],
      "user_point": 100
    }
    const result = calculateByPoint(cart)
    expect(result.discount).toBe(10)
    expect(result.user_point).toBe(90)
  })

  it('should handle error when discount is over 20%', () => {
    const cart: CartProps = {
      "items": [
          {
              "_key": "item00",
              "name": "T-Shirt",
              "img": "pexels-vie-studio-8148577.jpg",
              "price": 350,
              "product_category": "clothing",
              "qty": 2
          }
      ],
      "total_item": 2,
      "cart_subtotal": 700,
      "cart_total": 700,
      "discount": 0,
      "promotion": [
          {
              "_key": "discount_by_points",
              "coupon": [
                  {
                      "_key": "point_discount_01",
                      "coupon": "discount_point_10",
                      "discount": 10
                  },
                  {
                      "_key": "point_discount_02",
                      "coupon": "discount_point_70",
                      "discount": 70
                  },
                  {
                      "_key": "point_discount_03",
                      "coupon": "discount_point_400",
                      "discount": 400
                  }
              ],
              "name": "Discount by points",
              "campaign_category": "on_top",
              "rule": "Users spent points for a fixed amount of discount (1 point = 1 THB). The amount will be capped at 20% of total price",
              "priority": 2,
              "code": "discount_point_400"
          }
      ],
      "user_point": 100
  }
  })
})

describe('calculateBySeasonal function', () => {
  it('should discount by seasonal correctly', () => {
    const cart: CartProps = {
      "items": [
          {
              "_key": "item00",
              "name": "T-Shirt",
              "img": "pexels-vie-studio-8148577.jpg",
              "price": 350,
              "product_category": "clothing",
              "qty": 2
          }
      ],
      "total_item": 2,
      "cart_subtotal": 700,
      "cart_total": 700,
      "discount": 0,
      "promotion": [
          {
              "_key": "special_campaigns",
              "coupon": [
                  {
                      "_key": "season_discount_01",
                      "coupon": "ev300_dis40",
                      "discount": 40,
                      "every": 300
                  },
                  {
                      "_key": "point_discount_02",
                      "coupon": "ev100_dis10",
                      "discount": 10,
                      "every": 100
                  }
              ],
              "name": "Special campaigns",
              "campaign_category": "seasonal",
              "rule": "From the total price, at every X THB, subtracting a fixed amount Y THB",
              "priority": 3,
              "code": "ev300_dis40"
          }
      ],
      "user_point": 90
    }
    const result = calculateBySeasonal(cart)
    expect(result.discount).toBe(93.33333333333334)
  })
})