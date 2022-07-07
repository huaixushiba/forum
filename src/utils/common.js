

export const turnContent = (contentId,router)=>{
    router.push({
        path: `/singlecontent/${contentId}`
     })
}
export const turnUser=(userName,router,store)=>{
    if(store.state.userInfo.userName){
      if(userName == store.state.userInfo.userName){
        router.push('/personarea/')
      }else{
        router.push({
          path: `/singleperson/${userName}`
        })
      }
    }else{
      router.push({
          path: `/singleperson/${userName}`
      })
    }
  }