import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// On a physical device, set EXPO_PUBLIC_API_URL to your machine's LAN address,
// e.g. http://192.168.1.20:4000/graphql
export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

export const SESSION = {
  customerId: 'cus_jordan',
  cartId: 'cart_jordan',
  email: 'jordan@example.com',
};
