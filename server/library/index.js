const express = require("express");
const next = require("next");
const homeRoute = require("../routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");
const crypto = require("crypto");
const cors = require("cors");
const _ = require("lodash");

module.exports = {express, next, homeRoute, bodyParser, mongoose, multer, GridFsStorage, path, crypto, cors, _};