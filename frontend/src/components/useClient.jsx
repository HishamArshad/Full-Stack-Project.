import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

export const useClient = ({ apiKey, user, tokenOrProvider }) => {
  const [chatClient, setChatClient] = useState();

  useEffect(() => {
    const client = new StreamChat(apiKey);
    // prevents application from setting stale client (user changed, for example)
    let didUserConnectInterrupt = false;

    const connectionPromise = client.connectUser(user, tokenOrProvider).then(() => {
      if (!didUserConnectInterrupt) {
        setChatClient(client);
      }
    });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(undefined);
      // wait for connection to finish before initiating closing sequence
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log('connection closed');
        });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- should re-run only if user.id changes
  }, [apiKey, user.id, tokenOrProvider]);

  return chatClient;
};
