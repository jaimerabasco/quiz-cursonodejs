var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');


/* GET Pagina creditos. */
router.get('/author', function(req, res, next) {
  res.render('author', { errors: []});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: []});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);
//Autoload de comandos con :CommentId
router.param('commentId', commentController.load);


/* Controlador preguntas y respuestas*/
router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',quizController.new);
router.post('/quizes/create',quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

//Definición de las rutas de comment
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
