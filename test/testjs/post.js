//Importing elemets form html page
let postel = document.getElementById("post");
let postInputel = document.getElementById("postInput")
let postIdInputel = document.getElementById("postIdInput")
let postNameInputel = document.getElementById("postNameInput")
let postAgeInputel = document.getElementById("postAgeInput")
let postResultel = document.getElementById("postResult")

// global object
// It will be send as body
var formData = {
    id:"",
    name:"",
    age:""
}

// event listener for Id input element
postIdInputel.addEventListener("change", function(event) {
    formData.id = event.target.value;
});

// event listener for Name input element
postNameInputel.addEventListener("change", function(event) {
    formData.name = event.target.value;
});

// event listener for Age input element
postAgeInputel.addEventListener("change", function(event) {
    formData.age = event.target.value;
});

/**
 * post funciton to add data to database
 * @param {object} formData
 * @returns {String} it will alert us with data updated sucessfully if data is updated
 */
const postMethod = () => {
    let options = {
        method: "POST", // declaring method as post
        //headers to post
        headers: { 
          "Content-Type": "application/json; charset=UTF-8",
          'Access-Control-Allow-Origin': 'http://localhost:7000' // to remove cors error
        },
        body: JSON.stringify(formData) // converting data to JSON string
    };
    console.log(formData)
        let url = postInputel.value;
        console.log(url);

        fetch(url, options)
          .then(function(response) {
            alert("DATA INSERTED SUCESSFULLY");
          })
}

/**
 * 
 */
postel.addEventListener("submit", function(event){
    event.preventDefault();
    postMethod();
  });