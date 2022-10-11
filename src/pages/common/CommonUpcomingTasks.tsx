import React, { FC, useRef, useState, useEffect, useContext, useCallback } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { FormikHelpers, useFormik, useFormikContext } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardFooter,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import InputGroup from '../../components/bootstrap/forms/InputGroup';
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
//import COLORS from './enumColors';
import IEventStatus from '../../common/data/enumEventStatus';

import axios from 'axios';

import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import useDarkMode from '../../hooks/useDarkMode';
import { NoTransfer } from '../../components/icon/material-icons';
import { networkInterfaces } from 'os';
import { isTemplateLiteralToken } from 'typescript';

const status_map = {"hands on":"HANDSON", "resolved":"RESOLVED", "todo":"TODO"}

export class Task {
	taskid?: number;
	taskname: string;
	duedate?: Date;
	userid?: number;
	status?: any;
	list?: string;
	notes?: string;
	constructor(uid: number, taskid:number,
				taskname: string, duetime = '', 
				status = 'todo', list = 'All', notes = '') {
		this.userid = uid;
		this.taskid = taskid;
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
		this.list = list;
		this.notes = notes;
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

	const [selectedTask, setselectedTask] = useState(new Task(0,0,''));

	const [upcomingTasksEditOffcanvas, setUpcomingTasksEditOffcanvas] = useState(false);
	const handleUpcomingEdit = () => {
		setUpcomingTasksEditOffcanvas(!upcomingTasksEditOffcanvas);
	};
	// END :: Upcoming Tasks

	const [inputTitle, setinputTitle] = useState('');


	const updateSelectedTask = (task: Task) => {
		formik.setFieldValue("taskname", task.taskname);
		formik.setFieldValue("duedate", task.duedate);
		formik.setFieldValue("list", task.list);
		formik.setFieldValue("notes", task.notes);
		setselectedTask(task);
	}

	const formik = useFormik({
		onSubmit: (values) => {
			axios.post('https://api.heynova.work/task/create',{
				taskid: selectedTask.taskid,
				uid: selectedTask.userid,
				taskname: values.taskname,
				duedate: values.duedate,
				list: values.list,
				notes: values.notes
				}).
				then(response => {
					if(response.status == 200)
					   { 
						console.log('post task successful');
					   }
					})
					.catch(error => {console.log(error); }); 
		},
		initialValues: {
			duedate: selectedTask.duedate,
			taskname: selectedTask.taskname,
			notes: selectedTask.notes,
			list: selectedTask.list,
		},
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	//const { items, requestSort, getClassNamesFor } = useSortableData(data);
	const [tasks, setTasks] = useState(Array<Task>);
	const [newListName] = useState('');
	const [uid] = useState<string>(localStorage.getItem('facit_authUid') || '');

	const Checkbox = ({id}) => {
		const [isChecked, setisChecked] = useState(false);
		const strike = "text-decoration:line-through"
		return (
		  <div className="checkbox-wrapper">
			<label>
			  <input id={id} 
			         type="checkbox" 
					 checked={isChecked} 
					 onChange={() => {  if(!isChecked){
											document.getElementById('taskname-' + String(id)).setAttribute("style", strike);
										}
										else{
									        document.getElementById('taskname-' + String(id)).setAttribute("style", "");
										}
										setisChecked(!isChecked); }}
			/>
			</label>
		  </div>
		);
	  };

	const fetchTasks = useCallback(async () => {
		const res = await axios.get('https://api.heynova.work/task/get?user_id=' + uid)
		   .then(response => {
					console.log(response);
					setTasks(response.data.map((item) => 
							(new Task(parseInt(uid), item.task_id, item.task_name, item.due_time, item.status, item.list))))
							let firstTask = response.data[0];
							updateSelectedTask(new Task(parseInt(uid), firstTask.task_id, firstTask.task_name, firstTask.due_time, firstTask.status, firstTask.list));});	
	  }, [])

	useEffect(() => {
		if (uid !== '') {
			fetchTasks().catch((error) => console.log(error));
		} else {
			setTasks([]);
		}
	}, [fetchTasks]);

	const [table, setTable] = useState([]);

	const colorMap = {'All':'primary', 'Personal':'info', 'Work':'warning'}

	const [lists, setLists] = useState(['All', 'Personal', 'Work']);

	const [selectedList, setSelectedList] = useState(selectedTask.list);

    useEffect(() => {updateTable();},[tasks.length]);

    function updateTable() {
		let _tasks = dataPagination(tasks, currentPage, perPage).filter(task => allTasksScope || (checkWeek(task.duedate)))
		// let ekeys = editors;
		//   for(let task of tasks){
		// 	    if(!(task.taskid in ekeys))
		// 		{
		// 			let editableText = useRef(null);
		// 			ekeys[task.taskid] = editableText
		// 	}
		//   }
		//setEditors(ekeys);
		let todo_table = _tasks.map((item) => (
			  <tr key={item.taskid} onClick={() => updateSelectedTask(item)}>
				  {/* <td>
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
				  </td> */}
				<td>
					   <Checkbox id = {item.taskid}/>
				</td>
				  <td>
					  <span id={'taskname-' + item.taskid} onClick={() => makeEditable(item.taskid)}>
						  {item.taskname}
					  </span>
				  </td>
				   {/* <td>
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
						  <div className='col-4'>
							<FormGroup id='date'>
								<Input
									onChange={formik.handleChange}
									value={moment.utc(item.duedate).format('YYYY-MM-DD')}
									type='date'
								/>
							</FormGroup>
						</div>
						    <span className='text-nowrap'>
							  {item.duedate.getDate()} {new Intl.DateTimeFormat('en-US', {month:'long'}).format(startDate)}
						  </span>  
					  </div> 
				  </td>  */}
			  </tr>
		  ))
		  setTable(todo_table);
	}

	function makeEditable(tid){
        document.getElementById('taskname-' + String(tid)).contentEditable = "true";
	}

	function addNewList(listname){
		setLists(lists.concat([listname]));
	}

	function openNewList(){
		document.getElementById('newListField').hidden = false;
	}

	function checkWeek(date){
	    let nextWeek = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
		return date <= nextWeek && date >= startDate
    }

	function addNewTask(title='New Task'){
	    let date = new Date();
		let nt = new Task(0,0,title, String(Math.floor(date.getTime() / 1000)), 'todo', 'all');
		setTasks(tasks.concat([nt]));
	}
	
	function handleInputChange(event){
		setinputTitle(event.target.value);
	}
	
	return (
		<>
		   <div className="row">
			 <div className="col-md-6">
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='Alarm' iconColor='info'>
						<CardTitle>To-do List</CardTitle>
					</CardLabel>
					<CardActions>
						{/* <Button
							color='info'
							icon='CloudDownload'
							isLight
							tag='a'
							to='/somefile.txt'
							target='_blank'
							download>
							Export
						</Button> */}
						<Button 
							style={{ color: allTasksScope ? '#ccccff' : themeStatus}}
							onClick={() => {setallTasksScope(!allTasksScope);}}
							>
							All
						</Button>
						<Button 
							style={{ color: allTasksScope ? '#ccccff' : themeStatus}}
							onClick={() => {setallTasksScope(!allTasksScope);}}
							>
							Personal
						</Button>
						<Button 
							style={{ color: allTasksScope ? '#ccccff' : themeStatus}}
							onClick={() => {setallTasksScope(!allTasksScope);}}
							>
							Work
						</Button>
						<Button 
							style={{ color: allTasksScope ? '#ccccff' : themeStatus}}
							onClick={() => {openNewList();}}
							>
							+New List
						</Button>
						<Input id='newListField' type='hidden' value={newListName}>
						</Input>
						{/* <Button icon='ArrowLeft' onClick={() => {setstartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7));}}></Button> 
						<Button color={themeStatus}>
						    {startDate.getDate()} {new Intl.DateTimeFormat('en-US', {month:'long'}).format(startDate)}
						</Button> 
						<Button icon='ArrowRight' onClick={() => {setstartDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7));}}></Button> */}
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						{/* <thead>
							<tr>
								<td style={{ width: 50 }} />
								 <th
									onClick={() => requestSort('duedate')}
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
						</thead> */}
						 <tbody>
							{table}
						</tbody>
					</table>
				</CardBody>
				<CardFooter className='d-block'>
					<InputGroup>
						<Input type="text" 
							   value={inputTitle}
							   onChange={handleInputChange}/>
						<Button color='info' icon='Send' onClick={() => {addNewTask(inputTitle)}}>
						</Button>
					</InputGroup>
				</CardFooter>
				<PaginationButtons
					data={tasks}
					label='tasks'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</Card>
			</div>

			{/* <Card
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
			</OffCanvas> */}


			<div className="col-md-6">
			<Card
				//setOpen={setUpcomingTasksEditOffcanvas}
				//isOpen={upcomingTasksEditOffcanvas}
				//titleId='upcomingEdit'
				//isBodyScroll
				//placement='end'
				>
				<CardHeader borderSize={1}>
					<CardTitle>Edit Tasks</CardTitle>
				</CardHeader>
				<CardBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='taskname' label='Task Name'>
								<Input
									onChange={formik.handleChange}
									value={formik.values.taskname}
								/>
							</FormGroup>
						</div>
					</div>
					<div className='row g-4'>
					<div className='col-6'>
							<FormGroup id='duedate' label='Due Date'>
									<Input
										type={'datetime-local'}
										value={
											moment(
												formik.values.duedate).format(
												moment.HTML5_FMT
													.DATETIME_LOCAL,
											)
										}
										onChange={formik.handleChange}
									/>
							</FormGroup>
						</div>
					</div>
					<div className='row g-4'>
						<div className='col-4'>
						<FormGroup id='list' label='List'>
								<Dropdown>
									<DropdownToggle hasIcon={false}>
											<Button
													isLink
													color={colorMap[selectedList]}
													icon='Circle'
													className='text-nowrap'>
													{selectedList}
												</Button>
											</DropdownToggle>
											<DropdownMenu>
											{lists.map((list_item) => (
												<DropdownItem key={list_item}>
													<div>
													<Icon
														icon='Circle'
														color={colorMap[list_item]}
														onClick={() => setSelectedList(list_item)}
														/>
														{list_item}
													</div>
												</DropdownItem>
											))}
											</DropdownMenu>
										</Dropdown>
						      </FormGroup>
							</div>
						</div>
						<div className='row g-4'>
								<div className='col-12'>
										<FormGroup id='notes' label='Notes'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.notes}
											/>
										</FormGroup>
							</div>
						</div>
						{/* <div className='col-4'>
							<FormGroup id='list' label='List'> 
							 <Dropdown>
								<DropdownToggle hasIcon={false}>
									{/* <Button
										isLink
										color={item.status.color}
										icon='Circle'
										className='text-nowrap'>
										{item.status.name}
									</Button> 
									All
								</DropdownToggle>
								<DropdownMenu>
									{lists.map((list_item) => (
										<DropdownItem>
											<div>
												{list_item.name}
											</div>
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						</FormGroup>
						</div>*/}
				</CardBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button
							color='info'
							className='w-100'
							onClick={() => {formik.handleSubmit()}}>
							Save
						</Button>
					</div>
				</div>
			</Card>
			</div>
		</div>
	</>
	);
};

export default CommonUpcomingTasks;
