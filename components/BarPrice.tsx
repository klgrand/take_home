import React from 'react'
import { BarPriceProps } from '@/types'
import { formatPrice } from '@/utils'

const BarPrice = ({ title, price }: BarPriceProps ) => {
  return (
    <div className="barprice">
      <div className="barprice__title">
        {title}
      </div>
      <div className="barprice__price">
        {formatPrice(price, 2)}
      </div>
    </div>
  )
}

export default BarPrice