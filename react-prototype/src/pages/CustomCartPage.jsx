import { useState, useRef, useEffect } from "react";
import "./temp.css";
import test1 from "src/assets/test1.png";
import test2 from "src/assets/test2.png";
import test3 from "src/assets/test3.png";



// STOCK_PRICE 배열
const STOCK_PRICE = [
  { id: 1, name: "Item 1", price: 1000, image: test1 },
  { id: 2, name: "Item 2", price: 2000, image: test2 },
  { id: 3, name: "Item 3", price: 3000, image: test3 },
];


function CustomCartPage() {
  const [targets, setTargets] = useState([]);
  const targetBoxRef = useRef(null);
  const [box, setBox] = useState({ top: 0, left: 0, bottom: 0, right: 0 });

  let posX = 0;
  let posY = 0;
  let originalX = 0;
  let originalY = 0;

  useEffect(() => {
    const updateBox = () => {
      const box = targetBoxRef.current.getBoundingClientRect();
      setBox({
        top: box.top,
        left: box.left,
        bottom: box.top + box.height,
        right: box.left + box.width,
      });
    };

    // 초기 렌더링 시 box 좌표 계산
    updateBox();

    // 창 크기 변경 시 box 좌표 업데이트
    window.addEventListener('resize', updateBox);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener('resize', updateBox);
  }, []);

  const dragStartHandler = (e) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);

    //console.log(e.dataTransfer.getData('item'));
    posX = e.clientX;
    posY = e.clientY;
    console.log(e);
    console.log(e.target.id);


    // 드래그 시작 시 현재 요소의 id를 dataTransfer에 저장
    e.dataTransfer.setData('targetId', e.target.id || '');
  };

  const dragHandler = (e) => {
    e.target.style.left = `${e.clientX - posX}px`;
    e.target.style.top = `${e.clientY - posY}px`;
  };

  const dragEndHandler = (e) => {


    if (
      box.left < e.clientX &&
      e.clientX < box.right &&
      box.top < e.clientY &&
      e.clientY < box.bottom
    ) {

      setTargets((targets) => {
        const newTargets = [...targets];

        const targetId = parseInt(e.target.id);
        const details = STOCK_PRICE.find(item => item.id === targetId);

        newTargets.push({
          id: parseInt(e.timeStamp),
          top: e.clientY - box.top,
          left: e.clientX - box.left,
          details: details
        });
        return newTargets;
      });

    }

    e.target.style.left = '0px';
    e.target.style.top = '0px';
  };


  const targetDragStartHandler = (e) => {
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);

    e.dataTransfer.setData('targetId', e.target.id || '');

    posX = e.clientX - e.target.offsetLeft;
    posY = e.clientY - e.target.offsetTop;
    originalX = e.target.offsetLeft;
    originalY = e.target.offsetTop;

    // 드래그 시작 시 현재 요소의 id를 dataTransfer에 저장
    // e.target.id가 undefined일 경우를 대비하여 빈 문자열로 설정
    //e.dataTransfer.setData('targetId', e.target.id || ''); 
  };

  /*
  const targetDragHandler = (e) => {
    e.target.style.left = `${e.clientX - posX}px`;
    e.target.style.top = `${e.clientY - posY}px`;
  };
  */


  const targetDragEndHandler = (e) => {

    // e에서 어떻게 id나 idx를??
    // 객체를 dump하는 개념으로 ㄱㄱ 
    if (
      box.left < e.clientX &&
      e.clientX < box.right &&
      box.top < e.clientY &&
      e.clientY < box.bottom
    ) {

      setTargets((targets) => {
        const newTargets = targets.map((target) =>
          target.id === e.dataTransfer.getData('targetId') ?
            { ...target, top: e.clientY - box.top, left: e.clientX - box.left } :
            target


        );
        return newTargets;
      });

    } else {

      e.target.style.left = `${originalX}px`;
      e.target.style.top = `${originalY}px`;
    };
  };




  const deleteTarget = (targetId) => {
    setTargets(targets => targets.filter(target => target.id !== targetId));
  };

  return (
    <>
      <h2>ui 기능 prototype</h2>
      <div className="container">

        <div className="item-box">
          {STOCK_PRICE.map((item) => (
            <div
              key={item.id}
              id={item.id}
              draggable
              onDragStart={dragStartHandler}
              onDrag={dragHandler}
              onDragEnd={dragEndHandler}
              className="item-node"
            >
              {item.name}
            </div>
          ))}
        </div>
        <div
          ref={targetBoxRef}
          className="target-box"
          onDragOver={(e) => e.preventDefault()}
        >
          {targets.map((target) => (
            <div
              key={target.id}
              id={target.id}

              draggable
              onDragStart={targetDragStartHandler}
              onDrag={dragHandler}
              onDragEnd={targetDragEndHandler}
              className="target-item"
              style={{ top: `${target.top}px`, left: `${target.left}px` }}
            >
              <div>{target.details.name} - {target.details.price}원</div>
              <img src={target.details.image}
                alt="ss"
                width="100"
                height="100"
              />


              <button onClick={() => deleteTarget(target.id)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomCartPage;