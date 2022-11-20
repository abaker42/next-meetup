import React from 'react';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import handler from './api/meetups';

const HomePage = (props) => {
	return (
		<div>
			<Head>
				<title>React Meetups</title>
				<meta
					name='decription'
					content='React Meetups is the best place to meet and greet React Lovers!'
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</div>
	);
};

//page prerendering during build with getStaticProps
export async function getStaticProps() {
	// fetch data from api or database
	const meetups = await handler();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				description: meetup.description,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10, //seconds for page to update
	};
}

// //page prerendering on server
// export async function getServerSideProps(context) {
// 	const req = context.req
// 	const res = context.res
// 	//fetch data from DB or api
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export default HomePage;
