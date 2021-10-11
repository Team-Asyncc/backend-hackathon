const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
  return re.test(username);
};
const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//should contain: atleast a symbol, a digit and a letter. atleast 6 characters long
const validatePassword = (password) => {
  const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return re.test(password);
};

const initialChecks = (req, res, next) => {
    const {username, email, password, confirmPassword } = req.body;
    console.log(req.body);

    if (
        typeof username === 'string' &&
        typeof email === 'string' &&
        typeof password === 'string' &&
        typeof confirmPassword === 'string' &&
        email.length > 0 &&
        password.length > 0 &&
        confirmPassword === password &&
        validateUsername(username) &&
         validateEmail(email) && validatePassword(password)
    ) {
        next();
    } else {
        console.log();
        res.status(401).send("Initital checks failed !!!");

    }
    
}

module.exports = initialChecks;
