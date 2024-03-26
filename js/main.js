const products = {
    valorant: [
      {
        id: 1,
        imgSrc: "img/Valorant_Logo.png",
        name: "1,130 Points",
        price: "285.00฿",
        description: "เติมแล้วแทบไม่ได้อะไรแถม ไม่คุ้มอีก",
        quality: 0
      },
      {
        id: 2,
        imgSrc: "img/Valorant_Logo.png",
        name: "2,485 Points",
        price: "620.00฿",
        description: "เติมแล้ว สามารถต่อชีวิตให้เกมหมาๆนี้ต่อไปได้",
        quality: 0
      },
      {
        id: 3,
        imgSrc: "img/Valorant_Logo.png",
        name: "6,190 Points",
        price: "1,515.00฿",
        description: "พี่ก็รวยเก๊นนนนนน",
        quality: 0
      },
      {
        id: 4,
        imgSrc: "img/Valorant_Logo.png",
        name: "23,000 Points",
        price: "5,200.00฿",
        description: "สำหรับคนเงินเหลือ ไม่รู้จะไปทำอะไร ....",
          quality: 0
      }
    ],
    lol: [
      {
        id: 5,
        imgSrc: "img/RIOTRP.png",
        name: "725 RP",
        price: "285.00฿",
        description: "เติมแล้วแทบไม่ได้อะไรแถม ไม่คุ้มอีก",
        quality: 0
      },
      {
        id: 6,
        imgSrc: "img/RIOTRP.png",
        name: "1,475 RP",
        price: "620.00฿",
        description: "เติมแล้ว สามารถต่อชีวิตให้เกมหมาๆนี้ต่อไปได้",
        quality: 0
      },
      {
        id: 7,
        imgSrc: "img/RIOTRP.png",
        name: "4,925 RP",
        price: "1,515.00฿",
        description: "พี่ก็รวยเก๊นนนนนน",
        quality: 0
      },
      {
        id: 8,
        imgSrc: "img/RIOTRP.png",
        name: "9,850 RP",
        price: "5,200.00฿",
        description: "สำหรับคนเงินเหลือ ไม่รู้จะไปทำอะไร ....",
        quality: 0
      }
    ],
    tft: [
        {
          id: 9,
          imgSrc: "img/TFTCoins_1.png",
          name: "1,475 TFT Coin",
          price: "265.00฿",
          description: "เติมแล้วแทบไม่ได้อะไรแถม ไม่คุ้มอีก",
          quality: 0
        },
        {
          id: 10,
          imgSrc: "img/TFTCoins_2.png",
          name: "2,950 TFT Coin",
          price: "500.00฿",
          description: "เติมแล้ว สามารถต่อชีวิตให้เกมหมาๆนี้ต่อไปได้",
          quality: 0
        },
        {
          id: 11,
          imgSrc: "img/TFTCoins_3.png",
          name: "4,925 TFT Coin",
          price: "2,700.00฿",
          description: "พี่ก็รวยเก๊นนนนนน",
          quality: 0
        },
        {
          id: 12,
          imgSrc: "img/TFTCoins_4.png",
          name: "9,650 TFT Coin",
          price: "4,700.00฿",
          description: "สำหรับคนเงินเหลือ ไม่รู้จะไปทำอะไร ....",
          quality: 0
        },
      ]
    }

   
    let totalItems = 0;
    let totalPrice = 0;
    function addToCart(productType, index) {
        const product = products[productType][index];
        document.getElementById(`cartItem-${product.id}`).classList.remove("hidden");
        
        totalItems++;
        document.getElementById("totalItems").innerText = totalItems;
    
        // Check if the product has a quantity property, if not, initialize it to 1
        if (!product.quantity) {
            product.quantity = 1;
        } else {
            // Update quantity
            product.quantity++;
            document.getElementById(`quantity-${product.id}`).innerText = product.quantity;
        }
    
        // Update totalPrice
        totalPrice += parseFloat(product.price.replace("฿", ""));
        document.getElementById("cartCount").innerText = totalPrice + "฿";
    
        // Return the product
        return product;
    }
    
    // Rendering product cards and cart items
    for (const productType in products) {
        products[productType].forEach((product, index) => {
            // Render product cards
            document.getElementById(productType).innerHTML += `
                <div class="tm-list-item">          
                    <img src="${product.imgSrc}" alt="Image" class="tm-list-item-img">
                    <div class="tm-black-bg tm-list-item-text">
                        <h3 class="tm-list-item-name">${product.name}<span class="tm-list-item-price">${product.price}</span></h3>
                        <p class="tm-list-item-description">${product.description}</p>
                        <button class="btn" style="float: right" onclick="addToCart('${productType}', ${index})">ซื้อ</button>
                    </div>
                </div>
            `;
    
            // Render cart items
            document.getElementById("AddToCart").innerHTML += `
                <tr id="cartItem-${product.id}" class="text-center hidden">
                    <td>
                        <div class="flex items-center gap-4">
                            <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                    <img src="${product.imgSrc}" alt="${product.name}" />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold text-center">${product.name}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        ${product.price}
                    </td>
                    <td id="quantity-${product.id}">
                        ${product.quantity || 0}
                    </td>
                </tr>
            `;
        });
    }
    
    function exportToPdf() {
        const cartItems = document.querySelectorAll("#AddToCart tr:not(.hidden)");
        let cartHtml = "";
    
        let totalItemsInCart = 0;
        let totalPriceOfItems = 0;
    
        cartItems.forEach((item) => {
            cartHtml += item.outerHTML;
    
            // Calculate total items in cart
            totalItemsInCart += parseInt(item.querySelector('td:nth-child(3)').innerText);
    
            // Calculate total price of items in cart
            totalPriceOfItems += parseFloat(item.querySelector('td:nth-child(2)').innerText.replace("฿", "")) * parseInt(item.querySelector('td:nth-child(3)').innerText);
        });
    
        const content = `
            <html>
            <head>
                <style>
                    /* Styles */
                </style>
            </head>
            <body>
                <h2 class="text-center text-2xl">Product Cart</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>แพ็ค</th>
                            <th>ราคา</th>
                            <th>จำนวน</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cartHtml}
                    </tbody>
                </table>
                <div class="mt-4 text-center">
                    <p>Total Items: ${totalItemsInCart}</p>
                    <p>Total Price: ${totalPriceOfItems.toFixed(2)}</p>
                </div>
            </body>
            </html>
        `;
    
        const opt = {
            margin: 1,
            filename: "บิลยอดเติมเกม.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
    
        // ใช้ html2pdf ในการสร้างไฟล์ PDF
        html2pdf().from(content).set(opt).save();
    }
    