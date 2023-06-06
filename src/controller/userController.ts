import User from '../model/User';
import crypto from 'crypto';

import CryptoJS from 'crypto-js';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import AnonymousIdentity from '../model/AnonymousIdentity';

const profile = async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return res.status(404).send('No user found.');
	}

	res.status(200).json(user);
};
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

const getbyemail = async (req: Request, res: Response) => {
	const user = await User.findOne({ email: req.params.email });
	res.json(user);
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

const update = async (req: Request, res: Response) => {
	try{
		const name = req.body.name;
		const username = req.body.username;
		const email = req.body.email;
		const user = await User.findByIdAndUpdate(req.params.id, {
			name, username, email, 
		}, {new: true});
		res.json(user).status(200);
	}catch (error) {
		res.status(401).send(error);
	}
};

const createAnonymousIdentity = async (req: Request, res: Response) => {
	const username = req.params.username;
	console.log(username);
	const hash = crypto.createHash('sha256');
	console.log(hash);
  	hash.update(username);
  	const hashValue = hash.digest('hex');
	console.log(hashValue);

	const useranonymousid = new AnonymousIdentity({anonymousid: hashValue});
	console.log(useranonymousid);
	
	await useranonymousid.save( (err: any) => {
		if (err) {
			return res.status(500).send(err);
		}
		res.status(200).json({ status: 'AnonymousIdentity saved' });
	});	
};

const getAllAnonymousIdentity = async (req: Request, res: Response) => {

	const anonymousidentities = await AnonymousIdentity.find();

	res.json(anonymousidentities);
};

export default {
	profile,
	getall,
	getone,
	deleteUser,
	update,
	getbyemail,
	createAnonymousIdentity,
	getAllAnonymousIdentity
};