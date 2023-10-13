import { render, screen, fireEvent } from '@testing-library/react'
import Card from '@/components/Card'
import { ProductProps } from '@/types'

jest.mock('@/recoil/atoms/cart', () => ({
  useSetCartStateState: jest.fn(),
}));

let item: ProductProps = {
  _key: 'item00',
  name: 'T-Shirt',
  img: 'pexels-vie-studio-8148577.jpg',
  price: 350,
  product_category: 'clothing'
}

describe('Card component', () => {

  it('should render product item detail correctly', ()  => {
    render(<Card {...item} />)

    expect(screen.getByAltText(`image ${item._key}`)).toBeInTheDocument()
    expect(screen.getByText(item.name)).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })


  it('should press add to cart correctly', ()  => {

    const mockSetCart = jest.fn();
    require('@/recoil/atoms/cart').useSetCartStateState.mockReturnValue(mockSetCart);


    render(<Card {...item} />)

    const addToCartButton = screen.getByTestId('btn-addtocart')
    fireEvent.click(addToCartButton)
    expect(mockSetCart).toHaveBeenCalledWith(expect.any(Function))
  })
  

})