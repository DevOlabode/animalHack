require('dotenv').config();

const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const cors = require('cors');
const passport = require('../config/passport');
const authRoutes = require('../routes/auth');

const isProduction = process.env.NODE_ENV === 'production';
const frontendOrigin = process.env.FRONTEND_ORIGIN;
const sessionSecret = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 3000;

if (isProduction) {
  if (!sessionSecret || sessionSecret === 'dev-session-secret-change-in-production') {
    console.error('[CONFIG] SESSION_SECRET must be set to a strong value in production');
    process.exit(1);
  }
  if (!frontendOrigin) {
    console.error('[CONFIG] FRONTEND_ORIGIN must be set in production for CORS');
    process.exit(1);
  }
  if (!process.env.DB_URL) {
    console.error('[CONFIG] DB_URL must be set in production');
    process.exit(1);
  }
}

const app = express();

if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(cors({
  origin: frontendOrigin || true,
  credentials: true,
}));

require('../config/db.config')();

app.use(express.json({ limit: '4mb' }));

app.use(session({
  secret: sessionSecret || 'dev-session-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    collectionName: 'sessions',
  }),
  cookie: {
    secure: isProduction,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: isProduction ? 'none' : 'lax',
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

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'success',
    data: { ok: true, env: process.env.NODE_ENV || 'development' },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', require('../routes/profile'));
app.use('/api/pets', require('../routes/pets'));
app.use('/api/clinics', require('../routes/clinics'));
app.use('/api/appointments', require('../routes/appointments'));
app.use('/api/medical', require('../routes/medical'));

app.use((_req, res) => {
  res.status(404).json({ status: 'error', message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  const status = err.status || err.statusCode || 500;
  const payload = {
    status: 'error',
    message: status === 500 && isProduction
      ? 'Internal server error'
      : (err.message || 'Internal server error'),
  };
  if (err.code) payload.code = err.code;
  if (!isProduction && status === 500) {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT} (${process.env.NODE_ENV || 'development'})`);
});
