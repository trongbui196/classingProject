import fs from 'fs'
import csv from 'csv-parser'
export function readCSV(path:any) {
  return new Promise((resolve) => {
    const results:any = [];
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results));
  });
}