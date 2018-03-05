const API = 'http://localhost:29292/api/meetup/';

let meetupApp = new Vue({
	el:'#meetupApp',
	data:{
		meetups:[],
		meetup:{
			id:'',
			name:'',
			where:''
		}
	},
	created:function() {
		this.getMeetups();
	},
	methods:{
		getMeetups:function() {
			fetch(API)
			.then(res => res.json())
			.then(res => this.meetups = res);	
		},
		storeMeetup:function() {
			let method;
			console.log('storeMeetup', this.meetup);
			// Handle new vs old
			if(this.meetup.id === '') {
				delete this.meetup.id;
				method = 'POST';
			} else {
				method = 'PUT';
			}
			fetch(API, {
				headers:{
					'Content-Type':'application/json'
				},
				method:method,
				body:JSON.stringify(this.meetup)
			})
			.then(res => res.json())
			.then(res => {
				this.getMeetups();
				this.reset();
			});
		},
		deleteMeetup:function(c) {
			fetch(API + c.id, {
				headers:{
					'Content-Type':'application/json'
				},
				method:'DELETE'
			})
			.then(res => res.json())
			.then(res => {
				this.getMeetups();
			});

			// call reset cuz the meetup could be 'active'
			this.reset();
		},
		editMeetup:function(c) {
			/*
			This line was bad as it made a reference, and as you typed, it updated
			the list. A user may think they don't need to click save.
			this.meetup = c;
			*/
			this.meetup.id = c.id;
			this.meetup.name = c.name;
			this.meetup.where = c.where;
		},
		reset:function() {
			this.meetup.id = '';
			this.meetup.name = '';
			this.meetup.where = '';
		}
	}
});