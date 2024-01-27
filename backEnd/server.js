import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import cors from 'cors';


const app = express();


app.use(bodyParser.json());
app.use(cors());

const findUserById = (id) => {
  return database.users.filter((dUser) => {
    if(dUser.id === id) {
      return dUser;
    }
  });
}

const findUserByEmail = (email) => {
  return database.users.filter((dUser) => {
    if (dUser.email === email) {
      return dUser;
    }
  });
}

const storeHashInDatabase = (user, hash) => {
  console.log(hash);
  return hash;
}

const storeUserPassword = (user, password, salt) => {
    return new Promise(() => {
      bcrypt.hash(password, salt).then((hash) => storeHashInDatabase(user, hash));
    });
}

async function checkUserPassword(enteredPassword, storedPassword) {
  return bcrypt.compare(enteredPassword, storedPassword);
}

const updateEntryCount = (IdOrEmail) => {
  let user;
  if (IdOrEmail.toString().includes('@')) {
    user = findUserByEmail(IdOrEmail);
  } else {
    user = findUserById(IdOrEmail);
  }
  (user[0].entries)++;
  return user[0].entries;
}

const doesUserEmailNotExist = (email) => {
  const user = findUserByEmail(email);
  return user.length === 0;
}

app.get('/', (req, res) => {
  // console.log(database);
  // res.send(database);
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (doesUserEmailNotExist(email)) {
    res.status(400).json('error: bad password user combo BEFORE');
  } else {
    const user = findUserByEmail(email);
    Promise.resolve(checkUserPassword(password, user[0].password))
      .then((result) => {
        if (result === true) {
          res.status(200).json({auth: true})
          console.log('success: logged in.');
        } else {
          res.status(200).json({auth: false})
          console.log('error: not logged in.');
        }
    });
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  if (doesUserEmailNotExist(email) === true) {
    database.users.push({
      id: '12345',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    });
    res.json('success');
  } else {
    res.status(400).json('error: email already registered.');
  }
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const user = findUserById(id);
  if (user === undefined) {
    res.status(400).json('error: user id does not exist');
  } else {
    res.json(user);
  }
});

app.post('/image', (req, res) => {
  const { id } = req.body;
  console.log(id);
  const count = updateEntryCount(id);
  res.json(count);
});



app.listen(3000, () => {
  console.log('app is running on port 3000');
});

let database = {
  users: [
    {
      id: '123',
      name: 'Sally',
      email: 'Sally@gmail.com',
      password: '$2b$10$X1QvYM080gO98JEadwAKsuxssaphk.T.ERlW5aWawyHd/82zCAvQK',
      entries: 0,
      joined: new Date()
    },
    {
      id: '1234',
      name: 'Frank',
      email: 'Frank@gmail.com',
      password: '$2b$10$X1QvYM080gO98JEadwAKsuxssaphk.T.ERlW5aWawyHd/82zCAvQK',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '123',
      hash: ''
    }
  ]
};