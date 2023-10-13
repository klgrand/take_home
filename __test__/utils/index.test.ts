import { formatPrice } from '@/utils'

describe('formatPrice function', () => {
  it('should format the price correctly', () => {
    const price = 12345.6789
    const decimal = 2
    expect(formatPrice(price, decimal)).toBe('฿12,345.68')
  })
})