const functions = require("firebase-functions")

const OAUTH_REDIRECT_URI = `renegade://twitch`
const OAUTH_SCOPES = "user_read"

/**
 * Creates a configured simple-oauth2 client for Twitch.
 */
function twitchOAuth2Client() {
    // Twitch OAuth 2 setup
    const credentials = {
        client: {
            id: functions.config().twitch.client_id,
            secret: functions.config().twitch.client_secret,
        },
        auth: {
            tokenHost: "https://api.twitch.tv/kraken/",
            tokenPath: "/oauth2/token",
        },
    }
    return require("simple-oauth2").create(credentials)
}

/**
 * Redirects the User to the Twitch authentication consent screen. Also the 'state' cookie is set for later state
 * verification.
 */
exports.redirect = functions.region("europe-west1").https.onRequest((req, res) => {
    const oauth2 = twitchOAuth2Client()

    const redirectUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: OAUTH_REDIRECT_URI,
        scope: OAUTH_SCOPES,
        state: state,
    })
    console.log("Redirecting to:", redirectUri)
    res.redirect(redirectUri)
})
