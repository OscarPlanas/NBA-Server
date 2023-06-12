import User from '../model/User';
import crypto from 'crypto';
import Player from '../model/Player';

import CryptoJS from 'crypto-js';
import e, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import AnonymousIdentity from '../model/AnonymousIdentity';


const getall = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.json(users);
	  } catch (error) {
		res.status(500).json({ error: 'An error occurred' });
	  }
};

const getone = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).send('No user found.');
	}
	res.status(200).json(user);
};


const deleteUser = async (req: Request, res: Response) => {
	try {
		await User.findByIdAndRemove(req.params.id);
		res.status(200).json({ status: 'User deleted' });
	}
	catch (error) {
		res.status(500).json({message: 'error unknown', error });
	}
};


const createAnonymousIdentity = async (req: Request, res: Response) => {
	const username = req.params.username;
	const existingUser = await User.findOne({ username: username });
	if (!existingUser) {
		return res.status(202).send('User does not exist');
	}
	console.log(username);
	const hash = crypto.createHash('sha256');
	console.log(hash);
  	hash.update(username);
  	const hashValue = hash.digest('hex');
	console.log(hashValue);

	const existingHash = await AnonymousIdentity.findOne({ anonymousid: hashValue });
	if (existingHash) {
		return res.status(201).send('User has already voted');
	}
	const useranonymousid = new AnonymousIdentity({anonymousid: hashValue});
	console.log(useranonymousid);
	
	await useranonymousid.save( (err: any) => {
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

export default {
	getall,
	getone,
	deleteUser,
	createAnonymousIdentity,
	getAllAnonymousIdentity
};