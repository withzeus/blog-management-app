# pandora-code-test

React frontend and express/mysql backend ( includes auth and crud features )

## Tech Stack

### Backend

 **Node.js**  
 **MySQL** 

 ### Frontend

  **React.js** 

 ### Package Manager

  **yarn** 

## Development setup

### **Docker setup (backend)**

Use [docker](https://www.docker.com/products/docker-desktop/) for easy setup.

```bash
docker-compose build
docker-compose up -d
```

### **Local setup (backend)**

```
 copy .env.example and rename to .env
 set values for `MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
 yarn install
 yarn db:seed or manually import mysql.example.sql (start mysql sever first)
 yarn start
```

### **Local setup (frontend)**

`go to client folder ( from root folder cd ./client )`

```bash
 populate BASE_API_URL env with backend sever url
 yarn start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
