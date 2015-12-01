create table hibernate_sequences (  sequence_name varchar(255), next_val bigint );




create table organization (
	id BIGINT not null,
	name varchar(255),
	address1 varchar(255),
	address2 varchar(255),
	telephone varchar (255),
	fax varchar (255),
	email varchar (255),
	username varchar (255),
	password varchar (255),
	primary key (id)
);

create table person (
	id BIGINT not null,
	sex varchar(255),
	title varchar(255),
	firstName varchar(255),
	lastName varchar(255),
	jobTitle varchar(255),
	email varchar(255),
	telephone varchar(255),
	org_id BIGINT,
	primary key (id)
);
alter table person add constraint FK_PERSON_WORKAT_ORG foreign key (org_id) references organization(id);


create table registration (
	id BIGINT not null, 
	breakoutRoom varchar(255), 
	person_id BIGINT,
	creatdTime datetime,
	remark varchar(255),
	primary key (id)
);
alter table registration add constraint FK_REG_PERSON foreign key (person_id) references person(id);
