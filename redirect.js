window.addEventListener('DOMContentLoaded',async function(){
    let params=new URLSearchParams(window.location.search)
    let path=''
    let infojson=''
    let inlineseperator='0x'
    window.devmode=false
    function goto(page){
        console.log(page)
        if(window.devmode){
            alert(page)
        }
        window.location.replace(page)
    }
    await fetch("https://raw.githubusercontent.com/tromoSM/tromoSM-assets/main/root/info.json").then(inf=>inf.json()).then(info=>{
        infojson=info
    })
    if(params.get('key')){
        path=params.get('key')
    }
    else{
        alert('No Path to redirect to. use ?key=path')
    }
    if(path.startsWith("git_")){
        goto(`https://github.com/tromoSM/${path.split('git_',2)[1]}`)
    }
    else if(path.startsWith('page_')){
        goto(`${infojson.redirections.root}${path.split('page_',2)[1].replaceAll(inlineseperator,'/')}`)
    }

    else if(path!=''){
     await fetch("https://raw.githubusercontent.com/tromoSM/tromoSM-assets/main/redirects/redirects.json").then(main=>main.json()).then(main=>{
        if(path.startsWith('download_')){
            try{
                if(params.get('type')){
                 goto(`${main.redirects.download[path.split('download_',2)[1]][params.get('type')][params.get('os')]}`)
                }
                else{
                 goto(`${main.redirects.download[path.split('download_',2)[1]][params.get('os')]}`)

                }
            }
            catch(er){
                alert(path+" is not valid.\n check console for more info")
                console.error(er)
            }
        }
        else{
          goto(main.redirects[path])
        }
     })
    }
})