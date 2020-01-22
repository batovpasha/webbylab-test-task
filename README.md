# Webbylab-test-task
Test task for the Webbylab(Node.js backend developer position)

## Installation
```bash
git clone https://github.com/batovpasha/webbylab-test-task/
cd webbylab-test-task/
yarn
```

## Usage
Firstly, create a .env file and put MonogDB connection URL there(see .env_example for details)
```bash
yarn start # starts an app server
# then you must open a new terminal window
yarn run client # starts Node.js client for our app
```
Next, follow the instructions in Node.js client

## Testing
```bash
yarn run test
```

## App architecture
- config/ - directory with all of app configs
- controllers/ - app controllers(handlers) which interact with data access layer
- db/ - includes all of data models and shemas
- lib/ - directory with 
- middleware/ - includes some middleware and module for it initialization
- repository/ - includes abstraction for working with data
- routes/ - app routes
- test/ - directory with unit tests
- server.js - application server
- client.js - application client

### Layers: 
- Controller layer - routes/ directory and Express router
- Service layer - controllers/ and lib/ directory
- Data access layer - db/ and repository/, MongoDB, Mongoose ODM


