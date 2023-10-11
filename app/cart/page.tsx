import React from 'react'
import BarPrice from '@/components/BarPrice'

const Cart = () => {
  return (
    <div className="page__container">
      <div className="breadcrumb__container">
        <h2 className="text-xl font-semibold">Cart page</h2>
      </div>
      <div className="cart_page__container">
        <div className="cart__container">
          <div className="text__title">
            Cart List
          </div>
        </div>
        <div className="summary__container">
          <div className="campaign__container">
            <div className="text__title">
              Campaign
            </div>
          </div>
          <div className="cart_summary__container">
            <div className="text__title">
              Summary
            </div>
            <BarPrice title={"Sub Total"} price={0} />
            <BarPrice title={"Discount"} price={0} />
            <BarPrice title={"Total"} price={0} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart