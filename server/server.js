const express = require('express');
const cors = require('cors');
const { saveForm, getForms } = require('./db');
const validateForm = require('./validateForm');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const PORT = 5035;

const CLIENT_BUILD_PATH = path.resolve(`${__dirname}/../build`);
app.use(express.static(CLIENT_BUILD_PATH));

app.get('/forms', async (req, res) => {
  try {
    const forms = await getForms();
    res.send({
      status: true,
      forms,
    });
  } catch (err) {
    console.log(err);
    res.send({
      success: false,
    });
  }
});

app.post('/form', async (req, res) => {
  const [errorMessage, validatedForm] = validateForm(req.body);

  if (errorMessage) {
    return res.send({
      success: false,
      errorMessage,
    });
  }

  try {
    await saveForm(validatedForm);
    res.send({
      success: true,
    });
  } catch (err) {
    console.log(err);
    if (err.errno === 19) {
      res.send({
        success: false,
        errorMessage: err.errno === 19 ? "Email exists" : "Internal error",
      });
    }
  }
});

app.listen(PORT, () => console.log(`App listen on port ${PORT}`));
