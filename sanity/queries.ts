// queries/products.ts
import { defineQuery } from 'next-sanity'

// Query to fetch all products
export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] {
    _id,
    _createdAt,
    name,
    price,
    gender,
    category,
    "image": image.asset->url
  }
`)

// Query to fetch a single product by ID
export const PRODUCT_BY_ID_QUERY = defineQuery(`
  *[_type == "product" && _id == $id][0] {
    _id,
    _createdAt,
    name,
    price,
    gender,
    category,
    image {
      asset-> {
        _id,
        url
      },
      hotspot
    }
  }
`)

// Query with full image object (for more control)
export const PRODUCTS_WITH_FULL_IMAGE_QUERY = defineQuery(`
  *[_type == "product"] {
    _id,
    _createdAt,
    name,
    price,
    gender,
    category,
    image {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      hotspot,
      crop
    }
  }
`)
