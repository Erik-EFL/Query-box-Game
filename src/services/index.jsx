/* https://opentdb.com/api.php?amount=5&token=${seu-token-aqui} */
const token = '40cbac27310ce1aa0ead3ad3bfb9c2f814bef503542a8375cc17f556b35843';
const fetchAPI = async () => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

export default fetchAPI;
