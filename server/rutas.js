const Router = require('express').Router();
const Events = require('./modelevent.js')
const Users = require('./modeluser.js')


Router.get('/newUser', function(req, res) {
    let usuario = new Users({
        userId: Math.floor(Math.random() * 50),
        usuario: "marcelo",
        password: "12345",
        nombres: "Marcelo Narvaez",
        fecha_nacimiento: "1978-11-05"
    })

    usuario.save(function(err) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json("Registro guardado")
    })
})


Router.post('/login', function(req, res) {
    let usuario = req.body.user
    let password = req.body.pass

    Users.findOne({usuario: usuario, password: password}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }else{
            if(doc != null){
                res.json('Validado')
            }else{
                res.json('Usuario o contraseña son incorrectos')
            }
        }
    })

})

Router.post('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            res.status(500)
            res.json(err)
        } else {
            req.session = null
            res.json('Validado')
        }
    })
})


Router.get('/events/all', function(req, res) {
    Events.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

Router.post('/events/new', function(req, res) {
    let newId = Math.floor(Math.random() * 100)

    let evento = new Events({
        id: newId ,
        title: req.body.title,
        start: req.body.start,
        end: req.body.end
    })

    evento.save(function(err) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(newId)
    })

})


Router.post('/events/delete/:id', function(req, res) {
    let idEvento = req.params.id
    Events.remove({id: idEvento}, function(err) {
        if(err) {
            res.status(500)
            res.json(err)
        }else{
            res.json("Elemento eliminado")
        }
        
    })
})


Router.post('/events/update/', function(req, res) {


    Events.findOne({id:req.body.id}).exec((err, result) => {
        let idEvento = req.body.id,
            start = req.body.start,
            end   = req.body.end
        if (err){
            res.status(500)
            res.json(err)
        }else{
            Events.update({id: idEvento}, {start: start, end: end}, (err, result) => {
                if (err){
                    res.status(500)
                    res.json(err)
                }else{
                    res.json("Evento ha sido actualizado")
                    console.log(result);
                }
            })
        }
    })

})


module.exports = Router
