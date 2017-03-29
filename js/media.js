//
//
// contains scripts, playlists and functions for all the soundscape genre tags
//
//
//-----------------------------------------------------------------------------
// playlists

let $forest = [
    "media/01_Tropical_Rain.m4a",
    "media/02_Jungle_River.m4a",
    "media/03_Birdsong.m4a",
    "media/04_A_Tropical_Rain_Forest.m4a",
    "media/05_Twilight.m4a",
    "media/08_Jungle_Birdsong.m4a",
    "media/16_Jungle_River.m4a",
    "media/19_Showers.m4a",
    "media/25_Deep_Woods.m4a",
    "media/26_Songbirds.m4a",
    "media/27_Wilderness_Rainshower.m4a",
    "media/45_Marsh.m4a"
];

let $river = [
    "media/02_Jungle_River.m4a",
    "media/12_Big_River.m4a",
    "media/13_Streamside_Songbirds.m4a",
    "media/14_Small_Rapid.m4a",
    "media/15_Crickets_And_Water_I.m4a",
    "media/16_Jungle_River.m4a",
    "media/17_Small_Rapid.m4a",
    "media/18_Waterfall.m4a",
    "media/25_Deep_Woods.m4a",
    "media/32_Crickets_And_Water_II.m4a",
    "media/46_Sparkling_Water.m4a",
    "media/47_Brookside_Birds.m4a",
    "media/49_Streamside_Songbirds.m4a",
    "media/51_Water_Frogs.m4a"
];

let $rain = [
    "media/01_Tropical_Rain.m4a",
    "media/04_A_Tropical_Rain_Forest.m4a",
    "media/19_Showers.m4a",
    "media/20_Thunder_And_Rain.m4a",
    "media/21_Heavy_Rain.m4a",
    "media/27_Wilderness_Rainshower.m4a",
    "media/44_Rain_With_Pygmy_Owl.m4a",
    "media/55_Long_Soothing_Rain.m4a",
    "media/56_Rainshowers_I.m4a"
];

let $storm = [
    "media/20_Thunder_And_Rain.m4a",
    "media/21_Heavy_Rain.m4a",
    "media/22_Thunderstorm_Out_In_The_Fields.m4a",
    "media/23_Thunderstorm_Inner_Perspective.m4a",
    "media/24_Electrifying_Thunderstorms.m4a",
    "media/54_Heavy_Rain_With_Rolling_Thunder.m4a",
    "media/57_Severe_Thunderstorm_With_Light_Rain.m4a",
    "media/58_Thunder_Light_And_Heavy_Rain.m4a"
];

let $beach = [
    "media/33_Pleasant_Beach.m4a",
    "media/34_Low_Tide.m4a",
    "media/35_Big_Surf.m4a",
    "media/36_Pebble_Beach.m4a",
    "media/37_Gentle_Ocean.m4a",
    "media/38_Ocean_Relaxing_Surf.m4a",
    "media/39_Ocean_Waves_Pebble_Beach.m4a",
    "media/40_Ocean_Waves.m4a",
    "media/41_Pleasant_Beach.m4a",
    "media/42_Pacific_Surf_And_Songbirds.m4a"
];

let $night = [
    "media/05_Twilight.m4a",
    "media/10_Hoots_And_Howls.m4a",
    "media/11_Crickets.m4a",
    "media/15_Crickets_And_Water_I.m4a",
    "media/28_Frog_Chourus.m4a",
    "media/29_Crickets_And_Wolves.m4a",
    "media/30_Cicadas.m4a",
    "media/31_Midnight_Serenade.m4a",
    "media/32_Crickets_And_Water_II.m4a"
];

let $animal = [
    "media/03_Birdsong.m4a",
    "media/08_Jungle_Birdsong.m4a",
    "media/09_Turkey_Talk.m4a",
    "media/26_Songbirds.m4a",
    "media/28_Frog_Chourus.m4a",
    "media/42_Pacific_Surf_And_Songbirds.m4a",
    "media/43_Predawn.m4a",
    "media/44_Rain_With_Pygmy_Owl.m4a",
    "media/48_Bobwhite_Dover_And_Cardinals.m4a",
    "media/49_Streamside_Songbirds.m4a",
    "media/50_Small_Green_Froggies.m4a",
    "media/51_Water_Frogs.m4a",
    "media/52_Frog_Chorus.m4a",
    "media/53_Froggies.m4a"
];

// playlists end
//
//-----------------------------------------------------------------------------
//
// global letiables

let $lastTrack;
let $currentTrack;
let $currentList = $storm;

// global letiables end
//
//-----------------------------------------------------------------------------
//
// function definitions

function change(sourceUrl) {
    let audio = $("#player");
    $("#m4a_src").attr("src", sourceUrl);
    audio[0].pause();
    audio[0].load();
    audio[0].play();
}

//---------------------------------------

function setCurrentTrack() {
    $currentTrack = $("#m4a_src").attr("src");
}

//---------------------------------------

function setLastTrack() {
    $lastTrack = $("#m4a_src").attr("src");
}

//---------------------------------------

function setCurrentListfromCookie() {
    
}

//---------------------------------------

function randIndex(getArray) {
    let $num;
    let $length = getArray.length;
    $num = parseInt(Math.random() * $length);
    return $num;
}

//---------------------------------------

function randomLoop() {
    let $index = randIndex($currentList);
    if ($lastTrack === $currentList[$index]) {
        $index = randIndex($currentList);
        randomLoop();
    }
    else {
        change($currentList[$index]);
        setCurrentTrack();
    }
}

//---------------------------------------

function changePlaylist(list) {
    $currentList = list;
    randomLoop();
}

// function definitions end
//
//-----------------------------------------------------------------------------
//
// initializer

$(function() {
    setLastTrack();
    randomLoop();
    $("#player").on('ended', function() {
        randomLoop();
    });
    $("#player").on('playing', function() {
        $("#title").html("Playing | Stormscape.io");
    });
    $("#player").on('pause', function() {
        $("#title").html("Paused | Stormscape.io");
    });
});

function init() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        document.getElementById('mobilePushToPlay').style.zIndex = "500";
    document.getElementById('mobilePlay').addEventListener("click", ()=>{
        document.getElementById('mobilePushToPlay').style.zIndex = "-10";
        document.getElementById('mobilePushToPlay').style.display = "none";
        randomLoop();
    });
}
function load(fu) {
    if (window.addEventListener) // W3C DOM
        window.addEventListener('load', fu, false);
    else if (window.attachEvent) // IE DOM
        return window.attachEvent('onload', fu);
    else console.log('I\'m sorry Dave, I\'m afraid I can\'t do that.');
}

function makeActive($pass) {
    $pass.addClass( function() {
        $(".navItem").removeClass("active");
        return "active";
    });
}

$(function() {
    $(".navItem").mouseup(function() {
        makeActive($(this));
    });
});

function resizeImage() {
    let $pageHeight = $('html').height();
    $('.navItem').each(function() {
        let $eachItem = $(this);
        $eachItem.height(($pageHeight / 7) - 1);
    });
    $('.navItem').parent().parent().width($("html").width() / 9.5);
}
                 
$(function() {
    resizeImage();
    $(window).resize(function() {
        resizeImage();
    });
});

// initializer end