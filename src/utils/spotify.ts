export type Artist = {
  external_urls: {
    spotify: string
  },
  followers: {
    href: string,
    total: number
  },
  genres: string[],
  href: string,
  id: string,
  images: {
    height: number,
    url: string,
    width: number
  }[],
  name: string,
  popularity: number,
  type: string,
  uri: string
}

const getAccessToken = async () => {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token!,
      }),
    });
  
    return response.json();
  };

export const topArtists = async () => {
    const { access_token } = await getAccessToken();

    return fetch("https://api.spotify.com/v1/me/top/artists?time_range=short_term", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    });
};