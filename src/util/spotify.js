const redirectURI ="http://localhost:3000/"
const clientId ="197f037c9c744fd6a9029129096fd0ce"
let accessToken

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1]
      const expiresIn = Number(expiresInMatch[1])
      //clears the parameters and allows us to grab a new access token when it expires.
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000)
      window.history.pushState('Access Token', null, '/')

      return accessToken
    } else {
        const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        window.location = accessURL
    }
      
    
  },
}







export default Spotify
