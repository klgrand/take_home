"use client"

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import _ from 'lodash'
import { useCartState } from '@/recoil/atoms/cart'
import { addCoupon } from '@/utils/cartEndpoint'

interface CampaignFormData {
  coupon: string;
}

const CampaignForm = () => {
  const [cart, updateCart] = useCartState()
  const { control, handleSubmit, formState: { errors }, setError } = useForm<CampaignFormData>()

  const _onSubmit = (data: CampaignFormData) => {
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
            <input {...field} type="text" className="input__coupon" placeholder="Coupon" data-testid="campaign-input-coupon" />
          )}
        />
        {errors.coupon && <div className="input__coupon_error-message" data-testid="coupon-error-message">{errors.coupon.message}</div>}
      </div>
      <div className="flex justify-end mt-4">
        <button type="submit" className="btn" data-testid="campaign-btn-submit">
          Submit
        </button>
      </div>
    </form>
  )
}
export default CampaignForm