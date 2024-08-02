import React, {useState, useEffect} from 'react';

const Homepage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/items')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div>
      hello! homepage

      {data.map(item => (
        <div key={item.id}>{item.name}, {item.description}</div>
      ))}
    </div>
  );
}

export default Homepage;
