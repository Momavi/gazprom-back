const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.post('/findUsers', async (req, res) => {
  const users = req.body.users;
  if(!Array.isArray(users)) {
    res.status(400).send({message: "Bad request, 'users' should be an array"});
    return;
  }

  let passwd;
  try {

    // TODO: Временный костыль потом переделаем на безопасное копирование пользователей
    passwd = await fs.promises.readFile('/etc/passwd', 'utf-8');

  } catch(err) {
    res.status(500).send({message: "Error reading /etc/passwd"});
    return;
  }

  const lines = passwd.split("\n");
  const foundUsers = [];
  for (const user of users) {
    for (const line of lines) {
      const parts = line.split(":");
      if (parts[0] === user) {
        foundUsers.push(user);
      }
    }
  }

  res.send({foundUsers});
});

app.listen(3000, () => console.log('Listening on port 3000'));
