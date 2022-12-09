async function load_scripts(e) {
  function t(e) {
    return new Promise(function (t, o) {
      if (load_scripts.loaded.has(e)) t();
      else {
        var r = document.createElement("script");
        (r.onload = t), (r.src = e), document.head.appendChild(r);
      }
    });
  }

  var o = [];

  for (const r of e) o.push(t(r));

  await Promise.all(o);

  for (const t of e) load_scripts.loaded.add(t);
}

load_scripts.loaded = new Set();

const Player = {
  run: () => {
    (async () => {
      await load_scripts([
        "https://cdn.plyr.io/3.7.3/plyr.js",
        "https://code.jquery.com/jquery-3.6.0.js",
        "https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js",
      ]);

      ["https://cdn.plyr.io/3.7.3/plyr.css"].forEach((e) => {
        const t = document.createElement("link");

        (t.href = e), (t.rel = "stylesheet"), document.head.appendChild(t);
      }),
        init();
    })();
  },
};

function init() {
  document.querySelectorAll(".plyr__video-embed").forEach(function (player) {
    player.style.display = "none";

    var e = player.getAttribute("video-details");
    if (e && player) {
      var css = `.plyr__menu__container .plyr__control>span{color:#000 !important}
        button.plyr__control.plyr__control--overlaid.plyr__control--pressed{
          visibility: visible;
        }
        `;
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);

      const t = JSON.parse(window.atob(e.split("=")[1]));
      const styles = `<style>.video-sound-overlay {\n            width: 100%;\n            height: 100%;\n            background-image: url('${t.playIcon}');\n            background-repeat: no-repeat;\n            position: absolute;\n            left: 0%;\n            right: 0%;\n            top: 0%;\n            bottom: 0%;\n            margin: auto;\n            background-size: 20%;\n            background-position: center;\n        }\n\n        .video-sound-overlay .play-button {\n            position: absolute;\n            top: 50%;\n            left: 50%;\n            margin-left: -100px;\n            margin-top: -100px;\n        }\n        .plyr iframe[id^='youtube'] {\n            top: -50%;\n            height: 200%;\n        }\n\n        iframe {\n            pointer-events: none;\n        }\n        </style>`;
      document.head.insertAdjacentHTML("beforeend", styles);

      let html = `<iframe src="${
        t.link
      }?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;title=false&amp;enablejsapi=1&mute=1&autoplay=${
        t.autoplay ? 1 : 0
      }" allowfullscreen allowtransparency allowautoplay allow="autoplay; fullscreen" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>`;
      player.insertAdjacentHTML("afterbegin", html);

      const o = new Plyr(player, t);
      void 0 !== t.poster && (o.poster = t.poster),
        o.once("pause", (e) => {
          const videoSoundOverlay = player.querySelector(
            ".video-sound-overlay"
          );
          void 0 !== t.muted &&
            1 == t.muted &&
            ((t.muted = !1),
            player.querySelectorAll("[data-plyr]").forEach((e) => {
              "mute" == e.getAttribute("data-plyr") && e.click();
            }),
            videoSoundOverlay ? videoSoundOverlay.remove() : "",
            setTimeout(() => {
              t.volume = 1;

              o.play(), o.restart();
            }, 1e3));
        }),
        o.on("timeupdate", (e) => {
          if (
            o.playing &&
            t.ctaEnabled &&
            t.ctaTimeTarget &&
            o.currentTime >= t.ctaTimeTarget.toFixed(2) &&
            o.currentTime < parseFloat(t.ctaTimeTarget + ".1").toFixed(2)
          ) {
            renderCtaModal(
              player,
              t.ctaHeadline,
              t.ctaHeadlineColor,
              t.ctaInputTitle,
              t.ctaInputUrl,
              t.ctaBtnBackgroundColor,
              t.ctaBtnTextColor,
              o
            );

            o.pause();
          }
        }),
        o.on("ready", (e) => {
          if (!t.muted) {
            o.volume = 1;
          }
          if (t.autoplay) {
            o.play();
            o.restart();
          }

          setTimeout(() => {
            for (
              var e = player.querySelectorAll(
                  ".plyr__control, .plyr--full-ui input[type=range], .plyr__control--overlaid"
                ),
                i = 0;
              i < e.length;
              i++
            )
              e[i].style.color = t.progressBarColor;

            const r = player.querySelectorAll(
              ".plyr--full-ui input[type=range], .plyr__volume input[type=range]"
            );

            for (let e = 0; e < r.length; e++)
              r[e].style.setProperty(
                "--plyr-range-thumb-background",
                t.controlBarColor
              );

            var n = `.plyr--video .plyr__control:hover{ background-color: var(--plyr-video-control-background-hover,var(--plyr-color-main,var(--plyr-color-main, ${t.controlBarColor}))) !important}`,
              l = document.createElement("style");

            if (
              (l.styleSheet
                ? (l.styleSheet.cssText = n)
                : l.appendChild(document.createTextNode(n)),
              document.head.appendChild(l))
            ) {
              let e = t.playIcon ? '<div class="video-sound-overlay">' : "";

              (e += '<div class="unmute-button">'),
                void 0 !== t.mutedImageUrl &&
                  t.mutedImageUrl &&
                  (e += `<img src="${t.mutedImageUrl}" style="width:30%" alt="Click To Turn On Sound">`),
                (e += "</div>"),
                (e += "</div>"),
                player
                  .querySelector(".plyr__video-embed")
                  .insertAdjacentHTML("beforeend", e);
            }

            player.style.display = "block";
          }, 1e3);
        });
    } else Plyr.setup(".plyr__video-embed");
  });
}

function renderCtaModal(
  frame,
  ctaHeadline,
  headlineColor,
  ctaInputTitle,
  ctaInputUrl,
  btnBackgroundColor,
  btnTextColor,
  player
) {
  const ctaModal = `<div class="cta-modal" style="background-color: rgba(0, 0, 0, 6);height: 100%;width: 100%;z-index: 10;position: absolute;top: 0;left: 0;display: flex;flex-direction: column;">

  <div style="
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
">

<div style="
display: flex;
flex-direction: column;
align-items: center;
">

<div style="position: relative;text-align: center;">
<div click="function () { [native code] }" style="border-radius: 0px; padding-left: 0%; padding-right: 0%; letter-spacing: 2px;"><p><span style="color: ${headlineColor}; font-size: 18pt;">${ctaHeadline}</span></p>
</div></div>

<div style="position: relative;cursor: pointer;width: 20rem;text-align: center;">
<div style="background: ${btnBackgroundColor}; border-radius: 5px; letter-spacing: 0px;">
<a style="color: ${btnTextColor};text-decoration: none;text-align: center;display: block;" class="cta-resume" href="${ctaInputUrl}" target="_blank"><span style="font-size: 2rem;text-align: center;display: block;">${ctaInputTitle}</span></a>
</div>

</div>
</div>
  
 </div>

 <div style="
 width: 100%;
 position: relative;
 bottom: 2rem;
"><p style="color: #fff;margin-right: 3rem;text-align: right;font-size: 1.4rem; margin-bottom: 0;"><span class="cta-resume" style="padding:0.3rem;cursor:pointer;">Skip</span></p></div>
 
 </div>`;

  frame.insertAdjacentHTML("beforeend", ctaModal);

  frame.querySelectorAll(".cta-resume").forEach((action) => {
    action.addEventListener("click", (e) => {
      resumeVideo(e, player);
    });
  });
}

function resumeVideo(event, player) {
  event.target.closest(".cta-modal").style.display = "none";
  player.play();
}

var styles = `
.unmute-button {
    padding: 15px;
    margin-left: 15px;
    animation: pulse 2s infinite;
    animation-timing-function: ease-out;
    transition-timing-function: ease-in-out;
    animation-name: pulse;
    width: 50%;
    position: absolute;
    }
    
    
    
    @keyframes pulse {
    0% {
    transform: scale(1);
    }
    50% {
    transform: scale(1.05);
    }
    100% {
    transform: scale(1);
    }
    }
    
`;

var styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
