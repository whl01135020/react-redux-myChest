const express = require('express');
const login = require('../dbs/login-db');
const session = require('express-session');
const router = express.Router();

router.use(session({secret: 'ssshhhhh'}));

  let sess;
router.post('/sessions', (req, res)=> {

   const data = {userName: req.body.userName, password: req.body.password};
  login.toLogin(data, function (result) {
    if (result) {
      sess=req.session;
      sess.userName = result.userName;
      res.json({value: 'success'});
    }
    else {
      res.json({value: 'fail'});
    }
  });

});
module.exports = router;
