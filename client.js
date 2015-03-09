
var sharejs = require('share').client;

var util = require('util')

function logger(id){
  return function(){
    var args = [].slice.apply(arguments)

    var msg = util.format.apply(null, arguments)
    args.unshift(id)
    console.log('<id %s>: %s', id, msg)
  }
}

function __genid(){
  return (Math.random()*0x100000000).toString(36)
}

var docid = 'words2' //__genid()

sharejs.open(docid, 'json', 'http://localhost:3000/channel', function(error, doc) {
  var log = logger(1)

  log(doc.get())

  doc.on('change', function(op){
    log(op)
  })

  doc.set({items: []})
  
});



setTimeout(function(){

  var log = logger(2)

  log('connecting')

  sharejs.open(docid, 'json', 'http://localhost:3000/channel', function(error, doc) {

    log(doc.get())

    var items = doc.at('items')

    items.on('child op', function(op){
      log('child op', op)
    })

    items.on('change', function(op){
      log('change', op)
    })


    setInterval(function(){
      var w = __genid()
      var idx = Math.floor(Math.random()*(items.get().length+1))
      log('inserting %s to items at %s', w, idx)

      debugger

      items.insert(idx, w)

      log('items', items.get())
      
    },1000)

    setInterval(function(){
      var w = __genid()
      var idx = Math.floor(Math.random()*(items.get().length))
      log('replacing %s to items at %s', w, idx)
      doc.setAt(['items', idx], w)

      log('items', items.get())
      
    },1100)

    setInterval(function(){
      var idx = Math.floor(Math.random()*(items.get().length))
      log('removing from items at %s', idx)
      doc.removeAt(['items', idx])

      log('items', items.get())
      
    },1200)


  });  
  
  
},3000)



