// Selecte Element

let getCount = document.querySelector(".info p span")

let getBullet = document.querySelector(".bullet .spans")

let bullet = document.querySelector(".bullet ")

let getAllQuestion = document.querySelector(".all_question")

let getSubmit = document.querySelector(".btn")

let quize = document.querySelector(".quize")

let answerArea = document.querySelector(".answer_area")

let resultSpan = document.querySelector(".result ")

let time = document.querySelector(".time ")

let curentIndex = 0;

let theRightAnswer = 0;

// convert JSON Object to js Object

function getQuestion(){

    let myRequest = new XMLHttpRequest()
    
    myRequest.onreadystatechange = function(){

        if(this.status ===200 && this.readyState ===4 ){

            let convert = JSON.parse(this.responseText)

            let countQustion = convert.length 

            // this function do bullet

            addBullet(countQustion)

            // this function to add date
            
            addDate(convert[curentIndex], countQustion)
            
            // countdown
            coundDown(5,countQustion)
            // cheack Sumbit 

            getSubmit.onclick = ()=>{

                let rightAnswer = convert[curentIndex].right_answer
                
                curentIndex++

                cheackAnswer(rightAnswer,countQustion)

                quize.innerHTML=""
                answerArea.innerHTML=""

                addDate(convert[curentIndex], countQustion)

                // handelbullets

                handelbullets()

                // countdown
                clearInterval(coutdownInterval)
                coundDown(5,countQustion)

                // showResult

                showResult(countQustion)
                }
        }
    }

    myRequest.open("GET","html_quize.json",true)
    myRequest.send()

}

// turn on this function convert JSON Object to js Object

getQuestion()

//  do bullet in JavaScript

function addBullet(num){ 

    // Add count Questions

    getCount.innerHTML = num

    // do bullet

    for(let i =1; i<=num;i++){

        let creatSpanOnBullet = document.createElement("span")

        if(i===1){
            creatSpanOnBullet.className="on"
        }

        getBullet.appendChild(creatSpanOnBullet)
    }

}

function addDate(ques, count){
    
    if(curentIndex < count){
        let geth1InAllQuestion = document.createElement("h1")

        geth1InAllQuestion.className="quize"
        
        geth1InAllQuestion.innerHTML = ques.title
    
        quize.appendChild(geth1InAllQuestion)
    
        for(let i = 1; i<=4;i++){
            
            // Create Element
    
            let mainDiv = document.createElement("div")
    
            let createInput = document.createElement("input")
    
            let createLable = document.createElement("label")
            
            // Attribute
    
            mainDiv.className = "answer"
    
            createInput.type = "radio"
            
            createInput.name = "question"
    
            createInput.id = `answer_${i}`
            
            createLable.setAttribute("for",`answer_${i}`) 
            
            createInput.dataset.answer = ques[`answer_${i}`] 
            
            createLable.innerHTML = ques[`answer_${i}`]
    
            // appendChild
            
            mainDiv.appendChild(createInput)
            
            mainDiv.appendChild(createLable)
            
            answerArea.appendChild(mainDiv)
            
            // condition
            
            if(i===1){
                createInput.checked=true
            }
    
        }
    }

}

// cheack Sumbit

function cheackAnswer(righ, count){

    let answers = document.getElementsByName("question")

    let chosenAnswer;

    for(let i =0;i<answers.length;i++){
        
        if(answers[i].checked){
            
            chosenAnswer = answers[i].dataset.answer
        }
    }


    if(righ === chosenAnswer){

        theRightAnswer++;

    }
}

// handelbullets 

function handelbullets(){
    let getBulletInSpan = document.querySelectorAll(".bullet .spans span")
    let arrayOfSpans =Array.from(getBulletInSpan)
    
    arrayOfSpans.forEach((e,index)=>{
        
        if(curentIndex === index){
            e.className="on"
        }
    })
}

function showResult(count){
    let resultEle;
    if(curentIndex === count){
        getAllQuestion.remove()
        getSubmit.remove()
        bullet.remove()
        
    if(theRightAnswer <count&&theRightAnswer>(count/2)){
        resultEle = `<p><span class='middel' >Good</span>, You Answer ${theRightAnswer} from ${count}</p>`
    }else if(theRightAnswer === count){
        resultEle = `<p><span class='prefect' >prefect</span>, You Answer ${theRightAnswer} from ${count}</p>`
    }else{
        resultEle = `<p><span class='low' >Bad</span>, You Answer ${theRightAnswer} from ${count}</p>`
    }

    resultSpan.innerHTML= resultEle
    
    resultSpan.style.marginTop= "15px"
    resultSpan.style.fontSize= "18px"
    resultSpan.style.backgroundColor= "white"
}
}

function coundDown(duraction,count){

    if(curentIndex < count){

        let minuets, second;

        coutdownInterval = setInterval(()=>{

            minuets = parseInt(duraction/60)

            second = parseInt(duraction%60)

            minuets =minuets<10 ?`0${minuets}`:`${minuets}`;
            second =second<10 ?`0${second}`:`${second}`;

            time.innerHTML= `${minuets}:${second}`

            if(--duraction<0){
                clearInterval(coutdownInterval)
                getSubmit.click()
            }

        },1000)
    }

}