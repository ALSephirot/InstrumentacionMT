var mongoose = require('mongoose');
var Instru = mongoose.model('Instru');

  //GET - Return all Users in the DB
  exports.findAllUsers = function(req, res) {
  	console.log(Instru);
  	Instru.find(function(err, users) {
  		console.log(users);
  		if(!err) {
  			res.send(users);
  		} else {
  			console.log('ERROR: ' + err);
  		}
  	});
  };

  //GET - Return a User with specified ID
  exports.findUserById = function(req, res) {
      Instru.findById(req.params.id,function(err, user) {
      if(!err) {
        res.send(user);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a User with specified UserName
  // exports.findUserByNomUsu = function(req, res) {
  //   //Users.findById(req.param.id, function(err, guia) {
  //     Instru.find({NomUsu:req.params.NomUsu},function(err, user) {
  //     console.log(req.params);
  //     if(!err) {
  //       res.send(user);
  //     } else {
  //       console.log('ERROR: ' + err);
  //     }
  //   });
  // };

  //POST - Insert a new User in the DB
  exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);

    try
    {
      var user = new Instru({
        Informacion:
        {

          evento: req.body.Informacion.evento,
          modulo: req.body.Informacion.modulo,
          detalle_evento: req.body.Informacion.detalle_evento,
          plataforma: req.body.Informacion.plataforma,
          idCelular: req.body.Informacion.idCelular,
          Datetime: req.body.Informacion.Datetime
        }
      });

      user.save(function(err) {
        if(!err) {
          console.log('User "'+ req.body.Informacion.evento +'" Created Succefull');
        } else {
          console.log('ERROR: ' + err);
        }
      });

      res.send(user);
    }
    catch(error)
    {
      console.log(error);
    }
    
  };

  //PUT - Update a User already exists
  exports.updateUser = function(req, res)
  {
    Instru.findById(req.params.id, function(err, user) {
      user.Informacion.evento = req.body.BasicInfo.evento,
      user.Informacion.modulo = req.body.BasicInfo.modulo,
      user.detalle_evento = req.body.BasicInfo.detalle_evento,
      user.plataforma = req.body.BasicInfo.plataforma,
      user.idCelular = req.body.BasicInfo.idCelular,
      user.Datetime = req.body.BasicInfo.Datetime

      user.save(function(err) {
        if(!err) 
        {
          console.log('Instru "'+ req.body.BasicInfo.evento +'" Updated Succefull');
        }
        else
        {
          console.log('ERROR: ' + err);
        }

        res.send(user);
      });
    });
  };

  //DELETE - Delete a User with specified ID
  exports.deleteUser = function(req, res) {
    Users.findById(req.params.id, function(err, user) {
      user.remove(function(err) {
        if(!err) {
      console.log('User with Id "'+ req.params.id +'" Removed Succefull');
        } else {
      console.log('ERROR: ' + err);
        }
      })
    });
  }