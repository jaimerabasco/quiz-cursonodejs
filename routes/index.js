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

/* GET Controlador para preguntas y respuestas*/
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

module.exports = router;
