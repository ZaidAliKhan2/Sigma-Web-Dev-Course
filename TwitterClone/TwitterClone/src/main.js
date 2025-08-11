let postInput = document.querySelector(".postInput");
let postBtn = document.querySelector(".postBtn");

postInput.addEventListener("input", () => {
  if (postInput.value !== "") {
    postBtn.classList.remove("brightness-50");
  } else {
    postBtn.classList.add("brightness-50");
  }
});
async function twitterDataFetchFunc() {
  let response = await fetch("/data.json");
  let data = await response.json();
  let MainSection = document.getElementById("mainSection");
  data.forEach((item) => {
    let postContentMainCont = document.createElement("div");
    let randomComments = Math.floor(Math.random() * 300) + "k";
    let randomReposts = Math.floor(Math.random() * 200) + "k";
    let randomLikes = Math.floor(Math.random() * 600) + "k";
    let randomViews = Math.floor(Math.random() * 1000000); // up to 1 million
    let formattedViews = "";

    if (randomViews >= 1000000) {
      formattedViews = Math.floor(randomViews / 1000000) + "M";
    } else if (randomViews >= 1000) {
      formattedViews = Math.floor(randomViews / 1000) + "k";
    } else {
      formattedViews = randomViews.toString();
    }

    postContentMainCont.className = "postContentMainCont";
    postContentMainCont.innerHTML = `
    <div class="postContentCont px-4 py-4 border-b border-b-[#2F3336]">
      <div class="inputContent flex gap-2 items-start">
        <img
          src="${item.profilePic}"
          alt="profileImg"
          class="w-12 h-12 rounded-full object-cover object-top"
        />
        <div>
        <div class="nameCont flex items-center space-x-2 text-gray-300 max-[350px]:flex-col max-[350px]:items-start">
          <h3 class="text-white font-bold">${item.name}</h3>
          <div class="flex justify-center items-center">
          <h4 class="text-xs">${item.username}</h4>
          <p class="text-xs">&#183;</p>
          <h4 class="text-xs">${item.date}</h4>
          </div>
        </div>
         <div class="titleCont">
          <h3 class="text-white">${item.postContent}</h3>
        </div>
        </div>
      </div>

      <div class="postCont pl-14">
        <img src="${item.image}" alt="postImg" class="mt-3 rounded-lg mb-3" />
       <div class="tweetInteractionCont flex items-center justify-evenly w-full text-gray-400 max-[420px]:text-[12px]">
  <!-- Interaction items -->
  <div class="flex-1 flex items-center justify-between">
    <div class="group flex items-center gap-1 cursor-pointer">
      <i class="fa-regular fa-comment group-hover:text-blue-400 group-hover:bg-[#000d33] rounded-full p-1.5 max-[420px]:p-1"></i>
      <span class="group-hover:text-blue-400">${randomComments}</span>
    </div>
    <div class="group flex items-center gap-1 cursor-pointer">
      <i class="fa-solid fa-repeat group-hover:text-green-300 group-hover:bg-[#131917] rounded-full p-1.5 max-[420px]:p-1"></i>
      <span class="group-hover:text-green-300">${randomReposts}</span>
    </div>
    <div class="group flex items-center gap-1 cursor-pointer">
      <i class="fa-regular fa-heart group-hover:text-red-400 group-hover:bg-[#211717] rounded-full p-1.5 max-[420px]:p-1"></i>
      <span class="group-hover:text-red-400">${randomLikes}</span>
    </div>
    <div class="group flex items-center gap-1 cursor-pointer">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor"
           class="size-5 max-[420px]:size-4 group-hover:text-blue-400">
        <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
      </svg>
      <span class="group-hover:text-blue-400">${formattedViews}</span>
    </div>
  </div>

  <!-- Bookmark & share -->
  <div class="flex items-center justify-center gap-2 pl-2">
  <div class=" max-[450px]:hidden">
    <i class="fa-regular fa-bookmark interactionsHover hover:bg-[#000d33] hover:rounded-3xl p-3"></i>
    </div>
    <svg viewBox="0 0 24 24" fill="currentColor"
         stroke-width="1.5"
         stroke="currentColor"
         class="size-5 interactionsHover max-[420px]:size-4">
      <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
    </svg>
  </div>

</div>

    </div>
  `;
    MainSection.appendChild(postContentMainCont);
  });
}
twitterDataFetchFunc();

let searchCont = document.querySelector(".searchCont");
let inputBox = document.querySelector(".searchInput");

inputBox.addEventListener("focus", () => {
  searchCont.classList.remove("border-gray-800");
  searchCont.classList.add("border-cyan-300");
});
inputBox.addEventListener("blur", () => {
  searchCont.classList.remove("border-cyan-300");
  searchCont.classList.add("border-gray-800");
});

//profiles dynamically adding code

async function profilesFunc() {
  let response = await fetch("/users.json");
  let data = await response.json();
  let section = document.querySelector(".whoToFollowProfilesCont");

  data.slice(0, 3).forEach((profile) => {
    let profileCont = document.createElement("div");
    profileCont.classList.add("flex");
    profileCont.classList.add("gap-2.5");
    profileCont.classList.add("items-center");
    profileCont.innerHTML = ` 
              <img src="${profile.imgSrc}" alt="profileImg" class="w-10 h-10 rounded-full object-cover"
 />
              <div class="profileTxt flex flex-col ">
                <h1 class="text-white font-bold" >${profile.name}</h1>
                 <span class="text-gray-400 block max-xl:hidden">${profile.username}</span>
      <span class="text-gray-400 hidden max-xl:block">${profile.usernameShort}</span>
              </div>
              <button
                class="bg-white px-4.5 py-1 text-black font-bold rounded-3xl w-fit ml-auto text-[14px]"
              >
                Follow
              </button>`;

    section.appendChild(profileCont);
  });
  let extraProfiles = data.slice(3, 6).map((profile) => {
    let profileCont = document.createElement("div");
    profileCont.classList.add("flex", "gap-2.5", "items-center", "hidden");

    profileCont.innerHTML = ` 
    <img src="${profile.imgSrc}" alt="profileImg" class="w-10 h-10 rounded-full object-cover" />
    <div class="profileTxt flex flex-col">
      <h1 class="text-white font-bold">${profile.name}</h1>
      <span class="text-gray-400 block max-xl:hidden">${profile.username}</span>
      <span class="text-gray-400 hidden max-xl:block">${profile.usernameShort}</span>
    </div>
    <button class="bg-white px-4.5 py-1 text-black font-bold rounded-3xl w-fit ml-auto text-[14px]">
      Follow
    </button>
  `;

    section.appendChild(profileCont);
    return profileCont;
  });
  let showMoreBtn = document.querySelector(".showMoreProfilesBtn");
  showMoreBtn.addEventListener("click", () => {
    extraProfiles.forEach((profileCont) => {
      profileCont.classList.toggle("hidden");
    });
  });
}
profilesFunc();

//trendss codee
async function trendsFetchFunc() {
  let parentCont = document.querySelector(".trendMainCont");
  let response = await fetch("/trends.json");
  let data = await response.json();
  data.forEach((item) => {
    let trendCont = document.createElement("div");
    trendCont.innerHTML = ` <div class="flex justify-between">
              <span class="text-gray-400 text-xs">${item.trend}</span>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke-width="0.4"
                stroke="currentColor"
                class="text-gray-400 size-4"
              >
                <g>
                  <path
                    d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                  ></path>
                </g>
              </svg>
            </div>
            <h1 class="text-white font-bold">${item.name}</h1>
           <span class="text-gray-400 text-xs">
  ${(Math.random() * 100 + 1).toFixed(1)}k posts
</span>

          </div>`;

    parentCont.appendChild(trendCont);
  });
}
trendsFetchFunc();

//scrolling code
const scrollables = document.querySelectorAll(".scrollable-section");

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    scrollables.forEach((section) => {
      section.scrollBy({
        top: e.deltaY,
        behavior: "smooth",
      });
    });
  },
  { passive: false }
);
