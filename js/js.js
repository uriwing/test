import products from "../../db.json" assert { type:'json'}
// assert { type:'json'}    -외부파일이 json이라고 확실하게 명시

const btn = document.querySelector('button')
const select = document.querySelector('select')
let myProduct;


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
  myProduct = products.data;
  myProduct.forEach((product)=>{
    if ( !document.getElementById(product.id)){   //클릭할때마다 추가되는 것 방지(기존 아이디값이 없을때만 작동)
    creatItem(product);
    }
  })
}

const selectCategory = (event) => {
//console.log('몇번째 option을 선택했는지 알아봄',event.target.options.selectedIndex);

console.log(myProduct);
if(!myProduct){return}

const {selectedIndex:n} = event.target.options; //구조분해(destructuring), 이름 n으로 바꿈
const {value} = event.target.options[n]
console.log('value',value);

const filtered = myProduct.filter((product)=>{
  return product.category === value;
})

const removeItems = () => {
  const items = document.querySelectorAll('li');
  items.forEach((item)=>{
    item.remove()
  })
}

removeItems()

filtered.forEach((aa) => {
  creatItem(aa)
})

}

btn.addEventListener('click',importData)
select.addEventListener('change',selectCategory)
//console.log(products);