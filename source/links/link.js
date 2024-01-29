link = {
  init: function () {
    this.fetchData();
  },
  fetchData: function () {
    fetch("https://cdn.jsdelivr.net/gh/Misaka13514/Friends@gh-pages/linklist.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data = link.shuffle(data);
        link.render(data);
      })
      .catch(function (error) {
        console.error('Error fetching data:', error);
      });
  },
  render: function (data) {
    var html = data.map(function (item) {
      return `
        <div class="card">
          <a href="${item.site}" target="_blank" rel="external noopenner nofollow">
            <div class="thumb" style="background: url(${item.avatar});"></div>
          </a>
          <div class="card-header">
            <div><a href="${item.site}" target="_blank">${item.nickname}</a></div>
          </div>
        </div>`;
    }).join('');

    document.querySelector(".link-navigation").innerHTML = html;
  },
  // Fisher-Yates Shuffle
  shuffle: function (array) {
    var currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }
};

link.init();
