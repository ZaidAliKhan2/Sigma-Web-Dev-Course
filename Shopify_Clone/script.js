let navHamburger = document.querySelector(".hamburger");
let navOptCont = document.querySelector(".navOptCont")
navHamburger.addEventListener("click" , ()=>{
    navOptCont.classList.toggle("show");
    navOptCont.style.zIndex = "10";
});
//Drag side bar code
let grab = document.querySelector(".dragSideBar");
let sidebar = document.querySelector(".sideBarContainer");
let sideBarWidth = sidebar.offsetWidth; // Get initial width
let prevX = 0;
let minWidth = 250;
let maxWidth = 400;

grab.addEventListener("pointerdown", (event) => {
    prevX = event.clientX;

    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", resize);
    });
});

function resize(event) {
    let deltaX = event.clientX - prevX;

    if (deltaX > 0 && sideBarWidth < maxWidth) {
        sideBarWidth += 2;
    } else if (deltaX < 0 && sideBarWidth > minWidth) {
        sideBarWidth -= 2;
    }

    sidebar.style.width = `${sideBarWidth}px`;

    prevX = event.clientX;
}

//reponsiveness of fixed bar
let fixedbarText = document.querySelector("#fixedBarTxt");

function updateFixedBarText() {
    if (window.innerWidth <= 450) {
        fixedbarText.innerHTML = "";
    } else {
        fixedbarText.innerHTML = "Sign Up to get unlimited songs and podcasts with occasional ads.No credit card needed";
    }
}

updateFixedBarText();
window.addEventListener("resize", updateFixedBarText);

//mobile navbar hamburger settings


function toggleMenu() {
    let mobileMenuContainer = document.querySelector(".mobileMenu");
    mobileMenuContainer.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
    let closeBtn = document.getElementById("closeMobileMenu");
    let mobileMenuContainer = document.querySelector(".mobileMenu");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            mobileMenuContainer.classList.remove("show");
        });
    }
});

// Artist songs code
let currentAudio = null;
let audioMainContainer = document.querySelector(".audioMainCont");
let playBtn = document.querySelector(".playBtn");
let libPlayBtn = document.querySelector(".libPlayBtn");
let backwardBtn = document.querySelector(".backwardBtn");
let forwardBtn = document.querySelector(".forwardBtn");
let songTitle = document.querySelector("#songTitle");
let authorText = document.querySelector("#authorText");
let isPlaying = false;
let isForward = false;
let isBackward = false;
let currentIndex = 0;
let currentSongs = [];
let libraryCurrentSongCont = document.querySelector(".currentlyPlayingSngContianer");
let librarySongTitle = document.querySelector(".currentlyPlayingTitle");
let librarySongAuthor = document.querySelector(".currentlyPlayingAuthor");




async function loadSongs(artistClass) {
    try {
        let response = await fetch("artists_songs.json");
        let data = await response.json();

        let artistName = document.querySelector("." + artistClass).getAttribute("data-artist");
        authorText.innerText = `${artistName}`;
        librarySongAuthor.innerText = `${artistName}`;
        for (let artistData of data) {
            if (artistData.artist === artistName) {
                stopCurrentSong();
                playBtn.classList.replace("fa-play", "fa-pause");
                libPlayBtn.classList.replace("fa-play", "fa-pause");
                currentIndex = 0;
                currentSongs = artistData.songs;
                await playSongsSequentially();
            } else {
                stopCurrentSong();
            }
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
async function playSongsSequentially() {

    while (currentIndex < currentSongs.length) {
        songTitle.innerText = currentSongs[currentIndex].title;
        librarySongTitle.innerText = currentSongs[currentIndex].title;
        await playSong(currentSongs[currentIndex].file);
        isForward = false;
        isBackward = false;
        if (!isForward && !isBackward) {
            currentIndex++;
        }


    }
}


function playSong(file) {
    return new Promise((resolve) => {
        stopCurrentSong();
        currentAudio = new Audio(file);
        currentAudio.play();
        volume();
        playBtn.classList.replace("fa-play", "fa-pause");
        libPlayBtn.classList.replace("fa-play", "fa-pause");
        setupSeekBar();
        if(currentAudio){

            currentAudio.addEventListener("timeupdate", seekBar);
        }
        currentAudio.onended = () => {
            resolve();
        };
    });

}


document.querySelectorAll(".artistOne, .artisttwo, .artistthree, .artistfour, .artistfive").forEach(element => {
    element.addEventListener("click", () => {
        loadSongs(element.classList[1]);
        audioMainContainer.style.display = "flex";
        audioMainContainer.style.justifyContent = "center";
        audioMainContainer.style.alignItems = "center";
        audioMainContainer.style.flexDirection = "column";
        audioMainContainer.style.gap = "5px";

        libraryCurrentSongCont.style.display = "flex";
        libraryCurrentSongCont.style.justifyContent = "flex-start";
        libraryCurrentSongCont.style.alignItems = "flex-start";
        libraryCurrentSongCont.style.flexDirection = "column";
        libraryCurrentSongCont.style.gap = "10px";

    });
});


function stopCurrentSong() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
        isPlaying = false;
        playBtn.classList.replace("fa-pause", "fa-play");
        libPlayBtn.classList.replace("fa-pause", "fa-play");
    }
}


playBtn.addEventListener("click", () => {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
            playBtn.classList.replace("fa-play", "fa-pause");
            libPlayBtn.classList.replace("fa-play", "fa-pause");
            isPlaying = true;
        } else {
            currentAudio.pause();
            playBtn.classList.replace("fa-pause", "fa-play");
            libPlayBtn.classList.replace("fa-pause", "fa-play");
            isPlaying = false;
        }
    }
});

libPlayBtn.addEventListener("click", () => {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
            libPlayBtn.classList.replace("fa-play", "fa-pause");
            playBtn.classList.replace("fa-play", "fa-pause");
            isPlaying = true;
        } else {
            currentAudio.pause();
            playBtn.classList.replace("fa-pause", "fa-play");
            libPlayBtn.classList.replace("fa-pause", "fa-play");
            isPlaying = false;
        }
    }
});

forwardBtn.addEventListener("click", () => {
    if (currentIndex + 1 < currentSongs.length) {
        isForward = true;
        currentIndex++;
        stopCurrentSong();
        songTitle.innerText = currentSongs[currentIndex].title;
        librarySongTitle.innerText = currentSongs[currentIndex].title;
        playSongsSequentially();
    }
});


backwardBtn.addEventListener("click", () => {
    if (currentIndex - 1 >= 0) {
        isBackward = true;
        currentIndex--;
        stopCurrentSong();
        songTitle.innerText = currentSongs[currentIndex].title;
        librarySongTitle.innerText = currentSongs[currentIndex].title;
        playSongsSequentially();
    }
});

//seekbar settings
function setupSeekBar() {
    let seekBar = document.querySelector(".seekBar");
    let seekBarBall = document.querySelector(".seekBarBall");

    if (!seekBar || !seekBarBall) {
        console.error("Seek bar elements not found!");
        return;
    }

    seekBarBall.addEventListener("mousedown", (event) => {
        document.addEventListener("mousemove", seekBarMouseMove);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", seekBarMouseMove);
        }, { once: true });
    });

    seekBarBall.addEventListener("touchstart", (event) => {
        document.addEventListener("touchmove", seekBarMouseMove, { passive: false });
        document.addEventListener("touchend", () => {
            document.removeEventListener("touchmove", seekBarMouseMove);
        }, { once: true });
    });
}

function seekBar() {
    let seekBar = document.querySelector(".seekBar");
    let seekBarBall = document.querySelector(".seekBarBall");

    if (!seekBar || !seekBarBall || !currentAudio) {
        return; // avoid error when closing
    }

    let seekBarWidth = seekBar.getBoundingClientRect().width;
    let progress = (currentAudio.currentTime / currentAudio.duration) * seekBarWidth;
    seekBarBall.style.transform = `translateX(${progress}px)`;
}

function seekBarMouseMove(event) {
    event.preventDefault();

    let seekBar = document.querySelector(".seekBar");
    let seekBarBall = document.querySelector(".seekBarBall");

    if (!seekBar || !seekBarBall || !currentAudio) return;

    let seekBarWidth = seekBar.getBoundingClientRect().width;
    let seekBarLeft = seekBar.getBoundingClientRect().left;
    let x = event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX;
    let distance = Math.max(0, Math.min(x - seekBarLeft, seekBarWidth));

    currentAudio.currentTime = (distance / seekBarWidth) * currentAudio.duration;
    seekBarBall.style.transform = `translateX(${distance}px)`;
}



//volumeBar settings
let volumeEventBound = false;

function volume() {
    let volumeBar = document.querySelector(".volumeBar");
    let volumeIcon = document.querySelector(".volumeIcon");
    let volumeBarBall = document.querySelector(".volumeBarBall");
    let volumeBarWidth = volumeBar.getBoundingClientRect().width;
    let volumeBarLeft = volumeBar.getBoundingClientRect().left;
    let volumeBarFinalWidth = volumeBarWidth - volumeBarBall.getBoundingClientRect().width;

    let volume = currentAudio.volume * volumeBarFinalWidth;
    volumeBarBall.style.transform = `translateX(${volume}px)`;

    updateVolumeIcon(currentAudio.volume, volumeIcon);

    if (!volumeEventBound) {
        volumeBarBall.addEventListener("mousedown", () => {
            document.addEventListener("mousemove", volumeBarMouseMove);
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", volumeBarMouseMove);
            }, { once: true });
        });

        volumeBarBall.addEventListener("touchstart", () => {
            document.addEventListener("touchmove", volumeBarMouseMove, { passive: false });
            document.addEventListener("touchend", () => {
                document.removeEventListener("touchmove", volumeBarMouseMove);
            }, { once: true });
        });

        volumeBar.addEventListener("click", (event) => {
            let x = event.clientX || event.touches[0].clientX;
            let newVolume = Math.max(0, Math.min(x - volumeBarLeft, volumeBarFinalWidth));

            currentAudio.volume = newVolume / volumeBarWidth;
            volumeBarBall.style.transform = `translateX(${newVolume}px)`;

            updateVolumeIcon(currentAudio.volume, volumeIcon);
        });

        volumeEventBound = true;
    }

    function volumeBarMouseMove(event) {
        event.preventDefault?.();

        let x = event.type.startsWith("touch") ? event.touches[0].clientX : event.clientX;
        let newVolume = Math.max(0, Math.min(x - volumeBarLeft, volumeBarFinalWidth));

        currentAudio.volume = newVolume / volumeBarWidth;
        volumeBarBall.style.transform = `translateX(${newVolume}px)`;

        updateVolumeIcon(currentAudio.volume, volumeIcon);
    }

    function updateVolumeIcon(volume, icon) {
        icon.classList.remove("fa-volume-high", "fa-volume-low", "fa-volume-xmark");

        if (volume <= 0.02) {
            icon.classList.add("fa-volume-xmark");
        } else if (volume <= 0.5) {
            icon.classList.add("fa-volume-low");
        } else {
            icon.classList.add("fa-volume-high");
        }
    }
}

//topSongs code

async function loadTopSongs(songClassList) {
    try {
        let response = await fetch("topSongs.json");
        let data = await response.json();

        let artistName = document.querySelector("." + songClassList).getAttribute("data-song-artist");
        authorText.innerText = `${artistName}`;
        librarySongAuthor.innerText = `${artistName}`;
        for (let artistData of data) {
            if (artistData.artist === artistName) {
                stopCurrentSong();
                playBtn.classList.replace("fa-play", "fa-pause");
                libPlayBtn.classList.replace("fa-play", "fa-pause");
                currentIndex = 0;
                currentSongs = artistData.songs;
                await playSongsSequentially();
            } else {
                stopCurrentSong();
            }
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
document.querySelectorAll(".song1, .song2, .song3, .song4, .song5").forEach(element => {
    element.addEventListener("click", () => {
        loadTopSongs(element.classList[1]);
        audioMainContainer.style.display = "flex";
        audioMainContainer.style.justifyContent = "center";
        audioMainContainer.style.alignItems = "center";
        audioMainContainer.style.flexDirection = "column";
        audioMainContainer.style.gap = "5px";

        libraryCurrentSongCont.style.display = "flex";
        libraryCurrentSongCont.style.justifyContent = "flex-start";
        libraryCurrentSongCont.style.alignItems = "flex-start";
        libraryCurrentSongCont.style.flexDirection = "column";
        libraryCurrentSongCont.style.gap = "10px";
    });
});

//audioContainer close btn functionality

let audioCloseBtn = document.querySelector("#audioContCloseBtn");
audioCloseBtn.addEventListener("click", () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
        audioMainContainer.style.display = "none";
        libraryCurrentSongCont.style.display = "none";
});

