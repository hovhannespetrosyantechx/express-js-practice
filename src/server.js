const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();
// Access-Control-Allow-Origin: localhost:3000
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ================================
// GLOBAL MIDDLEWARES
// ================================

// Parses JSON body
app.use(express.json());

// Logs requests
app.use(morgan('dev'));

// Custom middleware
app.use((req, res, next) => {
  console.log('custom middleware executed');
  next();
});

// ================================
// ROUTES
// ================================

app.get('/', (req, res) => {
  res.json({
    message: 'Express Blueprint API Running'
  });
});

app.use('/api/users', userRoutes);

// ================================
// ERROR HANDLING
// ================================

app.use(notFoundMiddleware);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
