// src/components/Products/ProductGrid.tsx
import React from 'react';
import styled from 'styled-components';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.textSecondary};
`;

const FilterButton = styled.button`
  display: none;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 99;
  box-shadow: ${props => props.theme.neon};

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface ProductGridProps {
  products: Product[];
  onShowFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onShowFilters }) => {
  if (products.length === 0) {
    return (
      <>
        <Grid>
          <EmptyState>
            <h3>No products found</h3>
            <p>Try adjusting your filters to see more results</p>
          </EmptyState>
        </Grid>
        {onShowFilters && (
          <FilterButton onClick={onShowFilters}>
            <Filter size={24} />
          </FilterButton>
        )}
      </>
    );
  }

  return (
    <>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      {onShowFilters && (
        <FilterButton onClick={onShowFilters}>
          <Filter size={24} />
        </FilterButton>
      )}
    </>
  );
};