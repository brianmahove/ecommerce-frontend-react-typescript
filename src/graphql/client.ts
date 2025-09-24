// src/graphql/client.ts
import { ApolloClient, InMemoryCache, ApolloLink, Observable, Operation, FetchResult } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { mockProducts, mockUser } from './mockData';
import { Product, User, CartItem } from '../types';

// Mock GraphQL Server Implementation
class MockGraphQLServer {
  private products: Product[] = mockProducts;
  private user: User | null = null;
  private cart: CartItem[] = [];

  async query(query: string, variables?: any): Promise<FetchResult> {
    await this.delay(200); // Simulate network delay

    if (query.includes('products')) {
      return this.handleProductsQuery(variables);
    } else if (query.includes('categories')) {
      return this.handleCategoriesQuery();
    } else if (query.includes('cart')) {
      return this.handleCartQuery();
    } else if (query.includes('user')) {
      return this.handleUserQuery();
    } else if (query.includes('product(')) {
      return this.handleProductQuery(variables);
    }

    throw new Error(`Unknown query: ${query}`);
  }

  async mutate(mutation: string, variables?: any): Promise<FetchResult> {
    await this.delay(300); // Simulate network delay

    if (mutation.includes('login')) {
      return this.handleLogin(variables);
    } else if (mutation.includes('logout')) {
      return this.handleLogout();
    } else if (mutation.includes('addToCart')) {
      return this.handleAddToCart(variables);
    } else if (mutation.includes('removeFromCart')) {
      return this.handleRemoveFromCart(variables);
    } else if (mutation.includes('updateCartQuantity')) {
      return this.handleUpdateCartQuantity(variables);
    } else if (mutation.includes('checkout')) {
      return this.handleCheckout();
    }

    throw new Error(`Unknown mutation: ${mutation}`);
  }

  private handleProductsQuery(variables: any): FetchResult {
    let filteredProducts = [...this.products];

    // Filter by category
    if (variables?.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === variables.category.toLowerCase()
      );
    }

    // Filter by price range
    if (variables?.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= variables.minPrice);
    }
    if (variables?.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= variables.maxPrice);
    }

    // Filter by rating
    if (variables?.minRating !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.rating >= variables.minRating);
    }

    // Sorting
    if (variables?.sortBy) {
      filteredProducts.sort((a, b) => {
        switch (variables.sortBy) {
          case 'price':
            return variables.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
          case 'rating':
            return variables.sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
          case 'name':
            return variables.sortOrder === 'asc' 
              ? a.name.localeCompare(b.name) 
              : b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return { data: { products: filteredProducts } };
  }

  private handleCategoriesQuery(): FetchResult {
    const categories = [...new Set(this.products.map(p => p.category))];
    return { data: { categories } };
  }

  private handleCartQuery(): FetchResult {
    return { data: { cart: this.cart } };
  }

  private handleUserQuery(): FetchResult {
    return { data: { user: this.user } };
  }

  private handleProductQuery(variables: any): FetchResult {
    const product = this.products.find(p => p.id === variables.id);
    return { data: { product } };
  }

  private handleLogin(variables: any): FetchResult {
    this.user = { ...mockUser, email: variables.email, name: variables.email.split('@')[0] };
    return { data: { login: this.user } };
  }

  private handleLogout(): FetchResult {
    this.user = null;
    this.cart = [];
    return { data: { logout: true } };
  }

  private handleAddToCart(variables: any): FetchResult {
    const product = this.products.find(p => p.id === variables.productId);
    if (!product) throw new Error('Product not found');

    const existingItem = this.cart.find(item => item.product.id === variables.productId);
    if (existingItem) {
      existingItem.quantity += variables.quantity || 1;
    } else {
      this.cart.push({ product, quantity: variables.quantity || 1 });
    }

    return { data: { addToCart: this.cart.find(item => item.product.id === variables.productId) } };
  }

  private handleRemoveFromCart(variables: any): FetchResult {
    this.cart = this.cart.filter(item => item.product.id !== variables.productId);
    return { data: { removeFromCart: true } };
  }

  private handleUpdateCartQuantity(variables: any): FetchResult {
    const item = this.cart.find(item => item.product.id === variables.productId);
    if (item) {
      item.quantity = variables.quantity;
    }
    return { data: { updateCartQuantity: item } };
  }

  private handleCheckout(): FetchResult {
    this.cart = [];
    return { data: { checkout: true } };
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create mock server instance
const mockServer = new MockGraphQLServer();

const mockLink = new ApolloLink((operation: Operation) => {
  return new Observable(observer => {
    const { query, variables, operationName } = operation;

    const operationString = query?.loc?.source.body || '';

    // Ignore introspection queries
    if (operationName === 'IntrospectionQuery') {
      observer.next({ data: {} });
      observer.complete();
      return;
    }

    let serverPromise;
    if (operationString.includes('query')) {
      serverPromise = mockServer.query(operationString, variables);
    } else if (operationString.includes('mutation')) {
      serverPromise = mockServer.mutate(operationString, variables);
    } else {
      observer.error(new Error('Unknown operation type'));
      return;
    }

    serverPromise
      .then(result => {
        observer.next(result);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
  });
});

// Create Apollo Client
export const client = new ApolloClient({
  link: mockLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

// GraphQL Queries and Mutations
export const GET_PRODUCTS = `
  query GetProducts($category: String, $minPrice: Float, $maxPrice: Float, $minRating: Float, $sortBy: String, $sortOrder: String) {
    products(category: $category, minPrice: $minPrice, maxPrice: $maxPrice, minRating: $minRating, sortBy: $sortBy, sortOrder: $sortOrder) {
      id
      name
      description
      price
      originalPrice
      image
      category
      rating
      stock
      tags
      features
    }
  }
`;

export const GET_PRODUCT = `
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      originalPrice
      image
      category
      rating
      stock
      tags
      features
    }
  }
`;

export const GET_CATEGORIES = `
  query GetCategories {
    categories
  }
`;

export const GET_CART = `
  query GetCart {
    cart {
      product {
        id
        name
        description
        price
        originalPrice
        image
        category
        rating
        stock
      }
      quantity
    }
  }
`;

export const GET_USER = `
  query GetUser {
    user {
      id
      email
      name
      avatar
      isAdmin
    }
  }
`;

export const LOGIN = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
      avatar
      isAdmin
    }
  }
`;

export const LOGOUT = `
  mutation Logout {
    logout
  }
`;

export const ADD_TO_CART = `
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      product {
        id
        name
        description
        price
        originalPrice
        image
        category
        rating
        stock
      }
      quantity
    }
  }
`;

export const REMOVE_FROM_CART = `
  mutation RemoveFromCart($productId: ID!) {
    removeFromCart(productId: $productId)
  }
`;

export const UPDATE_CART_QUANTITY = `
  mutation UpdateCartQuantity($productId: ID!, $quantity: Int!) {
    updateCartQuantity(productId: $productId, quantity: $quantity) {
      product {
        id
        name
        description
        price
        originalPrice
        image
        category
        rating
        stock
      }
      quantity
    }
  }
`;

export const CHECKOUT = `
  mutation Checkout {
    checkout
  }
`;