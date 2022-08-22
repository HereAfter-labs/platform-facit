import React, { FC, useState } from 'react';
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
import Textarea from '../../components/bootstrap/forms/Textarea';
import Checks from '../../components/bootstrap/forms/Checks';
import Popovers from '../../components/bootstrap/Popovers';
import data from '../../common/data/dummyTasksData';
import USERS from '../../common/data/userDummyData';
import EVENT_STATUS from '../../common/data/enumEventStatus';
import Avatar from '../../components/Avatar';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';

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
			//customerName: 'Alison Berry',
			//service: 'Exercise Bike',
			//employee: `${USERS.GRACE.name} ${USERS.GRACE.surname}`,
			//location: 'Maryland',
			//status: EVENT_STATUS.PENDING,
			duedate: moment().add(1, 'days').format('YYYY-MM-DD'),
			taskname: 'ABC',
			//time: '10:30',
			//note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut nisi odio. Nam sit amet pharetra enim. Nulla facilisi. Nunc dictum felis id massa mattis pretium. Mauris at blandit orci. Nunc vulputate vulputate turpis vitae cursus. In sit amet turpis tincidunt, interdum ex vitae, sollicitudin massa. Maecenas eget dui molestie, ullamcorper ante vel, tincidunt nisi. Donec vitae pulvinar risus. In ultricies nisl ac massa malesuada, vel tempus neque placerat.',
			notify: true,
		},
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { items, requestSort, getClassNamesFor } = useSortableData(data);

	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>Upcoming Appointments</CardTitle>
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
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<td style={{ width: 60 }} />
								<th
									onClick={() => requestSort('date')}
									className='cursor-pointer text-decoration-underline'>
									Date / Time{' '}
									<Icon
										size='lg'
										className={getClassNamesFor('date')}
										icon='FilterList'
									/>
								</th>
								<th>Status</th>
								<th>Task Name</th>
								<th>Due Date</th>
								<td />
							</tr>
						</thead>
						<tbody>
							{dataPagination(items, currentPage, perPage).map((item) => (
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
												{moment(`${item.duedate}`).format(
													'MMM Do YYYY, a',
												)}
											</span>
										</div>
									</td>
									{/* <td>
										<div>
											<div>{item.customer.name}</div>
											<div className='small text-muted'>
												{item.customer.email}
											</div>
										</div>
									</td> */}
									<td>
										<div className='d-flex'>
											<div className='flex-shrink-0'>
												<Avatar
													src={item.assigned.src}
													srcSet={item.assigned.srcSet}
													color={item.assigned.color}
													size={36}
												/>
											</div>
											<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
												{`${item.assigned.name} ${item.assigned.surname}`}
											</div>
										</div>
									</td>
									{/* <td>{item.service.name}</td>
									<td>{item.duration}</td> 
									<td>{item.payment && priceFormat(item.payment)}</td>*/}
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
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											icon='Edit'
											onClick={handleUpcomingEdit}>
											Edit
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardBody>
				<PaginationButtons
					data={items}
					label='items'
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
						<div className='col-lg-6'>
							<FormGroup
								id='dateInfo'
								name='date'
								label='Date/Time'
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
						<div className='w-100' />
						{/* <div className='col-lg-6'>
							<FormGroup
								id='noteInfo'
								name='note'
								label='Note'
								isColForLabel
								labelClassName='col-sm-2 text-capitalize'
								childWrapperClassName='col-sm-10'>
								<Textarea value={formik.values.note} readOnly disabled />
							</FormGroup>
						</div> */}
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
						{/* <div className='col-6'>
								<FormGroup id='status' label='Status'>
									<Input
										onChange={formik.handleChange}
										value={formik.values.status}
										type='date'
									/>
								</FormGroup>
							</div> */}
						{/* <div className='col-12'>
							<FormGroup id='customerName' label='Customer'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.customerName}
								/>
							</FormGroup>
						</div> */}
						{/* <div className='col-12'>
							<FormGroup id='service' label='Service'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.service}
								/>
							</FormGroup>
						</div> */}
						<div className='col-12'>
							<FormGroup id='taskname' label='Task Name'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.taskname}
								/>
							</FormGroup>
						</div>
						{/* <div className='col-12'>
							<FormGroup id='location' label='Location'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.location}
								/>
							</FormGroup>
						</div> */}
						<div className='col-6'>
							<FormGroup id='duedate' label='Due Date'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.duedate}
									type='date'
								/>
							</FormGroup>
						</div>
						{/* <div className='col-6'>
							<FormGroup id='time' label='time'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.time}
									type='time'
								/>
							</FormGroup>
						</div> */}
						{/* <div className='col-12'>
							<Card isCompact borderSize={2} shadow='none' className='mb-0'>
								<CardHeader>
									<CardLabel>
										<CardTitle>Extras</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody>
									<FormGroup id='note' label='Note'>
										<Textarea
											onChange={formik.handleChange}
											value={formik.values.note}
										/>
									</FormGroup>
								</CardBody>
							</Card>
						</div> */}
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
