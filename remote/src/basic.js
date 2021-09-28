import { Lexer } from "./Lexer.js"
import { Parser } from "./Parser.js"
import { evaluate } from "./Evaluate.js"
import { ApprovalType, TokenType } from "./type.js"
import { IllegalCommandError, InvalidFileError, InvalidSyntaxError } from "./Error.js"
// import fs from 'fs-extra';

// const Lexer = require('./Lexer');
// const fs = require('fs');


// function stringWithArrow(text, posStart, posEnd) {
//     var result = '';
// }

// import http from "http";
// import url from 'url'
var returnObject = {};

// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });

//     // req.url stores the path in the url
//     var httpurl = req.url;
//     if (url.parse(req.url, true).pathname === "/") {
//         console.log("hh")
//         const queryObject = url.parse(req.url, true).query;
//         console.log(queryObject.sd)
//         var returnObject = callValue(queryObject.sd);
//         console.log(returnObject);
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end();
//         console.log("sd");
//     }


// }).listen(3000, function () {
//     console.log("SERVER STARTED PORT: 3000");
// });

Object.freeze(TokenType);

const callValue = (val) => {
    console.log(val);
    var lexer = new Lexer("path", val);
    // console.log(lexer.start().list());
    var returns = lexer.start();

    if (!(returns == null)) {
        var parser = null;
        var lineCount = lexer.count;
        // console.log(returns);
        while (lineCount > 0) {
            if (!parser) parser = new Parser(returns, lexer.count, -1);
            else parser = new Parser(returns, lexer.count, parser.tokIdx);
            var ast = parser.parse();
            if (ast.error) return ast.error.log();
            returnObject = new evaluate(returnObject).Expression(ast.node);
            lineCount -= 1;
        }
        console.log(Object.values(returnObject));
        return Object.values(returnObject);
    }
}

if (process.env.NODE_ENV == "development") {
    // callValue("ADD SequentialApproval level 1")
}

export { callValue };


/**
 *
 * @param {Array} args
 */

// function main(args) {
//     args.shift();
//     args.shift();
//     if (args[0] === "compile") {
//         var path = args[1];
//         if (fs.existsSync(path)) {
//             var val = fs.readFileSync(path, { encoding: "utf-8" });
//             var lexer = new Lexer(path, val);
//             // console.log(lexer.start().list());
//             var returns = lexer.start();

//             if (!(returns == null)) {
//                 var parser = null;
//                 var lineCount = lexer.count;
//                 var returnObject = {};
//                 // console.log(returns);
//                 while (lineCount > 0) {
//                     if (!parser) parser = new Parser(returns, lexer.count, -1);
//                     else parser = new Parser(returns, lexer.count, parser.tokIdx);
//                     var ast = parser.parse();
//                     if (ast.error) return ast.error.log();
//                     returnObject = new evaluate(returnObject).Expression(ast.node);
//                     lineCount -= 1;
//                 }
//                 console.log(Object.values(returnObject));

//             }
//         } else {
//             return new InvalidFileError(`file '${path}' could not be found!`).log();
//         }
//     } else {
//         return new IllegalCommandError(`Command '${args[0]}' could not be found!`).log();
//     }
// }


// main(process.argv);