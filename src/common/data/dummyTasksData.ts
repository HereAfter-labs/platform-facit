import moment from 'moment';
import USERS, { IUserProps } from './userDummyData';
import EVENT_STATUS, { IEventStatus } from './enumEventStatus';
import SERVICES, { IServiceProps } from './serviceDummyData';

const data: {
	id: number;
	status: IEventStatus['key'];
	taskname: string;
	duedate: string;
}[] = [
	{
		id: 1,
		status: EVENT_STATUS.APPROVED,
		taskname: 'Meeting with Codeware',
		duedate:
			moment().format('YYYY') + moment().format('MM') + moment().add(1, 'days').format('DD')
	},
	{
		id: 2,
		status: EVENT_STATUS.APPROVED,
		taskname: 'Login Design',
		duedate:
			moment().format('YYYY') + moment().format('MM') + moment().add(1, 'days').format('DD')
	},
	{
		id: 3,
		status: EVENT_STATUS.APPROVED,
		taskname: 'Meeting with Cowork',
		duedate:
			moment().format('YYYY') + moment().format('MM') + moment().add(1, 'days').format('DD')
	},
	{
		id: 4,
		status: EVENT_STATUS.APPROVED,
		taskname: 'Market Research',
		duedate:
			moment().format('YYYY') + moment().format('MM') + moment().add(1, 'days').format('DD')
	},
];

export default data;
