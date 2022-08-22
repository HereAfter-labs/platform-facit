import React, { useEffect, useState } from 'react';
import { useTour } from '@reactour/tour';
import useDarkMode from '../../hooks/useDarkMode';
import { pages } from '../../menu';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../layout/SubHeader/SubHeader';
import Page from '../../layout/Page/Page';
import { TABS, TTabs } from './common/helper';
import Button, { ButtonGroup } from '../../components/bootstrap/Button';
import Switch from 'react-switch';
import CommonAvatarTeam from '../../common/other/CommonAvatarTeam';
import Progress from '../../components/bootstrap/Progress';

import CommonDashboardAlert from './common/CommonDashboardAlert';
import CommonDashboardUserCard from './common/CommonDashboardUserCard';
import CommonDashboardMarketingTeam from './common/CommonDashboardMarketingTeam';
import CommonDashboardDesignTeam from './common/CommonDashboardDesignTeam';
import CommonDashboardIncome from './common/CommonDashboardIncome';
import CommonDashboardRecentActivities from './common/CommonDashboardRecentActivities';
import CommonDashboardUserIssue from './common/CommonDashboardUserIssue';
import CommonDashboardSalesByStore from './common/CommonDashboardSalesByStore';
import CommonDashboardWaitingAnswer from './common/CommonDashboardWaitingAnswer';

import Todo, { ITodoListItem } from '../../components/extras/Todo';

//import CommonMyWallet from '../common/CommonMyWallet';
//import CommonDashboardTopSeller from './common/CommonDashboardTopSeller';

const DashboardPage = () => {
	/**
	 * Tour Start
	 */

	 const [list, setList] = useState<ITodoListItem[]>([
		{
			id: 1,
			status: true
		},
		{ 
			id:2,
			status: false
		}
	]);

	const listLength = list.length;

	const completeTaskLength = list.filter((i) => i.status).length;

	const { setIsOpen } = useTour();

	const [checked, toggle] = useState<boolean>(true);

	useEffect(() => {
		if (localStorage.getItem('tourModalStarted') !== 'shown') {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
    
	const { themeStatus } = useDarkMode();

	const [activeTab, setActiveTab] = useState<TTabs>(TABS.YEARLY);

	return (
		//<PageWrapper title={demoPages.sales.subMenu.dashboard.text}>
		<PageWrapper title=''>
			<SubHeader>
				<div className='subheader-left col-6 col-md-4'>
					<span className='h4 mb-0 fw-bold'>Cockpit</span>
					<SubheaderSeparator />
					{/* <ButtonGroup>
						{Object.keys(TABS).map((key) => (
							<Button
								key={key}
								color={activeTab === TABS[key] ? 'success' : themeStatus}
								onClick={() => setActiveTab(TABS[key])}>
								{TABS[key]}
							</Button>
						))}
					</ButtonGroup> */}
				Remote	&nbsp; <Switch onChange={(ck) => toggle(ck)} 
									  checked={checked} 
									  onColor="#cec8e9"
									  onHandleColor="#7A87E4"
									  handleDiameter={30}
									  uncheckedIcon={false}
								      checkedIcon={false}
									  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
									  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
									  height={20}
									  width={48}
									  className="react-switch"/>  &nbsp; In Office 
				</div>
				<div className='subheader-left col-md-6'>
				<span className='col-auto'> Daily Progress Bar </span>
				<div className='col-4'>
					<Progress
								height={13}
								max={listLength}
								value={completeTaskLength}
								color={completeTaskLength === listLength ? 'success' : 'primary'}
						/>
				</div>
			</div>
				
				{/* <SubHeaderRight>
					<CommonAvatarTeam>
						<strong>Marketing</strong> Team
					</CommonAvatarTeam>
				</SubHeaderRight> */}
			</SubHeader>
			<Page container='fluid'>
				<div className='row'>
					<div className='col-12'>
						<CommonDashboardAlert />
					</div>

					<div className='col-xl-4'>
						<CommonDashboardUserCard />
					</div>
					<div className='col-xl-4'>
						<CommonDashboardMarketingTeam />
					</div>
					<div className='col-xl-4'>
						<CommonDashboardDesignTeam />
					</div>

					<div className='col-xxl-6'>
						<CommonDashboardIncome activeTab={activeTab} />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardRecentActivities />
					</div>
					<div className='col-xxl-3'>
						<CommonDashboardUserIssue />
					</div>

					<div className='col-xxl-8'>
						<CommonDashboardSalesByStore />
					</div>
					<div className='col-xxl-4 col-xl-6'>
						<CommonDashboardWaitingAnswer />
					</div>

					{/* <div className='col-xxl-4 col-xl-6'>
						<CommonMyWallet />
					</div> */}
					{/* <div className='col-xxl-8'>
						<CommonDashboardTopSeller />
					</div> */}
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
