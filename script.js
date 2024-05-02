'use strict';
{/* <div class="mx-2 md:mx-4">date</div> */}
const movement=document.getElementById('movements');
const bal=document.getElementById('balance');
const inamount=document.getElementById('inamount');
const outamount=document.getElementById('outamount');
const intamount=document.getElementById('intamount');
const btnlogin=document.getElementById('btnlogin');
const inputloginusername=document.getElementById('inputloginusername');
const inputloginpin=document.getElementById('inputloginpin');
const welcome=document.getElementById('welcome');
const mainblock=document.getElementById('mainblock');
const transfortouser=document.getElementById('transfortouser');
const amounttouser=document.getElementById('amounttouser');
const sendamount =document.getElementById('sendamount');
const closeuser =document.getElementById('closeuser');
const closepin =document.getElementById('closepin');
const closeacount =document.getElementById('closeacount');
const reqamount =document.getElementById('reqamount');
const reqloan =document.getElementById('reqloan');
const sortto =document.getElementById('sortto');
const asofdate =document.getElementById('asofdate');
const timeout =document.getElementById('timeout');
const account1={
    owner:'Manisha Ratlavath',
    movements:[200,450,-400,3000,-650,-130,70,1300,2000],
    movementsDates:[
      "2022-11-18T21:31:17.178Z",
      "2022-12-23T07:42:02.383Z",
      "2023-01-28T09:15:04.904Z",
      "2023-04-01T10:17:24.185Z",
      "2023-05-08T14:11:59.604Z",
      "2024-04-26T17:01:17.194Z",
      "2024-04-28T13:36:17.929Z",
      "2024-04-30T12:25:17.929Z",
      "2024-05-01T08:30:36.790Z",
    ],
    intresetRate:1.2,
    pin:1111,
};

const account2={
  owner:'Ajay Sangem',
  movements:[-200,450,-400,3000,650,130,-70],
  movementsDates: [
    "2020-11-01T13:15:33.035Z",
    "2020-11-30T09:48:16.867Z",
    "2020-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-04-22T16:33:06.386Z",
    "2024-04-25T14:43:26.374Z",
    "2024-04-27T12:01:20.894Z",
  ],
  intresetRate:1.7,
  pin:2222,
};

const account3={
  owner:'Viggu mailaram',
  movements:[20,450,-40,300,-50,-30,70,130,200],
  movementsDates: [
    "2020-01-01T13:15:33.035Z",
    "2020-02-30T09:48:16.867Z",
    "2020-04-25T06:04:23.907Z",
    "2021-06-25T14:18:46.235Z",
    "2021-07-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
    "2024-03-28T23:36:17.929Z",
  ],
  intresetRate:0.8,
  pin:3333,
};

const account4={
  owner:'Neha Thakur',
  movements:[250,490,-90,300,-60,130,30,300,2000],
  movementsDates: [
    "2021-01-01T13:15:33.035Z",
    "2021-01-30T09:48:16.867Z",
    "2021-02-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-06-05T16:33:06.386Z",
    "2022-07-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
    "2024-03-28T23:36:17.929Z",
  ],
  intresetRate:0.2,
  pin:4444,
};

const account=[account1,account2,account3,account4];

const createusername=function(accs){
  accs.forEach(function(acc){
    acc.username=acc.owner.toLowerCase().split(' ').map(function(m){return m[0]}).join('');
  });
};
createusername(account);
const calcdisplaybalance=function(acc){
  acc.balance=acc.movements.reduce(function(acc,cur,i,arr){
    return acc+cur;
  },0);
  balance.textContent=`${acc.balance} $`;
}

const calcdisplaysummary=function(acc){
  const incomebal=acc.movements.filter(function(cur){return cur>0;}).reduce(function(acc,curr){return acc+curr},0);
  const outgoing=acc.movements.filter(function(cur){return cur<0;}).reduce(function(acc,curr){return acc+curr},0);
  const intrest=acc.movements.filter(function(cur){return cur>0;}).map(function(m){return (m*curraccount.intresetRate)/100;}).filter(function(cur,i,arr){return cur>=1;}).reduce(function(acc,curr){return acc+curr},0);

  inamount.textContent=`${incomebal}$`;
  const ins=`<span class="text-xs text-black text-bold" id="in">IN</span> `;
  inamount.insertAdjacentHTML('afterbegin',ins);

  outamount.textContent=`${Math.abs(outgoing)}$`;
  const out=`<span class="text-xs text-black text-bold" id="in">OUT</span> `;
  outamount.insertAdjacentHTML('afterbegin',out);
  
  intamount.textContent=`${intrest.toFixed(2)}$`;
  const int=`<span class="text-xs text-black text-bold" id="in">INT</span> `;
  intamount.insertAdjacentHTML('afterbegin',int);
}

const formatdate=function(date){
  const calsdayspassed=function(d1,d2){
    return Math.floor(Math.abs(d2-d1)/(1000*60*60*24));
  }
  const dayspassed=calsdayspassed(new Date(),date);
  if(dayspassed==0) return "Today";
  if(dayspassed==1) return "Yesterday";
  if(dayspassed<=7) return  `${dayspassed} days ago`;
  else{
    const da = `${date.getDate()}`.padStart(2, 0);
    const mon = `${date.getMonth() + 1}`.padStart(2, 0);
    const ye = date.getFullYear();
    return `${da}/${mon}/${ye}`;
  }
  
}


const displayMovements = function (acc,sort=false) {
  movement.innerHTML='';

  const movs= sort ? acc.movements.slice().sort((a,b) => a-b): acc.movements;
  
  movs.forEach(function(mov,i){
      const t = mov > 0 ? 'green' : 'red';
      const t1 = mov > 0 ? 'deposite' : 'withdraw';

      const date=new Date(acc.movementsDates[i]);

      const displaydate=formatdate(date);


      const html=`
      <li class="pt-1 border border-1 border-b-zink text-xs sm:text-sm md:text-lg ">
          <div class="flex justify-between p-1 md:p-2">
            <div class="flex px-1">
              <div class="mx-2 md:mx-4  px-2 rounded-lg md:px-4 md:rounded-xl bg-${t}-400 text-white"> ${i+1}${t1}</div>
              <div class=" text-xs  pt-2" id="displaydate">${displaydate}</div>
            </div> 
            <div class="px-1">${mov}$</div>
          </div>
      </li>
      `;
      movement.insertAdjacentHTML('afterbegin',html);
  });
}


const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcdisplaybalance(acc);

  // Display summary
  calcdisplaysummary(acc);
};


let curraccount;


const startlogouttimer=function(){
  
  const tick=function(){
    
    const min=String(Math.floor(time/60)).padStart(2,0);
    const sec=String(time%60).padStart(2,0);

    timeout.textContent=`${min}:${sec}`;

    if(time===0){
        clearInterval(timer);
        welcome.textContent='Log in to get started';
        mainblock.style.opacity=0;
    }
    time--;
  }
  timeout.innerText='';
  let time=600;
  tick();
  const timer=setInterval(tick,1000);
  
}

let timerstart=true;
btnlogin.addEventListener('click',function(e){
    e.preventDefault();

    curraccount=account.find(function(acc){return acc.username===inputloginusername.value});
    if(curraccount?.pin=== +inputloginpin.value){
      
      welcome.textContent=`welcome back , ${curraccount.owner.split(' ')[0]}`;
      
      mainblock.style.opacity=100;
      const date=new Date();
      const da=`${date.getDate()}`.padStart(2,0);
      const mon=`${date.getMonth()+1}`.padStart(2,0);
      const ye=date.getFullYear();
      const hr=`${date.getHours()}`.padStart(2,0);
      const min=`${date.getMinutes()}`.padStart(2,0);
      asofdate.textContent=`As of ${da}/${mon}/${ye},${hr}:${min}`;
      inputloginusername.value=inputloginpin.value='';
      inputloginpin.blur();

      if(timerstart){
        startlogouttimer();
        timerstart=false;
      }

      updateUI(curraccount);
    }
});

closeacount.addEventListener('click',function(e){
  e.preventDefault();
  if(curraccount.username===closeuser.value && curraccount.pin === +closepin.value){
  
    const index=account.findIndex(function(acc){
      return acc.username===curraccount.username;
    });
    account.splice(index,1);
    mainblock.style.opacity=0;
  }
  closepin.value=closeuser.value='';
  welcome.textContent=`Login to get started`;
})

sendamount.addEventListener('click',function(e){
  e.preventDefault();
  let fi=account.find(function(cur){
    return cur.username===transfortouser.value;
  });
  if(curraccount.balance >= Math.floor(+amounttouser.value) && fi && Math.floor(+amounttouser.value)>0 && fi?.username !== curraccount.username){
    curraccount.movements.push(Math.ceil(-amounttouser.value));
    fi.movements.push(Math.floor(+amounttouser.value));
    curraccount.movementsDates.push(new Date().toISOString());
    fi.movementsDates.push(new Date().toISOString());
    updateUI(curraccount);
  }
  transfortouser.value=amounttouser.value='';
})

reqloan.addEventListener('click',function(e){
  e.preventDefault();
  const amount=Math.floor(+reqamount.value);
  if(amount>0 && curraccount.movements.some(function(mov){
    return mov>=amount*0.1;
  })){
    setTimeout(function(){
      curraccount.movements.push(amount);
      curraccount.movementsDates.push(new Date().toISOString());
      updateUI(curraccount);
    },5000);
  }
  reqamount.value='';
})

let sort=false;
sortto.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(curraccount,!sort);
  sort=!sort;
});



// calculating overal balance in all accounts
const overalbalance=account
      .map(curr=>curr.movements)
      .flat()
      .reduce((acc,cur)=>acc+cur,0);
console.log(overalbalance);   //13800

