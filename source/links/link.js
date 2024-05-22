const link = (function () {
  let data = [];
  let randomDisplay = false;
  let filterReciprocal = false;

  function fetchData() {
    fetch("https://cdn.jsdelivr.net/gh/Misaka13514/Friends@gh-pages/linklist.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (receivedData) {
        data = receivedData;
        render();
      })
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  }

  function setupToggle() {
    const randomToggle = document.getElementById('random-toggle');
    randomToggle.addEventListener('change', function (event) {
      randomDisplay = event.target.checked;
      render();
    });

    const reciprocalToggle = document.getElementById('reciprocal-toggle');
    reciprocalToggle.addEventListener('change', function (event) {
      filterReciprocal = event.target.checked;
      render();
    });

    randomDisplay = randomToggle.checked;
    filterReciprocal = reciprocalToggle.checked;
  }

  function render() {
    let displayData = randomDisplay ? shuffle([...data]) : [...data];

    if (filterReciprocal) {
      displayData = displayData.filter(function (item) {
        return item.reciprocal;
      });
    }

    const html = displayData.map(function (item) {
      return `
        <div class="card">
          <a href="${item.site}" target="_blank" rel="external noopener nofollow">
            <div class="thumb" style="background: url(${item.avatar});"></div>
          </a>
          <div class="card-header">
            <div><a href="${item.site}" target="_blank">${item.nickname}</a></div>
          </div>
        </div>`;
    }).join('');

    document.querySelector(".link-navigation").innerHTML = html;
  }

  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  return {
    init: function () {
      fetchData();
      setupToggle();
    }
  };
})();

document.addEventListener('DOMContentLoaded', link.init);
