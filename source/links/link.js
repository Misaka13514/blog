link = {
  init: function () {
    this.fetchData();
  },
  fetchData: function () {
    fetch("https://cdn.jsdelivr.net/gh/Misaka13514/Friends@main/linklist.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
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
  }
};

link.init();
