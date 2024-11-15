import React from 'react';

import PageLayout from '@/components/container/PageLayout';
import CreatePurchase from '@/features/stripe/components/CreatePurchase';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductPage(props: PageProps): Promise<React.JSX.Element> {
  const params = await props.params;
  const { id } = params;
  const stripeProductId = id;

  return (
    <PageLayout>
      <CreatePurchase productId={stripeProductId} />
    </PageLayout>
  );
}

export default ProductPage;
