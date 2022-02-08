const exploreGrid=document.querySelector(".explore-grid");
const searchInput=document.querySelector(".search-input").addEventListener('keyup',searchBar);
const resNames=document.querySelectorAll(".res-name");
let timeoutId;
function getRestuarant(restDetails){
    restDetails.map((data)=>{

        //Fetching Data:
        let deliveryTime=data.order.deliveryTime;
        let bottomText=data.bottomContainers[0].text;
        let bottomImage=data.bottomContainers[0].image.url;
        let price=data.info.cfo.text;
        let imag=data.info.image.url;
        let cuisine=data.info.cuisine.map(items=> items.name);
        let rating=data.info.rating.rating_text;
        let name=data.info.name;


        //Creating main div:
        let exploreCard=document.createElement("div");
        exploreCard.className="explore-card cur-po";
       
        //Creating Sub-Div:
        let exploreCardCover=document.createElement("div");
        exploreCardCover.className="explore-card-cover";
        let resRow1=document.createElement("div");
        resRow1.className="res-row";
        let resRow2=document.createElement("div");
        resRow2.className="res-row";
        let cardBottom=document.createElement("div");

        //Pushing in mainDiv:
        exploreCard.appendChild(exploreCardCover);
        exploreCard.appendChild(resRow1);
        exploreCard.appendChild(resRow2);
        exploreCard.appendChild(cardBottom);


            //headImg:
            let imgRest  = document.createElement("IMG");
            imgRest.setAttribute("src", imag);
            imgRest.setAttribute("alt", name);
            imgRest.className="explore-card-image";

            //DeliveryTime:
            let delivery=document.createElement("div");
            delivery.className="delivery-time";
            let deliverytext=document.createTextNode(deliveryTime);
            delivery.appendChild(deliverytext);

        //Adding data in exploreCardCover:
        exploreCardCover.appendChild(imgRest);
        exploreCardCover.appendChild(delivery);

            //rest-name:
            let resName=document.createElement("div");
            resName.className="res-name";
            let resNameText=document.createTextNode(name);
            resName.appendChild(resNameText);

            //rating:
            let resRating=document.createElement("div");
            resRating.className="res-rating absolute-center";
            resRating.innerHTML=`${rating}<i class='fi fi-sr-star absolute-center'></i>`;
            
        //Adding data in res-row1:
        resRow1.appendChild(resName);
        resRow1.appendChild(resRating);


            //Cuisine:
            let resCuisine=document.createElement("div");
            resCuisine.className="res-cuisine res-cuisine-tag";
            const cuisinetext=cuisine.toString();
            resCuisine.appendChild(document.createTextNode(cuisinetext));
            

            //Price per Plate
            let resPrice=document.createElement("div");
            resPrice.className="res-price";
            resPrice.appendChild(document.createTextNode(price));

         
        //Adding data in res-row2:
        resRow2.appendChild(resCuisine);
        resRow2.appendChild(resPrice);

        //cardBottom:

            //seperatingline
            const cardSeparator=document.createElement("div");
            cardSeparator.className="card-separator";

            //Safety related:
            const safetyPrecaution=document.createElement("div");
            safetyPrecaution.className="explore-bottom";
            
            //img
            const safetyImg=document.createElement("IMG");
            safetyImg.setAttribute("src", bottomImage);
            safetyImg.setAttribute("height","18px");
            safetyImg.setAttribute("alt", "Follows all Max Safety measures to ensure your food is safe");
            safetyPrecaution.appendChild(safetyImg);
            
            //safetyText
            const safetyText=document.createElement("div");
            safetyText.className="res-bottom-text";
            safetyText.appendChild(document.createTextNode(bottomText));
            safetyPrecaution.appendChild(safetyText);
            
            
        //Adding data in bottom-of-card
        cardBottom.appendChild(cardSeparator);
        cardBottom.appendChild(safetyPrecaution);


        
        

   // console.log(exploreCard); 
    exploreGrid.appendChild(exploreCard);

    });
}

function getRestuarantAll(){
    let url="./data.js";
    async function getData(){
        let response=await fetch(url);
        const restDetails=await response.json();
        getRestuarant(restDetails);
    }
    getData();
}



function search(filter){
    //Use debouncing concept
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId=setTimeout(async()=>{
        try{
            //Taken all div which has restuarant name
            let resNames=await document.querySelectorAll(".res-name");
            console.log(filter);
            resNames.forEach(data => {
                let text=data.textContent || data.innerText;

                //Checking whether given text match with the names of restuarant
                if(text.toUpperCase().indexOf(filter) > -1){
                    data.parentNode.parentNode.style.display="";
                }
                else{
                    data.parentNode.parentNode.style.display = "none";
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }, 500);
}

function searchBar(e){
    //console.log(e.target.value);
    search(e.target.value.toUpperCase());

}
//searchBar();
getRestuarantAll();