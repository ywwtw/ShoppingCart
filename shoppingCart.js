//產品列表
const productList = [
    {
        id: '1',
        title: '毛氈三角旗',
        price: 90,
        img: 'https://picsum.photos/id/526/300'
    },
    {
        id: '2',
        title: '金屬掛勾圓規',
        price: 150,
        img: 'https://picsum.photos/id/527/300'
    },
    {
        id: '3',
        title: '格線筆記本3入',
        price: 180,
        img: 'https://picsum.photos/id/528/300'
    },
    {
        id: '4',
        title: '經典相機造型存錢筒',
        price: 890,
        img: 'https://picsum.photos/id/531/300'
    },
    {
        id: '5',
        title: '船錨造型掛勾',
        price: 360,
        img: 'https://picsum.photos/id/1059/300'
    },
    {
        id: '6',
        title: 'TIMEX鬧鐘',
        price: 360,
        img: 'https://picsum.photos/id/357/300'
    },
    {
        id: '7',
        title: '代步小滑板',
        price: 790,
        img: 'https://picsum.photos/id/157/300'
    },
    {
        id: '8',
        title: '簡易迷你打字機',
        price: 990,
        img: 'https://picsum.photos/id/486/300'
    },
    {
        id: '9',
        title: '仿舊皮革錶帶手錶',
        price: 520,
        img: 'https://picsum.photos/id/26/300'
    }
];
//slide
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
  if (n > $(".mySlides").length) {slideIndex = 1}
  if (n < 1) {slideIndex = $(".mySlides").length}
  for (i = 0; i < $(".mySlides").length; i++) {
    $(".mySlides")[i].style.display = "none";
  }
  for (i = 0; i < $(".dot").length; i++) {
    $(".dot")[i].className = $(".dot")[i].className.replace("active", "");
  }
  $(".mySlides")[slideIndex-1].style.display = "block";
  $(".dot")[slideIndex-1].className += " active";
//   $(".dot")[slideIndex-1].addClass("active");
}

$(".banner-btn").click(function(){
    const coupon = 
    `<div class="coupon">
    <p>折扣碼:</p>
    <p class="ccode">GIFT20</p>
    </div>`;
    $(".banner-content").html(coupon);
})
//slides end

  $("#navLinkItem").click(function(){
    $(".modal").removeClass("hide");
    $('body').addClass("hidden");
  });

  $("#closeModal").click(function(){
    $(".modal").addClass("hide");
    $('body').removeClass("hidden");
  });

window.addEventListener('scroll',function(){
    const y = window.scrollY;
    if (y>100){
        $(".main-nav").addClass("light");
    }else{
        $(".main-nav").removeClass("light");
    }
})

//設計建立單一商品卡片HTML標籤的函數
function createProductCard(product) {
    const cardElement = `
            <div class="card">
                <div class=pic>
                <img src="${product.img}" class="cardImg" alt="...">
                </div>
                <form id="form${product.id}" data-pId="${product.id}" class="add-item-form">
                    <div class="cardTitle">${product.title}</div> 
                    <div class="cardPrice">NT$ ${product.price}</div>                                        
                    <div class="form-group center">
                        <button class="form-btn" type="submit">
                        <i class="fas fa-cart-plus"></i> 加入購物車
                        </button>
                    </div>
                </form>             
            </div>
    `;
    return cardElement;
}
// 渲染商品
productList.forEach(product => {   
    const card = createProductCard(product);
    $("#grid").append(card);
});

function Cart(){
    this.itemList = [];
    this.key = 'example-cart';
    this.initCart=function(){
        const excart = localStorage.getItem(this.key);
        const excartList= JSON.parse(excart);
        if (excartList) {
            this.itemList = excartList;
        }
        this.render();
    }

    //新增品項
    this.addItem = function (pid, amount) {
        if(amount>=1){
            console.log("新增品項", pid, amount);
        // const product = productList.find(function(product){
        //     return product.id == pid;
        // })
        const product = productList.find(product => product.id == pid);      
        console.log("[商品詳情]", product);
        const item = {
            ...product,
            amount,
            createdAt: new Date().getTime()
        };
        console.log("[新品項]", item);
        
        const existing = this.itemList.find(function(epdct){
            return epdct.id == pid;
        });
        if(existing){
            existing.amount+=item.amount;
        }else{
            this.itemList.push(item);
        }

        this.render();
        }    
    }
    this.minusItem = function(pid , amount){
        console.log("[減1]", pid, amount);
        const product = productList.find(product => product.id == pid);      
        console.log("[商品詳情]", product);
        const item = {
            ...product,
            amount,
            createdAt: new Date().getTime()
        };
        console.log("[減1]", item);
        const existing = this.itemList.find(function(epdct){
            return epdct.id == pid;
        });
        if(existing){
            if(existing.amount>=2){
                existing.amount-=item.amount;
            }          
        }
        this.render();
    }
   

    //清空購物車
    this.emptyCart=function(){
        this.itemList = [];
        this.render();
    }

    //結帳
    this.checkOut=function(){
        if(this.itemList.length=="0"){
            alert("您的購物車沒有商品!");
        }else{
            alert("感謝您的購買!");
            this.itemList = [];
            this.render();
            location.reload();
        }
    }
    

    this.deleteItem = function (i) {
        this.itemList.splice(i, 1);
        this.render();
    }
    this.updateToLocalStorage=function(){
        const listStr = JSON.stringify(this.itemList);
        localStorage.setItem(this.key,listStr);
    }
 

    this.render=function(){
                
        this.updateToLocalStorage();
        const $tbody = $('#cartTableBody');
        const $cartamount = $('#cartTableAmount');
        const $total = $('#cartTotalAmount');
        $tbody.empty();
        let cartValue = 0;        
        let totalamt =0;
        let finalprice = cartValue;

        this.itemList.forEach((item, idx) => {
            //品項價值=單價*數量  

            let itemValue = item.price * item.amount;
            cartValue += itemValue;
            totalamt += item.amount;
            finalprice = cartValue;
            
            // 將內容渲染至tbody內
            const tr = `
            <table class="tablebody">
            <tr>
                <td class="delete-btn" data-index="${idx}"><i class="far fa-times-circle"></i></td>    
                <td colspan="2" class="pname">${item.title}</td>
                <td>$${item.price}</td>
                <td>
                    <ul class="tamt center">
                        <li class="minus1" data-pId="${item.id}"><i class="fas fa-minus-square"></i></li>
                        <li class="tiamt center">${item.amount}</li>
                        <li class="plus1" data-pId="${item.id}"><i class="fas fa-plus-square"></i></li>
                    </ul>
                </td>
                <td id="tvalue${idx}" class="tvalue">$${itemValue}</td>
            </tr>
            </table>`;
            // document.getElementById("cartTableFoot").innerHTML+=tr;
            
                        
            $tbody.append(tr);
        
        });
        
        

        $total.html(`
        <div class="subtotal">
            <div>$ ${cartValue}</div>
            <div class="right">
                <div>
                <div class="applypromo">折扣碼</div>
                    <div class="promocode">
                        <input type="text" id="promo" class="promo" placeholder="輸入折扣碼">     
                        <div id="applybtn" class="applybtn">使用</div>
                    </div>
                </div> 
            </div>
        </div>
        `)

        

        $cartamount.html(`        
        <div>金額NT$</div>
        <div class="finalprice">$ ${finalprice}</div>
        `);
        $("#cartNumber").text(totalamt);

        $("body").delegate(".applybtn","click",function(e){
            e.preventDefault();       
            const promoCode = $("#promo").val();
            if(promoCode === "GIFT20"){
                $(".applypromo").text("折扣碼使用成功!")
                $(".finalprice").text(finalprice*0.8);
            }else{
                $(".applypromo").text("折扣碼無效!")
            }
        })
    }
}   


const cart = new Cart;
cart.initCart();


//取得新增購物車品項數量
$(".add-item-form").submit(function (e) {
    e.preventDefault();
    // console.log("[準備新增購物車品項]", this);
    let pid =$(this).attr("data-pId");
    let amount = Number(1);
    cart.addItem(pid, amount);
});


$("body").delegate(".plus1","click",function(){   
    console.log("+1",this); 
    let pid = $(this).attr("data-pId");
    console.log(pid);
    let amount = Number(1);
    cart.addItem(pid, amount);   
});

$("body").delegate(".minus1","click",function(){   
    console.log("-1",this); 
    let pid = $(this).attr("data-pId");
    console.log(pid);
    let amount = Number(1);
    cart.minusItem(pid, amount);   
});

$('#clearCartBtn').click(function(){
    console.log("[準備清空購物車]");
    // 清空購物車
    cart.emptyCart();
})

$('#checkout').click(function(){
    cart.checkOut();
})

$("body").delegate(".delete-btn", "click", function () {
    console.log("準備移除", this);
    //從此按鈕的data-index屬性取得索引
    let i = $(this).attr("data-index");
    //轉成整數
    i = parseInt(i);
    console.log("[索引]", i);
    //移除指定索引的item
    cart.deleteItem(i);
});

