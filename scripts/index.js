"use strict";

window.onload = function submitBtn(){
    const sumbitBtnEl = document.getElementById("submit-btn");
    sumbitBtnEl.onclick = costOfRoom;

    function costOfRoom(e) {
        event.preventDefault();
        
        // INITIALIZING ELEMENT VARIABLES
        let dateInputEl = document.getElementById("dateInput"); 
        let numberOfNightsEl = document.getElementById("numberOfNightsInput"); 

            // Room selection radio buttons
            let queenRadioEl = document.getElementById("queenRadio");
            let kingRadioEl = document.getElementById("kingRadio");
            let twoRadioEl = document.getElementById("twoBedroomRadio");

        // Amount of guests select buttons 
        let numberOfAdultsEl = document.getElementById("numberOfAdults");
        let numberOfKidsEl = document.getElementById("numberOfKids");

            // Discount selection radio buttons
            let noDiscount = document.getElementById("noDiscountRadio");
            let aSeniorDiscountEl = document.getElementById("aSeniorDiscountRadio");
            let militaryDiscountEl = document.getElementById("militaryDiscount");
        
        // Reciept Totals 
        const originCostSpan = document.getElementById("originCostSpan");
        const discountSpanEl = document.getElementById("discountSpan");
        const discountCostSpanEl = document.getElementById("discountCostSpan");
        const taxSpanEl = document.getElementById("taxSpan");
        const totalCostSpanEl = document.getElementById("totalCostSpan");
        // END OF: INITIALIZING ELEMENT VARIABLES

        
        // Function for IN-SEASON / OUT OF SEASON prices
        function getRoomRate() {
            // dateInputEl = document.getElementById("dateInput");
            const dateValue = dateInputEl.value;
            const newDateValue = new Date(dateValue);
            const month = newDateValue.getMonth() + 1;
            if(month >= 6 && month <= 8) {
                // Assigns price for IN-SEASON
                queenRadioEl.value = 250;
                kingRadioEl.value = 250;
                twoRadioEl.value = 350;
            } else {
                // Assigns Price for OUT OF SEASON
                queenRadioEl.value = 150;
                kingRadioEl.value = 150;
                twoRadioEl.value = 210;
            }
        }   
        // CALLS getRoomRate function
        getRoomRate();

        // Adds adults and kids to find total amount of guests staying
        let amountOfPeople = Number(numberOfAdultsEl.value) + Number(numberOfKidsEl.value);

            // Initializes roomRate to 0 to add dif room prices to roomRatePrice
            let roomRatePrice = 0;

        // error message for more than expected number of guests 
        const messageDiv = document.getElementById("messageDiv");
        // Assigns default values to totals if error occurs 
        originCostSpan.innerHTML = "xx.xx";
        discountSpanEl.innerHTML = "xx.xx";
        discountCostSpanEl.innerHTML = "xx.xx";
        taxSpanEl.innerHTML = "xx.xx";
        totalCostSpanEl.innerHTML = "xxx.xx";

        // ROOM SELECTION RADIO BUTTONS

            // If Queen is Chosen adds room price to roomRatePrice and can't have more than 5 guests
            if(queenRadioEl.checked){
                let queenRate = Number(queenRadioEl.value);
                roomRatePrice += queenRate;
                console.log(amountOfPeople);
                if (amountOfPeople > 5){
                        messageDiv.innerHTML = "The room you selected will not hold your party";
                        return;
                }
            }
            // If King is Chosen adds room price to roomRatePrice and can't have more than 2 guests
            if(kingRadioEl.checked){
                let kingRate = Number(kingRadioEl.value);
                roomRatePrice += kingRate;
                console.log(amountOfPeople);
                if (amountOfPeople > 2){
                        messageDiv.innerHTML = "The room you selected will not hold your party";
                        return;
                }
            }
            // If Two Bedrooms is Chosen adds room price to roomRatePrice and can't have more than 6 guests
            if(twoRadioEl.checked){
                let twoBedRate = Number(twoRadioEl.value);
                roomRatePrice += twoBedRate;
                if (amountOfPeople > 6){
                        messageDiv.innerHTML = "The room you selected will not hold your party";
                        return;
                }
            }

        // Assigning totalRoomRate to equal the price of a specific room multiplied by the nights stayed
        let totalRoomRate = roomRatePrice * Number(numberOfNightsEl.value)
        
        // END OF: ROOM SELECTION RADIO BUTTONS

        

        // TOTALS

        // Cost of ORIGINAL 
        originCostSpan.innerHTML = "$" + totalRoomRate.toFixed(2);
        const discountSValue = (totalRoomRate - (totalRoomRate * .1)).toFixed(2);
        const discountMValue = (totalRoomRate - (totalRoomRate * .2)).toFixed(2);

        // TOTALS IF SELECTING CERTAIN DISCOUNT
        
        // If No Discount is choosen 
        if(noDiscount.checked){
            discountSpanEl.innerHTML = "No discount";
            discountCostSpanEl.innerHTML = "No discount";
            const taxValue = (totalRoomRate * .12).toFixed(2);
            taxSpanEl.innerHTML = "$" + taxValue;
            const totalValue = (Number(taxValue) + totalRoomRate).toFixed(2);
            totalCostSpanEl.innerHTML = "$" + totalValue;
        }

        // If AAA/Senior Discount is choosen
        if(aSeniorDiscountEl.checked){
            discountSpanEl.innerHTML = "AAA/Senior";
            discountCostSpanEl.innerHTML = "$" + discountSValue;
            const taxValue = (discountSValue * .12).toFixed(2);
            taxSpanEl.innerHTML = "$" + taxValue;
            const totalValue = (Number(taxValue) + Number(discountSValue)).toFixed(2);
            totalCostSpanEl.innerHTML = "$" + totalValue;
        }

        // If Military Discount is choosen
        if(militaryDiscountEl.checked){
            discountSpanEl.innerHTML = "Military";
            discountCostSpanEl.innerHTML = "$" + discountMValue;
            const taxValue = (discountMValue * .12).toFixed(2);
            taxSpanEl.innerHTML = "$" + taxValue;
            const totalValue = (Number(taxValue) + Number(discountMValue)).toFixed(2);
            totalCostSpanEl.innerHTML = "$" + totalValue
        }

        // END OF: TOTALS

        
    }
}