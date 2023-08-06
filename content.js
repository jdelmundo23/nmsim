const group = document.querySelector(".nmTileGroup");

// retrieve skin tier data
const tierData = fetch("https://valorant-api.com/v1/contenttiers").then(response => response.json());
tierData.then(data => {
    let tiers = data.data; 
    // find ultra tier ID
    ultraTierID = tiers.find(tier => tier.devName == 'Ultra').uuid; 
    // retrieve weapon skin data
    const skinData = fetch("https://valorant-api.com/v1/weapons/skins").then(response => response.json());
    skinData.then(data => {
        const guns = data.data;
        const gunNums = [];

        // loop for 6 weapon skins
        for (let i = 0; i < 6; i++) {
            const randomInt = Math.floor(Math.random() * guns.length)
            console.log(randomInt)
            const gun = guns[randomInt];
            //Re-roll if skin name includes Standard, Favorite or if skin tier is Ultra
            if (gun.contentTierUuid == null || gun?.contentTierUuid == ultraTierID || gunNums.includes(randomInt)) {
                i--;
            }
            // find tier of weapon skin then add valid weapon skin to page
            else {
                gunNums.push(randomInt);
                const gunTier = tiers.find(tier => tier.uuid == gun.contentTierUuid);
                group.insertAdjacentHTML("beforeend", `
                <div id="nmTile" class="${gunTier.devName.toLowerCase()}">
                <img class="gunImg"
                src="${gun.displayIcon}"
                alt="${gun.displayName}"
                onerror="this.src='assets/default.png'">
                <div class="tileBottom">
                    <div class="gunName">${gun.displayName.toUpperCase()}</div>
                    <div class="tierImgHolder">
                        <img class="tierImg"
                        src="${gunTier.displayIcon}"
                        alt="${gunTier.devName}">
                    </div>
                </div>
                <div class="tileCover ${gunTier.devName.toLowerCase()}"></div>
            </div>`);
            }
        }

        // add covers based on tier color to each weapon skin
        addTileCovers();
    });
});

const addTileCovers = () => {
    const covers = document.querySelectorAll(".tileCover");
    covers.forEach(cover => {
        cover.addEventListener("click", event => {
            cover.classList.add("disabled");
        })
    });
};



