import { gql } from '@apollo/client';

export const QUERY_USER = gql `
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
`