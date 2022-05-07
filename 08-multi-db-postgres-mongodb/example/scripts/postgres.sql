create table heroes (
  id int generated always as identity primary key not null,
  name text not null,
  power text not null
);

insert into heroes (name, power) 
values 
  ('Superman', 'flight'),
  ('Batman', 'rich'),
  ('Spiderman', 'spider-sense'),
  ('WonderWoman', 'super strength');

select * from heroes;
select * from heroes where name = 'Batman';

update heroes 
set name = 'Goku', power = 'super sayajin'
where id = 1;

delete from heroes where id = 2;