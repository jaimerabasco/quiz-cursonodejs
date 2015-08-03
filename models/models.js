var path = require('path');

//Postgres 	DATABASE_URL = postgres://user:passwd@host:port/database
//SQLite 	DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;




//Cargar el modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD Sqlite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,{
	dialect: protocol,
	protocol: protocol,
	port: port,
	host:host,
	storage: storage, 	//solo SQLite (.env)
	omitNull: true 		//solo Posgres
	}
);

//Importar la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

//Importar la definición de la tabla Comment en comment.js
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

//Asociar Tabla comment con quiz

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment, {
'constraints': true, 
'onUpdate': 'cascade',	
'onDelete': 'cascade',	
'hooks': true	
});	
//Quiz.hasMany(Comment);

//Exportar definicion de la tabla Quiz
exports.Quiz = Quiz;
//Exportar definicion de la tabla Comment
exports.Comment = Comment;

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	Quiz.count().then(function(count){
		if(count===0){
			Quiz.create({ pregunta: 'Capital de Italia',
							respuesta: 'Roma',
							categoria: 'Otro'
			});
			Quiz.create({ pregunta: 'Capital de Portugal',
							respuesta: 'Lisboa',
							categoria: 'Otro'
			})
			.then(function(){console.log('Base de Datos inicializada')});
		};
	});
});
