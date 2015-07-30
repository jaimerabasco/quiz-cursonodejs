var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET Pagina creditos. */
router.get('/author', function(req, res, next) {
  res.render('author');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);


/* GET Controlador para preguntas y respuestas*/
router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
