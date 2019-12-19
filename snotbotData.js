var mysql = require('mysql');

var con = mysql.createConnection({
  host: "68.66.216.18",
  user: "penguinh_oa",
  password: "aph_oa",
  database: 'penguinh_ocean-alliance'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});