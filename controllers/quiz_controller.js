var models = require('../models/models.js');

//GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta})
	});

	//res.render('quizes/question', {pregunta: 'Capital de Italia'})
}

//GET /quizes/answer
exports.answer = function(req,res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta===quiz[0].respuesta)
			res.render('quizes/answer',{respuesta: 'Correcto'});
		else
			res.render('quizes/answer',{respuesta: 'Incorrecto'});
	});

/*
	if(req.query.respuesta==='Roma')
		res.render('quizes/answer',{respuesta: 'Correcto'});
	else
		res.render('quizes/answer',{respuesta: 'Incorrecto'});	
		*/	
}