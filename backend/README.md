## Endpoints

#### POST /register

request body:
```json
{
  "name": "keki",
  "email": "keki@kek.org",
  "password": "keki"
}
```

success response 
```json
{
  "success": true,
  "data": {
    "name": "keki",
    "email": "keki@kek.org",
    "_id": "653962d80f58d5b2504e19b3",
    "date": "2023-10-25T18:47:52.855Z",
    "__v": 0
  }
}
```

error response
```json
{
  "success": false,
  "errors": {
    "email": "Email already exists"
  }
}
```

#### POST /login

success response
```json
{
  "success": true,
  "data": {
    "_id": "653962d80f58d5b2504e19b3",
    "name": "keki",
    "email": "keki@kek.org",
    "date": "2023-10-25T18:47:52.855Z",
    "__v": 0
  }
}
```