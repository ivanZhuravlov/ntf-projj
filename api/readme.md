# API Documentation

> Rest API with Express JS & PostgreSQL
> Don't forget header : `"content-type: application/json"`

## Public routes

### Register (create user)

`curl localhost:5000/register -X POST --data '{"email": "test@toto.fr", "password": "toto"}' -H "content-type: application/json"`

Return a valid JWT : `{ "token":"eyJh...." }`

### Login (need a valid user)

`curl localhost:5000/login -X POST --data '{"email": "test@toto.fr", "password": "toto"}' -H "content-type: application/json"`

Return a valid JWT : `{ "token":"eyJh...." }`

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

### Profiles

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

WIP

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
curl -X POST localhost:5000/certificate --data '{"artPieceId": "1", "tokenUri": "ipfs...", "title": "title test", "description": "test description", "size": "200x200", "technical": "test", "material": "paint", "tirage": "eza", "movement":"ezae"}'  -H "content-type: application/json" -H "Authorization: Bearer ey"
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
    "movement":"ezae"
}
```

Create a Ethereum transaction to smart contract for create coa
```json
{
  "transaction": "0xc353584de44066af2e68e0486c74a98778e8a83736378656310f3f140fbf3e7f"
}
```