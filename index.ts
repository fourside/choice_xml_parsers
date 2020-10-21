import fetch from "node-fetch";
import * as xml2js from "xml2js";
import * as xml2json from "xml2json";
import * as fastXmlParser from "fast-xml-parser";
import * as fs from "fs";

(async () => {
  const xml = await getXml();
  {
    const xml2jsParser = new xml2js.Parser();
    const json = await xml2jsParser.parseStringPromise(xml);
    // console.log(JSON.stringify(json, null, "  "))
  }
  {
    const json = xml2json.toJson(xml);
    // console.log(JSON.stringify(JSON.parse(json), null, "  "));
  }
  {
    const json = fastXmlParser.parse(xml, { ignoreAttributes: false, attributeNamePrefix: "" });
    console.log(JSON.stringify(json, null, "  "));
  }
})();


async function getXml(): Promise<string> {
  const filePath = "stations.xml";
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, "utf-8");
  }
  const url = "http://radiko.jp/v3/station/list/JP13.xml";
  const response = await fetch(url);
  const body = await response.text();
  fs.writeFileSync(filePath, body);
  return body;
}
