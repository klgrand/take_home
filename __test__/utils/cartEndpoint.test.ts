import { addToCart, removeItemByKey, addCoupon, removeCoupon } from '@/utils/cartEndpoint'
import { CartProps } from '@/types'

describe('addToCart function', () => {
  it('should add item to cart correctly', () => {
    const cart: CartProps = {
      "items": [
        {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
        }
      ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [],
      "user_point": 100
    }

    const item = {
      "_key": "item01",
      "name": "Hoodie",
      "img": "pexels-ron-lach-9594679.jpg",
      "price": 700,
      "product_category": "clothing",
      "qty": 1
    }

    const updatedCart = addToCart(cart, item)

    expect(updatedCart.items).toHaveLength(2)
    expect(updatedCart.items[1]).toEqual(expect.objectContaining(item))
    expect(updatedCart.items[1].qty).toBe(1)
  })
})

describe('removeItemByKey function', () => {
  it('should add item to cart correctly', () => {
    const cart = {
      "items": [
        {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
        }
      ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [],
      "user_point": 100
    }
    const key = "item00"
    const removeItemInCart = removeItemByKey(cart, key)
    if(typeof removeItemInCart !== 'string') {
      expect(removeItemInCart.items).toHaveLength(0)
    }
  })

  it('should handle error in case function return with string', () => {
    const cart = {
      "items": [
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
        }
    ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [
        {
            "_key": "fixed_amount",
            "coupon": [
                {
                    "_key": "fixed01",
                    "coupon": "fixed_50",
                    "discount": 50
                },
                {
                    "_key": "fixed02",
                    "coupon": "fixed_100",
                    "discount": 100
                }
            ],
            "name": "Fixed amount",
            "campaign_category": "coupon",
            "rule": "Discounts the entire cart by subtracting an amount from the total price",
            "priority": 1,
            "code": "fixed_50"
        },
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
      "user_point": 100
    }
    const key = "item01"
    const removeItemInCart = removeItemByKey(cart, key)
    expect(removeItemInCart).toBe("Cannot process. Please remove special campaigns before.")
  })
})

describe('addCoupon function', () => {
  it('should add coupon to cart correctly', () => {
    const cart: CartProps = {
      "items": [
        {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
        }
      ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [],
      "user_point": 100
    }
    const coupon = "fixed_50"
    const addCouponResult = addCoupon(cart, coupon)
    if(typeof addCouponResult !== 'string') {
      expect(addCouponResult.promotion).toHaveLength(1)
    }
  })

  it('should handle error in case try to add another coupon over discount', () => {
    const cart: CartProps = {
      "items": [
        {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
        }
      ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [
        {
            "_key": "fixed_amount",
            "coupon": [
                {
                    "_key": "fixed01",
                    "coupon": "fixed_50",
                    "discount": 50
                },
                {
                    "_key": "fixed02",
                    "coupon": "fixed_100",
                    "discount": 100
                }
            ],
            "name": "Fixed amount",
            "campaign_category": "coupon",
            "rule": "Discounts the entire cart by subtracting an amount from the total price",
            "priority": 1,
            "code": "fixed_50"
        }
      ],
      "user_point": 100
    }
    const coupon = "ev300_dis40"
    const addCouponResult = addCoupon(cart, coupon)
    expect(addCouponResult).toBe("Cannot process. Please remove special campaigns before.")
  })

  it('should handle error in case try to add coupon over discount', () => {
    const cart: CartProps = {
      "items": [
        {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
        }
      ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [],
      "user_point": 100
    }
    const coupon = "fixed_500"
    const addCouponResult = addCoupon(cart, coupon)
    expect(addCouponResult).toBe("Cannot add this campaign because it over discount.")
  })

  it('should handle error in case there is not any item in cart', () => {
    const cart: CartProps = {
      "items": [],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [],
      "user_point": 100
    }
    const coupon = "fixed_50"
    const addCouponResult = addCoupon(cart, coupon)
    expect(addCouponResult).toBe("Please add item to cart before")
  })

  it('should handle error in case coupon is not available', () => {
    const cart: CartProps = {
      "items": [
        {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
        }
      ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [],
      "user_point": 100
    }
    const coupon = "fixed_1"
    const addCouponResult = addCoupon(cart, coupon)
    expect(addCouponResult).toBe("Coupon not found")
  })
})

describe('removeCoupon function', () => {
  it('should remove coupon to cart correctly', () => {
    const cart: CartProps = {
      "items": [
        {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
        }
      ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [
        {
            "_key": "fixed_amount",
            "coupon": [
                {
                    "_key": "fixed01",
                    "coupon": "fixed_50",
                    "discount": 50
                },
                {
                    "_key": "fixed02",
                    "coupon": "fixed_100",
                    "discount": 100
                }
            ],
            "name": "Fixed amount",
            "campaign_category": "coupon",
            "rule": "Discounts the entire cart by subtracting an amount from the total price",
            "priority": 1,
            "code": "fixed_50"
        }
      ],
      "user_point": 100
    }
    const campaignKey = "fixed_amount"
    const addCouponResult = removeCoupon(cart, campaignKey)
    if(typeof addCouponResult !== 'string') {
      expect(addCouponResult.promotion).toHaveLength(0)
    }
  })

  it('should handle error in case there is not campaign in cart but have action try to remove coupon', () => {
    const cart: CartProps = {
      "items": [
        {
          "_key": "item00",
          "name": "T-Shirt",
          "img": "pexels-vie-studio-8148577.jpg",
          "price": 350,
          "product_category": "clothing",
          "qty": 1
        }
      ],
      "total_item": 1,
      "cart_subtotal": 350,
      "cart_total": 350,
      "discount": 0,
      "promotion": [],
      "user_point": 100
    }
    const campaignKey = "fixed_amount"
    const addCouponResult = removeCoupon(cart, campaignKey)
    expect(addCouponResult).toBe("There is not campaign in cart.")
  })
})
