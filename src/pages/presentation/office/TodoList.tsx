import React from 'react';
import moment from 'moment';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button from '../../../components/bootstrap/Button';
import { pages } from '../../../menu';
import CommonUpcomingEvents from '../../common/CommonUpcomingTasks';
import useDarkMode from '../../../hooks/useDarkMode';

const TodoList = () => {
	const { themeStatus } = useDarkMode();
	return (
		//<PageWrapper title={demoPages.appointment.subMenu.appointmentList.text}>
		<PageWrapper title=''>
			{/* <SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>
						{/* You have <Icon icon='TaskAlt' color='success' className='mx-1' size='lg' />{' '}
						3 approved appointments and{' '}
						<Icon icon='Alarm' color='warning' className='mx-1' size='lg' /> 4 pending
						appointments for today.
					</span>
				</SubHeaderLeft>
			</SubHeader>  */}
			<Page container='fluid'>
				<div className='row h-100'>
					<div className='col-12'>
						<CommonUpcomingEvents isFluid />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TodoList;
