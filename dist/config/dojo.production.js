var file_path = window.location.pathname;
var dist_path = file_path.slice(0, file_path.lastIndexOf("/"));

dojoConfig = {
  async: true,
  packages: [
    {
      name: "config",
      location: dist_path + "/config"
    }
  ]
};
if (location.search.match(/locale=([\w-]+)/)) {
  dojoConfig.locale = RegExp.$1;
}
