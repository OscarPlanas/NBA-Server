import express from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import User from "./api/User";
import { MyRsaPublicKey, KeyPair, generateMyRsaKeys, generatePaillierKeys } from '../index';
import { MyRsaPrivateKey } from '../index';
import { PrivateKey } from 'paillier-bigint';
import * as bc from 'bigint-conversion';
import * as bcu from 'bigint-crypto-utils';
import * as paillierBigint from 'paillier-bigint'
import { PaillierKeyPair } from '../index';

const app = express();
const bitLength = 2048;
const keysPromise: Promise<KeyPair> = generateMyRsaKeys(bitLength);
const paillierKeysPromise: Promise<PaillierKeyPair> = generatePaillierKeys(bitLength);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

const port = process.env.PORT || 5432;

app.use(express.static('src/upload/'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', User);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/nbamvp', { useNewUrlParser: true } as ConnectOptions)
  .then(() => {
    app.listen(port, () => console.log('Server running on port ' + port));
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/publicKey', async (req, res) => {
  const keyPair = await keysPromise;
  res.json(keyPair.publicKey.toJSON());
});

app.post('/sign/:message', async (req, res) => {
  const { message } = req.params;

  if (!message) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const keyPair = await keysPromise;
  const privateKey = keyPair.privateKey;

  const signature = privateKey.sign(BigInt(message));
  const signature2 = bc.bigintToBase64(signature);

  res.json({ signature: signature2.toString() });
});

export default app;
