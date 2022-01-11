const  SeqDM  = require("../models/seq");

const nextSeq = async ( name ) => {

    const filter = { name: name };
    const update = {};
    update['$inc'] = {};
    update['$inc']['seq'] = 1;
    var ret = await SeqDM.findOneAndUpdate(filter, update,{ new: true } )
    return ret;
}

const formatId = (num,long)=> {
    while (num.length<long)
      num = '0'+num;
    return  num; 
}

module.exports = {
    nextSeq,
    formatId
}