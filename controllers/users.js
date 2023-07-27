const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '30d' });
}

function authenticateTokenCheck(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if ( token == null ) return res.sendStatus(401); // если нет токена, отправляем статус 401 (Unauthorized)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if ( err ) return res.sendStatus(403); // если токен неверен, отправляем статус 403 (Forbidden)
    req.user = user;
    next(); // продолжаем обработку запроса
  });
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if ( !email || !password ) {
      return res.status(400).
          json({ message: 'Пж заполните обязательные поля' });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    function hashWithMD5(password) {
      const hash = crypto.createHash('md5');
      hash.update(password);
      return hash.digest('hex');
    }

    let hashedEnteredPassword = hashWithMD5(password);

    // const isPasswordCorrect = user &&
    //     (await brypt.compare(password, user.password));

    if ( user && hashedEnteredPassword === user.password ) {
      res.status(200).json({
        ...user,
        token: generateToken(user),
        message: `Вы зашли под пользователем ${ user.name }`,
      });
    } else {
      return res.status(400).
          json({ message: 'Неверно введена почта или пароль' });
    }
  } catch ( error ) {
    console.error(error);
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

const register = async (req, res) => {
  const { email, password, name } = req.body;

  if ( !email || !password || !name ) {
    return res.send(400).json({ message: 'Пж заполните обязательные поля' });
  }

  const registeredUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if ( registeredUser ) {
    return res.status(400).
        json({ message: 'Пользователь, с таким email уже существует' });
  }

  // const salt = await brypt.genSalt(10);
  // const hashedPassword = await brypt.hash(password, salt);

  function hashWithMD5(password) {
    const hash = crypto.createHash('md5');
    hash.update(password);
    return hash.digest('hex');
  }

  let hashedPassword = hashWithMD5(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  const secret = process.env.JWT_SECRET;

  if ( user && secret ) {
    res.status(201).json({ message: `Пользователь ${ name } успешно создан` });
  } else {
    return res.status(400).
        json({ message: `Не удалось создать пользователя ${ name }` });
  }
};

const reAuth = async (req, res) => {
  const { email } = req.user;

  const reAuthUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  res.status(200).json({
    ...reAuthUser,
    message: `Вы зашли под пользователем ${ reAuthUser.name }`,
  });
};

module.exports = {
  authenticateTokenCheck,
  login,
  register,
  reAuth,
};
