const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
  //single document
  // author : {
  //   type: authorSchema,
  //   required: true
  // }
  /* array of sub-document */

  
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
// async function addAuthor(id,author){
// const  course = await Course.findById(id)
//  course.authors.push(author)
//  await course.save()
//  console.log(author)
// }
// addAuthor("62300ea9c22aa86856884233",{name:"Zesta"})

async function removeAuthor(id,authorId){
  
  const  course = await Course.findById(id)
  //My way:
  // let authors  = course.authors
  // authors.forEach(author => {
  //   if(author._id == authorId){
  //     const authorIndex = authors.indexOf(author)
  //     return authors.splice(authorIndex,1)
  //   }
  // });
  /* Easy way */
  const author = course.authors.id(authorId);
  author.remove()
  await course.save()
 console.log(course)
}
removeAuthor('62300ea9c22aa86856884233','62300ea9c22aa86856884235')
// createCourse('Node Course', [
//   { name: 'Mosh' },
//   { name: 'John' }
// ]);
