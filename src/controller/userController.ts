import crypto from 'crypto';
import User from '../model/User';

import { Request, Response } from 'express';
import { KeyPair, PaillierKeyPair, generateMyRsaKeys, generatePaillierKeys } from '../index';
import AnonymousIdentity from '../model/AnonymousIdentity';
import Player from '../model/Player';

const bitLength = 2048;
const keysPromise: Promise<KeyPair> = generateMyRsaKeys(bitLength)
const paillierKeysPromise: Promise<PaillierKeyPair> = generatePaillierKeys(bitLength)


const getall = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	}
};

const createAnonymousIdentity = async (req: Request, res: Response) => {
	const username = req.params.username;
	const existingUser = await User.findOne({ username: username });
	if (!existingUser) {
		return res.status(202).send('User does not exist');
	}
	const hash = crypto.createHash('sha256');
	hash.update(username);
	const hashValue = hash.digest('hex');

	const existingHash = await AnonymousIdentity.findOne({ anonymousid: hashValue });
	if (existingHash) {
		return res.status(201).send('User has already voted');
	}
	const useranonymousid = new AnonymousIdentity({ anonymousid: hashValue });

	await useranonymousid.save((err: any) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.status(200).json({ status: 'AnonymousIdentity saved', useranonymousid });
	});
};

const getAllAnonymousIdentity = async (req: Request, res: Response) => {
	const anonymousidentities = await AnonymousIdentity.find();
	res.json(anonymousidentities);
};

const sendVote = async (req: Request, res: Response) => {

	const paillierVote = req.params.paillierVote;

	const keysPaillier = await paillierKeysPromise;

	//Desencriptamos la ID del jugador y vemos si existe
	const MessageEncrypted = req.params.encrypted;
	const keyPair = await keysPromise;
	const decrypted = keyPair.privateKey.decrypt(BigInt(MessageEncrypted));
	const existingPlayer = await Player.findOne({ id: decrypted.toString() });
	if (!existingPlayer) {
		return res.status(202).send('Player does not exist');
	}

	//Si existe, vemos a que jugador hay que añadirle el voto	
	if (existingPlayer.id == 1) {
		const existingVotes = existingPlayer.votes;

		//En caso de que no tenga ningún voto
		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);
			//Tan solo para visualizarlo por consola
			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);
			//Actualizamos el jugador
			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}

		//Hacemos lo mismo con el resto de jugadores
	} else if (existingPlayer?.id == 2) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}


	}
	else if (existingPlayer?.id == 3) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {

			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 4) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 5) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 6) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 7) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 8) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 9) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 10) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 11) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}
	}
	else if (existingPlayer?.id == 12) {
		const existingVotes = existingPlayer.votes;

		if (existingVotes == "0") {
			const c1 = BigInt(existingVotes);
			const c1encrypted = keysPaillier.publicKey.encrypt(c1);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1encrypted, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});

		} else {
			const c1 = BigInt(existingVotes);

			const c2 = BigInt(paillierVote);

			const encryptedSum = keysPaillier.publicKey.addition(c1, c2);

			const decryptedSum = keysPaillier.privateKey.decrypt(encryptedSum);
			console.log("decryptedSum", decryptedSum);

			existingPlayer.updateOne({ $set: { votes: encryptedSum.toString() } }, (err: any) => {
				if (err) {
					console.log("Error");
					return res.status(501).json({ message: 'Error updating the votes', error: err });
				}
				res.status(200).json({ status: 'Vote added' });
			});
		}

	}



};


const getRsaPublicKey = async (req: Request, res: Response) => {
	const keyPair = await keysPromise
	res.json(keyPair.publicKey.toJSON())
}
const getPailierPublicKey = async (req: Request, res: Response) => {
	const pubKey = await paillierKeysPromise;
	res.json(pubKey.publicKey.toJSON());
};

const getAllPlayers = async (req: Request, res: Response) => {
	const keysPaillier = await paillierKeysPromise;

	Player.find({}, (err: any, players: any) => {
		if (err) {
			return res.status(500).json({ message: 'Unknown error', error: err });
		}

		// Extraemos nombres y votos de los jugadores
		console.log("players", players);
		const playerData = players.map((player: any) => {
			return {
				name: player.name,
				votes: keysPaillier.privateKey.decrypt(BigInt(player.votes)).toString(),
			};
		});

		res.status(200).json(playerData);
	});
};

export default {
	getall,
	createAnonymousIdentity,
	getAllAnonymousIdentity,
	sendVote,
	getRsaPublicKey,
	getPailierPublicKey,
	getAllPlayers
};