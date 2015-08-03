var models = require('../models/models.js');

//Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
            where: {
                id: Number(commentId)
            }
        }).then(function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else{next(new Error('No existe commentId=' + commentId))}
    }
  ).catch(function(error){next(error)});
};


//GET /quizes/:quizId/comments/new
exports.new = function(req,res){
	res.render('comments/new.ejs',{quizid: req.params.quizId, errors:[]});
};

//POST /quizes/:quizId/comments
exports.create = function(req,res){
	var comment = models.Comment.build(
		{
			texto: req.body.comment.texto,
			QuizId: req.params.quizId
		});
	//validar la nueva entrada
	comment
	.validate()
	.then(
		function(err){
			if(err){
				res.render('comments/new',{comment:comment, quizid:req.params.quizId, errors:err.errors});
			}
			else{
				//Guarda en la BD el campo texto comment
				comment
				.save()
				.then(
					function(){
					res.redirect('/quizes/' + req.params.quizId); //Redireccionar a HTTP URL a la pregunta que ibamos a añadir el comentario
					}
				)}
			}).catch(function(error){next(error)});
};