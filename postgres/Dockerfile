# Base image
FROM postgres:13.4

# Environment variables
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=shop

# Copy initialization scripts to the container

USER postgres

# Expose PostgreSQL port
EXPOSE 5432

COPY shop_db.sql /.
COPY setup.sh /docker-entrypoint-initdb.d/
