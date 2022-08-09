import  { jwtServerInstance }  from '@/utils/api/index'

//JWT登录认证接口
export const login = (userName:string,passWord:string) => {
  return jwtServerInstance.request({
      url:'/authentication',
      method:'post',
      data:{
          username: userName,
          password: passWord
      }
  }) 
}

export const refreshToken = () => {
  return jwtServerInstance.request({
      url:'/refreshtoken',
      method:'get'
  })
}

//通用分页查询接口
export const queryInfo = (url:string,pageNo:number,pageSize:number,keyword:string) => {

  return jwtServerInstance.request({
      url:url+"?pageNo="+pageNo+"&pageSize="+pageSize+
      "&keyword="+keyword,
      method:'get'
  }) 
}

export const saveInfo = (url:string,formData:object)=>{
  
  return jwtServerInstance.request({
    url:url,
    method:'post',
    data: formData
})
}

export const updateInfo = (url:string,formData:any)=>{
  
  return jwtServerInstance.request({
    url:url,
    method:'put',
    data: formData
})
}

export const deleteInfo = (url:string,id:number)=>{
  
  return jwtServerInstance.request({
    url:url+"?id="+id,
    method:'delete'
})
}

export const queryAssoiation = (url:string,id:number)=>{
  return jwtServerInstance.request({
    url:"/association"+url+"?id="+id,
    method:'get'
})}

export const deleteAssoiation = (url:string,id:number,name:string)=>{
  return jwtServerInstance.request({
    url:"/association"+url+"?id="+id+"&name="+name,
    method:'delete'
})}

export const saveAssoiation = (url:string,id:number,name:string)=>{
  return jwtServerInstance.request({
    url:"/association"+url+"?id="+id+"&name="+name,
    method:'post'
})}