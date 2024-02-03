# Product Management API

This is a RESTful API for managing products. It allows users to perform CRUD (Create, Read, Update, Delete) operations on products, as well as search for products using keywords.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/product-management-api.git
```

2. Install dependencies:

```bash
cd product-management-api
npm install
```

3. Configure environment variables:

Create a `.env` file in the root directory and define the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/productdb
```

Replace `PORT` with the desired port number and `MONGODB_URI` with the MongoDB connection URI.

4. Start the server:

```bash
npm start
```

The server will start running at `http://localhost:3000`.

## API Endpoints

### Create a Product

- **POST** `/api/products`

Request Body:
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 29.99,
  "variants": [
    {
      "name": "Variant Name",
      "sku": "ABC123",
      "additionalCost": 5.99,
      "stockCount": 100
    }
  ]
}
```

### Get All Products

- **GET** `/api/products`

### Get Product by ID

- **GET** `/api/products/:id`

### Update a Product

- **PUT** `/api/products/:id`

Request Body:
```json
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 39.99
}
```

### Delete a Product

- **DELETE** `/api/products/:id`

### Search Products

- **GET** `/api/products/search?keyword=<keyword>`

Replace `<keyword>` with the search term.

## Validation

The API includes validation middleware to ensure that requests are properly formatted and contain the necessary data.

## Error Handling

Errors are handled gracefully, and appropriate error messages are returned to the client along with the corresponding status codes.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README file according to your project's specific details and requirements.
