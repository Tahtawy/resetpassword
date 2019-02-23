export default 
  function reset(obj, fields = 'all') {
    if(fields === 'all') {
      for(let key in obj)
        obj[key] = null;
    }
    else {
      fields.map(item => {
        if(item in obj)
          obj[item] = null
      })
    }
  }