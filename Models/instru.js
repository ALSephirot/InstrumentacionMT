exports = module.exports = function(app, mongoose) {
  var EventsSchema = new mongoose.Schema({
    Informacion:
    {
      evento: String,
      modulo: String,
      detalleevento: String,
      plataforma: String,
      idCelular: String,
      Datetime: Date
    }
  });

  mongoose.model('Instru', EventsSchema);
};