const express = require("express");
const next = require("next");
const homeRoute = require("../routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const bcrypt = require("bcrypt");
const path = require("path");
const crypto = require("crypto");
const cors = require("cors");
const _ = require("lodash");
const watchRoute = require("../routes/watch");
const getPicRoute = require("../routes/getPic");

module.exports = {
  express,
  next,
  homeRoute,
  bodyParser,
  mongoose,
  bcrypt,
  multer,
  GridFsStorage,
  path,
  crypto,
  cors,
  _,
  watchRoute,
  getPicRoute,
};
