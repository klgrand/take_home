import Card from '@/components/Card'
import { PRODUCT_LIST } from '@/constants'

export default function Home() {
  return (
    <div className="page__container">
      <div className="breadcrumb__container">
        <h2 className="text-xl font-semibold">Home page</h2>
      </div>
      <div className="cards__container">
        {
          PRODUCT_LIST?.map((product) => (
            <div key={product.key}>
              <Card {...product} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
