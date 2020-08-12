var list=document.getElementById("list");

var database = firebase.database();


function sendMesssage()
{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  dateTime=dateTime.toString();



    var todo=document.getElementById("todo-item").value;
//console.log(todo+dateTime);
let i=0;
var key=firebase.database().ref('Todo').push().key;
var Todo={
    item:todo,
    date:dateTime,
    key:key
}
firebase.database().ref('Todo/'+key).set(Todo);


//refreshing the page remove this lines and see the error and if there is a way to overcome it I dont know
var x = window.location.href;
x = x.split( '#' );
window.location.href = x[0];

}

var ref = database.ref('Todo');
ref.on('value',gotData,errData);


function gotData(data){
    //console.log(data.val());
    var tod=data.val();
    var keys=Object.keys(tod);

 
 
    for(var i=0;i<keys.length;i++)
    {


        var k=keys[i];
        var ins=k.toString()
        var initials=tod[k].date;
        var todos=tod[k].item;
        var kay=tod[k].key;
       // console.log(initials,todos);



        //create li text node
    var li=document.createElement("li");
    

    //create element span

    var para=document.createElement("span");
    para.setAttribute("id","para");

   para.innerHTML=todos+" <b>Time:</b> "+initials;

    li.appendChild(para);


    var para1=document.createElement("span");
    para1.setAttribute("id","para1");
   para1.innerHTML=kay.toString();
    li.appendChild(para1);



    //create delete button
    var delBtn=document.createElement("img");
    delBtn.setAttribute("onclick","deleteItem(this)");

   
    delBtn.setAttribute("src","Images/delete.png");
    delBtn.setAttribute("class","btn");
    
    // delBtn.addEventListener('click',deleteItem(this));

    //create edit Button
    var editBtn=document.createElement("img");
    editBtn.setAttribute("src","Images/edit.png");
    
    editBtn.setAttribute("class","editButton");
    editBtn.setAttribute("onclick","editItem(this)");

    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);


    }

}

function errData(err){
    console.log('Error!');
    console.log(err);
}



// Listen for form submit
document.getElementById('todoItem').addEventListener('click', submitForm);

// Submit form
function submitForm(e){
e.preventDefault();


// Show alert
document.querySelector('.alert').style.display = 'block';

// Hide alert after 3 seconds
setTimeout(function(){
  document.querySelector('.alert').style.display = 'none';
},3000);

}




function deleteItem(data)
{
    var val=document.getElementById("para1").innerHTML;
    console.log(val);
    let userRef = this.database.ref('Todo/'+val);
    userRef.remove()
    //refreshing the page there is error in firebase i will tell you if you remove this 3 lines then check whats the error
    var x = window.location.href;
    x = x.split( '#' );
    window.location.href = x[0];
}

function deleteAll()
{
    let userRef = this.database.ref('Todo/');
    userRef.remove()
    //refreshing the page there is error in firebase i will tell you if you remove this 3 lines then check whats the error
    var x = window.location.href;
    x = x.split( '#' );
    window.location.href = x[0];
}

function editItem(e)
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    dateTime=dateTime.toString();

    var val=document.getElementById("para1").innerHTML;
    console.log(val);
    let userRef = this.database.ref('Todo/'+val);
    
var up=prompt("Enter a value to update todo item")

userRef.update({
    'item': up,
    'date':dateTime
});


  //refreshing the page there is error in firebase i will tell you if you remove this 3 lines then check whats the error
    var x = window.location.href;
x = x.split( '#' );
window.location.href = x[0];
}


