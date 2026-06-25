window.addEventListener('DOMContentLoaded',async function(){
    function sleep(dih){
        return new Promise(resolve=>setTimeout(resolve,dih))
    }
    function refreshtitle(title){
        title=title.slice(0,1).toUpperCase()+title.slice(1)
        if(!document.querySelector('title')){
         let t=document.createElement('title')
         document.querySelector('head').append(t)
         t.innerHTML=title
        }
        else{
         document.querySelector('title').innerHTML=title
        }
    }
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
    let quick=false
    if(params.get('quick')){
        if(params.get('quick')=='true'){
            quick=true
        }
        else{
            quick=false
        }
    }

    if(path.startsWith("git_")){
        refreshtitle('redirecting to github')
        goto(`https://github.com/tromoSM/${path.split('git_',2)[1]}`)
    }
    else if(path.startsWith('page_')){
        refreshtitle(`redirecting to ${infojson.redirections.root}`)
        goto(`${infojson.redirections.root}${path.split('page_',2)[1].replaceAll(inlineseperator,'/')}`)
    }
    
    else if(path!=''){
     await fetch("https://raw.githubusercontent.com/tromoSM/tromoSM-assets/refs/heads/main/redirects/redirects.json").then(main=>main.json()).then(async main=>{
        if(path.startsWith('download_')){
            let link
            let type='unavailable'
            if(params.get('type')){
                 link=`${main.redirects.download[path.split('download_',2)[1]][params.get('type')][params.get('os')]}`
                 type=params.get('type')
            }
            else{
                 link=`${main.redirects.download[path.split('download_',2)[1]][params.get('os')]}`
                }
            if(!quick){
                if(main.branding.icon.repos[path.split('download_',2)[1]]){
                    console.log('use splash:true')
                    let wrp=document.createElement('wrap')
                    let splashmark=document.createElement('img')
                    splashmark.setAttribute('splashbg','')
                    splashmark.src=main.branding.icon.structure.replaceAll(main.branding.icon.replace,path.split('download_',2)[1].toUpperCase())
                    let p=document.createElement('p')
                    p.innerText=`${path.split('download_',2)[1]} Download`
                    wrp.append(splashmark,p)
                    document.body.append(wrp)
                    //
                    let maint=document.createElement('p')
                    maint.innerHTML='Your download is starting...'
                    maint.setAttribute('status','')
                    document.body.append(maint)
                    //
                    let desc=document.createElement('p')
                    desc.innerHTML=`If your download doesn't start automatically <a href='${link}'>click here</a>`
                    desc.setAttribute('fallb','')
                    document.body.append(desc)
                    desc.setAttribute('hidden','')
                    // 
                    let infop=document.createElement('p')
                    infop.innerHTML=`
                    <span>Version :</span> ${main.redirects.download[path.split('download_',2)[1]]["version"]}<br>
                    <span>Release Type : ${type}</span><br>
                    <span>OS : </span>${params.get('os')}
                    `
                    infop.setAttribute('infobar','')
                    document.body.append(infop)
                }
            }
            refreshtitle('starting download')
            try{
                goto(link)
                await sleep(500)
                if(!quick){
                document.querySelector('[status]').innerHTML='Your download has started.'
                document.querySelector('[fallb]')?.removeAttribute('hidden')
                }
                refreshtitle('download started')
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