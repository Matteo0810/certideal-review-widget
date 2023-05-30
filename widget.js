const widget = document.querySelector(".widget");
let currentVideoId = MIN_VIDEO_ID;
let isReadyToPlay = false;
let isWidgetClosed = false;

initWidget();

function initWidget() {
    document.querySelector("video.preview").onclick = openWidget;

    initScrollDesktopFeature();
    initScrollMobileFeature();
    window.onclick = isClickingOutside;
}

function initVideoPlayer() {
    const currentVideo = widget.querySelector("#current-video");

    currentVideo.src = `videos/video-${currentVideoId}.mp4`;
    loadCurrentVideo();

    // video events
    currentVideo.ontimeupdate = () => {
        const progression = document.querySelector(".progression");
        progression.style.width = `${(currentVideo.currentTime/currentVideo.duration)*100}%`;
    }
    currentVideo.onloadstart = () => {
        currentVideo.volume = DEFAULT_VIDEO_VOLUME;
    }
    currentVideo.onended = loadCurrentVideo;
    currentVideo.oncanplay = () => isReadyToPlay = true;

    // other events
    currentVideo.onclick = toggleVideo;
    document.getElementById("toggleVideo").onclick = toggleVideo;
    document.getElementById("closeWidget").onclick = closeWidget;

    document.getElementById("controller-previous").onclick = previousVideo;
    document.getElementById("controller-next").onclick = nextVideo;
}

function updateCurrentVideo(scrollType){
    const onceFinished = currentVideo => {
        if(currentVideo.readyState !== 4)
            return;
        currentVideo.src = `videos/video-${currentVideoId}.mp4`;
        loadCurrentVideo();
    }
    scrollAnimation(scrollType, onceFinished);
}

function loadCurrentVideo() {
    const currentVideo = widget.querySelector("#current-video");
    const togglePrevious = el => el.style.display = currentVideoId > MIN_VIDEO_ID ? "block" : "none";
    const toggleNext = el => el.style.display = currentVideoId < MAX_LOADED_VIDEOS ? "block": "none";


    if(isWidgetClosed) {
        currentVideo.pause();
        return;
    }

    isReadyToPlay = false;
    currentVideo.load();
    currentVideo.play();


    ["previous-video","controller-previous"].forEach(el => {
        togglePrevious(document.getElementById(el));
    });
    ["next-video","controller-next"].forEach(el => {
        toggleNext(document.getElementById(el));
    });
}

function toggleVideo() {
    const currentVideo = widget.querySelector("#current-video");
    const toggleVideoButton = document.getElementById("toggleVideo");

    if(currentVideo.paused) {
        toggleVideoButton.classList.remove("pause");
        toggleVideoButton.classList.add("play");
        currentVideo.play();
    } else {
        toggleVideoButton.classList.remove("play");
        toggleVideoButton.classList.add("pause");
        currentVideo.pause();
    }
}

function openWidget() {
    document.body.style.overflow = "hidden";
    widget.style.display = "block";

    currentVideoId = MIN_VIDEO_ID;
    isWidgetClosed = false;

    initVideoPlayer();
}

function closeWidget() {
    isWidgetClosed = true;

    document.querySelector("#current-video").pause();
    widget.classList.add('disappear');

    setTimeout(() => {
        document.body.style.overflow = "visible";
        widget.style.display = "none";
        widget.classList.remove('disappear');
    }, .5e2);
}

function scrollAnimation(type, onceCallback) {
    const currentVideo = document.getElementById("current-video");
    const player = widget.querySelector(".player");
    const tmp = widget.querySelector(type === "bottom" ? "#next-video" : "#previous-video");

    player.classList.add('disappear-'+type);
    tmp.classList.add('appear');

    setTimeout(() => {
        player.classList.remove('disappear-'+type);
        tmp.classList.remove('appear');

        currentVideo.src = `videos/video-${currentVideoId}.mp4`;
        loadCurrentVideo();
        onceCallback(currentVideo);
    }, .5e3)
}

function initScrollDesktopFeature() {
    window.addEventListener("wheel", isScrollingDesktop);
}

function isScrollingDesktop(event) {
    if(!isReadyToPlay)
        return;
    if(event.deltaY > 0)
        nextVideo();
    else
        previousVideo();
    window.removeEventListener("wheel", isScrollingDesktop);
    setTimeout(() => window.addEventListener("wheel", isScrollingDesktop), 1e3);
}

function initScrollMobileFeature() {
    let startX, startY;
    let endX, endY;

    window.ontouchstart = event => {
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
    };
    window.ontouchend = event => {
        endX = event.changedTouches[0].pageX;
        endY = event.changedTouches[0].pageY;

        const distanceX = endX - startX;
        const distanceY = endY - startY;
        if(Math.abs(distanceX) <= Math.abs(distanceY)) {
            if (distanceY > 0)
                nextVideo();
            else
                previousVideo();
        }
    };
}

function previousVideo() {
    if(currentVideoId > MIN_VIDEO_ID) {
        currentVideoId--;
        updateCurrentVideo("top");
    }
}

function nextVideo() {
    if(currentVideoId < MAX_LOADED_VIDEOS) {
        currentVideoId++;
        updateCurrentVideo("bottom");
    }
}

function isClickingOutside(event) {
    if(event.target.classList.contains("widget"))
        closeWidget();
}
