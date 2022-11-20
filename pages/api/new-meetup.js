// /api/new-meetup

import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const data = req.body;

		const { title, image, address, description } = data;
		const client = await MongoClient.connect(
			'mongodb+srv://anthony:Pearl1990@cluster0.usequ.mongodb.net/meetups?retryWrites=true&w=majority'
		);
		const db = client.db();

		const meetupCollection = db.collection('Trials');

		const result = await meetupCollection.insertOne(data);
		console.log(result);
		client.close();

		res.status(200).json({ message: 'Meetup Inserted', meetups: result });
	}
};

export default handler;
