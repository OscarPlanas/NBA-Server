import { Schema, model, Document } from 'mongoose';

interface IPlayer extends Document {
    name: string;
    id: number;
    votes: string;

}

const PlayerSchema = new Schema<IPlayer>({
    name: { type: String, required: true },
    id: { type: Number, required: true },
    votes: { type: String, required: true },
});

const Player = model<IPlayer>('Player', PlayerSchema);

const playersData = [
    {
        name: 'Lebron James',
        id: 1,
        votes: "0",
    },
    {
        name: 'Luka Doncic',
        id: 2,
        votes: "0",
    },
    {
        name: 'Stephen Curry',
        id: 3,
        votes: "0",

    },
    {
        name: 'Kevin Durant',
        id: 4,
        votes: "0",
    },
    {
        name: 'James Harden',
        id: 5,
        votes: "0",
    },
    {
        name: 'Giannis Antetokounmpo',
        id: 6,
        votes: "0",
    },
    {
        name: 'Kawhi Leonard',
        id: 7,
        votes: "0",
    },
    {
        name: 'Anthony Davis',
        id: 8,
        votes: "0",
    },
    {
        name: 'Nikola Jokic',
        id: 9,
        votes: "0",
    },
    {
        name: 'Damian Lillard',
        id: 10,
        votes: "0",
    },
    {
        name: 'Joel Embiid',
        id: 11,
        votes: "0",
    },
    {
        name: 'Kyrie Irving',
        id: 12,
        votes: "0",
    },
];

// Create and save the players
async function createPlayers() {
    try {
        for (const playerData of playersData) {
            const existingPlayer = await Player.findOne({ name: playerData.name });
            if (!existingPlayer) {
                const createdPlayer = await Player.create(playerData);
                console.log('Player created:', createdPlayer);
            } else {
                console.log('Player already exists:', existingPlayer);
            }
        }
    } catch (error) {
        console.error('Error creating players:', error);
    }
}

createPlayers();

export default Player;