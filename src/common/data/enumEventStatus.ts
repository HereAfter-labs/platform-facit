import COLORS from './enumColors';
import { TColor } from '../../type/color';

export interface IEventStatus {
	[key: string]: { name: string; color: TColor };
}
const EVENT_STATUS: IEventStatus = {
	RESOLVED: { name: 'Resolved', color: COLORS.SUCCESS.name },
	HANDSON: { name: 'Hands On', color: COLORS.WARNING.name },
	CANCELED: { name: 'Canceled', color: COLORS.DANGER.name },
	REJECTED: { name: 'Rejected', color: COLORS.DARK.name },
};
export default EVENT_STATUS;
