import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
	const router = useRouter();
	const handleAddMeetup = async (meetupData) => {
		const res = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(meetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		console.log(data);
		router.push('/');
	};
	return (
		<div>
			<Head>
				<title>Add New Meetup</title>
				<meta
					name='decription'
					content='Add a meetup for React lovers to attend.'
				/>
			</Head>
			<NewMeetupForm onAddMeetup={handleAddMeetup} />
		</div>
	);
};

export default NewMeetupPage;
