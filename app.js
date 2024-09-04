const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  const dropdowns =document.querySelectorAll("select")
  const btn = document.querySelector("button")
  const fromCurr =document.querySelector(".from select")
  const toCurr =document.querySelector(".to select")
  const msg= document.querySelector(".msg p")
  
 // updating selct sction

for (let select of dropdowns){
    for (let currCode in countryList){
        let newOptn = document.createElement("option");  //creating and adding opyion element to selct elemnt
        newOptn.innerText=currCode;
        newOptn.value=currCode;
        if(select.name =="from" && currCode== "USD"){
            newOptn.selected="selected"
        }else if(select.name =="to" && currCode== "INR"){
            newOptn.selected="selected"
        }

        
        select.append(newOptn);
        
    }
    select.addEventListener("change",(evt)=>{  //update the flag whenever option change
        updateFlag(evt.target)    /// calling updateFlag function when optoin chnage and passing the elemnt
    })
   
}
const updateFlag= (element)=>{
    let currCode= element.value;  //getting the currency code
    let countryCode= countryList[currCode];  //getting country code 
    let newScr= `https://flagsapi.com/${countryCode}/shiny/64.png`          //adding the country code bw link
    let img =element.parentElement.querySelector("img");
    img.src=newScr;     //replacing the new img
}
window.addEventListener("load", ()=>{  // whenever window load call updateExchange
    
    updateExchnage();
})

btn.addEventListener("click",  ( evt)=>{   // its the function if clik then updatExchnage will perform
    evt.preventDefault();
    updateExchnage();
   
})

const updateExchnage= async ()=>{
    
    let amount = document.querySelector("input")
   let  amountVal=amount.value;
    if(amountVal ==="" || amountVal<1){  //making some input logic
        amountVal= 1;
        amount.value="1"
    }
    
    console.log(fromCurr.value,toCurr.value)
    let URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);   // fetching api
   
    let data= await response.json()  //storing at data  
    console.log(response)
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    

    let finalAmount = amountVal * rate;
    console.log(finalAmount)
    
    msg.innerText=`${amountVal} ${fromCurr.value} is ${      finalAmount} ${toCurr.value} `
    
}

