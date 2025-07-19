'use client'

import ProductDetail from '@/components/ProductDetail';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);

  return <ProductDetail productId={productId} />;
}