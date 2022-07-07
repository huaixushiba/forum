export const setStore = (name,data)=>{
    if(!name) return
    if(typeof data !== 'string'){
        data = JSON.stringify(data)
    }
    window.localStorage.setItem(name,data)
}
export const getStore = name=>{
    if(!name) return
    return window.localStorage.getItem(name)
}
export const removeStore = name=>{
    if(!name) return
    window.localStorage.removeItem(name)
}