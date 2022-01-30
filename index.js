import express from "express";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CREATE FILES WITH TIMESTAMP");
});

// ENDPOINT FOR CREATING FILES INSIDE A FOLDER
app.get("/create-text-file", (req, res) => {
  const timeInMS = Date.now();
  const timeStamp = timeInMS.toString();
  const dateTimeFmt = new Date(timeInMS).toString();
  const modifiedDate = dateTimeFmt.replace(/:/g, ".").replace(/,/g, "");

  if (!fs.existsSync("TimeStamp")) {
    fs.mkdirSync("TimeStamp");
  }

  fs.writeFile(`./TimeStamp/${modifiedDate}.txt`, timeStamp, (err, file) =>
    res.send(
      `File Created Successfully <br /> <br /> 
      Path of the file that is created => ./TimeStamp/${modifiedDate}.txt`
    )
  );
});

// ENDPOINT FOR READING FILES INSIDE THAT PARTICULAR FOLDER:
app.get("/get-files", (req, res) => {
  var FolderContents = "";
  fs.readdir("./TimeStamp", (err, files) => {
    if (err) {
      console.log(err);
      res.send("PARTICULAR FOLDER DOESN'T EXIST");
    } else if (files == "") {
      console.log("THERE ARE NO FILES INSIDE THAT PARTIULAR FOLDER");
      res.send("THERE ARE NO FILES INSIDE THAT PARTIULAR FOLDER");
    } else {
      files.forEach((file) => {
        FolderContents +=  file + "<br /> <br />";
      });
      res.send(`FILES IN THE FOLDER ARE: <br /> <br /> ${FolderContents}`);
    }
  });
});

app.listen(PORT, () => console.log("App is started in", PORT));
