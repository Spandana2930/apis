// importing elemenets from html
let getel = document.getElementById("get");
let getInputel = document.getElementById("getInput")
let getResultel = document.getElementById("getResult")


const display = (data) =>{
  // data = JSON.stringify(data)
  for(let each of data){
    let para = document.createElement('p')
    each = JSON.stringify(each)
    para.innerHTML = each
    getResultel.appendChild(para)
  }
}

const getMethod = () =>{
        let url = getInputel.value;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                display(jsondata);
            });
}

getel.addEventListener("submit", function(event){
    event.preventDefault();
    getMethod();
  });