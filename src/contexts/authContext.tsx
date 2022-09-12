import React, { createContext, FC, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { IUserProps } from './UserData';
import axios from 'axios';
import UserImage4 from '../assets/img/wanna/wanna4.png';
import UserImage4Webp from '../assets/img/wanna/wanna4.webp';

export interface IAuthContextProps {
	uid: string;
	setUid?(...args: unknown[]): unknown;
	userData: Partial<IUserProps>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [uid, setUid] = useState<string>(localStorage.getItem('facit_authUid') || '');
	const [userData, setUserData] = useState<Partial<IUserProps>>({});

	useEffect(() => {
		localStorage.setItem('facit_authUid', uid);
	}, [uid]);

	const fetchUser = useCallback(async () => {
		const res = await axios.get('https://api.heynova.work/user?id=' + uid)
		         .then(response => {
					if(response.status == 200)
						{
							var user: IUserProps = {uid: uid, 
							name: response.data.name,
							isOnline: true,
							src: UserImage4,
							srcSet: UserImage4Webp}
						setUserData(user);
						}
					else {console.log(res);}})
	  }, [])

	useEffect(() => {
		if (uid !== '') {
			fetchUser().catch((error) => console.log(error));
		} else {
			setUserData({});
		}
	}, [fetchUser]);

	const value = useMemo(
		() => ({
			uid,
			setUid,
			userData,
		}),
		[uid, userData],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
