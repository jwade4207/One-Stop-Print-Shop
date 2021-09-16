import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    {
        user {
            firstName
            lastName
            orders {
                _id
                purchaseDate
                banners {
                    _id
                    name
                    price
                    quantity
                    image
                }
            }
        }
    }
`;

export const QUERY_BANNERS = gql`
  query QueryBanners {
    banners {
      name _id
    }
  }
`;

export const QUERY_CHECKOUT = gql`
    query getCheckout($products: [ID]!) {
        checkout(products: $products) {
            session
        }
    }
`;