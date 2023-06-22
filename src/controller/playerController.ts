import Player from '../model/Player';

import { Request, Response } from 'express';

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
