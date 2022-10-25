import React, { FC, useRef, useState, useEffect, useContext, useCallback } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Popup from '../../components/Popup';
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
import useDarkMode from '../../hooks/useDarkMode';
const status_map = {"hands on":"HANDSON", "resolved":"RESOLVED", "todo":"TODO"}

export class Task {
	taskid?: number;
	taskname: string;
	duedate?: Date;
	userid?: number;
	status?: any;
	list?: string;
	notes?: string;
    onserver?: boolean;
	constructor(uid:number, taskid:number,
				taskname: string, duetime = '', 
				status = 'todo', list = 'All', notes = '', onserver=false) {
		this.userid = uid;
		this.taskid = taskid;
		this.taskname = taskname;
		if(duetime != '') 
			this.duedate = new Date(parseInt(duetime));
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
		this.onserver = onserver;
	  }
}

function copyTask(t: Task): Task {
	return new Task(t.userid, t.taskid, t.taskname, 
					t.duedate.getTime().toString(), t.status, t.list, t.notes, t.onserver);
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

	const [scope, setscope] = useState("All");

	const [nTaskId, setnTaskId] = useState(0);

	const [uid] = useState<string>(localStorage.getItem('facit_authUid') || '');

	const [buttonPopup, setbuttonPopup] = useState(false);

	const [selectedTask, setselectedTask] = useState(new Task(0, -1, '', '',
													'', "Personal", "", false ));

	const [upcomingTasksEditOffcanvas, setUpcomingTasksEditOffcanvas] = useState(false);
	const handleUpcomingEdit = () => {
		setUpcomingTasksEditOffcanvas(!upcomingTasksEditOffcanvas);
	};
	// END :: Upcoming Tasks

	const [inputTitle, setinputTitle] = useState('');


	const updateSelectedTask = (task: Task) => {
		formik.setFieldValue("taskname", task.taskname);
		formik.setFieldValue("duedate", task.duedate);
		setSelectedList(task.list);
		formik.setFieldValue("notes", task.notes);
		setselectedTask(task);
	}


	const findTaskIdx = (tidx: number) => {
		for(let [k, t] of Object.entries(tasks))
		{
			if(t.taskid == tidx)
				return parseInt(k)
		}
	}

	const saveSelectedTask = (task: Task) => {
		let tidx = findTaskIdx(task.taskid);
		if(tidx != -1)
			{
				const newTasks = tasks.map((t, i) => {
					if (i === tidx) {
					  return task;
					} else {
					  return t;
					}
				  });
				  setTasks(newTasks);
			}
		else
			{
				setTasks(tasks.concat([task]));
			}	
	}
	
	const formik = useFormik({
		onSubmit: (values) => {
			if(!selectedTask.onserver)
				{
				axios.post('https://api.heynova.work/task/create',{
					creator: uid,
					task_name: values.taskname,
					create_time: new Date().getTime().toString(),
					due_time: new Date(values.duedate).getTime().toString(),
					//assignes: [],
					task_text: "",
					task_list: selectedList,
					task_notes: values.notes
					}).
					then(response => {
						if(response.status == 200)
						{ 
							console.log('post task successful');
							saveSelectedTask(new Task(parseInt(uid), selectedTask.taskid, values.taskname, 
															new Date(values.duedate).getTime().toString(),
															selectedTask.status, selectedList, values.notes, true));
						}
						})
						.catch(error => {console.log(error); }); 
				}
			else{
				axios.put('https://api.heynova.work/task/update?task_id=' + selectedTask.taskid,{
					creator: uid,
					task_name: values.taskname,
					create_time: new Date().getTime().toString(),
					due_time: new Date(values.duedate).getTime().toString(),
					task_text: "",
					task_list: selectedList,
					task_notes: values.notes
					}).
					then(response => {
						if(response.status == 200)
						{ 
							console.log('put task successful');
							saveSelectedTask(new Task(parseInt(uid), selectedTask.taskid, values.taskname, 
															new Date(values.duedate).getTime().toString(),
															selectedTask.status, selectedList, values.notes, true));
						}
						})
						.catch(error => {console.log(error); }); 
			}
		},
		initialValues: {
			duedate: selectedTask.duedate,
			taskname: selectedTask.taskname,
			notes: selectedTask.notes,
		},
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const [tasks, setTasks] = useState(Array<Task>);

	const Checkbox = ({tid, taskdone}) => {
		const [isChecked, setisChecked] = useState(taskdone);
		const strike = "text-decoration:line-through"
		return (
		  <div className="checkbox-wrapper">
			<label>
			  <input id={tid} 
			         type="checkbox" 
					 checked={isChecked} 
					 onChange={() => { 
					    let t = tasks[findTaskIdx(tid)];
						axios.patch('https://api.heynova.work/task/status?task_id=' + tid, 
													{task_status: isChecked ? 'todo' : 'resolved'}).
							then(response => {
								if(response.status == 200)
								{   
									let newt = copyTask(t);
									newt.status = isChecked ? EVENT_STATUS["TODO"] : EVENT_STATUS["RESOLVED"];
									console.log('patch task successful');
									saveSelectedTask(newt);
									if(!isChecked){
										document.getElementById('tr-' + String(tid)).setAttribute("style", strike);
										}
									else{
										document.getElementById('tr-' + String(tid)).setAttribute("style", "");
										}
									setisChecked(!isChecked);
								}
								})
								.catch(error => {console.log(error); });  }}
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
							(new Task(parseInt(uid), item.task_id, 
							          item.task_name, item.due_time, 
									  item.status, item.task_list, item.notes, true))));})}, [])

	useEffect(() => {
		if (uid !== '') {
			fetchTasks().catch((error) => console.log(error));
		} else {
			setTasks([]);
		}
	}, [fetchTasks]);

	useEffect(() => {
		setnTaskId(Math.max(...tasks.map(t => t.taskid)) + 1);
	}, [tasks.length]);

	useEffect(() => {
		if(selectedTask.taskid == -1 && tasks.length > 0)
			setselectedTask(tasks[0]);
	}, [tasks]);

	useEffect(() => {
		updateTable();
	  }, [scope, tasks, currentPage, perPage]);
	
	useEffect(() => {
		// TODO:change it to dynamic creation
		const newbgColors = {"All": scope == "All" ? 'grey': 'white',
						 	"Personal": scope == "Personal" ? 'grey': 'white',
							"Work":scope == "Work" ? 'grey': 'white'}
		setbgColors(newbgColors);
	  }, [scope]);

	const [table, setTable] = useState([]);

	const [list_dropdown, setList_dropdown] = useState([]);

	const [bgColors, setbgColors] = useState({"All": 'white',"Personal":'white',"Work":'white'});

	const colorMap = {'Personal':'info', 'Work':'warning'}

	const [lists, setLists] = useState(['Personal', 'Work']);

	const [selectedList, setSelectedList] = useState(selectedTask.list);

	const [newList, setnewList] = useState('');

    useEffect(() => {updateTable();},[tasks.length]);

    function getDeadlineText(date: Date){
		const tomorrow = new Date();
  		tomorrow.setDate(tomorrow.getDate() + 1);
		if(tomorrow.toDateString() === date.toDateString()){
			return 'tomorrow';
		}
		else if(new Date().toDateString() === date.toDateString()){
			return 'today';
		}
		return date.toDateString();
	}

	useEffect(() => {
		updateDropdown()
	},[lists])

	function updateDropdown(){
		let dropdown = lists.map((list_item) => (
			<DropdownItem key={list_item} onClick={() => setSelectedList(list_item)}>
				<div>
				<Icon
					icon='Circle'
					color={colorMap[list_item]}
					/>
					{list_item}
				</div>
			</DropdownItem>
		))
		setList_dropdown(dropdown);
	}

	function deleteTask(tid: number){
		axios.delete('https://api.heynova.work/task/delete?task_id=' + tid).
			then(response => {
				if(response.status == 200 || response.status == 203 )
					{ 
						console.log('delete task successful');
						let idx = findTaskIdx(tid);
						if(idx != -1)
						{
							setTasks(tasks.filter((t, i) => idx !== i ));
							updateSelectedTask(new Task(parseInt(uid), 0, "", new Date().getTime().toString()))
						}
					}})
			.catch(error => {console.log(error); }); 
	}

    function updateTable() {
		let _tasks = dataPagination(tasks.filter(task => (scope == "All") || (scope == task.list)), currentPage, perPage)
		let todo_table = _tasks.map((item) => (
			  <tr key={item.taskid} id={'tr-' + item.taskid} onClick={() => updateSelectedTask(item)}>
				<td>
					   <Checkbox tid = {item.taskid} taskdone={item.status.name != 'todo'}/>
				</td>
				  <td>
					  <span onClick={() => makeEditable(item.taskid)}>
						  {item.taskname}
					  </span>
				  </td>
				  <td>
					{getDeadlineText(item.duedate)}
				</td>
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

	// function checkWeek(date){
	//     let nextWeek = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
	// 	return date <= nextWeek && date >= startDate
    // }

	function addNewTask(title='New Task'){
	    let date = new Date();
		let nt = new Task(parseInt(uid), nTaskId, title, String(Math.floor(date.getTime())), 'todo', 'Personal');
		setTasks(tasks.concat([nt]));
	}
	
	function handleInputChange(event){
		setinputTitle(event.target.value);
	}

	function handlenewListChange(event){
		setnewList(event.target.value);
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
						<Button 
							style={{ color:themeStatus, background:bgColors["All"]}}
							onClick={() => {setscope("All");}}
							>
							All
						</Button>
						<Button 
							style={{color: themeStatus, background:bgColors["Personal"]}}
							onClick={() => {setscope("Personal");}}
							>
							Personal
						</Button>
						<Button 
							style={{ color: themeStatus, background:bgColors["Work"]}}
							onClick={() => {setscope("Work");}}
							>
							Work
						</Button>
						<Button 
							style={{ color: themeStatus}}
							onClick={() => {setbuttonPopup(true);}}
							>
							+New List
						</Button>
						<Popup trigger={buttonPopup} setTrigger={setbuttonPopup}>
							<CardTitle>Create a list</CardTitle>
								<Input type='text' 
									value={newList}
									onChange={handlenewListChange}>
								</Input>
							<div className="row">
							<div className="col-6">
								<Button
									className="button"
									onClick={() => {
										addNewList(newList);
										setbuttonPopup(false);
									}}>
									Create
								</Button>
									</div>
									<div className="col-6">
										<Button
											className="button"
											onClick={() => {
												setbuttonPopup(false);
											}}>
											Cancel
										</Button>
									</div>
								</div>
						</Popup>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
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
			<div className="col-md-6">
			<Card>
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
												formik.values.duedate,
										  ).format(
												moment.HTML5_FMT.DATETIME_LOCAL,
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
											{list_dropdown}
											<DropdownItem key={"Create a list"} onClick={() => setbuttonPopup(true)}>
												<div>
												<Icon
														icon='Circle'
														color={'secondary'}
														/>
														Create a list
											   </div>
											</DropdownItem>
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
				</CardBody>
				<div className='row m-0'>
					<div className='col-6 p-3'>
						<Button
							color='info'
							className='w-100'
							onClick={() => {formik.handleSubmit()}}>
							Save
						</Button>
					</div>
					<div className='col-6 p-3'>
						<Button
							color='warning'
							className='w-100'
							onClick={() => {deleteTask(selectedTask.taskid)}}>
							Delete
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
