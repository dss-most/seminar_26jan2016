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
	 },
	 events: {
		 "change input[name='attendingRdo']" : "onChangeAttendingRdo",
		 "change .formRdo" : "oncChangeFormRdo",
		 
		 "click #saveFormAndSendEmailBtn" : "onClickSaveFormBtn",
		 "click #saveFormAndSendEmailLnk" : "onClickSaveFormBtn",
		 "click #saveFormOnlyLnk" : "onClickSaveFormOnlyBtn",
		 
		 "click #backBtn" : "onClickBackBtn",
		 
		 "click .fileDeleteLnk" : "onClickFileDeleteLnk",
		 "click #updateStateBtn" : "onClickUpdateStateBtn",
		 "click #updatePaymentStateBtn" : "onClickUpdatePaymentStateBtn"
			 
		
	},
	render: function() {
		var json={};
		
		this.$el.find(".panel-body").html(this.formViewTemplate(json));
		
		return this;
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
		
	}
});