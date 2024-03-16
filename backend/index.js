const express = require('express');
const cors = require('cors');
const VMrouter = require('./routes/VMrouter');
//const taskRouter = require('./routes/taskRouter');
const PORT = process.env.PORT || 5000;
const app = express();
const allowedOrigins = ['http://localhost:5173', 'http://another-domain.com'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Не разрешено CORS'));
      }
    },
  })
);
app.use(express.json());
app.use('/runCode', VMrouter);
//app.use('/task', taskRouter);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
