var AppRouter = Backbone.Router.extend({
	/**
	 * @memberOf AppRouter
	 */
	initialize : function(options) {
		if(options.formView != null) {
			this.formView = options.formView;	
		} 
		
	},
	routes: {
        "*actions": "defaultRoute" // Backbone will try match the route above first
    },
    
    defaultRoute: function(action) {
    	
    	//show search
    	this.formView.render();  	
    }
    
});

var FormView = Backbone.View.extend({
	/**
	 * @memberOf FormView
	 */
	 initialize: function(options){
		 this.formViewTemplate = Handlebars.compile($("#formViewTemplate").html());
		 this.numberOfParticipantsTemplate = Handlebars.compile($("#numberOfParticipantsTemplate").html());
		 this.participantsTemplate = Handlebars.compile($("#participantsTemplate").html());
	 },
	 events: {
		 "change input[name='attendingRdo']" : "onChangeAttendingRdo",
		 "change input[name='participantNumberRdo']" : "onChangeParticipantNumberRdo",
		 
		 "click #submitBtn" : "onClickSubmitBtn"	 
		
	},
	render: function() {
		var json={};
		
		this.$el.find("#formBody").html(this.formViewTemplate(json));
		
		return this;
	},
	
	onClickSubmitBtn: function(e){
		e.preventDefault();
		$('#alertDanger').hide();
		// remove all has-error
		$('.form-group').each(function() {
			$(this).removeClass('has-error');
		});
		
		var hasError = false;
		
		// first check all Text
		$('input[type="text"]').each(function(){
			var val = $(this).val();
			if( val == null || val.length == 0 ) {
		    	$(this).parents('.form-group').addClass('has-error');
		    	hasError = true;
		    }
		    
		});
		
		// now the radio
		if(!$('input[name="attendingRdo"]:checked').val()) {
			$('input[name="attendingRdo"]').parents('.form-group').addClass('has-error');
			console.log('1');
			hasError = true;
		} else if($('input[name="attendingRdo"]:checked').val() == "ATTEND" && 
				!$('input[name="participantNumberRdo"]:checked').val()) {
			$('input[name="participantNumberRdo"]').parents('.form-group').addClass('has-error');
			console.log('2');
			hasError = true;
		} else if($('input[name="attendingRdo"]:checked').val() == "ATTEND"){
			if(!$('input[name="participant1.titleRdo"]:checked').val()) {
				$('input[name="participant1.titleRdo"]').parents('.form-group').addClass('has-error');
				console.log('3');
				hasError = true;
			}
			
			if(!$('input[name="participant1.breakoutRoomRdo"]:checked').val()) {
				$('input[name="participant1.breakoutRoomRdo"]').parents('.form-group').addClass('has-error');
				console.log('4');
				hasError = true;
			}
			
			if($('input[name="participantNumberRdo"]:checked').val() == "2") {
				if(!$('input[name="participant2.titleRdo"]:checked').val()) {
					$('input[name="participant2.titleRdo"]').parents('.form-group').addClass('has-error');
					console.log('5');
					hasError = true;
				}
				
				if(!$('input[name="participant2.breakoutRoomRdo"]:checked').val()) {
					$('input[name="participant2.breakoutRoomRdo"]').parents('.form-group').addClass('has-error');
					console.log('6');
					hasError = true;
				}
			}
		}
		
		if(hasError) {
			console.log('hasError!')
		  	$('#alertDanger').show();
		} else {
			console.log('no Error!')
			$('#alertDanger').hide();
			// no error here ... so we proceed
			var org = {}
			org.name = $('input[data-field="name"]').val();
			org.address1 = $('input[data-field="address1"]').val();
			org.address2 = $('input[data-field="address2"]').val();
			org.telephone = $('input[data-field="telephone"]').val();
			org.fax = $('input[data-field="fax"]').val();
			org.email = $('input[data-field="email"]').val();
			org.status = $('input[name="attendingRdo"]:checked').val();
			org.participantNumber = $('input[name="participantNumberRdo"]:checked').val();
			
			if(org.participantNumber == '1' || org.participantNumber == '2') {
				org.people = new Array();
				org.people[0]={};
				org.people[0].title = $('input[name="participant1.titleRdo"]:checked').val();
				org.people[0].firstName = $('input[data-field="participant1.firstName"]').val();
				org.people[0].lastName = $('input[data-field="participant1.lastName"]').val();
				org.people[0].jobTitle = $('input[data-field="participant1.jobTitle"]').val();
				org.people[0].email = $('input[data-field="participant1.email"]').val();
				org.people[0].breakoutRoom = $('input[name="participant1.breakoutRoomRdo"]:checked').val();
			}
			
			if(org.participantNumber == '2') {
				org.people[1]={};
				org.people[1].title = $('input[name="participant1.titleRdo"]:checked').val();
				org.people[1].firstName = $('input[data-field="participant1.firstName"]').val();
				org.people[1].lastName = $('input[data-field="participant1.lastName"]').val();
				org.people[1].jobTitle = $('input[data-field="participant1.jobTitle"]').val();
				org.people[1].email = $('input[data-field="participant1.email"]').val();
				org.people[1].breakoutRoom = $('input[name="participant1.breakoutRoomRdo"]:checked').val();
			}
			
			$.ajax({
				url: 'Register',
				method: 'POST',
				data: JSON.stringify(org),
				dataType: "json",
				contentType: "application/json",
				success: function(data) {
					if(data == "OK") {
						$('#submitBtn').hide();
						$('#alertDanger').removeClass('alert-danger');
						$('#alertDanger').addClass('alert-success');
						$('#alertDanger').html("การลงทะเบียนเรียบร้อย ขอบคุณที่ลงทะเบียน");
						$('#alertDanger').show();
					}
				}
			});
 		}
		
		return false;
	},
	
	onChangeParticipantNumberRdo: function(e) {
		var value=$(e.target).val();
		
		if(value == "1") {
			var json = {num: 1};
			this.$el.find("#paritcipant1Div").html(this.participantsTemplate(json));
			this.$el.find("#paritcipant1Div").show();
			
			this.$el.find("#paritcipant2Div").hide();
			this.$el.find("#paritcipant2Div").empty();
			
			
		} else if(value == "2") {
			var json = {num: 1};
			this.$el.find("#paritcipant1Div").html(this.participantsTemplate(json));
			this.$el.find("#paritcipant1Div").show();
			
			json = {num: 2};
			this.$el.find("#paritcipant2Div").html(this.participantsTemplate(json));
			this.$el.find("#paritcipant2Div").show();
			
		}
	},
	
	onChangeAttendingRdo:function(e) {
		var value=$(e.target).val();
		
		if(value=="ATTEND") {
			
			this.$el.find("#numberOfParitcipantsDiv").empty().html(this.numberOfParticipantsTemplate());
			this.$el.find("#numberOfParitcipantsDiv").show();
			
		} else {
			this.$el.find("#numberOfParitcipantsDiv").empty();
			this.$el.find("#numberOfParitcipantsDiv").hide();
			
		}
		
		this.$el.find("#paritcipant1Div").hide();
		this.$el.find("#paritcipant1Div").empty();
		
		this.$el.find("#paritcipant2Div").hide();
		this.$el.find("#paritcipant2Div").empty();
		
	}
});