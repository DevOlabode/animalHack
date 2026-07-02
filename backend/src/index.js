require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const cors = require('cors');
const passport = require('../config/passport');
const authRoutes = require('../routes/auth');

const app = express();
const frontendOrigin = process.env.FRONTEND_ORIGIN;

app.use(cors({
  origin: frontendOrigin,
  credentials: true,
}));

require('../config/db.config')();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-session-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'okay',
    message: 'Server is running!',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', require('../routes/profile'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});
