import type { NextFunction, Request, Response } from "express";
import fs from "fs"
const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log("date", Date.now(), "\nurl", req.url, "\nmethod", req.method);

    const date = new Date();

    const formattedDate = date.toLocaleDateString('en-GB');

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    const result = `${formattedDate} ${formattedTime}`;

    const log = `\nmethod -> ${req.method}, time -> ${result}, URL -> ${req.url}\n`
    fs.appendFile("logger.txt", log, (err) => {
        console.log(err);
    })
    next()
}

export default logger