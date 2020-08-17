//Authentication method

const auth = firebase.auth();
function signUp()
{
    var email=document.getElementById('email');
    var password=document.getElementById('password');

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
  
  alert("Signed Up");
}
//signup funcstion


//Sigin function
function signIn(){
  
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    
   }

   function signOut(){
  
    auth.signOut();
    alert("Signed Out");
    document.getElementById('hide').style="display:none;";
    document.getElementById('formContainer').style="display:block;";
   }
   

   var email;
 auth.onAuthStateChanged(function(user){
  
    if(user){
     
     email = user.email;
     alert("Active User " + email);
     
     //Take user to a different or home page
  
     //is signed in

     document.getElementById('hide').style="display:block;";
     document.getElementById('formContainer').style="display:none;";
    }else{
        document.getElementById('hide').style="display:none;";
        document.getElementById('formContainer').style="display:block;";
     alert("No Active User");
     //no user is signed in
    }
    
    
    
   });




//Authentication method



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
    key:key,
    User:email
}
firebase.database().ref('Todo/'+key).set(Todo);


////////////////////////////////////////////////////////////////////////////////////////////////////
   //create li text node
   var li=document.createElement("li");
    

   //create element span

   var para=document.createElement("span");
   para.setAttribute("id","para");

  para.innerHTML=todo+" <b>Time:</b> "+dateTime;

   li.appendChild(para);


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


     //create done Button
     var doneBtn=document.createElement("img");
     doneBtn.setAttribute("src","Images/done.png");
     doneBtn.setAttribute('id','done');
     doneBtn.setAttribute("class","doneButton");
     doneBtn.setAttribute("onclick","doneItem(this)");
 
     li.appendChild(doneBtn);
     var list=document.getElementById("list");
     list.appendChild(li);

////////////////////////////////////////////////////////////////////////////////////////////////////




//refreshing the page remove this lines and see the error and if there is a way to overcome it I dont know
// var x = window.location.href;
// x = x.split( '#' );
// window.location.href = x[0];

}

var ref;
function IWILL()
{
ref = database.ref('Todo');
ref.once('value',gotData,errData);
}

window.onload=IWILL();

function gotData(data)
{
    //console.log(data.val());
    var tod=data.val();
    var keys=Object.keys(tod);

 
 
    for(var i=0;i<keys.length;i++)
    {


        var k=keys[i];
        var ins=k.toString()
        var initials=tod[k].date;
        var todos=tod[k].item;
        //var kay=tod[k].key;




        //create li text node
    var li=document.createElement("li");
    

    //create element span

    var para=document.createElement("span");
    para.setAttribute("id","para");

   para.innerHTML=todos+" <b>Time:</b> "+initials;

    li.appendChild(para);


    var para1=document.createElement("span");
    para1.setAttribute("id","para1");
   para1.innerHTML=ins;
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


      //create done Button
      var doneBtn=document.createElement("img");
      doneBtn.setAttribute("src","Images/done.png");
      doneBtn.setAttribute('id','done');
      doneBtn.setAttribute("class","doneButton");
      doneBtn.setAttribute("onclick","doneItem(this)");
  
      li.appendChild(doneBtn);
      var list=document.getElementById("list");
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




function deleteItem(e)
{
    var val=e.parentNode.childNodes[1].innerHTML;
    console.log(val);
    let userRef = this.database.ref('Todo/'+val);
    userRef.remove()
    // refreshing the page there is error in firebase i will tell you if you remove this 3 lines then check whats the error
    var x = window.location.href;
    x = x.split( '#' );
    window.location.href = x[0];
}

function doneItem(e)
{
    var done=e.parentNode.childNodes[2]
    console.log(done);
    //document.getElementById('done').addEventListener("click",deleteAll)
    done.removeAttribute("onclick","doneItem(this)");
    done.setAttribute('onclick',"undo(this)");

    console.log(done);
    var text=e.parentNode;
    console.log(text);
    text.style.textDecoration='line-through';
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

var val;

var input;
function modal()
{
    document.getElementById("modal").style="display:none;";
     
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    dateTime=dateTime.toString();

   
    console.log(val);
    let userRef = this.database.ref('Todo/'+val);
    

var input=document.getElementById("tod").value;

userRef.update({
    'item': input,
    'date':dateTime
});


//refreshing the page there is error in firebase i will tell you if you remove this 3 lines then check whats the error
    var x = window.location.href;
    x = x.split( '#' );
    window.location.href = x[0];
}


function editItem(e)
{
    document.getElementById("modal").style="display:block;";
     
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    dateTime=dateTime.toString();

    val=e.parentNode.childNodes[1].innerHTML;
    console.log(val);
    let userRef = this.database.ref('Todo/'+val);
    
console.log(input);
userRef.update({
    'item': input,
    'date':dateTime
});


  //refreshing the page there is error in firebase i will tell you if you remove this 3 lines then check whats the error
//     var x = window.location.href;
// x = x.split( '#' );
// window.location.href = x[0];
}

//canel function implementation
function cancel()
{
    var modal=document.getElementById('modal').style="display:none;";
}
