const { PrismaClient } = require('@prisma/client');
const faker = require('@faker-js/faker').fakerRU;

const prisma = new PrismaClient();

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blackbox',
  password: 'xxXX.1234',
  port: 5432,
});

const createRandom = async (n) => {
  for ( let i = 0; i < n; i++ ) {
    await prisma.email.create({
      data: {
        address: faker.internet.email(),
        subject: faker.lorem.sentence(),
        body: faker.lorem.paragraph(), // sentAt: faker.date.past() // Uncomment this if you want random past dates
      },
    });
  }
};

const createRandomEmails = async (req, res) => {
  const { number } = req.params;
  console.log(number)
  createRandom(number)  // Creates 100 random emails
      .then(() => {
        return res.status(200).json({ message: 'Все ок' });
      }).catch((error) => {
        res.status(400).json({ message: 'Ошибка', err: error });
      },
  ).
      finally(() => prisma.$disconnect());
};

const getEmails = async (req, res) => {
  try {
    const { address } = req.query;
    if ( address ) {
      const emails = await prisma.email.findMany({
        where: {
          address: {
            contains: address,
          },
        },
      });
      res.status(200).json(emails);
    } else {
      const emails = await prisma.email.findMany({
        select: {
          id: true,
          address: true,
          subject: true,
          sentAt: true,
        },
        take: 1000,
      });
      res.status(200).json(emails);
    }
  } catch ( error ) {
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};

const getEmail = (req, response) => {
  try {
    const { emailId } = req.params;
    const text = 'SELECT * FROM public."Email" WHERE id = $1';

    pool.query(text, [emailId], (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res);
        if ( res.rows.length ) {
          response.status(200).json(res.rows[0]?.body);
        } else {
          response.status(200).json("Не удалось найти");
        }
      }
    });
  } catch ( error ) {
    console.log(error)
    response.status(500).json({ message: 'Внутренняя ошибка сервера', error });
  }
};

module.exports = {
  createRandomEmails,
  getEmails,
  getEmail,
};