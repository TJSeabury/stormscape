//
//
// contains scripts, playlists and functions for all the soundscape genre tags
//
//
//-----------------------------------------------------------------------------
// playlists

var $forest = [
    "media/01_Tropical_Rain.mp3",
    "media/02_Jungle_River.mp3",
    "media/03_Birdsong.mp3",
    "media/04_A_Tropical_Rain_Forest.mp3",
    "media/05_Twilight.mp3",
    "media/08_Jungle_Birdsong.mp3",
    "media/16_Jungle_River.mp3",
    "media/19_Showers.mp3",
    "media/25_Deep_Woods.mp3",
    "media/26_Songbirds.mp3",
    "media/27_Wilderness_Rainshower.mp3",
    "media/45_Marsh.mp3"
];

var $river = [
    "media/02_Jungle_River.mp3",
    "media/12_Big_River.mp3",
    "media/13_Streamside_Songbirds.mp3",
    "media/14_Small_Rapid.mp3",
    "media/15_Crickets_And_Water_I.mp3",
    "media/16_Jungle_River.mp3",
    "media/17_Small_Rapid.mp3",
    "media/18_Waterfall.mp3",
    "media/25_Deep_Woods.mp3",
    "media/32_Crickets_And_Water_II.mp3",
    "media/46_Sparkling_Water.mp3",
    "media/47_Brookside_Birds.mp3",
    "media/49_Streamside_Songbirds.mp3",
    "media/51_Water_Frogs.mp3"
];

var $rain = [
    "media/01_Tropical_Rain.mp3",
    "media/04_A_Tropical_Rain_Forest.mp3",
    "media/19_Showers.mp3",
    "media/20_Thunder_And_Rain.mp3",
    "media/21_Heavy_Rain.mp3",
    "media/27_Wilderness_Rainshower.mp3",
    "media/44_Rain_With_Pygmy_Owl.mp3",
    "media/55_Long_Soothing_Rain.mp3",
    "media/56_Rainshowers_I.mp3"
];

var $storm = [
    "media/20_Thunder_And_Rain.mp3",
    "media/21_Heavy_Rain.mp3",
    "media/22_Thunderstorm_Out_In_The_Fields.mp3",
    "media/23_Thunderstorm_Inner_Perspective.mp3",
    "media/24_Electrifying_Thunderstorms.mp3",
    "media/54_Heavy_Rain_With_Rolling_Thunder.mp3",
    "media/57_Severe_Thunderstorm_With_Light_Rain.mp3",
    "media/58_Thunder_Light_And_Heavy_Rain.mp3"
];

var $beach = [
    "media/33_Pleasant_Beach.mp3",
    "media/34_Low_Tide.mp3",
    "media/35_Big_Surf.mp3",
    "media/36_Pebble_Beach.mp3",
    "media/37_Gentle_Ocean.mp3",
    "media/38_Ocean_Relaxing_Surf.mp3",
    "media/39_Ocean_Waves_Pebble_Beach.mp3",
    "media/40_Ocean_Waves.mp3",
    "media/41_Pleasant_Beach.mp3",
    "media/42_Pacific_Surf_And_Songbirds.mp3"
];

var $night = [
    "media/05_Twilight.mp3",
    "media/10_Hoots_And_Howls.mp3",
    "media/11_Crickets.mp3",
    "media/15_Crickets_And_Water_I.mp3",
    "media/28_Frog_Chourus.mp3",
    "media/29_Crickets_And_Wolves.mp3",
    "media/30_Cicadas.mp3",
    "media/31_Midnight_Serenade.mp3",
    "media/32_Crickets_And_Water_II.mp3"
];

var $animal = [
    "media/03_Birdsong.mp3",
    "media/08_Jungle_Birdsong.mp3",
    "media/09_Turkey_Talk.mp3",
    "media/26_Songbirds.mp3",
    "media/28_Frog_Chourus.mp3",
    "media/42_Pacific_Surf_And_Songbirds.mp3",
    "media/43_Predawn.mp3",
    "media/44_Rain_With_Pygmy_Owl.mp3",
    "media/48_Bobwhite_Dover_And_Cardinals.mp3",
    "media/49_Streamside_Songbirds.mp3",
    "media/50_Small_Green_Froggies.mp3",
    "media/51_Water_Frogs.mp3",
    "media/52_Frog_Chorus.mp3",
    "media/53_Froggies.mp3"
];

// playlists end
//
//-----------------------------------------------------------------------------
//
// global variables

var $lastTrack;
var $currentTrack;
var $currentList = $storm;

// global variables end
//
//-----------------------------------------------------------------------------
//
// function definitions

function change(sourceUrl) {
    var audio = $("#player");
    $("#mp3_src").attr("src", sourceUrl);
    audio[0].pause();
    audio[0].load();
    audio[0].play();
}

//---------------------------------------

function setCurrentTrack() {
    $currentTrack = $("#mp3_src").attr("src");
}

//---------------------------------------

function setLastTrack() {
    $lastTrack = $("#mp3_src").attr("src");
}

//---------------------------------------

function setCurrentListfromCookie() {
    
}

//---------------------------------------

function randIndex(getArray) {
    var $num;
    var $length = getArray.length;
    $num = parseInt(Math.random() * $length);
    return $num;
}

//---------------------------------------

function randomLoop() {
    var $index = randIndex($currentList);
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
        $("#title").html("Playing | SoundscapeCity");
    });
    $("#player").on('pause', function() {
        $("#title").html("Paused | SoundscapeCity");
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
    var $pageHeight = $('html').height();
    $('.navItem').each(function() {
        var $eachItem = $(this);
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