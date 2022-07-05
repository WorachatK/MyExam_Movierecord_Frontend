import {useEffect} from 'react'

const Authen = (setCurrentUser) => {
    /////////////////////// Check Authen //////////////////////////

    useEffect(()=>{
        var raw = JSON.stringify({});
        
        const token = localStorage.getItem('token')
        
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: raw,
            redirect: 'follow'
        };
        
        fetch("https://movierecords.herokuapp.com/api/authen", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result['status']==='ok'){
                setCurrentUser(result['decoded'])
            }else{
                setCurrentUser(false)
            }
        })
        .catch(error => console.log(error['message']));
    },[setCurrentUser])
    
    ///////////////////////End Check Authen //////////////////////////

}

export default Authen