var siteNameInput = document.getElementById("siteName")
var siteURLInput = document.getElementById("siteURL")

var websites=[];
if(localStorage.getItem("websitesContainer")!=null){
    websites=JSON.parse(localStorage.getItem("websitesContainer"));
    displayWebsites()
}

function addWebsite(){
    if(validateName() && validateURL()){
        var website={
            name:siteNameInput.value,
            url:siteURLInput.value,
        }
        websites.push(website);
        localStorage.setItem("websitesContainer",JSON.stringify(websites))
            displayWebsites()
            clearForm()
    
    }
    else{
        var errorDiv=document.getElementById("error")
        errorDiv.classList.remove("d-none")
        setTimeout(function() {
            errorDiv.style.display = "none";
          }, 3000);
    }
}
function clearForm(){
    siteNameInput.value=null;
    siteURLInput.value=null;
    siteURLInput.classList.remove("is-valid")

}
function displayWebsites(){
    var cartona=""
    for(var i=0 ; i<websites.length;i++){
        cartona+=`
        <tr>
                        <td>${i+1}</td>
                        <td>${websites[i].name}</td>
                        <td>
                        <a href="${websites[i].url}">${websites[i].url}</a>
                        </td>
                        <td>
                            <button class="btn btn-light px-5" id="submit" onclick="deleteUrl(${i})" >Delete</button>

                        </td>
                    </tr>
        `
        
    }
    document.getElementById("tableData").innerHTML=cartona;
}
function deleteUrl(index){
websites.splice(index,1)
displayWebsites()
localStorage.setItem("websitesContainer",JSON.stringify(websites))
}
function validateURL(){
    var url=siteURLInput.value;
    var valid = /^(ftp|http|https):\/\/[^ "]+(.com)$/.test(url);
    if(valid){
        siteURLInput.classList.add("is-valid")
        siteURLInput.classList.remove("is-invalid")
        return true
    }
    else{
        siteURLInput.classList.add("is-invalid")
        siteURLInput.classList.remove("is-valid")
        return false

    }
}
function validateName(){
    var siteName=siteNameInput.value;
    var valid = /^.{3,}$/.test(siteName);
    if(valid){
        siteNameInput.classList.add("is-valid")
        siteNameInput.classList.remove("is-invalid")
        return true
    }
    else{
        siteNameInput.classList.add("is-invalid")
        siteNameInput.classList.remove("is-valid")
        return false

    }
}