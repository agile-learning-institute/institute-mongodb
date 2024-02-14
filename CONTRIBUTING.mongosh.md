# Contributing to mongosh

## Workflow

> [IMPORTANT!]
Use the standard mentorHub workflow, see [Software Engineer Workflow](https://github.com/agile-learning-institute/mentorHub/tree/main#software-engineer-workflow) for details. You should test both locally and containerized code before submitting a pull request.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Mongosh](https://www.mongodb.com/docs/mongodb-shell/install/)
- [Mongo Compass](https://www.mongodb.com/try/download/compass)

Use the following connection string with Compass:

```bash
mongodb://root:example@localhost:27017/?tls=false&directConnection=true
```

## mongosh execution entry Points

The [mongosh miagrate script](./src/mongosh/migrate.js) Is responsible for configuring a mongo database with the appropriate Collections, Indexes, Schemas, and test Data. The [``test.sh``](./src/mongosh/test.sh) script will setup Environment variables, and run [``entrypoint.sh``](./src/mongosh/entrypoint.sh) locally.

For the Mongosh Container, the environment variables are configured with a docker compose file, and the [``entrypoint.sh``](./src/mongosh/entrypoint.sh) script is run on container startup.

## monghsh file structure

The following directories are in the ``mongosh`` folder

- [**``/config``**](./src/mongosh/config/) contains configuration files, one for each collection. The [entrypoint.sh](./src/mongosh/entrypoint.sh) iterates over the files in this folder, and executes the [migrate.js](./src/mongosh/migrate.js) for each configuration file.
- [**``/data``**](./src/mongosh/data/) contains test data to be loaded, one for each collection.
- [**``/schemas``**](./src/mongosh/schemas/) contains [MongoDB JSON Schema](https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#json-schema) files, one for each version of each collection, named colection-version. (people-2.3.1)
- [**``/modules``**](./src/mongosh/modules/) contains javascript modules and is the location where migration scripts will be kept.

## Configuration File Structure

Each config file is a json data file, that describes a collection to be initilizred.

```json
{
    "name": "documents",        // Collection Name
    "version": "1.0.0",         // Version to Initilize
    "migrations": [             // Migration scripts
        "documents-1.0.0-to-1.0.1.js",
        "documents-1.0.1-to-1.2.0.js",
    ]
}
```

NOTE: Migration script support is not yet implemented.

## Testing changes locally

From the `src` directory, run `test.sh` like so

```bash
./mongosh/test.sh
```

## Building and testing the container

Use the following command from the project root directory to build and run the container locally. See [here](https://github.com/agile-learning-institute/mentorHub/blob/main/docker-configurations/README.md) for details on how to start and stop the database.

```bash
./src/docker/docker-build.sh
```

If the command completes without error, you can verify it worked successfully by:

- Checking the logs from your mentorhub-mongosh container
- Connecting to the database with the Mongo Compass to inspect the collections and data