import dbConnect from '../../lib/utils/dbConnect';
import Pet from '../../models/Pet';

export const findAll = async (req, res) => {
	await dbConnect();
	try {
		const pets = await Pet.find({}); /* find all the data in our database */
		res.status(200).json({ success: true, data: pets });
	} catch (error) {
		res.status(400).json({ success: false });
	}
};

export const save = async (req, res) => {
	await dbConnect();
	try {
		const pet = await Pet.create(req.body); /* create a new model in the database */
		res.status(201).json({ success: true, data: pet });
	} catch (error) {
		res.status(400).json({ success: false });
	}
};
