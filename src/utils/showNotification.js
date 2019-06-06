let mag='error occurred';
let magType='error';
export  const showNotification=(response,message)=>
{  
     
    try 
    { if(typeof response!==undefined)
        {  console.log('response--',response)
           if(response.status===200 &&typeof message!==undefined ){
                mag=message;
                magType='success'
            }
            else if(response.status>=400 && response.status<500){  
                    console.log("400>n>500",response.data) 
                    if(typeof response.data!==undefined)   
                    {
                   const err=  response.data.errors 
                   console.log(err)
                    for (var key in err) {
                         mag= err[key] ;
                         break;
                    }
                     
                 } 
            }
            global.dropdown.alertWithType(magType,'',mag);
        }
        else
          global.dropdown.alertWithType(magType,'','error occurred');
    }
    catch(e)
    {
          global.dropdown.alertWithType(magType,'',mag);
    }
}
      
  
       

                
               
        
        