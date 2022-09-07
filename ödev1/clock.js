const myName = document.querySelector('#myName')

function showTime(){
   const name = prompt('Kullanıcı Adınızı Giriniz.');
   if(name){
    myName.innerHTML = name;
   }
   else{
    alert('Bir isim girmediniz.');
   }
}

function clock(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const weekday = ["Pazar","Pazartesi","Salı","Çarsamba","Perşembe","Cuma","Cumartesi"];
    let day = weekday[date.getDay()]
    const clocks = document.querySelector('#date');
    console.log(clocks);
    setInterval(clock, 1000);
    clocks.innerHTML = `${hours}:${minutes}:${seconds}   ${day}`
}

    



showTime();
clock();

