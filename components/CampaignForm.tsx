"use client"

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import _ from 'lodash'
import { useCartStateValue, useCartState } from '@/recoil/atoms/cart'
import { addCoupon } from '@/utils'

interface CampaignFormData {
  coupon: string;
}

const CampaignForm = () => {
  const [cart, updateCart] = useCartState()
  const { control, handleSubmit, formState: { errors }, setError } = useForm<CampaignFormData>()

  const _onSubmit = (data: CampaignFormData) => {
    console.log('_onSubmit = ', data)
    if(!data?.coupon) {
      return setError("coupon", {
        type: "manual",
        message: "Coupon is required",
      })
    }
    const result = addCoupon(cart, data.coupon)
    if(typeof result === "string") {
      return setError("coupon", {
        type: "manual",
        message: result,
      })
    }
    updateCart(result)
  }
  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <div className="relative mb-4">
        <Controller
          name="coupon"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" className="input__coupon" placeholder="Coupon" />
          )}
        />
        {errors.coupon && <div id="coupon-error-message" className="input__coupon_error-message">{errors.coupon.message}</div>}
      </div>
      <div className="flex justify-end mt-4">
        <button type="submit" className="btn">
          Submit
        </button>
      </div>
    </form>
  )
}

export default CampaignForm