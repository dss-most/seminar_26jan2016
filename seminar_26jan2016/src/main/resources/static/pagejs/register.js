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
		 this.infoViewTemplate = Handlebars.compile($("#infoViewTemplate").html());
		 this.numberOfParticipantsTemplate = Handlebars.compile($("#numberOfParticipantsTemplate").html());
		 this.participantsTemplate = Handlebars.compile($("#participantsTemplate").html());
		 this.usernamePasswordTemplate = Handlebars.compile($("#usernamePasswordTemplate").html());
		 
		 this.hasAuthenticated = false;
		 this.organization = {};
	 },
	 events: {
		 "change input[name='attendingRdo']" : "onChangeAttendingRdo",
		 "change input[name='participantNumberRdo']" : "onChangeParticipantNumberRdo",
		 
		 
		 "click #submitBtn" : "onClickSubmitBtn"	 
		
	},
	render: function() {
		var json={};
		
		
		if(this.hasAuthenticated == false) {
			this.$el.find("#formBody").html(this.usernamePasswordTemplate(json));
			
		} else if(this.hasRegistered == false){
			
			json.model = this.organization;
			this.$el.find("#formBody").html(this.formViewTemplate(json));
		} else {
			json.model = this.organization;
			$('#alertDanger').removeClass('alert-danger');
			$('#alertDanger').addClass('alert-success');
			$('#alertDanger').html("ท่านได้ลงทะเบียนการสัมมนาแล้ว รายละเอียดตามด้านล่าง" + 
					" สามารถตรวจสอบลำดับการลงทะเบียนหน้างานสัมมนาได้ที่เว็บนี้ ภายใน วันจันทร์ที่ ๑๑ มกราคม ๒๕๕๙" +
					" หากมีข้อสงสัยหรือต้องการแก้ไขข้อมูล กรุณาติดต่อกลับมาที่อีเมล 125seminar@dss.go.th ภายในวันที่ ๑๒ มกราคม ๒๕๕๙");
			$('#alertDanger').show();
			this.$el.find("#formBody").html(this.infoViewTemplate(json));
		}
		
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
		
		if(this.hasAuthenticated == false) {
			console.log('token: ');
			
			if(hasError) {
				console.log('hasError!')
			  	$('#alertDanger').show();
			} else {
			
				var token = {};
			
				token.username = $('input[name="org_username"]').val();
				token.password = $('input[name="org_password"]').val();
				console.log(token);
				$.ajax({
					url: 'CheckOrganizationPassword',
					method: 'POST',
					data: {
						username: token.username,
						password: token.password
					},
					success: _.bind(function(response) {
						console.log(response);
						if(response.status == "SUCCESS") {
							this.organization = response.data;
							this.hasAuthenticated = true;
							if(this.organization.status != null) {
								this.hasRegistered = true;
								switch(this.organization.status) {
								case "NOT_ATTEND": 
									this.organization.registerStatusDescription = "ไม่สามารถเข้าร่วมงานได้";
									this.organization.attend = false;
									break;
								case "ATTEND":
									this.organization.registerStatusDescription = "สามารถเข้าร่วมงานได้";
									this.organization.attend = true;
									this.organization.peopleSize = this.organization.people.length;
									break;
								}
								
								for(var i=0; i< this.organization.people.length; i++) {
									var p = this.organization.people[i];
									switch(p.title) {
									case "Mr": 
										p.titleDescription = "นาย";
										break;
									case "Mrs": 
										p.titleDescription = "นาง";
										break;
									case "Miss": 
										p.titleDescription = "น.ส.";
										break;
									}
									
									switch(p.registration.breakoutRoom) {
									case "ROOM1": 
										p.registration.breakoutRoomDescription = "ห้องที่ ๑ งานบริการด้านการรับรองระบบงานห้องปฏิบัติการและการจัดกิจกรรมทดสอบความชำนาญ";
										break;
									case "ROOM2": 
										p.registration.breakoutRoomDescription = "ห้องที่ ๒ งานบริการทดสอบ สอบเทียบ";
										break;
									case "ROOM3": 
										p.registration.breakoutRoomDescription = "ห้องที่ ๓ งานวิจัยและพัฒนา";
										break;
									case "ROOM4": 
										p.registration.breakoutRoomDescription = "ห้องที่ ๔ งานด้านการพัฒนาบุคคลากรและการบริการสารสนเทศ";
										break;
									}
								}
								
								
							} else {
								this.hasRegistered = false;
							}
							
							this.render();
						} else if(response.status == "FAIL") {
							$('#alertDanger').removeClass('alert-success');
							$('#alertDanger').addClass('alert-danger');
							$('#alertDanger').html("ไม่พบผู้ใช้งานและรหัสลงทะเบียน กรุณาระบุใหม่");
							$('#alertDanger').show();
						
						}
					}, this)
				});
				
			}
			
		} else {
	 	
			// now the radio
			if(!$('input[name="attendingRdo"]:checked').val()) {
				$('input[name="attendingRdo"]').parents('.form-group').addClass('has-error');
				hasError = true;
			} else if($('input[name="attendingRdo"]:checked').val() == "ATTEND" && 
					!$('input[name="participantNumberRdo"]:checked').val()) {
					$('input[name="participantNumberRdo"]').parents('.form-group').addClass('has-error');
				hasError = true;
			} else if($('input[name="attendingRdo"]:checked').val() == "ATTEND"){
				if(!$('input[name="participant1.titleRdo"]:checked').val()) {
					$('input[name="participant1.titleRdo"]').parents('.form-group').addClass('has-error');
					hasError = true;
				}
				
				if(!$('input[name="participant1.breakoutRoomRdo"]:checked').val()) {
					$('input[name="participant1.breakoutRoomRdo"]').parents('.form-group').addClass('has-error');
					hasError = true;
				}
				
				if($('input[name="participantNumberRdo"]:checked').val() == "2") {
					if(!$('input[name="participant2.titleRdo"]:checked').val()) {
						$('input[name="participant2.titleRdo"]').parents('.form-group').addClass('has-error');
						hasError = true;
					}
					
					if(!$('input[name="participant2.breakoutRoomRdo"]:checked').val()) {
						$('input[name="participant2.breakoutRoomRdo"]').parents('.form-group').addClass('has-error');
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
				org.id = this.organization.id;
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
					org.people[1].title = $('input[name="participant2.titleRdo"]:checked').val();
					org.people[1].firstName = $('input[data-field="participant2.firstName"]').val();
					org.people[1].lastName = $('input[data-field="participant2.lastName"]').val();
					org.people[1].jobTitle = $('input[data-field="participant2.jobTitle"]').val();
					org.people[1].email = $('input[data-field="participant2.email"]').val();
					org.people[1].breakoutRoom = $('input[name="participant2.breakoutRoomRdo"]:checked').val();
				}
				
				$.ajax({
					url: 'Register',
					method: 'POST',
					data: JSON.stringify(org),
					dataType: "json",
					contentType: "application/json;charset=UTF-8",
					success: function(data) {
						if(data == "OK") {
							$('#submitBtn').hide();
							$('#alertDanger').removeClass('alert-danger');
							$('#alertDanger').addClass('alert-success');
							$('#alertDanger').html("การลงทะเบียนเรียบร้อย ขอบคุณท่านที่ลงทะเบียน และท่านสามารถตรวจสอบลำดับการลงทะเบียนหน้างานได้ที่เว็บไซต์นี้ ภายในวันจันทร์ ที่ ๑๑ มกราคม ๒๕๕๙");
							$('#alertDanger').show();
						}
					}
				});
	 		}
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