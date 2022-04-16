const fs = require("fs");
const express = require("express");
const multer = require("multer");
const OAuth2Data = require("./credentials.json");
const { google } = require("googleapis");

const minimumCount = 2;

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
const SCOPES =
  "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.force-ssl";
var authed = false;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  if (!authed) {
    var url = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    res.render("index", { url: url });
  } else {
    var oauth2 = google.oauth2({
      auth: oAuth2Client,
      version: "v2",
    });
    oauth2.userinfo.get(function (err, response) {
      if (!err) {
        res.redirect("/bot");
      }
    });
  }
});

app.get("/bot", async (req, res) => {
  try {
    const youtube = google.youtube({ version: "v3", auth: oAuth2Client });

    // Get uploads playlist by channel ID.
    const response = await youtube.channels.list({
      part: "snippet,contentDetails",
      id: "UC2VTWrVnZIzWXH2wkj8sAQA",
    });

    const uploadsId =
      response.data.items[0].contentDetails.relatedPlaylists.uploads;

    // Get latest video by playlist ID.
    const videos = await youtube.playlistItems.list({
      part: "snippet",
      playlistId: uploadsId,
      maxResults: 1,
    });
    const videoById = videos.data.items[0].snippet.resourceId.videoId;

    // Get comments by video ID.
    const comments = await youtube.commentThreads.list({
      part: "snippet",
      videoId: videoById,
      textFormat: "plainText",
    });

    // Create an array with parent comments ID's.
    const parentCommentsId = [];
    comments.data.items.forEach((element) => parentCommentsId.push(element.id));

    // Get list of replies from parent comment ID's.
    const parentComments = new Array();
    for (id of parentCommentsId) {
      const comments = await youtube.comments.list({
        part: "snippet",
        parentId: id,
        textFormat: "plainText",
      });

      // Retrieve all original text from comments.
      comments.data.items.forEach((data) =>
        parentComments.push({
          channelOwner: data.snippet.authorDisplayName,
          commentId: data.id,
          plainText: data.snippet.textOriginal,
        })
      );
    }

    // Calculate how many times the message is send.
    const counts = {};
    parentComments
      .map((value) => value.plainText)
      .forEach((x) => {
        counts[x] = (counts[x] || 0) + 1;
      });

    var removedCount = 0;
    var cannotDelete = [];
    for (const key in counts) {
      if (counts[key] >= minimumCount) {
        console.log(
          `Message:\x1b[32m ${key}\x1b[0m was found\x1b[31m ${counts[key]}\x1b[0m times.`
        );

        for (data of parentComments) {
          if (data.plainText === key) {
            const commentDelete = await youtube.comments.delete({
              id: data.commentId,
            });
            if (commentDelete.status == 204) {
              removedCount++;
            } else {
              cannotDelete.push(data);
            }
          }
        }
      }
    }

    res.render("success", {
      url: "http://localhost:5000/logout",
      removed: removedCount,
      notRemoved: cannotDelete,
    });
  } catch (error) {
    res.render("error", {
      url: "http://localhost:5000/logout",
      error: error,
    });
  }
});

app.get("/logout", (req, res) => {
  authed = false;
  res.redirect("/");
});

app.get("/google/callback", function (req, res) {
  const code = req.query.code;
  if (code) {
    // Get an access token based on our OAuth code
    oAuth2Client.getToken(code, function (err, tokens) {
      if (err) {
        console.log("Error authenticating");
      } else {
        oAuth2Client.setCredentials(tokens);

        authed = true;
        res.redirect("/bot");
      }
    });
  }
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});
