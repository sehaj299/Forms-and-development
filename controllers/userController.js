var User = require("../models/user");
var { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
exports.sign_up_get = (req, res) => {
  console.log("sign");
  res.render("sign_up", { title: "signup",errors:false});
};

exports.sign_up_post = [
  check("first_name").not().isEmpty().trim().escape(),
  check("last_name").not().isEmpty().trim().escape(),
  check("Email").isEmail().withMessage("must be a valid email"),
  check("password").not().isEmpty().trim().escape(),
  check("confirmpassword")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("password donot match"),

  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors)
    var err=JSON.stringify(errors);
    console.log(err)
    var err1=JSON.parse(err)

    console.log(err1)
    if (!errors.isEmpty()) {
      res.render("sign_up", { title: "signup", errors:errors.array() });
      return;
    }
    const hash = bcrypt.hashSync(req.body.password, 10);
                                                                                                                                                                                                                                                              
    console.log("valisuces");
    let member; 0                                                            

    req.body.passcode === "sehaj123" ? (member = "member") : (member = "user");

    if (req.body.admincode === "sehajAdmin") member = "admin";

    const user = new User({
      first_name: req.body.first_name,

      last_name: req.body.last_name,

      Email: req.body.Email,

      password: hash,

      membership: member,
    });                                                                                                
    user.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/catalog");
    });
  },
];
exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      return next(err);
    }

    res.redirect("/catalog"); 
  });
};
                                                              