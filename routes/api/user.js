const express = require('express');
const router = express.Router();
const gravator = require('gravatar');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// @route POST api/User
// @desc Register User
// @access public

router.post(
  '/',
  [
    check('name', 'cow is required').not().isEmpty(),
    check('email', 'please enter bike no').isEmail(),
    check('password', 'enter the door').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        errors.email = 'email already exists';
        return res.status(400).json({ error: { msg: 'email already exists' } });
      }

      const avator = gravator.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avator,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return json webtoken
      //res.send('User ruote -Registerd');
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('server Error, <api/user.js>' + err.message);
    }
  }
);

//just requst
/* router.post('/', (req, res) => {
  console.log(req.body);
  res.send('route its for validation');
}); */

module.exports = router;
