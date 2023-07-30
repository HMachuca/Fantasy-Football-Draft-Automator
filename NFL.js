import { RosterManager } from "./RosterManager.js";

export const NFL = {

    minTeamID: 4390,
    maxTeamID: 4393,
    options: {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2f640a6e5bmsh1efe5b2fe5839c3p1733eejsn51e1f62ea450',
            'X-RapidAPI-Host': 'americanfootballapi.p.rapidapi.com'
        }
    },

    initializeTeamData: async function(){

        let teamIds = [];
        fetch('https://americanfootballapi.p.rapidapi.com/api/american-football/matches/11/9/2022', this.options)
            .then(response => response.json())
            .then(response => {
                let events = response.events;
                for(const evt of events){
                    if(evt.tournament.name.toLowerCase().includes('nfl')){
                        let awayName = evt.awayTeam.name;
                        let awayId = evt.awayTeam.id;
                        let awayTeamColors = {
                            primary: evt.awayTeam.teamColors.primary,
                            secondary: evt.awayTeam.teamColors.secondary,
                            text: evt.awayTeam.teamColors.text
                        }
                        let homeName = evt.homeTeam.name;
                        let homeId = evt.homeTeam.id;
                        let homeTeamColors = {
                            primary: evt.homeTeam.teamColors.primary,
                            secondary: evt.homeTeam.teamColors.secondary,
                            text: evt.homeTeam.teamColors.text
                        }
                        teamIds.push(awayId);
                        teamIds.push(homeId);
                        RosterManager.teams[awayId] = new RosterManager.Team(awayId, awayName, awayTeamColors);
                        RosterManager.teams[homeId] = new RosterManager.Team(homeId, homeName, homeTeamColors);
                    }
                }
                console.log(RosterManager.teams);
                teamIds.sort();


                // for each team, do this
                this.getTeamPlayers(teamIds[0]);
            })
            .catch(err => console.error(err));

        // setTimeout(()=>{
        //     console.log(RosterManager.teams);
        //     this.makeTextFile(JSON.stringify(RosterManager.teams));
        // }, 3000);
    },

    getTeamPlayers: function(teamId){
        fetch('https://americanfootballapi.p.rapidapi.com/api/american-football/team/' + teamId + '/players', this.options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let players = response.players;
            // console.log(players[1].player);
            for(let i = 0; i < players.length; ++i){
                let p = players[i].player;
                let pObj = new RosterManager.Player(
                    p.name, 
                    p.team, 
                    p.jerseyNumber, 
                    p.position,
                    p.height,
                    p.id                );
                RosterManager.players.push(pObj);
                RosterManager.teams[teamId].players.push(pObj);
                // console.log(pObj);
            }
            console.log(RosterManager.teams);
            console.log(RosterManager.players);
        })
        .catch(err => console.error(err));
    },

    textFile: null,
    makeTextFile: function (text) {
        let data = new Blob([text], {type: 'text/plain'});

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (this.textFile !== null) {
            window.URL.revokeObjectURL(this.textFile);
        }
        this.textFile = window.URL.createObjectURL(data);

        document.getElementById('link').href = this.textFile;

        // returns a URL you can use as a href
        return this.textFile;
    }
}