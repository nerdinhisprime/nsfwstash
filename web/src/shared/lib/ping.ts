export const ping = () => fetch(`${__API_URL__}/ping`)
  .then(res => res.json())
  .then(console.log)
