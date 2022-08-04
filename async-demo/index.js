console.log("Before");
// getUser(1)
//   .then(user => getRepositories(user.gitUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log("Commits", commits))
//   .catch(err => console.log("Error",err.message))
// console.log("After");
//Async and Await approach
async function displayCommits(){
   try{
    const user = await getUser(1);
    const repos =await  getRepositories(user.gitUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits)
   }
   catch(err){
       console.log('Error',err.message)
   }
}
displayCommits()
// function displayCommits(commits){
//     console.log(commits);
// }
// function getCommits(repo){
//     getCommits(repo, displayCommits)
// }
// function getRepositories(user){
//     getRepositories(user.gitUsername,getCommits)
// }
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user in a database...");
      resolve({ id: id, gitUsername: "zesta" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Checking Github of ${username} ...`);
      reject(new Error("Could not get the repos"));
    }, 2000);
  });
}
function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Checking commits in the repos...");
      resolve(["commit1"]);
    }, 2000);
  });
}
