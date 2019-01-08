import axios from 'axios';

export function getLogin(user) {
    return axios.post('/api/v1/auth/getLogin',user)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}


export function modiUser(user) {
    return axios.post('/api/v1/auth/modiUser',user)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}



export function userAdd(user) {
    return axios.post('/api/v1/auth/userAdd',user)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}



export function getUser() {
    return axios.get('/api/v1/auth/getUser')
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}


///////////////////////////////
// 업무일지 관련
///////////////////////////////

export function regWork(work) {
    return axios.post('/api/v1/work/regWork',work,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}


export function confirmWork(work) {
    return axios.post('/api/v1/work/confirmWork',work)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}

export function delWork(work) {
    return axios.post('/api/v1/work/delWork',work)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}


export function completeWork(work) {
    return axios.post('/api/v1/work/completeWork',work)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}

export function getWork(page,limit,viewer,position,order,orderby,searchObj) {
    let url = `/api/v1/work/getWork?page=${page}&limit=${limit}&viewer=${viewer}&position=${position}&order=${order}&orderby=${orderby}`

    if ( searchObj)
        url +=`&condi=${searchObj.condi}&value=${searchObj.value}&start=${searchObj.start}&end=${searchObj.end}`
    return axios.get(url)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}


export function regComment(comment) {
    return axios.post('/api/v1/work/regComment',comment)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}


export function getComment(id) {
    return axios.get(`/api/v1/work/getComment?id=${id}`)
    .then(function(response){
// console.log(response)
        if ( response.data.code=='ok')
            return response.data.data
        else
            return []

    })
    .catch(function(response){
        return response
    })

}
