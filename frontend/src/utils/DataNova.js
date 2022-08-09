const dataNova = (str) => {

    let arr = str.split('/')
    const data = new Date()
    
    data.setDate(arr[0])
    data.setMonth(arr[1] - 1)
    data.setFullYear(arr[2])

    return data

}

export default dataNova