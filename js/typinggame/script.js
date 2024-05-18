const typingText=document.querySelector('.typing-text p');
const input=document.querySelector('.wrapper .input-field');
const time=document.querySelector('.time span b');
const mistakes=document.querySelector('.mistake span');
const wpm=document.querySelector('.wpm span');
const cpm=document.querySelector('.cpm span');
const btn=document.querySelector('button');

let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;


function loadParagraph(){
    const paragraph=["Life is a journey, not a destination.", "The stars shine brightest in the darkest nights.", 
                     "Kindness is a language the deaf can hear and the blind can see.", "Dream big, work hard, stay focused, and surround yourself with good people.", 
                     "Courage doesn't always roar, sometimes it's the quiet voice at the end of the day saying 'I will try again tomorrow.'", 
                     "Happiness is not something ready-made, it comes from your own actions.", "Believe you can and you're halfway there.", "The best way to predict the future is to create it.", 
                     "In the end, we only regret the chances we didn't take.", "Success is not final, failure is not fatal: It is the courage to continue that counts."
                    ];

                    const randomIndex=Math.floor(Math.random()*paragraph.length);
                    typingText.innerHTML='';
                    for(const char of paragraph[randomIndex]){
                        typingText.innerHTML+=`<span>${char}</span>`;    
                    }
                    typingText.querySelectorAll('span')[0].classList.add('active');
                    document.addEventListener('keydown',()=>input.focus())
                    typingText.addEventListener("click",()=>input.focus())
}

function initTyping(){
    const char=typingText.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);
    if(charIndex<char.length && timeLeft>0){

        if(!isTyping){
            timer=setInterval(initTimer,1000);
            isTyping=true;
        }

        if(char[charIndex].innerText===typedChar){
            char[charIndex].classList.add('correct');
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText=mistake;
        cpm.innerText=charIndex-mistake;
    } 
    else{
        clearInterval(timer);
        input.value='';
    }
}

function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        const wpmVal=Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText=wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    time.innerText=timeLeft;
    input.value='';
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}

input.addEventListener("input",initTyping);

btn.addEventListener("click",reset);

loadParagraph();