import { writeFile } from "fs";

export function write(name: string, data: string): Promise<string> {
  return new Promise<string>(function (resolve, reject) {
    writeFile(name, data, "utf8", (err) => (err ? reject(err) : resolve(data)));
  });
}
