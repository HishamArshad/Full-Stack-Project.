import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { getTokenFromLocalStorageqs } from './localstream';
import { getTokenFromLocalStorageq } from './localuser';
const  userID = getTokenFromLocalStorageq()
 
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import {  useChatContext, useChannelStateContext} from 'stream-chat-react';
import './custom.css';
const CustomChannelHeader = ({ title, setValue }) => {
  const { channel } = useChannelStateContext();
  const { name } = channel.data || {};

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Store the input value in localStorage
    localStorage.setItem('inputValue', inputValue);
  };
  localStorage.setItem('inputValue', '1');
  return (
    <div className='str-chat__header-livestream'>
      <div>
        <div className='header-item'>
          <span className='header-pound'>#</span>
          {title || name}
        </div>
        { userID === '2' ? (
        <div className=''>
          <input type='text' onChange={handleInputChange}></input>
          <button type='btn'>Heellooo</button>
        </div>
        ) : null

}
      </div>
    </div>
  );
};



const CustomPreview = (props) => {
  const { channel, setActiveChannel } = props;
  const { channel: activeChannel } = useChatContext();
  const [newMessageCount, setNewMessageCount] = useState(0);

  const selected = channel?.id === activeChannel?.id;

  useEffect(() => {
    const handleNewMessage = (event) => {
      // Increment the new message count whenever a new message arrives
      setNewMessageCount((prevCount) => prevCount + 1);
    };

    // Attach the event listener for new messages
    channel.on('message.new', handleNewMessage);

    // Cleanup the event listener on component unmount
    return () => {
      channel.off('message.new', handleNewMessage);
    };
  }, [channel]);

  const renderMessageText = () => {
    const lastMessageText = channel.state.messages[channel.state.messages.length - 1].text;
    return lastMessageText.length < 60 ? lastMessageText : `${lastMessageText.slice(0, 70)}...`;
  };
  const chan = channel.data.id
  if (!channel.state.messages.length) return null;
  const handleClick = () => {
    localStorage.setItem('inputValue', chan);
    // Reload the current page without using the cache
window.location.reload(true);

  }
  return (
    <div
      className={selected ? 'channel-preview__container selected' : 'channel-preview__container'}
      onClick={() => setActiveChannel(channel)}
    >
      <div className='channel-preview__content-wrapper'>
        <div className='channel-preview__content-top'>
          <p onClick={handleClick}  className='channel-preview__content-name'>
            {channel.data.id}-{channel.data?.name || 'Channel'}
            {userID === '2' ? null : userID}
          </p>
          <p className='channel-preview__content-name'>{channel.data?.subtitle}</p>
        </div>
        <p className='channel-preview__content-message'>{renderMessageText()}</p>
      </div>

      {newMessageCount > 0 && (
        <div className='notification-badge bg-red-700 w-6 h-6 flex justify-center items-center rounded-full text-white'>
          <p>{newMessageCount}</p>
        </div>
      )}
    </div>
  );
};
 
const filters = { type: 'messaging' };
const options = { state: true, presence: true, limit: 10 };
const sort = { last_message_at: -1 };
 
const App = () => {
  const [client, setClient] = useState(null);
   
  const user_id = getTokenFromLocalStorageq()
  const user_id1 = `${user_id}`
  console.log(user_id)
  const token = getTokenFromLocalStorageqs()
  console.log(token)
  const [value, setValue] = useState("3")
  console.log(value)
  useEffect(() => {
    const newClient = new StreamChat('tz527y8undgk');
 
  
    const handleConnectionChange = ({ online = false }) => {
      if (!online) return console.log('connection lost');
      setClient(newClient);
    };
  
    newClient.on('connection.changed', handleConnectionChange);
  
    newClient.connectUser(
      {
        id: `${user_id}`,
        name: user_id,
      },
      token,
    );
  
    return () => {
      newClient.off('connection.changed', handleConnectionChange);
      newClient.disconnectUser().then(() => console.log('connection closed'));
    };
  }, []);
  const userIds = Array.from(new Set([`${user_id}`, '2']));
  console.log(userIds)
  const vals = localStorage.getItem('inputValue')
  console.log(vals, "test")
  const channelID = user_id1 === '2' ? vals : `${user_id}`
  console.log(userIds)
  const channel = client?.channel('messaging', channelID, {
    image: '',
    name: 'Create a Messaging',
    members: userIds,
  });

  
  if (!client) return null;
  
  return (
    <div>
         <localSearch propse={setValue} />
    <Chat client={client}>
      { userID === '2' ? (
      <ChannelList filters={filters} sort={sort} options={options} Preview={CustomPreview} showChannelSearch />
      ) : null  
    }
      <Channel   channel={channel}>
        <Window>
          <CustomChannelHeader setValue={setValue}/>
          <MessageList />
          <MessageInput />
        
        </Window>
        <Thread />
      </Channel>
      
    </Chat>
 
    </div>
  );
}
export default App