# Backend

backend api for pandora code test posts

## Installation

## Docker setup

Use [docker](https://www.docker.com/products/docker-desktop/) for easy setup.

```bash
docker-compose build
docker-compose up -d
```

## Local setup

### `*Prerequisites`

`nodejs mysql and yarn must be installed`

```
 copy .env.example and rename to .env
 set values for `MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE
 yarn install
 yarn db:seed or manually import mysql.example.sql
 yarn start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
