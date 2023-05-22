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
`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tables creation was successful!");

    console.log("Closing...");
  });

  con.end();
});
