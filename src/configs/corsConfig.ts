interface CorsOptions {
  origin: string[];
  optionsSuccessStatus: number;
  allowedHeaders: string[];
  methods: string;
  credentials: boolean;
}

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5173'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}

export default corsOptions
