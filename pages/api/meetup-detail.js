import { MongoClient, ObjectId } from 'mongodb';

export const handler = async (req, res) => {
	const client = await MongoClient.connect(
		'mongodb+srv://anthony:Pearl1990@cluster0.usequ.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupCollection = db.collection('Trials');

	//only fetch the id fields
	const result = await meetupCollection.find({}, { _id: 1 }).toArray();
	client.close();

	return result;
};

export const handlerData = async (id) => {
	const client = await MongoClient.connect(
		'mongodb+srv://anthony:Pearl1990@cluster0.usequ.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupCollection = db.collection('Trials');

	//only fetch the id fields
	const result = await meetupCollection.findOne({ _id: ObjectId(id) });
	client.close();

	return result;
};
