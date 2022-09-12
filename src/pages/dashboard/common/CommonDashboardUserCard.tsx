import React from 'react';
import USERS from '../../../contexts/UserData';
import { pages } from '../../../menu';
import UserContact from '../../../components/UserContact';
import { useNavigate } from 'react-router-dom';

const CommonDashboardUserCard = () => {
	const navigate = useNavigate();

	return (
		<UserContact
			name={`${USERS.SAM.name}`}
			position='Team Lead'
			mail={`${USERS.SAM.username}@site.com`}
			phone='1234567'
			onChat={() => {}}
				//navigate(`../${demoPages.chat.subMenu.withListChat.path}`)}
			src={USERS.SAM.src}
			srcSet={USERS.SAM.srcSet}
			color={USERS.SAM.color}
		/>
	);
};

export default CommonDashboardUserCard;
