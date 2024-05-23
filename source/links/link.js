var link = (function () {
  let data = [];
  let randomDisplay = true;
  let filterReciprocal = true;

  function fetchData() {
    fetch("https://rss.apeiria.net/linklist.json")
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
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
    const reciprocalToggle = document.getElementById('reciprocal-toggle');

    if (localStorage.getItem('randomDisplay') !== null) {
      randomDisplay = JSON.parse(localStorage.getItem('randomDisplay'));
    }
    if (localStorage.getItem('filterReciprocal') !== null) {
      filterReciprocal = JSON.parse(localStorage.getItem('filterReciprocal'));
    }

    randomToggle.checked = randomDisplay;
    reciprocalToggle.checked = filterReciprocal;

    randomToggle.addEventListener('change', function (event) {
      randomDisplay = event.target.checked;
      localStorage.setItem('randomDisplay', randomDisplay);
      render();
    });

    reciprocalToggle.addEventListener('change', function (event) {
      filterReciprocal = event.target.checked;
      localStorage.setItem('filterReciprocal', filterReciprocal);
      render();
    });
  }

  function render() {
    let displayData = randomDisplay ? shuffle([...data]) : [...data];

    if (filterReciprocal) {
      displayData = displayData.filter(function (item) {
        return item.reciprocal;
      });
    }

    const html = generateHTML(displayData);
    document.querySelector(".link-navigation").innerHTML = html;
  }

  function generateHTML(data) {
    return data.map(function (item) {
      return `
        <div class="card">
          <a href="${item.site}" target="_blank" rel="external noopener nofollow noreferrer">
            <div class="thumb" style="background: url(${item.avatar});"></div>
          </a>
          <div class="card-header">
            <div><a href="${item.site}" target="_blank">${item.nickname}</a></div>
          </div>
        </div>`;
    }).join('');
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

link.init();
