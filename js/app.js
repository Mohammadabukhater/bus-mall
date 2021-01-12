'use strict';

ProductImages.allProducts = [];

ProductImages.totalClicks = 0;

ProductImages.lastShown = [];


var sectionElement = document.getElementById('products-for-vote');


var productTable = document.createElement('table');
var sectionElement2 = document.getElementById ('table');

var results = document.getElementById('results'); 

var productVotes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var productShown = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var productNames = [];

var maxVote = 25;

function ProductImages (imageName,imageSrcFilepath){
  this.imageName = imageName;
  this.imageSrcFilepath = imageSrcFilepath;
  this.imageTimesClicked = 0;
  this.imageTimesShown = 0;
  ProductImages.allProducts.push(this);
  productNames.push(this.imageName);
}
var product1Element = document.getElementById('product1');
var product2Element = document.getElementById('product2');
var product3Element = document.getElementById('product3');

function randomProductGen(){

  var randomProduct1 = Math.floor(Math.random() * ProductImages.allProducts.length);
  var randomProduct2 = Math.floor(Math.random() * ProductImages.allProducts.length);
  var randomProduct3 = Math.floor(Math.random() * ProductImages.allProducts.length);

  while (randomProduct1 === randomProduct2
    || randomProduct1 === randomProduct3
    || randomProduct2 === randomProduct3
    || ProductImages.lastShown.includes(randomProduct1)
    || ProductImages.lastShown.includes(randomProduct2)
    || ProductImages.lastShown.includes(randomProduct3)) {

    randomProduct1 = Math.floor(Math.random() * ProductImages.allProducts.length);

    randomProduct2 = Math.floor(Math.random() * ProductImages.allProducts.length);

    randomProduct3 = Math.floor(Math.random() * ProductImages.allProducts.length);
  }

  ProductImages.allProducts[randomProduct1].imageTimesShown ++;
  ProductImages.allProducts[randomProduct2].imageTimesShown ++;
  ProductImages.allProducts[randomProduct3].imageTimesShown ++;

  ProductImages.lastShown[0] = randomProduct1;
  ProductImages.lastShown[1] = randomProduct2;
  ProductImages.lastShown[2] = randomProduct3;

  product1Element.src = ProductImages.allProducts[randomProduct1].imageSrcFilepath;
  product1Element.alt = ProductImages.allProducts[randomProduct1].imageName;

  product2Element.src = ProductImages.allProducts[randomProduct2].imageSrcFilepath;
  product2Element.alt = ProductImages.allProducts[randomProduct2].imageName;

  product3Element.src = ProductImages.allProducts[randomProduct3].imageSrcFilepath;
  product3Element.alt = ProductImages.allProducts[randomProduct3].imageName;
}

function manageClick(event){

  for(var i in ProductImages.allProducts){

    if(event.target.alt === ProductImages.allProducts[i].imageName){
      ProductImages.allProducts[i].imageTimesClicked ++;

      ProductImages.totalClicks ++;
    }
  }
  if (ProductImages.totalClicks > maxVote){
    sectionElement.removeEventListener('click', manageClick);

    updateVotes();
    makeHeaderRow();
    renderTable();

 
  } else {

    randomProductGen();
  }
}

function updateVotes(){
  for( var i in ProductImages.allProducts){
    productVotes[i] += ProductImages.allProducts[i].imageTimesClicked;
    productShown[i] += ProductImages.allProducts[i].imageTimesShown;
  }
}



function renderTable(){

  var tableRowElement, tableDataElement;
  var votes = productVotes;
  var shown = productShown;

  for(var i = 0; i < productNames.length; i++){
    tableRowElement = document.createElement('tr');

    tableDataElement = document.createElement('td');
    tableDataElement.textContent = productNames[i];
    tableRowElement.appendChild(tableDataElement);
    

    tableDataElement = document.createElement('td');
    tableDataElement.textContent = votes[i];
    tableRowElement.appendChild(tableDataElement);
  

    tableDataElement = document.createElement('td');
    tableDataElement.textContent = shown[i];
    tableRowElement.appendChild(tableDataElement);
  

    if(productShown[i] > 0){

      
      var voteRate = Math.round(100 * (votes[i] / shown[i]) );
      tableDataElement = document.createElement('td');
      tableDataElement.textContent = voteRate + ' %';
      tableRowElement.appendChild(tableDataElement);

    } else{

      tableDataElement = document.createElement('td');
      tableDataElement.textContent = 'N/A';
      tableRowElement.appendChild(tableDataElement);

    }
    productTable.appendChild(tableRowElement);
  }
  sectionElement2.appendChild(productTable);
}

function makeHeaderRow(){

  var sectionElement = document.getElementById('table');
  var titleElement = document.createElement('h2');
  titleElement.textContent = 'Full data per product with preference rate';
  sectionElement.appendChild(titleElement);

  var productName = document.createElement ('td');
  var tableRowElement = document.createElement('tr');

  productName.textContent = 'Product';
  tableRowElement.appendChild(productName);

  productTable.appendChild(tableRowElement);

  var timesVoted = document.createElement ('td');
  timesVoted.textContent = '# Votes';
  tableRowElement.appendChild(timesVoted);

  productTable.appendChild(tableRowElement);

  var timesShown = document.createElement ('td');
  timesShown.textContent = '# Times Shown';
  tableRowElement.appendChild(timesShown);

  productTable.appendChild(tableRowElement);

  var preferenceRate = document.createElement ('td');
  preferenceRate.textContent = 'Preference Rate %';
  tableRowElement.appendChild(preferenceRate);

  productTable.appendChild(tableRowElement);
}

new ProductImages('bag','img/bag.jpg');
new ProductImages('banana', 'img/banana.jpg');
new ProductImages('bathroom', 'img/bathroom.jpg');
new ProductImages('boots', 'img/boots.jpg');
new ProductImages('breakfast', 'img/breakfast.jpg');
new ProductImages('bubblegum', 'img/bubblegum.jpg');
new ProductImages('chair', 'img/chair.jpg');
new ProductImages('cthulhu', 'img/cthulhu.jpg');
new ProductImages('dog-duck', 'img/dog-duck.jpg');
new ProductImages('dragon', 'img/dragon.jpg');
new ProductImages('pen', 'img/pen.jpg');
new ProductImages('pet-sweep', 'img/pet-sweep.jpg');
new ProductImages('scissors', 'img/scissors.jpg');
new ProductImages('shark', 'img/shark.jpg');
new ProductImages('sweep', 'img/sweep.png');
new ProductImages('tauntaun', 'img/tauntaun.jpg');
new ProductImages('unicorn', 'img/unicorn.jpg');
new ProductImages('usb', 'img/usb.gif');
new ProductImages('water-can', 'img/water-can.jpg');
new ProductImages('wine-glass', 'img/wine-glass.jpg');


sectionElement.addEventListener('click', manageClick);
results.addEventListener('click', manageClick); 

randomProductGen();