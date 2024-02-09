# Code-Samurai-2024-Preliminary-mock

## API Endpoint Summary

1. **Add Books**:
   - **Endpoint**: `POST /api/books`
   - **Request model**:
     ```json
     {
       "id": integer,
       "title": "string",
       "author": "string",
       "genre": "string",
       "price": float
     }
     ```
   - **Success Response**: `201 - Created`
     ```json
     {
       "id": integer,
       "title": "string",
       "author": "string",
       "genre": "string",
       "price": float
     }
     ```

2. **Update Books**:
   - **Endpoint**: `PUT /api/books/{id}`
   - **Request model**:
     ```json
     {
       "title": "string",
       "author": "string",
       "genre": "string",
       "price": float
     }
     ```
   - **Success Response**: `200 - Ok`
     ```json
     {
       "id": integer,
       "title": "string",
       "author": "string",
       "genre": "string",
       "price": float
     }
     ```
   - **Failure Response**: `404 - Not found`
     ```json
     {
       "message": "book with id: {id} was not found"
     }
     ```

3. **Fetch Book by ID**:
   - **Endpoint**: `GET /api/books/{id}`
   - **Success Response**: `200 - Ok`
     ```json
     {
       "id": integer,
       "title": "string",
       "author": "string",
       "genre": "string",
       "price": float
     }
     ```
   - **Failure Response**: `404 - Not found`
     ```json
     {
       "message": "book with id: {id} was not found"
     }
     ```

4. **Fetch all books**:
   - **Endpoint**: `GET /api/books`
   - **Success Response**: `200 - Ok`
     ```json
     {
       "books": [
         {
           "id": integer,
           "title": "string",
           "author": "string",
           "genre": "string",
           "price": float
         },
         ...
       ]
     }
     ```

5. **Search books**:
   - **Endpoint**: `GET /api/books?{search_field}={value}&sort={sorting_field}&order={sorting_order}`
   - **Success Response**: `200 - Ok`
     ```json
     {
       "books": [
         {
           "id": integer,
           "title": "string",
           "author": "string",
           "genre": "string",
           "price": float
         },
         ...
       ]
     }
     ```
