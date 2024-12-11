  // 주문 처리 함수
  const addOrder = async () => {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken) {
      Swal.fire({
        title: '로그인이 필요합니다',
        text: '주문을 진행하려면 로그인이 필요합니다.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23',
        background: '#F0EADC',
        color: '#754F23',
      });
      return;
    }

    if (!address.trim() || !receiver.trim() || phone.replace(/\D/g, '').length !== 11) {
      Swal.fire({
        title: '입력 오류',
        text: '주소, 수령인, 연락처를 모두 정확히 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23',
        background: '#F0EADC',
        color: '#754F23',
      });
      return;
    }

    if (products.length === 0) {
      Swal.fire({
        title: '주문할 항목이 없습니다',
        text: '주문할 상품을 선택해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23',
        background: '#F0EADC',
        color: '#754F23',
      });
      return;
    }

    const orderItemList = products.map((product) => ({
      productCode: Number(product.productCode),
      stock: Number(product.stock),
      color: product.color,
      price: Number(product.price),
      name: product.name,
      size: product.size,
      thumbnail: product.thumbnail,
    }));

    const requestData = {
      orderItemList: orderItemList,
      address: address,
      receiver: receiver,
      phone: phone,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL_APIgateway}/api/order`,
        requestData,
        {
          headers: {
            Authorization: accessToken,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Order Response:', response.data);

      Swal.fire({
        title: '주문이 완료되었습니다!',
        icon: 'success',
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23',
        background: '#F0EADC',
        color: '#754F23',
      });

      // 주문 완료 후 장바구니에서 해당 항목 삭제
      const itemIds = products.map((product) => product.id);
      await removeItemsFromCart(itemIds);

      // 장바구니 페이지로 이동
      navigate('/mypages/cart');
    } catch (error) {
      console.error('주문 오류:', error);
      Swal.fire({
        title: '주문 오류',
        text: error.response?.data?.message || '주문 중 오류가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#754F23',
        background: '#F0EADC',
        color: '#754F23',
      });
    }
    invoke_server();
  };
  
  const userId = sessionStorage.getItem('id');

  const invoke_server = async () => {
    
    const productIds = products.map((product) => Number(product.productCode));
    
    let body = {
      "productIds": productIds
    };

    try {
      const response = await axios.post(`https://dotblossom.today/ai-api/user/action/${userId}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      console.log("invoked");
      
    } catch (e) {
      console.log(e);
    }
  };
