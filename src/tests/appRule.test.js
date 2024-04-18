import { DataType } from "../utils/DataType";
import path from "path";
import fs from "fs";

const { execSync } = require("child_process");

execSync("yarn dev", { stdio: "inherit" });

const distDirPath = path.join(__dirname, "..", "..", "dist");

const dataFilePath = path.join(distDirPath, "rule.js");
// 使用readFileSync来同步读取文件内容
const ruleJS = fs.readFileSync(dataFilePath, "utf8");

// 读取dist目录下的所有文件名
const fileNames = fs.readdirSync(distDirPath);

// 过滤出所有的.json文件名
const jsonFileNames = fileNames.filter(
  (fileName) => path.extname(fileName) === ".json",
);

// 读取每个.json文件的内容
const jsonFilesContent = jsonFileNames.map((jsonFileName) => {
  const jsonFilePath = path.join(distDirPath, jsonFileName);
  const jsonFileContent = fs.readFileSync(jsonFilePath, "utf8");
  return JSON.parse(jsonFileContent);
});

test("App规则调用校验", () => {
  //读取dist目录下所有的json
  jsonFilesContent.forEach((jsonFileContent) => {
    const { name, results, datas, type, app } = jsonFileContent;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const data = datas[i];
      var window = {
        data: data,
        dataType: type,
        app: app,
      };
      function print(callbackResult) {
        expect(callbackResult).toEqual(result);
      }
      try {
        eval(ruleJS);
      } catch (e) {
        console.error("Failed: " + name + " ", e);
      }
    }
  });
});
