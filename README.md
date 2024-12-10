## custom-cart 1차 기능구현
  - fix까지 함께 완료

## Async propagation Render Strategy Test :: complete 
  - main 호출 -> secondary 호출이 연쇄적으로 발생하는 경우 (상품등록, user Order 등등 사용가능)
  - 동시에, Main에서 fetch된 Response를 UseRef로 가져온다, setter로 하면 죽어도 안됨.

## await Callable Propagation Available
  - method로 axios 분리하여, 리턴값을 받는 변수에 await 메서드형태로 구현 (베드락 커스텀 장바구니 이름)

## body == for jsonify 
  - body : {layers: [some Object]} 꼴로, body를 커스텀 가능.
