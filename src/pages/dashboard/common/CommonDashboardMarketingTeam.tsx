import React, { useCallback } from 'react';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Avatar, { AvatarGroup } from '../../../components/Avatar';
import USERS from '../../../contexts/UserData';
import useDarkMode from '../../../hooks/useDarkMode';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../menu';

const CommonDashboardMarketingTeam = () => {
	const { darkModeStatus } = useDarkMode();

	const navigate = useNavigate();
	// const handleOnClickToEmployeeListPage = useCallback(
	// 	() => navigate(`../${demoPages.appointment.subMenu.employeeList.path}`),
	// 	[navigate],
	// );

	return (
		<Card stretch>
			<CardHeader className='bg-transparent'>
				<CardLabel>
					<CardTitle tag='h4' className='h5'>
						Codeware Team Discussion
					</CardTitle>
					<CardSubTitle tag='h5' className='h6 text-muted'>
						There is a meeting at 12 o'clock.
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					{/* <Button
						icon='ArrowForwardIos'
						aria-label='Read More'
						hoverShadow='default'
						color={darkModeStatus ? 'dark' : undefined}
						onClick={handleOnClickToEmployeeListPage}
					/> */}
				</CardActions>
			</CardHeader>
			<CardBody>
				<AvatarGroup>
					<Avatar
						srcSet={USERS.GRACE.srcSet}
						src={USERS.GRACE.src}
						userName={`${USERS.GRACE.name}`}
						color={USERS.GRACE.color}
					/>
					<Avatar
						srcSet={USERS.SAM.srcSet}
						src={USERS.SAM.src}
						userName={`${USERS.SAM.name}`}
						color={USERS.SAM.color}
					/>
					<Avatar
						srcSet={USERS.CHLOE.srcSet}
						src={USERS.CHLOE.src}
						userName={`${USERS.CHLOE.name}`}
						color={USERS.CHLOE.color}
					/>

					<Avatar
						srcSet={USERS.JANE.srcSet}
						src={USERS.JANE.src}
						userName={`${USERS.JANE.name}`}
						color={USERS.JANE.color}
					/>
					<Avatar
						srcSet={USERS.JOHN.srcSet}
						src={USERS.JOHN.src}
						userName={`${USERS.JOHN.name}`}
						color={USERS.JOHN.color}
					/>
					<Avatar
						srcSet={USERS.RYAN.srcSet}
						src={USERS.RYAN.src}
						userName={`${USERS.RYAN.name}`}
						color={USERS.RYAN.color}
					/>
				</AvatarGroup>
			</CardBody>
		</Card>
	);
};

export default CommonDashboardMarketingTeam;
