'use client'

import { Products } from '@/app/model/products'
import { useEffect, useState } from 'react'
import { getProducts } from '../../../api/products/products'
import s from './style.module.css'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Product = () => {
  const [products, setProducts] = useState<Products[]>([])
  const [basket, setBasket] = useState<Products[]>([])
  const handleAddProductInBasket = (id: string | null | undefined) => {
    const product = products.find((item) => item.id === id)

    if (product) {
      const updatedBasket = [...basket, product]
      setBasket(updatedBasket)
      localStorage.setItem('basket', JSON.stringify(updatedBasket))
    } else {
      console.log("Le produit avec l'ID spécifié n'a pas été trouvé.")
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProducts()
      setProducts(productData)
    }
    fetchProduct()
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: 34, fontWeight: 800 }}>Tous les produits</h1>
      <div className={s.formProduct}>
        {products.length <= 0 ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <Card key={product.id} style={{ width: 300, margin: '0 0 6% 0' }}>
              <CardContent style={{ padding: '0 0 0 0' }}>
                {product.file && product.description ? (
                  <Image
                    style={{
                      margin: '0 0 6% 0',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                      borderRadius: '6px 6px 0 0',
                    }}
                    height={100}
                    width={300}
                    sizes={'100vw'}
                    src={product.file}
                    alt={product.description}
                  />
                ) : (
                  <span>Image non disponible</span>
                )}
              </CardContent>

              <CardContent>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <p>{product.price} €</p>
              </CardContent>
              <CardContent>
                <Button onClick={() => handleAddProductInBasket(product.id)}>
                  <ShoppingBag />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Product
