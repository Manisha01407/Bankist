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
const account1={
    owner:'Manisha Ratlavath',
    movements:[200,450,-400,3000,-650,-130,70,1300,2000],
    intresetRate:1.2,
    pin:1111,
};

const account2={
  owner:'Ajay Sangem',
  movements:[-200,450,-400,3000,650,130,-70],
  intresetRate:1.7,
  pin:2222,
};

const account3={
  owner:'Viggu mailaram',
  movements:[20,450,-40,300,-50,-30,70,130,200],
  intresetRate:0.8,
  pin:3333,
};

const account4={
  owner:'Neha Thakur',
  movements:[250,490,-90,300,-60,130,30,300,2000],
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

const displayMovements = function (movements,sort=false) {
  movement.innerHTML='';

  const movs= sort ? movements.slice().sort((a,b) => a-b): movements;

  movs.forEach(function(mov,i){
      const t = mov > 0 ? 'green' : 'red';
      const t1 = mov > 0 ? 'deposite' : 'withdraw';
      const html=`
      <li class="pt-1 border border-1 border-b-zink text-xs sm:text-sm md:text-lg ">
          <div class="flex justify-between p-1 md:p-2">
            <div class="flex px-1">
              <div class="mx-2 md:mx-4  px-2 rounded-lg md:px-4 md:rounded-xl bg-${t}-400 text-white"> ${i+1} ${t1}</div>

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
  displayMovements(acc.movements);

  // Display balance
  calcdisplaybalance(acc);

  // Display summary
  calcdisplaysummary(acc);
};


let curraccount;
btnlogin.addEventListener('click',function(e){
    e.preventDefault();

    curraccount=account.find(function(acc){return acc.username===inputloginusername.value});
    if(curraccount?.pin=== +inputloginpin.value){
      
      welcome.textContent=`welcome back , ${curraccount.owner.split(' ')[0]}`;
      mainblock.style.opacity=100;
      inputloginusername.value=inputloginpin.value='';
      inputloginpin.blur();
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
    curraccount.movements.push(amount);
    updateUI(curraccount);
  }
  reqamount.value='';
})

let sort=false;
sortto.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(curraccount.movements,!sort);
  sort=!sort;
});

// calculating overal balance in all accounts
const overalbalance=account
      .map(curr=>curr.movements)
      .flat()
      .reduce((acc,cur)=>acc+cur,0);
console.log(overalbalance);   //13800

