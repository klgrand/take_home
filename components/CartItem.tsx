"use client"

import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
import { CartItemProps } from '@/types'
import { useSetCartStateState } from '@/recoil/atoms/cart'
import { removeItemByKey } from '@/utils/cartEndpoint'
import { formatPrice } from '@/utils'
import { toast } from 'react-toastify'

const CartItem = (item: CartItemProps) => {
  const setCart = useSetCartStateState()

  const removeItem = () => {
    setCart((cart) => {
      const result = removeItemByKey(cart, item._key)
      if(typeof result === "string") {
        toast.error(result)
        return cart
      }
      return result
    })
  }

  return (
    <div className="cart_item flex mt-4 pt-4 pb-4 border-t border-gray-200" data-testid="product-line-item">
      <div className="cart_item__image_container">
        <Image
          src={`/${item.img}`}
          alt="cart icon"
          width={100}
          height={100}
          className='object-contain'
          data-testid="image-cartitem"
        />
      </div>
      <div className="cart_item__detail_container flex flex-col w-full pl-4 justify-between">
        <div className="flex justify-end">
          <div className="text-red-500 cursor-pointer" onClick={removeItem} data-testid="remove-line-item">Remove</div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="basis-2/12 text-gray-400 font-medium">Name :</div>
            <div className="text-sm">{item.name}</div>
          </div>
          <div className="flex items-center">
            <div className="basis-2/12 text-gray-400 font-medium">Price :</div>
            <div className="text-sm">{formatPrice(item.price, 2)}</div>
          </div>
          <div className="flex items-center">
            <div className="basis-2/12 text-gray-400 font-medium">Qty :</div>
            <div className="text-sm">{item.qty}</div>
          </div>
          <div className="flex items-center">
            <div className="basis-2/12 text-gray-400 font-medium">Total :</div>
            <div className="text-sm">{formatPrice(item.qty * item.price, 2)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem