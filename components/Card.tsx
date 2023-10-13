"use client"

import React from 'react'
import Image from 'next/image'
import _ from 'lodash'
import { ProductProps } from '@/types'
import { useSetCartStateState } from '@/recoil/atoms/cart'
import { addToCart } from '@/utils/cartEndpoint'
import { formatPrice } from '@/utils'


const Card = (item: ProductProps) => {
  const setCart = useSetCartStateState()

  const _addToCart = () => {
    setCart((cart) => addToCart(cart, { ...item, qty: 1 }))
  }

  return (
    <div className="card__container">
      <Image
        src={`/${item.img}`}
        alt={`image ${item._key}`}
        width={384}
        height={384}
        className="object-contain rounded-t-lg"
      />
      <div className="flex justify-between">
        <div className="p-3">
          <span className="text-xl">
            {item.name}
          </span>
          <span className="text-gray-400 ml-2">
            {`(${item.product_category})`}
          </span>
        </div>
        <div className="text-xl p-3">
          {formatPrice(item.price, 2)}
        </div>
      </div>
      <div className="flex justify-end mr-3 mb-4">
        <button type="button" className="btn" onClick={_addToCart} data-testid="btn-addtocart">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Card