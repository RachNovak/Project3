--create tables from data
DROP TABLE emissions;
DROP TABLE total;
DROP TABLE coal;
DROP TABLE oil;
DROP TABLE gas;
DROP TABLE cement;
DROP TABLE flaring;

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


--create total table 
CREATE TABLE total(
		country VARCHAR NOT NULL, 
		total FLOAT,
		PRIMARY KEY (country)
);

SELECT *
FROM total

--create coal table 
CREATE TABLE coal(
		country VARCHAR NOT NULL, 
		coal FLOAT, 
		FOREIGN KEY (country) REFERENCES total (country),
		PRIMARY KEY (country)
);

SELECT *
FROM coal

--create oil table
CREATE TABLE oil(
		country VARCHAR NOT NULL,
		oil FLOAT, 
		FOREIGN KEY (country) REFERENCES total (country),
		PRIMARY KEY (country)
);

SELECT *
FROM oil

--create gas table
CREATE TABLE gas(
		country VARCHAR NOT NULL,
		gas FLOAT, 
		FOREIGN KEY (country) REFERENCES total (country),
		PRIMARY KEY (country)
);

SELECT *
FROM gas

--create cement table
CREATE TABLE cement(
		country VARCHAR NOT NULL,
		cement FLOAT, 
		FOREIGN KEY (country) REFERENCES total (country),
		PRIMARY KEY (country)
);

SELECT * 
FROM cement

--create flaring table
CREATE TABLE flaring(
		country VARCHAR NOT NULL,
		flaring FLOAT, 
		FOREIGN KEY (country) REFERENCES total (country),
		PRIMARY KEY (country)
);

SELECT * 
FROM flaring

CREATE TABLE final(
		country VARCHAR NOT NULL, 
		total FLOAT, 
		coal FLOAT, 
		oil FLOAT, 
		gas FLOAT,
		cement FLOAT, 
		flaring FLOAT,
		FOREIGN KEY (country) REFERENCES total (country),
		PRIMARY KEY (country)
);

SELECT *
FROM final