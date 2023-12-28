import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Check = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/my-posts', {
          headers: {
            Authorization: 'Token d77cf0791b4c11251a7de4f2ae1ef53a4f99a842',
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          {data.map(item => (
            <div key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
              <p>Created at: {item.created_at}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Check;
