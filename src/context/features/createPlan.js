import axios from 'axios';
import { PLAN, LOADING, UNLOADING } from '../action_type';

const baseUrl = process.env.REACT_APP_BASE;
export const createPlan = async (
	plan,
	navigate,
	loading,
	setMainContext,
) => {
	try {
		if (plan.userId) {
			if (plan?.free?.length > 0) {
				console.log(plan?.free);
				const response = await axios.put(
					`${baseUrl}/user/v2/package/${plan.userId}`,
					plan,
				);
				console.log(response?.data?.result);
				setTimeout(() => {
					setMainContext({ type: LOADING });
					setMainContext({
						type: PLAN,
						res: response?.data?.message,
						userInfo: plan?.free,
					});
				}, 6000);

				setMainContext({ type: LOADING });
			} else {
				console.log('No Value Entered');
			}
		} else {
			console.log('No UserId');
		}
	} catch (error) {
		setTimeout(() => {
			navigate('/v2/package-plan');
		}, 2000);
		setMainContext({ type: 'PLAN_ERROR', loading });
	}
};
