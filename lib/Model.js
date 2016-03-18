var dataStore = require("./DataStore.js").store;

function Model(schema){
  this.schema = schema;
  this.id = null;

  for(var key in schema){
    this[key] = null;
  }

  if(!dataStore[this.constructor.name]){
    dataStore[this.constructor.name] = [];
  }

}

Model.prototype.save = function(){

  if(!this.id){
    this.id = this.constructor.getNextId();
    dataStore[this.constructor.name].push(this);

  }
};

Model.prototype.destroy = function(){
  dataStore[this.constructor.name][this.id - 1] = null;
};

Model.find = function(id){

  var arrIndex = id - 1;

  if(!(dataStore[this.name][arrIndex])){

    console.log('null');
    return null;
  }

  return dataStore[this.name][arrIndex];
};

Model.getNextId = function(){
  if(dataStore[this.name].length === 0){
    return 1;
  }
  return dataStore[this.name].length + 1;
};



Model.extend = function(klass){

  for(var k in this.prototype){
    if(this.prototype.hasOwnProperty(k)){
      klass.prototype[k] = this.prototype[k];
    }
  }


  for(var j in this){
    if(this.hasOwnProperty(j)){
      klass[j] = this[j];
    }
  }

  return klass;

};

function Obj(){

}


module.exports = Model;