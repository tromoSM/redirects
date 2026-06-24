window.addEventListener('DOMContentLoaded',async function(){
    let params=new URLSearchParams(window.location.search)
    let path=''
    if(params.get('key')){
        path=params.get('key')
    }
    else{
        alert('No Path to redirect to. use ?key=path')
    }
    if(path!=''){
     await fetch("https://raw.githubusercontent.com/tromoSM/tromoSM-assets/main/root/info.json").then(main=>main.json()).then(main=>{
        
     })
    }
})