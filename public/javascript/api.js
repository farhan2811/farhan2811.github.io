const base_url = "https://api.football-data.org/v2/";
const all_matches = 'competitions/2021/matches?matchday=1'
const standings = 'competitions/2021/standings?standingType=TOTAL';
const all_teams = 'competitions/2021/teams'
const team_endpoint = 'teams/'
const token = "df574dcf9f024fbcb55e23c5cf7c2021"

var fetchApi = function (url) {
  return fetch(url, {
    'headers': {
      'X-Auth-Token': token
    }
  })
    .then(status)
    .then(json)
    .then(https)
}

const status = function (response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = function (response) {
  return response.json();
}

const error = function (error) {
  console.log("Error : " + error);
}

const https = function (response) {
  var str = JSON.stringify(response).replace(/http:/g, 'https:');
  return JSON.parse(str);
}

function getMatches() {
  fetchApi(base_url + all_matches)
    .then(function (data) {
      console.log(data);
      var matchTeam = ''
      data.matches.forEach(match => {
        matchTeam += `
        <div class="col s12 m6">
            <div class="card ">
              <div class="card-content black-text match-text center">
                <span>${match.homeTeam.name}</span> <span>${match.score.fullTime.homeTeam}</span> - <span>${match.score.fullTime.awayTeam}</span> <span>${match.awayTeam.name}</span>
              </div>
            </div>
        </div>
        `
      });
      document.getElementById('matches').innerHTML = matchTeam
    })
   .then(() => {
            document.querySelector("#preloader").style.display = "none";
        })
    .catch(error);
}
function getKlasemen() {
  fetchApi(base_url + standings)
    .then(function (data) {
      console.log(data);
      var klasemen = ''
      data.standings.forEach(standings => {
        standings.table.forEach(teams => {
          
          klasemen += `
          <tr>
              <td>${teams.position}</td>
              <td><img src="${teams.team.crestUrl}" class="img-klas"/><span>${teams.team.name}</span></td>
              <td>${teams.playedGames}</td>
              <td>${teams.won}</td>
              <td>${teams.draw}</td>
              <td>${teams.lost}</td>
              <td>${teams.goalsFor}</td>
              <td>${teams.goalsAgainst}</td>
              <td>${teams.goalDifference}</td>
              <td>${teams.points}</td>
          </tr>

          `
        });
        
      });
      document.getElementById('klasemen').innerHTML = klasemen
    })
    .then(() => {
            document.querySelector("#preloader").style.display = "none";
        })
    .catch(error);
}
function getTeams() {
  fetchApi(base_url + all_teams)
    .then(function (data) {
      console.log(data);
      var daftarTeam = ''
      data.teams.forEach(team => {
        daftarTeam += `
         <div class="col s12 m3">
            <div class="card">
              <div class="card-content black-text match-text center">
                <img src='${team.crestUrl || '/images/champion-logo.svg'}' height='92' width='92'>
                <h6 class="center black-text">${team.name}</h6>
                 <h6 class="center black-text">${team.venue}</h6>
                 <h6 class="center black-text">${team.website}</h6>
                <a class="btn waves-effect waves-light blue margin-but" onclick="saveTeam(this);" data-team='${JSON.stringify(team)}'>Favorite!</a>
              </div>
            </div>
        </div>
        `
      });
      document.getElementById('tim').innerHTML = daftarTeam
    })
    .then(() => {
            document.querySelector("#preloader").style.display = "none";
        })
    .catch(error);
}
function favTeams() {
  getFavTeams()
    .then(function (data) {
      var favTeam = ''
      data.forEach(team => {
        favTeam += `
        <div class="col s12 m3">
            <div class="card">
              <div class="card-content black-text match-text center">
                <img src='${team.crestUrl || '/images/champion-logo.svg'}' height='92' width='92'>
                <h6 class="center black-text">${team.name}</h6>
                 <h6 class="center black-text">${team.venue}</h6>
                 <h6 class="center black-text">${team.website}</h6>
                <a class="btn waves-effect waves-light red margin-but" onclick="deleteTeam(this);" data-team='${JSON.stringify(team)}'><i class="fa fa-times"></i> Hapus</a>
              </div>
            </div>
        </div>
        `
      });
      document.getElementById('favTim').innerHTML = favTeam
    })
    .then(() => {
            document.querySelector("#preloader").style.display = "none";
        })
}

function saveTeam(data) {
  var team = JSON.parse(data.getAttribute('data-team'))
  addFavTeam(team);
}

function deleteTeam(data) {
  var team = JSON.parse(data.getAttribute('data-team'))
  deleteFavTeam(team);
}



