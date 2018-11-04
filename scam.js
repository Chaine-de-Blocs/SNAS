'use strict';

function displayRecommendations(recommendations) {
  if (recommendations && recommendations.length > 0) {
    let res = '<p>Voici nos recommendations proposant un service similaire à ce que vous cherchez :</p> <ul>';
    recommendations.map((reco) => res += `<li><a href="${reco}">${reco}</a></li>`);
    return res + '</ul>';
  }
  return '';
}

chrome.runtime.onMessage.addListener((request, sender, callback) => {
  const scam = request.scam;
  if (scam) {
    window.stop();

    const head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');

    style.type = 'text/css';
    const css = `
      #${scam.id} {
        display: 'block' !important;
        padding: 25px;
      }
      #${scam.id} * {
        font-family: Arial, Helvetica, sans-serif;
      }
      #${scam.id} h1 {
        font-weight: 400;
        margin-bottom: 10px;
        padding: 0;
      }
    `;

    if (style.styleSheet){
      // IE
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    document.body.innerHTML = `
      <div id=${scam.id}>
        <h1>Attention ! Ce site est listé comme étant frauduleux</h1>

        <p>
          Ce site est listé sur <a href="${scam.source}">${scam.source}</a>
        </p>

        ${displayRecommendations(scam.recommendations)}
      </div>
    `;
  }
});
