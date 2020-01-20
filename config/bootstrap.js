module.exports = () => {
  global.configs = {
    server: require('./server'),
    db: require('./db'),
  };
};