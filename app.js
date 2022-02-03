let id,arrID=[];
async function doTask()
{
    var bar=document.getElementById("input");
console.log(bar.value);
    let endpoint="https://www.omdbapi.com/?s="+bar.value+"&apikey=625ecde2";
    fetch(endpoint).then(response=>{
        if(response.ok)
        return response.json();
        else 
        throw new Error("Error: Not Found");
    }).then(data=>{
        console.log(data);
       
        let a=data.Search;
        //console.log(a);
        let movies=document.getElementById("movies");
        movies.innerHTML="";
        
        a.forEach(element => {
            let name=element.Title;
            id=element.imdbID; 
            arrID.push(id);
            let poster=element.Poster;
            let endpoint2="https://www.omdbapi.com/?i="+id+"&apikey=625ecde2";
            let xhr=new XMLHttpRequest();

            xhr.onreadystatechange=()=>{
                if(xhr.readyState===4 && xhr.status===200)
                {
                    let str=xhr.responseText;
                    let obj=JSON.parse(str);
                    console.log(obj);
            console.log(poster);
            if(poster!=="N/A")
            {
                let movie =`<li><img src="${poster}" onclick="movieDetail(${id})"> <h2>${name}</h2>
                <h2>Year: ${obj.Year}</h2>
                <h2>IMDB Rating: ${obj.imdbRating}</h2>
                <h2>Runtime: ${obj.Runtime}</h2>
                <h2>Genre: ${obj.Genre}</h2>
                
                </li>
                   
                   
                `;
                movies.innerHTML+=movie;
            }      
           
                }
            };
            xhr.open("GET",endpoint2,true);
            xhr.send(null);
            

       
        });
       

    }).catch(error=>{
        console.log(error);
         let er=`<h1 id="error">Movie Not Found :(</h1>`;
         let movies=document.getElementById("movies");
         movies.innerHTML=er;
    })
}
 