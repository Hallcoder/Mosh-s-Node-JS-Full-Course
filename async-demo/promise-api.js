const p1=new Promise((resolve)=>{
    setTimeout(()=>{
console.log("Asynchronous op1...")
resolve(1);
    },2000)
});

const p2=new Promise((resolve)=>{
    setTimeout(()=>{
console.log("Asynchronous op2...")
resolve(9)
    },2000)
});

Promise.race([p1,p2])
.then(result => console.log(result))
.catch(err => console.log(err.message))