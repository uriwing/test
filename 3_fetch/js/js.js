//import products from "../../db.json" assert { type:'json'}

const btn = document.querySelector('button')

let products;
//json파일을 가져오는 함수 정의
async function getJson(){   
  const response = await fetch('../../db.json')
  products = await response.json()  
  return products
}


// 함수 발생
getJson()

const creatItem = (product) =>{  
  const ul = document.querySelector('.list') //원래있는거 선택

  const li = document.createElement('li')   //새로운 엘리먼트 생성
  const img = document.createElement('img')
  const strong = document.createElement('strong')
  const p = document.createElement('p')
  const span = document.createElement('span')

  const price = new Intl.NumberFormat('ko-KR', { 
    style: 'currency',      //통화단위
    currency: 'KRW'         //원화
  }).format(product.price)  //포맷을 바꿀 데이터  
  //Intl.NumberFormat  -각국에 맞는 숫자서식을 지원하는 객체 생성자(클라스)

  //li.setAttribute('id',product.id );
  li.id = product.id;    //id는 안 만들어도 됨(기본 속성으로 있음)
  img.setAttribute('src', product.img)  //img에 src속성 만들고 value 집어넣음
  strong.classList.add('name')          //strong에 클라스 name 생성
  strong.innerText = product.name;
  p.classList.add('info')
  p.innerText = product.info;
  span.className = 'price';
  span.innerText = price;   //위에서 한국돈 표시 방법으로 바꾼 것을 집어 넣으줌

  li.append(img,strong,p,span);
  ul.append(li)

  console.log(ul);
}



const importData = () =>{
  products.data.map((product)=>{
    if ( !document.getElementById(product.id)){   //클릭할때마다 추가되는 것 방지(기존 아이디값이 없을때만 작동)
    creatItem(product);
    }
  })
}

btn.addEventListener('click',importData)
//console.log(products);