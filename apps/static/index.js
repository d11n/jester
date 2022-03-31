import express from "express";
import BaseApp from "../base_app.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Health extends BaseApp {
	get name() {
		return "static";
	}

	get router() {
		return express.static(path.join(__dirname, 'public'));
	};
};

