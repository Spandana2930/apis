let putel = document.getElementById("put");
let putInputel = document.getElementById("putInput")
let putNameInputel = document.getElementById("putNameInput")
let putAgeInputel = document.getElementById("putAgeInput")
let putResultel = document.getElementById("putResult")

var formData = {
    name:"",
    age:""
}

putNameInputel.addEventListener("change", function(event) {
    formData.name = event.target.value;
});

putAgeInputel.addEventListener("change", function(event) {
    formData.age = event.target.value;
});

const putMethod = () => {
    if(formData.name === ""){
        delete formData.name;
    }
    if(formData.age === ""){
        delete formData.age
    }
    let options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          'Access-Control-Allow-Origin': 'http://localhost:7000'
        },
        body: JSON.stringify(formData)
    };
    console.log(formData)
        let url = putInputel.value;
        console.log(url);

        fetch(url, options)
          .then(function(response) {
            alert("DATA UPDATED SUCESSFULLY");
          })
}


putel.addEventListener("submit", function(event){
    event.preventDefault();
    putMethod();
  });