import crypto from 'crypto';
import Player from '../model/Player';

import CryptoJS from 'crypto-js';
import e, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import AnonymousIdentity from '../model/AnonymousIdentity';

const createdPlayer = async (req: Request, res: Response) => {
    Player.create(req.body, (err: any, player: any) => {
        if (err) {
            res.status(500).json({ message: 'error unknown', err });
        }
        res.status(200).json(player);
    }
    );
};

const getPlayers = async (req: Request, res: Response) => {
    Player.find({}, (err: any, players: any) => {
        if (err) {
            res.status(500).json({ message: 'error unknown', err });
        }
        res.status(200).json(players);
    }
    );
};

export default { 
    createdPlayer, 
    getPlayers 
};
