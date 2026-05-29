import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiLimiter } from './middlewares/rateLimiter';
import { tenantMiddleware } from './middlewares/tenantMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import routes from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(apiLimiter);
app.use(tenantMiddleware);
app.use('/api', routes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

export default app;
