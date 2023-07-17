// const data = fetch("https://valorant-api.com/v1/themes").then(response => response.json());
// data.then(data =>{data.data.forEach(e => console.log(e))});

let tiers1 = [];
const tierData = fetch("https://valorant-api.com/v1/contenttiers").then(response => response.json());
tierData.then(data => {tiers1 = data.data;console.log(tiers1);});
