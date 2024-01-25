import React from 'react';
import Header from '../components/Header/Header';
import DietInfo from '../components/DietInfo/DietInfo';

const DiaryPage = () => {
	return (
		<div>
			<Header currentPage={'Diary'} />
			<DietInfo />
		</div>
	);
}

export default DiaryPage;
