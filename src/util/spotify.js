const redirectURI = 'https://tomp_jamming_app.surge.sh'
const clientId = '197f037c9c744fd6a9029129096fd0ce'
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
      console.log(window.history)
      //clears the parameters and allows us to grab a new access token when it expires.
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000)
      //   window.history.pushState('Access Token', null, '/')
      return accessToken
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      window.location = accessURL
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken()

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.tracks) {
          return []
        }
        return data.tracks.items.map((track, id) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          URI: track.uri,
        }))
      })
  },
  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs.length) {
      return
    }
    const accessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }
    let userId

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        userId = data.id
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((data) => {
            const playlistID = data.id
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackURIs }),
              }
            )
          })
      })
  },
}

export default Spotify
