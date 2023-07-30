
export const RosterManager = {
    Player : function(_name, _team, _number, _position, _height, _id) {
	    // this.firstName = _firstName;
		// this.lastName = _lastName;
		// this.id = _id;
	    this.name = _name;
		this.team = _team,
	    this.number = _number;
	    this.position = _position;
		this.height = _height;
		this.id = _id;

		this.rank;
		this.rushingYards;
		this.passingYards;
		this.runningYards;
	},

	Team: function(_id, _name, _teamColors){
		this.id = _id;
		this.name = _name;
		this.teamColors = _teamColors;
		// this.nameCode = '';
		this.players = [];
	},

    players: [],
	teams: {}
}