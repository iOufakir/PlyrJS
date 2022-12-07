function init() {
    console.log('dfd');
    var e = document.getElementById("player-script").src.replace(/^[^\?]+\??/, "");
    const t = document.getElementById("player");
    const hideLabels = `<style>.plyr iframe[id^='youtube'] {\n            top: -50%;\n            height: 200%;\n        }\n</style>`;
    document.head.insertAdjacentHTML("beforeend", hideLabels);
    if ( e && t) {//if (t.style.display = "none", e && t) {
        var o = document.createElement("style");
        o.appendChild(document.createTextNode(".plyr__menu__container .plyr__control>span{color:#000 !important}")), document.head.appendChild(o);
        const n = JSON.parse(window.atob(e.split("=")[1]));
        let r = `<iframe src="${n.link}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1" allowfullscreen allowtransparency allow="autoplay"></iframe>`;
        t.insertAdjacentHTML("afterbegin", r);
        let l = Plyr.setup("#player", n)[0];
        void 0 !== n.poster && (l.poster = n.poster), l.once("pause", (e => {
            void 0 !== n.muted && 1 == n.muted && (n.muted = !1, document.querySelectorAll("[data-plyr]").forEach((e => {
                "mute" == e.getAttribute("data-plyr") && e.click()
            })), document.querySelector(".video-sound-overlay").remove(), setTimeout((() => {
                n.volume = 1, l.play(), l.restart()
            }), 1e3))
        })), l.on("ready", (e => {
            setTimeout((() => {
                for (var e = document.querySelectorAll(".plyr__control, .plyr--full-ui input[type=range], .plyr__control--overlaid"), o = 0; o < e.length; o++) e[o].style.color = n.progressBarColor;
                const r = document.querySelectorAll(".plyr--full-ui input[type=range], .plyr__volume input[type=range]");
                for (let e = 0; e < r.length; e++) r[e].style.setProperty("--plyr-range-thumb-background", n.controlBarColor);
                var l = `.plyr--video .plyr__control:hover{ background-color: var(--plyr-video-control-background-hover,var(--plyr-color-main,var(--plyr-color-main, ${n.controlBarColor}))) !important}`,
                    a = document.createElement("style");
                if (a.styleSheet ? a.styleSheet.cssText = l : a.appendChild(document.createTextNode(l)), document.head.appendChild(a), n.muted) {
                    let e = '<div class="video-sound-overlay">';
                    e += '<div class="unmute-button">', void 0 !== n.mutedImageUrl && n.mutedImageUrl && (e += `<img src="${n.mutedImageUrl}" style="width:30%" alt="Click To Turn On Sound">`), e += "</div>", e += "</div>", document.querySelector(".plyr__video-embed").insertAdjacentHTML("beforeend", e);
                    const t = `<style>.video-sound-overlay {\n            width: 100%;\n            height: 100%;\n            background-image: url('${n.playIcon}');\n            background-repeat: no-repeat;\n            position: absolute;\n            left: 0%;\n            right: 0%;\n            top: 0%;\n            bottom: 0%;\n            margin: auto;\n            background-size: 20%;\n            background-position: center;\n        }\n\n        .video-sound-overlay .play-button {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            margin-left: -100px;\n            margin-top: -100px;\n        }\n        .plyr iframe[id^='youtube'] {\n            top: -50%;\n            height: 200%;\n        }\n\n        iframe {\n            pointer-events: none;\n        }\n        </style>`;
                    document.head.insertAdjacentHTML("beforeend", t)
                }
                //t.style.display = "block"
            }), 1e3)
        }))
    } else Plyr.setup("#player")
}
const Player = {
    run: () => {
        (async () => {
            await load_scripts(["https://cdn.plyr.io/3.6.12/plyr.js", "https://code.jquery.com/jquery-3.6.0.js", "https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"]), ["https://cdn.plyr.io/3.6.12/plyr.css"].forEach((e => {
                const t = document.createElement("link");
                t.href = e, t.rel = "stylesheet", document.head.appendChild(t)
            })), setTimeout((() => {
                init()
            }), 1e3)
        })()
    }
};
async function load_scripts(e) {
    function t(e) {
        return new Promise((function(t, o) {
            if (load_scripts.loaded.has(e)) t();
            else {
                var n = document.createElement("script");
                n.onload = t, n.src = e, document.head.appendChild(n)
            }
        }))
    }
    var o = [];
    for (const n of e) o.push(t(n));
    await Promise.all(o);
    for (const t of e) load_scripts.loaded.add(t)
}
load_scripts.loaded = new Set();