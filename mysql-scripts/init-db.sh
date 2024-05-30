#!/bin/bash

# Load environment variables from the .env file
set -o allexport
source /docker-entrypoint-initdb.d/.env
set +o allexport

# Replace the placeholder in the SQL template file with the actual database name
envsubst < /docker-entrypoint-initdb.d/example.template.sql > /docker-entrypoint-initdb.d/pandora.example.sql
