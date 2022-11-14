import React, { SetStateAction, useCallback, useContext, useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Chat, { ChatAvatar, ChatGroup, ChatListItem } from '../../../components/Chat';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import USERS, { IUserProps } from '../../../contexts/UserData';
import Icon from '../../../components/icon/Icon';
import ThemeContext from '../../../contexts/themeContext';
import CHATS, { IMessages } from '../../../common/data/chatDummyData';
import CommonChatStatus from '../../common/CommonChatStatus';
import UserImage6 from '../../../assets/img/wanna/wanna6.png';
import UserImage6Webp from '../../../assets/img/wanna/wanna6.webp';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from 'axios';
import { FormikHelpers, useFormik, useFormikContext } from 'formik';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';

const WithListChatPage = () => {
	const navigate = useNavigate();

	const TABS: { [key: string]: IUserProps } = {
		CHLOE: USERS.CHLOE,
		GRACE: USERS.GRACE,
		JANE: USERS.JANE,
		RYAN: USERS.RYAN,
		ELLA: USERS.ELLA,
		SAM: USERS.SAM,
	};

	const [teamUsers, setteamUsers] = useState(Array<IUserProps>);

	const [channelUsers, setchannelUsers] = useState(new Set());

	function createUser(data_item){
		const newUser : IUserProps = {isOnline: data_item.status == 1 ? true : false,
									  uid: data_item.uid,
									  name: data_item.name};
		return newUser;
	};

	const fetchUsers = useCallback(async () => {
		const res = await axios.get('https://api.heynova.work/team/user/get?team_id=1');
		if(res.status == 200)
			{
				setteamUsers(res.data.users.map((item) => createUser(item)));
				setChat(Object.fromEntries(res.data.users.map((u) => [u, []])));
			}
		else
			{setteamUsers(Array());}
	  }, []);
	
	function toggleChannelUser(user){
		if(!channelUsers.has(user))
			{
				setchannelUsers(new Set(Array.from(channelUsers.values()).concat([user])));}
		else
			{
				setchannelUsers(new Set(Array.from(channelUsers.values()).filter((u) => u != user)));}
	}

	useEffect(() => {
		if (teamUsers.length === 0) {
			fetchUsers().catch((error) => {console.log(error);});
		} else {
			setteamUsers(Array());
		}
	}, [fetchUsers]);

	const [uid] = useState<string>(localStorage.getItem('facit_authUid') || '');

	function sendMessage(msg:string){
		axios.post('https://api.heynova.work/chat/post', 
		{
			"chat_sender": uid,
			"chat_receiver": activeTab.uid,
			"chat_line": msg
		})
		.then(response => {
			if(response.status == 200)
			{ 
				const newMsg = Object.entries(chat).map((k,v) => {k : k == activeTab.uid ? v.concat([msg]) : v})
				//messages[activeTab.uid].append({"message": msg, "id": uid});
				setChat(newMsg);
			}
			})
			.catch(error => {console.log(error); }); 
	}

	const [activeTab, setActiveTab] = useState<IUserProps | SetStateAction<null>>(TABS.CHLOE);

	const [message, setMessage] = useState('');

	const { mobileDesign } = useContext(ThemeContext);
	const [listShow, setListShow] = useState<boolean>(true);

    const handleMessageChange = (event) => {
		setMessage(event.target.value);
	  };	  
		
	const [newChannel, setnewChannel] = useState(false); // Sent and received messages
    
	const getListShow = (TAB_NAME: IUserProps | SetStateAction<null>) => {
		setActiveTab(TAB_NAME);
		if (mobileDesign) {
			setListShow(false);
		}
	};

	const formik = useFormik({
		onSubmit: () => {},
		initialValues: {
			channelName: '',
		    description: '',
			teamMembers: []
		},
	});
	// useEffect(() => {
	// 	const ws = new WebSocket("");

	// 	const apiCall = {
	// 		event: "bts:subscribe",
	// 		data: { channel: "order_book_btcusd" },
	// 	};
		
	// 	ws.onopen = (event) => {
	// 		ws.send(JSON.stringify(apiCall));
	// 	};
	
	// 	ws.onmessage = function (event) {
	// 		const json = JSON.parse(event.data);
	// 		try {
	// 			if ((json.event = "data")) {
	// 				setMessages(json.data.messages);
	// 			}
	// 		} catch (err) {
	// 			console.log(err);
	// 		}
	// 	};}, []);

	const [searchedName, setsearchedName] = useState("");
    
	function handleSearch(event){
		setsearchedName(event.target.value);
	}

	const statusMessage = {
		subscribed: "Subscribed",
		unsubscribed: "Unsubscribed"
	  };
	
	const [listening, setListening] = useState(false);

	const [chat, setChat] = useState({});

	function updateChat(conv, uid2){
		const newChat = Object.entries(chat).map(([k,v]) => k == uid2 ? conv : v);
		setChat(newChat);
	}

	const subscribe = async () => {
		const status = listening;
		if (!status) {
		   for(let u of teamUsers) {
				const events = new EventSource("https://api.heynova.work/chat/get/id1=" + uid + 'id2=' + u.uid);
				events.onmessage = event => {
					const parsedData = JSON.parse(event.data);
					updateChat(parsedData, u.uid);
		   };
		}
		} else {
		  //await axios.delete(`http://localhost:8000/closes/${process}`)
		}
		setListening(!listening);
	  };

	return (
		//<PageWrapper title={demoPages.chat.subMenu.withListChat.text}>
		<PageWrapper title=''>
			<SubHeader>
				<SubHeaderLeft>
					<span>
						<Icon icon='Info' className='me-2' size='2x' color='danger' />
						<span className='text-muted'>
							You have <Icon icon='Chat5' color='danger' className='mx-1' size='lg' />{' '}
							14 unread messages.
						</span>
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonChatStatus />
					{!listShow && (
						<Button
							color='info'
							isLight
							icon='ChevronLeft'
							onClick={() => {
								setListShow(true);
							}}>
							Back to List
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					{(listShow || !mobileDesign) && (
						<div className='col-lg-4 col-md-6'>
							<Card stretch className='overflow-hidden'>
								<CardBody isScrollable className='p-0'>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon='AccountCircle' iconColor='success'>
												<Button>New Chat</Button>
											</CardLabel>
											<Button onClick={() => setnewChannel(true)}>New Channel</Button>
										</CardHeader>
										<CardBody className='border-bottom border-light'>
											<div className='row'>
												{ teamUsers
												   .filter(user => user.isOnline)
												   .map((user) => (
												<ChatListItem
													onClick={() => getListShow(TABS.CHLOE)}
													isActive={activeTab === TABS.CHLOE}
													src={UserImage6}
													srcSet={UserImage6Webp}
													name={user.name}
													isOnline={true}
													color={"light"}
													lastSeenTime={moment()
														.add(-1, 'week')
														.fromNow()}
													latestMessage={
														"I think it's really starting to shine."
													}
												/>))}
											</div>
										</CardBody>
									</Card>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon='AccountCircle' iconColor='danger'>
												<CardTitle>Offline</CardTitle>
												<CardSubTitle>
													{teamUsers.filter(user => !user.isOnline).length} users</CardSubTitle>
											</CardLabel>
										</CardHead
										<CardBody>
											<div className='row'>
											{ teamUsers
											    .filter(user => !user.isOnline)
											    .map((user) => (
												<ChatListItem
													onClick={() => getListShow(user)}
													isActive={activeTab === user}
													src={UserImage6}
													srcSet={UserImage6Webp}
													name={user.name}
													isOnline={true}
													color={"light"}
													lastSeenTime={moment()
														.add(-1, 'week')
														.fromNow()}
													latestMessage={
														"I think it's really starting to shine."
													}
												/>))}
											</div>
										</CardBody>
									</Card>
								</CardBody>
								<CardFooter>
									<CardFooterLeft className='w-100'>
										{/* <Button
											icon='Logout'
											color='danger'
											isLight
											className='w-100 p-3'
											onClick={() => navigate(`../${pages.login.path}`)}>
											Logout
										</Button> */}
									</CardFooterLeft>
								</CardFooter>
							</Card>
						</div>
					)}
					{(!listShow || !mobileDesign) && (
						<div className='col-lg-8 col-md-6'>
							  {newChannel ? ( 
								<Card stretch>
								<CardHeader>
									<CardTitle>Create a Channel</CardTitle>
								</CardHeader>
								<CardBody>
								<div className='row md-4'>
									<div className='col-6'>
										<FormGroup id='channelName' label='Channel Name'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.channelName}
												placeholder={'Channel name'}
											/>
										</FormGroup>
									</div>
								</div>
								<br /> 
								<div className='row md-4'>
									<div className='col-6'>
										<FormGroup id='description' label='Description'>
											<Input
												onChange={formik.handleChange}
												value={formik.values.description}
												placeholder={'Add description'}
											/>
										</FormGroup>
									</div>
								</div>
								<br /> 
								<div className='row md-4'>
									<div className='col-6'>
								<Dropdown>
									<DropdownToggle hasIcon={false}>
											<Input placeholder='Add team members'
													value = {searchedName}
													onChange={handleSearch}> 
											 </Input>
										</DropdownToggle>
											<DropdownMenu>
								   			{teamUsers.filter((user) => user.name.toLowerCase().includes(searchedName.toLowerCase()))
								  			  .map((user) =>
												<DropdownItem onClick={() => toggleChannelUser(user)}>
														<div style={{background: channelUsers.has(user) ? 'primary' : 'second'}}>
														   {user.name}
														</div>
													</DropdownItem> )}
											</DropdownMenu>
										</Dropdown>
								</div>
								</div>
								<div className='row m-0'>
									<div className='col-6 p-3'>
										<Button
											color='info'
											className='w-100'
											onClick={() => {formik.handleSubmit()}}>
											Save
										</Button>
									</div>
								</div>
								</CardBody>
								</Card>)
								: 
								(
								<Card stretch>
								<CardHeader>
									<CardActions>
										<div className='d-flex align-items-center'>
											<ChatAvatar
												// eslint-disable-next-line react/jsx-props-no-spreading
												{...activeTab}
												className='me-3'
											/>
											<div className='fw-bold'>
												{activeTab
													? `${'name' in activeTab && activeTab.name}`
													: ''}
											</div>
										</div>
									</CardActions>
								</CardHeader>
								<CardBody isScrollable>
									<Chat>
										{activeTab && 
											// @ts-ignore
											(activeTab.uid in chat ? 
											chat[activeTab.uid].map((msg) => (
												<ChatGroup
													key={String(msg.messages)}
													messages={msg.messages}
													user={msg.user}
													isReply={msg.isReply}
												/>
											)) : (<></>)
											)}
									</Chat>
								</CardBody>
								<CardFooter className='d-block'>
									<InputGroup>
										<Textarea value={message} onChange={handleMessageChange}/>
										<Button color='info' icon='Send' onClick={() => sendMessage(message)}>
											SEND
										</Button>
									</InputGroup>
								</CardFooter> 
								</Card>
							)}
						</div>)}
				   </div>
			</Page>
		</PageWrapper>
	);
};

export default WithListChatPage;
