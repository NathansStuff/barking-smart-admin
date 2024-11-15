'use client';

import React from 'react';
import { useSelector } from 'react-redux';

import { ExternalLink } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

import { hasUserPurchasedProduct } from '../utils/hasUserPurchasedProduct';
import { selectReceiptUrlForProduct } from '../utils/selectReceiptUrlForProduct';

const ProductCard: React.FC = () => {
  const product = products[0];
  const hasPurchased = hasUserPurchasedProduct(product.productId);
  const receiptUrl = useSelector(() => selectReceiptUrlForProduct(product.productId));

  return (
    <div className='mx-auto w-full max-w-sm space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-bold'>{product.name}</h3>
        {hasPurchased && <Badge variant='secondary'>Purchased</Badge>}
      </div>
      <p className='text-muted-foreground'>{product.description}</p>
      <p className='text-lg font-semibold'>Price: ${(parseInt(product.amount) / 100).toFixed(2)}</p>
      <div className='pt-4'>
        {!hasPurchased && <Button className='w-full'>Buy Now</Button>}
        {hasPurchased && receiptUrl && (
          <Link
            href={receiptUrl as Route}
            passHref
            target='_blank'
            className='w-full'
          >
            <Button
              variant='outline'
              className='flex w-full items-center justify-center gap-2'
            >
              View Receipt
              <ExternalLink size={16} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
