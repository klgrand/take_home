"use client"

import React from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify'
import BarPrice from '@/components/BarPrice'
import CartItem from '@/components/CartItem'
import CampaignForm from '@/components/CampaignForm'
import { useCartState } from '@/recoil/atoms/cart'
import { CampaignProps } from '@/types'
import { removeCoupon } from '@/utils/cartEndpoint'


const Cart = () => {
  const [cart, updateCart] = useCartState()
  const items = _.get(cart, "items", [])

  const _onRemoveCoupon = (promo: CampaignProps) => {
    const result = removeCoupon(cart, promo._key)
    if(typeof result === "string") {
      toast.error(result)
      return cart
    }
    updateCart(result)
  }

  return (
    <div className="page__container">
      <div className="breadcrumb__container">
        <h2 className="text-xl font-semibold">Cart page</h2>
      </div>
      <div className="cart_page__container">
        <div className="cart__container h-full">
          <div className="text__title">
            Cart List
          </div>
          {items.map((item) => (
            <div key={item._key}>
              <CartItem {...item}  />
            </div>
          ))}
        </div>
        <div className="summary__container">
          <div className="campaign__container">
            <div className="text__title">
              Campaign
            </div>
            <div className="mt-4">
              <CampaignForm />
            </div>
            <div>
              {(cart?.promotion || []).map(promo => (
                <div key={promo._key} className="flex justify-between mt-4" data-testid="campaign-line-item">
                  <div className="text-green-600">
                    {`${promo.name} (${promo.code})`}
                  </div>
                  <div onClick={() => _onRemoveCoupon(promo)} className="text-red-500 cursor-pointer" data-testid="campaign-cancel-button">
                    x
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart_summary__container">
            <div className="text__title">
              Summary
            </div>
            <BarPrice title={"Subtotal"} price={cart.cart_subtotal} />
            <BarPrice title={"Discount"} price={cart.discount} />
            <BarPrice title={"Total"} price={cart.cart_total} />
          </div>
          <div className="m-4 text-gray-400">
            <div className="text-lg font-semibold">
              Category - coupon
            </div>
            <div>
            Fixed amount
              <div>
                fixed_50 (discount ฿50)
              </div>
              <div>
                fixed_100 (discount ฿100)
              </div>
              <div>
                fixed_350 (discount ฿350)
              </div>
              <div className="mb-4">
                fixed_500 (discount ฿500)
              </div>
              Percentage discount
              <div>
                percent_10 (discount 10%)
              </div>
              <div>
                percent_50 (discount 50%)
              </div>
            </div>
          </div>

          <div className="m-4 text-gray-400">
            <div className="text-lg font-semibold">
              Category - on top
            </div>
            <div>
            Percentage discount by item category
              <div>
                percent_clothing_15 (discount 15% of clothing category)
              </div>
              <div>
                percent_electronics_50 (discount 15% of clothing electronics)
              </div>
              <div className="mb-4">
                percent_accessories_10 (discount 15% of clothing accessories)
              </div>
             
              Discount by points
              <div>
                discount_point_10 (discount ฿10)
              </div>
              <div>
                discount_point_70 (discount ฿70)
              </div>
              <div>
                discount_point_400 (discount ฿400)
              </div>
            </div>
          </div>

          <div className="m-4 text-gray-400">
            <div className="text-lg font-semibold">
              Category - seasonal
            </div>
            <div>
              Special campaigns
              <div>
                ev300_dis40 (every ฿300 discount ฿40)
              </div>
              <div>
                ev100_dis10 (every ฿100 discount ฿10)
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Cart