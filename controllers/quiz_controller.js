var models = require('../models/models.js');

//Autoload -factoriza el código si incluye :quizId
exports.load = function(req,res, next, quizId){
	models.Quiz.find({
		where:{id:Number(quizId)},
		include: [{model: models.Comment}]
	}).then(function(quiz){
		if(quiz){
			req.quiz=quiz;
			next();
		}
		else{next(new Error('No existe quizId= ' + quizId));}
		}
	).catch(function(error){next(error);});
};

exports.index = function(req, res, next){
	if(req.query.search){
		models.Quiz.findAll({where: ["pregunta like ?", '%'+req.query.search+'%'], order: "pregunta"}).then(function(quizes){
			res.render('quizes/index.ejs',{quizes: quizes, errors: []});
		})
		.catch(function(error){next(error);});
	}
	else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index.ejs',{quizes: quizes, errors: []});
		})
		.catch(function(error){next(error);});		
	}
}

//GET /quizes/:id
exports.show = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: req.quiz, errors: []});
	});
}

//GET /quizes/:id/answer
exports.answer = function(req,res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		var resultado = "Incorrecto";
		if(req.query.respuesta===quiz.respuesta)
			resultado = "Correcto";
		res.render('quizes/answer',{quiz: quiz , respuesta: 'Correcto', errors: []});
		// if(req.query.respuesta===quiz.respuesta)
		// 	res.render('quizes/answer',{quiz: quiz , respuesta: 'Correcto'});
		// else
		// 	res.render('quizes/answer',{quiz: quiz , respuesta: 'Incorrecto'});
	});
}

//GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build(
		{pregunta: "Pregunta", respuesta: "Respuesta", categoria: "Otro"}
		);
	res.render('quizes/new', {quiz:quiz, errors: []});
}


//POST /quizes/create
exports.create = function(req,res){
	var quiz = models.Quiz.build(req.body.quiz);
	//validar la nueva entrada
	quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/new',{quiz:quiz, errors:err.errors});
			}
			else{
				//Guarda en la BD la pregunta y respuesta nueva
				quiz.save({fields: ["pregunta","respuesta","categoria"]}).then(
					function(){
					res.redirect('/quizes'); //Redireccionar a HTTP URL relativo del listado de preguntas
					}
				)}
			})
}


//GET quizes/::id/edit
exports.edit = function(req,res){
	var quiz = req.quiz;//autoload de instancia quiz
	res.render('quizes/edit',{quiz:quiz, errors: []});
}


//PUT quizes/:id
exports.update = function(req,res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.prespuesta;
	req.quiz.categoria = req.body.quiz.categoria;
	//validar la entrada actualizada
	req.quiz
	.validate()
	.then(
		function(err){
			if(err){
				res.render('quizes/edit',{quiz: req.quiz, errors:err.errors});
			}
			else{
				//Guarda en la BD la pregunta y respuesta actualizada
				req.quiz.save({fields: ["pregunta","respuesta","categoria"]}).then(
					function(){
					res.redirect('/quizes'); //Redireccionar a HTTP URL relativo del listado de preguntas
					}
				)}
			})
}


//DELETE quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error);});
};





