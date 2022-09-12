import EVENT_STATUS, { IEventStatus } from './enumEventStatus';
import SERVICES, { IServiceProps } from '../../contexts/serviceDummyData';

const data: {
	id: number;
	status: IEventStatus['key'];
	taskname: string;
	duedate: Date;
}[] = [
	{
		id: 1,
		status: EVENT_STATUS.APPROVED,
		taskname: 'Meeting with Codeware',
		duedate:
			new Date()
	},
	// {
	// 	id: 2,
	// 	status: EVENT_STATUS.APPROVED,
	// 	taskname: 'Login Design',
	// 	duedate:
	// 		new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1)
	// },
	// {
	// 	id: 3,
	// 	status: EVENT_STATUS.PENDING,
	// 	taskname: 'Meeting with Cowork',
	// 	duedate:
	// 	new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+3)
	// },
	// {
	// 	id: 4,
	// 	status: EVENT_STATUS.APPROVED,
	// 	taskname: 'Market Research',
	// 	duedate:
	// 	new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+9)
	// },
	// {
	// 	id: 5,
	// 	status: EVENT_STATUS.PENDING,
	// 	taskname: 'Market Research Cont.',
	// 	duedate:
	// 	new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+10)
	// }
];

export default data;
