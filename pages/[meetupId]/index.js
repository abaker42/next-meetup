import React, { Fragment } from 'react';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { handler, handlerData } from '../api/meetup-detail';
import Head from 'next/head';

const MeetupDetails = (props) => {
	return (
		<Fragment>
			<Head>
				<title>Meetup Detail- {props.singleMeet.title}</title>
				<meta name='decription' content={props.singleMeet.description} />
			</Head>
			<MeetupDetail
				image={props.singleMeet.image}
				title={props.singleMeet.title}
				address={props.singleMeet.address}
				description={props.singleMeet.description}
			/>
		</Fragment>
	);
};

export async function getStaticPaths() {
	const meetups = await handler();

	return {
		fallback: 'blocking',
		paths: meetups.map((meetup) => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
}

export async function getStaticProps(context) {
	//fetch data for single meetup
	const params = context.params.meetupId;
	const meetup = await handlerData(params);

	console.log('meetup: ' + meetup);
	return {
		props: {
			singleMeet: {
				id: meetup._id.toString(),
				title: meetup.title,
				address: meetup.address,
				description: meetup.description,
				image: meetup.image,
			},
		},
	};
}

export default MeetupDetails;
