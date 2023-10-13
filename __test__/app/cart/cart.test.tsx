import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Cart from '@/app/cart/page'
import _ from 'lodash'
import { RecoilRoot } from 'recoil'
import { CartProps } from '@/types'
import { cartState } from '@/recoil/atoms/cart'

let initialCartState: CartProps = {
  items: [],
  total_item: 0,
  cart_subtotal: 0,
  cart_total: 0,
  discount: 0,
  promotion: [],
  user_point: 0,
}

describe('Home Page', () => {
  it('should have Cart page text', ()  => {
    render(
      <RecoilRoot initializeState={({ set }) => set(_.cloneDeep(cartState), initialCartState)}>
        <Cart />
      </RecoilRoot>
    )
    expect(screen.getByText('Cart page')).toBeInTheDocument()
  })

  it('should have render cart item when have some product in cart', ()  => {
    initialCartState = {
      items: [
        {
          _key: 'item00',
          name: 'T-Shirt',
          img: 'pexels-vie-studio-8148577.jpg',
          price: 350,
          product_category: 'clothing',
          qty: 1,
        },
      ],
      total_item: 1,
      cart_subtotal: 350,
      cart_total: 350,
      discount: 0,
      promotion: [],
      user_point: 100,
    }

    render(
      <RecoilRoot initializeState={({ set }) => set(_.cloneDeep(cartState), initialCartState)}>
        <Cart />
      </RecoilRoot>
    )
    expect(screen.getByTestId("product-line-item")).toHaveClass("cart_item")
  })

  it('should have render coupon error message when have some product in cart and add wrong coupon', async ()  => {
    initialCartState = {
      items: [
        {
          _key: 'item00',
          name: 'T-Shirt',
          img: 'pexels-vie-studio-8148577.jpg',
          price: 350,
          product_category: 'clothing',
          qty: 1,
        },
      ],
      total_item: 1,
      cart_subtotal: 350,
      cart_total: 350,
      discount: 0,
      promotion: [],
      user_point: 100,
    }

    render(
      <RecoilRoot initializeState={({ set }) => set(_.cloneDeep(cartState), initialCartState)}>
        <Cart />
      </RecoilRoot>
    )

    const input = screen.getByTestId('campaign-input-coupon')
    const submitButton = screen.getByTestId('campaign-btn-submit')

    fireEvent.click(submitButton)

    await waitFor(async () => {
      const errorMessage = screen.getByTestId('coupon-error-message')
      expect(errorMessage).toHaveTextContent('Coupon is required')
    })

    fireEvent.change(input, { target: { value: 'test_wrong_coupon' } })
    fireEvent.click(submitButton)

    await waitFor(async () => {
      const errorMessage = screen.getByTestId('coupon-error-message')
      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('should have render cart item when have some product in cart and have some campaign promotion', ()  => {
    initialCartState = {
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
      "cart_total": 300,
      "discount": 50,
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

    render(
      <RecoilRoot initializeState={({ set }) => set(_.cloneDeep(cartState), initialCartState)}>
        <Cart />
      </RecoilRoot>
    )

    expect(screen.getByTestId("campaign-line-item")).toBeInTheDocument()
    const removeCouponButton = screen.getByTestId('campaign-cancel-button')
    fireEvent.click(removeCouponButton)
    expect(removeCouponButton).not.toBeInTheDocument()
  })
})