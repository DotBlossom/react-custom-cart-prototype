
import React, {useRef} from 'react';
import axios from 'axios';


export default function AsyncPropagationsPage() {

  const invokeRef = useRef(false);
 
  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/ai-api/inference/result/1`
      );
      console.log('first is on');
      invokeRef.current = response.data;
      // response.data는 object 형임. 잘 담김.
    } catch (e) {
      console.log(e);
    }
    invoke_server(invokeRef);
  };
  
  const invoke_server = async (req) => {
    try {
      console.log(req.current);
      const mx = req.current.id;
      // if id == 10 -> retrieved by first data 가져옴

      const response = await axios.get(`http://localhost:5050/ai-api/user/${mx}`);
      console.log(response.data);
      console.log("invoked");
      
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="App">
      <button onClick={handleSubmit}>Submit</button>
      <p>t</p>
    </div>
  );
}

