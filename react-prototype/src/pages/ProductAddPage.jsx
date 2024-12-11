import { useRef } from "react";
import axios from "axios";

export default function ProductAddPage() {
  const invokeRef = useRef(false);

  const price = 20000;
  const color = "brown";

  const handleSubmit = async () => {
    // JSON 데이터를 문자열로 추가
    const productRequest = {
      name: "24 겨울 신상 아디다스 맨투맨 브라운 기모",
      price,
      stock: 1,
      textInformation: "description",
      category: "상의",
      color,
    };

    // Axios POST 요청
    const response = await axios.post(
      `http://localhost:5050/ai-api/inference/1`,
      productRequest,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "*",
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',
          "Accept": "application/json",

        },

      }
    );
    
    console.log(response.data);
    invokeRef.current = response.data;
    invoke_server(invokeRef);
  };



  // INVOKE
  const invoke_server = async (req) => {
    const parsedReq = req.current;
    let body = {
      "product_id": parsedReq.code,
      "product": {
        "product_name": parsedReq.name,
        "product_categoty": parsedReq.category,
        "product_price": parsedReq.price,
        "product_thumbnail": parsedReq.thumbnail,
        "product_stock": parsedReq.stock,
      },
    };

    try {
      const response = await axios.post(
        `/`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
          
        }
      );
      console.log(response.data);
      console.log("success");
    } catch (e) {
      console.log("invoke error", e);
    }
  };


return (
  <div className="App">
    <button onClick={handleSubmit}>Submit</button>
    <p>t</p>
  </div>
);

}