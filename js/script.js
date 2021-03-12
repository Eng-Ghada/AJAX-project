let moviesData=document.getElementById("moviesData");
let moviesReceived=[];
let moviesReceivedCat=[];
let moviesReceivedAll=[];
let searchBox=document.getElementById("searchBox");
let searchBoxAll=document.getElementById("searchBoxAll");
let pages;



/* fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&query=all&page=1&include_adult=false")
    .then(response => response.json())
    .then(data =>{ moviesReceived=data.results;pages=Number(data.total_pages);displayMovies(); });   
 */


for(let pageNumber=1;pageNumber<=55;pageNumber++)//to get all pages of now playing category
{ 
    fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&query=all&page="+pageNumber+"&include_adult=false")
    .then(response => response.json())
    .then(data =>{ moviesReceived=data.results;
        
    });    
};


 for(let pageNumber=1;pageNumber<=300;pageNumber++)//to get all pages of movies
{ 
    fetch("https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&query=all&page=all&include_adult=false&page="+pageNumber+"")
    .then(response => response.json())
    .then(data =>{ moviesReceivedAll=data.results; }); 
}; 

/////https://api.themoviedb.org/3/search/keyword?api_key=<<api_key>>&page=1 ///search by word

//Creat API request and receiving data & showing it 
  let myRequest =new XMLHttpRequest;
myRequest.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&query=all&page=1&include_adult=false")
myRequest.send();

myRequest.addEventListener("readystatechange",function()
{
    if(myRequest.readyState==4 && myRequest.status==200)
    {
        moviesReceived=JSON.parse(myRequest.response).results  ;
        console.log(moviesReceived);
        displayMovies();
    }
});  
 

//Function to display movies 
function displayMovies()
{
    let cartona=" ";
    for(let i=0;i<moviesReceived.length;i++)
    {
        cartona += `<div  class="col-md-4 mb-5 text-center">
                    <div id="filmPoster" class="item">
                    <img  src="https://image.tmdb.org/t/p/w500${moviesReceived[i].poster_path}">
                    <div  class=" filmInfo">
                    <h2 class="h1 pt-5">${moviesReceived[i].title}</h2>
                    <p class="overview">${moviesReceived[i].overview}</p>
                    <p class="">rate: ${moviesReceived[i].vote_average}</p>
                    <p>${moviesReceived[i].release_date}</p>
                    </div>
                    </div>
                    </div>`
    }

    moviesData.innerHTML =cartona;
}


//Function search in specific category
function searchMovie(searchTerm)
{   
    let cartona='';
   
    for(let i=0;i<moviesReceived.length;i++)
    {
        if(moviesReceived[i].title.toLowerCase().includes(searchTerm.toLowerCase())==true)
        {
            cartona += `<div  class="col-md-4 mb-5 text-center">
            <div id="filmPoster" class="item">
            <img  src="https://image.tmdb.org/t/p/w500${moviesReceived[i].poster_path}">
            <div  class=" filmInfo">
            <h2 class="h1 pt-5">${moviesReceived[i].title}</h2>
            <p class="overview">${moviesReceived[i].overview}</p>
            <p class="">rate: ${moviesReceived[i].vote_average}</p>
            <p>${moviesReceived[i].release_date}</p>
            </div>
            </div>
            </div>`
        }
    }
    moviesData.innerHTML =cartona;
} 


//Function search in all categories
function searchMovieAll(searchTerm)
{   
    let cartona='';
    for(let i=0;i<moviesReceivedAll.length;i++)
    {
        if(moviesReceivedAll[i].title.toLowerCase().includes(searchTerm.toLowerCase())==true ||moviesReceivedAll[i].original_title.toLowerCase().includes(searchTerm.toLowerCase())==true  )
        {
            cartona += `<div  class="col-md-4 mb-5 text-center">
            <div id="filmPoster" class="item">
            <img  src="https://image.tmdb.org/t/p/w500${moviesReceivedAll[i].poster_path}">
            <div  class=" filmInfo">
            <h2 class="h1 pt-5">${moviesReceivedAll[i].title}</h2>
            <p class="overview">${moviesReceivedAll[i].overview}</p>
            <p class="">rate: ${moviesReceivedAll[i].vote_average}</p>
            <p>${moviesReceivedAll[i].release_date}</p>
            </div>
            </div>
            </div>`
        }
    }
    moviesData.innerHTML =cartona;  
} 


//Events call search functions
searchBox.addEventListener("keyup",function(){
    searchMovie(this.value);
});

searchBoxAll.addEventListener("keyup",function(){
    searchMovieAll(this.value);
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SideBar

$("#menuBtn").click(function(){
    if($(".menu").css("left")<"0px")
    {
        $("#menuBtnIcon").toggleClass('fa-times fa-bars');
        $(".menu").animate({left:'0px'},500);
        $("#lightSide").animate({left:'204px'},500);
        $("#a1").animate({top:'7%',opacity:'100%'},800);
        $("#a2").animate({top:'14%',opacity:'100%'},1000);
        $("#a3").animate({top:'21%',opacity:'100%'},1200);
        $("#a4").animate({top:'28%',opacity:'100%'},1300);
        $("#a5").animate({top:'35%',opacity:'100%'},1400);
        $("#a6").animate({top:'42%',opacity:'100%'},1500);

    }

    else
    {
        $("#menuBtnIcon").toggleClass('fa-bars fa-times');
        $(".menu").animate({left:'-204px'},500);
        $("#lightSide").animate({left:'0px'},500);
        $("#a1").animate({top:'50%',opacity:'100%'},1000);
        $("#a2").animate({top:'60%',opacity:'100%'},1200);
        $("#a3").animate({top:'70%',opacity:'100%'},1400);
        $("#a4").animate({top:'80%',opacity:'100%'},1600);
        $("#a5").animate({top:'90%',opacity:'100%'},1800);
        $("#a6").animate({top:'100%',opacity:'100%'},2000);
    }
    
});

//sidebar menu
function displayMoviesCategory(categ,trend)
{
    fetch("https://api.themoviedb.org/3/"+trend+"movie/"+categ+"?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&query=all&page=1&include_adult=false")
    .then(response => response.json())
    .then(data =>{ moviesReceivedCat=data.results;console.log(moviesReceivedCat);
   
    let cartona=" ";
    for(let i=0;i<moviesReceivedCat.length;i++)
    {
        cartona += `<div  class="col-md-4 mb-5 text-center">
                    <div id="filmPoster" class="item">
                    <img  src="https://image.tmdb.org/t/p/w500${moviesReceivedCat[i].poster_path}">
                    <div  class=" filmInfo">
                    <h2 class="h1 pt-5">${moviesReceivedCat[i].title}</h2>
                    <p class="overview">${moviesReceivedCat[i].overview}</p>
                    <p class="">rate: ${moviesReceivedCat[i].vote_average}</p>
                    <p>${moviesReceivedCat[i].release_date}</p>
                    </div>
                    </div>
                    </div>`
    }

    moviesData.innerHTML =cartona; });

}

$("#a1").click(function(){
$(window).scrollTop(0);
displayMoviesCategory('now_playing','');
});

$("#a2").click(function(){
    $(window).scrollTop(0);
    displayMoviesCategory('popular','');
});   

$("#a3").click(function(){
    $(window).scrollTop(0);
    displayMoviesCategory('top_rated','');
});  

$("#a4").click(function(){
    $(window).scrollTop(0);
    displayMoviesCategory('day','trending/');
}); 


$("#a5").click(function(){
    $(window).scrollTop(0);
    displayMoviesCategory('upcoming','');
}); 
   
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Contact Info 

//Regular Expressions for Validations
let regexName=/^([A-Za-z]{1,})$/;
let regexPhone=/^[0-9]{10,12}$/;
let regexPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
let regexAge=/^(?:[1-9][0-9]?|100)$/;
let regexEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//Get Inputs
let userPass=document.getElementById("userPass");
let userRepass=document.getElementById("userRepass");
let userName =document.getElementById("userName");
let userAge =document.getElementById("userAge");
let userPhone =document.getElementById("userPhone");
let userEmail =document.getElementById("userEmail");


//Validation Functions
function validatPassword()
{
    if(regexPassword.test(userPass.value))
    {
       $("#userPassAlert").hide();
        return true;
    }

    else
    {
        $("#userPassAlert").show();
        return false;
    }
}

function validatName()
{
    if(regexName.test(userName.value))
    {
        $("#userNameAlert").hide();
        return true;
    }

    else
    {
        $("#userNameAlert").show();
        return false;
    }
}

function validatAge()
{
    if(regexAge.test(userAge.value))
    {
        $("#userAgeAlert").hide();
        return true;
    }

    else
    {
        $("#userAgeAlert").show();
        return false;
    }
}

function validatPhone()
{
    if(regexPhone.test(userPhone.value))
    {
        $("#userPhoneAlert").hide();
        return true;
    }

    else
    {
        $("#userPhoneAlert").show();
        return false;
    }
}

function validatEmail()
{
    if(regexEmail.test(userEmail.value))
    {
        $("#userEmailAlert").hide();
        return true;
    }

    else
    {
        $("#userEmailAlert").show();
        return false;
    }
}

function validatRepassword()
{
     if(userPass.value==userRepass.value)
    {
        $("#userRepassAlert").hide();
        return true;
    }

    else
    {
        $("#userRepassAlert").show();
        return false;
    }
}


//Event for submit button enabled and disabled
$(document).ready( function() {
    
    $("#submitBtn").prop('disabled', true);
    $('input').on('change', function () {
    if(validatPhone()==true && validatRepassword()==true && validatName()==true && validatPassword()==true && validatEmail()==true && validatAge()==true)
    {
        $("#submitBtn").prop( 'disabled', false );
    }

    else
    {
        $("#submitBtn").prop('disabled', true);
    }
     });
      
});


//Events call Validation Functions
userPass.addEventListener("keyup",validatPassword);
userName.addEventListener("keyup",validatName);
userAge.addEventListener("keyup",validatAge);
userEmail.addEventListener("keyup",validatEmail);
userRepass.addEventListener("keyup",validatRepassword);
userPhone.addEventListener("keyup",validatPhone);

/////////////////////////////////////////////////////////////////////////
