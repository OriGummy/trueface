import express, { Application, Request, Response } from "express";
import busboy from "connect-busboy";
import { createWriteStream, readFileSync, writeFileSync } from "fs";
import { relative, resolve } from "path";

const PASSWORD = "qrTAeQTyasrJ9GCxUo37yB1dWCf6wzM4";
const DATA_JSON_PATH = `${__dirname}/../../src/data.json`;

interface JsonEvent {
    details: string;
    path: string;
    level: number;
}

interface AddBody {
    password: string;
    details: string;
    level: string;
}

function main() {
    const app: Application = express();

    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: false,
        })
    );
    app.use(busboy());
    app.disable("x-powered-by");
    app.get("/", (req: Request, res: Response) => {
        res.sendFile(__dirname + "/index.html");
    });

    app.post("/add", async (req: Request, res: Response) => {
        const body: Partial<AddBody> = {};
        req.pipe(req.busboy);

        req.busboy.on("field", (name: keyof AddBody, val: string) => {
            body[name] = val;
        });

        req.busboy.on("file", async (fieldname, file, filename) => {
            const level = Number(body.level);
            if (!Number.isInteger(level) || level < 1 || level > 100) {
                return res.status(400).json({
                    status: "error",
                    message:
                        "Level is either not a number or out of range (1 <= level => 100)",
                });
            }

            if (body.password !== PASSWORD) {
                return res
                    .status(401)
                    .json({ status: "error", message: "Unauthorized" });
            }
            const imagePath = resolve(
                `${__dirname}/../../public/images/${filename.filename}`
            );
            const fstream = createWriteStream(imagePath);
            file.pipe(fstream);
            fstream.on("close", () => {
                try {
                    const newEvent: JsonEvent = {
                        details: body.details?.trim() || "",
                        path:
                            "/" +
                            relative(__dirname + "../../../public/", imagePath),
                        level: level || 50,
                    };
                    const dataJson: Array<JsonEvent> = JSON.parse(
                        readFileSync(DATA_JSON_PATH).toString()
                    );
                    dataJson.push(newEvent);
                    writeFileSync(
                        DATA_JSON_PATH,
                        JSON.stringify(dataJson, null, 4)
                    );

                    res.redirect(302, "/");
                } catch (e) {
                    console.error(e);
                    return res.status(500).json({
                        status: "error",
                        message: "An error occurred",
                    });
                }
            });
        });
    });

    app.listen(3001, "0.0.0.0", 0, () => {
        console.log("App listening on http://localhost:3001");
    });
}

if (require.main == module) {
    main();
}
