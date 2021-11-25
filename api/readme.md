# API Documentation

> Rest API with Express JS & PostgreSQL
> Don't forget header : `"content-type: application/json"`

## Public routes

### Register (create user)

User type : `artist, gallery, collector`

`curl localhost:5000/register -X POST --data '{"email": "test@toto.fr", "password": "toto", "type": "artist"}' -H "content-type: application/json"`

Return a valid JWT : `{ "token":"eyJh...." }`

### Login (need a valid user)

`curl localhost:5000/login -X POST --data '{"email": "test@toto.fr", "password": "toto"}' -H "content-type: application/json"`

Return a valid JWT : `{ "token":"eyJh...." }`

### Art (`/art`) 5 validated COA
`curl localhost:5000/art/  -H "content-type: application/json" | jq`

```json
[
  {
    "id": "9ca83aa2-898b-447e-b9ed-b216c54638a3",
    "data": {
      "artistAddress": "0x7731A83d3F79AD358A63150fa314Dc4aEED514C0",
      "artPieceId": "1",
      "tokenUri": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/260px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
      "title": "title test",
      "description": "test description",
      "size": "200x200",
      "technical": "test",
      "material": "paint",
      "tirage": "eza",
      "movement": "ezae",
      "createdAt": 1636943010,
      "transaction": "0x412c499ae24fc1f7af47674556af97bee99a4d1d76fa8f56a869f9ae48110956"
    },
    "is_validate": true,
    "created_at": "2021-11-12T17:44:17.449Z",
    "token_id": "11",
    "token_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/260px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
    "artist": {
      "address": "0x7731A83d3F79AD358A63150fa314Dc4aEED514C0",
      "firstName": "Camille",
      "lastName": "Toche",
      "verificationId": "42"
    }
  }
]
```

### Art (`/art/:id`)
`curl localhost:5000/art/b9ad9447-84dc-4bed-be48-c5ac3ded0fc3  -H "content-type: application/json" | jq`

```json
{
  "id": "b9ad9447-84dc-4bed-be48-c5ac3ded0fc3",
  "data": {
    "artistAddress": "0x923d5A0Ba4bBD49b9B93C752D131c253f27D6f78",
    "artPieceId": "1",
    "tokenUri": "ipfs...",
    "title": "title test",
    "description": "test description",
    "size": "200x200",
    "technical": "test",
    "material": "paint",
    "tirage": "eza",
    "movement": "ezae",
    "createdAt": 1636943010,
    "transaction": "0x016aaca7033efeb6923923c1965367501060b051fcc6788296f663bc7510412e"
  },
  "is_validate": true,
  "created_at": "2021-11-14T11:17:25.925Z",
  "token_id": 42,
  "token_uri": "ipfs://",
  "artist": {
    "address": "0x923d5A0Ba4bBD49b9B93C752D131c253f27D6f78",
    "firstName": "Camille",
    "lastName": "Toche",
    "verificationId": 42
  }
}
```

### Products

`curl localhost:5000/products -H "content-type: application/json"`

```json
[
    {
        "id": "prod_KaWJiBPVWynkKS",
        "priceId": "price_1JvLcwHxzpQyW0ctBd9V1AFC",
        "link": "https://buy.stripe.com/test_eVa6sc5zReZcdTa146",
        "price": 15,
        "name": "15 NFT",
        "coaCount": 15
    },
    {
        "id": "prod_KaWJiBPVWynkKS",
        "priceId": "price_1JvLcwHxzpQyW0ctwwR6jKyI",
        "link": "https://buy.stripe.com/test_aEUdUE4vN5oC3ew3cd",
        "price": 25,
        "name": "25 NFT",
        "coaCount": 25
    },
    {
        "id": "prod_KaWJiBPVWynkKS",
        "priceId": "price_1JvLcwHxzpQyW0ctNMcjNEJ6",
        "link": "https://buy.stripe.com/test_28og2Mgev3guaGYaEE",
        "price": 50,
        "name": "50 NFT",
        "coaCount": 50
    }
]
```

## Authenticated routes

> Don't forget header : `"authorization: Bearer eyJh..."`

### Profile (`/profile`)

#### POST (update profile)

Body 
```json
{
    "firstName": "Camille", 
    "lastName": "Toche",
    "country": "France",
    "street": "Jaude",
    "city": "Clermont Ferrand",
    "state": "Puy de dome",
    "zip": 6300
}
```

#### GET (retrieve profile)

Response : `curl localhost:5000/profile  -H "content-type: application/json" -H "Authorization: Bearer eyJhbGc`

```json
{
    "user": {
      "id": "0ede6580-03ba-4be2-9c1e-393a757541b9",
      "email": "toteoeza@asticot.fr",
      "type": "artist",
      "data": {
        "firstName": "Camille",
        "lastName": "Toche",
        "country": "France",
        "street": "Jaude",
        "city": "Clermont Ferrand",
        "state": "Puy de dome",
        "zip": 6300
      }
    },
    "artist": {
      "address": "0x7731A83d3F79AD358A63150fa314Dc4aEED514C0",
      "user_id": "0ede6580-03ba-4be2-9c1e-393a757541b9",
      "transaction": "0x38bd1e8f885bcf0d8e1f6223f59c8b1cc6531fcb3db63d54e7c7b833b5cdbd7c",
      "data": {
        "address": "0x7731A83d3F79AD358A63150fa314Dc4aEED514C0",
        "firstName": "Camille",
        "lastName": "Toche",
        "verificationId": "42"
      },
      "is_validate": true,
      "created_at": "2021-11-12T16:34:34.083Z"
    },
    "subscriptions": [
      {
        "id": "040b5e19-f92d-4871-8b16-d2fa83f57931",
        "is_active": false,
        "created_at": "2021-11-13T17:12:18.033Z",
        "terminated_at": "2021-11-14T11:17:41.715Z",
        "product": {
          "id": "prod_KaWJiBPVWynkKS",
          "priceId": "price_1JvLcwHxzpQyW0ctBd9V1AFC",
          "link": "https://buy.stripe.com/test_eVa6sc5zReZcdTa146",
          "price": 15,
          "name": "15 NFT",
          "coaCount": 2
        }
      }
    ],
    "certificates": [
      {
        "id": "9ca83aa2-898b-447e-b9ed-b216c54638a3",
        "subscription_id": "040b5e19-f92d-4871-8b16-d2fa83f57931",
        "data": {
          "artistAddress": "0x7731A83d3F79AD358A63150fa314Dc4aEED514C0",
          "artPieceId": "1",
          "tokenUri": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/260px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg",
          "title": "title test",
          "description": "test description",
          "size": "200x200",
          "technical": "test",
          "material": "paint",
          "tirage": "eza",
          "movement": "ezae",
          "createdAt": 1636943010,
          "transaction": "0x412c499ae24fc1f7af47674556af97bee99a4d1d76fa8f56a869f9ae48110956"
        },
        "is_validate": true,
        "created_at": "2021-11-12T17:44:17.449Z",
        "token_id": "11",
        "token_uri": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/260px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg"
      }
    ]
  }
```

### Wallet (Generate a wallet for customer)

**Save this 12 words! This is the only time they will be transmitted to the user**

`curl localhost:5000/wallet -H "content-type: application/json" -H "Authorization: Bearer eyJh...`

The first time the body will look like this, the other words will be null:

```json
{
  "words": "laugh walnut cook park elevator aisle this tilt crunch leave olympic gym",
  "address": "0x923d5A0Ba4bBD49b9B93C752D131c253f27D6f78"
}
```

### Create Artist (customer need a wallet)

```
curl -X POST localhost:5000/artist --data '{"firstName": "Camille", "lastName": "Toche", "verificationId": "42"}'  -H "content-type: application/json" -H "Authorization: Bearer ey..."
```

Create a Ethereum transaction to smart contract for create artist
```json
{
  "transaction": "0xef63a12bf7c8857c38f733f8c1a327aa7d497e6febc5502e1836cd7d5de543a1"
}
```

### Create COA (customer need an artist profile)

> Requet timeout > 60sec

```
curl -X POST localhost:5000/certificate --data '{"artPieceId": "1", "tokenUri": "ipfs...", "title": "title test", "description": "test description", "size": "200x200", "technical": "test", "material": "paint", "tirage": "eza", "movement":"ezae", "createdAt": "2021-11-15 03:23:30"}'  -H "content-type: application/json" -H "Authorization: Bearer ey"
```

body : 
```json
{
    "artPieceId": "1",
    "tokenUri": "ipfs...",
    "title": "title test",
    "description": "test description",
    "size": "200x200",
    "technical": "test",
    "material": "paint",
    "tirage": "eza",
    "movement":"ezae",
    "createdAt": "2021-01-01 12:00:00"
}
```

Create a Ethereum transaction to smart contract for create coa
```json
{
  "transaction": "0xc353584de44066af2e68e0486c74a98778e8a83736378656310f3f140fbf3e7f"
}
```