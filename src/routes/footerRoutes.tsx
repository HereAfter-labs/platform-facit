import React from 'react';
import { pages, officeMenu } from '../menu';
import Footer from '../layout/Footer/Footer';

const footers = [
	{ path: officeMenu.blank.path, element: null, exact: true },
	{ path: pages.login.path, element: null, exact: true },
	{ path: pages.signUp.path, element: null, exact: true },
	//{ path: demoPages.page404.path, element: null, exact: true },
	//{ path: demoPages.knowledge.subMenu.grid.path, element: null, exact: true },
	{ path: '*', element: <Footer /> },
];

export default footers;
