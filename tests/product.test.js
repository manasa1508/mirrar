const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

describe('Product API Endpoints',() => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        name: 'Sample Product',
        description: 'Sample Description',
        price: 10,
        variants: [{
          name: 'Variant 1',
          sku: '12345',
          additionalCost: 5,
          stockCount: 100,
        }],
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should get all products',async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a product by ID',async () => {
    const newProduct = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 20,
        variants: [{
          name: 'Test Variant',
          sku: '67890',
          additionalCost: 8,
          stockCount: 50,
        }],
      });
    const res =await request(app).get(`/api/products/${newProduct.body._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Test Product');
  });

  it('should update a product', async () => {
    const newProduct = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 20,
        variants: [{
          name: 'Test Variant',
          sku: '67890',
          additionalCost: 8,
          stockCount: 50,
        }],
      });
    const updatedProduct = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 25,
    };
    const res = await request(app)
      .put(`/api/products/${newProduct.body._id}`)
      .send(updatedProduct);
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated Product');
  });

  it('should delete a product', async () => {
    const newProduct = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 20,
        variants: [{
          name: 'Test Variant',
          sku: '67890',
          additionalCost: 8,
          stockCount: 50,
        }],
      });
    const res = await request(app).delete(`/api/products/${newProduct.body._id}`);
    expect(res.statusCode).toEqual(204);
  });

  it('should search products by keyword', async () => {
    //create a test product
    await request(app)
      .post('/api/products')
      .send({
        name: 'Search Test Product',
        description: 'Search Test Description',
        price: 30,
        variants: [{
          name: 'Search Test Variant',
          sku: '13579',
          additionalCost: 10,
          stockCount: 20,
        }],
      });
  
    //search for the test product
    const res = await request(app).get('/api/products/search?keyword=Search');
    
    //check if the response is successful and contains data
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return 404 if product ID is not found', async () => {
    const res = await request(app).get('/api/products/123456789012345678901234');
    expect(res.statusCode).toEqual(404);
  });

  it('should return 422 if request body is invalid during product creation', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        // Missing required fields
      });
    expect(res.statusCode).toEqual(422);
  });

  it('should return 400 if product ID is invalid during product update', async () => {
    const res = await request(app)
      .put('/api/products/invalid_id')
      .send({
        name: 'Invalid Product',
      });
    expect(res.statusCode).toEqual(400);
  });


it('should return 400 if product ID is invalid during product deletion', async () => {
    const res = await request(app).delete('/api/products/invalid_id');
    expect(res.statusCode).toEqual(400);
  });
  
  it('should return 404 if product ID is not found during product deletion', async () => {
    const res = await request(app).delete('/api/products/123456789012345678901234');
    expect(res.statusCode).toEqual(404);
  });
  
  it('should return 422 if request body is invalid during product update', async () => {
    // Create a new product to update
    const newProduct = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'Test Description',
        price: 20,
        variants: [{
          name: 'Test Variant',
          sku: '67890',
          additionalCost: 8,
          stockCount: 50,
        }],
      });
  
    //send an invalid request body for the update
    const res = await request(app)
      .put(`/api/products/${newProduct.body._id}`)
      .send({
        //Missing required fields or invalid data types to trigger validation errors
        //can send an empty object or omit required fields
      });
    //assert that the response status code is 422
    expect(res.statusCode).toEqual(422);
  });
  
  it('should return 404 if product ID is not provided during product update', async () => {
    const res = await request(app).put('/api/products/');
    expect(res.statusCode).toEqual(404);
  });
  
  it('should return 404 if product ID is not found during product update', async () => {
    const res = await request(app)
      .put('/api/products/123456789012345678901234')
      .send({
        name: 'Updated Product',
      });
    expect(res.statusCode).toEqual(404);
  });
  

it('should return 400 if product ID is not provided during product retrieval', async () => {
    const res = await request(app).get('/api/products/');
    expect(res.statusCode).toEqual(400);
});

  it('should return 400 if product ID is invalid during product retrieval', async () => {
    const res = await request(app).get('/api/products/invalid_id');
    expect(res.statusCode).toEqual(400);
  });
  
});
