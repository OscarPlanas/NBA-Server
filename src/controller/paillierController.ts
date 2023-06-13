
import { Request, Response } from 'express';
import { PaillierKeyPair, generatePaillierKeys } from '../index';

const bitLength = 2048;
const paillierKeysPromise: Promise<PaillierKeyPair> = generatePaillierKeys(bitLength)

const getPailierPublicKey = async (req: Request, res: Response) => {
    const pubKey = await paillierKeysPromise;
    res.json(pubKey.publicKey.toJSON());
    console.log('Public key:', pubKey.publicKey);
};

export default { 
    getPailierPublicKey 
};