// docker ps -a

// docker exec -it mongodb mongo -u rafael -p rafael --authenticationDatabase heroes

// list databases:
//show dbs

// muda para um bando de dados:
// use heroes

// mostra as tabelas (coleções):
// show collections

//insert mongo db
db.herois.insert({
  name: 'Flash',
  power: 'Speed',
  bithDate: '1998-11-01'
});


// find mongo db
db.herois.find();
db.herois.find().pretty();

for (let i = 0; i < 20; i++) {
  db.herois.insert({
    name: `Clone-${i}`,
    power: 'Speed',
    bithDate: '1998-11-01'
  });
}

db.herois.find().pretty().limit(10).sort({ name: -1 });
db.herois.find({}, { power: 1, _id: 0 }).pretty().limit(10);

//update
db.herois.find({ name: "Flash" });

// CUIDADO COM ESSE COMANDO, PODE EXCLUIR TODOS OS CAMPOS DO DOCUMENTO
db.herois.update({ _id: ObjectId("627093d201e55ede6830049e") }, { name: "Superman" });

// FAÇA SEMPRE ASSIM
db.herois.update({ _id: ObjectId("62708ac0abea3fecb97e4f64") }, { $set: { name: "Mulher Maravilha" } });


//delete
db.herois.remove({});
db.herois.remove({ name: "Mulher Maravilha" });