const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground") // returns a promise
  .then(_ => console.log("Connected to the database..."))
  .catch(err => console.log("Error  : ", err.message));

const courseSchema = new mongoose.Schema({
  name: {
    type: String, 
    required:true,
    maxlength:255,
    minlength:5
  },
  category:{
    type:String,
    enum:["Web","mobile","desktop"],
    required:true,
    //match:/pattern/

  },
  author: String,
  //tags: [String],
  tags:{
    type: Array,
    validate:{
      validator: function(v){
       return v.length>0; 
      },
      message:"A course should have at least one tag"
    },
    required: true
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price:{
    type: Number ,
    //min and max for also dates
    required : function(){return this.isPublished}
  }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name:"React JS",
    author: "Mosh",
    category:'Web',
    tags: ['webdev'],
    isPublished: true,
    price:5000
  });
  try{
 //returns a promise of void
 const result = await course.save();  //returns a promise result is actually the saved object
  console.log(result);
  console.log("Course created..")
  }
  catch(err){
   for(field in err.errors)
   console.log(err.errors[field].message)
  }
  
}
// async function getCourses(){

//   const courses = await Course
// // .find({author:'Mosh',isPublished: true})//returns a document query and can have filters
// //.find({price: {$gt: 10, $lte:20}})
//   //.find({price: { $in: [10,15,20]}})
//   .find()
//   .or([{author:"Mosh"},{isPublished: true}])
//   //the same as and operator
//   .limit(10)//number of documents you want to get
//   .sort({name: 1})// sort by a given property 
//   .select({name:1,tags:1})// select the only properties you want to get 
//   console.log(courses)
// }
//createCourse();

// async function getCourses(){

//   const courses = await Course
//   //.find({name: "Mosh",isPublished:true})
//   //starts with Mosh
//   .find({author:/^Mosh/})

//   //Ends with hamedani
//   .find({author:/hamedani$/i})

//   //contains the word Mosh
// .find({author: /.*mosh.*/i})

//   .limit(10)//number of documents you want to get
//   .sort({name: 1})// sort by a given property 
//   .select({name:1,tags:1})// select the only properties you want to get 
//   console.log(courses)
// }
async function getCourses(){
const pageNumber = 2;
const pageSize= 10;

  const courses = await Course
  .find({author: "Mosh",isPublished:true})
  .skip((pageNumber-1)*size)
  .limit(pageSize)//number of documents you want to get
  .sort({name: 1})// sort by a given property 
  .select({name:1,tags:1})// select the only properties you want to get 
  .count()
  console.log(courses)
}

async function updateCourse(id){
  /* ------This updates a document indirectly----- */
//   const course = await Course.findById(id);
//   if(!course) return;
//   course.isPublished = true;
//   course.author = "Another Author"

//  const result = await course.save()
//  console.log(result);

/* <<<<<<While this updates a document directly>>>>>> */
const result = await Course.updateOne({_id: id},{
  $set:{
    author:"Mosh",
    isPublished: false
  }
})

}

async function removeCourse(id){
 //const result  = await  Course.deleteMany({_id:id});
 try{
  const course = Course.findByIdAndRemove(id)
  console.log(course)
 }
 catch(err){
  console.log(err)
 }
}
//removeCourse("6211cf320d305741e5e54424");
createCourse()