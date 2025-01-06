import allowedOrigins from './allowedOrigins';

const corsOptions = {
  // @ts-ignore - to ignore typescript warnings
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //remove '!origin' after development
      callback(null, true); //send true when origin url in the whitelist
    } else {
      callback(new Error(`Not allowed by CORS\n url: ${origin}`));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
