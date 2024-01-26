import React from 'react';
import Header from '../components/Header/Header';
import DiaryTable from '../components/DiaryTable/DiaryTable';

const DiaryPage = () => {
	return (
		<div>
			<Header currentPage={'Diary'} />
			<DiaryTable />
		</div>
	);
}

export default DiaryPage;
