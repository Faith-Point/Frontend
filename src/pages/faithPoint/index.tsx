import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const FaithPoint: React.FC = () => {
  const { token } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('token', token);
        const response = await axios.get('/faithPoint', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('response', response);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Faith Point Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default FaithPoint;
