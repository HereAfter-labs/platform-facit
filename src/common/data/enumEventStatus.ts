import COLORS from './enumColors';
import { TColor } from '../../type/color';

export interface IEventStatus {
	[key: string]: { name: string; color: TColor };
}
const EVENT_STATUS: IEventStatus = {
	RESOLVED: { name: 'Resolved', color: COLORS.SUCCESS.name },
	HANDSON: { name: 'Hands On', color: COLORS.WARNING.name },
	TODO: { name: 'To Do', color: COLORS.PRIMARY.name }
};
export default EVENT_STATUS;
