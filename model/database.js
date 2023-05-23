require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "cycle",
  multipleStatements: true
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    `DROP TABLE if exists days_symptoms;
    DROP TABLE if exists symptoms;
    DROP TABLE if exists days;

  CREATE TABLE symptoms (
	id INT NOT NULL AUTO_INCREMENT,
	symptom_name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE days_symptoms (
	day_of_cycle INT NOT NULL,
	symptom_id INT NOT NULL
);

CREATE TABLE days (
	id INT NOT NULL AUTO_INCREMENT,
	day_of_cycle INT NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE days_symptoms ADD CONSTRAINT days_symptoms_fk0 FOREIGN KEY (day_of_cycle) REFERENCES days(id);

ALTER TABLE days_symptoms ADD CONSTRAINT days_symptoms_fk1 FOREIGN KEY (symptom_id) REFERENCES symptoms(id);

INSERT INTO symptoms (symptom_name) VALUES
  ('Moderate to heavy menstrual bleeding'),
  ('Lighter menstrual bleeding or spotting'),
  ('Abdominal cramps (dysmenorrhea)'),
  ('Increased fatigue or tiredness'),
  ('Headaches or migraines'),
  ('Backaches or lower back pain'),
  ('Breast tenderness or sensitivity'),
  ('Mood swings, irritability, or emotional changes'),
  ('Decreased menstrual bleeding or spotting'),
  ('Lightened mood and increased energy levels'),
  ('Improved concentration and cognitive function'),
  ('Increased sexual desire and libido'),
  ('Breast tenderness or mild sensitivity'),
  ('Mild bloating or water retention'),
  ('Fewer PMS symptoms'),
  ('Change in vaginal discharge (thin, clear, and slippery, resembling egg whites)'),
  ('Mild pelvic pain or discomfort on one side (mittelschmerz) due to the release of the egg'),
  ('Bloating or water retention'),
  ('Abdominal cramps or mild pelvic pain'),
  ('Food cravings or changes in appetite'),
  ('Acne breakouts or changes in skin'),
  ('Nausea or digestive issues (e.g., bloating, constipation, or diarrhea)');

  INSERT INTO days (day_of_cycle) VALUES
  (1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
  (11), (12), (13), (14), (15), (16), (17), (18), (19), (20),
  (21), (22), (23), (24), (25), (26), (27), (28);

  INSERT INTO days_symptoms (day_of_cycle, symptom_id) VALUES
  (1, 1), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
  (2, 1), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8),
  (3, 1), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8),
  (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8),
  (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8),
  (6, 9), (6, 10), (6, 11), (6, 12), (6, 13), (6, 14), (6, 15),
  (7, 9), (7, 10), (7, 11), (7, 12), (7, 13), (7, 14), (7, 15),
  (8, 9), (8, 10), (8, 11), (8, 12), (8, 13), (8, 14), (8, 15),
  (9, 9), (9, 10), (9, 11), (9, 12), (9, 13), (9, 14), (9, 15),
  (10, 9), (10, 10), (10, 11), (10, 12), (10, 13), (10, 14), (10, 15),
  (11, 9), (11, 10), (11, 11), (11, 12), (11, 13), (11, 14), (11, 15),
  (12, 9), (12, 10), (12, 11), (12, 12), (12, 13), (12, 14), (12, 15),
  (13, 16), (13, 12), (13, 17), (13, 7),
  (14, 16), (14, 12), (14, 17), (14, 7),
  (15, 16), (15, 12), (15, 17), (15, 7),
  (16, 4), (16, 7), (16, 18), (16, 19), (16, 8), (16, 20), (16, 21), (16, 5), (16, 6), (16, 22),
  (17, 4), (17, 7), (17, 18), (17, 19), (17, 8), (17, 20), (17, 21), (17, 5), (17, 6), (17, 22),
  (18, 4), (18, 7), (18, 18), (18, 19), (18, 8), (18, 20), (18, 21), (18, 5), (18, 6), (18, 22),
  (19, 4), (19, 7), (19, 18), (19, 19), (19, 8), (19, 20), (19, 21), (19, 5), (19, 6), (19, 22),
  (20, 4), (20, 7), (20, 18), (20, 19), (20, 8), (20, 20), (20, 21), (20, 5), (20, 6), (20, 22),
  (21, 4), (21, 7), (21, 18), (21, 19), (21, 8), (21, 20), (21, 21), (21, 5), (21, 6), (21, 22),
  (22, 4), (22, 7), (22, 18), (22, 19), (22, 8), (22, 20), (22, 21), (22, 5), (22, 6), (22, 22),
  (23, 4), (23, 7), (23, 18), (23, 19), (23, 8), (23, 20), (23, 21), (23, 5), (23, 6), (23, 22),
  (24, 4), (24, 7), (24, 18), (24, 19), (24, 8), (24, 20), (24, 21), (24, 5), (24, 6), (24, 22),
  (25, 4), (25, 7), (25, 18), (25, 19), (25, 8), (25, 20), (25, 21), (25, 5), (25, 6), (25, 22),
  (26, 4), (26, 7), (26, 18), (26, 19), (26, 8), (26, 20), (26, 21), (26, 5), (26, 6), (26, 22),
  (27, 4), (27, 7), (27, 18), (27, 19), (27, 8), (27, 20), (27, 21), (27, 5), (27, 6), (27, 22),
  (28, 4), (28, 7), (28, 18), (28, 19), (28, 8), (28, 20), (28, 21), (28, 5), (28, 6), (28, 22);`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tables creation was successful!");

    console.log("Closing...");
  });

  con.end();
});
