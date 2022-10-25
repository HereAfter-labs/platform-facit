import COLORS from './enumColors';
import { TColor } from '../../type/color';

export interface IEventStatus {
	[key: string]: { name: string; color: TColor };
}
const EVENT_STATUS: IEventStatus = {
	RESOLVED: { name: 'resolved', color: COLORS.SUCCESS.name },
	HANDSON: { name: 'hands on', color: COLORS.WARNING.name },
	TODO: { name: 'todo', color: COLORS.PRIMARY.name }
};
export default EVENT_STATUS;
