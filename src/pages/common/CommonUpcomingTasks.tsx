import React, { FC, useState, useEffect, useContext, useCallback } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { FormikHelpers, useFormik } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import { priceFormat } from '../../helpers/helpers';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import Icon from '../../components/icon/Icon';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import AuthContext from '../../contexts/authContext';
import Textarea from '../../components/bootstrap/forms/Textarea';
import Checks from '../../components/bootstrap/forms/Checks';
import Popovers from '../../components/bootstrap/Popovers';
import data from '../../common/data/dummyTasksData';
import EVENT_STATUS from '../../common/data/enumEventStatus';
import IEventStatus from '../../common/data/enumEventStatus';

import axios from 'axios';

import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';

const status_map = {"hands on":"HANDSON", "resolved":"RESOLVED", "todo":"TODO"}

export class Task {
	taskid?: number;
	taskname: string;
	duedate?: Date;
	userid?: number;
	status?: any;//todo: more spec
	constructor(uid: number, taskname: string, duetime: string, status: string) {
		this.userid = uid;
		this.taskname = taskname;
		if(duetime != null) 
			this.duedate = new Date(parseInt(duetime)  * 1000);
		else
			this.duedate = new Date();
		if(status in status_map)
		    {
				let es = status_map[status];
				this.status = EVENT_STATUS[es];
			}
		else
		this.status = EVENT_STATUS["TODO"];
	  }
}

interface ICommonUpcomingTasksProps {
	isFluid?: boolean;
}
const CommonUpcomingTasks: FC<ICommonUpcomingTasksProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();

	// BEGIN :: Upcoming Tasks
	const [upcomingTasksInfoOffcanvas, setUpcomingTasksInfoOffcanvas] = useState(false);
	const handleUpcomingDetails = () => {
		setUpcomingTasksInfoOffcanvas(!upcomingTasksInfoOffcanvas);
	};

	const [allTasksScope, setallTasksScope] = useState(false);

	const [startDate, setstartDate] = useState(new Date());

	const [upcomingTasksEditOffcanvas, setUpcomingTasksEditOffcanvas] = useState(false);
	const handleUpcomingEdit = () => {
		setUpcomingTasksEditOffcanvas(!upcomingTasksEditOffcanvas);
	};
	// END :: Upcoming Tasks

	const formik = useFormik({
		onSubmit<Values>(
			values: Values,
			formikHelpers: FormikHelpers<Values>,
		): void | Promise<any> {
			return undefined;
		},
		initialValues: {
			duedate: new Date(),
			taskname: 'ABC',
			notify: true,
		},
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	//const { items, requestSort, getClassNamesFor } = useSortableData(data);
	const [tasks, setTasks] = useState(Array<Task>);
	const [uid] = useState<string>(localStorage.getItem('facit_authUid') || '');

	const fetchTasks = useCallback(async () => {
		const res = await axios.get('https://api.heynova.work/task/get?user_id=' + uid)
		   .then(response => {
					console.log(response);
					setTasks(response.data.map((item) => 
							(new Task(parseInt(uid), item.task_name, item.due_time, item.status))))});
	  }, [])

	useEffect(() => {
		if (uid !== '') {
			fetchTasks().catch((error) => console.log(error));
		} else {
			setTasks([]);
		}
	}, [fetchTasks]);

	function checkWeek(date){
	    let nextWeek = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
		return date <= nextWeek && date >= startDate
    }

	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>To-do List</CardTitle>
					</CardLabel>
					<CardActions>
						<Button
							color='info'
							icon='CloudDownload'
							isLight
							tag='a'
							to='/somefile.txt'
							target='_blank'
							download>
							Export
						</Button>
						<Button 
							style={{ color: allTasksScope ? '#ccccff' : themeStatus}}
							onClick={() => {setallTasksScope(!allTasksScope);}}
							>
							All tasks
						</Button>
						<Button icon='ArrowLeft' onClick={() => {setstartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7));}}></Button> 
						<Button color={themeStatus}>
						    {startDate.getDate()} {new Intl.DateTimeFormat('en-US', {month:'long'}).format(startDate)}
						</Button> 
						<Button icon='ArrowRight' onClick={() => {setstartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7));}}></Button>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<td style={{ width: 60 }} />
								{/* <th
									onClick={() => requestSort('duedate')}
									className='cursor-pointer text-decoration-underline'>
									Date / Time{' '}
									<Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/>
								</th> */}
								<th>Status</th>
								<th>Task Name</th>
								<th>Due Date</th>
								<td />
							</tr>
						</thead>
					
						 <tbody>
							{dataPagination(tasks, currentPage, perPage)
							  .filter(task => allTasksScope || (checkWeek(task.duedate)))
							    .map((item) => (
								<tr key={item.id}>
									<td>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames({
												'border-light': !darkModeStatus,
											})}
											icon='Info'
											onClick={handleUpcomingDetails}
											aria-label='Detailed information'
										/>
									</td>
									<td>
										<Dropdown>
											<DropdownToggle hasIcon={false}>
												<Button
													isLink
													color={item.status.color}
													icon='Circle'
													className='text-nowrap'>
													{item.status.name}
												</Button>
											</DropdownToggle>
											<DropdownMenu>
												{Object.keys(EVENT_STATUS).map((key) => (
													<DropdownItem key={key}>
														<div>
															<Icon
																icon='Circle'
																color={EVENT_STATUS[key].color}
															/>
															{EVENT_STATUS[key].name}
														</div>
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>
									</td>
									<td>
										<span>
											{item.taskname}
										</span>
									</td>
									<td>
										<div className='d-flex align-items-center'>
											<span
												className={classNames(
													'badge',
													'border border-2',
													[`border-${themeStatus}`],
													'rounded-circle',
													'bg-success',
													'p-2 me-2',
													`bg-${item.status.color}`,
												)}>
												<span className='visually-hidden'>
													{item.status.name}
												</span>
											</span>
											<span className='text-nowrap'>
											    {item.duedate.getDate()} {new Intl.DateTimeFormat('en-US', {month:'long'}).format(startDate)}
											</span>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardBody>
				<PaginationButtons
					data={tasks}
					label='tasks'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>

			<OffCanvas
				setOpen={setUpcomingTasksInfoOffcanvas}
				isOpen={upcomingTasksInfoOffcanvas}
				titleId='upcomingDetails'
				placement='bottom'>
				<OffCanvasHeader setOpen={setUpcomingTasksInfoOffcanvas}>
					<OffCanvasTitle id='upcomingDetails'>Customer: Alison Berry</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='w-100' />
					</div>
				</OffCanvasBody>
			</OffCanvas>

			<OffCanvas
				setOpen={setUpcomingTasksEditOffcanvas}
				isOpen={upcomingTasksEditOffcanvas}
				titleId='upcomingEdit'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setUpcomingTasksEditOffcanvas}>
					<OffCanvasTitle id='upcomingEdit'>Edit Appointments</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='taskname' label='Task Name'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.taskname}
								/>
							</FormGroup>
						</div>
						<div className='col-lg-6'>
							<FormGroup
								id='duedate'
								name='duedate'
								label='Due Date'
								isColForLabel
								labelClassName='col-sm-2 text-capitalize'
								childWrapperClassName='col-sm-10'>
								<Input
									value={moment(
										// @ts-ignore
										`${data.find((e) => e.id === 1).duedate} `,
									).format('MMM Do YYYY, a')}
									readOnly
									disabled
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<Card isCompact borderSize={2} shadow='none' className='mb-0'>
								<CardHeader>
									<CardLabel>
										<CardTitle>Notification</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<FormGroup>
										<Checks
											id='notify'
											type='switch'
											label={
												<>
													Notify the Customer
													<Popovers
														trigger='hover'
														desc='Check this checkbox if you want your customer to receive an email about the scheduled appointment'>
														<Icon
															icon='Help'
															size='lg'
															className='ms-1 cursor-help'
														/>
													</Popovers>
												</>
											}
											onChange={formik.handleChange}
											checked={formik.values.notify}
										/>
									</FormGroup>
								</CardBody>
							</Card>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button
							color='info'
							className='w-100'
							onClick={() => setUpcomingTasksEditOffcanvas(false)}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default CommonUpcomingTasks;
