import { render, screen, fireEvent } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import CartItem from '@/components/CartItem'
import { CartItemProps } from '@/types'

let item: CartItemProps = {
  _key: 'item00',
  name: 'T-Shirt',
  img: 'pexels-vie-studio-8148577.jpg',
  price: 350,
  product_category: 'clothing',
  qty: 1,
}

describe('CardItem component', () => {
  it('should render product item detail correctly', ()  => {
    render(<CartItem {...item} />)
    expect(screen.getByTestId('product-line-item')).toBeInTheDocument()
    expect(screen.getByTestId('image-cartitem')).toBeInTheDocument()
  })

  it('should remove item in cart item correctly', ()  => {
    render(
      <RecoilRoot>
        <CartItem {...item} />
      </RecoilRoot>
    )

    const removeButton = screen.getByTestId('remove-line-item')
    fireEvent.click(removeButton)
  })
})