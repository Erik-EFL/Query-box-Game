async function fetchToken() {
  const token = fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((result) => result.token);
  return token;
}

export default fetchToken;
