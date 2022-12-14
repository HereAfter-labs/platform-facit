import React, { lazy } from 'react';
import { dashboardMenu, pages, officeMenu, Teams, CalendarItem, ChatItem, TodosItem } from '../menu';
import Login from '../pages/presentation/auth/Login';

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/dashboard/DashboardPage'))
};
const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
const APP = {
 	OFFICE: {
 		CALENDAR: lazy(() => import('../pages/presentation/office/CalendarPage')),
 		TODO_LIST: lazy(() => import('../pages/presentation/office/TodoList')),
 	},
	TEAMS: {
		TEAM_MEMBERS: lazy(() => import('../pages/presentation/team/EmployeeList'))
	},
	CHAT: {
		WITH_LIST: lazy(() => import('../pages/presentation/chat/WithListChatPage')),
	},
	VOICE: {
		INIT: lazy(() => import('../pages/presentation/voice/VoiceChannel')),
	}
};
const PAGE_LAYOUTS = {
	ASIDE: lazy(() => import('../pages/presentation/aside-types/DefaultAsidePage'))
};

const presentation = [
	/**
	 * Landing
	 */
	{
		path: dashboardMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
		exact: true,
	},
	// {
	// 	path: dashboardMenu.dashboardBooking.path,
	// 	element: <LANDING.DASHBOARD_BOOKING />,
	// 	exact: true,
	// },
	// {
	// 	path: dashboardMenu.summary.path,
	// 	element: <LANDING.SUMMARY />,
	// 	exact: true,
	// },

	/** ************************************************** */

	/**
	 * Pages
	 */

	/**
	 * Single Pages
	 */
	// {
	// 	path: demoPages.singlePages.subMenu.boxedSingle.path,
	// 	element: <SINGLE.BOXED />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.singlePages.subMenu.fluidSingle.path,
	// 	element: <SINGLE.FLUID />,
	// 	exact: true,
	// },

	/**
	 * List
	 */
	// {
	// 	path: demoPages.listPages.subMenu.listBoxed.path,
	// 	element: <LIST.BOXED />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.listPages.subMenu.listFluid.path,
	// 	element: <LIST.FLUID />,
	// 	exact: true,
	// },

	/**
	 * Grid
	 */
	// {
	// 	path: demoPages.gridPages.subMenu.gridBoxed.path,
	// 	element: <GRID.BOXED />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.gridPages.subMenu.gridFluid.path,
	// 	element: <GRID.FLUID />,
	// 	exact: true,
	// },

	/**
	 * Edit
	 */
	// {
	// 	path: demoPages.editPages.subMenu.editModern.path,
	// 	element: <EDIT.MODERN />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.editPages.subMenu.editBoxed.path,
	// 	element: <EDIT.BOXED />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.editPages.subMenu.editFluid.path,
	// 	element: <EDIT.FLUID />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.editPages.subMenu.editWizard.path,
	// 	element: <EDIT.WIZARD />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.editPages.subMenu.editInCanvas.path,
	// 	element: <EDIT.IN_CANVAS />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.editPages.subMenu.editInModal.path,
	// 	element: <EDIT.IN_MODAL />,
	// 	exact: true,
	// },

	// {
	// 	path: demoPages.pricingTable.path,
	// 	element: <PRICING.PRICING_TABLE />,
	// 	exact: true,
	// },

	/**
	 * END - Pages
	 */

	/**
	 * Auth Page
	 */
	// {
	// 	path: demoPages.page404.path,
	// 	element: <AUTH.PAGE_404 />,
	// 	exact: true,
	// },
	{
		path: pages.login.path,
		element: <Login />,
		exact: true,
	},
	{
		path: pages.signUp.path,
		element: <Login isSignUp />,
		exact: true,
	},

	/**
	 * App
	 */

	/**
	 * App > Project Management
	 */
	// {
	// 	path: demoPages.projectManagement.subMenu.list.path,
	// 	element: <APP.PROJECT_MANAGEMENT.PROJECTS_LIST />,
	// 	exact: true,
	// },
	// {
	// 	path: `${demoPages.projectManagement.subMenu.itemID.path}/:id`,
	// 	element: <APP.PROJECT_MANAGEMENT.PROJECT />,
	// 	exact: true,
	// },

	/**
	 * App > Knowledge
	 */
	// {
	// 	path: demoPages.knowledge.subMenu.grid.path,
	// 	element: <APP.KNOWLEDGE.GRID />,
	// 	exact: true,
	// },
	// {
	// 	path: `${demoPages.knowledge.subMenu.itemID.path}/:id`,
	// 	element: <APP.KNOWLEDGE.VIEW />,
	// 	exact: true,
	// },

	/**
	 * App > Sales
	 */
	// {
	// 	path: demoPages.sales.subMenu.transactions.path,
	// 	element: <APP.SALES.TRANSACTIONS />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.sales.subMenu.salesList.path,
	// 	element: <APP.SALES.PRODUCTS />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.sales.subMenu.productsGrid.path,
	// 	element: <APP.SALES.PRODUCTS_GRID />,
	// 	exact: true,
	// },
	// {
	// 	path: `${demoPages.sales.subMenu.productID.path}/:id`,
	// 	element: <APP.SALES.PRODUCTS_VIEW />,
	// 	exact: true,
	// },

	// /**
	//  * App > Appointment
	//  */
	{
		path: CalendarItem.calendar.path,
		element: <APP.OFFICE.CALENDAR />,
		exact: true,
	},
	{
		path: TodosItem.todos.path,
		element: <APP.OFFICE.TODO_LIST />,
		exact: true,
	},
	{
		path: Teams.teamMembers.path,
		element: <APP.TEAMS.TEAM_MEMBERS />,
		exact: true,
	},
	// {
	// 	path: `${demoPages.appointment.subMenu.employeeID.path}/:id`,
	// 	element: <APP.APPOINTMENT.EMPLOYEE_VIEW />,
	// 	exact: true,
	// },
	// {
	// 	path: officeMenu.calendar.appointmentList.path,
	// 	element: <APP.APPOINTMENT.APPOINTMENT_LIST />,
	// 	exact: true,
	// },

	/**
	 * App > CRM
	 */
	// {
	// 	path: demoPages.crm.subMenu.dashboard.path,
	// 	element: <APP.CRM.CRM_DASHBOARD />,
	// 	exact: true,
	// },
	// {
	// 	path: demoPages.crm.subMenu.customersList.path,
	// 	element: <APP.CRM.CUSTOMERS />,
	// 	exact: true,
	// },
	// {
	// 	path: `${demoPages.crm.subMenu.customerID.path}/:id`,
	// 	element: <APP.CRM.CUSTOMER />,
	// 	exact: true,
	// },

	// /**
	//  * App > Chat
	//  */
	{
	 	path: ChatItem.chat.path,
		element: <APP.CHAT.WITH_LIST />,
	 	exact: true,
	},

	// /**
	//  * App > Voice
	//  */
	{
		path: officeMenu.voice.subMenu.codeware_voice.path,
	    element: <APP.VOICE.INIT />,
		exact: true,
   	}

	/**
	 * END - App
	 */

	/** ************************************************** */

	/**
	 * Page Layout Types
	 */
// 	{
// 		path: layoutMenu.blank.path,
// 		element: <PAGE_LAYOUTS.BLANK />,
// 		exact: true,
// 	},
// 	{
// 		path: layoutMenu.pageLayout.subMenu.headerAndSubheader.path,
// 		element: <PAGE_LAYOUTS.HEADER_SUBHEADER />,
// 		exact: true,
// 	},
// 	{
// 		path: layoutMenu.pageLayout.subMenu.onlyHeader.path,
// 		element: <PAGE_LAYOUTS.HEADER />,
// 		exact: true,
// 	},
// 	{
// 		path: layoutMenu.pageLayout.subMenu.onlySubheader.path,
// 		element: <PAGE_LAYOUTS.SUBHEADER />,
// 		exact: true,
// 	},
// 	{
// 		path: layoutMenu.pageLayout.subMenu.onlyContent.path,
// 		element: <PAGE_LAYOUTS.CONTENT />,
// 		exact: true,
// 	},
// 	{
// 		path: layoutMenu.asideTypes.subMenu.defaultAside.path,
// 		element: <PAGE_LAYOUTS.ASIDE />,
// 		exact: true,
// 	},
// 	{
// 		path: layoutMenu.asideTypes.subMenu.minimizeAside.path,
// 		element: <PAGE_LAYOUTS.MINIMIZE_ASIDE />,
// 		exact: true,
// 	},
// ];
// const documentation = [
// 	/**
// 	 * Bootstrap
// 	 */

// 	/**
// 	 * Content
// 	 */
// 	{
// 		path: componentsMenu.content.path,
// 		element: <CONTENT.CONTENTS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.content.subMenu.typography.path,
// 		element: <CONTENT.TYPOGRAPHY />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.content.subMenu.images.path,
// 		element: <CONTENT.IMAGES />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.content.subMenu.tables.path,
// 		element: <CONTENT.TABLES />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.content.subMenu.figures.path,
// 		element: <CONTENT.FIGURES />,
// 		exact: true,
// 	},

// 	/**
// 	 * Forms
// 	 */
// 	{
// 		path: componentsMenu.forms.path,
// 		element: <FORMS_PAGE.FORMS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.forms.subMenu.formGroup.path,
// 		element: <FORMS_PAGE.FORM_GROUP />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.forms.subMenu.formControl.path,
// 		element: <FORMS_PAGE.FORM_CONTROLS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.forms.subMenu.select.path,
// 		element: <FORMS_PAGE.SELECT />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.forms.subMenu.checksAndRadio.path,
// 		element: <FORMS_PAGE.CHECKS_AND_RADIO />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.forms.subMenu.range.path,
// 		element: <FORMS_PAGE.RANGE />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.forms.subMenu.inputGroup.path,
// 		element: <FORMS_PAGE.INPUT_GROUP />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.forms.subMenu.validation.path,
// 		element: <FORMS_PAGE.VALIDATION />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.forms.subMenu.wizard.path,
// 		element: <FORMS_PAGE.WIZARD />,
// 		exact: true,
// 	},

// 	/**
// 	 * Components
// 	 */
// 	{
// 		path: componentsMenu.components.path,
// 		element: <COMPONENTS_PAGE.COMPONENTS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.tooltip.path,
// 		element: <COMPONENTS_PAGE.TOOLTIP />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.toasts.path,
// 		element: <COMPONENTS_PAGE.TOASTS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.scrollspy.path,
// 		element: <COMPONENTS_PAGE.SCROLLSPY />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.carousel.path,
// 		element: <COMPONENTS_PAGE.CAROUSEL />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.spinners.path,
// 		element: <COMPONENTS_PAGE.SPINNER />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.listGroup.path,
// 		element: <COMPONENTS_PAGE.LIST_GROUP />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.breadcrumb.path,
// 		element: <COMPONENTS_PAGE.BREADCRUMB />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.collapse.path,
// 		element: <COMPONENTS_PAGE.COLLAPSE />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.pagination.path,
// 		element: <COMPONENTS_PAGE.PAGINATION />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.progress.path,
// 		element: <COMPONENTS_PAGE.PROGRESS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.card.path,
// 		element: <COMPONENTS_PAGE.CARD />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.button.path,
// 		element: <COMPONENTS_PAGE.BUTTON />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.buttonGroup.path,
// 		element: <COMPONENTS_PAGE.BUTTON_GROUP />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.alert.path,
// 		element: <COMPONENTS_PAGE.ALERT />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.badge.path,
// 		element: <COMPONENTS_PAGE.BADGE />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.popovers.path,
// 		element: <COMPONENTS_PAGE.POPOVERS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.dropdowns.path,
// 		element: <COMPONENTS_PAGE.DROPDOWN />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.accordion.path,
// 		element: <COMPONENTS_PAGE.ACCORDION />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.modal.path,
// 		element: <COMPONENTS_PAGE.MODAL />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.navsTabs.path,
// 		element: <COMPONENTS_PAGE.NAVS_TABS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.offcanvas.path,
// 		element: <COMPONENTS_PAGE.OFF_CANVAS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.components.subMenu.table.path,
// 		element: <COMPONENTS_PAGE.TABLE />,
// 		exact: true,
// 	},

// 	/**
// 	 * Utilities
// 	 */
// 	{
// 		path: componentsMenu.utilities.path,
// 		element: <UTILITIES.UTILITIES />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.api.path,
// 		element: <UTILITIES.API />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.background.path,
// 		element: <UTILITIES.BACKGROUND />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.borders.path,
// 		element: <UTILITIES.BORDERS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.colors.path,
// 		element: <UTILITIES.COLORS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.display.path,
// 		element: <UTILITIES.DISPLAY />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.flex.path,
// 		element: <UTILITIES.FLEX />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.float.path,
// 		element: <UTILITIES.FLOAT />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.interactions.path,
// 		element: <UTILITIES.INTERACTIONS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.overflow.path,
// 		element: <UTILITIES.OVERFLOW />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.position.path,
// 		element: <UTILITIES.POSITION />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.shadows.path,
// 		element: <UTILITIES.SHADOWS />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.sizing.path,
// 		element: <UTILITIES.SIZING />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.spacing.path,
// 		element: <UTILITIES.SPACING />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.text.path,
// 		element: <UTILITIES.TEXT />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.verticalAlign.path,
// 		element: <UTILITIES.VERTICAL_ALIGN />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.utilities.subMenu.visibility.path,
// 		element: <UTILITIES.VISIBILITY />,
// 		exact: true,
// 	},

// 	/**
// 	 * Extra
// 	 */

// 	/**
// 	 * Icons
// 	 */
// 	{
// 		path: componentsMenu.icons.path,
// 		element: <ICONS.ICONS_LIST />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.icons.subMenu.icon.path,
// 		element: <ICONS.ICON />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.icons.subMenu.material.path,
// 		element: <ICONS.MATERIAL />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.icons.subMenu.bootstrapIcon.path,
// 		element: <ICONS.BOOTSTRAP />,
// 		exact: true,
// 	},

// 	/**
// 	 * Charts
// 	 */
// 	{
// 		path: componentsMenu.charts.path,
// 		element: <CHARTS_PAGE.CHART_LIST />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsUsage.path,
// 		element: <CHARTS_PAGE.GENERAL_USAGE />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsSparkline.path,
// 		element: <CHARTS_PAGE.SPARKLINE />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsLine.path,
// 		element: <CHARTS_PAGE.LINE />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsArea.path,
// 		element: <CHARTS_PAGE.AREA />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsColumn.path,
// 		element: <CHARTS_PAGE.COLUMN />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsBar.path,
// 		element: <CHARTS_PAGE.BAR />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsMixed.path,
// 		element: <CHARTS_PAGE.MIXED />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsTimeline.path,
// 		element: <CHARTS_PAGE.TIMELINE />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsCandleStick.path,
// 		element: <CHARTS_PAGE.CANDLESTICK />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsBoxWhisker.path,
// 		element: <CHARTS_PAGE.BOX_WHISKER />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsPieDonut.path,
// 		element: <CHARTS_PAGE.PIE_DONUT />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsRadar.path,
// 		element: <CHARTS_PAGE.RADAR />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsPolar.path,
// 		element: <CHARTS_PAGE.POLAR />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsRadialBar.path,
// 		element: <CHARTS_PAGE.RADIAL_BAR />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsBubble.path,
// 		element: <CHARTS_PAGE.BUBBLE />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsScatter.path,
// 		element: <CHARTS_PAGE.SCATTER />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsHeatMap.path,
// 		element: <CHARTS_PAGE.HEAT_MAP />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.charts.subMenu.chartsTreeMap.path,
// 		element: <CHARTS_PAGE.TREE_MAP />,
// 		exact: true,
// 	},

// 	{
// 		path: componentsMenu.notification.path,
// 		element: <EXTRA.NOTIFICATION />,
// 		exact: true,
// 	},
// 	{
// 		path: componentsMenu.hooks.path,
// 		element: <EXTRA.HOOKS />,
// 		exact: true,
// 	},
];

const contents = [...presentation];

export default contents;
