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
import Popup from '../../../components/Popup';
import {Message} from '../../../contexts/Message';
import Select, { MultiValue } from "react-select";


import '../../../components/Popup.css';

import useDarkMode from '../../../hooks/useDarkMode';


import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Chat, { ChatAvatar, ChatGroup, ChatListItem } from '../../../components/Chat';
import InputGroup from '../../../components/bootstrap/forms/InputGroup';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import USERS, { IUserProps } from '../../../contexts/UserData';
import { IConversation, MultiUserConversation } from '../../../contexts/Conversation';

import Icon from '../../../components/icon/Icon';
import ThemeContext from '../../../contexts/themeContext';
import CommonChatStatus from '../../common/CommonChatStatus';
import UserImage6 from '../../../assets/img/wanna/wanna6.png';
import UserImage6Webp from '../../../assets/img/wanna/wanna6.webp';
import axios from 'axios';
import { FormikHelpers, useFormik, useFormikContext } from 'formik';
import Input from '../../../components/bootstrap/forms/Input';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import { getLineAndCharacterOfPosition } from 'typescript';

const WithListChatPage = () => {
	const navigate = useNavigate();

	const [teamUsers, setteamUsers] = useState(Array<IUserProps>);

	const [memberGroupIds, setMemberGroupIds] = useState(Array<number>);

	const [userOptions, setuserOptions] = useState([]);

	const [selectedUserOptions, setselectedUserOptions] = useState([]);

	const [channelUsers, setchannelUsers] = useState(new Set());

	const [buttonPopup, setbuttonPopup] = useState(false);

	useEffect(() => {
		if(!buttonPopup){
			setselectedUserOptions([]);
		}
	}, [buttonPopup])

	function createUser(data_item){
		const newUser : IUserProps = {isOnline: data_item.status == 1 ? true : false,
									  uid: data_item.user,
									  name: data_item.name};
		return newUser;
	};

	const fetchUsers = useCallback(async () => {
		const res = await axios.get('https://api.heynova.work/team/user/get?team_id=1');
		if(res.status == 200)
			{
				setteamUsers(res.data.users.filter((item) => item.user != uid).map((item) => createUser(item)));
				setChat(Object.fromEntries(res.data.users.map((u) => [u.user, []])));
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

	  const fetchGroupids = useCallback(async () => {
		const res = await axios.get('https://api.heynova.work/chat/user/group/get?user_id=' + uid);
		if(res.status == 200)
			{
				setMemberGroupIds(res.data);
			}
		else
			{setMemberGroupIds(Array());}
	  }, []);

	useEffect(() => {
		setChat({1: [new Message(1,'hello', 1), new Message(2,'hi', 3)]});
		const nu : IUserProps = {isOnline:true, uid: "1", name: "admin"};
		setActiveTab(new MultiUserConversation(1, 'group', 1, [new Message(1,'hello', 1), new Message(2,'hi', 3)], [
			    nu
		]));
		if (teamUsers.length === 0) {
			fetchUsers().catch((error) => {console.log(error);});
		} else {
			setteamUsers(Array());
		}

		if (memberGroupIds.length === 0) {
			fetchGroupids().catch((error) => {console.log(error);});
		} else {
			setteamUsers(Array());
		}

	}, [fetchUsers, fetchGroupids]);

	useEffect(() => {
		const opts = teamUsers.map((c) => ({value:c.name, label:c.name, uid:c.uid}));
		setuserOptions(opts);
		//if(teamUsers[0] != undefined)
		//	setActiveTab(new MultiUserConversation(1,[new Message(1,'hello', 1), new Message(2,'hi', 3)],[teamUsers[0]]));
	}, [teamUsers]);

	const [uid] = useState<string>(localStorage.getItem('facit_authUid') || '');

	function sendMessage(msg: string){
		axios.post('https://api.heynova.work/chat/group/post', 
		{
			"group_id": activeTab.groupid,
			"user_id": uid,
			"text_line": msg
		})
		.then(response => {
			if(response.status == 200)
			{ 
				const newMsg = Object.entries(chat).map((k,v) => {k : k == activeTab.users[0].uid ? v.concat([
																			new Message(3, msg, parseInt(uid))]): v})
				setChat(newMsg);
			}
			})
			.catch(error => {console.log(error); }); 
	}

	const [activeTab, setActiveTab] = useState<IConversation>();

	const [message, setMessage] = useState('');

	const [chat, setChat] = useState<{}>();

	const { mobileDesign } = useContext(ThemeContext);
	const [listShow, setListShow] = useState<boolean>(true);

    const handleMessageChange = (event) => {
		setMessage(event.target.value);
	  };
	
	const { themeStatus, darkModeStatus } = useDarkMode();
		
	const [newChannel, setnewChannel] = useState(false); // Sent and received messages
    
	const getListShow = (users: IUserProps[], group_name: string, groupid: number = -1 ) => {
		// for(let el of Object.keys(chat))
		// 	if(el.users === users)
		//
		if(groupid != -1) 	
			{	
			setChat({1: [new Message(1,'hello', 1), new Message(2,'hi', 3)]});
			// setActiveTab(new MultiUserConversation(1, chat[users[0].uid].map((jmes,i) => new Message(i, jmes['chat_line'], jmes['sender'])),
			// 													[teamUsers[0]]));
			setActiveTab(new MultiUserConversation(1, group_name, groupid, [new Message(1,'hello', 1), new Message(2,'hi', 3)], users));
			// if (mobileDesign) {
			// 	setListShow(false);c
			// }
			}
		else{
			axios.post('https://api.heynova.work/chat/group/get', 
					{
					"group_id": groupid
					})
				.then(response => {
						if(response.status == 200)
							setActiveTab(new MultiUserConversation(1, group_name, groupid, response.data.map((u) => (new Message(1,'hello', 1))), users));
				})
				.catch(error => {console.log(error); }); 
		}
	};

	const formik = useFormik({
		onSubmit: (values) => {
			axios.post('https://api.heynova.work/chat/group/add', 
		{
			"group_name": values.channelName,
		})
		.then(response => {
			if(response.status == 200)
			{ 
				let gid = response.data
				let us = values.teamMembers.map(i => i.uid).concat([parseInt(uid)])
				axios.post('https://api.heynova.work/chat/group/user/add/list', 
					{
						"group_id": gid,
						"users": us
					})
				.then(response => {
						if(response.status == 200)
							getListShow(values.teamMembers, values.channelName, gid);
				})
				.catch(error => {console.log(error); }); 
			}
			})
			.catch(error => {console.log(error); });
		},
		initialValues: {
			channelName: '',
		    description: '',
			teamMembers: []
		},
		
	});

	const handleChangeSelected = (e: MultiValue<IUserProps>): void => {
		setselectedUserOptions(e.map((item) => item));
	  };

	const [searchedName, setsearchedName] = useState("");

	function createGroup(users, groupname=''){
		axios.post('https://api.heynova.work/chat/group/add', 
		{
			"group_name": groupname,
		})
		.then(response => {
			if(response.status == 200)
			{ 
				let gid = response.data
				axios.post('https://api.heynova.work/chat/group/user/add/list', 
					{
						"group_id": gid,
						"users": users.map(i => i.uid).concat([uid])
					})
				.then(response => {
						if(response.status == 200)
							getListShow(users, groupname, gid);
				})
				.catch(error => {console.log(error); }); 
			}
			})
			.catch(error => {console.log(error); }); 
	}

    
	function handleSearch(event){
		setsearchedName(event.target.value);
	}

	function updateChat(data, puid){
		const newChat = { ...chat, puid : chat[puid].concat(data) };
		setChat(newChat);
	}

	const subscribe = async () => {
		for(let u of teamUsers) {
		const event = new EventSource("https://api.heynova.work/chat/get?id1=" + uid + '&id2=' + u.uid);
		event.onmessage = event => {
			const parsedData = JSON.parse(event.data);
			updateChat(parsedData, u.uid);
		};
	}
	};
	
	useEffect(() => {
		subscribe();
	}, [teamUsers]);

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
				<Popup start_chat={true} trigger={buttonPopup} setTrigger={setbuttonPopup}>
									<div
										className={`md:bg-gray-200 w-fit md:px-2 py-[2.9px]  rounded-sm text-sm`}
										>
														To:
													</div>
													<Select
														value={selectedUserOptions}
														onChange={(e: MultiValue<IUserProps>) => {handleChangeSelected(e)}}
														isClearable={false}
														className="text-sm custom-select"
														closeMenuOnSelect={false}
														defaultValue={[]}
														isMulti
														options={userOptions}
														placeholder="Select Users"
														//@ts-ignore
														components={{
															DropdownIndicator: () => null,
															IndicatorSeparator: () => null,
														}}
														styles={{
															multiValue: (base) => ({
															...base,
															backgroundColor: "#e9ecef",
															}),
															container: (base) => ({
															...base,
															width: "100%",
															}),
															menuList: (base) => ({
															...base,
															maxWidth: 300,
															}),
														}}
														/>
													
													   {/* <div className="name-list-container">
														{teamUsers.filter((user) => user.name.toLowerCase().includes(PopupsearchedName.toLowerCase()))
														.map((user) =>
																<div style={{background: channelUsers.has(user) ? 'primary' : 'second'}}>
																{user.name}
																</div>)} </div> */}

													<div className="row">
														<div className="col-6">
															<Button style = {{width:200}}
																	className="button"
																	onClick={() => {
																		setbuttonPopup(false);
																		createGroup(selectedUserOptions);
																	}}>
																	Start chatting!
																</Button>
															</div>
														</div>
												</Popup>
					{(listShow || !mobileDesign) && (
						<div className='col-lg-4 col-md-6'>
							<Card stretch className='overflow-hidden'>
								<CardBody isScrollable className='p-0'>
									<Card shadow='none' className='mb-0'>
										<CardHeader className='sticky-top'>
											<CardLabel icon='AccountCircle' iconColor='success'>
												<Button onClick={() => 
													{setbuttonPopup(true);}
													}>New Chat</Button>
											</CardLabel>
											<Button onClick={() => setnewChannel(true)}>New Channel</Button>
										</CardHeader>
										<CardBody className='border-bottom border-light'>
											<div className='row'>
												{ teamUsers
												   .filter(user => user.isOnline)
												   .map((user) => (
												<ChatListItem
													onClick={() => getListShow([user], user.name)}
													isActive={activeTab.users.length == 1 && activeTab.users[0] === user}
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
										</CardHeader>
										<CardBody>
											<div className='row'>
											{ teamUsers
											    .filter(user => !user.isOnline)
											    .map((user) => (
												<ChatListItem
													onClick={() => getListShow([user], user.name)}
													isActive={false}
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
											{/* <ChatAvatar
												// eslint-disable-next-line react/jsx-props-no-spreading
												{...activeTab}
												className='me-3'
											/> */}
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
											activeTab.messages.map((msg) => (
												<ChatGroup
													key={activeTab.name}
													messages={[msg]}
													user={activeTab.users[0]}
													isReply={String(msg.senderid) === uid}
												/>
											))}
									</Chat>
								</CardBody>
								<CardFooter className='d-block'>
									<InputGroup>
										<Textarea value={message} onChange={handleMessageChange}/>
										<Button color='info' icon='Send' onClick={() => sendMessage(message)}>
											Send
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
