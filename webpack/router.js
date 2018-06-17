const express = require('express');

const {Router} = express;

const MockRouter = new Router();

MockRouter.get('/testapi', (req, res) => {
  res.json({rtn: 0});
})

MockRouter.get('/api/login', (req, res) => {
  res.json({rtn: 0})
})

MockRouter.get('/api/logout', (req, res) => {
  res.json({rtn:0})
})

module.exports = MockRouter;