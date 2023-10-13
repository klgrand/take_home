"use client"

import React from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify'
import BarPrice from '@/components/BarPrice'
import CartItem from '@/components/CartItem'
import CampaignForm from '@/components/CampaignForm'
import { useCartState } from '@/recoil/atoms/cart'
import { CampaignProps } from '@/types'
import { removeCoupon } from '@/utils'


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
                <div key={promo._key} className="flex justify-between mt-4">
                  <div className="text-green-600">
                    {`${promo.name} (${promo.code})`}
                  </div>
                  <div onClick={() => _onRemoveCoupon(promo)} className="text-red-500 cursor-pointer">
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
        </div>
      </div>
    </div>
  )
}

export default Cart