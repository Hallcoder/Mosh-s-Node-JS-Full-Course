
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });
//Async and await
function getTopMovies() {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000)
  })
 ;
}

async function sendEmailTp(){
  try{
    const customer = await getCustomer(1)
  const getTopMovies = await getTopMovies()
  const sendEmail = await sendEmail(customer.email,movies)
  }
  catch(err){
    console.log(`Error: ${err.message}`)
  }
  

}
sendEmailTp()
function getCustomer(id) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  })
  
}


function sendEmail(email, movies) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve();
    }, 4000);
  })
 
}