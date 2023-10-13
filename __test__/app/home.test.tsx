import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home Page', () => {
  it('should have Home page text', ()  => {
    render(<Home />)
    screen.getByText('Home page')
    expect(screen.getByText('Home page')).toBeInTheDocument()
  })
})