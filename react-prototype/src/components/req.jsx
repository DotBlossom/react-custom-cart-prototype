
  //ref

  const invokeRef = useRef();

  const handleSubmit = async () => {
    if (
      !productName ||
      !price ||
      !stockQuantity ||
      !category ||
      !color ||
      !size ||
      thumbnail.length === 0 ||
      !description
    ) {
      Swal.fire({
        title: '모든 필드를 채워주세요.',
        text: '썸네일 이미지도 필수 입니다.',
        icon: 'warning',
      });
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();

    // JSON 데이터를 문자열로 추가
    const productRequest = {
      name: productName,
      price,
      stock: stockQuantity,
      textInformation: description,
      category: category.toUpperCase(),
      color,
      clothesSize: category !== '신발' ? size : '',
      shoesSize: category === '신발' ? size : '',
    };

    formData.append('productRequest', new Blob([JSON.stringify(productRequest)], { type: 'application/json' }));

    // 썸네일 이미지 추가
    thumbnail.forEach((file, index) => {
      formData.append('thumbnail', file);
    });

    // 상세 이미지 추가
    images.forEach((file, index) => {
      formData.append('images', file);
    });

    try {
      // 로딩 모달 표시
      Swal.fire({
        title: '등록 중...',
        text: '상품을 등록하는 중입니다.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const accessToken = sessionStorage.getItem('accessToken');

      // Axios POST 요청
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL_APIgateway}/api/brand/product/owner/${storeId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${accessToken}`,
          },
        }
      );

      // 로딩 모달 닫기
      Swal.close();

      // Response 로그 출력
      console.log('응답 데이터:', response.data);
      
      invokeRef.current = response.data;
      invoke_server(invokeRef);

      // 성공 메시지 표시
      Swal.fire({
        title: '등록 완료',
        text: '상품이 성공적으로 등록되었습니다.',
        icon: 'success',
      }).then(() => {
        navigate('/business/product');
      });
    } catch (err) {
      // 로딩 모달 닫기
      Swal.close();

      // 오류 메시지 표시
      Swal.fire({
        title: '등록 실패',
        text: err.response?.data?.message || '알 수 없는 오류가 발생했습니다. 1대1 문의 해주세요.',
        icon: 'error',
      });
    }
  };

  // INVOKE
  const invoke_server = async (req) => {
    const parsedReq = req.current;
    let body = {
      "product_id": parsedReq.code,
      "product": {
        "product_name": parsedReq.name,
        "product_category": parsedReq.category,
        "product_price": parsedReq.price,
        "product_thumbnail": parsedReq.thumbnail,
        "product_stock": parsedReq.stock
      }
    }

    try {
      const response = await axios.post(`http://lambda.dotblossom.today/api/mongo`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      console.log("success!");
    } catch (e) {
      console.log("invoke error", e);
    }
  }
