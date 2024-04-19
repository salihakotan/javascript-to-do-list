let taskListDOM = document.querySelector("#todo-list");
let inputDOM = document.querySelector("#todo-input");

let items = JSON.parse(localStorage.getItem("items")) || [];


loadItems();

function loadItems(){
    console.log("items loading...");

     items = JSON.parse( localStorage.getItem("items")) || [];

    if(items.length > 0) {
        items.forEach(function(item) {
            let liDOM = document.createElement("li");
            liDOM.className = "list-group-item d-flex justify-content-between align-items-center";
            liDOM.innerHTML = `
            <span class="task-text">${item.name}</span>
            <input type="text" class="form-control edit-input" style="display: none;" value="${item.name}">
            <div class="btn-group">
              <button class="btn btn-danger btn-sm delete-btn">✕</button>
              <button class="btn btn-primary btn-sm edit-btn">✎</button>
              <button class="btn btn-success btn-sm check-btn">✔</button>
              <span class="invisible">${item.index}</span>
            </div>`;
            taskListDOM.appendChild(liDOM);
        });
       
    }

    
}




function addNewTaskBtn(event){

    event.preventDefault();

    console.log("add new task btn");
    
    let inputValue = inputDOM.value;

    //if input value null
    if(inputValue === "" || inputValue.trim() === "") {
        $('.text-bg-warning').toast('show');
    } else {
         //get local storage list
        items = JSON.parse( localStorage.getItem("items")) || [];

        $(".text-bg-success").toast("show");
        let liDOM = document.createElement("li");
        liDOM.className = "list-group-item d-flex justify-content-between align-items-center";
        
        liDOM.innerHTML = `
        <span class="task-text">${inputValue}</span>
        <input type="text" class="form-control edit-input" style="display: none;" value="${inputValue}">
        <div class="btn-group">
          <button class="btn btn-danger btn-sm delete-btn">✕</button>
          <button class="btn btn-primary btn-sm edit-btn">✎</button>
          <button class="btn btn-success btn-sm check-btn">✔</button>
          <span class="invisible">${items.length}</span>
        </div>
        `;
        taskListDOM.appendChild(liDOM);



        
        
         //save to local storage
         //write which index
        
            //create task json
            //new index number -> items array length
         let task = {
            index: items.length,
             name:  inputValue
             
         };
 
         items.push(task);
 
         localStorage.setItem("items",JSON.stringify(items));
       
        
   
         //clear input
         inputDOM.value = "";

    }
    
      


       
        
    }

    
    // Event listener for delete button click
   taskListDOM.addEventListener("click",
    function (event) {
        if (event.target.classList.contains("delete-btn")) {
            event.target.parentElement.parentElement.remove();
        // Silinecek öğenin indeksini bulma
        const indexToRemove =  event.target.parentElement.querySelector(".invisible").innerText;

        console.log(indexToRemove);
        items = JSON.parse( localStorage.getItem("items")) || [];

        // Öğeyi diziden kaldırma

        items.splice(indexToRemove, 1);

        // Güncellenmiş diziyi localStorage'a kaydetme
        localStorage.setItem("items", JSON.stringify(items));
           
        }
    });


 // Event listener for edit button click
 taskListDOM.addEventListener("click", function (event) {


    if (event.target.classList.contains("edit-btn")) {

        
        const taskText = event.target.parentElement
            .parentElement.querySelector(".task-text");
        const editInput = event.target.parentElement
            .parentElement.querySelector(".edit-input");
        if (taskText.style.display !== "none") {
            taskText.style.display = "none";
            editInput.style.display = "block";
            editInput.focus();
            event.target.innerHTML = "✔";
        } else {
            taskText.textContent = editInput.value;
            
            
              //get local storage list
         items = JSON.parse( localStorage.getItem("items")) || [];
       
        
        const indexToEdit = parseInt(event.target.parentElement.querySelector(".invisible").textContent);

     
        //save to local storage
        //edit task in array
       
        
        console.log("index to edit" + items[indexToEdit]);
       
            
        updateTaskName(indexToEdit,editInput.value);



            taskText.style.display = "inline";
            editInput.style.display = "none";
            event.target.innerHTML = "✎";
        }
    }
});

        



    // Event listener for check button click
    taskListDOM.addEventListener("click",
    function (event) {
        if (event.target.classList.contains("check-btn")) {
            event.target.parentElement.parentElement.classList.add("completed-task");

            items = JSON.parse( localStorage.getItem("items")) || [];

            


        // items.forEach(function(item) {
        //     if(item.classList.contains("checkedTask")) {
        //         console.log("checked item name : " + item.name);
        //     }
        // });


        }
    });

        


// task adını güncelleme fonksiyonu
function updateTaskName(index, newName) {
    items = JSON.parse( localStorage.getItem("items")) || [];
    // Belirtilen indeksteki task bulma
    items[index].name = newName;;
    // task adını güncelleme
    
    // task güncellenmiş haliyle tekrar localStorage'a kaydetme
    saveTask(items);
}
    
function saveTask(task) {
    localStorage.setItem("items", JSON.stringify(task));
}