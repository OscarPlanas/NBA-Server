import { Schema, model, Document } from 'mongoose';

interface IPlayer extends Document {
    name: string;

}

const PlayerSchema = new Schema<IPlayer>({
    name: { type: String, required: true },
});

const Player = model<IPlayer>('Player', PlayerSchema);

const playersData = [
    {
        name: 'Lebron James',
    },
    {
        name: 'Luka Doncic',
    },
    {
        name: 'Stephen Curry',
    },
    {
        name: 'Kevin Durant',
    },
    {
        name: 'James Harden',
    },
    {
        name: 'Giannis Antetokounmpo',
    },
    {
        name: 'Kawhi Leonard',
    },
    {
        name: 'Anthony Davis',
    },
    {
        name: 'Nikola Jokic',
    },
    {
        name: 'Damian Lillard',
    },
    {
        name: 'Joel Embiid',
    },
    {
        name: 'Kyrie Irving',
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