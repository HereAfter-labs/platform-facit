import React from 'react';
import { demoPages, officeMenu } from '../menu';
import Footer from '../layout/Footer/Footer';

const footers = [
	{ path: officeMenu.blank.path, element: null, exact: true },
	{ path: demoPages.login.path, element: null, exact: true },
	{ path: demoPages.signUp.path, element: null, exact: true },
	//{ path: demoPages.page404.path, element: null, exact: true },
	//{ path: demoPages.knowledge.subMenu.grid.path, element: null, exact: true },
	{ path: '*', element: <Footer /> },
];

export default footers;
