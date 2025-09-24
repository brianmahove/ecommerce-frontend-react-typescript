// src/components/Filters/FilterSidebar.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { setCategory, setPriceRange, setMinRating, setSortBy, setSortOrder } from '../../store/slices/filterSlice';
import { Filter, X, Star } from 'lucide-react';

const Sidebar = styled(motion.div)`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
    overflow-y: auto;
    transform: translateX(-100%);
    
    &.mobile-open {
      transform: translateX(0);
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.text};
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
    margin-left: auto;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
`;

const GroupTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  padding: 0.75rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    transform: translateX(5px);
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PriceInputs = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PriceInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const RangeSlider = styled.input`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${props => props.theme.border};
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${props => props.theme.primary};
    cursor: pointer;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RatingOption = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.active ? props.theme.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.text};
  border: 1px solid ${props => props.active ? props.theme.primary : props.theme.border};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
  }
`;

const SortSelectContainer = styled.div`
  margin-bottom: 1rem;
`;

const SortLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.text};
  font-size: 0.9rem;
`;

const SortSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  cursor: pointer;
  font-size: 0.9rem;
`;

const ClearFilters = styled.button`
  width: 100%;
  background: transparent;
  color: ${props => props.theme.textSecondary};
  border: 1px solid ${props => props.theme.border};
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }
`;

const MobileOverlay = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

interface FilterSidebarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isMobileOpen = false, onClose }) => {
  const dispatch = useDispatch();
//   const filters = useSelector((state: RootState) => state.filters);
//   const products = useSelector((state: RootState) => state.products.items);
const filters = useSelector((state: RootState) => state.filters ?? {
  category: '',
  priceRange: [0, 1000],
  minRating: 0,
  sortBy: 'name',
  sortOrder: 'asc'
});

const products = useSelector((state: RootState) => state.products?.items ?? []);

  const categories = [...new Set(products.map(p => p.category))];
  const maxPrice = Math.max(...products.map(p => p.price));

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category === filters.category ? '' : category));
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    dispatch(setPriceRange([min, max]));
  };

  const handleMinRatingChange = (rating: number) => {
    dispatch(setMinRating(rating === filters.minRating ? 0 : rating));
  };

  const handleSortChange = (sortBy: 'name' | 'price' | 'rating') => {
    dispatch(setSortBy(sortBy));
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    dispatch(setSortOrder(order));
  };

  const clearAllFilters = () => {
    dispatch(setCategory(''));
    dispatch(setPriceRange([0, maxPrice]));
    dispatch(setMinRating(0));
    dispatch(setSortBy('name'));
    dispatch(setSortOrder('asc'));
  };

  return (
    <>
      {isMobileOpen && (
        <MobileOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}
      
      <Sidebar
        className={isMobileOpen ? 'mobile-open' : ''}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        role="complementary"
        aria-label="Product filters"
      >
        <Header>
          <Title>
            <Filter size={20} />
            Filters
          </Title>
          <CloseButton onClick={onClose} aria-label="Close filters">
            <X size={20} />
          </CloseButton>
        </Header>

        <FilterGroup>
          <GroupTitle id="categories-label">Categories</GroupTitle>
          <CategoryList aria-labelledby="categories-label" role="group">
            <CategoryButton
              active={filters.category === ''}
              onClick={() => handleCategoryChange('')}
              aria-pressed={filters.category === ''}
              role="radio"
              aria-checked={filters.category === ''}
            >
              All Categories
            </CategoryButton>
            {categories.map(category => (
              <CategoryButton
                key={category}
                active={filters.category === category}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={filters.category === category}
                role="radio"
                aria-checked={filters.category === category}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryList>
        </FilterGroup>

        <FilterGroup>
          <GroupTitle id="price-range-label">Price Range</GroupTitle>
          <PriceRangeContainer aria-labelledby="price-range-label" role="group">
            <RangeSlider
              type="range"
              min="0"
              max={maxPrice}
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value))}
              aria-label="Maximum price range"
              aria-valuemin={0}
              aria-valuemax={maxPrice}
              aria-valuenow={filters.priceRange[1]}
              aria-valuetext={`$${filters.priceRange[1]}`}
            />
            <PriceInputs>
              <PriceInput
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange[1])}
                aria-label="Minimum price"
              />
              <span aria-hidden="true">-</span>
              <PriceInput
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value) || maxPrice)}
                aria-label="Maximum price"
              />
            </PriceInputs>
          </PriceRangeContainer>
        </FilterGroup>

        <FilterGroup>
          <GroupTitle id="rating-label">Minimum Rating</GroupTitle>
          <RatingContainer aria-labelledby="rating-label" role="group">
            {[4, 3, 2, 1].map(rating => (
              <RatingOption
                key={rating}
                active={filters.minRating === rating}
                onClick={() => handleMinRatingChange(rating)}
                aria-pressed={filters.minRating === rating}
                role="radio"
                aria-checked={filters.minRating === rating}
              >
                <Star size={16} fill="#fbbf24" color="#fbbf24" />
                <span>{rating}+ Stars</span>
              </RatingOption>
            ))}
          </RatingContainer>
        </FilterGroup>


            {/* Sort Options - Removed to fix accessibility error */}



        <ClearFilters 
          onClick={clearAllFilters}
          aria-label="Clear all filters and reset to defaults"
        >
          Clear All Filters
        </ClearFilters>
      </Sidebar>
    </>
  );
};