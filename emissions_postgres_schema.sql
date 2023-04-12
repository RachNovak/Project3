--create tables from data
DROP TABLE emissions;

--create main table with emissions data
CREATE TABLE emissions(
		country VARCHAR NOT NULL,
		ISO VARCHAR NOT NULL, 
		year INT NOT NULL, 
		coal FLOAT NOT NULL,
		oil FLOAT NOT NULL,
		gas FLOAT NOT NULL, 
		cement FLOAT NOT NULL, 
		flaring FLOAT NOT NULL
);

SELECT * 
FROM emissions
